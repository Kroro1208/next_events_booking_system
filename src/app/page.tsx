'use client';
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="p-10">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
