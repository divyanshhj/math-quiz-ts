import type { AnswerResult } from "../../types/quiz.types";

interface Props {
  results: AnswerResult[];
  total: number;
}

const QuizResult: React.FC<Props> = ({ results, total }) => {
  const correct = results.filter(r => r.status === "correct");
  const wrong = results.filter(r => r.status === "wrong");
  const timeout = results.filter(r => r.status === "timeout");

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 space-y-6 overflow-y-auto max-h-[90vh]">

        {/* 🔥 Score Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">🎉 Quiz Completed</h2>
          <h1 className="text-4xl font-bold text-blue-600 mt-2">
            {correct.length} / {total}
          </h1>

          <div className="flex justify-center gap-6 mt-4 text-lg">
            <span className="text-green-600">✅ {correct.length}</span>
            <span className="text-red-500">❌ {wrong.length}</span>
            <span className="text-yellow-500">⏰ {timeout.length}</span>
          </div>
        </div>

        {/* ✅ Correct Table */}
        <Table title="Correct Answers" data={correct} color="green" />

        {/* ❌ Wrong Table */}
        <Table title="Wrong Answers" data={wrong} color="red" />

        {/* ⏰ Timeout Table */}
        <Table title="Timeout Answers" data={timeout} color="yellow" />

      </div>
    </div>
  );
};

export default QuizResult;






// 🔥 Reusable Table Component
interface TableProps {
  title: string;
  data: AnswerResult[];
  color: "green" | "red" | "yellow";
}

const Table: React.FC<TableProps> = ({ title, data, color }) => {
  if (data.length === 0) return null;

  return (
    <div>
      <h3 className={`text-xl font-semibold mb-2 text-${color}-600`}>
        {title}
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">No</th>
              <th className="p-2">Question</th>
              <th className="p-2">Your Answer</th>
              <th className="p-2">Correct</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="text-center border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{item.question}</td>
                <td className="p-2">{item.userAnswer}</td>
                <td className="p-2">{item.correctAnswer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};