import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Users } from "lucide-react";

const ChatListItem = ({contact, setActiveContact, setIsSidebarOpen, activeContact}) => {
  return (
    <div
      key={contact.id}
      className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${activeContact.id === contact.id ? "bg-gray-100" : ""}`}
      onClick={() => {
        setActiveContact(contact);
        setIsSidebarOpen(false);
      }}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={contact.avatar} alt={contact.name} />
        <AvatarFallback>
          {contact.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="ml-4 flex-1">
        <div className="flex justify-between items-baseline">
          <h3 className="font-semibold">{contact.name}</h3>
          <span className="text-xs text-gray-500">{contact.time}</span>
        </div>
        <p className="text-sm text-gray-500 truncate">
          {contact.type === "group" && (
            <Users className="inline mr-1 h-3 w-3" />
          )}
          {contact.lastMessage}
        </p>
      </div>
    </div>
  );
};

export default ChatListItem;
