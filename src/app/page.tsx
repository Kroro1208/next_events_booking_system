import { handleNewUserRegistration, getMongoDBUserIDofLoggedInUser } from "../actions/users";
import { connectDB } from "../config/dbConfig";
import { UserButton } from "@clerk/nextjs";

connectDB();

export default async function Home() {
  await handleNewUserRegistration();
  const mongoUserId = await getMongoDBUserIDofLoggedInUser();
  console.log('mongoUserID', mongoUserId);
  return (
    <div className="p-10">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
