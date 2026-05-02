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
    const isAdmin = (session.user as any).role === "ADMIN";

    const tasks = await prisma.task.findMany({
      where: isAdmin ? {} : { assigneeId: session.user.id },
      include: {
        project: {
          select: { name: true }
        },
        assignee: {
          select: { name: true, email: true }
        }
      },
      orderBy: { updatedAt: "desc" }
    });

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
