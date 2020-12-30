import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders input", () => {
  render(<App />);
  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();
});
