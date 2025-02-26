export interface Stats {
  health: number;
  energy: number;
  speed: number;
  strength: number;
  defense: number;
}

export interface Boss {
  id: number;
  name: string;
  requiredStats: Stats;
  message: string;
  defeated: boolean;
  hint: string;
  puzzlePiece: string;
}

export interface PartyMember extends Boss {
  currentStats: Stats;
  level: number;
}

export type GameMode = 'TRAIN' | 'FEED' | 'MISSION' | 'BATTLE' | 'REST' | 'SWITCH';
export type GameState = GameMode | 'idle';
export type TrainingType = 'SPEED' | 'STRENGTH';