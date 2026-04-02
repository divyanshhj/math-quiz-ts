import { useState } from "react";
import { TOTAL_QUESTIONS } from "./constants/quizConfig";
import type { AnswerResult, QuizStage } from "./types/quiz.types";

import StartScreen from "./components/quiz/StartScreen";
import QuizResult from "./components/quiz/QuizResult";
import QuizScreen from "./components/quiz/QuizScreen";

const App = () => {
  const [stage, setStage] = useState<QuizStage>("start");
  const [results, setResults] = useState<AnswerResult[]>([]);

  const startQuiz = () => {
    setResults([]);
    setStage("quiz");
  };

  const handleFinish = (finalResults: AnswerResult[]) => {
    setResults(finalResults);
    setStage("result");
  };

  if (stage === "start") return <StartScreen onStart={startQuiz} />;

  if (stage === "result") {
    return <QuizResult results={results} total={TOTAL_QUESTIONS} />;
  }

  return <QuizScreen onFinish={handleFinish} />;
};

export default App;
