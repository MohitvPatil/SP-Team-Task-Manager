# TaskFlow SaaS

TaskFlow is a Next.js App Router project management SaaS with authenticated workspaces, projects, tasks, Kanban workflows, comments, analytics UI, and Railway deployment scaffolding.

## Features

- JWT authentication with HTTP-only access and refresh cookies
- Persistent session validation, logout token invalidation, and protected routes
- Role-aware project membership: `ADMIN`, `MANAGER`, `MEMBER`
- Project CRUD with authenticated ownership and membership checks
- Task CRUD with assignment, priority, status, due date, comments, soft deletes, and audit logs
- Prisma PostgreSQL schema with refresh tokens, attachments, notifications, comments, audit logs, indexes, and timestamps
- React Query-ready client service layer
- dnd-kit Kanban surface ready to persist task status through `/api/tasks/[id]`
- Security headers, Zod validation, standardized API errors, and typed server helpers
- Railway deployment, Prisma config, seed script, and environment template

## Tech Stack

- Next.js 15 App Router
- TypeScript
- TailwindCSS
- Prisma 7 with PostgreSQL
- React Query
- Socket.IO packages
- JWT authentication
- REST API routes
- Railway deployment target

## Setup

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

## Environment Variables

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taskflow"
JWT_SECRET="replace-with-32-byte-random-secret"
JWT_REFRESH_SECRET="replace-with-another-32-byte-random-secret"
NEXT_PUBLIC_API_URL="http://localhost:3000"
RESEND_API_KEY=""
EMAIL_FROM="TaskFlow <noreply@example.com>"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## API Structure

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET|POST /api/projects`
- `GET|PUT|DELETE /api/projects/[id]`
- `GET|POST /api/tasks`
- `GET|PUT|DELETE /api/tasks/[id]`
- `GET|POST /api/tasks/[id]/comments`
- `POST /api/team/invite`
- `POST /api/upload`

## Folder Structure

```text
app/
  api/
  dashboard/
  login/
  projects/
  register/
  settings/
  tasks/
components/
  auth/
  charts/
  dashboard/
  forms/
  kanban/
  projects/
  tasks/
  team/
  ui/
hooks/
lib/
middleware/
prisma/
  migrations/
  schema.prisma
  seed.ts
providers/
services/
utils/
```

## Railway Deployment

1. Set `JWT_SECRET`, `JWT_REFRESH_SECRET`, `NEXT_PUBLIC_APP_URL`, and email/storage secrets.
2. Deploy with the included `railway.json`.
3. Open `/api/meta` to confirm the app is serving sample metadata.

The app is currently in temporary sample metadata mode, so it does not require a database for deployment checks.

When PostgreSQL is ready:

1. Create a Railway PostgreSQL service.
2. Set `DATABASE_URL` from the PostgreSQL service.
3. Deploy with the included `railway.json`.
4. Restore the Railway start command to run migrations before startup:

```bash
npm run prisma:deploy && npm start
```

## Prisma Commands

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:deploy
npm run prisma:seed
```

## Production Commands

```bash
npm run build
npm start
```

## Future Improvements

- Complete OAuth provider flows with provider credentials.
- Add Resend templates for invitations, verification, reset, assignment, and reminder emails.
- Add a custom Socket.IO server process for cross-client task movement, comments, notifications, presence, and chat.
