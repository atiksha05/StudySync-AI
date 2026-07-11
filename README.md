# StudySync AI

An AI knowledge workspace for **students** and **professionals**. Turn messy lectures, meetings, PDFs, and notes into organized knowledge, study material, action items, and searchable insights — powered by **Google Gemini**.

## Stack

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS** + Framer Motion
- **Supabase** (Auth, Postgres, Storage)
- **Google Gemini** (AI processing with provider abstraction + demo fallback)

## Getting started

### 1. Clone and install

```bash
cd studysync-ai
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL editor (creates `profiles`, `workspaces`, and legacy `lectures` tables)
3. Create a **private** Storage bucket named `lectures`
4. Add the storage policies from the bottom of `schema.sql`
5. In Authentication → Providers, enable Email

### 3. Environment variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `GEMINI_API_KEY` | Google Gemini API key (optional — app uses demo data when unset) |

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## User modes

After signup, users choose their workspace:

- **Student** — lectures, exams, flashcards, quizzes, study plans
- **Professional** — meetings, decisions, action items, follow-ups
- **Career** — applications, companies, resumes, interviews, career prep

Mode is stored in the user profile and can be switched anytime in Settings.

## Features

- Supabase email authentication + onboarding flow
- Student and Professional dashboards with mode-specific widgets
- Upload page (lecture audio, meeting recording, PDF, text notes, image notes)
- Gemini-powered processing with demo fallback when API key is not configured
- Workspace detail pages with mode-specific tabs
- Shared navigation: Dashboard, Upload, Library, Search, Ask AI, Tasks, Analytics, Settings
- Dark energetic blue-purple-pink theme

## Project structure

```
app/
  (app)/          # Authenticated app shell with sidebar
  (auth)/         # Login and signup
  api/            # Workspaces, profile, Ask AI routes
  onboarding/     # Mode selection after signup
components/       # UI, auth, dashboard, workspace
lib/
  ai/             # Gemini provider abstraction + demo data
  profile.ts      # Profile CRUD
types/            # TypeScript types
supabase/         # Database schema
```

## API routes

- `GET/POST /api/workspaces` — list and create workspaces
- `GET /api/workspaces/[id]` — get workspace
- `POST /api/workspaces/[id]/process` — process content with Gemini
- `POST /api/profile/onboarding` — save user mode after onboarding
- `POST /api/ask` — Ask AI chat endpoint

## Deploy to Vercel

1. Push to GitHub and import in [Vercel](https://vercel.com/new)
2. Add environment variables (placeholders work for UI-only preview)
3. Replace with real Supabase keys to enable auth; add `GEMINI_API_KEY` for live AI
