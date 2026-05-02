import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        tasks: {
          orderBy: { createdAt: 'desc' },
          include: { 
            assignee: { select: { name: true, email: true } } 
          }
        },
        members: {
          select: { id: true, name: true, email: true, role: true }
        },
        owner: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    // Role-based Access Control: Only owner or members can view
    if (project.ownerId !== session.user.id && !project.memberIds.includes(session.user.id)) {
      return NextResponse.json({ message: "Forbidden: You do not have access to this project" }, { status: 403 });
    }

    return NextResponse.json(project);
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
    const project = await prisma.project.findUnique({
      where: { id },
      select: { ownerId: true }
    });

    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    // Role-based Access Control: Only the OWNER can delete the project
    if (project.ownerId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden: Only the project owner can delete it" }, { status: 403 });
    }

    // Delete tasks first due to relations, then project
    await prisma.task.deleteMany({ where: { projectId: id } });
    await prisma.project.delete({ where: { id } });

    // Log Activity
    await prisma.activity.create({
      data: {
        userId: session.user.id,
        action: "PROJECT_DELETED",
        details: "Deleted a project"
      }
    });

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
