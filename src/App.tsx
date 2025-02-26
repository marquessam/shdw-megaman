import React, { useState } from 'react';
import { Stats, GameState, GameMode, PartyMember, TrainingType } from './types';
import { GameBoy } from './components/GameBoy';
import { BOSSES } from './data/bosses';

function App() {
  const initialStats: Stats = {
    health: 100,
    energy: 100,
    speed: 10,
    strength: 10,
    defense: 10
  };

  const megaMan: PartyMember = {
    id: 0,
    name: "Mega Man",
    requiredStats: initialStats,
    currentStats: initialStats,
    message: "",
    defeated: false,
    hint: "",
    puzzlePiece: "",
    level: 1
  };

  const [stats, setStats] = useState<Stats>(initialStats);
  const [currentMode, setCurrentMode] = useState<GameMode>('TRAIN');
  const [energy, setEnergy] = useState(100);
  const [bolts, setBolts] = useState(5);
  const [currentBossIndex, setCurrentBossIndex] = useState(0);
  const [battleMessage, setBattleMessage] = useState<string | null>(null);
  const [party, setParty] = useState<PartyMember[]>([megaMan]);
  const [selectedPartyMember, setSelectedPartyMember] = useState<number>(0);

  const addToParty = (boss: typeof BOSSES[0]) => {
    const newMember: PartyMember = {
      ...boss,
      currentStats: {
        health: boss.requiredStats.health / 2,
        energy: boss.requiredStats.energy / 2,
        speed: boss.requiredStats.speed / 2,
        strength: boss.requiredStats.strength / 2,
        defense: boss.requiredStats.defense / 2
      },
      level: 1
    };
    setParty(prev => [...prev, newMember]);
  };

  const trainPartyMember = (type: TrainingType) => {
    if (energy < 10) {
      setBattleMessage("Not enough energy to train!");
      return;
    }

    setParty(prev => {
      const newParty = [...prev];
      if (newParty[selectedPartyMember]) {
        const member = newParty[selectedPartyMember];
        const statToIncrease = type === 'SPEED' ? 'speed' : 'strength';
        member.currentStats[statToIncrease] += 2;
        member.level += 0.1;
      }
      return newParty;
    });
    setEnergy(prev => Math.max(0, prev - 10));
    setBattleMessage(null);
  };

  const switchPartyMember = () => {
    if (party.length === 0) {
      setBattleMessage("No party members to switch to!");
      return;
    }
    setSelectedPartyMember(prev => (prev + 1) % party.length);
    setBattleMessage(null);
  };

  const handleAction = (action: GameMode, button: 'A' | 'B' = 'A') => {
    switch (action) {
      case 'TRAIN':
        trainPartyMember(button === 'A' ? 'STRENGTH' : 'SPEED');
        break;
      case 'REST':
        setEnergy(prev => Math.min(100, prev + 20));
        setBattleMessage(null);
        break;
      case 'FEED':
        if (bolts <= 0) {
          setBattleMessage("No bolts left! Complete missions to get more bolts.");
          return;
        }
        setBolts(prev => prev - 1);
        setEnergy(prev => Math.min(100, prev + 30));
        setBattleMessage(null);
        break;
      case 'BATTLE':
        if (energy <= 20) {
          setBattleMessage("Not enough energy for battle!");
          return;
        }

        const currentBoss = BOSSES[currentBossIndex];
        const activeMember = party[selectedPartyMember];
        
        if (!activeMember) {
          setBattleMessage("You need a party member to battle!");
          return;
        }

        const isStrongEnough = 
          activeMember.currentStats.speed >= currentBoss.requiredStats.speed * 0.7 &&
          activeMember.currentStats.strength >= currentBoss.requiredStats.strength * 0.7;

        if (isStrongEnough) {
          setBattleMessage(`Victory! You defeated ${currentBoss.name}! You found the puzzle piece: "${currentBoss.puzzlePiece}"`);
          setEnergy(prev => Math.max(0, prev - 20));
          setBolts(prev => prev + 3);
          if (!currentBoss.defeated) {
            addToParty(currentBoss);
            const newBosses = [...BOSSES];
            newBosses[currentBossIndex].defeated = true;
          }
          if (currentBossIndex < BOSSES.length - 1) {
            setCurrentBossIndex(prev => prev + 1);
          }
        } else {
          setBattleMessage(currentBoss.message + "\n" + currentBoss.hint);
          setEnergy(0);
          setBolts(prev => prev + 1);
        }
        break;
      case 'MISSION':
        if (energy <= 15) {
          setBattleMessage("Not enough energy for mission!");
          return;
        }
        setEnergy(prev => Math.max(0, prev - 15));
        setBolts(prev => prev + Math.floor(Math.random() * 3) + 1);
        setBattleMessage(null);
        break;
      case 'SWITCH':
        switchPartyMember();
        break;
    }
  };

  const activeMember = party[selectedPartyMember];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <GameBoy
        stats={activeMember?.currentStats || stats}
        currentMode={currentMode}
        onModeChange={setCurrentMode}
        onAction={handleAction}
        energy={energy}
        bolts={bolts}
        battleMessage={battleMessage}
        currentBoss={BOSSES[currentBossIndex]}
        party={party}
        selectedPartyMember={selectedPartyMember}
      />
    </div>
  );
}

export default App;