# Supabase Setup for Digital Heroes

This directory contains the necessary SQL migrations and TypeScript clients to initialize the Supabase backend for the Digital Heroes platform.

## 1. Initial Database Setup

To apply these schemas to your Supabase project, you can either use the Supabase CLI locally or run them in the Supabase Dashboard SQL Editor.

### Option A: Using the Supabase Dashboard (Recommended for quick start)
1. Go to your project dashboard at [supabase.com](https://supabase.com).
2. Navigate to the **SQL Editor** tab.
3. Create a new query and copy-paste the contents of the files in the following order:
   - `migrations/001_initial_schema.sql` (Creates tables and indexes)
   - `rls-policies.sql` (Secures the data)
   - `triggers.sql` (Adds automation for updated_at, the rolling-5 scores, and profile syncing)
4. Click **Run** for each.

### Option B: Using the Supabase CLI
If you have initialized Supabase locally:
1. Move the `001_initial_schema.sql` file into your local `supabase/migrations` folder.
2. Run `supabase db push` to push the changes to your linked remote database.
3. You may also want to combine the RLS and Trigger scripts into a subsequent migration file (e.g., `002_rls_and_triggers.sql`) to keep them tracked.

## 2. Architecture Notes

### Rolling-5 Score Logic
As per the project rules, users maintain a rolling average/history of 5 scores. This is enforced directly at the database level via a PostgreSQL trigger (`enforce_rolling_5_scores_trigger` defined in `triggers.sql`). 
Whenever a 6th score is inserted, the oldest score (by `score_date`) is automatically pruned.

### Auth Syncing
A trigger (`handle_new_user`) is configured on `auth.users`. When a user signs up via Supabase Auth, a corresponding row is instantly created in the `public.profiles` table with their `id` and `email`.

### Environment Variables
Ensure the following variables are present in your `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (For server-side admin tasks like draws)
```
