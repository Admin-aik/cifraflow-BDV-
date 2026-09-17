import React from 'react';

interface BdvLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'white' | 'badge';
  size?: 'sm' | 'md' | 'lg';
}

export const BdvLogo: React.FC<BdvLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
}) => {
  const isWhite = variant === 'white';

  const badgeSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const badge = (
    <svg viewBox="0 0 100 100" className={`${badgeSizes[size]} shrink-0`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bdv-red" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E31B23" />
          <stop offset="100%" stopColor="#B30006" />
        </linearGradient>
        <linearGradient id="bdv-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD100" />
          <stop offset="100%" stopColor="#F5A800" />
        </linearGradient>
        <linearGradient id="bdv-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#004B87" />
          <stop offset="100%" stopColor="#002855" />
        </linearGradient>
      </defs>
      
      {/* Background container if needed */}
      <rect width="100" height="100" rx="22" fill={isWhite ? 'rgba(255,255,255,0.15)' : '#002855'} />
      
      {/* Institutional Ribbon / Curves */}
      {/* Yellow arc */}
      <path
        d="M22 68 C 22 38, 48 24, 76 26 C 68 34, 46 38, 36 58 Z"
        fill="url(#bdv-yellow)"
      />
      {/* Red dynamic arc */}
      <path
        d="M26 76 C 26 48, 52 32, 80 34 C 64 54, 48 64, 30 76 Z"
        fill="url(#bdv-red)"
      />
      {/* Blue dynamic loop */}
      <path
        d="M44 80 C 60 76, 78 66, 82 46 C 76 60, 60 70, 44 80 Z"
        fill="#00A3E0"
      />
      
      {/* BDV stylized letters */}
      <text
        x="50"
        y="62"
        fill="#FFFFFF"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="900"
        fontSize="21"
        letterSpacing="-0.5"
        textAnchor="middle"
      >
        BDV
      </text>
    </svg>
  );

  if (variant === 'badge') {
    return <div className={`inline-flex items-center ${className}`}>{badge}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {badge}
      <div className="flex flex-col text-left">
        <span
          className={`font-black tracking-tight leading-none ${
            isWhite ? 'text-white' : 'text-[#002855]'
          } ${size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-base' : 'text-xl'}`}
        >
          Banco de Venezuela
        </span>
        <span
          className={`text-[10px] font-semibold tracking-widest uppercase mt-0.5 ${
            isWhite ? 'text-blue-200' : 'text-[#C8102E]'
          }`}
        >
          BDVenlínea personas
        </span>
      </div>
    </div>
  );
};
