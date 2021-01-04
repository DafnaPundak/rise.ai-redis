import React, { useState } from "react";
import Input from "../input/Input";
import Output from "../output/Output";
import useCommand from "../../hooks/useCommand";
import "./HomeScreen.css";

function HomeScreen() {
  const [commandHistory, setCommandHistory] = useState([
    {
      id: 0,
      text: "",
      type: "",
    },
  ]);
  const { responseToCommand } = useCommand();

  function addCommandToHistory(command, type) {
    setCommandHistory((prevState) => [
      ...prevState,
      { id: prevState[prevState.length - 1].id + 1, text: command, type: type },
    ]);
  }

  async function onSubmit(command) {
    try {
      const type = "command";
      addCommandToHistory(command, type);
      const response = await responseToCommand(command);
      if (response) {
        let type = "";
        if (response.split(/(\s+)/)[0] === "Error:") {
          type = "error";
        } else {
          type = "response";
        }
        addCommandToHistory(response, type);
      }
    } catch (e) {
      console.log(e);
      return "somthing wrong";
    }
  }

  return (
    <div className="container">
      <Output commandHistory={commandHistory} />
      <Input onSubmit={onSubmit} />
    </div>
  );
}

export default HomeScreen;
