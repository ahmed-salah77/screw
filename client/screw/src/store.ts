import { create } from "zustand";

export interface Room {
  id: string;
  name: string;
  host: Player;
  numberOfPlayers: number;
  players: Player[];
  password: string;
  isRunningGame: boolean;
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
    | "خد بس";
  image: string;
  isFliped: boolean;
}
export interface Player {
  id: string;
  name: string;
  isInRoom: boolean;
  room: string | null;
  cards: Card[] | null;
}
export interface Game {
  myPlayer: Player;
  room: Room;
  tableCards: Card[];
}

export interface GameStore {
  game: Game;
  setPlayer: (player: Player) => void;
  setRoom: (room: Room) => void;
  createRoom: (room: Room) => void;
  joinRoom: (room: Room) => void;
  leaveRoom: () => void;
  startGame: () => void;
  shuffleCards: () => void;
}

const useGameStore = create<GameStore>((set) => ({
  game: {
    myPlayer: {
      id: "",
      name: "",
      isInRoom: false,
      room: null,
      cards: null,
    },
    room: {
      id: "",
      name: "",
      host: {
        id: "",
        name: "",
        isInRoom: false,
        room: null,
        cards: null,
      },
      numberOfPlayers: 0,
      players: [],
      password: "",
      isRunningGame: false,
    },
    tableCards: [],
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
        room,
      },
    })),
  startGame: () =>
    set((state) => ({
      game: {
        ...state.game,
        room: {
          ...state.game.room,
          isRunningGame: true,
        },
      },
    })),
  createRoom: (room) =>
    set((state) => ({
      game: {
        ...state.game,
        myPlayer: { ...state.game.myPlayer, isInRoom: true, room: room.id },
        room: {
          ...room,
        },
      },
    })),
  joinRoom: (room) =>
    set((state) => ({
      game: {
        ...state.game,
        myPlayer: { ...state.game.myPlayer, isInRoom: true, room: room.id },
        room: {
          ...room,
          numberOfPlayers: room.numberOfPlayers + 1,
          players: [...room.players],
        },
      },
    })),
  leaveRoom: () =>
    set((state) => ({
      game: {
        ...state.game,
        myPlayer: { ...state.game.myPlayer, isInRoom: false, room: null },
        room: {
          id: "",
          name: "",
          host: {
            id: "",
            name: "",
            isInRoom: false,
            room: null,
            cards: null,
          },
          numberOfPlayers: 0,
          players: [],
          password: "",
          isRunningGame: false,
        },
      },
    })),
  shuffleCards: () => {
    set((state) => {
      const shuffledCards = [...state.game.tableCards];
      for (let i = shuffledCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] = [
          shuffledCards[j],
          shuffledCards[i],
        ];
      }

      return {
        game: {
          ...state.game,
          tableCards: shuffledCards,
        },
      };
    });
  },
}));

export default useGameStore;
