import type { Question } from "../../types/quiz.types";

interface Props {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  disabled: boolean;
  index: number;
}

const QuestionCard: React.FC<Props> = ({
  question,
  value,
  onChange,
  onNext,
  disabled,
  index,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center"
    >
      <h2 className="text-lg font-semibold text-gray-500">
        Question {index + 1}
      </h2>

      <h1 className="text-3xl font-bold mt-4">
        {question.num1} {question.operator} {question.num2}
      </h1>

      <input
        type="number"
        step="any"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
        className="mt-6 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter answer"
      />

      <button
        type="submit"
        disabled={disabled || !value}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </form>
  );
};

export default QuestionCard;
