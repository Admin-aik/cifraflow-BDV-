import React, { useState, useEffect } from 'react';
import { PanoramicTeamBanner } from './PanoramicTeamBanner';
import { StudentProfile } from '../types/cifraflow';
import { speakWelcomePrompt } from '../utils/speech';
import {
  User,
  School,
  CreditCard,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { ExchangeRates } from '../types';

interface Fase0LoginProps {
  initialProfile: StudentProfile;
  rates: ExchangeRates;
  audioEnabled: boolean;
  onContinue: (profile: StudentProfile) => void;
}

export const Fase0Login: React.FC<Fase0LoginProps> = ({
  initialProfile,
  rates,
  audioEnabled,
  onContinue,
}) => {
  const [fullName, setFullName] = useState(initialProfile.fullName || '');
  const [idCard, setIdCard] = useState(initialProfile.idCard || '');
  const [institution, setInstitution] = useState(initialProfile.institution || '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (audioEnabled) {
      speakWelcomePrompt();
    }
  }, []);

  const handlePlayVoicePrompt = () => {
    speakWelcomePrompt();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Por favor ingresa el Nombre completo del estudiante.');
      return;
    }
    if (!idCard.trim()) {
      setError('Por favor ingresa la Cédula de Identidad (solo números).');
      return;
    }
    if (!institution.trim()) {
      setError('Por favor indica la Institución Educativa (Liceo, Colegio o Universidad).');
      return;
    }

    onContinue({
      fullName: fullName.trim(),
      idCard: idCard.trim(),
      institution: institution.trim(),
      selectedAvatarId: initialProfile.selectedAvatarId,
      registeredAt: new Date().toISOString(),
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-7 animate-in fade-in duration-500 pb-12">
      {/* 1. PORTADA PANORÁMICA EXACTA */}
      <PanoramicTeamBanner onPlayVoice={handlePlayVoicePrompt} />

      {/* 2. ENCABEZADO CENTRAL: LOGO + CIFRA FLOW FINANCIERO */}
      <div className="text-center space-y-3 pt-2">
        {/* Central Infinity Logo Tile */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-[#061026] border-2 border-cyan-400/60 shadow-[0_0_25px_rgba(0,243,255,0.4)] flex items-center justify-center p-2">
            <svg viewBox="0 0 100 60" className="w-10 h-6 drop-shadow-[0_0_8px_#00f3ff]" fill="none">
              <path
                d="M30 15 C 15 15, 8 20, 8 30 C 8 40, 15 45, 30 45 C 44 45, 48 35, 50 30 C 52 25, 56 15, 70 15 C 85 15, 92 20, 92 30 C 92 40, 85 45, 70 45 C 56 45, 52 35, 50 30 C 48 25, 44 15, 30 15 Z"
                stroke="url(#loginInfGrad)"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <circle cx="16" cy="30" r="3.5" fill="#00f3ff" />
              <circle cx="84" cy="30" r="3.5" fill="#ff007f" />
              <defs>
                <linearGradient id="loginInfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f3ff" />
                  <stop offset="50%" stopColor="#d946ef" />
                  <stop offset="100%" stopColor="#ff007f" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-mono tracking-tight uppercase flex items-center gap-2">
            <span className="text-[#00f3ff]">CIFRA</span>
            <span className="text-[#e879f9]">FLOW</span>
            <span className="text-[#fbbf24]">FINANCIERO</span>
          </h1>
        </div>

        {/* Subtítulo descriptivo con Emprendimiento resaltado */}
        <p className="max-w-3xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          Plataforma interactiva de simulación que integra Comprensión Lectora, Primera Cuenta Bancaria (BDV/Plaza/Tesoro),{' '}
          <span className="text-[#34d399] font-bold">Emprendimiento</span>, Bolsa de Valores de Caracas (BVC) y Ciberseguridad Real.
        </p>

        {/* Pill Tasa Oficial BCV */}
        <div className="pt-1 flex justify-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#031518] border border-[#059669] text-xs font-mono font-bold text-slate-200 shadow-[0_0_15px_rgba(5,150,105,0.2)]">
            <span className="text-[#34d399] font-black uppercase tracking-wider">TASA OFICIAL BCV:</span>
            <span className="text-white font-mono font-bold">
              Bs. {rates.usd.toFixed(2).replace('.', ',')} / USD
            </span>
            <span className="text-slate-400 text-[10px]">(Fecha Valor: 11/09/2026)</span>
          </div>
        </div>
      </div>

      {/* 3. FORMULARIO DE REGISTRO IDENTICO AL SCREENSHOT */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-rose-950/70 border border-[#ff007f] rounded-2xl text-xs text-rose-200 font-medium">
              {error}
            </div>
          )}

          {/* Campo 1: Nombre Completo */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-[#00f3ff]" />
              <span>1. NOMBRE COMPLETO DEL ESTUDIANTE:</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ej. Santiago Mendoza Paredes"
              className="w-full bg-[#0d1527] border border-slate-700/80 rounded-2xl px-5 py-4 text-sm text-slate-100 focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-all placeholder:text-slate-500 font-medium"
            />
          </div>

          {/* Campo 2: Cédula de Identidad */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <CreditCard className="w-3.5 h-3.5 text-[#00f3ff]" />
              <span>2. CÉDULA DE IDENTIDAD (SOLO NÚMEROS):</span>
            </label>
            <input
              type="text"
              value={idCard}
              onChange={(e) => setIdCard(e.target.value)}
              placeholder="Ej. 29876543"
              className="w-full bg-[#0d1527] border border-slate-700/80 rounded-2xl px-5 py-4 text-sm text-slate-100 focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-all placeholder:text-slate-500 font-mono"
            />
          </div>

          {/* Campo 3: Institución Educativa */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <School className="w-3.5 h-3.5 text-[#00f3ff]" />
              <span>3. INSTITUCIÓN EDUCATIVA (LICEO, COLEGIO O UNIVERSIDAD):</span>
            </label>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="Ej. Liceo Andrés Bello / Colegio San Ignacio / UCV"
              className="w-full bg-[#0d1527] border border-slate-700/80 rounded-2xl px-5 py-4 text-sm text-slate-100 focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-all placeholder:text-slate-500 font-medium"
            />
          </div>

          {/* Botón Principal Grande con Gradiente Neón */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#00f3ff] via-[#b829e3] via-[#ff6b2b] to-[#fbbf24] hover:opacity-95 text-slate-950 font-black text-xs sm:text-sm font-mono uppercase tracking-widest shadow-[0_0_35px_rgba(251,191,36,0.4)] transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-98"
            >
              <span>INGRESAR Y ELEGIR AVATAR ADOLESCENTE</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </form>
      </div>

      {/* 4. FOOTER STATUS BAR IDENTICO AL SCREENSHOT */}
      <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-2 text-slate-300">
          <ShieldCheck className="w-4 h-4 text-[#34d399]" />
          <span>Registro seguro con emisión de Certificado Digital de Competencias</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#00f3ff] font-bold">• HUD Inicializado en 0 pts</span>
          <span className="text-[#fbbf24] font-bold">• Sistema de Puntos Acumulativos</span>
        </div>
      </div>
    </div>
  );
};
