import { useState } from "react";
import type { Operator, QuizConfig } from "../types/quiz";
import Typography from "./ui/Typography";
import Input from "./ui/Input";
import Button from "./ui/button";

interface FormErrors {
  minOperand?: string;
  maxOperand?: string;
  numQuestions?: string;
  timerSeconds?: string;
  operators?: string;
}

interface Props {
  onSubmit: (config: QuizConfig) => void;
}

const ALL_OPERATORS: Operator[] = ["+", "-", "*", "/"];

export default function QuizConfigForm({ onSubmit }: Props) {
  const [minOperand, setMinOperand] = useState("1");
  const [maxOperand, setMaxOperand] = useState("20");
  const [numQuestions, setNumQuestions] = useState("10");
  const [timerSeconds, setTimerSeconds] = useState("20");
  const [selectedOperators, setSelectedOperators] = useState<Operator[]>([
    "+",
    "-",
    "*",
    "/",
  ]);
  const [errors, setErrors] = useState<FormErrors>({});

  function toggleOperator(op: Operator) {
    setSelectedOperators((prev) =>
      prev.includes(op) ? prev.filter((o) => o !== op) : [...prev, op],
    );
  }

  function validate(): FormErrors {
    const errs: FormErrors = {};
    const min = parseInt(minOperand, 10);
    const max = parseInt(maxOperand, 10);
    const nq = parseInt(numQuestions, 10);
    const ts = parseInt(timerSeconds, 10);

    if (isNaN(min) || minOperand.trim() === "") {
      errs.minOperand = "Min operand is required";
    } else if (min < 0) {
      errs.minOperand = "Min operand must be 0 or greater";
    }

    if (isNaN(max) || maxOperand.trim() === "") {
      errs.maxOperand = "Max operand is required";
    } else if (!isNaN(min) && max <= min) {
      errs.maxOperand = "Max operand must be greater than min";
    }

    if (isNaN(nq) || numQuestions.trim() === "") {
      errs.numQuestions = "Number of questions is required";
    } else if (nq < 1) {
      errs.numQuestions = "Must have at least 1 question";
    } else if (nq > 100) {
      errs.numQuestions = "Maximum 100 questions allowed";
    }

    if (isNaN(ts) || timerSeconds.trim() === "") {
      errs.timerSeconds = "Timer is required";
    } else if (ts < 5) {
      errs.timerSeconds = "Timer must be at least 5 seconds";
    } else if (ts > 300) {
      errs.timerSeconds = "Timer cannot exceed 300 seconds";
    }

    if (selectedOperators.length === 0) {
      errs.operators = "Select at least one operator";
    }

    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const config: QuizConfig = {
      id: crypto.randomUUID(),
      minOperand: parseInt(minOperand, 10),
      maxOperand: parseInt(maxOperand, 10),
      numQuestions: parseInt(numQuestions, 10),
      timerSeconds: parseInt(timerSeconds, 10),
      operators: selectedOperators,
    };
    onSubmit(config);
  }

  const operatorLabels: Record<Operator, string> = {
    "+": "Addition (+)",
    "-": "Subtraction (−)",
    "*": "Multiplication (×)",
    "/": "Division (÷)",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 w-full max-w-md"
    >
      <Typography as="h2" className="text-xl font-bold text-slate-800 mb-5">
        Quiz Settings
      </Typography>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Typography
            as="label"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Min Operand
          </Typography>
          <Input
            type="number"
            value={minOperand}
            onChange={(e) => setMinOperand(e.target.value)}
            hasError={!!errors.minOperand}
            placeholder="e.g. 1"
          />
          {errors.minOperand && (
            <Typography as="p" className="text-xs text-red-500 mt-1">
              {errors.minOperand}
            </Typography>
          )}
        </div>

        <div>
          <Typography
            as="label"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Max Operand
          </Typography>
          <Input
            type="number"
            value={maxOperand}
            onChange={(e) => setMaxOperand(e.target.value)}
            hasError={!!errors.maxOperand}
            placeholder="e.g. 20"
          />
          {errors.maxOperand && (
            <Typography as="p" className="text-xs text-red-500 mt-1">
              {errors.maxOperand}
            </Typography>
          )}
        </div>

        <div>
          <Typography
            as="label"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Number of Questions
          </Typography>
          <Input
            type="number"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            hasError={!!errors.numQuestions}
            placeholder="e.g. 10"
          />
          {errors.numQuestions && (
            <Typography as="p" className="text-xs text-red-500 mt-1">
              {errors.numQuestions}
            </Typography>
          )}
        </div>

        <div>
          <Typography
            as="label"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Timer (seconds)
          </Typography>
          <Input
            type="number"
            value={timerSeconds}
            onChange={(e) => setTimerSeconds(e.target.value)}
            hasError={!!errors.timerSeconds}
            placeholder="e.g. 20"
          />
          {errors.timerSeconds && (
            <Typography as="p" className="text-xs text-red-500 mt-1">
              {errors.timerSeconds}
            </Typography>
          )}
        </div>
      </div>

      <div className="mb-5">
        <Typography
          as="label"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Operators
        </Typography>
        <div className="grid grid-cols-2 gap-2">
          {ALL_OPERATORS.map((op) => (
            <Button
              key={op}
              type="button"
              onClick={() => toggleOperator(op)}
              variant={selectedOperators.includes(op) ? "secondary" : "outline"} // Variant logic!
              className="py-2 px-3"
            >
              {operatorLabels[op]}
            </Button>
          ))}
        </div>
        {errors.operators && (
          <Typography as="p" className="text-xs text-red-500 mt-1">
            {errors.operators}
          </Typography>
        )}
      </div>

      <Button type="submit" variant="primary" className="w-full py-2.5">
        Start Quiz
      </Button>
    </form>
  );
}
