import { render, screen } from "@testing-library/react";
import SearchBar from "components/SearchBar";

const { getByRole } = screen;

describe("SearchBar component", () => {
  it("renders the main components", () => {
    render(<SearchBar />);
    expect(getByRole("button")).toBeInTheDocument();
    expect(getByRole("textbox")).toBeInTheDocument();
  });
});
