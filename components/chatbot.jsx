"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2,
  Minimize2,
  Maximize2
} from "lucide-react";
import { toast } from "sonner";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm SAARTHI, your AI Career Coach. I can help you with resume building, interview preparation, cover letters, career guidance, and more. What would you like to know?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date().toISOString()
    };

    console.log("Sending message:", userMessage.content);
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      console.log("Making API call to /api/chat...");
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages.slice(-10) // Keep last 10 messages for context
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      console.log("Response data:", data);
      
      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.message || "I'm sorry, I couldn't generate a response right now. Please try again.",
        timestamp: data.timestamp || new Date().toISOString()
      };

      console.log("Adding assistant message:", assistantMessage.content.substring(0, 100) + "...");
      setMessages(prev => [...prev, assistantMessage]);
      
      if (data.isFallback) {
        console.log("Using fallback response");
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Failed to send message. Please try again.");
      
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        role: "assistant",
        content: "Hello! I'm SAARTHI, your AI Career Coach. I can help you with resume building, interview preparation, cover letters, career guidance, and more. What would you like to know?",
        timestamp: new Date().toISOString()
      }
    ]);
  };

  const quickQuestions = [
    "How to write a strong resume?",
    "Common interview questions?",
    "Tips for cover letters?",
    "Career change advice?",
    "Salary negotiation tips?"
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-[--primary] to-[--accent] text-white hover:from-[--accent] hover:to-[--primary] shadow-lg hover:shadow-[0_0_20px_0_rgba(255,215,0,0.25)] transition-all duration-300 rounded-full w-14 h-14 border border-[--accent]/20"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 h-[500px] bg-[--background]/95 backdrop-blur-xl border border-[--accent]/20 shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[--primary] via-[--primary]/90 to-[--accent] text-white p-4 rounded-t-lg flex items-center justify-between border-b border-[--accent]/20">
          <div className="flex items-center space-x-2">
            <div className="bg-white/10 p-1.5 rounded-lg">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <span className="font-bold text-lg gradient-title">SAARTHI</span>
              <p className="text-xs text-white/80">AI Career Coach</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0 transition-all duration-200"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0 transition-all duration-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[350px] bg-gradient-to-b from-[--background]/50 to-[--background]/30">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 shadow-sm border ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-[--accent] to-[--accent]/90 text-[--primary] border-[--accent]/30"
                        : "bg-[--card] text-[--card-foreground] border-[--accent]/10"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.role === "assistant" && (
                        <div className="bg-[--accent]/20 p-1 rounded-full">
                          <Bot className="h-3 w-3 text-[--accent]" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                        <p className="text-xs opacity-60 mt-2">
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </p>
                      </div>
                      {message.role === "user" && (
                        <div className="bg-[--primary]/20 p-1 rounded-full">
                          <User className="h-3 w-3 text-[--primary]" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[--card] text-[--card-foreground] rounded-lg p-3 max-w-[80%] border border-[--accent]/10 shadow-sm">
                    <div className="flex items-center space-x-2">
                      <div className="bg-[--accent]/20 p-1 rounded-full">
                        <Bot className="h-3 w-3 text-[--accent]" />
                      </div>
                      <Loader2 className="h-4 w-4 animate-spin text-[--accent]" />
                      <span className="text-sm">SAARTHI is typing...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>



            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 bg-gradient-to-r from-[--background]/30 to-[--background]/10 border-t border-[--accent]/10">
                <p className="text-xs text-[--muted-foreground] mb-2 font-medium">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setInputMessage(question)}
                      className="text-xs h-6 px-2 border-[--accent]/20 text-[--foreground] hover:bg-[--accent]/10 hover:border-[--accent]/40 transition-all duration-200"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-[--accent]/10 bg-gradient-to-r from-[--background]/50 to-[--background]/30">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your career..."
                  className="flex-1 bg-[--card] border-[--accent]/20 text-[--foreground] placeholder:text-[--muted-foreground] focus:border-[--accent]/40 focus:ring-[--accent]/20"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-gradient-to-r from-[--accent] to-[--accent]/90 text-[--primary] hover:from-[--accent]/90 hover:to-[--accent] shadow-sm hover:shadow-[0_0_10px_0_rgba(255,215,0,0.3)] transition-all duration-200"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {/* Clear Chat Button */}
              {messages.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  className="text-xs text-[--muted-foreground] hover:text-[--foreground] mt-2 h-6 hover:bg-[--accent]/10 transition-all duration-200"
                >
                  Clear chat
                </Button>
              )}
            </div>
          </>
        )}
      </Card>
    </div>
  );
} 