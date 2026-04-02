import type React from "react";
import type { AnswerResult } from "../../types/quiz.types";

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

export default Table;
