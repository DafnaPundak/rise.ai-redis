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
    },
  ]);
  const { responseToCommand } = useCommand();

  function addCommandToHistory(command) {
    setCommandHistory((prevState) => [
      ...prevState,
      { id: prevState[prevState.length - 1].id + 1, text: command },
    ]);
  }

  async function onSubmit(command) {
    try {
      addCommandToHistory(command);
      const response = await responseToCommand(command);
      if (response) {
        addCommandToHistory(response);
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
