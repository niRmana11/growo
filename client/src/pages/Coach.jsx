import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { Navbar } from '../components/layout/Navbar.jsx';
import { chatWithCoach } from '../services/aiService.js';
import { IoLogoOctocat } from 'react-icons/io5';
import { Send, Sparkles, User, Lock, Bot, ArrowLeft } from 'lucide-react';

export function Coach() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Starting message from the Coach
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'coach',
      text: `Hi ${user?.name || 'there'}! I'm your GrowO Coach. I've been analyzing your habit logs. What would you like to focus on today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGated, setIsGated] = useState(false);
  const [gatedMessage, setGatedMessage] = useState('');

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isGated) return;

    const userMessage = { id: Date.now(), sender: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithCoach(userMessage.text);

      if (response.isGated) {
        setIsGated(true);
        setGatedMessage(response.message);
      } else {
        const coachMessage = { id: Date.now() + 1, sender: 'coach', text: response.data };
        setMessages((prev) => [...prev, coachMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'coach',
        text: 'Sorry, I am having trouble connecting to my servers right now.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col h-[calc(100vh-80px)]">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col flex-1 overflow-hidden relative">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-green-500 p-4 flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm transition-colors text-white flex-shrink-0 mr-1"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm flex-shrink-0">
              <IoLogoOctocat color="white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">GrowO Coach</h2>
              <p className="text-indigo-100 text-xs font-medium">Powered by Gemini 3.5 Lite</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.sender === 'user' ? 'bg-emerald-700' : 'bg-green-500'}`}
                  >
                    {msg.sender === 'user' ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <IoLogoOctocat color="white" />
                    )}
                  </div>
                  <div
                    className={`p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-green-600 text-white rounded-tr-sm' : 'bg-white border border-gray-100 shadow-sm text-gray-800 rounded-tl-sm'}`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading typing indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm rounded-tl-sm flex gap-1 items-center h-12">
                    <div
                      className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Gated Lock Screen Overlay */}
          {isGated && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-md flex flex-col items-center justify-center z-20">
              <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md border border-indigo-100 mx-4">
                <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Conversation Limit Reached</h3>
                <p className="text-gray-600 mb-6">{gatedMessage}</p>
                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity shadow-md hover:shadow-lg">
                  Upgrade to Pro
                </button>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <form onSubmit={handleSend} className="flex gap-2 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your coach anything..."
                disabled={isLoading || isGated}
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading || isGated}
                className="bg-green-600 text-white px-5 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:hover:bg-green-600 flex items-center justify-center"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
