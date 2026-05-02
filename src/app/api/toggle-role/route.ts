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
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const newRole = user.role === "ADMIN" ? "MEMBER" : "ADMIN";

    await prisma.user.update({
      where: { id: user.id },
      data: { role: newRole }
    });

    return NextResponse.json({ message: `Role successfully changed to ${newRole}. Please sign out and sign back in to apply the token update.` });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
