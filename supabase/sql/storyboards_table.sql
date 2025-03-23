
-- Create storyboards table
create table if not exists public.storyboards (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  story_id uuid references public.stories on delete set null,
  title text not null,
  frame_count integer default 0,
  has_images boolean default false,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Set up Row Level Security
alter table public.storyboards enable row level security;

-- Create policies
create policy "Users can view their own storyboards"
  on storyboards for select
  using (auth.uid() = user_id);

create policy "Users can create their own storyboards"
  on storyboards for insert
  using (auth.uid() = user_id);

create policy "Users can update their own storyboards"
  on storyboards for update
  using (auth.uid() = user_id);

create policy "Users can delete their own storyboards"
  on storyboards for delete
  using (auth.uid() = user_id);
