import type React from "react";
import type { AnswerResult } from "../../types/quiz.types";
import Typography from "./Typography";
import Badge from "./Badge";

interface TableProps {
  title: string;
  data: AnswerResult[];
  color: "green" | "red" | "yellow";
}

const Table: React.FC<TableProps> = ({ title, data, color }) => {
  if (data.length === 0) return null;

  const colorClasses = {
    green: "text-green-600",
    red: "text-red-600",
    yellow: "text-yellow-600",
  };

  const getVariant = (status: string) => {
    if (status === "correct") return "success";
    if (status === "wrong") return "error";
    return "warning";
  };

  return (
    <div className="bg-white rounded-xl p-4">
      <Typography variant="h2" className={`mb-4 ${colorClasses[color]}`}>
        {title}
      </Typography>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Question</th>
              <th className="p-3 text-left">Your Answer</th>
              <th className="p-3 text-left">Correct</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 transition">
                <td className="p-3 font-medium">{index + 1}</td>

                <td className="p-3">{item.question}</td>

                <td className="p-3">
                  <span
                    className={
                      item.status === "correct"
                        ? "text-green-600 font-semibold"
                        : item.status === "wrong"
                          ? "text-red-600 font-semibold"
                          : "text-yellow-600 font-semibold"
                    }
                  >
                    {item.userAnswer}
                  </span>
                </td>

                <td className="p-3">{item.correctAnswer}</td>

                <td className="p-3">
                  <Badge variant={getVariant(item.status)}>{item.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
