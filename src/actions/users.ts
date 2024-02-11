import { connectDB } from "../config/dbConfig";
import UserModel from "../models/user-model";
import { currentUser } from "@clerk/nextjs";
connectDB();

// 現在ログインしているユーザーの情報を取得
export const handleNewUserRegistration = async () => {
  try {
    const loggedInUser = await currentUser();

    //check if the user is register
    const userExists = await UserModel.findOne({
      clerkUserId: loggedInUser?.id,
    });

    // そのユーザーがMongoDBのデータベースに既に存在するかどうかを確認
    if (userExists) return userExists;

    // ユーザーが存在しない場合、新しいユーザーレコードをデータベースに作成し、保存
    const newUser = new UserModel({
      username: loggedInUser?.username || "defaultUsername",
      email: loggedInUser?.emailAddresses[0].emailAddress,
      clerkUserId: loggedInUser?.id,
    });
    console.log(newUser);
    await newUser.save();
    return newUser; // 新しく作成されたユーザー、または既存のユーザーの情報を返す
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// 現在ログインしているユーザーの情報を取得
export const getMongoDBUserIDofLoggedInUser = async () => {
  try {
    const loggedInUser = await currentUser();
    // そのユーザーに対応するMongoDBのデータベース内のドキュメントを検索
    const userInMongoDB = await UserModel.findOne({
      clerkUserId: loggedInUser?.id,
    });
    // ユーザーがデータベースに存在する場合、そのMongoDBのドキュメントID（_id）を返す
    console.log(loggedInUser);
    if (userInMongoDB) return userInMongoDB._id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
