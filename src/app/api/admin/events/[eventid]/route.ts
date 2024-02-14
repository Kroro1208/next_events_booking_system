import { connectDB } from "@/src/config/dbConfig";
import EventModel from "@/src/models/event-model";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function PUT(
  request: NextRequest,
  { params }: { params: { eventid: string } }
) {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json(
        { message: "ログインまたはアカウント登録してください" },
        { status: 401 }
      );

    const reqBody = await request.json();
    await EventModel.findByIdAndUpdate(params.eventid, reqBody);
    return NextResponse.json(
      { message: "イベント情報が更新されました" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { eventid: string } }
) {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json(
        { message: "ログインまたはアカウント登録してください" },
        { status: 401 }
      );

    await EventModel.findByIdAndDelete(params.eventid);
    return NextResponse.json(
      { message: "イベント情報が更新されました" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
