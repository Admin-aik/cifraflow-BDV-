import React from 'react';
import { Shield, Bot, Bell, LogOut, ArrowRightLeft, Clock, UserCheck, Gamepad2 } from 'lucide-react';
import { BdvLogo } from './BdvLogo';
import { ExchangeRates } from '../types';

interface HeaderProps {
  rates: ExchangeRates;
  onOpenAmiVen: () => void;
  onOpenEva: () => void;
  onQuickTransfer: () => void;
  onOpenCifraflow?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  rates,
  onOpenAmiVen,
  onOpenEva,
  onQuickTransfer,
  onOpenCifraflow,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full shadow-sm bg-white">
      {/* Official BCV & Banking Ticker Bar */}
      <div className="bg-[#001938] text-white text-[11px] py-1.5 px-4 border-b border-blue-900/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="bg-[#C8102E] font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
              Tasa Oficial BCV
            </span>
            <div className="flex items-center gap-3 font-mono font-medium text-slate-200">
              <span className="flex items-center gap-1">
                <span className="text-amber-400 font-bold">USD:</span> Bs. {rates.usd.toFixed(2)}
              </span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1">
                <span className="text-blue-300 font-bold">EUR:</span> Bs. {rates.eur.toFixed(2)}
              </span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1">
                <span className="text-emerald-400 font-bold">CNY:</span> Bs. {rates.cny.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-300 text-[10px]">
            <span className="hidden sm:inline-flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              Actualizado: {rates.lastUpdated}
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-semibold border border-emerald-500/30">
              Sistema Operativo 100%
            </span>
          </div>
        </div>
      </div>

      {/* Main BDVenlínea Header */}
      <div className="bg-gradient-to-r from-[#002855] via-[#003366] to-[#001e42] text-white px-4 py-3 sm:py-3.5 border-b-4 border-[#C8102E]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <BdvLogo variant="white" size="md" />
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* CifraFlow Financiero Game Button */}
            {onOpenCifraflow && (
              <button
                onClick={onOpenCifraflow}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#00f3ff]/20 via-[#ff007f]/20 to-[#fbbf24]/20 hover:from-[#00f3ff]/30 hover:to-[#ff007f]/30 text-white rounded-xl text-xs font-bold border border-[#00f3ff]/60 shadow-[0_0_12px_rgba(0,243,255,0.3)] transition-all active:scale-95 group"
                title="Abrir juego educativo CifraFlow Financiero"
              >
                <Gamepad2 className="w-3.5 h-3.5 text-[#00f3ff] group-hover:rotate-12 transition-transform" />
                <span className="hidden sm:inline font-mono tracking-tight">CifraFlow BDV</span>
                <span className="bg-[#ff007f] text-white px-1.5 py-0.2 rounded text-[9px] font-mono font-black uppercase">
                  Juego
                </span>
              </button>
            )}

            {/* Ami Ven Button */}
            <button
              onClick={onOpenAmiVen}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#C8102E] to-[#B30006] hover:from-red-600 hover:to-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-950/40 transition-transform active:scale-95"
              title="Abrir generador de Clave Dinámica Ami Ven"
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ami Ven</span>
              <span className="bg-white/25 px-1.5 py-0.5 rounded text-[10px] font-mono">6 Dig</span>
            </button>

            {/* Eva Assistant Button */}
            <button
              onClick={onOpenEva}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold border border-white/15 transition-colors"
              title="Consultar Asistente Eva BDV"
            >
              <Bot className="w-3.5 h-3.5 text-[#FFD100]" />
              <span className="hidden md:inline">Eva Asistente</span>
            </button>

            {/* User info */}
            <div className="hidden lg:flex flex-col text-right pl-3 border-l border-white/15">
              <span className="text-xs font-bold tracking-tight text-white flex items-center gap-1 justify-end">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                Carlos E. Pérez
              </span>
              <span className="text-[10px] text-blue-200/80 font-mono">V-24.891.302</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
                title="Notificaciones BDV"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#FFD100] rounded-full ring-2 ring-[#002855]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
