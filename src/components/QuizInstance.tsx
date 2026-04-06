import { useState } from "react";
import type { QuizConfig, QuizState, QuestionResult } from "../types/quiz";
import { checkAnswer } from "../lib/quiz-engine";
import { generateQuestions } from "../lib/quiz-engine";
import QuizCard from "./QuizCard";
import QuizResults from "./QuizResults";
import Typography from "./ui/Typography";
import Badge from "./ui/badge";

interface Props {
  config: QuizConfig;
  index: number;
}

function createInitialState(config: QuizConfig): QuizState {
  return {
    config,
    questions: generateQuestions(config),
    currentIndex: 0,
    results: [],
    phase: "in-progress",
    currentAnswer: "",
    timedOut: false,
  };
}

export default function QuizInstance({ config, index }: Props) {
  const [state, setState] = useState<QuizState>(() =>
    createInitialState(config),
  );

  function handleAnswer(answer: string | null, timedOut: boolean) {
    const question = state.questions[state.currentIndex];
    let status: QuestionResult["status"];

    if (timedOut) {
      status = "timeout";
    } else if (answer !== null && checkAnswer(answer, question)) {
      status = "correct";
    } else {
      status = "incorrect";
    }

    const result: QuestionResult = {
      question,
      userAnswer: answer,
      status,
    };

    setState((prev) => ({
      ...prev,
      results: [...prev.results, result],
      timedOut,
    }));
  }

  function handleNext() {
    setState((prev) => {
      if (prev.currentIndex >= prev.questions.length - 1) {
        return { ...prev, phase: "finished" };
      }
      return {
        ...prev,
        currentIndex: prev.currentIndex + 1,
        currentAnswer: "",
        timedOut: false,
      };
    });
  }

  const score = state.results.filter((r) => r.status === "correct").length;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-5 flex flex-col gap-4 min-w-[320px] w-full max-w-sm">
      <div className="flex items-center justify-between">
        <div>
          <Typography as="h3" className="text-sm font-bold text-slate-800">
            Quiz #{index + 1}
          </Typography>
          <Typography as="p" className="text-xs text-slate-400">
            {config.operators.join(" ")} | {config.minOperand}–
            {config.maxOperand} | {config.timerSeconds}s
          </Typography>
        </div>
        {state.phase === "in-progress" && (
          <Badge variant="indigo">{score} pts</Badge>
        )}
        {state.phase === "finished" && (
          <Badge variant="emerald">
            Done: {score}/{state.questions.length}
          </Badge>
        )}
      </div>

      {state.phase === "in-progress" ? (
        <QuizCard
          quizState={state}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      ) : (
        <QuizResults quizState={state} />
      )}
    </div>
  );
}
