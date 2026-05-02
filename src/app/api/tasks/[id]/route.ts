import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { status, priority } = await req.json();

    const task = await prisma.task.findUnique({
      where: { id },
      include: { project: true }
    });

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    // RBAC: Check if user has access to the project OR is the assigned user
    if (
      task.project.ownerId !== session.user.id && 
      !task.project.memberIds.includes(session.user.id) &&
      task.assigneeId !== session.user.id
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(priority && { priority })
      }
    });

    // Log Activity
    if (status) {
      await prisma.activity.create({
        data: {
          userId: session.user.id,
          action: "TASK_UPDATED",
          details: `Updated task "${task.title}" status to ${status}`
        }
      });
    }

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const task = await prisma.task.findUnique({
      where: { id },
      include: { project: true }
    });

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    // RBAC: Only project owner or task creator/assignee should ideally delete, but for now allow members
    if (task.project.ownerId !== session.user.id && !task.project.memberIds.includes(session.user.id)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await prisma.task.delete({ where: { id } });

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
