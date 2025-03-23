
-- Create profiles table that connects to auth.users
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  email text unique,
  avatar_url text,
  updated_at timestamp with time zone,
  created_at timestamp with time zone default now() not null
);

-- Set up Row Level Security
alter table public.profiles enable row level security;

-- Create policies for Row Level Security
create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- Create a function to handle new user profiles
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, avatar_url, updated_at)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url',
    now()
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
