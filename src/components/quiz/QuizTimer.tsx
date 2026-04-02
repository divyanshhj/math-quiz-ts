interface Props {
  timeLeft: number;
}

const QuizTimer: React.FC<Props> = ({ timeLeft }) => {
  return (
    <div className="mb-4">
      <p className="text-lg font-medium">
        <i className="fa-solid fa-hourglass-end"></i> Time Left:{" "}
        <span className={timeLeft <= 5 ? "text-red-500" : "text-green-600"}>
          {timeLeft}s
        </span>
      </p>
    </div>
  );
};

export default QuizTimer;