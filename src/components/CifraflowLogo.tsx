import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface CifraflowLogoProps {
  onClick?: () => void;
  canGoBack?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showBackHint?: boolean;
  backHintText?: string;
}

export const CifraflowLogo: React.FC<CifraflowLogoProps> = ({
  onClick,
  canGoBack = false,
  size = 'md',
  showBackHint = true,
  backHintText,
}) => {
  const sizeClasses = {
    sm: {
      container: 'gap-2',
      svg: 'w-8 h-8',
      title: 'text-sm font-black',
      subtitle: 'text-[9px]',
    },
    md: {
      container: 'gap-3',
      svg: 'w-10 h-10 sm:w-11 sm:h-11',
      title: 'text-base sm:text-lg font-black tracking-wider',
      subtitle: 'text-[10px] tracking-widest',
    },
    lg: {
      container: 'gap-4',
      svg: 'w-14 h-14 sm:w-16 sm:h-16',
      title: 'text-xl sm:text-2xl font-black tracking-widest',
      subtitle: 'text-xs tracking-widest',
    },
  }[size];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      title={backHintText || (canGoBack ? 'Hacer clic en el logotipo para retroceder en el flujo' : 'CifraFlow Financiero')}
      className={`group flex items-center ${sizeClasses.container} text-left transition-all duration-300 ${
        onClick ? 'cursor-pointer hover:opacity-95 active:scale-95' : 'cursor-default'
      }`}
    >
      {/* 3D Holographic Infinity Circuit Symbol */}
      <div className="relative flex items-center justify-center">
        {/* Glow effect behind */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00f3ff] via-[#b026ff] to-[#ff007f] rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity animate-pulse" />

        <svg
          viewBox="0 0 120 70"
          className={`${sizeClasses.svg} relative z-10 drop-shadow-[0_0_12px_rgba(0,243,255,0.7)] transition-transform duration-300 group-hover:scale-105`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="cifraflowInfinityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f3ff" />
              <stop offset="50%" stopColor="#b026ff" />
              <stop offset="100%" stopColor="#ff007f" />
            </linearGradient>
            <linearGradient id="circuitGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#00f3ff" />
            </linearGradient>
            <filter id="circuitGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Circuit Nodes */}
          <circle cx="20" cy="35" r="4" fill="#00f3ff" opacity="0.9" />
          <circle cx="100" cy="35" r="4" fill="#ff007f" opacity="0.9" />
          <circle cx="60" cy="35" r="3.5" fill="#fbbf24" opacity="0.95" />

          {/* 3D Circuit Infinity Ribbon */}
          <path
            d="M36 20 C 18 20, 10 26, 10 35 C 10 44, 18 50, 36 50 C 50 50, 56 42, 60 35 C 64 28, 70 20, 84 20 C 102 20, 110 26, 110 35 C 110 44, 102 50, 84 50 C 70 50, 64 42, 60 35 C 56 28, 50 20, 36 20 Z"
            stroke="url(#cifraflowInfinityGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#circuitGlow)"
          />

          {/* Core high-tech inner light trail */}
          <path
            d="M36 20 C 18 20, 10 26, 10 35 C 10 44, 18 50, 36 50 C 50 50, 56 42, 60 35 C 64 28, 70 20, 84 20 C 102 20, 110 26, 110 35 C 110 44, 102 50, 84 50 C 70 50, 64 42, 60 35 C 56 28, 50 20, 36 20 Z"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="14 10"
            className="animate-[dash_10s_linear_infinite]"
          />

          {/* Micro circuit accents */}
          <line x1="20" y1="35" x2="28" y2="35" stroke="#00f3ff" strokeWidth="2" />
          <line x1="92" y1="35" x2="100" y2="35" stroke="#ff007f" strokeWidth="2" />
          <line x1="60" y1="27" x2="60" y2="43" stroke="#fbbf24" strokeWidth="2" strokeDasharray="2 2" />
        </svg>

        {/* Back navigation badge if applicable */}
        {canGoBack && showBackHint && (
          <div className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-[#00f3ff] text-[#030712] flex items-center justify-center shadow-[0_0_8px_#00f3ff] transition-transform group-hover:scale-125 z-20">
            <ArrowLeft className="w-3 h-3 stroke-[3]" />
          </div>
        )}
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`${sizeClasses.title} font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] via-[#ffffff] to-[#ff007f] drop-shadow-[0_0_10px_rgba(0,243,255,0.4)] uppercase`}
          >
            CIFRAFLOW
          </span>
          <span className="text-[10px] bg-[#C8102E]/80 border border-[#FFD100]/60 text-white font-black px-1.5 py-0.2 rounded-md uppercase tracking-wider hidden sm:inline-block">
            BDV
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`${sizeClasses.subtitle} font-bold text-[#fbbf24] uppercase tracking-widest drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]`}
          >
            FINANCIERO
          </span>
          {canGoBack && showBackHint && (
            <span className="text-[9px] text-[#00f3ff] font-semibold underline decoration-dotted hidden sm:inline">
              {backHintText || '← Clic para volver'}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};
