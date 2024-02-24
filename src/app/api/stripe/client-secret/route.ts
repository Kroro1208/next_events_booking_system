import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// バックエンド側の処理
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const amount = reqBody.amount;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "jpy",
      payment_method_types: ["card"],
      metadata: { integration_check: "注文を受け付けました" },
      description: "NEXT EVENT BOOKでのお支払い",
    });

    const clientSecret = paymentIntent.client_secret;

    return NextResponse.json({ clientSecret: clientSecret });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
