import { OPERATORS } from "../constants/quizConfig";
import type { Question } from "../types/quiz.types";

export const generateQuestion = (): Question => {
  const num1 = Math.floor(Math.random() * 20);
  const num2 = Math.floor(Math.random() * 20);
  const operator = OPERATORS[Math.floor(Math.random() * OPERATORS.length)];

  let answer: number;

  switch (operator) {
    case "+":
      answer = num1 + num2;
      break;
    case "-":
      answer = num1 - num2;
      break;
    case "*":
      answer = num1 * num2;
      break;
    case "/":
      answer = num2 !== 0 ? Number((num1 / num2).toFixed(2)) : 0;
      break;
  }

  return { num1, num2, operator, answer };
};
