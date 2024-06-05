import useGameStore, { Player } from "../store";

const canDropPlayer = (player: Player): boolean => {
  const room = useGameStore((s) => s.game.room);
  if (room.turn == -1) return false;
  // 5od bas
  if (room.players[room.turn].id != player.id && room.case == 11) return true;
  if (room.players[room.turn].id != player.id) return false;
  // take card , see your card, see another player card, ka3b dayer(see one card from all players)
  if (room.case == 0 || room.case == 5 || room.case == 6 || room.case == 10)
    return true;
  return false;
};

export default canDropPlayer;
