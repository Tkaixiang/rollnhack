import './NameDialog.css'

function NameDialog({ onClose }) {
    return (
      <div>
        <h1 className="name-dialog-title">What is your name?</h1>
        <input type="text" />
        <button onClick={onClose}>Let's go!</button>
      </div>
    );
  }

export default NameDialog