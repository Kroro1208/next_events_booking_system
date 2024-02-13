import mongoose, { mongo } from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
    },
    guests: {
      type: Array,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    ticketTypes: {
      type: Array,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

// モデルが重複して定義されることを防ぐため、すでにeventsモデルがMongooseによって定義されている場合は削除。
if (mongoose.models && mongoose.models.events) {
  delete mongoose.models.events;
}

// イベント（events）に関連する情報を保存するためのスキーマを作成し(eventSchema)、それを用いてEventModel Modelを生成
const EventModel = mongoose.model("events", eventSchema);
export default EventModel;
