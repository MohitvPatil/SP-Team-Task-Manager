import type { SessionUser } from "@/lib/auth";

type Role = SessionUser["role"];
type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

const now = new Date().toISOString();

export const sampleUser: SessionUser & { imageUrl: string | null } = {
  id: "sample-user-1",
  name: "Demo Manager",
  email: "demo@taskflow.local",
  role: "ADMIN",
  imageUrl: null,
};

const sampleMembers = [
  {
    id: "member-1",
    userId: sampleUser.id,
    projectId: "project-1",
    role: sampleUser.role as Role,
    createdAt: now,
    user: sampleUser,
  },
];

export const sampleProjects = [
  {
    id: "project-1",
    title: "Railway Deployment Check",
    description: "Sample project data served without a database.",
    ownerId: sampleUser.id,
    deletedAt: null,
    createdAt: now,
    updatedAt: now,
    owner: sampleUser,
    members: sampleMembers,
    _count: { tasks: 3 },
  },
];

export const sampleTasks = [
  {
    id: "task-1",
    title: "Open /api/meta",
    description: "Confirm that the Railway web service is responding.",
    status: "COMPLETED" as TaskStatus,
    priority: "LOW" as Priority,
    dueDate: null,
    order: 0,
    assignedToId: sampleUser.id,
    createdById: sampleUser.id,
    projectId: "project-1",
    deletedAt: null,
    createdAt: now,
    updatedAt: now,
    assignedTo: sampleUser,
    project: { id: "project-1", title: "Railway Deployment Check" },
    comments: [],
    attachments: [],
  },
  {
    id: "task-2",
    title: "Check login screen",
    description: "Use any valid email and a password with at least 8 characters.",
    status: "IN_PROGRESS" as TaskStatus,
    priority: "MEDIUM" as Priority,
    dueDate: null,
    order: 1,
    assignedToId: sampleUser.id,
    createdById: sampleUser.id,
    projectId: "project-1",
    deletedAt: null,
    createdAt: now,
    updatedAt: now,
    assignedTo: sampleUser,
    project: { id: "project-1", title: "Railway Deployment Check" },
    comments: [],
    attachments: [],
  },
  {
    id: "task-3",
    title: "Connect Railway Postgres later",
    description: "Replace sample metadata with Prisma once DATABASE_URL is ready.",
    status: "TODO" as TaskStatus,
    priority: "HIGH" as Priority,
    dueDate: null,
    order: 2,
    assignedToId: null,
    createdById: sampleUser.id,
    projectId: "project-1",
    deletedAt: null,
    createdAt: now,
    updatedAt: now,
    assignedTo: null,
    project: { id: "project-1", title: "Railway Deployment Check" },
    comments: [],
    attachments: [],
  },
];

export const sampleComments = [
  {
    id: "comment-1",
    body: "Temporary metadata mode is active.",
    taskId: "task-2",
    userId: sampleUser.id,
    deletedAt: null,
    createdAt: now,
    updatedAt: now,
    user: { id: sampleUser.id, name: sampleUser.name, imageUrl: sampleUser.imageUrl },
  },
];

export function createSampleId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function toPublicUser(user = sampleUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    imageUrl: user.imageUrl,
  };
}
