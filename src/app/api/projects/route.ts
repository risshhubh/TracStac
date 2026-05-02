import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { ownerId: session.user.id },
          { memberIds: { has: session.user.id } }
        ]
      },
      include: {
        tasks: true,
        _count: {
            select: { tasks: true }
        }
      },
      orderBy: { updatedAt: "desc" }
    });

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if ((session.user as any).role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden: Only Admins can create projects" }, { status: 403 });
  }

  try {
    const { name, description } = await req.json();

    if (!name) {
      return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }

    // DEMO SHORTCUT: Get all user IDs to auto-add everyone to the project so employees can see it instantly
    const allUsers = await prisma.user.findMany({ select: { id: true } });
    const allUserIds = allUsers.map(u => u.id);

    const project = await prisma.project.create({
      data: {
        name,
        description,
        ownerId: session.user.id,
        memberIds: Array.from(new Set([session.user.id, ...allUserIds]))
      }
    });

    // Log activity
    await prisma.activity.create({
        data: {
            userId: session.user.id,
            action: "PROJECT_CREATED",
            details: `Created project: ${name}`
        }
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
