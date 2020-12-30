import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Input from "../input/Input";
import Output from "../output/Output";

test("output 'SET' in the output container", async () => {
  const command = ["SET"];

  render(
    <div>
      <Output commandHistory={command} />
      <Input onSubmit={command} />
    </div>
  );
  const output = await waitFor(() => screen.getByText(/set/i));
  expect(output).toBeInTheDocument();
});
