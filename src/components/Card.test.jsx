import { render, screen } from "@testing-library/react";
import Card from "components/Card";
import { MemoryRouter } from "react-router-dom";

const { getByText, getAllByText } = screen;

beforeEach(() => {
  render(
    <MemoryRouter>
      <Card pokemon={{}} />
    </MemoryRouter>
  );
});

describe("Card component", () => {
  it("renders filler data", () => {
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Base XP:")).toBeInTheDocument();
    expect(getByText("H:")).toBeInTheDocument();
    expect(getByText("W:")).toBeInTheDocument();
  });
});

