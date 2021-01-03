import React from "react";
import "./Output.css";

const Output = ({ commandHistory }) => {
  return (
    <div className="outputContainer">
      {commandHistory.slice(1).map((command) => {
        if (command.text.split(/(\s+)/)[0] === "Error:") {
          return (
            <div key={command.id} className="error">
              {command.text}
            </div>
          );
        } else {
          return (
            <div key={command.id} className="command">
              > {command.text}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Output;
