import React, { useEffect, useState, useRef } from 'react';

const TestTimer: React.FC = () => {
  const [timer, setTimer] = useState(0);
  const animationFrameRef = useRef<number | null>(null);

  const startTimer = () => {
    animationFrameRef.current = requestAnimationFrame(updateTimer);
  };

  const updateTimer = () => {
    setTimer((prevTimer) => prevTimer + 1);
    animationFrameRef.current = requestAnimationFrame(updateTimer);
  };

  const stopTimer = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
    };
  }, []);

  return (
    <div>
      <p>Timer: {timer}</p>
    </div>
  );
};

export default TestTimer;