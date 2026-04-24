-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE charities ENABLE ROW LEVEL SECURITY;
ALTER TABLE charity_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE draws ENABLE ROW LEVEL SECURITY;
ALTER TABLE draw_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE winners ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_events ENABLE ROW LEVEL SECURITY;

-- 1. Profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Scores
CREATE POLICY "Users can manage own scores" ON scores FOR ALL USING (auth.uid() = user_id);

-- 3. Charities
CREATE POLICY "Public read charities" ON charities FOR SELECT USING (true);

-- 4. Charity Events
CREATE POLICY "Public read charity events" ON charity_events FOR SELECT USING (true);

-- 5. Draws
CREATE POLICY "Public read published draws" ON draws FOR SELECT USING (status = 'published');

-- 6. Draw Entries
CREATE POLICY "Active users can view own entries" ON draw_entries FOR SELECT USING (auth.uid() = user_id);

-- 7. Winners
CREATE POLICY "Public read verified winners" ON winners FOR SELECT USING (status = 'paid' OR status = 'approved');
CREATE POLICY "Users view own winnings" ON winners FOR SELECT USING (auth.uid() = user_id);

-- 8. Subscription Events
CREATE POLICY "Users view own events" ON subscription_events FOR SELECT USING (auth.uid() = user_id);

-- Note: Admin access is managed via the Supabase Service Role Key which bypasses RLS natively.
