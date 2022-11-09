import { render, screen } from "@testing-library/react";
import SearchBar from "components/SearchBar";

const { getByRole } = screen;

beforeEach(() => {
  render(<SearchBar />);
});

describe("SearchBar component", () => {
  it("renders the main components", () => {
    expect(getByRole("button")).toBeInTheDocument();
    expect(getByRole("textbox")).toBeInTheDocument();
  });
});