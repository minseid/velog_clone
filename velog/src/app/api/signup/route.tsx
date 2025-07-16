import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // PrismaClient import

export async function POST(req: Request) {
    const { email, name, introduction } = await req.json();

    try {
        const user = await prisma.user.create({
            data: { email, name, introduction }
        });
        return NextResponse.json({ message: "회원가입 성공", userId: user.id }, { status: 201 });
    } catch (error) {
        const err = error as { message: string };
        return NextResponse.json({ message: "회원가입 실패", error: err.message }, { status: 500 });
    }
}