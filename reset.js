const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚮 Starting total database wipe...');
  try {
    await prisma.activity.deleteMany({});
    await prisma.task.deleteMany({});
    await prisma.project.deleteMany({});
    console.log('✨ Operational data cleared (Activities, Tasks, Projects preserved).');
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
