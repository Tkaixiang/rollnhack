import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NameDialog from './components/NameDialog'

function App() {
  const [count, setCount] = useState(0)
  const [showDialog, setShowDialog] = useState(true) 

  return (
    <div className="app-container"> 
      {/* Header */}
      <div className="header">
        <div className="header-title">CRASH OUT</div>
        <div className="header-icon">?</div>
        <button onClick={() => setShowDialog(true)}>Change username</button> 
      </div>       
    {/* Main Content */}
      <div className="main-content">
        {/* Dean's List */}
        <div className="deans-list">
          <h3>Dean's List</h3>
          <p>1. ZHD1997E - 4.6</p>
      </div>
      {/* Graph of madness */}
      <div className="graph-section">
        <div className="graph-placeholder">
          <p>Graph Placeholder</p>
        </div>
      </div>

      {/* Finals Results and Sleep */}
        <div className="side-section">
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

      {/* Conditional rendering for the NameDialog */}
      {showDialog && (
        <div className="modal-overlay">
          <div className="modal">
            <NameDialog onClose={() => setShowDialog(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App

