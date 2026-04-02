export type Operator = "+" | "-" | "*" | "/";
export type QuizStage = "start" | "quiz" | "result";
export interface Question {
  num1: number;
  num2: number;
  operator: Operator;
  answer: number;
}

export type ResultStatus = "correct" | "wrong" | "timeout";

export interface AnswerResult {
  question: string;
  userAnswer: string;
  correctAnswer: number;
  status: "correct" | "wrong" | "timeout";
}