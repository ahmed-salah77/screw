import { useEffect, useState } from "react";
import useGameStore from "../store";
import Alert from "./Alert";
import { socket } from "../connection/socket";
import Countdown from "./Countdown";
import roundArabicText from "../services/roundArabicText";

const Alerts = () => {
  const room = useGameStore((s) => s.game.room);
  const myPlayer = useGameStore((s) => s.game.myPlayer);
  const [basra, setBasra] = useState<number>(0);
  useEffect(() => {
    socket.on("good-basra", () => {
      setBasra(1);
      setTimeout(() => {
        setBasra(0);
      }, 3000);
    });
    socket.on("bad-basra", () => {
      setBasra(-1);
      setTimeout(() => {
        setBasra(0);
      }, 3000);
    });
  }, [room]);
  if (room.roundState == "starting") {
    return (
      <Alert type="normal">
        ستبدأ الجولة {roundArabicText(room.round)} بعد 
        <Countdown seconds={10} /> ثواني
      </Alert>
    );
  }
  if (room.roundState == "cardsDistributing") {
    return <Alert type="normal">يتم توزيع الكروت</Alert>;
  }
  if (room.roundState == "showingCards") {
    return (
      <Alert type="normal">
        سيتم اخفاء الكارتين بعد <Countdown seconds={10} /> ثواني. تذكر كروتك
        جيدا
      </Alert>
    );
  }
  if (basra == 1) {
    return <Alert type="success">بصرة صحيحة</Alert>;
  }
  if (basra == -1) {
    return <Alert type="fail">بصرة خاطئة</Alert>;
  }
  if (room.turn == -1 && room.host != myPlayer.id)
    return <Alert type="normal">بانتظار مضيف الغرفة للبدء</Alert>;
  if (room.turn == -1 && room.host == myPlayer.id) {
    return <></>;
  }
  if (room.turn != -1 && room.players[room.turn].id != myPlayer.id) {
    return <Alert type="normal">دور {room.players[room.turn].name}</Alert>;
  }
  if (room.case == 0) {
    return <Alert type="normal">اسحب كارت او بدل الكارت الموجود او بصر</Alert>;
  }
  if (room.case == 2) {
    return <Alert type="normal">بدل الكارت او قم برميه</Alert>;
  }
  if (room.case == 5) return <Alert type="normal">بص في ورقتك</Alert>;
  if (room.case == 6) {
    return <Alert type="normal">بص في ورقة غيرك</Alert>;
  }
};

export default Alerts;
