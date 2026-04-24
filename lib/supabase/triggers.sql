-- 1. Updated At Trigger Function
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_charities_updated_at BEFORE UPDATE ON charities FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_draws_updated_at BEFORE UPDATE ON draws FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_winners_updated_at BEFORE UPDATE ON winners FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 2. Rolling-5 Trigger for Scores
CREATE OR REPLACE FUNCTION enforce_rolling_5_scores()
RETURNS TRIGGER AS $$
BEGIN
  -- If the user has more than 5 scores after an insert, delete the oldest ones by score_date
  DELETE FROM scores
  WHERE id IN (
    SELECT id FROM scores
    WHERE user_id = NEW.user_id
    ORDER BY score_date ASC
    OFFSET 5
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_rolling_5_scores_trigger
AFTER INSERT ON scores
FOR EACH ROW
EXECUTE FUNCTION enforce_rolling_5_scores();

-- 3. Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql security definer;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();
