import { useEffect, useState } from "react";
import "./App.css";
import NameDialog from "./components/NameDialog";
import { Button } from "./components/ui/button";
import RetroGrid from "./components/ui/retro-grid";
import Graph from "./components/Graph";
import { Separator } from "./components/ui/separator";
import { getLeaderboard, postScore } from "./lib/api";
import ScoreDialog from "./components/ScoreDialog";
import FinishedDialog from "./components/FinishedDialog";

const COURSES = [
  "CS1010S",
  "CS1101S",
  "CS1231S",
  "CS3213S",
  "MA1521",
  "MA1522",
  "CS2030S",
  "CS2040S",
  "CS2100",
  "CS2101",
  "CS2102",
  "CS2103",
];
const MAX_ROUNDS = 5;
const TROPHIES = ["🥇", "🥈", "🥉"];
const GRADE_MAPPINGS = {
  A: 5.0,
  "A-": 4.5,
  "B+": 4.0,
  B: 3.5,
  "B-": 3.0,
  "C+": 2.5,
  C: 2.0,
  "C-": 1.5,
  D: 1.0,
  F: 0.0,
};

function App() {
  const [showNameDialog, setShowNameDialog] = useState(true);
  const [showScoreDialog, setShowScoreDialog] = useState(false);
  const [showFinishedDialog, setShowFinishedDialog] = useState(false);
  const [name, setName] = useState("");
  const [round, setRound] = useState(0);
  const [leaderboard, setLeaderboard] = useState([
    {
      name: "ZHD1997E",
      score: 4.6,
    },
  ]);
  const [finalResults, setFinalResults] = useState([
    {
      course: "CS1010S",
      grade: "A",
    },
  ]);
  const [finalGrade, setFinalGrade] = useState("");
  const [currentShowScore, setCurrentShowScore] = useState({
    course: "CS1010S",
    grade: "A",
  });

  const updateLeaderboard = async () => {
    const leaderboard = await getLeaderboard();
    setLeaderboard(leaderboard);
  };

  const initMatch = () => {
    setRound(0);
    const randomCourses = COURSES.sort(() => Math.random() - 0.5).slice(0, 5);
    const randomResults = randomCourses.map((course) => {
      return { course: course, grade: "" };
    });
    setFinalResults(randomResults);
  };

  const startMatch = () => {
    setRound(1);
  };

  // Actually starts the next round
  const handleNextRound = () => {
    if (round === MAX_ROUNDS) {
      let totalGrade = 0;
      for (const result of finalResults) {
        totalGrade += GRADE_MAPPINGS[result.grade];
      }
      setFinalGrade((totalGrade / MAX_ROUNDS).toFixed(2));
      setShowFinishedDialog(true);
      return;
    }
    setRound(round + 1);
  };

  // Ends the current round and sets the score
  const handleEndRound = () => {
    const finalResultsCopy = [...finalResults];
    const grade = "A"; // TODO: calculate an actual grade
    finalResultsCopy[round - 1].grade = grade;
    setFinalResults(finalResultsCopy);
    setCurrentShowScore({
      course: finalResultsCopy[round - 1].course,
      grade: grade,
    });
    setShowScoreDialog(true);
  };

  const handleSubmitScore = async () => {
    const leaderboard = await postScore(name, finalGrade);
    setLeaderboard(leaderboard);
    setShowScoreDialog(false);
    initMatch();
    setShowNameDialog(true);
    setName("");
  };

  useEffect(() => {
    updateLeaderboard();
    initMatch();
  }, []);

  return (
    <div className="bg-neutral-800 dark relative w-screen h-screen overflow-x-hidden">
      <ScoreDialog
        setOpen={setShowScoreDialog}
        open={showScoreDialog}
        handleNextRound={handleNextRound}
        moduleInfo={currentShowScore}
      />
      <FinishedDialog
        setOpen={setShowFinishedDialog}
        open={showFinishedDialog}
        finalGrade={finalGrade}
        handleSubmitScore={handleSubmitScore}
      />
      <RetroGrid />
      <div className="p-4 h-full flex flex-col md:overflow-hidden overflow-y-auto">
        {/* Header */}
        <div className="flex md:flex-row flex-col justify-between card-design items-center">
          <h1 className="text-3xl main-text md:mb-0 mb-3">CRASH OUT!</h1>
          <div className="flex items-center">
            <span className="mr-2 font-bold text-neutral-300 text-center">
              <span className="main-text mr-1">Student Name:</span> {name}
            </span>
            <Separator
              orientation="vertical"
              className="flex py-4 bg-slate-500 mr-2"
            />
            <NameDialog
              name={name}
              setOpen={setShowNameDialog}
              open={showNameDialog}
              setName={setName}
            />
          </div>
        </div>
        {/* Main Content */}
        <div className="flex md:flex-row flex-col w-full md:h-full md:mt-4 space-y-4 md:space-y-0 md:space-x-4 md:overflow-hidden">
          {/* Dean's List */}
          <div className="w-full md:w-1/4 card-design order-3 md:order-1 md:mt-0 mt-4">
            <h1 className="main-text text-2xl ">Dean's List</h1>
            <div className="mt-3 space-y-1 h-[90%] overflow-y-auto">
              <ul className="">
                {[...leaderboard].map((player, index) => (
                  <li key={player.name} className="font-bold text-2xl">
                    <span className="text-neutral-600">{index + 1}.</span>{" "}
                    {player.name} -{" "}
                    <span className="secondary-text mr-3">
                      {player.score.toFixed(2)}
                    </span>
                    {index <= 2 ? TROPHIES[index] : ""}
                    <Separator className="bg-main mt-2" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Graph of madness */}
          <div className="h-[calc(100vh-25rem)] md:h-full w-full md:w-1/2 card-design md:order-2">
            <Graph />
          </div>

          {/* Finals Results and Sleep */}
          <div className="w-full md:w-1/4 flex flex-col justify-center space-y-4 md:order-3">
            <div className="md:h-1/4 flex flex-col items-center justify-center card-design">
              {round === 0 ? (
                <>
                  <span className="text-4xl mb-1">💀</span>
                  <span className="mb-2">The dreaded finals approaches...</span>
                  <Button
                    onClick={() => {
                      startMatch();
                    }}
                  >
                    Start Mugging!
                  </Button>
                </>
              ) : (
                <>
                  <span className="text-xs text-neutral-300">
                    Studying for:
                  </span>
                  <h1 className="secondary-text text-2xl">
                    {finalResults[round - 1].course}
                  </h1>
                  <span className="font-semibold text-neutral-300">
                    Module <span className="underline text-main">{round}</span>{" "}
                    out of {MAX_ROUNDS}
                  </span>
                  <Button
                    className="mt-6"
                    onClick={() => {
                      handleEndRound();
                    }}
                  >
                    CRASH OUT 💤
                  </Button>
                </>
              )}
            </div>
            <div className="md:h-3/4 card-design">
              <h3 className="main-text text-2xl mb-2">Finals Results</h3>
              <ul className="list-decimal list-inside">
                <ul className="overflow-hidden">
                  {finalResults.map((course, index) => (
                    <li key={course.course} className="font-bold text-2xl">
                      <span className="text-neutral-600">{index + 1}.</span>{" "}
                      {course.course} -{" "}
                      <span className="secondary-text">{course.grade}</span>
                      <Separator className="bg-main mt-2" />
                    </li>
                  ))}
                </ul>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
