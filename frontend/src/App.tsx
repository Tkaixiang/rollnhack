import { useState } from "react";
import "./App.css";
import NameDialog from "./components/NameDialog";

function App() {
  const [showDialog, setShowDialog] = useState(true);

  return (
    <div className="w-screen h-screen overflow-hidden">
      {/* Header */}
      <div className="h-18 w-full">
        <div className="header-title">CRASH OUT!</div>
        <button onClick={() => setShowDialog(true)}>Change username</button>
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
        <div className="w-1/4">
          <div className="finals-results">
            <h3>FINALS RESULTS</h3>
            <ul>
              <li>CS1101S - B</li>
              <li>CS1231S</li>
              <li>CS1101S</li>
            </ul>
          </div>
          <button className="sleep-button">CRASH OUT</button>
        </div>
      </div>

      <NameDialog setOpen={setShowDialog} open={showDialog} />
    </div>
  );
}

export default App;
