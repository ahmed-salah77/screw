import useGameStore, { Card } from "../store";

const canDragCard = (card: Card): boolean => {
  const room = useGameStore((s) => s.game.room);
  const playerId = useGameStore((s) => s.game.myPlayer.id);
  if (room.turn == -1 || room.players[room.turn].id != playerId) return false;
  // drag table card in the start of the turn
  if (
    room.case == 0 &&
    (card.id == room.tableCard?.id ||
      card.owner == playerId ||
      card.owner == "topCard")
  )
    return true;
  // drag top card in the start of the turn
  if (room.case == 2 && card.owner == "topCard") {
    return true;
  }
  // see your card
  if (room.case == 5 && card.owner == playerId) {
    return true;
  }
  // see another player card
  if (
    room.case == 6 &&
    card.owner != "tableCard" &&
    card.owner != "topCard" &&
    card.owner != "deck" &&
    card.owner != playerId
  )
    return true;
  // take and Give
  if (
    room.case == 8 &&
    card.owner != "tableCard" &&
    card.owner != "topCard" &&
    card.owner != "deck"
  )
    return true;
  if (room.case == 9 && card.owner == playerId) {
    return true;
  }
  if (
    room.case == 10 &&
    card.owner != "tableCard" &&
    card.owner != "topCard" &&
    card.owner != "deck"
  )
    return true;
  if (room.case == 11 && card.owner == playerId) return true;
  // if (room.case == 12 && card.owner == playerId) return true;
  return false;
};
export default canDragCard;