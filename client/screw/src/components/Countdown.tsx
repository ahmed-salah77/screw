import { useEffect, useState } from "react";

interface Props {
  seconds: number;
}

export interface Time {
  isRunning: boolean;
  isEnded: boolean;
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
}

const Countdown = ({ seconds: initialSeconds }: Props) => {
  const [startTime, setStartTime] = useState<number>(0);
  const [time, setTime] = useState<Time>({
    isRunning: true,
    isEnded: false,
    milliseconds: 0,
    seconds: initialSeconds,
    minutes: 0,
    hours: 0,
  });

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = Date.now();
      const elapsedTime = now - startTime;
      const timeRemaining = Math.max(0, initialSeconds * 1000 - elapsedTime);
      const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
      const seconds_ = Math.floor((timeRemaining / 1000) % 60);
      const milliseconds = Math.floor(timeRemaining % 1000);

      setTime({
        isRunning: true,
        isEnded: timeRemaining === 0,
        milliseconds,
        seconds: seconds_,
        minutes,
        hours,
      });
    };

    const interval = setInterval(calculateTimeRemaining, 10);

    return () => clearInterval(interval);
  }, [startTime, initialSeconds]);

  return <>{time.seconds.toString().padStart(1, "0")}</>;
};

export default Countdown;
