import { render, screen } from "@testing-library/react";
import Card from "components/Card";
import { MemoryRouter } from "react-router-dom";

const { getByText } = screen;

describe("Card component", () => {
  it("renders filler data", () => {
    render(
      <MemoryRouter>
        <Card pokemon={{}} />
      </MemoryRouter>
    );
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Base XP:")).toBeInTheDocument();
    expect(getByText("H:")).toBeInTheDocument();
    expect(getByText("W:")).toBeInTheDocument();
  });
});
