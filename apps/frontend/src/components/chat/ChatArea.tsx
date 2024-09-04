import React from "react";
import { Button } from "../ui/button";
import { Menu, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";

const ChatArea = ({
  toggleSidebar,
  activeContact,
  messages,
  handleSendMessage,
  newMessage,
  setNewMessage,
}) => {
  return (
    <>
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-white flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
            <AvatarFallback>
              {activeContact.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 flex-1">
            <h2 className="text-xl font-semibold">{activeContact.name}</h2>
            {activeContact.type === "group" && (
              <p className="text-sm text-gray-500">Group Chat</p>
            )}
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"} mb-4`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender === "You"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {activeContact.type === "group" && message.sender !== "You" && (
                  <p className="text-xs font-semibold mb-1">{message.sender}</p>
                )}
                <p className="text-sm md:text-base">{message.content}</p>
                <span className="text-xs text-gray-400 mt-1 block">
                  {message.time}
                </span>
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* Message Input */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t border-gray-200 bg-white"
        >
          <div className="flex items-center">
            <Input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 mr-2"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatArea;
