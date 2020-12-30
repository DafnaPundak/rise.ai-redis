import React, { useState } from "react";
import "./Input.css";

function Input({ onSubmit }) {
  const [command, setCommand] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(command);
    setCommand("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <input
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="input"
          type="text"
        />
      </form>
    </div>
  );
}

export default Input;
