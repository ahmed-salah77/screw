import { Card } from "../store";
import five from "/images/cards/five.jpg";
import one from "/images/cards/one.jpg";
const cards = (): (Card | null)[] => {
  const card = {
    id: 1,
    name: "5",
    value: 5,
    function: "مفيش",
    image: five,
    flipedTo: "",
  } as Card;
  const card2 = {
    id: 2,
    name: "1",
    value: 1,
    function: "مفيش",
    image: one,
    flipedTo: "",
  } as Card;
  const cards = [card2, card2, card, card, card2, card2, card, card];
  return cards;
};

export default cards;
