
-- Create analyses table
create table if not exists public.analyses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  story_id uuid references public.stories on delete set null,
  title text not null,
  type text default 'Comic Analysis',
  insights jsonb,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Set up Row Level Security
alter table public.analyses enable row level security;

-- Create policies
create policy "Users can view their own analyses"
  on analyses for select
  using (auth.uid() = user_id);

create policy "Users can create their own analyses"
  on analyses for insert
  using (auth.uid() = user_id);

create policy "Users can update their own analyses"
  on analyses for update
  using (auth.uid() = user_id);

create policy "Users can delete their own analyses"
  on analyses for delete
  using (auth.uid() = user_id);
