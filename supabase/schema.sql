-- StudySync AI Supabase schema
-- Run this in the Supabase SQL editor

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

create policy "Users can read own lectures"
  on lectures for select
  using (auth.uid() = user_id);

create policy "Users can insert own lectures"
  on lectures for insert
  with check (auth.uid() = user_id);

create policy "Users can update own lectures"
  on lectures for update
  using (auth.uid() = user_id);

create policy "Users can delete own lectures"
  on lectures for delete
  using (auth.uid() = user_id);

-- Storage bucket: create a private bucket named "lectures" in the Supabase dashboard,
-- then run these policies:

-- insert into storage.buckets (id, name, public) values ('lectures', 'lectures', false);

-- create policy "Users can upload own lecture files"
--   on storage.objects for insert
--   with check (
--     bucket_id = 'lectures'
--     and auth.uid()::text = (storage.foldername(name))[1]
--   );

-- create policy "Users can read own lecture files"
--   on storage.objects for select
--   using (
--     bucket_id = 'lectures'
--     and auth.uid()::text = (storage.foldername(name))[1]
--   );

-- create policy "Users can delete own lecture files"
--   on storage.objects for delete
--   using (
--     bucket_id = 'lectures'
--     and auth.uid()::text = (storage.foldername(name))[1]
--   );
