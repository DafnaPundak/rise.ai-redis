import React from "react";
import "./Output.css";

const Output = ({ commandHistory }) => {
  return (
    <div className="outputContainer">
      {commandHistory.slice(1).map((command) => {
        if (command.type === "error") {
          return (
            <div key={command.id} className="error">
              {command.text}
            </div>
          );
        } else if (command.type === "command") {
          return (
            <div key={command.id} className="command">
              > {command.text}
            </div>
          );
        } else {
          return (
            <div key={command.id} className="command">
              {command.text}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Output;
