interface Props {
  onStart: () => void;
}

const StartScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">🧠 Math Quiz</h1>

        <p className="text-gray-600 mb-6">
          Test your math skills with 20 questions. You have 20 seconds for each!
        </p>

        <button
          onClick={onStart}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Start Quiz 🚀
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
