import { useState, useCallback } from "react";
import { TIME_LIMIT, TOTAL_QUESTIONS } from "../../constants/quizConfig";
import { generateQuestion } from "../../utils/quizGenerator";
import { useTimer } from "../../hooks/useTimer";
import type { AnswerResult, ResultStatus } from "../../types/quiz.types";

import QuestionCard from ".././quiz/QuestionCard";
import QuizTimer from ".././quiz/QuizTimer";

interface QuizScreenProps {
  onFinish: (results: AnswerResult[]) => void;
}

const QuizScreen = ({ onFinish }: QuizScreenProps) => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(generateQuestion());
  const [answer, setAnswer] = useState("");
  const [results, setResults] = useState<AnswerResult[]>([]);

  const next = useCallback(
    (timeout = false) => {
      const status: ResultStatus =
        !timeout && answer && Number(answer) === question.answer
          ? "correct"
          : timeout
            ? "timeout"
            : "wrong";

      const newResults = [
        ...results,
        {
          question: `${question.num1} ${question.operator} ${question.num2}`,
          userAnswer: timeout ? "NA" : answer || "NA",
          correctAnswer: question.answer,
          status,
        },
      ];

      setResults(newResults);

      if (index + 1 < TOTAL_QUESTIONS) {
        setIndex((i) => i + 1);
        setQuestion(generateQuestion());
        setAnswer("");
        resetTimer();
      } else {
        onFinish(newResults);
      }
    },
    [answer, index, question, results],
  );

  const { timeLeft, resetTimer } = useTimer(TIME_LIMIT, () => {
    next(true);
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <QuizTimer timeLeft={timeLeft} />

      <QuestionCard
        question={question}
        value={answer}
        onChange={setAnswer}
        onNext={() => next(false)}
        disabled={timeLeft === 0}
        index={index}
      />
    </div>
  );
};

export default QuizScreen;
