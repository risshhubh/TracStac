import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚮 Wiping operational data (Activities, Tasks, Projects)...');

  await prisma.activity.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.project.deleteMany({});

  console.log('✨ Operational data cleared. Users and Accounts preserved.');
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
