import { render, screen } from "@testing-library/react";
import { IMAGE } from "constants/styles/StyleParams";
import Header from "components/Header";

const { getAllByRole } = screen;

describe("Header component", () => {
  it("renders the logo", () => {
    render(<Header />);
    const logos = getAllByRole("img");
    logos.map((logo) => {
      expect(logo).toHaveAttribute("src", IMAGE.logo);
    });
  });
});
