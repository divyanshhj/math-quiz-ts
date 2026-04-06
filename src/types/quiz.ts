export type Operator = "+" | "-" | "*" | "/";

export interface QuizConfig {
  id: string;
  minOperand: number;
  maxOperand: number;
  numQuestions: number;
  timerSeconds: number;
  operators: Operator[];
}

export interface Question {
  a: number;
  b: number;
  operator: Operator;
  correctAnswer: number;
}

export type AnswerStatus = "correct" | "incorrect" | "timeout" | "pending";

export interface QuestionResult {
  question: Question;
  userAnswer: string | null;
  status: AnswerStatus;
}

export interface QuizState {
  config: QuizConfig;
  questions: Question[];
  currentIndex: number;
  results: QuestionResult[];
  phase: "in-progress" | "finished";
  currentAnswer: string;
  timedOut: boolean;
}
