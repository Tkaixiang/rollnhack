import { useEffect, useState } from "react";
import "./App.css";
import NameDialog from "./components/NameDialog";
import { Button } from "./components/ui/button";
import RetroGrid from "./components/ui/retro-grid";
import Graph from "./components/Graph";
import { Separator } from "./components/ui/separator";
import { getLeaderboard } from "./lib/api";

const courses = [
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

function App() {
  const [showDialog, setShowDialog] = useState(true);
  const [name, setName] = useState("Plebian");
  const [round, setRound] = useState(1);
  const [module, setModule] = useState("CS1101S");
  const [leaderboard, setLeaderboard] = useState([
    {
      name: "ZHD1997E",
      score: 4.6,
    },
  ]);
  const [finalResults, setFinalResults] = useState({});

  const updateLeaderboard = async () => {
    const leaderboard = await getLeaderboard();
    setLeaderboard(leaderboard);
  };

  const setRandomCourses = () => {
    const randomCourses = courses.sort(() => Math.random() - 0.5).slice(0, 5);
    const newResults = {};
    randomCourses.forEach((course) => {
      newResults[course] = "";
    });
    setFinalResults(newResults);
  };

  useEffect(() => {
    updateLeaderboard();
    setRandomCourses();
  }, []);

  return (
    <div className="bg-neutral-800 dark relative w-screen h-screen overflow-x-hidden">
      <RetroGrid />
      <div className="p-4 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between card-design items-center">
          <h1 className="text-3xl main-text">CRASH OUT!</h1>
          <div className="flex items-center">
            <span className="mr-2 font-bold text-neutral-300">
              <span className="main-text mr-1">Student Name:</span> {name}
            </span>
            <Separator
              orientation="vertical"
              className="flex py-4 bg-slate-500 mr-2"
            />
            <NameDialog
              setOpen={setShowDialog}
              open={showDialog}
              setName={setName}
              name={name}
            />
          </div>
        </div>
        {/* Main Content */}
        <div className="flex w-full h-full mt-4 space-x-4">
          {/* Dean's List */}
          <div className="w-1/4 card-design">
            <h1 className="main-text text-2xl ">Dean's List</h1>
            <div className="mt-3 space-y-1 overflow-hidden">
              <ul className="overflow-hidden">
                {[...leaderboard].map((player, index) => (
                  <li className="font-bold text-2xl">
                    <span className="text-neutral-600">{index + 1}.</span>{" "}
                    {player.name} -{" "}
                    <span className="secondary-text">{player.score}</span>
                    <Separator className="bg-main mt-2" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Graph of madness */}
          <div className="w-1/2 card-design">
            <Graph />
          </div>

          {/* Finals Results and Sleep */}
          <div className="w-1/4 flex flex-col justify-center space-y-4">
            <div className="h-1/4 flex flex-col items-center justify-center card-design">
              <span className="text-xs text-neutral-300">Studying for:</span>
              <h1 className="secondary-text text-2xl">{module}</h1>
              <span className="font-semibold text-neutral-300">
                Module <span className="underline text-main">{round}</span> out
                of 5
              </span>
              <Button className="mt-6">CRASH OUT</Button>
            </div>
            <div className="h-3/4 card-design">
              <h3 className="main-text text-2xl mb-2">Finals Results</h3>
              <ul className="list-decimal list-inside">
                <ul className="overflow-hidden">
                  {Object.keys(finalResults).map((course, index) => (
                    <li className="font-bold text-2xl">
                      <span className="text-neutral-600">{index + 1}.</span>{" "}
                      {course} -{" "}
                      <span className="secondary-text">
                        {finalResults[course]}
                      </span>
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
