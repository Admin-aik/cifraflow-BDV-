import React, { useState, useEffect } from 'react';
import { Shield, Copy, Check, RefreshCw, X, Smartphone, Info } from 'lucide-react';

interface AmiVenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCode?: (code: string) => void;
}

export const AmiVenModal: React.FC<AmiVenModalProps> = ({ isOpen, onClose, onSelectCode }) => {
  const [tokenCode, setTokenCode] = useState<string>('839214');
  const [timeLeft, setTimeLeft] = useState<number>(48);
  const [copied, setCopied] = useState<boolean>(false);

  // Generate random 6-digit code
  const generateNewCode = () => {
    const num = Math.floor(100000 + Math.random() * 900000).toString();
    setTokenCode(num);
    setTimeLeft(60);
  };

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          generateNewCode();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(tokenCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (onSelectCode) {
      onSelectCode(tokenCode);
    }
  };

  const formattedCode = `${tokenCode.slice(0, 3)} ${tokenCode.slice(3)}`;
  const progressPercent = (timeLeft / 60) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-sm bg-gradient-to-b from-[#001e42] via-[#002855] to-[#001938] text-white rounded-3xl shadow-2xl border border-blue-900/60 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Top ribbon */}
        <div className="h-1.5 bg-gradient-to-r from-[#C8102E] via-[#FFD100] to-[#00A3E0]" />

        {/* Header */}
        <div className="p-5 pb-3 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#C8102E] to-[#FFD100] flex items-center justify-center shadow-lg">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                Ami Ven BDV
                <span className="text-[10px] bg-red-600/80 text-white font-semibold px-2 py-0.5 rounded-full">
                  TOKEN
                </span>
              </h3>
              <p className="text-[11px] text-blue-200/70">Generador de Clave Dinámica</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-blue-300/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-blue-200/80">
              Clave Dinámica de 6 dígitos
            </span>
          </div>

          {/* Token Card */}
          <div className="relative my-4 p-6 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-md">
            <div className="text-4xl font-mono font-black tracking-widest text-white drop-shadow-md">
              {formattedCode}
            </div>

            {/* Circular or horizontal timer */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="flex-1 bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ease-linear rounded-full ${
                    timeLeft < 15 ? 'bg-red-500' : 'bg-emerald-400'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-mono text-blue-200/90 font-bold min-w-[32px]">
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Action button */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 font-bold text-xs rounded-xl shadow-lg shadow-red-900/30 transition-all text-white"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  ¡Clave Copiada!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-white" />
                  Copiar Clave
                </>
              )}
            </button>

            <button
              onClick={generateNewCode}
              className="p-3 bg-white/10 hover:bg-white/15 text-blue-200 hover:text-white rounded-xl border border-white/10 transition-colors"
              title="Generar nueva clave"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-5 p-3 bg-blue-950/60 rounded-xl border border-blue-900/40 text-[11px] text-blue-200/70 text-left flex gap-2">
            <Info className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
            <span>
              Ingresa esta clave en tus operaciones de <strong>PagomóvilBDV</strong>, <strong>Mesa de Cambio</strong> y <strong>Transferencias</strong> para autorizar de forma inmediata.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
