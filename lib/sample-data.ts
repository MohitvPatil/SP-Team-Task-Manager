import type { SessionUser } from "@/lib/auth";

type Role = SessionUser["role"];
type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

const baseDate = new Date("2026-05-14T09:00:00.000Z");
const now = baseDate.toISOString();
const addDays = (days: number) =>
  new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1000).toISOString();

export const sampleUser: SessionUser & { employeeId: string; imageUrl: string | null } = {
  id: "sample-user-1",
  employeeId: "EMP-001",
  name: "Mohit Patil",
  email: "demo@taskflow.local",
  role: "ADMIN",
  imageUrl: null,
};

export const sampleTeamMembers = [
  {
    ...sampleUser,
    position: "Engineering Manager",
    department: "Product Engineering",
    availability: "Available",
  },
  {
    id: "sample-user-2",
    employeeId: "EMP-002",
    name: "Arjun Mehta",
    email: "arjun@taskflow.local",
    role: "MANAGER" as Role,
    imageUrl: null,
    position: "Frontend Lead",
    department: "Web Experience",
    availability: "In sprint",
  },
  {
    id: "sample-user-3",
    employeeId: "EMP-003",
    name: "Neha Kapoor",
    email: "neha@taskflow.local",
    role: "MEMBER" as Role,
    imageUrl: null,
    position: "Backend Engineer",
    department: "Platform",
    availability: "Focused",
  },
  {
    id: "sample-user-4",
    employeeId: "EMP-004",
    name: "Rohan Verma",
    email: "rohan@taskflow.local",
    role: "MEMBER" as Role,
    imageUrl: null,
    position: "Product Designer",
    department: "Design",
    availability: "Available",
  },
  {
    id: "sample-user-5",
    employeeId: "EMP-005",
    name: "Sara Khan",
    email: "sara@taskflow.local",
    role: "MEMBER" as Role,
    imageUrl: null,
    position: "QA Analyst",
    department: "Quality",
    availability: "Reviewing",
  },
  {
    id: "sample-user-6",
    employeeId: "EMP-006",
    name: "Dev Patel",
    email: "dev@taskflow.local",
    role: "MEMBER" as Role,
    imageUrl: null,
    position: "DevOps Engineer",
    department: "Infrastructure",
    availability: "On-call",
  },
  {
    id: "sample-user-7",
    employeeId: "EMP-007",
    name: "Meera Nair",
    email: "meera@taskflow.local",
    role: "MANAGER" as Role,
    imageUrl: null,
    position: "Product Manager",
    department: "Product",
    availability: "Available",
  },
  {
    id: "sample-user-8",
    employeeId: "EMP-008",
    name: "Kabir Singh",
    email: "kabir@taskflow.local",
    role: "MEMBER" as Role,
    imageUrl: null,
    position: "Mobile Developer",
    department: "Mobile",
    availability: "In sprint",
  },
  {
    id: "sample-user-9",
    employeeId: "EMP-009",
    name: "Ananya Rao",
    email: "ananya@taskflow.local",
    role: "MEMBER" as Role,
    imageUrl: null,
    position: "Data Analyst",
    department: "Analytics",
    availability: "Available",
  },
  {
    id: "sample-user-10",
    employeeId: "EMP-010",
    name: "Vikram Joshi",
    email: "vikram@taskflow.local",
    role: "MEMBER" as Role,
    imageUrl: null,
    position: "Security Engineer",
    department: "Security",
    availability: "Focused",
  },
];

const employeeForProject = (projectId: string, userIds: string[]) =>
  userIds.map((userId) => {
    const user = sampleTeamMembers.find((e) => e.id === userId) ?? sampleTeamMembers[0];
    return {
      id: `member-${projectId}-${user.id}`,
      userId: user.id,
      projectId,
      role: user.role,
      position: user.position,
      createdAt: now,
      user,
    };
  });

