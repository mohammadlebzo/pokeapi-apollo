import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { DETAILS_MOCK_RESULT } from "constants/mocks/MockData";
import { DETAILS_TRACK } from "components/CardDetails";
import CardDetails from "components/CardDetails";
import { MemoryRouter } from "react-router-dom";
import { IMAGE } from "constants/styles/StyleParams";

const { findByText, getByRole, getByText } = screen;

const mocks = [
  {
    request: {
      query: DETAILS_TRACK,
      variables: {
        pokeid: 1,
      },
    },

    result: DETAILS_MOCK_RESULT,
  },
];

const errorMock = [
  {
    request: {
      query: DETAILS_TRACK,
      variables: { pokeid: 1 },
    },
    error: new Error("An error occurred"),
  },
];

const utils = (
  <MemoryRouter>
    <MockedProvider mocks={mocks} addTypename={false}>
      <CardDetails />
    </MockedProvider>
  </MemoryRouter>
);

describe("CardDetails component", () => {
  it("renders an error messege", async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={errorMock} addTypename={false}>
          <CardDetails />
        </MockedProvider>
      </MemoryRouter>
    );

    expect(
      await screen.findByText("Error! An error occurred")
    ).toBeInTheDocument();
  });

  it("renders without error", async () => {
    render(utils)
    expect(await findByText("bulbasaur")).toBeInTheDocument();
  });

  it("renders constants", () => {
    render(utils)
    expect(getByRole("img")).toHaveAttribute("src", IMAGE.card);
    expect(getByText("Base XP:")).toBeInTheDocument();
    expect(getByText("Height:")).toBeInTheDocument();
    expect(getByText("Weight:")).toBeInTheDocument();
    expect(getByText("Abilities")).toBeInTheDocument();
  });
});
