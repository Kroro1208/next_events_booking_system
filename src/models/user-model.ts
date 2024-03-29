import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// check if the model is already compiled

if (mongoose.models && mongoose.models["users"]) {
  delete mongoose.models["users"];
}

const UserModel = mongoose.model("users", userSchema);
export default UserModel;

// modelsはDBのusersコレクションに保存されたユーザーデータを操作するためのインターフェースを指す
