import { connectDB } from "../config/dbConfig";
import { UserButton } from "@clerk/nextjs";
connectDB();

export default function Home() {
  return (
    <div className="p-10">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
