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

function ChatPage() {
  // const messages = [<Number></Number>];

  const handleSubmit = () => {};

  return (
    // Wrap with ChatMessageList
    <>
      <ScrollArea className="h-[63vh] w-full rounded-md border p-4">
        <ChatMessageList>
          {/* {messages.map((message, index) => (
            <ChatBubble variant="sent">
              <ChatBubbleAvatar fallback="US" />
              <ChatBubbleMessage variant="sent">
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))} */}
          ; // You can map over messages here
          <ChatBubble variant="sent">
            <ChatBubbleAvatar fallback="US" />
            <ChatBubbleMessage variant="sent">
              Hello, how has your day been? I hope you are doing well.
            </ChatBubbleMessage>
          </ChatBubble>
          <ChatBubble variant="sent">
            <ChatBubbleAvatar fallback="US" />
            <ChatBubbleMessage variant="sent">
              Hello, how has your day been? I hope you are doing well.
            </ChatBubbleMessage>
          </ChatBubble>
          <ChatBubble variant="received">
            <ChatBubbleAvatar fallback="AI" />
            <ChatBubbleMessage variant="received">
              Hi, I am doing well, thank you for asking. How can I help you
              today?
            </ChatBubbleMessage>
          </ChatBubble>
          <ChatBubble variant="received">
            <ChatBubbleAvatar fallback="AI" />
            <ChatBubbleMessage isLoading />
          </ChatBubble>
        </ChatMessageList>
      </ScrollArea>

      <form
        className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
        onSubmit={handleSubmit}
      >
        <ChatInput
          placeholder="Type your message here..."
          className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center p-3 pt-0">
          {/* <Button variant="ghost" size="icon">
        <Paperclip className="size-4" />
        <span className="sr-only">Attach file</span>
      </Button> */}

          <Button size="sm" className="ml-auto gap-1.5" type="submit">
            Send Message
            {/* <CornerDownLeft className="size-3.5" /> */}
          </Button>
        </div>
      </form>
    </>
  );
}

export default ChatPage;
