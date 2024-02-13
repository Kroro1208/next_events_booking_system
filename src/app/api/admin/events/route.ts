import { getMongoDBUserIDofLoggedInUser } from "@/src/actions/users";
import { connectDB } from "@/src/config/dbConfig";
import EventModel from "@/src/models/event-model";
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
    await EventModel.create(reqBody);
    return NextResponse.json(
      { message: "イベントの作成に成功しました" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
