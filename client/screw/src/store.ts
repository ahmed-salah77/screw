import { create } from "zustand";

export interface Room {
  id: string;
  name: string;
  host: string;
  numberOfPlayers: number;
  players: Player[];
  scores: (number | null)[][];
  roundState:
    | "running"
    | "starting"
    | "cardsDistributing"
    | "notStarted"
    | "showingCards";
  screw: string;
  password: string;
  round: number;
  lap: number;
  turn: number;
  deck: Card[];
  tableCard: null | Card;
  case: number;
  seenCards: string[];
  turnStartedTime: number;
}

export interface Card {
  id: number;
  name: string;
  value: number;
  function:
    | "بص في ورقة غيرك"
    | "بص في ورقتك"
    | "كعب داير"
    | "بصرة"
    | "خد وهات"
    | "خد بس"
    | "see swap"
    | "مفيش";
  image: string;
  flipedTo: string;
  left: string;
  top: string;
  rotate: string;
  zIndex: number;
  owner: string;
}
export interface Player {
  id: string;
  name: string;
  avatar: string;
  isInRoom: boolean;
  roomId: string | null;
  hand: number;
}
export interface Game {
  myPlayer: Player;
  room: Room;
  grabbedCard: Card | null;
}

export interface GameStore {
  game: Game;
  setPlayer: (player: Player) => void;
  setRoom: (room: Room) => void;
  setGrabbedCard: (grabbedCard: Card | null) => void;
}

const useGameStore = create<GameStore>((set) => ({
  game: {
    myPlayer: {
      id: "",
      name: "",
      avatar: "0",
      isInRoom: false,
      roomId: null,
      hand: 0,
    },
    room: {
      id: "",
      name: "",
      host: "",
      numberOfPlayers: 0,
      players: [],
      scores: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      roundState: "notStarted",
      screw: "",
      password: "",
      round: 0,
      lap: 0,
      turn: 0,
      deck: [],
      tableCard: null,
      case: 0,
      seenCards: [],
      turnStartedTime: Date.now(),
    },
    grabbedCard: null,
  },
  setPlayer: (player) =>
    set((state) => ({
      game: {
        ...state.game,
        myPlayer: player,
      },
    })),
  setRoom: (room) =>
    set((state) => ({
      game: {
        ...state.game,
        room: { ...room, deck: [...room.deck] },
      },
    })),
  setGrabbedCard: (grabbedCard) =>
    set((state) => ({
      game: {
        ...state.game,
        grabbedCard,
      },
    })),
}));

export default useGameStore;
