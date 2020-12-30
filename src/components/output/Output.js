import React from "react";
import "./Output.css";

const Output = ({ commandHistory }) => {
  return (
    <div className="outputContainer">
      {commandHistory.map((command) => {
        if (command.split(/(\s+)/)[0] === "Error:") {
          return <div className="error">{command}</div>;
        } else {
          return (
            <div key={commandHistory.indexOf(command)} className="command">
              > {command}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Output;
