'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send, Menu, Users } from "lucide-react"

type ContactType = 'individual' | 'group'

type Contact = {
  id: number
  name: string
  avatar: string
  lastMessage: string
  time: string
  type: ContactType
}

type Message = {
  id: number
  sender: string
  content: string
  time: string
}

const contacts: Contact[] = [
  { id: 1, name: "Alice Smith", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Hey, how are you?", time: "10:30 AM", type: 'individual' },
  { id: 2, name: "Bob Johnson", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Can we meet tomorrow?", time: "Yesterday", type: 'individual' },
  { id: 3, name: "Project Team", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Carol: Thanks for your help!", time: "Tuesday", type: 'group' },
  { id: 4, name: "Family Group", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Mom: Don't forget the dinner on Sunday", time: "Monday", type: 'group' },
]

const initialMessages: Message[] = [
  { id: 1, sender: "Alice", content: "Hey, how's it going?", time: "10:30 AM" },
  { id: 2, sender: "You", content: "Not bad, just working on a project. You?", time: "10:32 AM" },
  { id: 3, sender: "Alice", content: "Same here. Want to grab lunch later?", time: "10:33 AM" },
  { id: 4, sender: "You", content: "Sure, that sounds great!", time: "10:35 AM" },
]

export function ResponsiveGroupChatApp() {
  const [activeContact, setActiveContact] = useState<Contact>(contacts[0])
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex h-screen bg-gray-100 w-full">
      {/* Sidebar */}
      <div className={`bg-white border-r border-gray-200 md:w-1/4 ${isSidebarOpen ? 'w-full' : 'w-0'} md:relative absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out z-30`}>
        <div className="p-4 border-b border-gray-200">
          <Input
            type="text"
            placeholder="Search contacts..."
            className="w-full"
            icon={<Search className="h-4 w-4 text-gray-400" />}
          />
        </div>
        <ScrollArea className="h-[calc(100vh-73px)]">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${activeContact.id === contact.id ? 'bg-gray-100' : ''}`}
              onClick={() => {
                setActiveContact(contact)
                setIsSidebarOpen(false)
              }}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold">{contact.name}</h3>
                  <span className="text-xs text-gray-500">{contact.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {contact.type === 'group' && (
                    <Users className="inline mr-1 h-3 w-3" />
                  )}
                  {contact.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-white flex items-center">
          <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
            <AvatarFallback>{activeContact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="ml-4 flex-1">
            <h2 className="text-xl font-semibold">{activeContact.name}</h2>
            {activeContact.type === 'group' && (
              <p className="text-sm text-gray-500">Group Chat</p>
            )}
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {activeContact.type === 'group' && message.sender !== 'You' && (
                  <p className="text-xs font-semibold mb-1">{message.sender}</p>
                )}
                <p className="text-sm md:text-base">{message.content}</p>
                <span className="text-xs text-gray-400 mt-1 block">{message.time}</span>
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
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
    </div>
  )
}