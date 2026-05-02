import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.activity.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.user.deleteMany({});

  // Create Admin User
  const admin = await prisma.user.create({
    data: {
      email: 'admin@trackstack.com',
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  // Create Member User
  const member = await prisma.user.create({
    data: {
      email: 'member@trackstack.com',
      name: 'Team Member',
      role: 'MEMBER',
    },
  });

  // Create a Project
  const project = await prisma.project.create({
    data: {
      name: 'TrackStack Redesign',
      description: 'The major UI/UX overhaul of the platform.',
      ownerId: admin.id,
      memberIds: [admin.id, member.id],
    },
  });

  // Create Tasks
  await prisma.task.createMany({
    data: [
      {
        title: 'Design Hero Section',
        description: 'Create a high-impact hero section with glassmorphism.',
        status: 'DONE',
        priority: 'HIGH',
        assigneeId: admin.id,
        projectId: project.id,
      },
      {
        title: 'Implement Auth Flow',
        description: 'Setup NextAuth with role-based access.',
        status: 'IN_PROGRESS',
        priority: 'URGENT',
        assigneeId: member.id,
        projectId: project.id,
      },
    ],
  });

  // Create Sample Activities
  await prisma.activity.createMany({
    data: [
      {
        userId: admin.id,
        action: 'USER_SIGNUP',
        details: 'Admin user joined the platform.',
      },
      {
        userId: admin.id,
        action: 'PROJECT_CREATED',
        details: `Created project: ${project.name}`,
      },
      {
        userId: member.id,
        action: 'USER_SIGNUP',
        details: 'Team member joined the platform.',
      },
    ],
  });

  console.log('Seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
