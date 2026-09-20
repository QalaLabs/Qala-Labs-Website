import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

export const ChatbotToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Welcome to Qala Labs! 👋 How can our engineering and growth team help your brand today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { from: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          text: "Thanks for reaching out! Whether you need B2B market validation, 28x ROAS acquisition funnels, AI creative automation, or custom software platforms, we'd love to chat. You can leave your details below or book a direct discovery call!",
        },
      ]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Qala Assistant"
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#3FE0E0] hover:brightness-110 text-white shadow-[0_4px_25px_rgba(63,224,224,0.4)] flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95 font-bold text-xl"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <span>Q</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 rounded-3xl bg-[#0c0d18] border border-white/15 shadow-2xl overflow-hidden flex flex-col h-[440px] animate-fadeUp">
          <div className="bg-[#121324] p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#3FE0E0] text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
                Q
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Qala Labs Assistant</h4>
                <span className="flex items-center gap-1.5 text-[11px] text-[#3FE0E0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3FE0E0] animate-pulse" />
                  Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    m.from === 'user'
                      ? 'bg-[#3FE0E0] text-black font-medium'
                      : 'bg-white/10 text-white/90 border border-white/5'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-[#121324] flex gap-2">
            <input
              type="text"
              placeholder="Ask anything about our work or services..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#3FE0E0]"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#3FE0E0] text-white flex items-center justify-center shrink-0 hover:scale-105 transition-transform shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
