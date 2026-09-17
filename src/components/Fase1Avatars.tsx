import React, { useState } from 'react';
import { TEEN_AVATARS } from '../data/cifraflowChallenges';
import { AvatarId, TeenAvatar } from '../types/cifraflow';
import { ArrowRight, Zap, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface Fase1AvatarsProps {
  selectedAvatarId: AvatarId | null;
  onSelectAvatar: (avatarId: AvatarId) => void;
  onContinue: () => void;
  onLogoClick?: () => void;
}

export const Fase1Avatars: React.FC<Fase1AvatarsProps> = ({
  selectedAvatarId,
  onSelectAvatar,
  onContinue,
  onLogoClick,
}) => {
  const [currentSelected, setCurrentSelected] = useState<AvatarId>(selectedAvatarId || 'carlos');

  const handlePick = (id: AvatarId) => {
    setCurrentSelected(id);
    onSelectAvatar(id);
  };

  const activeAvatar = TEEN_AVATARS.find((a) => a.id === currentSelected) || TEEN_AVATARS[0];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      {/* 1. SELECCIÓN DE AVATARES EXACTA AL SCREENSHOT */}
      <div className="relative rounded-3xl border-2 border-cyan-500/40 bg-[#030a1c]/90 backdrop-blur-xl p-4 sm:p-8 shadow-[0_0_50px_rgba(0,243,255,0.2)] overflow-hidden">
        {/* Subtle grid background dots */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#00f3ff 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />

        {/* Top Horizontal Row: 4 Character Cards + Center Infinity Emblem */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-5 items-center gap-3 sm:gap-4 py-3">
          {/* Card 1: JORGE */}
          {(() => {
            const av = TEEN_AVATARS[0];
            const isChosen = currentSelected === 'jorge';
            return (
              <div
                onClick={() => handlePick('jorge')}
                className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                  isChosen ? 'scale-105' : 'opacity-80 hover:opacity-100 hover:scale-102'
                }`}
              >
                <div
                  className={`w-28 sm:w-36 md:w-full aspect-[3/4] rounded-2xl border-2 overflow-hidden relative shadow-lg transition-all ${
                    isChosen
                      ? 'border-[#00f3ff] shadow-[0_0_25px_rgba(0,243,255,0.7)]'
                      : 'border-[#00f3ff]/40 hover:border-[#00f3ff]'
                  }`}
                >
                  <img
                    src={av.imageUrl}
                    alt={av.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                  {isChosen && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#00f3ff] text-slate-950 flex items-center justify-center shadow-md">
                      <CheckCircle2 className="w-4 h-4 fill-current text-slate-950 stroke-white" />
                    </div>
                  )}
                </div>
                <div className="text-center mt-2.5 space-y-0.5">
                  <span className="text-xs sm:text-sm font-black text-[#00f3ff] flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f3ff]" />
                    {av.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#00f3ff]/80 block tracking-tight">
                    {av.role}
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Card 2: IRCAR */}
          {(() => {
            const av = TEEN_AVATARS[1];
            const isChosen = currentSelected === 'ircar';
            return (
              <div
                onClick={() => handlePick('ircar')}
                className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                  isChosen ? 'scale-105' : 'opacity-80 hover:opacity-100 hover:scale-102'
                }`}
              >
                <div
                  className={`w-28 sm:w-36 md:w-full aspect-[3/4] rounded-2xl border-2 overflow-hidden relative shadow-lg transition-all ${
                    isChosen
                      ? 'border-[#ff007f] shadow-[0_0_25px_rgba(255,0,127,0.7)]'
                      : 'border-[#ff007f]/40 hover:border-[#ff007f]'
                  }`}
                >
                  <img
                    src={av.imageUrl}
                    alt={av.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                  {isChosen && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#ff007f] text-slate-950 flex items-center justify-center shadow-md">
                      <CheckCircle2 className="w-4 h-4 fill-current text-slate-950 stroke-white" />
                    </div>
                  )}
                </div>
                <div className="text-center mt-2.5 space-y-0.5">
                  <span className="text-xs sm:text-sm font-black text-[#ff007f] flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff007f]" />
                    {av.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#ff007f]/80 block tracking-tight">
                    {av.role}
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Center Emblem: CIFRAFLOW FINANCIERO / ECOSISTEMA FINTECH JUVENIL */}
          <button
            type="button"
            onClick={onLogoClick}
            title="Hacer clic en el logotipo de CifraFlow para regresar a la Portada de Logeo"
            className="col-span-2 md:col-span-1 flex flex-col items-center justify-center order-first md:order-none py-2 group cursor-pointer active:scale-95 transition-all text-center"
          >
            <div className="w-28 sm:w-32 h-20 sm:h-24 rounded-2xl bg-[#030919] border border-cyan-500/40 shadow-[0_0_25px_rgba(0,243,255,0.25)] group-hover:border-[#00f3ff] group-hover:shadow-[0_0_35px_rgba(0,243,255,0.5)] flex items-center justify-center p-3 mb-2 transition-all">
              <svg viewBox="0 0 100 60" className="w-16 h-10 drop-shadow-[0_0_12px_#00f3ff] group-hover:scale-105 transition-transform" fill="none">
                <path
                  d="M30 15 C 15 15, 8 20, 8 30 C 8 40, 15 45, 30 45 C 44 45, 48 35, 50 30 C 52 25, 56 15, 70 15 C 85 15, 92 20, 92 30 C 92 40, 85 45, 70 45 C 56 45, 52 35, 50 30 C 48 25, 44 15, 30 15 Z"
                  stroke="url(#centerAvatarInfGrad)"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <circle cx="16" cy="30" r="3.5" fill="#00f3ff" />
                <circle cx="84" cy="30" r="3.5" fill="#ff007f" />
                <defs>
                  <linearGradient id="centerAvatarInfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f3ff" />
                    <stop offset="50%" stopColor="#e879f9" />
                    <stop offset="100%" stopColor="#ff007f" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="text-xs font-black tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] via-[#e879f9] to-[#ff007f]">
              CIFRAFLOW FINANCIERO
            </span>
            <span className="text-[9px] font-mono tracking-widest text-cyan-400 group-hover:underline uppercase mt-0.5 flex items-center gap-1">
              <span>← Volver a Portada</span>
            </span>
          </button>

          {/* Card 3: IVÁN */}
          {(() => {
            const av = TEEN_AVATARS[2];
            const isChosen = currentSelected === 'ivan';
            return (
              <div
                onClick={() => handlePick('ivan')}
                className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                  isChosen ? 'scale-105' : 'opacity-80 hover:opacity-100 hover:scale-102'
                }`}
              >
                <div
                  className={`w-28 sm:w-36 md:w-full aspect-[3/4] rounded-2xl border-2 overflow-hidden relative shadow-lg transition-all ${
                    isChosen
                      ? 'border-[#34d399] shadow-[0_0_25px_rgba(52,211,153,0.7)]'
                      : 'border-[#34d399]/40 hover:border-[#34d399]'
                  }`}
                >
                  <img
                    src={av.imageUrl}
                    alt={av.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                  {isChosen && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#34d399] text-slate-950 flex items-center justify-center shadow-md">
                      <CheckCircle2 className="w-4 h-4 fill-current text-slate-950 stroke-white" />
                    </div>
                  )}
                </div>
                <div className="text-center mt-2.5 space-y-0.5">
                  <span className="text-xs sm:text-sm font-black text-[#34d399] flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                    {av.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#34d399]/80 block tracking-tight">
                    {av.role}
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Card 4: CARLOS */}
          {(() => {
            const av = TEEN_AVATARS[3];
            const isChosen = currentSelected === 'carlos';
            return (
              <div
                onClick={() => handlePick('carlos')}
                className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                  isChosen ? 'scale-105' : 'opacity-80 hover:opacity-100 hover:scale-102'
                }`}
              >
                <div
                  className={`w-28 sm:w-36 md:w-full aspect-[3/4] rounded-2xl border-2 overflow-hidden relative shadow-lg transition-all ${
                    isChosen
                      ? 'border-[#fbbf24] shadow-[0_0_25px_rgba(251,191,36,0.7)]'
                      : 'border-[#fbbf24]/40 hover:border-[#fbbf24]'
                  }`}
                >
                  <img
                    src={av.imageUrl}
                    alt={av.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                  {isChosen && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#fbbf24] text-slate-950 flex items-center justify-center shadow-md">
                      <CheckCircle2 className="w-4 h-4 fill-current text-slate-950 stroke-white" />
                    </div>
                  )}
                </div>
                <div className="text-center mt-2.5 space-y-0.5">
                  <span className="text-xs sm:text-sm font-black text-[#fbbf24] flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
                    {av.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#fbbf24]/80 block tracking-tight">
                    {av.role}
                  </span>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Bottom Selector Pills Bar matching screenshot */}
        <div className="relative z-10 pt-6 mt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Pill 1: Jorge */}
          <button
            type="button"
            onClick={() => handlePick('jorge')}
            className={`px-5 py-2.5 rounded-2xl font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
              currentSelected === 'jorge'
                ? 'bg-[#002b3d] border-2 border-[#00f3ff] text-[#00f3ff] shadow-[0_0_20px_rgba(0,243,255,0.5)]'
                : 'bg-[#0a1224] border border-slate-800 text-cyan-400 hover:border-cyan-500/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#00f3ff]" />
            <span>Jorge</span>
          </button>

          {/* Pill 2: Ircar */}
          <button
            type="button"
            onClick={() => handlePick('ircar')}
            className={`px-5 py-2.5 rounded-2xl font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
              currentSelected === 'ircar'
                ? 'bg-[#3b0826] border-2 border-[#ff007f] text-[#ff007f] shadow-[0_0_20px_rgba(255,0,127,0.5)]'
                : 'bg-[#0a1224] border border-slate-800 text-pink-400 hover:border-pink-500/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#ff007f]" />
            <span>Ircar</span>
          </button>

          {/* Pill 3: Iván */}
          <button
            type="button"
            onClick={() => handlePick('ivan')}
            className={`px-5 py-2.5 rounded-2xl font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
              currentSelected === 'ivan'
                ? 'bg-[#062d1d] border-2 border-[#34d399] text-[#34d399] shadow-[0_0_20px_rgba(52,211,153,0.5)]'
                : 'bg-[#0a1224] border border-slate-800 text-emerald-400 hover:border-emerald-500/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#34d399]" />
            <span>Iván</span>
          </button>

          {/* Pill 4: Carlos */}
          <button
            type="button"
            onClick={() => handlePick('carlos')}
            className={`px-5 py-2.5 rounded-2xl font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
              currentSelected === 'carlos'
                ? 'bg-[#332402] border-2 border-[#fbbf24] text-[#fbbf24] shadow-[0_0_20px_rgba(251,191,36,0.5)]'
                : 'bg-[#0a1224] border border-slate-800 text-amber-400 hover:border-amber-500/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#fbbf24]" />
            <span>Carlos</span>
          </button>
        </div>
      </div>

      {/* 2. DOSSIER DEL CADETE SELECCIONADO Y ACCIÓN DE CONFIRMACIÓN */}
      <div className="rounded-3xl border border-slate-800 bg-[#060e22]/90 backdrop-blur-xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl border-2 flex items-center justify-center font-mono font-black text-base shadow-lg"
              style={{
                borderColor: activeAvatar.neonColor,
                color: activeAvatar.neonColor,
                backgroundColor: `${activeAvatar.neonColor}15`,
              }}
            >
              {activeAvatar.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white">{activeAvatar.name}</h3>
                <span
                  className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-full border"
                  style={{
                    borderColor: activeAvatar.neonColor,
                    color: activeAvatar.neonColor,
                  }}
                >
                  {activeAvatar.role}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{activeAvatar.roleSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#020714] px-4 py-2 rounded-2xl border border-slate-800 text-xs font-mono">
            <Zap className="w-4 h-4 text-[#FFD100]" />
            <span className="text-slate-300">Bonificación de Perk:</span>
            <span className="text-[#34d399] font-bold">+{activeAvatar.perkPointsBonus} pts extra</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#030816] border border-slate-800/80 space-y-1">
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
              Habilidad Operativa (Perk Activo)
            </span>
            <p className="text-white font-bold">{activeAvatar.perk}</p>
            <p className="text-slate-400 italic">"{activeAvatar.quote}"</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#030816] border border-slate-800/80 space-y-1.5 font-mono text-[11px]">
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
              Especialidad en Retos BDV
            </span>
            <div className="flex justify-between text-slate-300">
              <span>Categoría Bonificada:</span>
              <span className="text-[#34d399] font-bold">{activeAvatar.perkBonusCategory}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Blindaje de Telemetría:</span>
              <span className="text-white font-bold">Activo</span>
            </div>
          </div>
        </div>

        {/* Action Button: Confirm & Proceed */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onContinue}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#00f3ff] via-[#0088ff] to-[#ff007f] hover:from-[#00f3ff] hover:to-[#ff007f] text-slate-950 font-black text-xs sm:text-sm font-mono uppercase tracking-widest shadow-[0_0_30px_rgba(0,243,255,0.5)] transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-98"
          >
            <span>CONFIRMAR A {activeAvatar.name.toUpperCase()} Y ENTRAR A LA MATRIZ DE RETOS</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};
