import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, User, RefreshCcw, HelpCircle } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'eva';
  text: string;
  timestamp: string;
}

interface EvaAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export const EvaAssistantModal: React.FC<EvaAssistantModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'eva',
      text: '¡Hola, estimado cliente! Soy Eva, la Asistente Virtual del Banco de Venezuela (BDV). ¿En qué puedo orientarte hoy? Puedes consultarme sobre PagomóvilBDV, Mesa de Cambio, Tarjeta de Débito Digital, límites o servicios.',
      timestamp: 'Ahora',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const quickQuestions = [
    '¿Cómo comprar divisas en la Mesa de Cambio BDV?',
    '¿Cuáles son los pasos para PagomóvilBDV?',
    '¿Cómo activo mi Tarjeta Débito Digital Mastercard?',
    '¿Qué es la Clave Dinámica Ami Ven?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/eva-bdv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });

      if (!res.ok) {
        throw new Error('Error al conectar con Eva BDV');
      }

      const data = await res.json();
      const evaMsg: Message = {
        id: `eva-${Date.now()}`,
        sender: 'eva',
        text: data.reply || 'Disculpe, no pude procesar su consulta en este momento.',
        timestamp: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, evaMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: Message = {
        id: `eva-${Date.now()}`,
        sender: 'eva',
        text: 'Estimado cliente, las operaciones en BDVenlínea están disponibles las 24 horas. Puedes realizar tu Pago Móvil, Mesa de Cambio o Transferencias usando las pestañas del menú superior.',
        timestamp: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[600px] max-h-[90vh] animate-in fade-in zoom-in duration-200">
        {/* Top brand stripe */}
        <div className="h-2 bg-gradient-to-r from-[#C8102E] via-[#FFD100] to-[#002855]" />

        {/* Modal Header */}
        <div className="p-4 bg-gradient-to-r from-[#002855] to-[#001e42] text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C8102E] to-[#FFD100] flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#002855] rounded-full" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                Eva • Asistente Virtual BDV
                <span className="text-[10px] bg-red-600/90 text-white font-semibold px-2 py-0.5 rounded-full">
                  OFICIAL
                </span>
              </h3>
              <p className="text-[11px] text-blue-200">Banco de Venezuela • Atención 24/7</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-blue-200/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick questions chips */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 overflow-x-auto flex gap-1.5 no-scrollbar text-xs">
          <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Sugerencias:
          </span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="shrink-0 px-2.5 py-1 bg-white hover:bg-blue-50 text-slate-700 hover:text-[#002855] border border-slate-200 hover:border-blue-300 rounded-full text-[11px] font-medium transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'eva' && (
                <div className="w-7 h-7 rounded-full bg-[#002855] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                  <Bot className="w-3.5 h-3.5 text-blue-200" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#002855] text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div
                  className={`text-[10px] mt-1 text-right font-sans ${
                    msg.sender === 'user' ? 'text-blue-200/70' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2.5 items-center text-slate-500 text-xs">
              <div className="w-7 h-7 rounded-full bg-[#002855] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Bot className="w-3.5 h-3.5 text-blue-200 animate-pulse" />
              </div>
              <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 bg-[#C8102E] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#FFD100] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-[#002855] rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-slate-500 ml-1">Eva está consultando...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Escribe tu consulta sobre servicios BDV..."
            className="flex-1 bg-slate-100 hover:bg-slate-50 focus:bg-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#002855] focus:outline-none transition-colors"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isLoading}
            className="p-2.5 bg-[#002855] hover:bg-[#001e42] disabled:bg-slate-200 text-white disabled:text-slate-400 rounded-xl transition-colors shadow-sm"
            title="Enviar mensaje"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
