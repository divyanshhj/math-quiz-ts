import { useEffect, useState, useCallback, useRef } from "react";

export const useTimer = (initialTime: number, onTimeUp?: () => void) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  // 1. Create the ref
  const onTimeUpRef = useRef(onTimeUp);

  // 2. Update the ref inside an effect, NOT in the render body
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    // If time is up, trigger the callback
    if (timeLeft <= 0) {
      onTimeUpRef.current?.();
      return;
    }

    // Standard interval logic
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, [timeLeft]); // Only re-run when timeLeft changes

  const resetTimer = useCallback(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  return { timeLeft, resetTimer };
};
