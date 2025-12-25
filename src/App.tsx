import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Chào bạn! Mình là AI hỗ trợ. Bạn cần mình giúp gì hôm nay?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    // Phần này sẽ kết nối với API Gemini bạn đã cài đặt
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b p-4 flex items-center gap-2">
        <Sparkles className="text-blue-500" />
        <h1 className="font-bold text-xl text-gray-800">Hộp Thư AI</h1>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl flex gap-3 ${
              msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-white border text-gray-800'
            }`}>
              {msg.role === 'bot' ? <Bot size={20} /> : <User size={20} />}
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
      </main>

      <footer className="p-4 bg-white border-t">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Nhập câu hỏi của bạn..."
            className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleSend} className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600">
            <Send size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;

