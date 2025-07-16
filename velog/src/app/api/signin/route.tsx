import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { message: "이메일을 입력해주세요." }, 
                { status: 400 }
            );
        }

        // 사용자 존재 확인
        const user = await prisma.user.findFirst({
            where: { email }
        });

        if (!user) {
            return NextResponse.json(
                { message: "등록되지 않은 이메일입니다." }, 
                { status: 404 }
            );
        }

        // 실제 프로덕션에서는 JWT 토큰 생성, 세션 처리 등이 필요
        return NextResponse.json(
            { 
                message: "로그인 성공", 
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    userId: user.userId
                }
            }, 
            { status: 200 }
        );
    } catch (error) {
        console.error("Signin error:", error);
        const err = error as { message: string };
        return NextResponse.json(
            { message: "로그인 실패", error: err.message }, 
            { status: 500 }
        );
    }
}