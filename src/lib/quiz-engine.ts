import type { Operator, Question, QuizConfig } from "../types/quiz";

export function generateQuestions(config: QuizConfig): Question[] {
  const questions: Question[] = [];
  for (let i = 0; i < config.numQuestions; i++) {
    questions.push(generateQuestion(config));
  }
  return questions;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion(config: QuizConfig): Question {
  const operator = config.operators[Math.floor(Math.random() * config.operators.length)];
  let a = randomInt(config.minOperand, config.maxOperand);
  let b = randomInt(config.minOperand, config.maxOperand);

  if (operator === "/" && b === 0) b = 1;
  if (operator === "-" && b > a) {
    [a, b] = [b, a];
  }

  const correctAnswer = computeAnswer(a, b, operator);
  return { a, b, operator, correctAnswer };
}

function computeAnswer(a: number, b: number, operator: Operator): number {
  switch (operator) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? 0 : parseFloat((a / b).toFixed(4));
  }
}

export function formatQuestion(q: Question): string {
  return `${q.a} ${q.operator} ${q.b} = ?`;
}

export function checkAnswer(userAnswer: string, question: Question): boolean {
  const parsed = parseFloat(userAnswer.trim());
  if (isNaN(parsed)) return false;
  const correct = question.correctAnswer;
  return Math.abs(parsed - correct) < 0.001;
}
