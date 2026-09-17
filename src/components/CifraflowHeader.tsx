import React from 'react';
import { CifraflowLogo } from './CifraflowLogo';
import { CifraPhase } from '../types/cifraflow';
import { Volume2, VolumeX, RefreshCw, Type, Landmark } from 'lucide-react';
import { ExchangeRates } from '../types';

interface CifraflowHeaderProps {
  currentPhase: CifraPhase;
  canGoBack: boolean;
  onGoBack: () => void;
  rates: ExchangeRates;
  onRefreshRates: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  textSizeLevel: 'sm' | 'base' | 'lg' | 'xl';
  onChangeTextSize: (size: 'sm' | 'base' | 'lg' | 'xl') => void;
}

export const CifraflowHeader: React.FC<CifraflowHeaderProps> = ({
  currentPhase,
  canGoBack,
  onGoBack,
  rates,
  onRefreshRates,
  audioEnabled,
  onToggleAudio,
  textSizeLevel,
  onChangeTextSize,
}) => {
  const phaseLabels: Record<CifraPhase, string> = {
    FASE_0_LOGIN: 'FASE 0 — INGRESO AL ECOSISTEMA UNIFICADO',
    FASE_1_AVATARS: 'FASE 1 — SELECCIÓN CINEMATOGRÁFICA DE AVATARES',
    FASE_2_MODULES: 'FASE 2 — SELECCIÓN DE MÓDULOS Y CAMPAÑA',
    FASE_3_GAMEPLAY: 'FASE 3 — SIMULACIÓN & RETOS ACTIVOS',
    FASE_4_TRANSITION: 'FASE 4 — EVALUACIÓN DEL RETO',
    FASE_5_END_MISSION: 'FASE 5 — EVALUACIÓN FINAL Y CERTIFICACIÓN',
  };

  const backHintMap: Record<CifraPhase, string | undefined> = {
    FASE_0_LOGIN: undefined,
    FASE_1_AVATARS: '← Ir a Portada de Logeo',
    FASE_2_MODULES: '← Ir a Selección de Avatares',
    FASE_3_GAMEPLAY: '← Ir a Menú de Elección',
    FASE_4_TRANSITION: '← Ir a Menú de Elección',
    FASE_5_END_MISSION: '← Ir a Menú de Elección',
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#030712]/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Clickable Cifraflow Logo (Back Navigation) */}
        <div className="flex items-center gap-3">
          <CifraflowLogo
            size="md"
            canGoBack={canGoBack}
            onClick={canGoBack ? onGoBack : undefined}
            showBackHint={true}
            backHintText={backHintMap[currentPhase]}
          />

          {/* Phase Badge */}
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-cyan-500/20">
            <span className="w-2 h-2 rounded-full bg-[#00f3ff] animate-ping" />
            <span className="text-[10px] font-mono font-black text-cyan-300 tracking-wider">
              {phaseLabels[currentPhase]}
            </span>
          </div>
        </div>

        {/* Right Controls: BCV Live Rates, Text Size, Audio Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Official BCV Rate Badge */}
          <div className="flex items-center gap-2 bg-[#061026] border border-cyan-500/30 px-3 py-1.5 rounded-2xl shadow-inner text-xs">
            <div className="flex items-center gap-1 text-[#FFD100]">
              <Landmark className="w-3.5 h-3.5" />
              <span className="font-bold text-[10px] uppercase font-mono hidden sm:inline">
                Tasa BCV:
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] font-black">
              <span className="text-[#34d399]">
                ${rates.usd.toFixed(2)}{' '}
                <span className="text-[9px] text-slate-400 font-normal">Bs</span>
              </span>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="text-[#00f3ff] hidden sm:inline">
                €{rates.eur.toFixed(2)}{' '}
                <span className="text-[9px] text-slate-400 font-normal">Bs</span>
              </span>
            </div>

            <button
              type="button"
              onClick={onRefreshRates}
              title="Actualizar tasa BCV oficial en tiempo real"
              className="p-1 hover:bg-white/10 rounded-lg text-cyan-300 transition-colors"
            >
              <RefreshCw className="w-3 h-3 hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>

          {/* Accessibility Text Size Controller */}
          <div className="flex items-center bg-[#061026] border border-slate-800 rounded-2xl p-0.5 text-xs font-mono">
            <span className="px-1.5 text-slate-400 text-[10px] hidden sm:inline flex items-center">
              <Type className="w-3 h-3 mr-0.5" />
            </span>
            <button
              type="button"
              onClick={() => onChangeTextSize('sm')}
              title="Texto 90%"
              className={`px-2 py-1 rounded-xl text-[10px] font-bold transition-all ${
                textSizeLevel === 'sm'
                  ? 'bg-cyan-500 text-black shadow-[0_0_8px_#00f3ff]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => onChangeTextSize('base')}
              title="Texto 100%"
              className={`px-2 py-1 rounded-xl text-[10px] font-bold transition-all ${
                textSizeLevel === 'base'
                  ? 'bg-cyan-500 text-black shadow-[0_0_8px_#00f3ff]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              A
            </button>
            <button
              type="button"
              onClick={() => onChangeTextSize('lg')}
              title="Texto 115%"
              className={`px-2 py-1 rounded-xl text-[10px] font-bold transition-all ${
                textSizeLevel === 'lg'
                  ? 'bg-cyan-500 text-black shadow-[0_0_8px_#00f3ff]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              A+
            </button>
            <button
              type="button"
              onClick={() => onChangeTextSize('xl')}
              title="Texto 130%"
              className={`px-2 py-1 rounded-xl text-[10px] font-bold transition-all ${
                textSizeLevel === 'xl'
                  ? 'bg-cyan-500 text-black shadow-[0_0_8px_#00f3ff]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              A++
            </button>
          </div>

          {/* Audio / Text-To-Speech Toggle */}
          <button
            type="button"
            onClick={onToggleAudio}
            title={audioEnabled ? 'Desactivar locución de voz' : 'Activar locución de voz'}
            className={`p-2 rounded-2xl border transition-all flex items-center justify-center ${
              audioEnabled
                ? 'bg-gradient-to-r from-[#00f3ff]/20 to-[#ff007f]/20 border-[#00f3ff] text-[#00f3ff] shadow-[0_0_12px_rgba(0,243,255,0.3)]'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
