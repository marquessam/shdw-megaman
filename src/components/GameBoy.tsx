import React, { useState } from 'react';
import { Stats, GameMode, PartyMember } from '../types';
import { Settings2 } from 'lucide-react';
import { BOSSES } from '../data/bosses';

interface GameBoyProps {
  stats: Stats;
  currentMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  onAction: (action: GameMode, button: 'A' | 'B') => void;
  energy: number;
  bolts: number;
  battleMessage: string | null;
  currentBoss: typeof BOSSES[0];
  party: PartyMember[];
  selectedPartyMember: number;
}

interface Theme {
  name: string;
  body: string;
  screen: string;
  text: string;
  border: string;
  accent: string;
}

const THEMES: Theme[] = [
  {
    name: 'Classic',
    body: 'bg-gradient-to-r from-red-700 to-red-600',
    screen: 'bg-[#9BBC0F]',
    text: 'text-[#0F380F]',
    border: 'border-[#FFD700]',
    accent: 'bg-[#FFD700]'
  },
  {
    name: 'Modern',
    body: 'bg-gradient-to-r from-slate-800 to-slate-700',
    screen: 'bg-slate-200',
    text: 'text-slate-800',
    border: 'border-slate-400',
    accent: 'bg-slate-400'
  },
  {
    name: 'Retro',
    body: 'bg-gradient-to-r from-purple-800 to-purple-700',
    screen: 'bg-emerald-200',
    text: 'text-emerald-900',
    border: 'border-emerald-400',
    accent: 'bg-emerald-400'
  }
];

const MODE_MAP = {
  up: 'FEED',
  right: 'MISSION',
  down: 'BATTLE',
  left: 'TRAIN',
  center: 'SWITCH'
} as const;

const MODE_DESCRIPTIONS = {
  FEED: 'Use 1 bolt to restore 30 energy',
  TRAIN: 'A: Train strength (+2) | B: Train speed (+2)',
  BATTLE: 'Challenge a boss with your active member',
  MISSION: 'Spend 15 energy to earn 1-3 bolts',
  REST: 'Restore 20 energy by resting',
  SWITCH: 'Switch between party members'
} as const;

export const GameBoy: React.FC<GameBoyProps> = ({ 
  stats, 
  currentMode,
  onModeChange, 
  onAction, 
  energy,
  bolts,
  battleMessage,
  currentBoss,
  party,
  selectedPartyMember
}) => {
  const [showThemes, setShowThemes] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);

  const handleDirectionClick = (direction: keyof typeof MODE_MAP) => {
    onModeChange(MODE_MAP[direction]);
  };

  return (
    <div className="relative">
      {/* Theme Selector */}
      <div className="absolute -top-12 left-0 right-0 flex justify-between items-center">
        <button
          onClick={() => setShowThemes(!showThemes)}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors"
        >
          <Settings2 size={16} />
          <span className="text-sm">Theme</span>
        </button>
        {showThemes && (
          <div className="absolute top-8 left-0 bg-gray-800 rounded-lg p-2 z-10">
            {THEMES.map((theme) => (
              <button
                key={theme.name}
                onClick={() => {
                  setCurrentTheme(theme);
                  setShowThemes(false);
                }}
                className="block w-full text-left px-3 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded"
              >
                {theme.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Game Boy Body */}
      <div className={`w-[800px] h-[500px] ${currentTheme.body} rounded-3xl shadow-2xl relative overflow-hidden p-8`}>
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-black/20 via-white/20 to-black/20"></div>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="text-3xl font-bold text-white tracking-wider">MEGA BOY</div>
          <div className="text-sm text-white/60">™</div>
        </div>
        <div className="absolute bottom-8 right-12 w-32 h-24 flex flex-col gap-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-1.5 w-full bg-black/20 rounded-full" />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-[1fr_2fr_1fr] gap-8 h-full items-center pt-12">
          {/* D-Pad */}
          <div className="flex items-center justify-center">
            <div className="w-36 h-36 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-full bg-black rounded-md">
                <button
                  onClick={() => handleDirectionClick('up')}
                  className="absolute top-0 w-full h-12 bg-gray-800 rounded-t-md hover:bg-gray-700 flex items-center justify-center"
                />
                <button
                  onClick={() => handleDirectionClick('down')}
                  className="absolute bottom-0 w-full h-12 bg-gray-800 rounded-b-md hover:bg-gray-700 flex items-center justify-center"
                />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 w-full h-12 bg-black rounded-md">
                <button
                  onClick={() => handleDirectionClick('left')}
                  className="absolute left-0 w-12 h-full bg-gray-800 rounded-l-md hover:bg-gray-700 flex items-center justify-center"
                />
                <button
                  onClick={() => handleDirectionClick('right')}
                  className="absolute right-0 w-12 h-full bg-gray-800 rounded-r-md hover:bg-gray-700 flex items-center justify-center"
                />
              </div>
              <button
                onClick={() => handleDirectionClick('center')}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gray-900 rounded-full hover:bg-gray-800 flex items-center justify-center"
              />
            </div>
          </div>

          {/* Screen */}
          <div className={`${currentTheme.screen} rounded-xl ${currentTheme.border} border-4 overflow-hidden shadow-inner relative h-[350px]`}>
            <div className={`w-full px-6 py-3 ${currentTheme.accent} bg-opacity-30 flex justify-between items-center border-b border-black/10`}>
              <div className={`${currentTheme.text} text-base font-bold`}>
                ENERGY: {energy}
              </div>
              <div className={`${currentTheme.text} text-base font-bold`}>
                BOLTS: {bolts}
              </div>
            </div>

            <div className="p-6 flex flex-col items-center justify-center h-[calc(100%-3rem)]">
              <div className="w-24 h-24 mb-6 relative transition-transform duration-300 ease-in-out scale-125">
                <div className="w-full h-full bg-contain bg-no-repeat bg-center">
                  <img 
                    src="https://raw.githubusercontent.com/mmartinsoliv/Mega-Man/master/assets/megaman.png"
                    alt="Mega Man" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              
              <div className={`${currentTheme.text} text-2xl font-bold mb-4`}>
                {currentMode}
              </div>

              {party.length > 0 && (
                <div className={`${currentTheme.text} text-lg mb-3 text-center`}>
                  <div className="font-bold">
                    {party[selectedPartyMember]?.name} (Lv. {Math.floor(party[selectedPartyMember]?.level)})
                  </div>
                </div>
              )}
              
              <div className={`${currentTheme.text} text-lg mb-3`}>
                SPD: {stats.speed} STR: {stats.strength} DEF: {stats.defense}
              </div>

              {battleMessage && (
                <div className={`${currentTheme.text} text-sm mb-3 text-center max-w-[300px] whitespace-pre-line`}>
                  {battleMessage}
                </div>
              )}

              <div className={`${currentTheme.text} text-sm opacity-75 flex flex-col items-center gap-1`}>
                <div>{MODE_DESCRIPTIONS[currentMode]}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center">
            <div className="flex gap-8">
              <button
                onClick={() => onAction(currentMode, 'B')}
                className="w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-lg transform -rotate-12"
              >
                <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                  <span className="text-gray-400 font-bold text-xl">B</span>
                </div>
              </button>
              <button
                onClick={() => onAction(currentMode, 'A')}
                className="w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-lg transform -rotate-12"
              >
                <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                  <span className="text-gray-400 font-bold text-xl">A</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};