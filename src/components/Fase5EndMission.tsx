import React from 'react';
import { StudentProfile, ChallengeResult } from '../types/cifraflow';
import { TEEN_AVATARS, CIFRAFLOW_CHALLENGES } from '../data/cifraflowChallenges';
import { CifraflowLogo } from './CifraflowLogo';
import {
  Trophy,
  Award,
  Printer,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Landmark,
  ShieldCheck,
  Zap,
  Sparkles,
  School,
  IdCard,
  User,
} from 'lucide-react';

interface Fase5EndMissionProps {
  student: StudentProfile;
  totalScore: number;
  results: Record<string, ChallengeResult>;
  onRestart: () => void;
  onLogoClick?: () => void;
}

export const Fase5EndMission: React.FC<Fase5EndMissionProps> = ({
  student,
  totalScore,
  results,
  onRestart,
  onLogoClick,
}) => {
  const avatar = TEEN_AVATARS.find((a) => a.id === student.selectedAvatarId);
  const completedCount = (Object.values(results) as ChallengeResult[]).filter((r) => r?.completed).length;
  const isNegative = totalScore < 0;

  const handlePrint = () => {
    window.print();
  };

  // Generate deterministic serial based on student info
  const serialCode = `BDV-CF-${(student.idCard || '0000').replace(/\D/g, '')}-${Math.abs(
    totalScore
  ).toString().padStart(4, '0')}`;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
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
          <span className="text-[10px] font-mono text-slate-400 block">Evaluación y Certificación Final</span>
          <span className="text-xs font-mono font-black text-[#34d399]">Misión Concluida</span>
        </div>
      </div>

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-[#34d399]/50 text-xs font-mono font-bold tracking-widest text-[#34d399] uppercase shadow-[0_0_15px_rgba(52,211,153,0.3)]">
          <Award className="w-3.5 h-3.5" />
          <span>FASE 5 — EVALUACIÓN FINAL DE LA MISIÓN EDUCATIVA</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          ¡Misión Cumplida en <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff007f]">CifraFlow Financiero</span>!
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Has completado con éxito la simulación de Banco de Venezuela (BDV) integrando contratos bancarios, Fintech, Bolsa BVC y ciberdefensa.
        </p>
      </div>

      {/* Main Scorecard Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Puntuación Final */}
        <div
          className={`p-6 rounded-3xl border-2 backdrop-blur-xl flex flex-col items-center justify-center text-center ${
            isNegative
              ? 'bg-rose-950/40 border-[#ff007f] shadow-[0_0_25px_rgba(255,0,127,0.3)]'
              : 'bg-[#060e22]/90 border-cyan-500/50 shadow-[0_0_25px_rgba(0,243,255,0.2)]'
          }`}
        >
          <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
            Puntuación Final Acumulada
          </span>
          <div
            className={`text-4xl sm:text-5xl font-black font-mono my-2 ${
              isNegative ? 'text-[#ff007f]' : 'text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#34d399]'
            }`}
          >
            {totalScore > 0 ? `+${totalScore}` : totalScore}
            <span className="text-xs font-sans text-slate-400 ml-1">pts</span>
          </div>
          <span className="text-[11px] font-mono text-slate-300">
            {isNegative ? 'Completado con penalizaciones acumuladas' : 'Rendimiento Financiero Destacado'}
          </span>
        </div>

        {/* Card 2: Desafíos Resueltos */}
        <div className="p-6 rounded-3xl border-2 border-slate-800 bg-[#060e22]/90 backdrop-blur-xl flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
            Desafíos Resueltos
          </span>
          <div className="text-4xl sm:text-5xl font-black font-mono my-2 text-white">
            {completedCount} <span className="text-slate-500 text-2xl">/ {CIFRAFLOW_CHALLENGES.length}</span>
          </div>
          <span className="text-[11px] font-mono text-[#34d399]">
            Adivinanzas, Trivias & Acertijos
          </span>
        </div>

        {/* Card 3: Avatar Cadete */}
        <div className="p-6 rounded-3xl border-2 border-slate-800 bg-[#060e22]/90 backdrop-blur-xl flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
            Cadete Acompañante
          </span>
          {avatar?.imageUrl && (
            <div
              className="w-16 h-20 rounded-2xl border-2 overflow-hidden my-2 shadow-lg"
              style={{ borderColor: avatar.neonColor }}
            >
              <img
                src={avatar.imageUrl}
                alt={avatar.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}
          <div
            className="text-xl sm:text-2xl font-black"
            style={{ color: avatar?.neonColor || '#00f3ff' }}
          >
            {avatar?.name || 'Estudiante'}
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {avatar?.role || 'Operador Financiero'}
          </span>
        </div>
      </div>

      {/* CERTIFICADO DIGITAL OFICIAL BDV & CIFRAFLOW */}
      <div className="relative rounded-3xl border-4 border-[#FFD100]/80 bg-gradient-to-b from-[#061026] via-[#030712] to-[#0a1b38] p-6 sm:p-10 shadow-[0_0_60px_rgba(255,209,0,0.25)] text-white space-y-6 overflow-hidden">
        {/* Security Watermark SVG */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <Landmark className="w-96 h-96" />
        </div>

        {/* Certificate Header with BDV and CifraFlow Logos */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#FFD100]/40 pb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#002855] border-2 border-[#FFD100] flex items-center justify-center font-black text-white text-base shadow-lg">
              BDV
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#FFD100] block">
                BANCO DE VENEZUELA
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                Programa de Educación e Inclusión Financiera Digital
              </span>
            </div>
          </div>

          <div className="text-right font-mono">
            <span className="text-[10px] text-cyan-300 block font-bold">
              CERTIFICADO DIGITAL BDV-EDTECH
            </span>
            <span className="text-xs text-[#34d399] font-bold tracking-wider">
              {serialCode}
            </span>
          </div>
        </div>

        {/* Certificate Body */}
        <div className="text-center space-y-4 py-4 relative z-10">
          <span className="text-xs uppercase font-mono tracking-widest text-slate-400">
            Por cuanto ha demostrado suficiencia académica y pericia operativa en la simulación:
          </span>

          <h3 className="text-2xl sm:text-4xl font-black text-white tracking-wider uppercase underline decoration-[#FFD100] decoration-2 underline-offset-8">
            {student.fullName || 'Estudiante CifraFlow'}
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-300 pt-2">
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <IdCard className="w-3.5 h-3.5 text-[#FFD100]" />
              <span>Cédula: <strong>{student.idCard || 'V-00.000.000'}</strong></span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <School className="w-3.5 h-3.5 text-[#00f3ff]" />
              <span>Institución: <strong>{student.institution || 'Institución Educativa'}</strong></span>
            </div>
          </div>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
            Se otorga la presente acreditación por haber superado los retos pedagógicos en{' '}
            <strong className="text-white">Comprensión Lectora de Contratos Bancarios</strong>,{' '}
            <strong className="text-[#00f3ff]">Banca Fintech Banco de Venezuela</strong> (PagomóvilBDV, BiopagoBDV, Mesa de Cambio),{' '}
            <strong className="text-[#34d399]">Emprendimiento 50/30/20</strong>,{' '}
            <strong className="text-[#fbbf24]">Bolsa de Valores de Caracas (BVC)</strong> y{' '}
            <strong className="text-[#ff007f]">Ciberseguridad Real (Ami Ven y Anti-Phishing)</strong>.
          </p>
        </div>

        {/* Signatures & Seal */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-800 text-center relative z-10">
          <div className="space-y-1">
            <div className="h-10 border-b border-slate-700 mx-auto w-3/4 flex items-end justify-center pb-1">
              <span className="font-serif italic text-xs text-cyan-300">CifraFlow Core Engine</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">
              Coordinación Tecnológica EdTech
            </span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-[#FFD100] bg-[#FFD100]/10 flex flex-col items-center justify-center text-[#FFD100] shadow-[0_0_20px_rgba(255,209,0,0.3)]">
              <ShieldCheck className="w-7 h-7" />
              <span className="text-[8px] font-mono font-black mt-0.5">VALIDADO</span>
            </div>
            <span className="text-[9px] font-mono text-[#FFD100] mt-1">SELLO DIGITAL BDV</span>
          </div>

          <div className="space-y-1">
            <div className="h-10 border-b border-slate-700 mx-auto w-3/4 flex items-end justify-center pb-1">
              <span className="font-serif italic text-xs text-[#FFD100]">Banco de Venezuela BDV</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">
              Gerencia de Educación Financiera
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <button
          type="button"
          onClick={handlePrint}
          className="py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg cursor-pointer"
        >
          <Printer className="w-4 h-4 text-cyan-300" />
          <span>IMPRIMIR O GUARDAR CERTIFICADO (PDF)</span>
        </button>

        <button
          type="button"
          onClick={onRestart}
          className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#00f3ff] via-[#0088ff] to-[#ff007f] text-slate-950 font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,243,255,0.5)] cursor-pointer active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>REINICIAR MISIÓN EDUCATIVA</span>
        </button>
      </div>
    </div>
  );
};
