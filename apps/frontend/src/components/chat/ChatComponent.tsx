"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {  Search } from "lucide-react";
import { PlusIcon } from "@radix-ui/react-icons"
import ChatListItem from "./ChatListItem";
import ChatArea from "./ChatArea";
import { Button } from "../ui/button";
import SearchContactModal from "./SearchContactModal";

type ContactType = "individual" | "group";

type Contact = {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  type: ContactType;
};

type Message = {
  id: number;
  sender: string;
  content: string;
  time: string;
};

const contacts: Contact[] = [
  {
    id: 1,
    name: "Alice Smith",
    avatar: "/placeholder.svg?height=32&width=32",
    lastMessage: "Hey, how are you?",
    time: "10:30 AM",
    type: "individual",
  },
  {
    id: 2,
    name: "Bob Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    lastMessage: "Can we meet tomorrow?",
    time: "Yesterday",
    type: "individual",
  },
  {
    id: 3,
    name: "Project Team",
    avatar: "/placeholder.svg?height=32&width=32",
    lastMessage: "Carol: Thanks for your help!",
    time: "Tuesday",
    type: "group",
  },
  {
    id: 4,
    name: "Family Group",
    avatar: "/placeholder.svg?height=32&width=32",
    lastMessage: "Mom: Don't forget the dinner on Sunday",
    time: "Monday",
    type: "group",
  },
];

const initialMessages: Message[] = [
  { id: 1, sender: "Alice", content: "Hey, how's it going?", time: "10:30 AM" },
  {
    id: 2,
    sender: "You",
    content: "Not bad, just working on a project. You?",
    time: "10:32 AM",
  },
  {
    id: 3,
    sender: "Alice",
    content: "Same here. Want to grab lunch later?",
    time: "10:33 AM",
  },
  {
    id: 4,
    sender: "You",
    content: "Sure, that sounds great!",
    time: "10:35 AM",
  },
];

export function ChatComponent() {
  const [activeContact, setActiveContact] = useState<Contact>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderHeader = () => {
    return (
      <div className="p-4 border-b border-gray-200 flex gap-4">
        <Input
          type="text"
          placeholder="Search contacts..."
          className="w-full"
          icon={<Search className="h-4 w-4 text-gray-400" />}
        />
        <SearchContactModal>
          <Button size={"icon"} className="min-w-[36px]">
            <PlusIcon className="h-4 w-4"/>
          </Button>
        </SearchContactModal>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 w-full">
      {/* Sidebar */}
      <div
        className={`bg-white border-r border-gray-200 md:w-1/4 ${isSidebarOpen ? "w-full" : "w-0"} md:relative absolute inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition duration-200 ease-in-out z-30`}
      >
        {renderHeader()}
        <ScrollArea className="h-[calc(100vh-73px)]">
          {contacts.map((contact) => (
            <ChatListItem
              contact={contact}
              setActiveContact={setActiveContact}
              setIsSidebarOpen={setIsSidebarOpen}
              activeContact={activeContact}
            />
          ))}
        </ScrollArea>
      </div>
      <ChatArea
        toggleSidebar={toggleSidebar}
        activeContact={activeContact}
        messages={messages}
        handleSendMessage={handleSendMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />
    </div>
  );
}
