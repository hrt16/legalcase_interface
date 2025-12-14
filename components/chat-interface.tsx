"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { PlusCircle, Send, Menu, Sparkles, MessageSquare, Settings, LogOut, Clock } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface Chat {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "Getting Started",
      lastMessage: "Hello! I'm your AI assistant...",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      title: "Code Help",
      lastMessage: "Can you help me debug this...",
      timestamp: new Date(Date.now() - 7200000),
    },
    {
      id: "3",
      title: "Creative Writing",
      lastMessage: "I need help writing a story...",
      timestamp: new Date(Date.now() - 86400000),
    },
  ])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I understand your question. This is a demo response. In a real implementation, this would connect to an AI API.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    }, 1000)
  }

  const handleNewChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: "assistant",
        content: "Hello! I'm your AI assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-black">
        {/* Sidebar */}
        <Sidebar className="border-r border-red-900/20">
          <SidebarHeader className="border-b border-red-900/20 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold gradient-text">AI Chat</span>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-4">
            <Button
              onClick={handleNewChat}
              className="w-full mb-6 bg-gradient-to-r from-red-600 to-red-900 hover:from-red-700 hover:to-red-950 text-white"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              New Chat
            </Button>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Recent Chats</h3>
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  className="w-full text-left p-3 rounded-lg hover:bg-red-950/30 transition-colors group border border-transparent hover:border-red-900/30"
                >
                  <div className="flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{chat.title}</p>
                      <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </SidebarContent>

          <SidebarFooter className="border-t border-red-900/20 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-950/30 transition-colors">
                  <Avatar className="w-9 h-9 border-2 border-red-900/50">
                    <AvatarFallback className="bg-gradient-to-br from-red-600 to-red-900 text-white">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-white">John Doe</p>
                    <p className="text-xs text-gray-500">john@example.com</p>
                  </div>
                  <Menu className="w-4 h-4 text-gray-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-black border-red-900/30">
                <DropdownMenuItem className="text-white hover:bg-red-950/30 focus:bg-red-950/30">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-red-900/20" />
                <DropdownMenuItem className="text-red-500 hover:bg-red-950/30 focus:bg-red-950/30">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b border-red-900/20 p-4 flex items-center gap-4">
            <SidebarTrigger className="lg:hidden text-white" />
            <div className="flex-1">
              <h1 className="text-xl font-semibold gradient-text">New Conversation</h1>
              <p className="text-sm text-gray-500">Powered by advanced AI</p>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <Avatar className="w-10 h-10 border-2 border-red-900/50 flex-shrink-0">
                    <AvatarFallback className="bg-gradient-to-br from-red-600 to-red-900">
                      <Sparkles className="w-5 h-5 text-white" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-red-600 to-red-900 text-white"
                      : "bg-gradient-to-br from-red-950/30 to-black border border-red-900/30 text-white"
                  }`}
                >
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
                    <Clock className="w-3 h-3" />
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                {message.role === "user" && (
                  <Avatar className="w-10 h-10 border-2 border-red-900/50 flex-shrink-0">
                    <AvatarFallback className="bg-gradient-to-br from-red-600 to-red-900 text-white">JD</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-red-900/20 p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
              <div className="relative flex items-center gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 bg-red-950/20 border-red-900/30 text-white placeholder:text-gray-500 pr-12 py-6 text-base rounded-xl focus-visible:ring-red-900"
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  className="absolute right-2 bg-gradient-to-br from-red-600 to-red-900 hover:from-red-700 hover:to-red-950 text-white w-10 h-10 rounded-lg"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-gray-600 mt-3 text-center">
                AI can make mistakes. Verify important information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
