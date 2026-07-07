# StudySync AI

A full-stack Next.js app that turns lecture audio and PDFs into AI-generated study materials — notes, flashcards, quizzes, summaries, and action items.

Built as a standalone PM portfolio project (separate from your main portfolio).

## Stack

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS**
- **Supabase** (Auth, Postgres, Storage)
- **OpenAI** (Whisper + GPT)

## Getting started

### 1. Clone and install

```bash
cd studysync-ai
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL editor
3. Create a **private** Storage bucket named `lectures`
4. Add the storage policies from the bottom of `schema.sql`
5. In Authentication → Providers, enable Email

### 3. Environment variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add the same environment variables from `.env.local`
4. Deploy — you'll get a live URL like `studysync-ai.vercel.app`

This is **separate** from your portfolio. Link to it from your portfolio projects page when ready.

## Features

- Supabase email authentication
- Dashboard with lecture list
- Upload audio/PDF to Supabase Storage
- OpenAI processing (transcription + study material generation)
- Lecture detail page with tabs: Summary, Notes, Flashcards, Quiz, Tasks
- Loading, error, and empty states

## Project structure

```
app/           # Pages and API routes
components/    # UI and feature components
lib/           # Supabase, OpenAI, utilities
types/         # TypeScript types
supabase/      # Database schema
```

## API routes

- `GET /api/lectures` — list user's lectures
- `GET /api/lectures/[id]` — get one lecture
- `POST /api/lectures/[id]/process` — process uploaded file with OpenAI
