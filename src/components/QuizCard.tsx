import { useEffect, useRef, useState } from "react";
import type { QuizState } from "../types/quiz";
import { formatQuestion } from "../lib/quiz-engine";
import CountdownTimer from "./CountdownTimer";
import Typography from "./ui/Typography";
import Button from "./ui/button";
import Input from "./ui/Input";

interface Props {
  quizState: QuizState;
  onAnswer: (answer: string | null, timedOut: boolean) => void;
  onNext: () => void;
}

export default function QuizCard({ quizState, onAnswer, onNext }: Props) {
  const { currentIndex, questions, results, config } = quizState;
  const question = questions[currentIndex];
  const [inputValue, setInputValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [localTimedOut, setLocalTimedOut] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue("");
    setSubmitted(false);
    setLocalTimedOut(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [currentIndex]);

  function handleTimeout() {
    if (submitted || localTimedOut) return;
    setLocalTimedOut(true);
    onAnswer(null, true);
  }

  function handleSubmitAnswer() {
    if (submitted || localTimedOut) return;
    setSubmitted(true);
    onAnswer(inputValue.trim() || null, false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSubmitAnswer();
  }

  const isAnswered = submitted || localTimedOut;
  const lastResult = results.length > 0 ? results[results.length - 1] : null;
  const showEval = isAnswered && lastResult;

  const progress = currentIndex + 1;
  const total = questions.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center gap-2">
        <Typography as="span" className="text-xs font-medium text-slate-500">
          Question {progress} of {total}
        </Typography>
        <div className="flex flex-wrap gap-1">
          {questions.map((_, i) => {
            const r = results[i];
            let color = "bg-slate-200";
            if (r) {
              if (r.status === "correct") color = "bg-emerald-500";
              else if (r.status === "incorrect") color = "bg-red-400";
              else if (r.status === "timeout") color = "bg-amber-400";
            } else if (i === currentIndex) {
              color = "bg-indigo-400";
            }
            return (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-colors ${color}`}
                style={{ width: `${Math.max(8, 200 / total)}px` }}
              />
            );
          })}
        </div>
      </div>

      <CountdownTimer
        key={currentIndex}
        totalSeconds={config.timerSeconds}
        onTimeout={handleTimeout}
        active={!isAnswered}
      />

      <div className="rounded-xl bg-indigo-50 border border-indigo-100 px-6 py-8 text-center">
        <Typography
          as="p"
          className="text-3xl font-extrabold text-indigo-800 tracking-tight"
        >
          {formatQuestion(question)}
        </Typography>
      </div>

      <div className="flex gap-2">
        <Input
          ref={inputRef}
          type="number"
          step="any"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isAnswered}
          placeholder="Your answer..."
          className="flex-1"
        />
        <Button
          onClick={handleSubmitAnswer}
          disabled={isAnswered}
          variant="primary"
          className="px-4 py-2.5"
        >
          Submit
        </Button>
      </div>

      {showEval && (
        <div
          className={`rounded-lg px-4 py-3 text-sm font-medium ${
            lastResult.status === "correct"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
              : lastResult.status === "timeout"
                ? "bg-amber-50 border border-amber-200 text-amber-700"
                : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {lastResult.status === "correct" && "Correct! +1 point"}
          {lastResult.status === "incorrect" &&
            `Incorrect. The answer was ${question.correctAnswer}`}
          {lastResult.status === "timeout" &&
            `Time's up! The answer was ${question.correctAnswer}`}
        </div>
      )}

      {isAnswered && (
        <Button onClick={onNext} variant="dark" className="w-full py-2.5">
          {currentIndex < questions.length - 1
            ? "Next Question"
            : "See Results"}
        </Button>
      )}
    </div>
  );
}
