# Task Manager SaaS - Documentation

This project is a modern project management system built with Next.js, featuring authenticated workspaces, real-time-ready task flows, and a robust team invitation system.

## Project Structure

### Root Files
- `package.json`: Project dependencies and scripts.
- `next.config.ts`: Next.js configuration.
- `tsconfig.json`: TypeScript configuration.
- `tailwind.config.ts`: Tailwind CSS styling configuration.
- `postcss.config.mjs`: PostCSS configuration for Tailwind.
- `eslint.config.mjs`: Linting rules.
- `.env`: Environment variables (Database URLs, JWT secrets, etc.).
- `railway.json`: Deployment configuration for Railway.
- `middleware.ts`: Next.js middleware for route protection and session handling.

### Folders

#### `app/`
Contains the application routes and server-side logic (App Router).
- `api/`: REST API endpoints.
  - `auth/`: Login, signup, logout, and token refresh logic.
  - `employees/`: Endpoints for fetching employee directory data.
  - `meta/`: System metadata and health checks.
  - `projects/`: Project CRUD operations.
  - `tasks/`: Task management, status updates, and comments.
  - `team/`: Team invitation and membership management.
  - `upload/`: File upload handling.
- `dashboard/`: Overview of active projects and team stats.
- `deadlines/`: Visual tracking of upcoming project and task deadlines.
- `employees/`: Full employee directory with detailed profile views.
- `login/` / `register/`: Authentication interface.
- `profile/`: Personal user profile settings.
- `projects/`: Project detail pages and project-specific task boards.
- `settings/`: Global application settings.
- `tasks/`: Centralized task management.
- `layout.tsx`: Global application layout and provider wrapping.
- `globals.css`: Global CSS styles and Tailwind directives.

#### `components/`
Reusable UI components organized by feature.
- `auth/`: Security components (e.g., `ProtectedRoute`).
- `charts/`: Data visualization for project progress and team metrics.
- `dashboard/`: Dashboard-specific widgets.
- `forms/`: Shared form elements and validation logic.
- `kanban/`: Task management board with drag-and-drop support.
- `projects/`: Project cards, creation modals, and detail components.
- `tasks/`: Task list items, detail modals, and comment threads.
- `team/`: Employee cards, invitation buttons, and modals.
- `ui/`: Core design system components (Modals, Navbar, Buttons, Inputs).

#### `hooks/`
Custom React hooks for managing complex state, API interactions (React Query), and UI behaviors.

#### `lib/`
Foundational logic and configurations.
- `auth.ts`: JWT generation, verification, and session helpers.
- `axios.ts`: Pre-configured Axios instance for client-side API requests.
- `employees-data.ts`: The "Employee Database" containing fixed personal details (salary, address, etc.).
- `prisma.ts`: Singleton instance of the Prisma Client.
- `sample-data.ts`: Centralized types and sample data used throughout the application.

#### `prisma/`
Database definitions and migrations.
- `schema.prisma`: The source of truth for the database structure.
- `seed.ts`: Script to populate the database with initial/sample data.
- `migrations/`: Versioned SQL files tracking database changes.

#### `providers/`
React Context providers for state management (Authentication, Theme, React Query).

#### `services/`
An abstracted service layer that handles communication between the frontend and the API routes.

#### `utils/`
Small, focused utility functions for data formatting, date calculations, and string manipulation.

---

## Database Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  ADMIN
  MANAGER
  MEMBER
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  REVIEW
  COMPLETED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum NotificationType {
  INVITE
  TASK_ASSIGNED
  COMMENT
  STATUS_CHANGED
  OVERDUE
  SYSTEM
}

