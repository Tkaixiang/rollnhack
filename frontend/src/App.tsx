import { useState } from "react";
import "./App.css";
import NameDialog from "./components/NameDialog";
import { Button } from "./components/ui/button";
import RetroGrid from "./components/ui/retro-grid";
import Graph from "./components/Graph";

function App() {
  const [showDialog, setShowDialog] = useState(true);

  return (
    <div className="bg-neutral-800 dark relative w-screen h-screen overflow-x-hidden">
      <RetroGrid />
      <div className="p-4 h-full flex flex-col">
        {/* Header */}
        <div className="flex card-design items-center">
          <h1 className="text-3xl font-extrabold relative [text-shadow:_2px_2px_0_rgb(0_0_0),_4px_4px_0_rgb(203_213_225)] text-main">
            CRASH OUT!
          </h1>
          <NameDialog setOpen={setShowDialog} open={showDialog} />
        </div>
        {/* Main Content */}
        <div className="flex w-full h-full mt-4 space-x-4">
          {/* Dean's List */}
          <div className="w-1/4 card-design">
            <h1 className="main-text">Dean's List</h1>
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
              <h3>FINALS RESULTS</h3>
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
