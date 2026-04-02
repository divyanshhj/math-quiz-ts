import type { AnswerResult } from "../../types/quiz.types";
import Table from "../ui/Table";
import Typography from "../ui/Typography";

interface Props {
  results: AnswerResult[];
  total: number;
}

const QuizResult: React.FC<Props> = ({ results, total }) => {
  const correct = results.filter((r) => r.status === "correct");
  const wrong = results.filter((r) => r.status === "wrong");
  const timeout = results.filter((r) => r.status === "timeout");

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 space-y-6 overflow-y-auto max-h-[90vh]">
        <div className="text-center">
          <Typography variant="h2">
            <i
              className="fa-solid fa-brain fa-flip"
              style={{ color: "#FFD700", marginRight: "15px" }}
            ></i>
            Quiz Completed
          </Typography>
          <Typography variant="h1" className="text-blue-600 mt-2">
            {correct.length} / {total}
          </Typography>

          <div className="flex justify-center gap-6 mt-4 text-lg">
            <span className="text-green-600">
              <i className="fa-solid fa-circle-check"></i> {correct.length}
            </span>
            <span className="text-red-500">
              <i className="fa-solid fa-circle-xmark"></i> {wrong.length}
            </span>
            <span className="text-yellow-500">
              <i className="fa-solid fa-clock"></i> {timeout.length}
            </span>
          </div>
        </div>

        {/* Correct Table */}
        <Table title="Correct Answers" data={correct} color="green" />

        {/* Wrong Table */}
        <Table title="Wrong Answers" data={wrong} color="red" />

        {/* Timeout Table */}
        <Table title="Timeout Answers" data={timeout} color="yellow" />
      </div>
    </div>
  );
};

export default QuizResult;
