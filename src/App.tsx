import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState([{ role: 'bot', content: 'Chào bạn! Mình là AI hỗ trợ. Bạn cần mình giúp gì hôm nay?' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // API Key của bạn đã được dán vào đây chính xác
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDpbU5GHXRXPVMuqrVwDQStnmNADWXqGFU`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: input }] }]
        })
      });
      
      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      setMessages(prev => [...prev, { role: 'bot', content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: 'Lỗi kết nối rồi, hãy kiểm tra lại mạng nhé!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white border-b p-4 flex items-center gap-2 sticky top-0 z-10">
        <Sparkles className="text-blue-600" />
        <h1 className="font-bold text-xl text-gray-800">Hộp Thư AI</h1>
      </header>
      
      <main className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl shadow-sm flex gap-3 ${
              msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-800'
            }`}>
              {msg.role === 'bot' ? <Bot size={20} className="mt-1 flex-shrink-0" /> : <User size={20} className="mt-1 flex-shrink-0" />}
              <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-3 rounded-2xl flex gap-2 text-gray-400 items-center">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-sm">AI đang suy nghĩ...</span>
            </div>
          </div>
        )}
      </main>

      <footer className="p-4 bg-white border-t sticky bottom-0">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Nhập câu hỏi của bạn..."
            className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800"
          />
          <button 
            onClick={handleSend} 
            disabled={isLoading} 
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-md"
          >
            <Send size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
