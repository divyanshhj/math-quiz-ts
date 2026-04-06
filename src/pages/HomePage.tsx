import { useState } from "react";
import type { QuizConfig } from "../types/quiz";
import QuizConfigForm from "../components/QuizConfigForm";
import QuizInstance from "../components/QuizInstance";
import Typography from "../components/ui/Typography";

export default function HomePage() {
  const [quizzes, setQuizzes] = useState<QuizConfig[]>([]);

  function handleAddQuiz(config: QuizConfig) {
    setQuizzes((prev) => [...prev, config]);
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <Typography
            as="h1"
            className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2"
          >
            Math Quiz
          </Typography>
          <Typography as="p" className="text-slate-500 text-base">
            Configure and start as many quizzes as you like. Each one runs
            independently.
          </Typography>
        </header>

        <div className="flex flex-col items-center gap-10">
          <QuizConfigForm onSubmit={handleAddQuiz} />

          {quizzes.length > 0 && (
            <div className="w-full">
              <Typography
                as="h2"
                className="text-lg font-bold text-slate-700 mb-4 text-center"
              >
                Active Quizzes ({quizzes.length})
              </Typography>
              <div className="flex flex-wrap justify-center gap-5">
                {quizzes.map((config, i) => (
                  <QuizInstance key={config.id} config={config} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
