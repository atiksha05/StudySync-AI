-- StudySync AI — full schema (v3 — career mode)
-- Run in Supabase SQL Editor

-- Profiles (user mode + onboarding)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  user_mode text check (user_mode in ('student', 'professional', 'career')),
  onboarding_completed boolean not null default false,
  full_name text,
  nickname text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Migration: if you already ran v2, run this to add career mode:
-- alter table profiles drop constraint if exists profiles_user_mode_check;
-- alter table profiles add constraint profiles_user_mode_check
--   check (user_mode in ('student', 'professional', 'career'));
-- alter table workspaces drop constraint if exists workspaces_user_mode_check;
-- alter table workspaces add constraint workspaces_user_mode_check
--   check (user_mode in ('student', 'professional', 'career'));

alter table profiles enable row level security;

create policy "Users can read own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Workspaces (replaces lectures concept)
create table if not exists workspaces (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  content_type text not null check (content_type in (
    'lecture_audio', 'meeting_recording', 'pdf', 'text_notes', 'image_notes'
  )),
  user_mode text not null check (user_mode in ('student', 'professional', 'career')),
  file_url text,
  file_name text,
  raw_content text,
  status text not null default 'pending' check (status in (
    'pending', 'processing', 'completed', 'failed'
  )),
  transcript text,
  summary text,
  ai_output jsonb,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table workspaces enable row level security;

create policy "Users can read own workspaces"
  on workspaces for select using (auth.uid() = user_id);

create policy "Users can insert own workspaces"
  on workspaces for insert with check (auth.uid() = user_id);

create policy "Users can update own workspaces"
  on workspaces for update using (auth.uid() = user_id);

create policy "Users can delete own workspaces"
  on workspaces for delete using (auth.uid() = user_id);

-- Legacy lectures table (optional — keep if you already ran v1)
create table if not exists lectures (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  file_url text,
  file_type text check (file_type in ('audio', 'pdf')),
  file_name text,
  status text not null default 'pending' check (status in ('pending', 'processing', 'completed', 'failed')),
  transcript text,
  summary text,
  notes jsonb,
  flashcards jsonb,
  quizzes jsonb,
  tasks jsonb,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table lectures enable row level security;

drop policy if exists "Users can read own lectures" on lectures;
drop policy if exists "Users can insert own lectures" on lectures;
drop policy if exists "Users can update own lectures" on lectures;
drop policy if exists "Users can delete own lectures" on lectures;

create policy "Users can read own lectures"
  on lectures for select using (auth.uid() = user_id);

create policy "Users can insert own lectures"
  on lectures for insert with check (auth.uid() = user_id);

create policy "Users can update own lectures"
  on lectures for update using (auth.uid() = user_id);

create policy "Users can delete own lectures"
  on lectures for delete using (auth.uid() = user_id);

-- Storage: create private bucket "lectures" in dashboard, then run:
-- create policy "Users can upload own files" on storage.objects for insert
--   with check (bucket_id = 'lectures' and auth.uid()::text = (storage.foldername(name))[1]);
-- create policy "Users can read own files" on storage.objects for select
--   using (bucket_id = 'lectures' and auth.uid()::text = (storage.foldername(name))[1]);
-- create policy "Users can delete own files" on storage.objects for delete
--   using (bucket_id = 'lectures' and auth.uid()::text = (storage.foldername(name))[1]);
