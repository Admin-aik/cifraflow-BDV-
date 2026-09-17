export type CifraPhase =
  | 'FASE_0_LOGIN'
  | 'FASE_1_AVATARS'
  | 'FASE_2_MODULES'
  | 'FASE_3_GAMEPLAY'
  | 'FASE_4_TRANSITION'
  | 'FASE_5_END_MISSION';

export type AvatarId = 'jorge' | 'ircar' | 'ivan' | 'carlos';

export interface TeenAvatar {
  id: AvatarId;
  name: string;
  role: string;
  roleSubtitle?: string;
  imageUrl?: string;
  colorName: string;
  neonColor: string; // e.g. '#00f3ff'
  glowClass: string;
  appearance: string;
  perk: string;
  perkBonusCategory: ChallengeCategory;
  perkPointsBonus: number;
  quote: string;
  badgeLabel: string;
  stats: {
    fintech: number;
    security: number;
    contracts: number;
    trading: number;
  };
}

export type ChallengeCategory =
  | 'LECTURA_CONTRATOS'
  | 'BANCA_FINTECH_BDV'
  | 'EMPRENDIMIENTO'
  | 'BOLSA_BVC'
  | 'CIBERSEGURIDAD';

export type ChallengeType = 'ADIVINANZA' | 'TRIVIA' | 'ACERTIJO';

export interface ChallengeOption {
  id: string;
  text: string;
}

export interface CifraChallenge {
  id: string;
  type: ChallengeType;
  category: ChallengeCategory;
  title: string;
  clueOrRiddle: string;
  contextInfo?: string;
  options: ChallengeOption[];
  correctOptionId: string;
  basePoints: number;
  penaltyPoints: number; // e.g. 25 or 50
  didacticExplanation: string;
  bdvFeatureTag: string;
}

export interface StudentProfile {
  fullName: string;
  idCard: string;
  institution: string;
  selectedAvatarId: AvatarId | null;
  registeredAt: string;
}

export interface ChallengeResult {
  challengeId: string;
  failedAttempts: number;
  pointsEarned: number;
  completed: boolean;
}

export interface GameState {
  currentPhase: CifraPhase;
  phaseHistory: CifraPhase[];
  student: StudentProfile;
  currentChallengeIndex: number;
  activeFilterCategory: ChallengeCategory | 'ALL';
  results: Record<string, ChallengeResult>;
  totalScore: number;
  streak: number;
  audioEnabled: boolean;
  textSizeLevel: 'sm' | 'base' | 'lg' | 'xl'; // A- (90%), A (100%), A+ (115%), A++ (130%)
  lastChallengePoints: {
    base: number;
    bonus: number;
    penalties: number;
    net: number;
  };
}
