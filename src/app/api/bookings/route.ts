import { getMongoDBUserIDofLoggedInUser } from "@/src/actions/users";
import { connectDB } from "@/src/config/dbConfig";
import BookingModel from "@/src/models/booking-models";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

connectDB();

// イベントを登録する際に、ログインしているユーザーが既にデータベースに登録されているかどうかをチェックし、
// 登録されている場合のみイベントの作成を許可する
export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json(
        { message: "ログインまたはアカウント登録してください" },
        { status: 401 }
      );

    const mongoUserId = await getMongoDBUserIDofLoggedInUser();
    const reqBody = await request.json();
    reqBody.user = mongoUserId;
    await BookingModel.create(reqBody);
    return NextResponse.json(
      { message: "イベントの参加予約に成功しました" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
