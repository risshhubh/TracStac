import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as any).role || "MEMBER";
  
  try {
    if (role === "ADMIN") {
      // Get all team members and their active task counts
      const team = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          _count: {
            select: {
              tasks: {
                where: { status: { not: "DONE" } } // Active workload
              }
            }
          }
        }
      });

      // Get overall project stats
      const totalProjects = await prisma.project.count();
      const totalTasks = await prisma.task.count();
      const completedTasks = await prisma.task.count({ where: { status: "DONE" } });
      const ongoingTasks = await prisma.task.count({ where: { status: "IN_PROGRESS" } });
      const overallProgress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

      // Get recent activities for all users (Admin view)
      const allActivities = await prisma.activity.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        include: { user: { select: { name: true } } }
      });

      return NextResponse.json({
        role: "ADMIN",
        team,
        stats: { totalProjects, totalTasks, completedTasks, ongoingTasks, overallProgress },
        activities: allActivities
      });
    } else {
      // Employee Analytics
      const myTasksCount = await prisma.task.count({ where: { assigneeId: session.user.id } });
      const myCompleted = await prisma.task.count({ where: { assigneeId: session.user.id, status: "DONE" } });
      const myOngoing = await prisma.task.count({ where: { assigneeId: session.user.id, status: "IN_PROGRESS" } });
      const personalProgress = myTasksCount === 0 ? 0 : Math.round((myCompleted / myTasksCount) * 100);

      const recentActivities = await prisma.activity.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 10
      });

      return NextResponse.json({
        role: "MEMBER",
        stats: { totalAssigned: myTasksCount, completed: myCompleted, ongoing: myOngoing, progress: personalProgress },
        activities: recentActivities
      });
    }
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
