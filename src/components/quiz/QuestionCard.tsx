import type { Question } from "../../types/quiz.types";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Typography from "../ui/Typography";

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
      <Typography variant="h3" className="text-gray-500">
        Question {index + 1}
      </Typography>

      <Typography variant="h1" className="mt-4">
        <i className="fa-solid fa-calculator"></i> {question.num1}{" "}
        {question.operator} {question.num2}
      </Typography>

      <Input
        type="number"
        step="any"
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoFocus
        placeholder="Enter answer"
        className="mt-6"
      />

      <Button
        type="submit"
        onClick={onNext}
        disabled={disabled || !value}
        className="mt-6"
      >
        Next <i className="fa-solid fa-arrow-right"></i>
      </Button>
    </form>
  );
};

export default QuestionCard;
