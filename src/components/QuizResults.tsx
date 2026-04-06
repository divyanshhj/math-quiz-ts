import type { QuestionResult, QuizState } from "../types/quiz";
import { formatQuestion } from "../lib/quiz-engine";
import Typography from "./ui/Typography";

interface Props {
  quizState: QuizState;
}

function ResultRow({
  r,
  showCorrectAnswer,
}: {
  r: QuestionResult;
  showCorrectAnswer: boolean;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5">
      <Typography
        as="span"
        className="flex-1 text-sm text-slate-700 font-medium"
      >
        {formatQuestion(r.question)}
      </Typography>
      <div className="text-right">
        {r.status === "timeout" ? (
          <Typography as="p" className="text-xs text-amber-500 font-semibold">
            Timed out
          </Typography>
        ) : (
          <Typography as="p" className="text-xs text-slate-500">
            Your answer:{" "}
            <Typography as="span" className="font-semibold">
              {r.userAnswer ?? "—"}
            </Typography>
          </Typography>
        )}
        {showCorrectAnswer && (
          <Typography as="p" className="text-xs text-slate-400">
            Correct:{" "}
            <Typography as="span" className="font-semibold">
              {r.question.correctAnswer}
            </Typography>
          </Typography>
        )}
      </div>
    </div>
  );
}

export default function QuizResults({ quizState }: Props) {
  const { results, config } = quizState;

  const correctList = results.filter((r) => r.status === "correct");
  const incorrectList = results.filter((r) => r.status === "incorrect");
  const timedOutList = results.filter((r) => r.status === "timeout");
  const total = results.length;
  const score = correctList.length;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl bg-linear-to-br from-indigo-600 to-indigo-700 p-6 text-white text-center">
        <Typography as="p" className="text-sm font-medium text-indigo-200 mb-1">
          Final Score
        </Typography>
        <Typography
          as="p"
          className="text-5xl font-extrabold tracking-tight mb-1"
        >
          {score}/{total}
        </Typography>
        <Typography as="p" className="text-indigo-200 text-sm">
          {pct}% correct
        </Typography>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-emerald-50 border border-emerald-100 py-3">
          <Typography as="p" className="text-xl font-bold text-emerald-600">
            {correctList.length}
          </Typography>
          <Typography as="p" className="text-xs text-emerald-500 font-medium">
            Correct
          </Typography>
        </div>
        <div className="rounded-lg bg-red-50 border border-red-100 py-3">
          <Typography as="p" className="text-xl font-bold text-red-500">
            {incorrectList.length}
          </Typography>
          <Typography as="p" className="text-xs text-red-400 font-medium">
            Wrong
          </Typography>
        </div>
        <div className="rounded-lg bg-amber-50 border border-amber-100 py-3">
          <Typography as="p" className="text-xl font-bold text-amber-500">
            {timedOutList.length}
          </Typography>
          <Typography as="p" className="text-xs text-amber-400 font-medium">
            Timed Out
          </Typography>
        </div>
      </div>

      {correctList.length > 0 && (
        <div className="rounded-xl border border-emerald-200 overflow-hidden">
          <div className="bg-emerald-50 px-4 py-2.5 border-b border-emerald-100 flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
              ✓
            </span>
            <Typography
              as="h3"
              className="text-sm font-semibold text-emerald-700"
            >
              Correct Answers ({correctList.length})
            </Typography>
          </div>
          <div className="divide-y divide-emerald-50">
            {correctList.map((r, i) => (
              <ResultRow key={i} r={r} showCorrectAnswer={false} />
            ))}
          </div>
        </div>
      )}

      {incorrectList.length > 0 && (
        <div className="rounded-xl border border-red-200 overflow-hidden">
          <div className="bg-red-50 px-4 py-2.5 border-b border-red-100 flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">
              ✗
            </span>
            <Typography as="h3" className="text-sm font-semibold text-red-700">
              Wrong Answers ({incorrectList.length})
            </Typography>
          </div>
          <div className="divide-y divide-red-50">
            {incorrectList.map((r, i) => (
              <ResultRow key={i} r={r} showCorrectAnswer={true} />
            ))}
          </div>
        </div>
      )}

      {timedOutList.length > 0 && (
        <div className="rounded-xl border border-amber-200 overflow-hidden">
          <div className="bg-amber-50 px-4 py-2.5 border-b border-amber-100 flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold">
              ⏱
            </span>
            <Typography
              as="h3"
              className="text-sm font-semibold text-amber-700"
            >
              Timed Out ({timedOutList.length})
            </Typography>
          </div>
          <div className="divide-y divide-amber-50">
            {timedOutList.map((r, i) => (
              <ResultRow key={i} r={r} showCorrectAnswer={true} />
            ))}
          </div>
        </div>
      )}

      <div className="text-xs text-slate-400 text-center">
        Settings: {config.minOperand}–{config.maxOperand} |{" "}
        {config.operators.join(" ")} | {config.timerSeconds}s/question
      </div>
    </div>
  );
}
