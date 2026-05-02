import prisma from './prisma';

export type ActivityType = 
  | 'USER_SIGNUP' 
  | 'USER_LOGIN' 
  | 'PROJECT_CREATED' 
  | 'TASK_CREATED' 
  | 'TASK_COMPLETED' 
  | 'TASK_UPDATED';

export async function logActivity(userId: string, action: ActivityType, details: string) {
  try {
    await prisma.activity.create({
      data: {
        userId,
        action,
        details,
      },
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
}
