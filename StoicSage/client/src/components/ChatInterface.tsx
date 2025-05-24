import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic } from "lucide-react";

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      isUser: false,
      text: "Greetings...",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isThinking) return;

    const userMessage = {
      id: Date.now(),
      isUser: true,
      text: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsThinking(true);

    await sendMessageToServer(userMessage.text);
  };

  const sendMessageToServer = async (message: string) => {
    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ query: message }),
      });

      // Log the raw response for debugging
      const responseText = await response.text();
      console.log("Raw response:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse JSON:", parseError);
        throw new Error("Server returned invalid JSON response");
      }

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      if (!data.response) {
        throw new Error("Response missing required data");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          isUser: false,
          text: data.response,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        id: Date.now(),
        isUser: false,
        text: `Sorry, there was an error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto">
      <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-[hsl(var(--secondary-purple))]/30 overflow-hidden shadow-2xl">
        {/* Chat Title */}
        <div className="border-b border-[hsl(var(--secondary-purple))]/30 bg-[hsl(var(--background-dark))]/70 px-6 py-4">
          <h3 className="font-philosopher text-xl font-bold text-[hsl(var(--accent))]">
            Chat with StoicBot
          </h3>
        </div>

        {/* Chat History Display */}
        <div className="h-[400px] md:h-[450px] overflow-y-auto p-6 scroll-custom bg-gradient-to-b from-transparent to-black/20">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-bubble ${message.isUser ? "user" : "bot"}`}
            >
              {message.text.split("\n").map((paragraph, i) => (
                <p key={i} className={i > 0 ? "mt-2" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          {isThinking && (
            <div className="message-bubble bot inline-block">
              <div className="thinking-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-[hsl(var(--secondary-purple))]/30 bg-[hsl(var(--background-dark))]/70">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask StoicBot about stoic philosophy..."
              className="flex-1 bg-black/30 border border-[hsl(var(--secondary-purple))]/30 rounded-xl px-4 py-6 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/50 text-[hsl(var(--text-light))] placeholder-[hsl(var(--text-light))]/50"
            />
            <Button
              type="submit"
              disabled={!inputValue.trim() || isThinking}
              className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/80 text-[hsl(var(--text-light))] px-5 py-6 rounded-xl transition-colors font-medium"
            >
              <Send className="h-5 w-5 mr-2" />
              Send
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
