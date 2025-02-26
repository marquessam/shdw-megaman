import { Boss } from '../types';

export const BOSSES: Boss[] = [
  {
    id: 1,
    name: "Air Man",
    requiredStats: {
      health: 50,
      energy: 40,
      speed: 15,
      strength: 10,
      defense: 10
    },
    message: "You weren't fast enough to dodge the air blasts!",
    defeated: false,
    hint: "Speed is key to avoiding air attacks",
    puzzlePiece: "mo_s"
  },
  {
    id: 2,
    name: "Metal Man",
    requiredStats: {
      health: 60,
      energy: 50,
      speed: 40,
      strength: 70,
      defense: 50
    },
    message: "Your attacks weren't strong enough to pierce his armor!",
    defeated: false,
    hint: "Build up your strength to break through",
    puzzlePiece: "ter_"
  },
  {
    id: 3,
    name: "Wood Man",
    requiredStats: {
      health: 70,
      energy: 60,
      speed: 30,
      strength: 40,
      defense: 80
    },
    message: "Your defense couldn't withstand the leaf shield!",
    defeated: false,
    hint: "A strong defense is the best offense",
    puzzlePiece: "ran"
  },
  {
    id: 4,
    name: "Heat Man",
    requiredStats: {
      health: 80,
      energy: 70,
      speed: 50,
      strength: 50,
      defense: 60
    },
    message: "The heat was too intense for your systems!",
    defeated: false,
    hint: "Balance your stats to handle the heat",
    puzzlePiece: "ch_r"
  },
  {
    id: 5,
    name: "Flash Man",
    requiredStats: {
      health: 90,
      energy: 80,
      speed: 80,
      strength: 60,
      defense: 40
    },
    message: "You couldn't match his time-stopping speed!",
    defeated: false,
    hint: "Only the fastest can catch a flash of light",
    puzzlePiece: "2_g"
  },
  {
    id: 6,
    name: "Crash Man",
    requiredStats: {
      health: 100,
      energy: 90,
      speed: 70,
      strength: 80,
      defense: 70
    },
    message: "Your strength couldn't match his explosive power!",
    defeated: false,
    hint: "Power through with overwhelming force",
    puzzlePiece: "b_a"
  },
  {
    id: 7,
    name: "Quick Man",
    requiredStats: {
      health: 110,
      energy: 100,
      speed: 100,
      strength: 90,
      defense: 80
    },
    message: "Not even close to matching his lightning speed!",
    defeated: false,
    hint: "Push your speed beyond its limits",
    puzzlePiece: "n_n"
  }
];