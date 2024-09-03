import { ResponsiveGroupChatApp } from "@/components/responsive-group-chat-app";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <ResponsiveGroupChatApp/>
    </main>
  );
}
