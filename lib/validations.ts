
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  employeeId: z.string().min(3, "Employee ID is required (e.g. EMP-001)"),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const projectSchema = z.object({
  title: z.string().min(2).max(120),
  description: z.string().max(2000).optional().nullable(),
});

export const taskSchema = z.object({
  title: z.string().min(2).max(160),
  description: z.string().max(4000).optional().nullable(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "COMPLETED"]).default("TODO"),
  dueDate: z.string().datetime().optional().nullable(),
  projectId: z.string().min(1),
  assignedToId: z.string().min(1).optional().nullable(),
});

export const taskUpdateSchema = taskSchema.partial().extend({
  order: z.number().int().min(0).optional(),
});

export const commentSchema = z.object({
  body: z.string().min(1).max(4000),
});
