import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { connectDB } from "@/src/config/dbConfig";
import BookingModel from "@/src/models/booking-models";

connectDB();

export async function PUT(
    request: NextRequest,
    { params }: { params: { bookingid: string } }
) {
    try {
        const { userId } = auth();
        if (!userId)
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        const reqBody = await request.json();
        await BookingModel.findByIdAndUpdate(params.bookingid, reqBody);
        return NextResponse.json(
            { message: "予約の更新が完了しました" },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}