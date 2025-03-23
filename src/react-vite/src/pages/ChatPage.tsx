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
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      // const newMessage = await response.json();
      const newMessage = {
        id: messages.length + 1,
        response:
          "you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great you are great",
        citation: "hi there",
        role: "bot",
      };
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
    setInputValue("");
    handleFetch();
    console.log(messages);
  };

  return (
    // Wrap with ChatMessageList
    <>
      <ScrollArea className="h-[63vh] w-full rounded-md border p-4">
        <ChatMessageList>
          {messages.map((message, index) => (
            <ChatBubble variant={message.role == "user" ? "sent" : "received"}>
              <ChatBubbleAvatar
                src=""
                fallback={message.role == "user" ? "US" : "AI"}
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
          placeholder="Type your message here..."
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
