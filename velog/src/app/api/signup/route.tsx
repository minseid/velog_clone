import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { email, name, id, introduction } = await req.json();

        // 필수 필드 검증
        if (!email || !name || !id) {
            return NextResponse.json(
                { message: "필수 필드가 누락되었습니다." }, 
                { status: 400 }
            );
        }

        // 이메일 중복 확인
        const existingUserByEmail = await prisma.user.findFirst({
            where: { email }
        });

        if (existingUserByEmail) {
            return NextResponse.json(
                { message: "이미 사용중인 이메일입니다." }, 
                { status: 409 }
            );
        }

        // 사용자 ID 중복 확인
        const existingUserById = await prisma.user.findFirst({
            where: { userId: id }
        });

        if (existingUserById) {
            return NextResponse.json(
                { message: "이미 사용중인 사용자 ID입니다." }, 
                { status: 409 }
            );
        }

        // 사용자 생성
        const user = await prisma.user.create({
            data: { 
                email, 
                name, 
                userId: id, 
                introduction: introduction || null 
            }
        });

        return NextResponse.json(
            { message: "회원가입 성공", userId: user.id }, 
            { status: 201 }
        );
    } catch (error) {
        console.error("Signup error:", error);
        const err = error as { message: string };
        return NextResponse.json(
            { message: "회원가입 실패", error: err.message }, 
            { status: 500 }
        );
    }
}