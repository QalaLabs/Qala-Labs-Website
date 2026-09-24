import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  from: 'bot' | 'user';
  text: string;
  link?: { href: string; label: string };
  timestamp: number;
}

const QUICK_PROMPTS = [
  { label: '🤖 Explore MarksOps Agents', text: 'Tell me about MarksOps multi-agent automation systems.' },
  { label: '📈 28x ROAS Funnels', text: 'How do you engineer high-converting B2B and D2C funnels?' },
  { label: '🚀 Book Discovery Call', text: 'How do I start a project with Qala Labs?' },
];

export const ChatbotToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState('');
  const timeoutRef = useRef<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize or retrieve unique isolated session ID from sessionStorage
  const [sessionId] = useState<string>(() => {
    try {
      const existing = sessionStorage.getItem('qala_chat_session_id');
      if (existing) return existing;
      const newId = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      sessionStorage.setItem('qala_chat_session_id', newId);
      return newId;
    } catch {
      return 'session_fallback_' + Date.now();
    }
  });

  // Load isolated messages for this session
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = sessionStorage.getItem(`qala_chat_messages_${sessionId}`);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'welcome-1',
        from: 'bot',
        text: 'Welcome to Qala Labs! 👋 I am your autonomous growth and architecture assistant. How can we elevate your brand today?',
        timestamp: Date.now(),
      },
    ];
  });

  // Sync messages to isolated session storage
  useEffect(() => {
    try {
      sessionStorage.setItem(`qala_chat_messages_${sessionId}`, JSON.stringify(messages));
    } catch {
      // ignore storage quota errors
    }
  }, [messages, sessionId]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Cleanup pending async timeouts on unmount to prevent race conditions
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getBotResponse = (userText: string): { text: string; link?: { href: string; label: string } } => {
    const query = userText.toLowerCase();

    if (query.includes('agent') || query.includes('marksops') || query.includes('automation')) {
      return {
        text: "MarksOps is our proprietary autonomous operations platform. We deploy specialized LangGraph multi-agent teams for financial reconciliation, vendor spend parsing, inventory sync, and lead routing — staging every ERP change for human approval with zero silent execution.",
        link: { href: '/services/ai-automation', label: 'View MarksOps Agent Suite' },
      };
    }

    if (query.includes('roas') || query.includes('marketing') || query.includes('funnel') || query.includes('trotr')) {
      return {
        text: "We combine algorithmic creative variation with predictive audience engineering. For Trotr Travel, our engineered acquisition architecture generated a verified 28x return on ad spend (ROAS) across European markets.",
        link: { href: '/case-studies/trotr-spain-pivot', label: 'Read Trotr Case Study' },
      };
    }

    if (query.includes('call') || query.includes('start') || query.includes('hire') || query.includes('pricing') || query.includes('contact')) {
      return {
        text: "We partner with select enterprises, high-growth D2C brands, and venture studios. You can submit your requirements via our project intake form, or speak directly with our engineering founders.",
        link: { href: '/contact-us', label: 'Open Direct Inquiry Form' },
      };
    }

    if (query.includes('nutrivend') || query.includes('b2b') || query.includes('validation')) {
      return {
        text: "For Nutrivend UK, our audience engineering engine validated a 71% untapped enterprise fitness vending market and delivered 45 enterprise accounts in just 7 days.",
        link: { href: '/case-studies/nutrivend-uk', label: 'Explore Nutrivend Case Study' },
      };
    }

    return {
      text: "Whether you need B2B market validation, autonomous AI agents, 28x ROAS funnels, or custom digital products, our engineering team is here to help. What specific objective are you solving for this quarter?",
      link: { href: '/contact-us', label: 'Discuss Your Project' },
    };
  };

  const handleSendText = (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isTyping) return; // Prevent concurrent requests & race conditions

    const userMsg: Message = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      from: 'user',
      text: trimmed,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      const { text, link } = getBotResponse(trimmed);
      const botMsg: Message = {
        id: `bot_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        from: 'bot',
        text,
        link,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      timeoutRef.current = null;
    }, 700);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendText(input);
  };

  return (
    // Responsive Floating Safety: bottom-24 on mobile (<640px) to clear StickyCTA, bottom-6 on desktop
    <div className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Qala Assistant"
        className="relative group w-14 h-14 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#3FE0E0] hover:brightness-110 text-white shadow-[0_4px_25px_rgba(63,224,224,0.4)] flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95 font-bold text-xl"
      >
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] opacity-40 blur group-hover:opacity-75 transition duration-300 animate-pulse" />
        <span className="relative z-10 flex items-center justify-center">
          {isOpen ? <X className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-white" />}
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] max-w-sm sm:w-96 rounded-3xl bg-[#090A15]/95 backdrop-blur-2xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col h-[480px] max-h-[calc(100vh-8rem)] animate-in fade-in slide-in-from-bottom-6 duration-300">
          
          {/* Header */}
          <div className="bg-[#121324]/90 p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#3FE0E0] text-white font-extrabold flex items-center justify-center text-sm shadow-md">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                  Qala Labs Assistant
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#3FE0E0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_6px_#10B981]" />
                  <span>Session Isolated</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Assistant"
              className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl ${
                    m.from === 'user'
                      ? 'bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white font-medium shadow-md rounded-br-none'
                      : 'bg-white/[0.07] text-white/90 border border-white/10 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line">{m.text}</p>
                  {m.link && (
                    <div className="mt-2.5 pt-2 border-t border-white/10">
                      <Link
                        to={m.link.href}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3FE0E0] hover:underline"
                      >
                        <span>{m.link.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="p-3 rounded-2xl bg-white/[0.07] border border-white/10 rounded-bl-none flex items-center gap-1.5 text-white/50 text-[11px]">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#3FE0E0]" />
                  <span>Synthesizing response...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-[#06070D]/80 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((qp, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isTyping}
                onClick={() => handleSendText(qp.text)}
                className="shrink-0 text-[10px] bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-50 text-white/80 hover:text-white px-2.5 py-1 rounded-full border border-white/10 transition-colors whitespace-nowrap"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Input Form with Concurrency Lock */}
          <form onSubmit={handleFormSubmit} className="p-3 border-t border-white/10 bg-[#121324] flex gap-2">
            <input
              type="text"
              disabled={isTyping}
              placeholder={isTyping ? "Generating answer..." : "Type your inquiry..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#3FE0E0] disabled:opacity-50 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#3FE0E0] text-white flex items-center justify-center shrink-0 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 transition-all shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
