import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "o.mohit@g.com" },
    update: {
      name: "Mohit",
      password: await bcrypt.hash("9809860999", 12),
      role: "ADMIN",
      emailVerifiedAt: new Date(),
    },
    create: {
      name: "Mohit",
      email: "o.mohit@g.com",
      password: await bcrypt.hash("9809860999", 12),
      role: "ADMIN",
      emailVerifiedAt: new Date(),
    },
  });

  const project = await prisma.project.upsert({
    where: { id: "seed-project" },
    update: {},
    create: {
      id: "seed-project",
      title: "Production Launch",
      description: "Operational checklist for the first production release.",
      ownerId: admin.id,
      members: { create: { userId: admin.id, role: "ADMIN" } },
    },
  });

  await prisma.task.upsert({
    where: { id: "seed-task" },
    update: {},
    create: {
      id: "seed-task",
      title: "Verify deployment environment",
      priority: "HIGH",
      status: "TODO",
      projectId: project.id,
      createdById: admin.id,
      assignedToId: admin.id,
    },
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
