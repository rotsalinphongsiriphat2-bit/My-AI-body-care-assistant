
import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { chatWithAI } from '../services/geminiService';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await chatWithAI(input);
      const aiMessage: Message = { text: aiResponse, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = { text: 'ขออภัย เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', sender: 'ai' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-white mb-6">พูดคุยกับผู้ช่วยสุขภาพ AI ของคุณ</h2>
      <div className="h-96 bg-slate-900/50 rounded-lg p-4 overflow-y-auto flex flex-col space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-xl px-4 py-2 ${msg.sender === 'user' ? 'bg-teal-600 text-white' : 'bg-slate-700 text-slate-200'}`}>
              <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
            </div>
          </div>
        ))}
         {isLoading && (
            <div className="flex justify-start">
                <div className="bg-slate-700 text-slate-200 rounded-xl px-4 py-2">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 flex gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="ถามคำถามเกี่ยวกับสุขภาพหรือฟิตเนส..."
          className="flex-grow shadow appearance-none border-2 border-slate-700 rounded-lg w-full py-3 px-4 bg-slate-700 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-teal-500 transition-colors"
        />
        <Button onClick={handleSend} disabled={isLoading} className="w-auto px-6">
          ส่ง
        </Button>
      </div>
    </div>
  );
};

export default AIChat;