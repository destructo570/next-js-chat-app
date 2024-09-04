import { ChatComponent } from "@/components/chat/ChatComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <ChatComponent/>
    </main>
  );
}