export const sampleProjects = [
  // ── Ongoing ──
  {
    id: "project-1",
    title: "Internal Task Manager Rollout",
    description: "Deploy the manager workspace for tracking company projects, team assignments, and deadlines.",
    assignedAt: addDays(-6),
    deadline: addDays(2),
    completedAt: null,
    state: "ONGOING",
    health: "On Track",
    progress: 67,
    ownerId: sampleUser.id,
    deletedAt: null,
    createdAt: now,
    updatedAt: now,
    owner: sampleUser,
    members: employeeForProject("project-1", ["sample-user-1", "sample-user-2", "sample-user-3"]),
    _count: { tasks: 5 },
  },
  {
    id: "project-2",
    title: "Client Portal Polish",
    description: "Improve the pages clients use to review work, deadlines, and delivery updates.",
    assignedAt: addDays(-3),
    deadline: addDays(7),
    completedAt: null,
    state: "ONGOING",
    health: "At Risk",
    progress: 42,
    ownerId: sampleUser.id,
    deletedAt: null,
    createdAt: now,
    updatedAt: addDays(1),
    owner: sampleUser,
    members: employeeForProject("project-2", ["sample-user-2", "sample-user-4", "sample-user-5"]),
    _count: { tasks: 4 },
  },
  {
    id: "project-4",
    title: "Mobile App v2 Launch",
    description: "Ship the second major version of the mobile app with offline support, push notifications, and redesigned onboarding.",
    assignedAt: addDays(-10),
    deadline: addDays(20),
    completedAt: null,
    state: "ON_HOLD",
    health: "On Track",
    progress: 55,
    ownerId: sampleUser.id,
    deletedAt: null,
    createdAt: addDays(-10),
    updatedAt: addDays(-1),
    owner: sampleUser,
    members: employeeForProject("project-4", ["sample-user-7", "sample-user-8", "sample-user-4", "sample-user-5"]),
    _count: { tasks: 5 },
  },
  {
    id: "project-5",
    title: "Infrastructure Hardening",
    description: "Improve server reliability, set up monitoring, auto-scaling, and disaster recovery playbooks.",
    assignedAt: addDays(-5),
    deadline: addDays(15),
    completedAt: null,
    state: "ONGOING",
    health: "On Track",
    progress: 30,
    ownerId: sampleUser.id,
    deletedAt: null,
    createdAt: addDays(-5),
    updatedAt: now,
    owner: sampleUser,
    members: employeeForProject("project-5", ["sample-user-6", "sample-user-10", "sample-user-3"]),
    _count: { tasks: 4 },
  },
  {
    id: "project-6",
    title: "Analytics Dashboard",
    description: "Build a real-time analytics dashboard showing user activity, funnel drop-offs, and conversion metrics.",
    assignedAt: addDays(-2),
    deadline: addDays(25),
    completedAt: null,
    state: "PLANNING",
    health: "On Track",
    progress: 0,
    ownerId: sampleUser.id,
    deletedAt: null,
    createdAt: addDays(-2),
    updatedAt: now,
    owner: sampleUser,
    members: employeeForProject("project-6", ["sample-user-9", "sample-user-7", "sample-user-2"]),
    _count: { tasks: 3 },
  },
  // ── Completed ──
  {
    id: "project-3",
    title: "Team Operations Setup",
    description: "Prepare team roles, weekly reporting, and operating rhythm.",
    assignedAt: addDays(-12),
    deadline: addDays(14),
    completedAt: addDays(-1),
    state: "COMPLETED",
    health: "Completed",
    progress: 100,
    ownerId: sampleUser.id,
    deletedAt: null,
    createdAt: now,
    updatedAt: addDays(2),
    owner: sampleUser,
    members: employeeForProject("project-3", ["sample-user-1", "sample-user-3", "sample-user-5"]),
    _count: { tasks: 3 },
  },
  {
    id: "project-7",
    title: "Design System v1",
    description: "Create a shared component library, colour tokens, and Figma guidelines for consistent UI across all products.",
    assignedAt: addDays(-30),
    deadline: addDays(-5),
    completedAt: addDays(-6),
    state: "COMPLETED",
    health: "Completed",
    progress: 100,
    ownerId: sampleUser.id,
    deletedAt: null,
    createdAt: addDays(-30),
    updatedAt: addDays(-6),
    owner: sampleUser,
    members: employeeForProject("project-7", ["sample-user-4", "sample-user-2", "sample-user-7"]),
    _count: { tasks: 4 },
  },
  {
    id: "project-8",
    title: "Security Audit Q1",
    description: "Run penetration tests, patch critical CVEs, and produce a signed-off security report for the board.",
    assignedAt: addDays(-45),
    deadline: addDays(-10),
    completedAt: addDays(-11),
    state: "COMPLETED",
    health: "Completed",
    progress: 100,
    ownerId: sampleUser.id,
    deletedAt: null,
    createdAt: addDays(-45),
    updatedAt: addDays(-11),
    owner: sampleUser,
    members: employeeForProject("project-8", ["sample-user-10", "sample-user-6", "sample-user-1"]),
    _count: { tasks: 3 },
  },
];

