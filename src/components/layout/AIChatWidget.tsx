"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Sparkles, Loader2, User, Bot } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_REPLIES = [
  "How do you scale DTC brands?",
  "What is your average ROAS?",
  "Tell me about AI Automation.",
  "How do I book a free audit?"
];

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm the Qala Growth Assistant. How can I help you scale your brand today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    // Keep the launcher hidden while the hero's own CTAs are on screen so it
    // never sits on top of them — only appear once the user has scrolled past.
    const handleScroll = () => setIsVisible(window.scrollY > 400);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSend = async (text?: string) => {
    const messageToSend = text || input.trim();
    if (!messageToSend || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: messageToSend }]);
    setIsLoading(true);

    try {
      const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
      if (!GEMINI_API_KEY) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "I'd love to help you build a personalized growth roadmap! You can connect with our strategy team directly by booking a free audit at /contact or messaging us on WhatsApp."
        }]);
        setIsLoading(false);
        return;
      }
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

      // Format history for Gemini (Gemini uses 'user' and 'model' roles)
      const contents = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      // Add the new message
      contents.push({
        role: 'user',
        parts: [{ text: messageToSend }]
      });

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: contents,
          system_instruction: {
            parts: [{ 
              text: "You are the Qala Labs growth assistant. You help DTC and ecommerce brands understand how Qala Labs can scale their revenue. Keep responses concise and always suggest booking a free audit at /contact. You know about Qala Labs services: Performance Marketing, AI Automation, Creative Production, Web Development, eCommerce Growth." 
            }]
          },
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7,
          }
        })
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.candidates[0].content.parts[0].text 
        }]);
      } else {
        throw new Error('Invalid response from Gemini');
      }
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting right now. Please try again or book a free audit directly at /contact." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && !isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-28 right-4 sm:right-6 z-[100] flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-colors"
          >
            <MessageSquare className="w-8 h-8" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-blue-500 border-2 border-white flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(false)}
              className="fixed bottom-28 right-4 sm:right-6 z-[100] flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-colors"
            >
              <X className="w-8 h-8" />
            </motion.button>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-24 md:bottom-28 right-4 sm:right-6 z-[100] w-[calc(100vw-32px)] sm:w-[400px] h-[65vh] sm:h-[600px] max-h-[600px] bg-white rounded-[2rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
            >
            <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-lg leading-none">Qala Growth AI</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-blue-100 mt-1">Online & Ready to Scale</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}>
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                      msg.role === 'user' ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-600"
                    )}>
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={cn(
                      "p-4 rounded-2xl text-sm leading-relaxed",
                      msg.role === 'user' 
                        ? "bg-blue-600 text-white rounded-tr-none" 
                        : "bg-slate-50 text-slate-700 rounded-tl-none border border-slate-100"
                    )}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 mr-auto max-w-[85%]">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="p-4 rounded-2xl rounded-tl-none bg-slate-50 border border-slate-100">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
              {messages.length === 1 && !isLoading && (
                <div className="flex flex-wrap gap-2">
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleSend(reply)}
                      className="text-[10px] font-bold bg-white border border-slate-200 hover:border-blue-600 hover:text-blue-600 px-3 py-2 rounded-full transition-all shadow-sm"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
              
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about scaling your brand..."
                  className="pr-12 h-12 rounded-xl border-slate-200 focus-visible:ring-blue-600"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:text-blue-700 disabled:text-slate-300 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;