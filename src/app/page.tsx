import { connectDB } from "../config/dbConfig";
import { UserButton } from "@clerk/nextjs";
// import { auth, currentUser } from "@clerk/nextjs/server";
connectDB();

export default async function Home() {
  // const { userId } = auth();
  // const user = await currentUser();
  // console.log(user?.username);
  // console.log(userId);
  return (
    <div className="p-10">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
