-- ============================================================
-- Digital Heroes — Initial Database Schema
-- Migration: 001_initial_schema.sql
-- Run via: Supabase Dashboard → SQL Editor, or supabase db push
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Profiles (extends auth.users) ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id                      UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email                   TEXT NOT NULL,
  full_name               TEXT NOT NULL DEFAULT '',
  avatar_url              TEXT,
  role                    TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'admin')),
  subscription_status     TEXT NOT NULL DEFAULT 'inactive'
                            CHECK (subscription_status IN ('active', 'inactive', 'lapsed', 'cancelled')),
  stripe_customer_id      TEXT UNIQUE,
  subscription_renewed_at TIMESTAMPTZ,
  selected_charity_id     UUID,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── Charities ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.charities (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name                 TEXT NOT NULL,
  description          TEXT NOT NULL DEFAULT '',
  logo_url             TEXT,
  website_url          TEXT,
  contribution_percent NUMERIC(5,2) NOT NULL DEFAULT 10.00,
  is_active            BOOLEAN NOT NULL DEFAULT true,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add FK from profiles to charities
ALTER TABLE public.profiles
  ADD CONSTRAINT fk_profiles_charity
  FOREIGN KEY (selected_charity_id) REFERENCES public.charities(id) ON DELETE SET NULL;

-- ── Scores ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.scores (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  value       INTEGER NOT NULL CHECK (value >= 1 AND value <= 45),
  score_date  DATE NOT NULL,
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- One score per user per date (enforced at DB level)
  UNIQUE (user_id, score_date)
);

CREATE INDEX idx_scores_user_id ON public.scores(user_id);
CREATE INDEX idx_scores_score_date ON public.scores(score_date DESC);

-- ── Draws ──────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.draws (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name                  TEXT NOT NULL,
  draw_date             DATE NOT NULL,
  mode                  TEXT NOT NULL DEFAULT 'random' CHECK (mode IN ('random', 'algorithmic')),
  status                TEXT NOT NULL DEFAULT 'upcoming'
                          CHECK (status IN ('upcoming', 'simulation_ready', 'published')),
  drawn_numbers         INTEGER[] NOT NULL DEFAULT '{}',
  prize_pool            NUMERIC(10,2) NOT NULL DEFAULT 0,
  jackpot_carry_in      NUMERIC(10,2) NOT NULL DEFAULT 0,
  jackpot_carry_forward NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_entries         INTEGER NOT NULL DEFAULT 0,
  published_at          TIMESTAMPTZ,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_draws_draw_date ON public.draws(draw_date DESC);
CREATE INDEX idx_draws_status ON public.draws(status);

-- ── Draw Entries ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.draw_entries (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  draw_id     UUID NOT NULL REFERENCES public.draws(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  scores      INTEGER[] NOT NULL,        -- snapshot of user scores at draw time
  match_count INTEGER NOT NULL DEFAULT 0 CHECK (match_count >= 0 AND match_count <= 5),
  is_winner   BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (draw_id, user_id)
);

CREATE INDEX idx_draw_entries_draw_id ON public.draw_entries(draw_id);
CREATE INDEX idx_draw_entries_user_id ON public.draw_entries(user_id);

-- ── Winners ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.winners (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  draw_id     UUID NOT NULL REFERENCES public.draws(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tier        TEXT NOT NULL CHECK (tier IN ('jackpot', 'second', 'third')),
  match_count INTEGER NOT NULL CHECK (match_count IN (3, 4, 5)),
  prize_amount NUMERIC(10,2) NOT NULL,
  status      TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'verified', 'paid', 'rejected')),
  proof_url   TEXT,
  verified_at TIMESTAMPTZ,
  paid_at     TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_winners_draw_id ON public.winners(draw_id);
CREATE INDEX idx_winners_user_id ON public.winners(user_id);
CREATE INDEX idx_winners_status ON public.winners(status);

-- ── Subscription Events (Stripe audit log) ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.subscription_events (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_event_id  TEXT NOT NULL UNIQUE,
  event_type       TEXT NOT NULL,
  payload          JSONB NOT NULL,
  processed_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sub_events_event_type ON public.subscription_events(event_type);
CREATE INDEX idx_sub_events_processed_at ON public.subscription_events(processed_at DESC);

-- ── Row Level Security ─────────────────────────────────────────────────────────
ALTER TABLE public.profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scores         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.charities      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.draws          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.draw_entries   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.winners        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_events ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only read/update their own row
CREATE POLICY "profiles: own row" ON public.profiles
  FOR ALL USING (auth.uid() = id);

-- Scores: users can only access their own scores
CREATE POLICY "scores: own rows" ON public.scores
  FOR ALL USING (auth.uid() = user_id);

-- Charities: everyone can read; only service role can write
CREATE POLICY "charities: public read" ON public.charities
  FOR SELECT USING (true);

-- Draws: everyone can read published draws; only service role manages
CREATE POLICY "draws: public read" ON public.draws
  FOR SELECT USING (status = 'published' OR auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  ));

-- Draw entries: users see only their own entries
CREATE POLICY "draw_entries: own rows" ON public.draw_entries
  FOR SELECT USING (auth.uid() = user_id);

-- Winners: users see their own; admins see all
CREATE POLICY "winners: own rows" ON public.winners
  FOR SELECT USING (
    auth.uid() = user_id OR
    auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );
