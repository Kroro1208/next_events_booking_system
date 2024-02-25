import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { connectDB } from "@/src/config/dbConfig";
import { getMongoDBUserIDofLoggedInUser } from "@/src/actions/users";
import BookingModel from "@/src/models/booking-models";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json(
        { message: "ログインまたは登録してください" },
        { status: 401 }
      );

    const mongoUserId = await getMongoDBUserIDofLoggedInUser();
    const reqBody = await request.json();
    reqBody.user = mongoUserId;
    await BookingModel.create(reqBody);
    return NextResponse.json(
      { message: "イベントの予約に成功しました" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
