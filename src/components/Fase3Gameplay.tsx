import React, { useState, useEffect } from 'react';
import { CifraChallenge, AvatarId, ChallengeOption } from '../types/cifraflow';
import { CATEGORY_INFO, TEEN_AVATARS } from '../data/cifraflowChallenges';
import { speechEngine } from '../utils/speech';
import { CifraflowLogo } from './CifraflowLogo';
import {
  HelpCircle,
  Lightbulb,
  ShieldAlert,
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Landmark,
  FileQuestion,
  Lock,
} from 'lucide-react';

interface Fase3GameplayProps {
  challenge: CifraChallenge;
  currentIndex: number;
  totalChallenges: number;
  selectedAvatarId: AvatarId | null;
  audioEnabled: boolean;
  textSizeLevel: 'sm' | 'base' | 'lg' | 'xl';
  onCorrectAnswer: (stats: {
    basePoints: number;
    bonusPoints: number;
    penalties: number;
    failedAttempts: number;
  }) => void;
  onWrongAnswerPenalty: (penalty: number) => void;
  onProceedToTransition: () => void;
  onLogoClick?: () => void;
}

export const Fase3Gameplay: React.FC<Fase3GameplayProps> = ({
  challenge,
  currentIndex,
  totalChallenges,
  selectedAvatarId,
  audioEnabled,
  textSizeLevel,
  onCorrectAnswer,
  onWrongAnswerPenalty,
  onProceedToTransition,
  onLogoClick,
}) => {
  const [disabledOptionIds, setDisabledOptionIds] = useState<string[]>([]);
  const [isResolved, setIsResolved] = useState(false);
  const [selectedCorrectId, setSelectedCorrectId] = useState<string | null>(null);
  const [failedCount, setFailedCount] = useState(0);
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);

  const avatar = TEEN_AVATARS.find((a) => a.id === selectedAvatarId);
  const catInfo = CATEGORY_INFO[challenge.category];

  // Reset state when challenge changes
  useEffect(() => {
    setDisabledOptionIds([]);
    setIsResolved(false);
    setSelectedCorrectId(null);
    setFailedCount(0);
    setErrorFeedback(null);

    // Auto speak riddle if audio is enabled
    if (audioEnabled) {
      const speechText = `${challenge.type}. ${challenge.title}. ${challenge.clueOrRiddle}`;
      speechEngine.speak(speechText);
    }
  }, [challenge.id]);

  const handleSpeakQuestion = () => {
    const speechText = `${challenge.type}. ${challenge.title}. ${challenge.clueOrRiddle}`;
    speechEngine.speak(speechText);
  };

  const handleSelectOption = (option: ChallengeOption) => {
    if (isResolved || disabledOptionIds.includes(option.id)) {
      return;
    }

    if (option.id === challenge.correctOptionId) {
      // SUCCESS!
      setIsResolved(true);
      setSelectedCorrectId(option.id);
      setErrorFeedback(null);

      // Check for avatar perk bonus
      const isPerkEligible = avatar && avatar.perkBonusCategory === challenge.category;
      const bonus = isPerkEligible ? avatar.perkPointsBonus : 0;
      const penalties = failedCount * challenge.penaltyPoints;

      onCorrectAnswer({
        basePoints: challenge.basePoints,
        bonusPoints: bonus,
        penalties,
        failedAttempts: failedCount,
      });

      if (audioEnabled) {
        speechEngine.speak('¡Excelente! Respuesta correcta. Has superado este reto financiero.');
      }
    } else {
      // WRONG! STRICT REQUIREMENT:
      // 1. Deduct penalty immediately from right HUD panel.
      // 2. Mark this option as disabled/failed with red neon.
      // 3. DO NOT REVEAL THE CORRECT ANSWER (never highlight green).
      // 4. Student must continue trying until they hit the correct one.
      const newDisabled = [...disabledOptionIds, option.id];
      setDisabledOptionIds(newDisabled);
      const newFailedCount = failedCount + 1;
      setFailedCount(newFailedCount);

      // Trigger negative score in HUD
      onWrongAnswerPenalty(challenge.penaltyPoints);

      setErrorFeedback(
        `Opción incorrecta (-${challenge.penaltyPoints} pts). La respuesta correcta permanece confidencial y encriptada. Analiza las pistas y continúa intentando.`
      );

      if (audioEnabled) {
        speechEngine.speak('Esa no es la opción correcta, pero no te preocupes. Revisa la pista con calma e inténtalo de nuevo.');
      }
    }
  };

  const textSizeClass = {
    sm: 'text-xs',
    base: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  }[textSizeLevel];

  const riddleTextSizeClass = {
    sm: 'text-sm sm:text-base',
    base: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl',
  }[textSizeLevel];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* CifraFlow Logo & Quick Navigation Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#061026]/80 border border-cyan-500/30 backdrop-blur-sm">
        <CifraflowLogo
          size="sm"
          canGoBack={true}
          onClick={onLogoClick}
          backHintText="← Volver a Menú de Elección"
          showBackHint={true}
        />

        <div className="text-right">
          <span className="text-[10px] font-mono text-slate-400 block">Reto Activo CifraFlow BDV</span>
          <span className="text-xs font-mono font-black text-cyan-300">
            Reto {currentIndex + 1} de {totalChallenges}
          </span>
        </div>
      </div>

      {/* Challenge Type & Institutional Badge Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-500/20 pb-3">
        <div className="flex items-center gap-2.5">
          <span
            className="px-3 py-1 rounded-full text-xs font-mono font-black uppercase tracking-wider border flex items-center gap-1.5"
            style={{
              backgroundColor: `${catInfo.neonColor}15`,
              borderColor: `${catInfo.neonColor}50`,
              color: catInfo.neonColor,
            }}
          >
            {challenge.type === 'ADIVINANZA' && <Lightbulb className="w-3.5 h-3.5" />}
            {challenge.type === 'TRIVIA' && <HelpCircle className="w-3.5 h-3.5" />}
            {challenge.type === 'ACERTIJO' && <ShieldAlert className="w-3.5 h-3.5" />}
            <span>{challenge.type} BDV</span>
          </span>

          <span className="text-[11px] font-mono text-slate-400">
            Módulo: <strong className="text-white">{catInfo.label}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] bg-[#C8102E]/80 border border-[#FFD100]/60 text-white font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
            <Landmark className="w-3 h-3 text-[#FFD100]" />
            <span>{challenge.bdvFeatureTag}</span>
          </span>

          <span className="text-xs font-mono font-bold text-cyan-300">
            Reto {currentIndex + 1} de {totalChallenges}
          </span>
        </div>
      </div>

      {/* Main Challenge Card */}
      <div className="relative rounded-3xl border-2 border-cyan-500/40 bg-[#060e22]/95 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(0,243,255,0.15)] space-y-6">
        {/* Title and Speaker Action */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#00f3ff] font-bold">
              DESAFÍO EDUCATIVO CIFRAFLOW
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {challenge.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={handleSpeakQuestion}
            title="Escuchar locución del reto en español latino"
            className="p-3 rounded-2xl bg-slate-900 border border-cyan-500/40 text-[#00f3ff] hover:bg-cyan-950 transition-all flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(0,243,255,0.2)] active:scale-95 cursor-pointer"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Clue / Riddle Display in Glowing Glass Box */}
        <div className="p-5 rounded-2xl bg-[#030612]/90 border border-cyan-500/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#00f3ff] to-[#ff007f]" />
          <p
            className={`${riddleTextSizeClass} text-slate-100 font-medium leading-relaxed italic`}
          >
            {challenge.clueOrRiddle}
          </p>

          {challenge.contextInfo && (
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD100] shrink-0" />
              <span>{challenge.contextInfo}</span>
            </div>
          )}
        </div>

        {/* Dynamic Error Feedback Alert (Never reveals the answer) */}
        {errorFeedback && !isResolved && (
          <div className="p-3.5 rounded-2xl bg-rose-950/70 border-2 border-[#ff007f] text-xs text-rose-100 flex items-start gap-2.5 animate-in fade-in duration-200 shadow-[0_0_15px_rgba(255,0,127,0.3)]">
            <XCircle className="w-5 h-5 text-[#ff007f] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-[#ff007f] uppercase font-mono tracking-wider">
                Respuesta Incorrecta
              </span>
              <span>{errorFeedback}</span>
            </div>
          </div>
        )}

        {/* Options Grid */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
            Selecciona una opción para validar:
          </span>

          <div className="grid grid-cols-1 gap-3">
            {challenge.options.map((opt, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              const isOptionDisabled = disabledOptionIds.includes(opt.id);
              const isThisCorrect = isResolved && opt.id === selectedCorrectId;

              // STRICT RULE:
              // - If disabled: red strike / red neon border, unclickable.
              // - If resolved and correct: emerald green neon `#34d399`.
              // - If not resolved: standard cyber button. NEVER show green unless resolved!
              let optionStyle =
                'bg-slate-900/70 border-slate-800 text-slate-200 hover:border-cyan-500 hover:bg-slate-800/80 cursor-pointer';

              if (isOptionDisabled) {
                optionStyle =
                  'bg-rose-950/40 border-[#ff007f] text-rose-300 opacity-60 line-through cursor-not-allowed shadow-[0_0_10px_rgba(255,0,127,0.2)]';
              } else if (isThisCorrect) {
                optionStyle =
                  'bg-emerald-950/70 border-2 border-[#34d399] text-white shadow-[0_0_25px_rgba(52,211,153,0.5)] cursor-default';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isOptionDisabled || isResolved}
                  onClick={() => handleSelectOption(opt)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-4 active:scale-[0.99] ${optionStyle}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-black text-xs shrink-0 border ${
                        isOptionDisabled
                          ? 'bg-rose-900/50 border-rose-500 text-rose-300'
                          : isThisCorrect
                          ? 'bg-[#34d399]/20 border-[#34d399] text-[#34d399]'
                          : 'bg-slate-800 border-slate-700 text-cyan-300'
                      }`}
                    >
                      {letter}
                    </span>

                    <span className={`${textSizeClass} font-medium leading-snug`}>
                      {opt.text}
                    </span>
                  </div>

                  {/* Status icon */}
                  <div className="shrink-0">
                    {isOptionDisabled && <XCircle className="w-5 h-5 text-[#ff007f]" />}
                    {isThisCorrect && <CheckCircle2 className="w-6 h-6 text-[#34d399]" />}
                    {!isOptionDisabled && !isThisCorrect && !isResolved && (
                      <Lock className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Didactic Solution Card (Appears strictly AFTER successfully resolving) */}
        {isResolved && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-cyan-950/60 border-2 border-[#34d399] space-y-3 animate-in zoom-in-95 duration-300 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-black text-[#34d399] uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>¡RESPUESTA VALIDADA EXITOSAMENTE!</span>
              </div>
              <span className="text-xs font-mono font-black text-[#FFD100]">
                +{challenge.basePoints} pts
              </span>
            </div>

            <p className={`${textSizeClass} text-slate-200 leading-relaxed font-normal`}>
              {challenge.didacticExplanation}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={onProceedToTransition}
                className="py-3.5 px-7 rounded-xl bg-gradient-to-r from-[#00f3ff] to-[#34d399] hover:from-[#00f3ff] hover:to-[#ff007f] text-slate-950 font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(0,243,255,0.5)] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>CONTINUAR AL SIGUIENTE RETO</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
