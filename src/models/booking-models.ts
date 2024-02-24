import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: "true",
    },
    ticketType: {
      type: String,
      required: "true",
    },
    ticketCount: {
      type: Number,
      required: "true",
    },
    totalAmount: {
      type: Number,
      required: "true",
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models.bookings) {
  delete mongoose.models.bookings;
}

const BookingModel = mongoose.model("bookings", bookingSchema);
export default BookingModel;
