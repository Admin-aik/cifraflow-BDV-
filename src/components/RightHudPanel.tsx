import React from 'react';
import { TEEN_AVATARS } from '../data/cifraflowChallenges';
import { AvatarId } from '../types/cifraflow';
import { Trophy, AlertTriangle, Zap, Shield, Flame, Activity, Landmark, ExternalLink } from 'lucide-react';

interface RightHudPanelProps {
  totalScore: number;
  streak: number;
  selectedAvatarId: AvatarId | null;
  currentChallengeIndex?: number;
  totalChallenges?: number;
  lastPointsChange?: {
    base: number;
    bonus: number;
    penalties: number;
    net: number;
  };
  onOpenBankingSimulator?: () => void;
}

export const RightHudPanel: React.FC<RightHudPanelProps> = ({
  totalScore,
  streak,
  selectedAvatarId,
  currentChallengeIndex = 0,
  totalChallenges = 10,
  lastPointsChange,
  onOpenBankingSimulator,
}) => {
  const avatar = TEEN_AVATARS.find((a) => a.id === selectedAvatarId);
  const isNegative = totalScore < 0;

  return (
    <div
      id="right_hud_panel"
      className="w-full lg:w-72 bg-[#060e22]/95 border-2 rounded-3xl p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 shadow-2xl relative overflow-hidden flex flex-col gap-4 text-white"
      style={{
        borderColor: isNegative ? '#ff007f' : avatar?.neonColor || '#00f3ff',
        boxShadow: isNegative
          ? '0 0 30px rgba(255,0,127,0.35)'
          : `0 0 30px ${avatar?.neonColor || '#00f3ff'}30`,
      }}
    >
      {/* Background glow node */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none"
        style={{ backgroundColor: isNegative ? '#ff007f' : avatar?.neonColor || '#00f3ff' }}
      />

      {/* HUD Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2.5">
        <div className="flex items-center gap-1.5 text-xs font-mono font-black tracking-wider uppercase text-cyan-300">
          <Activity className="w-3.5 h-3.5 text-[#00f3ff] animate-pulse" />
          <span>HUD TELEMETRÍA</span>
        </div>
        <span className="text-[10px] bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded-full font-mono">
          V1.0 LIVE
        </span>
      </div>

      {/* Main Accumulated Score Box (Accepts negative values strictly) */}
      <div
        className={`p-4 rounded-2xl border transition-all text-center relative ${
          isNegative
            ? 'bg-rose-950/40 border-[#ff007f] shadow-[0_0_20px_rgba(255,0,127,0.3)]'
            : 'bg-slate-900/80 border-cyan-500/30'
        }`}
      >
        <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400 block mb-1">
          Puntuación Acumulada
        </span>

        <div className="flex items-center justify-center gap-2">
          {isNegative ? (
            <AlertTriangle className="w-6 h-6 text-[#ff007f] animate-bounce shrink-0" />
          ) : (
            <Trophy className="w-6 h-6 text-[#fbbf24] shrink-0" />
          )}

          <div
            className={`text-3xl sm:text-4xl font-black font-mono tracking-tight drop-shadow-md ${
              isNegative ? 'text-[#ff007f]' : 'text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#34d399]'
            }`}
          >
            {totalScore > 0 ? `+${totalScore}` : totalScore}
            <span className="text-xs font-sans font-bold text-slate-400 ml-1">pts</span>
          </div>
        </div>

        {isNegative && (
          <div className="text-[10px] text-[#ff007f] font-mono mt-1 font-bold tracking-wide uppercase">
            Penalización en Curso • Sigue Intentando
          </div>
        )}

        {/* Last delta indicator */}
        {lastPointsChange && (
          <div className="text-[10px] font-mono mt-2 pt-2 border-t border-slate-800 flex justify-between text-slate-400">
            <span>Último balance:</span>
            <span
              className={`font-bold ${
                lastPointsChange.net >= 0 ? 'text-[#34d399]' : 'text-[#ff007f]'
              }`}
            >
              {lastPointsChange.net >= 0 ? `+${lastPointsChange.net}` : lastPointsChange.net} pts
            </span>
          </div>
        )}
      </div>

      {/* Streak & Progression */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1 text-[#fbbf24] text-[10px] font-bold uppercase font-mono">
            <Flame className="w-3.5 h-3.5" />
            <span>Racha Aciertos</span>
          </div>
          <span className="text-lg font-black font-mono text-white mt-0.5">
            {streak}x
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1 text-cyan-300 text-[10px] font-bold uppercase font-mono">
            <Zap className="w-3.5 h-3.5 text-[#00f3ff]" />
            <span>Reto Actual</span>
          </div>
          <span className="text-lg font-black font-mono text-white mt-0.5">
            {Math.min(currentChallengeIndex + 1, totalChallenges)} / {totalChallenges}
          </span>
        </div>
      </div>

      {/* Selected Teen Cadet Avatar card if active */}
      {avatar ? (
        <div
          className="p-3 rounded-2xl border bg-slate-900/80 transition-all space-y-2"
          style={{ borderColor: `${avatar.neonColor}60` }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-12 h-12 rounded-xl overflow-hidden border flex items-center justify-center relative shrink-0 shadow-md"
              style={{
                borderColor: avatar.neonColor,
                backgroundColor: `${avatar.neonColor}20`,
              }}
            >
              {avatar.imageUrl ? (
                <img
                  src={avatar.imageUrl}
                  alt={avatar.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <span className="text-xs font-black font-mono" style={{ color: avatar.neonColor }}>
                  {avatar.name[0]}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <span className="text-xs font-black text-white block truncate">
                {avatar.name}
              </span>
              <span
                className="text-[10px] font-mono block truncate"
                style={{ color: avatar.neonColor }}
              >
                {avatar.role}
              </span>
            </div>
          </div>

          <div className="text-[10px] bg-slate-950/80 p-2 rounded-xl border border-slate-800">
            <span className="text-slate-400 block font-mono text-[9px] uppercase font-bold mb-0.5">
              Perk Operativo Activo:
            </span>
            <span className="text-white font-semibold flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#34d399] shrink-0" />
              {avatar.perk}
            </span>
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-2xl border border-dashed border-slate-700 text-center text-xs text-slate-400">
          <span className="text-[11px] block text-slate-300 font-bold">Sin Avatar Seleccionado</span>
          <span className="text-[9px] text-slate-500">Selecciona en Fase 1 para activar Perks</span>
        </div>
      )}

      {/* Optional BDV Account Simulator Launcher (Official Banco de Venezuela) */}
      {onOpenBankingSimulator && (
        <div className="p-3 rounded-2xl bg-gradient-to-br from-[#002855] via-[#003882] to-[#001938] border border-[#C8102E]/60 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-[#FFD100]" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white">
                Simulador BDV
              </span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-[#C8102E] text-[8px] font-mono font-black text-white uppercase">
              Oficial
            </span>
          </div>
          <p className="text-[10px] text-slate-200 leading-tight">
            Práctica en vivo: PagomóvilBDV, Ami Ven, Tarjetas y Mesa de Cambio.
          </p>
          <button
            type="button"
            onClick={onOpenBankingSimulator}
            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#C8102E] to-[#B30006] hover:brightness-110 text-white font-mono text-[10px] font-black uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <span>Abrir Cuenta Simulada BDV</span>
            <ExternalLink className="w-3 h-3 text-[#FFD100]" />
          </button>
        </div>
      )}

      {/* System Rules Reminder */}
      <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[9px] font-mono text-slate-400 space-y-1">
        <div className="flex justify-between">
          <span>Acierto:</span>
          <span className="text-[#34d399] font-bold">+100 a +150 pts</span>
        </div>
        <div className="flex justify-between">
          <span>Error (Intento):</span>
          <span className="text-[#ff007f] font-bold">-25 a -50 pts</span>
        </div>
        <div className="flex justify-between">
          <span>Respuesta Secreta:</span>
          <span className="text-cyan-300 font-bold">Confidencial</span>
        </div>
      </div>
    </div>
  );
};
