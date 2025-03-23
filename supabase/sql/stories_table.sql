
-- Create stories table
create table if not exists public.stories (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  content text,
  word_count integer default 0,
  type text not null default 'comic',
  status text default 'draft',
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Set up Row Level Security
alter table public.stories enable row level security;

-- Create policies
create policy "Users can view their own stories"
  on stories for select
  using (auth.uid() = user_id);

create policy "Users can create their own stories"
  on stories for insert
  using (auth.uid() = user_id);

create policy "Users can update their own stories"
  on stories for update
  using (auth.uid() = user_id);

create policy "Users can delete their own stories"
  on stories for delete
  using (auth.uid() = user_id);
