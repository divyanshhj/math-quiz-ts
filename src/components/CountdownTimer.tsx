import { useEffect, useRef, useState } from "react";
import Typography from "./ui/Typography";

interface Props {
  totalSeconds: number;
  onTimeout: () => void;
  active: boolean;
}

export default function CountdownTimer({
  totalSeconds,
  onTimeout,
  active,
}: Props) {
  const [remaining, setRemaining] = useState(totalSeconds);
  const onTimeoutRef = useRef(onTimeout);

  useEffect(() => {
    onTimeoutRef.current = onTimeout;
  }, [onTimeout]);

  useEffect(() => {
    setRemaining(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (!active) return;
    if (remaining <= 0) {
      onTimeoutRef.current();
      return;
    }
    const id = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(id);
  }, [remaining, active]);

  const pct = (remaining / totalSeconds) * 100;
  const isUrgent = remaining <= Math.ceil(totalSeconds * 0.25);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <Typography as="span" className="text-xs font-medium text-slate-500">
          Time remaining
        </Typography>
        <Typography
          as="span"
          className={`text-sm font-bold tabular-nums transition-colors ${
            isUrgent ? "text-red-500" : "text-slate-700"
          }`}
        >
          {remaining}s
        </Typography>
      </div>
      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${
            isUrgent
              ? "bg-red-500"
              : pct > 50
                ? "bg-emerald-500"
                : "bg-amber-400"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
