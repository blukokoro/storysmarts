
-- Create user_preferences table
create table if not exists public.user_preferences (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  email_updates boolean default true,
  story_analysis_notifications boolean default true,
  marketing_emails boolean default false,
  updated_at timestamp with time zone default now(),
  created_at timestamp with time zone default now() not null,
  unique(user_id)
);

-- Set up Row Level Security
alter table public.user_preferences enable row level security;

-- Create policies
create policy "Users can view their own preferences"
  on user_preferences for select
  using (auth.uid() = user_id);

create policy "Users can update their own preferences"
  on user_preferences for update
  using (auth.uid() = user_id);

create policy "Users can insert their own preferences"
  on user_preferences for insert
  using (auth.uid() = user_id);
