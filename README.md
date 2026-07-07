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

## Deploy to Vercel (before Supabase is set up)

You can deploy the **landing page and UI** right away. Auth and uploads will work after you add real Supabase/OpenAI keys later.

### 1. Push to GitHub

```bash
gh auth login
gh repo create studysync-ai --public --source=. --remote=origin --push
```

Or create a repo manually on GitHub, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/studysync-ai.git
git branch -M main
git push -u origin main
```

### 2. Import in Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your `studysync-ai` GitHub repo
3. Add these **placeholder** environment variables (so the build succeeds):

| Variable | Placeholder value |
|----------|-------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://placeholder.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `placeholder-key` |
| `SUPABASE_SERVICE_ROLE_KEY` | `placeholder-service-key` |
| `OPENAI_API_KEY` | `sk-placeholder` |

4. Click **Deploy**

You'll get a live URL like `studysync-ai.vercel.app`. Replace the placeholder env vars with real keys when you're ready to enable auth and AI features.

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