model User {
  id                String              @id @default(cuid())
  employeeId        String?             @unique
  name              String
  email             String              @unique
  password          String?
  imageUrl          String?
  role              Role                @default(MEMBER)
  emailVerifiedAt   DateTime?
  deletedAt         DateTime?
  createdAt         DateTime            @default(now())
  updatedAt         DateTime            @updatedAt
  ownedProjects     Project[]           @relation("ProjectOwner")
  memberships       ProjectMember[]
  assignedTasks     Task[]              @relation("TaskAssignee")
  createdTasks      Task[]              @relation("TaskCreator")
  comments          Comment[]
  attachments       Attachment[]
  notifications     Notification[]
  refreshTokens     RefreshToken[]
  auditLogs         AuditLog[]

  @@index([role])
  @@index([employeeId])
  @@index([deletedAt])
}

model Project {
  id          String          @id @default(cuid())
  title       String
  description String?
  ownerId     String
  deletedAt   DateTime?
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt
  owner       User            @relation("ProjectOwner", fields: [ownerId], references: [id], onDelete: Cascade)
  members     ProjectMember[]
  tasks       Task[]
  files       Attachment[]
  invites     ProjectInvite[]

  @@index([ownerId])
  @@index([deletedAt])
  @@index([createdAt])
}

model ProjectMember {
  id        String   @id @default(cuid())
  userId    String
  projectId String
  role      Role     @default(MEMBER)
  position  String?
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)

  @@unique([userId, projectId])
  @@index([projectId])
}

model ProjectInvite {
  id        String   @id @default(cuid())
  email     String
  projectId String
  role      Role     @default(MEMBER)
  position  String?
  token     String   @unique
  accepted  Boolean  @default(false)
  expiresAt DateTime
  createdAt DateTime @default(now())
  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)

  @@unique([email, projectId])
  @@index([token])
}

model Task {
  id           String       @id @default(cuid())
  title        String
  description  String?
  status       TaskStatus   @default(TODO)
  priority     Priority     @default(MEDIUM)
  dueDate      DateTime?
  order        Int          @default(0)
  assignedToId String?
  createdById  String
  projectId    String
  deletedAt    DateTime?
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
  assignedTo   User?        @relation("TaskAssignee", fields: [assignedToId], references: [id], onDelete: SetNull)
  createdBy    User         @relation("TaskCreator", fields: [createdById], references: [id], onDelete: Cascade)
  project      Project      @relation(fields: [projectId], references: [id], onDelete: Cascade)
  comments     Comment[]
  attachments  Attachment[]
  auditLogs    AuditLog[]

  @@index([projectId, status])
  @@index([assignedToId])
  @@index([dueDate])
  @@index([deletedAt])
}

model Comment {
  id        String   @id @default(cuid())
  body      String
  taskId    String
  userId    String
  deletedAt DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  task      Task     @relation(fields: [taskId], references: [id], onDelete: Cascade)
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([taskId, createdAt])
  @@index([userId])
}

model Attachment {
  id          String   @id @default(cuid())
  fileName    String
  mimeType    String
  size        Int
  url         String
  storageKey  String
  taskId      String?
  projectId   String?
  uploadedById String
  deletedAt   DateTime?
  createdAt   DateTime @default(now())
  task         Task?    @relation(fields: [taskId], references: [id], onDelete: Cascade)
  project      Project? @relation(fields: [projectId], references: [id], onDelete: Cascade)
  uploadedBy   User     @relation(fields: [uploadedById], references: [id], onDelete: Cascade)

  @@index([taskId])
  @@index([projectId])
  @@index([uploadedById])
}

model Notification {
  id        String           @id @default(cuid())
  type      NotificationType
  title     String
  body      String
  readAt    DateTime?
  userId    String
  createdAt DateTime         @default(now())
  user      User             @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, readAt])
  @@index([createdAt])
}

model RefreshToken {
  id        String   @id @default(cuid())
  tokenHash String   @unique
  userId    String
  expiresAt DateTime
  revokedAt DateTime?
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([expiresAt])
}

model AuditLog {
  id        String   @id @default(cuid())
  action    String
  entity    String
  entityId  String
  metadata  Json?
  userId    String?
  taskId    String?
  createdAt DateTime @default(now())
  user      User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  task      Task?    @relation(fields: [taskId], references: [id], onDelete: SetNull)

  @@index([entity, entityId])
  @@index([userId])
  @@index([createdAt])
}
```
