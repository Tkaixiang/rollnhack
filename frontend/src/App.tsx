import { useState } from "react";
import "./App.css";
import NameDialog from "./components/NameDialog";
import { Button } from "./components/ui/button";
import RetroGrid from "./components/ui/retro-grid";
import Graph from "./components/Graph";
import { Separator } from "./components/ui/separator";

function App() {
  const [showDialog, setShowDialog] = useState(true);
  const [name, setName] = useState("Plebian");
  const [round, setRound] = useState(1);
  const [module, setModule] = useState("CS1101S");

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
            <p>1. ZHD1997E - 4.6</p>
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
                <li className="text-xl text-gray-400">CS1101S - B</li>
                <li className="text-xl text-gray-400">CS1231S - C+</li>
                <li className="text-xl text-gray-400">CS1101S</li>
                <li className="text-xl text-gray-400">MA1522</li>
                <li className="text-xl text-gray-400">MA1521</li>
            </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