export const sampleTasks = [
  // project-1
  { id: "task-1",  title: "Verify Railway health endpoint",     description: "Confirm the Railway web service responds on /api/health.",           status: "COMPLETED" as TaskStatus, priority: "LOW" as Priority,    dueDate: addDays(1),  order: 0, assignedToId: sampleUser.id, createdById: sampleUser.id, projectId: "project-1", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: sampleTeamMembers[2], project: { id: "project-1", title: "Internal Task Manager Rollout" }, comments: [], attachments: [] },
  { id: "task-2",  title: "Check manager login flow",           description: "Make sure managers can sign in and land on the dashboard.",          status: "IN_PROGRESS" as TaskStatus, priority: "MEDIUM" as Priority, dueDate: addDays(2),  order: 1, assignedToId: sampleUser.id, createdById: sampleUser.id, projectId: "project-1", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: sampleTeamMembers[1], project: { id: "project-1", title: "Internal Task Manager Rollout" }, comments: [], attachments: [] },
  { id: "task-3",  title: "Connect production database",        description: "Replace sample metadata with Prisma once DATABASE_URL is ready.",    status: "TODO" as TaskStatus,        priority: "HIGH" as Priority,   dueDate: addDays(5),  order: 2, assignedToId: null,           createdById: sampleUser.id, projectId: "project-1", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: null,                 project: { id: "project-1", title: "Internal Task Manager Rollout" }, comments: [], attachments: [] },
  { id: "task-14", title: "Write API documentation",            description: "Document all REST endpoints with request/response examples.",         status: "TODO" as TaskStatus,        priority: "MEDIUM" as Priority, dueDate: addDays(8),  order: 3, assignedToId: sampleUser.id, createdById: sampleUser.id, projectId: "project-1", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: sampleTeamMembers[0], project: { id: "project-1", title: "Internal Task Manager Rollout" }, comments: [], attachments: [] },
  { id: "task-15", title: "Set up role-based access tests",     description: "Add integration tests for ADMIN, MANAGER, MEMBER permission gates.", status: "IN_PROGRESS" as TaskStatus, priority: "HIGH" as Priority,   dueDate: addDays(3),  order: 4, assignedToId: sampleUser.id, createdById: sampleUser.id, projectId: "project-1", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: sampleTeamMembers[4], project: { id: "project-1", title: "Internal Task Manager Rollout" }, comments: [], attachments: [] },

  // project-2
  { id: "task-4",  title: "Review project detail layout",       description: "Project pages should show scope, deadline, status, and tasks.",      status: "REVIEW" as TaskStatus,      priority: "HIGH" as Priority,   dueDate: addDays(4),  order: 0, assignedToId: sampleUser.id, createdById: sampleUser.id, projectId: "project-2", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: sampleTeamMembers[3], project: { id: "project-2", title: "Client Portal Polish" }, comments: [], attachments: [] },
  { id: "task-5",  title: "Prepare client deadline summary",    description: "Create a clean list of upcoming dates and blockers.",                status: "IN_PROGRESS" as TaskStatus, priority: "URGENT" as Priority,  dueDate: addDays(7),  order: 1, assignedToId: sampleUser.id, createdById: sampleUser.id, projectId: "project-2", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: sampleTeamMembers[4], project: { id: "project-2", title: "Client Portal Polish" }, comments: [], attachments: [] },
  { id: "task-16", title: "Fix mobile nav overflow bug",        description: "Navigation menu clips on screens narrower than 375px.",              status: "TODO" as TaskStatus,        priority: "HIGH" as Priority,   dueDate: addDays(3),  order: 2, assignedToId: sampleUser.id, createdById: sampleUser.id, projectId: "project-2", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: sampleTeamMembers[1], project: { id: "project-2", title: "Client Portal Polish" }, comments: [], attachments: [] },
  { id: "task-17", title: "Add CSV export to reports page",     description: "Allow clients to download their delivery report as a CSV file.",     status: "TODO" as TaskStatus,        priority: "MEDIUM" as Priority, dueDate: addDays(9),  order: 3, assignedToId: null,           createdById: sampleUser.id, projectId: "project-2", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: null,                 project: { id: "project-2", title: "Client Portal Polish" }, comments: [], attachments: [] },

  // project-3
  { id: "task-6",  title: "Finalize role permissions",          description: "Confirm ADMIN, MANAGER, and MEMBER behavior for demo flows.",        status: "COMPLETED" as TaskStatus,  priority: "MEDIUM" as Priority, dueDate: addDays(10), order: 0, assignedToId: sampleUser.id, createdById: sampleUser.id, projectId: "project-3", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: sampleTeamMembers[2], project: { id: "project-3", title: "Team Operations Setup" }, comments: [], attachments: [] },
  { id: "task-7",  title: "Set weekly reporting template",      description: "Define what belongs on the dashboard every week.",                  status: "COMPLETED" as TaskStatus,  priority: "LOW" as Priority,    dueDate: addDays(12), order: 1, assignedToId: sampleUser.id, createdById: sampleUser.id, projectId: "project-3", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: sampleTeamMembers[4], project: { id: "project-3", title: "Team Operations Setup" }, comments: [], attachments: [] },
  { id: "task-18", title: "Onboard new joiners checklist",      description: "Document steps and tools needed for onboarding any new team employee.",status: "COMPLETED" as TaskStatus,  priority: "LOW" as Priority,    dueDate: addDays(6),  order: 2, assignedToId: sampleUser.id, createdById: sampleUser.id, projectId: "project-3", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: sampleTeamMembers[0], project: { id: "project-3", title: "Team Operations Setup" }, comments: [], attachments: [] },

  // project-4
  { id: "task-8",  title: "Implement offline mode cache",       description: "Use service workers to cache key screens for offline access.",       status: "IN_PROGRESS" as TaskStatus, priority: "HIGH" as Priority,   dueDate: addDays(12), order: 0, assignedToId: sampleUser.id, createdById: sampleUser.id, projectId: "project-4", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: sampleTeamMembers[7], project: { id: "project-4", title: "Mobile App v2 Launch" }, comments: [], attachments: [] },
  { id: "task-9",  title: "Redesign onboarding screens",        description: "New onboarding flow with value-first slides and skip option.",       status: "REVIEW" as TaskStatus,      priority: "MEDIUM" as Priority, dueDate: addDays(10), order: 1, assignedToId: sampleUser.id, createdById: sampleUser.id, projectId: "project-4", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: sampleTeamMembers[3], project: { id: "project-4", title: "Mobile App v2 Launch" }, comments: [], attachments: [] },
  { id: "task-19", title: "Integrate push notification service", description: "Connect FCM and handle foreground/background notification routing.", status: "TODO" as TaskStatus,        priority: "HIGH" as Priority,   dueDate: addDays(18), order: 2, assignedToId: sampleUser.id, createdById: sampleUser.id, projectId: "project-4", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: sampleTeamMembers[7], project: { id: "project-4", title: "Mobile App v2 Launch" }, comments: [], attachments: [] },
  { id: "task-20", title: "QA regression suite for v2",         description: "Run full regression on all v1 flows to ensure nothing regressed.",   status: "TODO" as TaskStatus,        priority: "URGENT" as Priority,  dueDate: addDays(19), order: 3, assignedToId: sampleUser.id, createdById: sampleUser.id, projectId: "project-4", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: sampleTeamMembers[4], project: { id: "project-4", title: "Mobile App v2 Launch" }, comments: [], attachments: [] },
  { id: "task-21", title: "App store submission checklist",      description: "Prepare screenshots, descriptions, and metadata for Play Store & App Store.", status: "TODO" as TaskStatus, priority: "MEDIUM" as Priority, dueDate: addDays(20), order: 4, assignedToId: null, createdById: sampleUser.id, projectId: "project-4", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: null, project: { id: "project-4", title: "Mobile App v2 Launch" }, comments: [], attachments: [] },

  // project-5
  { id: "task-10", title: "Set up Prometheus monitoring",       description: "Install and configure Prometheus + Grafana dashboards for all services.", status: "IN_PROGRESS" as TaskStatus, priority: "HIGH" as Priority, dueDate: addDays(8), order: 0, assignedToId: sampleUser.id, createdById: sampleUser.id, projectId: "project-5", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: sampleTeamMembers[5], project: { id: "project-5", title: "Infrastructure Hardening" }, comments: [], attachments: [] },
  { id: "task-11", title: "Configure auto-scaling policies",    description: "Set up horizontal pod autoscaling based on CPU and memory metrics.",  status: "TODO" as TaskStatus,        priority: "MEDIUM" as Priority, dueDate: addDays(14), order: 1, assignedToId: sampleUser.id, createdById: sampleUser.id, projectId: "project-5", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: sampleTeamMembers[5], project: { id: "project-5", title: "Infrastructure Hardening" }, comments: [], attachments: [] },
  { id: "task-22", title: "Write disaster recovery runbook",    description: "Document step-by-step recovery procedures for each critical service.", status: "TODO" as TaskStatus,        priority: "HIGH" as Priority,   dueDate: addDays(13), order: 2, assignedToId: sampleUser.id, createdById: sampleUser.id, projectId: "project-5", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: sampleTeamMembers[9], project: { id: "project-5", title: "Infrastructure Hardening" }, comments: [], attachments: [] },
  { id: "task-23", title: "Load test production environment",   description: "Simulate 10× peak traffic and document bottlenecks.",                status: "TODO" as TaskStatus,        priority: "URGENT" as Priority,  dueDate: addDays(15), order: 3, assignedToId: null,           createdById: sampleUser.id, projectId: "project-5", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: null,                 project: { id: "project-5", title: "Infrastructure Hardening" }, comments: [], attachments: [] },

  // project-6
  { id: "task-12", title: "Define KPI data model",              description: "Agree on the metrics schema with product and engineering leads.",    status: "IN_PROGRESS" as TaskStatus, priority: "HIGH" as Priority,   dueDate: addDays(5),  order: 0, assignedToId: sampleUser.id, createdById: sampleUser.id, projectId: "project-6", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: sampleTeamMembers[8], project: { id: "project-6", title: "Analytics Dashboard" }, comments: [], attachments: [] },
  { id: "task-13", title: "Build funnel drop-off chart",        description: "Visualise where users leave the conversion funnel step-by-step.",    status: "TODO" as TaskStatus,        priority: "MEDIUM" as Priority, dueDate: addDays(22), order: 1, assignedToId: sampleUser.id, createdById: sampleUser.id, projectId: "project-6", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: sampleTeamMembers[8], project: { id: "project-6", title: "Analytics Dashboard" }, comments: [], attachments: [] },
  { id: "task-24", title: "Wire up real-time event stream",     description: "Connect WebSocket feed from the event pipeline to the dashboard.",   status: "TODO" as TaskStatus,        priority: "URGENT" as Priority,  dueDate: addDays(20), order: 2, assignedToId: null,           createdById: sampleUser.id, projectId: "project-6", deletedAt: null, createdAt: now, updatedAt: now, assignedTo: null,                 project: { id: "project-6", title: "Analytics Dashboard" }, comments: [], attachments: [] },
];

