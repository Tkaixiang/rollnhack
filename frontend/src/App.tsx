import { useState } from "react";
import "./App.css";
import NameDialog from "./components/NameDialog";
import { Button } from "./components/ui/button";
import RetroGrid from "./components/ui/retro-grid";
import Graph from "./components/Graph";
import { Separator } from "./components/ui/separator";

function App() {
  const [showDialog, setShowDialog] = useState(true);
  const [name, setName] = useState("THIS IS A NAME");

  return (
    <div className="bg-neutral-800 dark relative w-screen h-screen overflow-x-hidden">
      <RetroGrid />
      <div className="p-4 h-full flex flex-col">
        {/* Header */}
        <div className="flex card-design items-center">
          <h1 className="text-3xl main-text">CRASH OUT!</h1>
          <div>
            <span className="mr-5 font-bold text-neutral-300">
              <span className="main-text mr-1">Student Name:</span> {name}
            </span>
            <Separator className="flex" />
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
            <div className="graph-placeholder">
              <Graph isPaused={false} onPause={() => {}} />
            </div>
          </div>

          {/* Finals Results and Sleep */}
          <div className="w-1/4 flex flex-col justify-center space-y-4">
            <div className="h-1/4 flex justify-center card-design">
              <Button>CRASH OUT</Button>
            </div>
            <div className="h-3/4 card-design">
              <h3 className="main-text text-2xl">Finals Results</h3>
              <ul>
                <li>CS1101S - B</li>
                <li>CS1231S</li>
                <li>CS1101S</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
