import React, { useState, useEffect } from 'react';
import {
  CifraPhase,
  StudentProfile,
  ChallengeCategory,
  AvatarId,
  ChallengeResult,
  CifraChallenge,
} from '../types/cifraflow';
import { CIFRAFLOW_CHALLENGES } from '../data/cifraflowChallenges';
import { ExchangeRates } from '../types';
import { CifraflowHeader } from './CifraflowHeader';
import { RightHudPanel } from './RightHudPanel';
import { Fase0Login } from './Fase0Login';
import { Fase1Avatars } from './Fase1Avatars';
import { Fase2Modules } from './Fase2Modules';
import { Fase3Gameplay } from './Fase3Gameplay';
import { Fase4Transition } from './Fase4Transition';
import { Fase5EndMission } from './Fase5EndMission';
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';

interface CifraflowGameAppProps {
  rates: ExchangeRates;
  onRefreshRates: () => void;
  onExitToBanking?: () => void;
  initialPhase?: CifraPhase;
}

export const CifraflowGameApp: React.FC<CifraflowGameAppProps> = ({
  rates,
  onRefreshRates,
  onExitToBanking,
  initialPhase = 'FASE_0_LOGIN',
}) => {
  // Phase and Navigation History
  const [currentPhase, setCurrentPhase] = useState<CifraPhase>(initialPhase);
  const [phaseHistory, setPhaseHistory] = useState<CifraPhase[]>([]);

  // Listen to external phase changes (e.g. returning to game menu from banking simulator)
  useEffect(() => {
    if (initialPhase) {
      setCurrentPhase(initialPhase);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [initialPhase]);

  // Student Profile
  const [student, setStudent] = useState<StudentProfile>({
    fullName: initialPhase === 'FASE_2_MODULES' ? 'Cadete CifraFlow BDV' : '',
    idCard: initialPhase === 'FASE_2_MODULES' ? 'V-28.541.902' : '',
    institution: initialPhase === 'FASE_2_MODULES' ? 'Educación Financiera Juvenil BDV' : '',
    selectedAvatarId: 'carlos',
    registeredAt: new Date().toISOString(),
  });

  // Category and Challenge filtering
  const [activeCategory, setActiveCategory] = useState<ChallengeCategory | 'ALL'>('ALL');
  const [challengeQueue, setChallengeQueue] = useState<CifraChallenge[]>(CIFRAFLOW_CHALLENGES);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);

  // Score & Telemetry (Allows negative values strictly)
  const [totalScore, setTotalScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [results, setResults] = useState<Record<string, ChallengeResult>>({});
  const [lastPointsChange, setLastPointsChange] = useState<{
    base: number;
    bonus: number;
    penalties: number;
    net: number;
  }>({
    base: 0,
    bonus: 0,
    penalties: 0,
    net: 0,
  });

  // Accessibility & Audio Controls
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [textSizeLevel, setTextSizeLevel] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');

  // Navigation: Go to next phase, recording history
  const navigateToPhase = (nextPhase: CifraPhase) => {
    setPhaseHistory((prev) => [...prev, currentPhase]);
    setCurrentPhase(nextPhase);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Logo Click Sequential Backward Navigation:
  // Retos/Evaluación (Fase 3, 4, 5) -> 1. Menú de Elección (Fase 2)
  // Menú de Elección (Fase 2) -> 2. Selección de Avatares (Fase 1)
  // Selección de Avatares (Fase 1) -> 3. Portada de Logeo (Fase 0)
  const handleLogoClick = () => {
    if (
      currentPhase === 'FASE_3_GAMEPLAY' ||
      currentPhase === 'FASE_4_TRANSITION' ||
      currentPhase === 'FASE_5_END_MISSION'
    ) {
      setCurrentPhase('FASE_2_MODULES');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentPhase === 'FASE_2_MODULES') {
      setCurrentPhase('FASE_1_AVATARS');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentPhase === 'FASE_1_AVATARS') {
      setCurrentPhase('FASE_0_LOGIN');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Phase 0 -> Phase 1
  const handleProfileComplete = (profile: StudentProfile) => {
    setStudent(profile);
    navigateToPhase('FASE_1_AVATARS');
  };

  // Phase 1 -> Phase 2
  const handleAvatarSelect = (avatarId: AvatarId) => {
    setStudent((prev) => ({ ...prev, selectedAvatarId: avatarId }));
  };

  const handleConfirmAvatars = () => {
    navigateToPhase('FASE_2_MODULES');
  };

  // Phase 2 -> Phase 3
  const handleStartCategory = (category: ChallengeCategory | 'ALL') => {
    setActiveCategory(category);
    let queue = CIFRAFLOW_CHALLENGES;
    if (category !== 'ALL') {
      queue = CIFRAFLOW_CHALLENGES.filter((c) => c.category === category);
    }
    setChallengeQueue(queue);
    setCurrentChallengeIndex(0);
    navigateToPhase('FASE_3_GAMEPLAY');
  };

  // Phase 3: Wrong Answer Penalty (Allows score to go negative)
  const handleWrongAnswerPenalty = (penalty: number) => {
    setTotalScore((prev) => prev - penalty);
    setStreak(0);
  };

  // Phase 3: Correct Answer
  const handleCorrectAnswer = (stats: {
    basePoints: number;
    bonusPoints: number;
    penalties: number;
    failedAttempts: number;
  }) => {
    const net = stats.basePoints + stats.bonusPoints - stats.penalties;
    setTotalScore((prev) => prev + stats.basePoints + stats.bonusPoints);
    setStreak((prev) => prev + 1);

    setLastPointsChange({
      base: stats.basePoints,
      bonus: stats.bonusPoints,
      penalties: stats.penalties,
      net,
    });

    const activeCh = challengeQueue[currentChallengeIndex];
    if (activeCh) {
      setResults((prev) => ({
        ...prev,
        [activeCh.id]: {
          challengeId: activeCh.id,
          failedAttempts: stats.failedAttempts,
          pointsEarned: net,
          completed: true,
        },
      }));
    }
  };

  // Phase 3 -> Phase 4 Transition
  const handleProceedToTransition = () => {
    navigateToPhase('FASE_4_TRANSITION');
  };

  // Phase 4 -> Next Challenge or Phase 5 End Mission
  const handleNextChallenge = () => {
    if (currentChallengeIndex + 1 < challengeQueue.length) {
      setCurrentChallengeIndex((prev) => prev + 1);
      navigateToPhase('FASE_3_GAMEPLAY');
    } else {
      navigateToPhase('FASE_5_END_MISSION');
    }
  };

  // Phase 5 -> Restart
  const handleRestart = () => {
    setTotalScore(0);
    setStreak(0);
    setResults({});
    setCurrentChallengeIndex(0);
    setPhaseHistory([]);
    setCurrentPhase('FASE_0_LOGIN');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentChallenge = challengeQueue[currentChallengeIndex] || CIFRAFLOW_CHALLENGES[0];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-[#00f3ff] selection:text-black">
      {/* Top Cybernetic CifraFlow Header */}
      <CifraflowHeader
        currentPhase={currentPhase}
        canGoBack={currentPhase !== 'FASE_0_LOGIN'}
        onGoBack={handleLogoClick}
        rates={rates}
        onRefreshRates={onRefreshRates}
        audioEnabled={audioEnabled}
        onToggleAudio={() => setAudioEnabled(!audioEnabled)}
        textSizeLevel={textSizeLevel}
        onChangeTextSize={setTextSizeLevel}
      />

      {/* Main Gameplay Screen Body with Right HUD Panel */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6 flex flex-col lg:flex-row items-start gap-6">
        {/* Active Phase Content Area */}
        <div className="flex-1 w-full min-w-0">
          {currentPhase === 'FASE_0_LOGIN' && (
            <Fase0Login
              initialProfile={student}
              rates={rates}
              audioEnabled={audioEnabled}
              onContinue={handleProfileComplete}
            />
          )}

          {currentPhase === 'FASE_1_AVATARS' && (
            <Fase1Avatars
              selectedAvatarId={student.selectedAvatarId}
              onSelectAvatar={handleAvatarSelect}
              onContinue={handleConfirmAvatars}
              onLogoClick={handleLogoClick}
            />
          )}

          {currentPhase === 'FASE_2_MODULES' && (
            <Fase2Modules
              selectedAvatarId={student.selectedAvatarId}
              onSelectCategoryAndStart={handleStartCategory}
              onOpenBankingSimulator={onExitToBanking}
              onLogoClick={handleLogoClick}
            />
          )}

          {currentPhase === 'FASE_3_GAMEPLAY' && (
            <Fase3Gameplay
              challenge={currentChallenge}
              currentIndex={currentChallengeIndex}
              totalChallenges={challengeQueue.length}
              selectedAvatarId={student.selectedAvatarId}
              audioEnabled={audioEnabled}
              textSizeLevel={textSizeLevel}
              onCorrectAnswer={handleCorrectAnswer}
              onWrongAnswerPenalty={handleWrongAnswerPenalty}
              onProceedToTransition={handleProceedToTransition}
              onLogoClick={handleLogoClick}
            />
          )}

          {currentPhase === 'FASE_4_TRANSITION' && (
            <Fase4Transition
              lastPoints={lastPointsChange}
              totalScore={totalScore}
              currentIndex={currentChallengeIndex}
              totalChallenges={challengeQueue.length}
              selectedAvatarId={student.selectedAvatarId}
              audioEnabled={audioEnabled}
              onNextChallenge={handleNextChallenge}
              onLogoClick={handleLogoClick}
            />
          )}

          {currentPhase === 'FASE_5_END_MISSION' && (
            <Fase5EndMission
              student={student}
              totalScore={totalScore}
              results={results}
              onRestart={handleRestart}
              onLogoClick={handleLogoClick}
            />
          )}
        </div>

        {/* Persistent Right HUD Panel (Always Visible, Tracks Telemetry & Negative Scores) */}
        <div className="w-full lg:w-auto shrink-0 lg:sticky lg:top-20">
          <RightHudPanel
            totalScore={totalScore}
            streak={streak}
            selectedAvatarId={student.selectedAvatarId}
            currentChallengeIndex={currentChallengeIndex}
            totalChallenges={challengeQueue.length}
            lastPointsChange={lastPointsChange}
            onOpenBankingSimulator={onExitToBanking}
          />
        </div>
      </main>

      {/* Cybernetic Footer */}
      <footer className="border-t border-cyan-500/20 bg-[#02050f] py-6 px-4 text-center text-xs text-slate-500 space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400 font-mono text-[11px]">
          <span>BANCO DE VENEZUELA S.A. BANCO UNIVERSAL</span>
          <span>•</span>
          <span>CIFRAFLOW FINANCIERO EDTECH</span>
          <span>•</span>
          <span>BOLSA DE VALORES DE CARACAS</span>
          <span>•</span>
          <span>SUDEBAN RIF: G-20009997-6</span>
        </div>
        <p className="text-[10px] text-slate-600 max-w-2xl mx-auto">
          CifraFlow Financiero es un simulador educativo interactivo. Las marcas, servicios (PagomóvilBDV, Ami Ven, BiopagoBDV) y referencias son propiedad de Banco de Venezuela.
        </p>
      </footer>
    </div>
  );
};
