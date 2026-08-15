import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, RefreshCw, ChevronDown } from 'lucide-react';
import api from '../api';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am your TASTRAA AI assistant. Ask me anything about our locally produced food essentials, company history, or contact details!'
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sampleQuestions = [
    "What products do you have?",
    "Tell me about Rice Flour.",
    "What is Gingelly Oil?",
    "Where is TASTRAA located?",
    "How can I contact TASTRAA?"
  ];

  const handleSend = async (questionText) => {
    const q = questionText || input;
    if (!q.trim()) return;

    const userMsg = { sender: 'user', text: q };
    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInput('');
    setLoading(true);

    try {
      const response = await api.post('/ai/ask', { question: q });
      const aiAnswer = response.data?.answer || "I’m sorry, I don’t have that information. Please contact TASTRAA directly.";
      setMessages((prev) => [...prev, { sender: 'ai', text: aiAnswer }]);
    } catch (err) {
      // Fallback local processing
      let localAnswer = "I’m sorry, I don’t have that information. Please contact TASTRAA directly.";
      const query = q.toLowerCase();

      if (query.includes('location') || query.includes('where') || query.includes('address')) {
        localAnswer = "TASTRAA (PVT) LTD is located at No. 41, Kalasalai Road, Thirunelvely, Kopay, Jaffna, Sri Lanka.";
      } else if (query.includes('contact') || query.includes('phone') || query.includes('call') || query.includes('email')) {
        localAnswer = "You can contact TASTRAA via phone at 0779789223 or 0212052200, or email us at manivannann1980@gmail.com.";
      } else if (query.includes('product') || query.includes('sell') || query.includes('offer')) {
        localAnswer = "TASTRAA produces three core lines: 1. Rice Flour (Super fine), 2. Traditional Jaffna Mixture, and 3. Pure Cold-Pressed Gingelly Oil.";
      } else if (query.includes('rice flour')) {
        localAnswer = "TASTRAA Rice Flour is ground from 100% locally sourced premium Sri Lankan rice. It has a super-fine texture and contains no added preservatives.";
      } else if (query.includes('mixture')) {
        localAnswer = "TASTRAA Mixture is an authentic spicy and savory Jaffna snack made with high quality peanuts, fried gram, curry leaves, and traditional spice blends.";
      } else if (query.includes('gingelly') || query.includes('sesame') || query.includes('oil')) {
        localAnswer = "TASTRAA Gingelly Oil is 100% pure cold-pressed sesame oil extracted using traditional methods, rich in natural aroma and heart-healthy nutrients.";
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: localAnswer }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="ai-floating-btn"
          style={{
            backgroundColor: '#D32F2F',
            color: '#FFFFFF',
            borderRadius: '9999px',
            padding: '12px 22px',
            boxShadow: '0 8px 25px rgba(211, 47, 47, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: '700',
            fontSize: '0.95rem',
            border: '2px solid #FFC107',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: '#FFC107',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#111827'
          }}>
            <Bot size={18} />
          </div>
          <span>Ask TASTRAA AI</span>
          <Sparkles size={16} style={{ color: '#FEF3C7' }} />
        </button>
      )}

      {/* AI Chat Window */}
      {isOpen && (
        <div className="ai-chat-window" style={{
          width: '360px',
          maxWidth: 'calc(100vw - 32px)',
          height: '520px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid #E5E7EB',
          animation: 'fadeIn 0.3s ease'
        }}>
          {/* Chat Header */}
          <div style={{
            backgroundColor: '#111827',
            color: '#FFFFFF',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '3px solid #D32F2F'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#D32F2F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FEF3C7',
                border: '2px solid #F59E0B'
              }}>
                <Bot size={20} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: '#FFFFFF' }}>TASTRAA AI</h4>
                <span style={{ fontSize: '0.75rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }}></span>
                  Official Brand Guide
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ color: '#9CA3AF', padding: '4px', borderRadius: '50%' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Suggestions */}
          <div style={{
            padding: '8px 12px',
            backgroundColor: '#FFFBEB',
            borderBottom: '1px solid #FEF3C7',
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }}>
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                style={{
                  fontSize: '0.75rem',
                  backgroundColor: '#FFFFFF',
                  color: '#D97706',
                  border: '1px solid #FDE68A',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontWeight: '600'
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            backgroundColor: '#FAFAFA'
          }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  gap: '8px'
                }}
              >
                {msg.sender === 'ai' && (
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: '#D32F2F',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '0.75rem',
                    marginTop: '2px'
                  }}>
                    <Bot size={16} />
                  </div>
                )}

                <div style={{
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                  backgroundColor: msg.sender === 'user' ? '#D32F2F' : '#FFFFFF',
                  color: msg.sender === 'user' ? '#FFFFFF' : '#1F2937',
                  fontSize: '0.875rem',
                  lineHeight: '1.45',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                  border: msg.sender === 'ai' ? '1px solid #E5E7EB' : 'none'
                }}>
                  {msg.text}
                </div>

                {msg.sender === 'user' && (
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: '#111827',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <User size={15} />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6B7280', fontSize: '0.825rem' }}>
                <RefreshCw size={14} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                <span>TASTRAA AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            style={{
              padding: '12px',
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid #E5E7EB',
              display: 'flex',
              gap: '8px'
            }}
          >
            <input
              type="text"
              placeholder="Ask about our products or details..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                border: '1px solid #D1D5DB',
                borderRadius: '9999px',
                padding: '8px 16px',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                backgroundColor: '#D32F2F',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: (!input.trim() || loading) ? 0.5 : 1
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AIAssistant;
