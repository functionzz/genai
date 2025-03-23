// import { Progress } from "@/components/ui/progress";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormEvent, useState, useEffect, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";

interface Message {
  id: number;
  response: string;
  citation: string;
  role: string;
}

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Runs when messages update

  const handleFetch = async () => {
    setLoading(true); // Disable components
    try {

      // const response = await fetch("http://127.0.0.1:5000/delete-files", {
      //   method: "DELETE", // Use DELETE method
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ file_names: selectedFiles }),
      // });
      
      const response = await fetch(
        "http://127.0.0.1:5000/prompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: inputValue }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to Call Prompt");
      }

      const newMessage = await response.json();
      // const newMessage = {
      //   id: messages.length + 1,
      //   response:
      //     "1️⃣ Steady Revenue Growth – Our business has seen a consistent increase in revenue over the past year, reflecting strong customer demand and strategic expansion efforts. 2️⃣ Profit Margins on the Rise – By optimizing operations and cutting unnecessary expenses, we’ve successfully increased our profit margins, ensuring long-term sustainability. 3️⃣ Smart Investments – Investing in the right tools, technology, and marketing strategies has led to higher returns and improved efficiency, fueling business growth. 4️⃣ Breaking Even & Beyond – What started as a vision has now turned into a profitable venture. We hit our break-even point ahead of schedule and are now generating solid profits.",
      //   citation: "hi there",
      //   role: "bot",
      // };
      setMessages((messages) => [...messages, newMessage]);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false); // Enable components again
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log(messages);
    setMessages((messages) => [
      ...messages,
      {
        id: messages.length + 1,
        response: inputValue,
        citation: "",
        role: "user",
      },
    ]);
    console.log(messages);
    handleFetch();
    setInputValue("");
    console.log(messages);
  };

  return (
    // Wrap with ChatMessageList
    <>
      <ScrollArea className="h-[63vh] w-full rounded-md border p-4">
        <ChatMessageList>
          <ChatBubble variant="received">
            <ChatBubbleAvatar fallback="GU" />
            <ChatBubbleMessage variant="received">
              Hey There, I'm Guru ~ how can I assist your financial goals today?
            </ChatBubbleMessage>
          </ChatBubble>
          {messages.map((message, index) => (
            <ChatBubble variant={message.role == "user" ? "sent" : "received"}>
              <ChatBubbleAvatar
                src=""
                fallback={message.role == "user" ? "ME" : "GU"}
              />
              <ChatBubbleMessage
                variant={message.role == "user" ? "sent" : "received"}
                isLoading={loading && message.role == "bot"}
              >
                {message.role === "bot" && messages.length - 1 === index ? (
                  <Typewriter words={[message.response]} typeSpeed={5} />
                ) : (
                  message.response
                )}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
        </ChatMessageList>
        <div ref={bottomRef} /> {/* Invisible div at the bottom */}
      </ScrollArea>

      <form
        className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
        onSubmit={handleSubmit}
      >
        <ChatInput
          placeholder="Gain financial insights here..."
          className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0 "
          disabled={loading}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex items-center p-3 pt-0">
          <Button
            size="sm"
            className="ml-auto gap-1.5"
            type="submit"
            disabled={loading || inputValue.length === 0}
          >
            Send Message
            {/* <CornerDownLeft className="size-3.5" /> */}
          </Button>
        </div>
      </form>
    </>
  );
}

export default ChatPage;
