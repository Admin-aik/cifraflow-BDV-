import React from 'react';
import { CIFRAFLOW_PANORAMIC_BANNER } from '../data/cifraflowChallenges';
import { speakWelcomePrompt } from '../utils/speech';
import { Sparkles, Volume2 } from 'lucide-react';

interface PanoramicTeamBannerProps {
  onPlayVoice?: () => void;
}

export const PanoramicTeamBanner: React.FC<PanoramicTeamBannerProps> = ({ onPlayVoice }) => {
  const handleVoice = () => {
    if (onPlayVoice) {
      onPlayVoice();
    } else {
      speakWelcomePrompt();
    }
  };

  return (
    <div className="w-full relative overflow-hidden rounded-3xl border-2 border-cyan-500/50 bg-[#030712] shadow-[0_0_40px_rgba(0,243,255,0.3)] group">
      {/* Background Cover Image */}
      <div className="relative w-full aspect-[16/7] sm:aspect-[16/6] md:aspect-[16/5.2] overflow-hidden">
        <img
          src={CIFRAFLOW_PANORAMIC_BANNER}
          alt="Escuadrón Cyber-Cadetes 3D - CifraFlow Financiero BDV"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform group-hover:scale-[1.01] transition-transform duration-700"
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/60 via-transparent to-[#030712]/60 pointer-events-none" />

        {/* Top subtle badge */}
        <div className="absolute top-3 left-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-cyan-500/40 backdrop-blur-md text-[10px] font-mono text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-[#00f3ff] animate-ping" />
          <span>PUENTE DE MANDO // ESCUADRÓN BANCO DE VENEZUELA</span>
        </div>

        {/* Floating Pill Badges (Identical to user's reference image) */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3">
          {/* Left Pill: Escuadrón Cyber-Cadetes 3D */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#020b1e]/85 border border-cyan-500/60 backdrop-blur-md text-xs font-mono font-bold text-cyan-300 shadow-[0_0_15px_rgba(0,243,255,0.3)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Escuadrón Cyber-Cadetes 3D · Secundaria & Liceo</span>
          </div>

          {/* Right Pill: Escuchar Bienvenida (Magenta Button) */}
          <button
            type="button"
            onClick={handleVoice}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff007f] hover:bg-[#ff1a8c] text-slate-950 font-black text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(255,0,127,0.7)] transition-all cursor-pointer active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            <span>🗣️ Escuchar Bienvenida (Voz Dulce)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
