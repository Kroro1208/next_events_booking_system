import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/src/config/dbConfig";
import UserModel from "@/src/models/user-model";
import { auth } from "@clerk/nextjs/server";
connectDB();

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) throw new Error("ユーザーが見つかりません");

    const userIdMongoDB = await UserModel.findOne({ clerkUserId: userId });
    return NextResponse.json({ user: userIdMongoDB }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
