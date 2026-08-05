import { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  User, 
  Sparkles, 
  Brain, 
  RotateCcw, 
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { MentorMessage } from '../types';

export function AIMentor() {
  const [messages, setMessages] = useState<MentorMessage[]>([
    {
      id: 'm-1',
      sender: 'guide',
      text: "Greetings, Observer. I am The Guide. I am here to sharpen your analytical mind, critique your observations, and help you separate verified facts from subjective assumptions.\n\nTell me about something you observed today, or ask me how to analyze specific behavioral or environmental cues.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const samplePrompts = [
    "Critique my café observation notes: 'A man in a sharp suit kept twisting his watch.'",
    "How do I distinguish a genuine smile from a polite social smile?",
    "Help me separate facts from assumptions in a workplace disagreement.",
    "Explain how to construct a 10-station Memory Palace in my apartment."
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: MentorMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          contextHistory: messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            content: m.text
          }))
        })
      });

      const data = await response.json();
      const replyText = data.reply || "Observe closely. Re-evaluate your assumptions. What physical cue did you see first?";

      const guideMsg: MentorMessage = {
        id: `guide-${Date.now()}`,
        sender: 'guide',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, guideMsg]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [
        ...prev,
        {
          id: `guide-err-${Date.now()}`,
          sender: 'guide',
          text: "Interesting observation. What concrete evidence supports that conclusion? Always verify facts before accepting an assumption.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-20 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#262626] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8A6D14] p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-[#090909] rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#D4AF37]" />
            </div>
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
              The Guide <span className="text-xs px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] font-mono font-normal">AI Mentor</span>
            </h1>
            <p className="text-xs text-zinc-400">
              Socratic deduction coach • Analytical feedback
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="p-2 rounded-xl bg-[#141414] border border-[#262626] text-zinc-400 hover:text-white text-xs font-mono flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Session</span>
        </button>
      </div>

      {/* Chat Container */}
      <div className="glass-panel rounded-2xl border border-[#D4AF37]/30 flex flex-col h-[550px] overflow-hidden">
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((m) => {
            const isGuide = m.sender === 'guide';
            return (
              <div
                key={m.id}
                className={`flex gap-4 ${isGuide ? 'justify-start' : 'justify-end'}`}
              >
                {isGuide && (
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-xl rounded-2xl p-4 text-sm leading-relaxed ${
                  isGuide
                    ? 'bg-[#141414] border border-[#262626] text-zinc-200'
                    : 'bg-[#D4AF37] text-black font-medium'
                }`}>
                  <p className="whitespace-pre-line">{m.text}</p>
                  <span className={`text-[10px] font-mono block mt-2 ${
                    isGuide ? 'text-zinc-500' : 'text-black/60 text-right'
                  }`}>
                    {m.timestamp}
                  </span>
                </div>

                {!isGuide && (
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-3 text-xs font-mono text-[#D4AF37]">
              <div className="w-6 h-6 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
              <span>The Guide is analyzing your prompt...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Sample Prompt Chips */}
        <div className="px-6 py-2 bg-[#090909]/80 border-t border-[#262626] flex items-center gap-2 overflow-x-auto">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              className="px-3 py-1 rounded-full bg-[#141414] border border-[#262626] hover:border-[#D4AF37]/40 text-xs text-zinc-400 hover:text-white shrink-0 font-mono cursor-pointer transition-all"
            >
              "{p}"
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#0d0d0d] border-t border-[#262626] flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Share an observation, asking a question, or request critique..."
            className="flex-1 bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || loading}
            className={`p-3 rounded-xl font-bold cursor-pointer transition-all ${
              input.trim() && !loading
                ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20'
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
