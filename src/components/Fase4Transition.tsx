import React, { useEffect } from 'react';
import { speakGameOverTransition } from '../utils/speech';
import { TEEN_AVATARS } from '../data/cifraflowChallenges';
import { AvatarId } from '../types/cifraflow';
import { CifraflowLogo } from './CifraflowLogo';
import { ArrowRight, Volume2, Sparkles, AlertCircle, Trophy, Zap } from 'lucide-react';

interface Fase4TransitionProps {
  lastPoints: {
    base: number;
    bonus: number;
    penalties: number;
    net: number;
  };
  totalScore: number;
  currentIndex: number;
  totalChallenges: number;
  selectedAvatarId: AvatarId | null;
  audioEnabled: boolean;
  onNextChallenge: () => void;
  onLogoClick?: () => void;
}

export const Fase4Transition: React.FC<Fase4TransitionProps> = ({
  lastPoints,
  totalScore,
  currentIndex,
  totalChallenges,
  selectedAvatarId,
  audioEnabled,
  onNextChallenge,
  onLogoClick,
}) => {
  const avatar = TEEN_AVATARS.find((a) => a.id === selectedAvatarId);
  const isLast = currentIndex + 1 >= totalChallenges;

  // Speak the mandatory sentence on mount
  useEffect(() => {
    if (audioEnabled) {
      speakGameOverTransition();
    }
  }, []);

  const handleReplayVoice = () => {
    speakGameOverTransition();
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in zoom-in-95 duration-400">
      {/* CifraFlow Logo & Back Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#061026]/80 border border-cyan-500/30 backdrop-blur-sm">
        <CifraflowLogo
          size="sm"
          canGoBack={true}
          onClick={onLogoClick}
          backHintText="← Volver a Menú de Elección"
          showBackHint={true}
        />

        <div className="text-right">
          <span className="text-[10px] font-mono text-slate-400 block">Evaluación de Desempeño</span>
          <span className="text-xs font-mono font-black text-[#ff007f]">Transición de Reto</span>
        </div>
      </div>

      {/* Mandatory GAME OVER Banner Box */}
      <div className="relative rounded-3xl border-2 border-[#ff007f] bg-gradient-to-b from-[#190518] to-[#08020a] p-6 sm:p-8 text-center backdrop-blur-xl shadow-[0_0_50px_rgba(255,0,127,0.35)] space-y-4">
        {/* Neon Glow Node */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-[#ff007f] rounded-full blur-3xl opacity-20 pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-[#ff007f]/50 text-xs font-mono font-black tracking-widest text-[#ff007f] uppercase">
          <span className="w-2 h-2 rounded-full bg-[#ff007f] animate-ping" />
          <span>FASE 4 — TRANSICIÓN OFICIAL DE RETO</span>
        </div>

        {/* Mandatory Official Phrase */}
        <h2 className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,0,127,0.6)] uppercase">
          GAME OVER
        </h2>
        <p className="text-sm sm:text-base font-bold font-mono text-cyan-300 tracking-wide">
          «Fin de este reto, vamos al siguiente.»
        </p>

        {/* Replay Audio Button */}
        <div>
          <button
            type="button"
            onClick={handleReplayVoice}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white transition-all font-mono"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#ff007f]" />
            <span>Repetir locución obligatoria</span>
          </button>
        </div>

        {/* Score Breakdown Table */}
        <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 text-left space-y-2.5 font-mono text-xs">
          <div className="flex justify-between text-slate-300 pb-1.5 border-b border-slate-800">
            <span>Puntos Base del Reto:</span>
            <span className="text-[#34d399] font-bold">+{lastPoints.base} pts</span>
          </div>

          {avatar && (
            <div className="flex justify-between text-slate-300 pb-1.5 border-b border-slate-800">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#FFD100]" />
                Perk de {avatar.name}:
              </span>
              <span className={lastPoints.bonus > 0 ? 'text-[#FFD100] font-bold' : 'text-slate-500'}>
                {lastPoints.bonus > 0 ? `+${lastPoints.bonus}` : 0} pts
              </span>
            </div>
          )}

          <div className="flex justify-between text-slate-300 pb-1.5 border-b border-slate-800">
            <span>Penalizaciones por Fallos:</span>
            <span className={lastPoints.penalties > 0 ? 'text-[#ff007f] font-bold' : 'text-slate-500'}>
              {lastPoints.penalties > 0 ? `-${lastPoints.penalties}` : 0} pts
            </span>
          </div>

          <div className="flex justify-between text-sm font-bold pt-1">
            <span className="text-white">Neto Sumado en este Reto:</span>
            <span
              className={lastPoints.net >= 0 ? 'text-[#34d399]' : 'text-[#ff007f]'}
            >
              {lastPoints.net >= 0 ? `+${lastPoints.net}` : lastPoints.net} pts
            </span>
          </div>
        </div>

        {/* Global Score & Progression */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-cyan-500/30">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">
              Marcador Global Actual
            </span>
            <span
              className={`text-xl sm:text-2xl font-black font-mono ${
                totalScore < 0 ? 'text-[#ff007f]' : 'text-[#00f3ff]'
              }`}
            >
              {totalScore > 0 ? `+${totalScore}` : totalScore} pts
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">
              Progreso de Desafíos
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-white">
              {currentIndex + 1} / {totalChallenges}
            </span>
          </div>
        </div>

        {/* Action Button: Proceed to next challenge */}
        <div className="pt-3">
          <button
            type="button"
            onClick={onNextChallenge}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#00f3ff] via-[#0088ff] to-[#ff007f] hover:from-[#00f3ff] hover:to-[#ff007f] text-slate-950 font-black text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(0,243,255,0.6)] transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-95"
          >
            <span>
              {isLast ? 'VER EVALUACIÓN FINAL DE LA MISIÓN' : 'AVANZAR AL SIGUIENTE DESAFÍO'}
            </span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};
