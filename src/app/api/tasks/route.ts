import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, description, priority, projectId, status, assigneeId } = await req.json();

    if (!title || !projectId) {
      return NextResponse.json({ message: "Title and Project ID are required" }, { status: 400 });
    }

    // Verify access to the project
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { ownerId: true, memberIds: true }
    });

    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    if (project.ownerId !== session.user.id && !project.memberIds.includes(session.user.id)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority: priority || "MEDIUM",
        status: status || "TODO",
        projectId,
        assigneeId: assigneeId || session.user.id
      }
    });

    // Log Activity
    await prisma.activity.create({
      data: {
        userId: session.user.id,
        action: "TASK_CREATED",
        details: `Created task: ${title}`
      }
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
