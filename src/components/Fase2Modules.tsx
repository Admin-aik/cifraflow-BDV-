import React from 'react';
import { CATEGORY_INFO, CIFRAFLOW_CHALLENGES, TEEN_AVATARS } from '../data/cifraflowChallenges';
import { ChallengeCategory, AvatarId } from '../types/cifraflow';
import { BdvLogo } from './BdvLogo';
import { CifraflowLogo } from './CifraflowLogo';
import {
  BookOpen,
  Landmark,
  TrendingUp,
  BarChart3,
  ShieldAlert,
  Play,
  Zap,
  Sparkles,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  CreditCard,
  RefreshCw,
} from 'lucide-react';

interface Fase2ModulesProps {
  selectedAvatarId: AvatarId | null;
  onSelectCategoryAndStart: (category: ChallengeCategory | 'ALL') => void;
  onOpenBankingSimulator?: () => void;
  onLogoClick?: () => void;
}

export const Fase2Modules: React.FC<Fase2ModulesProps> = ({
  selectedAvatarId,
  onSelectCategoryAndStart,
  onOpenBankingSimulator,
  onLogoClick,
}) => {
  const avatar = TEEN_AVATARS.find((a) => a.id === selectedAvatarId);

  const getCategoryIcon = (category: ChallengeCategory) => {
    switch (category) {
      case 'LECTURA_CONTRATOS':
        return <BookOpen className="w-6 h-6 text-purple-300" />;
      case 'BANCA_FINTECH_BDV':
        return <Landmark className="w-6 h-6 text-[#00f3ff]" />;
      case 'EMPRENDIMIENTO':
        return <TrendingUp className="w-6 h-6 text-[#34d399]" />;
      case 'BOLSA_BVC':
        return <BarChart3 className="w-6 h-6 text-[#fbbf24]" />;
      case 'CIBERSEGURIDAD':
        return <ShieldAlert className="w-6 h-6 text-[#ff007f]" />;
    }
  };

  const categories = Object.keys(CATEGORY_INFO) as ChallengeCategory[];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Top Bar with CifraFlow Logo & Back Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-2xl bg-[#061026]/80 border border-cyan-500/30 backdrop-blur-sm">
        <CifraflowLogo
          size="sm"
          canGoBack={true}
          onClick={onLogoClick}
          backHintText="← Volver a Selección de Avatares"
          showBackHint={true}
        />

        <div className="text-right">
          <span className="text-[10px] font-mono text-slate-400 block">Ecosistema CifraFlow BDV</span>
          <span className="text-xs font-mono font-black text-cyan-300">Menú de Opciones y Simuladores</span>
        </div>
      </div>

      {/* Phase Label & Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-[10px] sm:text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase shadow-[0_0_15px_rgba(0,243,255,0.2)]">
          <span className="w-2 h-2 rounded-full bg-[#00f3ff] animate-ping" />
          <span>FASE 2 — MENÚ DE OPCIONES PEDAGÓGICAS, SIMULADORES Y RETOS</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Elige el <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff007f]">Pilar de Aprendizaje</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
          Enfréntate a <span className="text-[#00f3ff] font-bold">Adivinanzas Bancarias BDV</span>, <span className="text-[#FFD100] font-bold">Trivias Fintech</span> y <span className="text-[#ff007f] font-bold">Acertijos Forenses</span> diseñados para consolidar tu educación financiera.
        </p>
      </div>

      {/* 1. PRIMERA OPCIÓN: CAMPAÑA INTEGRAL UNIFICADA (TODOS LOS RETOS) */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#00f3ff] via-[#b026ff] to-[#ff007f] rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition-opacity" />

        <div className="relative rounded-3xl border-2 border-cyan-500/60 bg-[#07132a]/95 p-6 sm:p-8 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#FFD100]/20 border border-[#FFD100]/50 text-[#FFD100] text-[10px] font-mono font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OPCIÓN PRINCIPAL RECOMENDADA</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">
              Campaña Integral Unificada (10 Desafíos BDV)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Recorrido completo por los 5 pilares: Adivinanzas del Banco de Venezuela (Pagomóvil, Ami Ven, Biopago), Trivias de SUDEBAN y Tasa BCV, y Acertijos de Ciberdefensa y Bolsa BVC.
            </p>

            {avatar && (
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300 pt-1">
                <Zap className="w-3.5 h-3.5 text-[#FFD100]" />
                <span>Perk de {avatar.name} activo: +25 pts bonus en retos afines.</span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => onSelectCategoryAndStart('ALL')}
            className="w-full md:w-auto shrink-0 py-4 px-8 rounded-2xl bg-gradient-to-r from-[#00f3ff] via-[#0088ff] to-[#ff007f] hover:from-[#00f3ff] hover:to-[#ff007f] text-slate-950 font-black text-sm uppercase tracking-widest shadow-[0_0_25px_rgba(0,243,255,0.6)] transition-all flex items-center justify-center gap-3 active:scale-95 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>INICIAR CAMPAÑA INTEGRAL</span>
          </button>
        </div>
      </div>

      {/* 2. SEGUNDA SECCIÓN: SIMULADOR DE CUENTA BDV (COLOCADO DIRECTAMENTE DEBAJO DE LA CAMPAÑA INTEGRAL) */}
      <div className="relative group overflow-hidden rounded-3xl border-2 border-[#C8102E] bg-gradient-to-r from-[#002855] via-[#003882] to-[#001938] p-6 sm:p-8 text-white shadow-[0_0_40px_rgba(0,40,85,0.7)]">
        {/* Yellow accent top ribbon */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#FFD100]" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3.5 max-w-2xl">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8102E] text-white text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider shadow-md">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>Plataforma Educativa Oficial Banco de Venezuela</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-[#FFD100]/60 text-[#FFD100] text-[10px] sm:text-xs font-mono font-bold">
                <Sparkles className="w-3 h-3" />
                <span>Simulador de Cuenta BDVenlínea</span>
              </div>
            </div>

            {/* Logo and Title */}
            <div className="flex items-center gap-3.5">
              <div className="p-2 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                <BdvLogo variant="white" size="md" />
              </div>
              <div>
                <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                  Simulador de Cuenta BDVenlínea Digital
                </h3>
                <p className="text-xs text-[#FFD100] font-mono font-bold mt-0.5">
                  Parte interactiva del juego · Entrenamiento en vivo con dinero simulado
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              Aprende practicando con tu primera cuenta bancaria juvenil: consulta de saldos en Bolívares y Divisas, emisión de PagomóvilBDV interbancario instantáneo, generador de claves dinámicas en Ami Ven, compra/venta en Mesa de Cambio Oficial BCV y control seguro de tarjetas.
            </p>

            {/* Micro Feature Tags */}
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded-xl bg-black/40 border border-white/15 text-slate-200 flex items-center gap-1.5">
                <Smartphone className="w-3 h-3 text-[#FFD100]" />
                <span>PagomóvilBDV P2P</span>
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-black/40 border border-white/15 text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-[#34d399]" />
                <span>Ami Ven 6 Dígitos</span>
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-black/40 border border-white/15 text-slate-200 flex items-center gap-1.5">
                <RefreshCw className="w-3 h-3 text-[#00f3ff]" />
                <span>Mesa de Cambio BCV</span>
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-black/40 border border-white/15 text-slate-200 flex items-center gap-1.5">
                <CreditCard className="w-3 h-3 text-[#FFD100]" />
                <span>Tarjetas & Biopago</span>
              </span>
            </div>
          </div>

          {/* Action Button: Open Simulator */}
          <div className="w-full lg:w-auto shrink-0 flex flex-col gap-2">
            <button
              type="button"
              onClick={onOpenBankingSimulator}
              className="w-full lg:w-auto py-4 px-8 rounded-2xl bg-[#C8102E] hover:bg-[#b00d28] text-white font-black text-xs sm:text-sm font-mono uppercase tracking-widest shadow-[0_0_30px_rgba(200,16,46,0.6)] transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-95 border border-white/20"
            >
              <span>INGRESAR AL SIMULADOR DE CUENTA BDV</span>
              <ArrowRight className="w-4 h-4 stroke-[3] text-[#FFD100]" />
            </button>
            <span className="text-[10px] font-mono text-center text-slate-300">
              Podrás retornar a CifraFlow en cualquier momento con un clic
            </span>
          </div>
        </div>
      </div>

      {/* Grid of 5 Modules for Individual Module Play */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            O selecciona un módulo específico:
          </span>
          <span className="text-[10px] font-mono text-cyan-300">
            {CIFRAFLOW_CHALLENGES.length} RETOS TOTALES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((catKey) => {
            const catInfo = CATEGORY_INFO[catKey];
            const count = CIFRAFLOW_CHALLENGES.filter((c) => c.category === catKey).length;
            const hasAvatarBonus = avatar?.perkBonusCategory === catKey;

            return (
              <div
                key={catKey}
                onClick={() => onSelectCategoryAndStart(catKey)}
                className="group cursor-pointer rounded-3xl border border-slate-800 hover:border-cyan-500/60 bg-[#060e22]/90 hover:bg-[#091533] p-5 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between space-y-4 relative overflow-hidden shadow-lg hover:shadow-[0_0_20px_rgba(0,243,255,0.2)]"
              >
                {/* Neon highlight top */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all group-hover:h-1.5"
                  style={{ backgroundColor: catInfo.neonColor }}
                />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                      style={{
                        backgroundColor: `${catInfo.neonColor}15`,
                        borderColor: `${catInfo.neonColor}40`,
                      }}
                    >
                      {getCategoryIcon(catKey)}
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 block">
                        {count} Desafíos
                      </span>
                      {hasAvatarBonus && (
                        <span className="text-[9px] font-mono text-[#34d399] font-bold mt-1 block">
                          ★ BONUS PERK ACTIVO
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors">
                      {catInfo.label}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {catInfo.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold">
                  <span className="text-[11px] font-mono text-slate-400">
                    Adivinanzas & Trivias
                  </span>
                  <span
                    className="flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    style={{ color: catInfo.neonColor }}
                  >
                    <span>Entrenar</span>
                    <Play className="w-3 h-3 fill-current" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
