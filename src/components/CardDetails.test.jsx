import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { DETAILS_MOCK_RESULT } from "constants/styles/mocks/MockData";
import { DEFULT_TRACK } from "components/CardDetails";
import CardDetails from "components/CardDetails";
import { MemoryRouter } from "react-router-dom";

const { findByText, findAllByText, getByRole, getAllByRole } = screen;

const mocks = [
  {
    request: {
      query: DEFULT_TRACK,

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
      query: DEFULT_TRACK,
      variables: { pokeid: 1, },
    },
    error: new Error("An error occurred"),
  },
];

describe("Tracks component", () => {
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

  beforeEach(() => {
    window.history.pushState({}, 'pokeid', '/details/1');

    console.log(global.window.location.href);

    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <CardDetails />
        </MockedProvider>
      </MemoryRouter>
    );
  });

  it("renders without error", async () => {
    expect(await findByText("bulbasaur")).toBeInTheDocument();
  });

  //   it("moves to the next and prev pages ", async () => {
  //     const nextButton = getByRole("button", { name: "Next" });
  //     expect(nextButton).toHaveTextContent("Next");

  //     act(() => userEvent.click(nextButton));

  //     const prevButton = getByRole("button", { name: "Prev" });
  //     expect(prevButton).toHaveTextContent("Prev");

  //     act(() => userEvent.click(prevButton));

  //     expect(prevButton).not.toBeInTheDocument(prevButton);
  //   });

  //   it("renders the search reasult when pressing the button", async () => {
  //     // expect(getByRole("")).toBeInTheDocument()
  //     const inputField = getByRole("textbox");
  //     const searchButton = getAllByRole("button")[0];

  //     act(() => userEvent.type(inputField, "bulbasaur"));
  //     act(() => userEvent.click(searchButton));

  //     expect(await findAllByText("chlorophyll")).toHaveLength(1);

  //     act(() => userEvent.type(inputField, "{selectall}{del}"));
  //     act(() => userEvent.click(searchButton));
  //   });
});
