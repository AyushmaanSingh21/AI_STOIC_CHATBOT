import ChatInterface from "@/components/ChatInterface";
import { Helmet } from "react-helmet";

export default function Chat() {
  return (
    <>
      <Helmet>
        <title>Chat with StoicBot - Ancient Wisdom for Modern Times</title>
        <meta
          name="description"
          content="Have a conversation with StoicBot about stoic philosophy, virtue, resilience, and finding peace in a chaotic world."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <main className="flex-grow py-8 px-4">
          <ChatInterface />
        </main>
      </div>
    </>
  );
}