import Button from "../ui/Button";
import Typography from "../ui/Typography";

interface Props {
  onStart: () => void;
}

const StartScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center w-full max-w-md">
        <Typography variant="h1" className="mb-4">
          <i className="fa-solid fa-head-side-virus"></i> Math Quiz
        </Typography>

        <Typography variant="body" className="mb-6">
          Test your math skills with 20 questions. You have 20 seconds for each!
        </Typography>

        <Button onClick={onStart} className="py-3">
          Start Quiz{" "}
          <i
            className="fa-solid fa-brain fa-beat"
            style={{ marginLeft: "8px" }}
          ></i>
        </Button>
      </div>
    </div>
  );
};

export default StartScreen;
