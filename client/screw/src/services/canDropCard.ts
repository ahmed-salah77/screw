import useGameStore, { Card } from "../store";

const canDropCard = (card: Card): boolean => {
  const room = useGameStore((s) => s.game.room);
  const playerId = useGameStore((s) => s.game.myPlayer.id);
  if (room.turn == -1 || room.players[room.turn].id != playerId) return false;
  if (card.owner == playerId) {
    // my card
    if (room.case == 0 || room.case == 8 || room.case == 2) return true;
  } else if (card.owner == "topCard") {
    // top card
    return false;
  } else if (card.id == room.tableCard?.id) {
    // table card
    if (room.case == 0 || room.case == 2 || room.case == 9) return true;
  } else if (card.owner != "deck") {
    // another player card
    if (room.case == 8) return true;
  }
  return false;
};
export default canDropCard;
