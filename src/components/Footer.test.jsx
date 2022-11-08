import { render, screen } from "@testing-library/react";
import Footer from "components/Footer";

const { getByRole } = screen;

describe("Footer component", () => {
  it("renders the footer", () => {
    render(<Footer />);
    expect(getByRole("contentinfo")).toBeInTheDocument();
  });
});
