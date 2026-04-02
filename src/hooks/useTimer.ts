import { useEffect, useState, useCallback, useRef } from "react";

export const useTimer = (initialTime: number, onTimeUp?: () => void) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUpRef.current?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const resetTimer = useCallback(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  return { timeLeft, resetTimer };
};
