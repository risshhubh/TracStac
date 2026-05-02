const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function reset() {
  console.log('🚮 Starting database reset...');

  try {
    // Order matters to satisfy foreign key constraints if they weren't Cascade
    await prisma.activity.deleteMany({});
    console.log('✅ Activities cleared');

    await prisma.task.deleteMany({});
    console.log('✅ Tasks cleared');

    await prisma.project.deleteMany({});
    console.log('✅ Projects cleared');

    await prisma.session.deleteMany({});
    console.log('✅ Sessions cleared');

    await prisma.account.deleteMany({});
    console.log('✅ Accounts cleared');

    await prisma.user.deleteMany({});
    console.log('✅ Users cleared');

    console.log('✨ Database is now fresh and empty!');
  } catch (error) {
    console.error('❌ Error during reset:', error);
  } finally {
    await prisma.$disconnect();
  }
}

reset();
