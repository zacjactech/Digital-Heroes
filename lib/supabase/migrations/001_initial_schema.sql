-- Create ENUMs
CREATE TYPE subscription_status_enum AS ENUM ('active', 'inactive', 'lapsed', 'cancelled');
CREATE TYPE subscription_plan_enum AS ENUM ('monthly', 'yearly');
CREATE TYPE draw_type_enum AS ENUM ('random', 'algorithmic');
CREATE TYPE draw_status_enum AS ENUM ('draft', 'simulated', 'published');
CREATE TYPE match_type_enum AS ENUM ('three_match', 'four_match', 'five_match');
CREATE TYPE winner_status_enum AS ENUM ('pending', 'approved', 'rejected', 'paid');

-- 3. charities
CREATE TABLE charities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  image_url text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 4. charity_events
CREATE TABLE charity_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  charity_id uuid REFERENCES charities(id) ON DELETE CASCADE,
  event_name text NOT NULL,
  event_date date NOT NULL,
  location text,
  created_at timestamptz DEFAULT now()
);

-- 1. profiles
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text NOT NULL,
  stripe_customer_id text,
  subscription_status subscription_status_enum DEFAULT 'inactive',
  subscription_plan subscription_plan_enum,
  subscription_end_at timestamptz,
  charity_id uuid REFERENCES charities(id) ON DELETE SET NULL,
  charity_pct int DEFAULT 10,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. scores
CREATE TABLE scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  score_value int CHECK (score_value >= 1 AND score_value <= 45),
  score_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, score_date)
);

-- 5. draws
CREATE TABLE draws (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  draw_date date UNIQUE NOT NULL,
  draw_type draw_type_enum NOT NULL DEFAULT 'random',
  drawn_numbers int[] CHECK (array_length(drawn_numbers, 1) = 5),
  status draw_status_enum DEFAULT 'draft',
  jackpot_carried_over boolean DEFAULT false,
  prize_pool_total decimal(10,2) DEFAULT 0.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 6. draw_entries
CREATE TABLE draw_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  draw_id uuid REFERENCES draws(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  scores_snapshot int[] CHECK (array_length(scores_snapshot, 1) = 5),
  match_count int CHECK (match_count >= 0 AND match_count <= 5),
  is_winner boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(draw_id, user_id)
);

-- 7. winners
CREATE TABLE winners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  draw_id uuid REFERENCES draws(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  match_type match_type_enum NOT NULL,
  prize_amount decimal(10,2) NOT NULL,
  proof_url text,
  status winner_status_enum DEFAULT 'pending',
  verified_at timestamptz,
  paid_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 8. subscription_events
CREATE TABLE subscription_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  stripe_event_id text UNIQUE NOT NULL,
  payload jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX idx_scores_user_date ON scores(user_id, score_date DESC);
CREATE INDEX idx_scores_user_created ON scores(user_id, created_at DESC);
CREATE INDEX idx_draw_entries_winner ON draw_entries(draw_id, is_winner);
CREATE INDEX idx_winners_user_status ON winners(user_id, status);
CREATE INDEX idx_subscription_events_user ON subscription_events(user_id, created_at DESC);