export const sampleComments = [
  { id: "comment-1", body: "Temporary metadata mode is active — will swap to Prisma once DB is ready.",     taskId: "task-2",  userId: sampleUser.id, deletedAt: null, createdAt: now,          updatedAt: now,          user: { id: sampleUser.id, name: sampleUser.name, imageUrl: sampleUser.imageUrl } },
  { id: "comment-2", body: "Deadline looks tight, we may need to push this by 2 days.",                     taskId: "task-5",  userId: "sample-user-2", deletedAt: null, createdAt: addDays(-1),  updatedAt: addDays(-1),  user: { id: "sample-user-2", name: "Arjun Mehta", imageUrl: null } },
  { id: "comment-3", body: "Offline cache implementation is blocked on the new API contract from backend.",  taskId: "task-8",  userId: "sample-user-8", deletedAt: null, createdAt: addDays(-2),  updatedAt: addDays(-2),  user: { id: "sample-user-8", name: "Kabir Singh", imageUrl: null } },
  { id: "comment-4", body: "Prometheus setup done for web service. DB metrics still pending.",               taskId: "task-10", userId: "sample-user-6", deletedAt: null, createdAt: addDays(-1),  updatedAt: addDays(-1),  user: { id: "sample-user-6", name: "Dev Patel", imageUrl: null } },
  { id: "comment-5", body: "KPI schema draft shared in Notion. Please review before tomorrow's standup.",   taskId: "task-12", userId: "sample-user-9", deletedAt: null, createdAt: now,          updatedAt: now,          user: { id: "sample-user-9", name: "Ananya Rao", imageUrl: null } },
  { id: "comment-6", body: "Onboarding checklist approved. Good to archive this task.",                     taskId: "task-18", userId: sampleUser.id, deletedAt: null, createdAt: addDays(-3),  updatedAt: addDays(-3),  user: { id: sampleUser.id, name: sampleUser.name, imageUrl: sampleUser.imageUrl } },
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
