import { useState } from "react";
import "./App.css";
import NameDialog from "./components/NameDialog";
import { Button } from "./components/ui/button";

function App() {
  const [showDialog, setShowDialog] = useState(true);

  return (
    <div className="w-screen h-screen overflow-hidden p-4">
      {/* Header */}
      <div className="flex h-18 w-full justify-between">
        <div className="header-title">CRASH OUT!</div>
        <NameDialog setOpen={setShowDialog} open={showDialog} />
      </div>
      {/* Main Content */}
      <div className="flex h-full w-full mt-8">
        {/* Dean's List */}
        <div className="w-1/4">
          <h3>Dean's List</h3>
          <p>1. ZHD1997E - 4.6</p>
        </div>
        {/* Graph of madness */}
        <div className="w-1/2">
          <div className="graph-placeholder">
            <p>Graph Placeholder</p>
          </div>
        </div>

        {/* Finals Results and Sleep */}
        <div className="w-1/4 flex flex-col justify-center">
          <div className="h-1/4 flex justify-center">
            <Button>CRASH OUT</Button>
          </div>
          <div className="h-3/4">
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
  );
}

export default App;
