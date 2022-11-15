import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { DEFULT_TRACK, SELECTED_POKEMON_TRACK } from "pages/Tracks";
import {
  DEFULT_TRACK_MOCK_RESULT,
  SEARCH_MOCK_RESULT,
  NO_DATA_MOCK_RESULT,
  SPECISES_FILTER_DATA_RESULT,
} from "constants/mocks/MockData";
import Tracks from "pages/Tracks";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

const { findByText, findAllByText, getByRole, findByRole, getAllByRole, getByLabelText, findAllByRole } =
  screen;

const mocks = [
  {
    request: {
      query: DEFULT_TRACK,

      variables: {
        searchName: {},
        filter: {},
        offset: 0,
      },
    },

    result: DEFULT_TRACK_MOCK_RESULT,
  },
  {
    request: {
      query: DEFULT_TRACK,

      variables: {
        searchName: { _ilike: "bulbasaur" },
        filter: {},
        offset: 0,
      },
    },

    result: SEARCH_MOCK_RESULT,
  },
  {
    request: {
      query: DEFULT_TRACK,

      variables: {
        searchName: { _ilike: "b" },
        filter: {},
        offset: 0,
      },
    },

    result: NO_DATA_MOCK_RESULT,
  },
  {
    request: {
      query: SELECTED_POKEMON_TRACK,

      variables: {
        filterPokemonID: "16",
      },
    },

    result: SPECISES_FILTER_DATA_RESULT,
  },
];

const errorMocks = [
  {
    request: {
      query: DEFULT_TRACK,
      variables: { searchName: {}, filter: {}, offset: 0 },
    },
    error: new Error("An error occurred"),
  },
];

describe("Tracks component", () => {
  it("renders an error messege", async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={errorMocks} addTypename={false}>
          <Tracks />
        </MockedProvider>
      </MemoryRouter>
    );

    expect(
      await screen.findByText("Error! An error occurred")
    ).toBeInTheDocument();
  });

  beforeEach(() => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Tracks />
        </MockedProvider>
      </MemoryRouter>
    );
  });

  it("renders without error", async () => {
    expect(await findAllByText("chlorophyll")).toHaveLength(2);
  });

  it("moves to the next and prev pages ", async () => {
    const nextButton = getByRole("button", { name: "Next" });
    expect(nextButton).toHaveTextContent("Next");

    act(() => userEvent.click(nextButton));

    const prevButton = getByRole("button", { name: "Prev" });
    expect(prevButton).toHaveTextContent("Prev");

    act(() => userEvent.click(prevButton));

    expect(prevButton).not.toBeInTheDocument(prevButton);
  });

  it("renders the search reasult when pressing the button", async () => {
    const inputField = getByRole("textbox");
    const searchButton = getAllByRole("button")[0];

    act(() => userEvent.type(inputField, "bulbasaur"));
    act(() => userEvent.click(searchButton));

    expect(await findAllByText("chlorophyll")).toHaveLength(1);

    act(() => userEvent.type(inputField, "{selectall}{del}"));
    act(() => userEvent.click(searchButton));
  });

  it("renders the correct species when changing the combobox value", async () => {
    const filterCombobox = getByLabelText("Select Pokemon Specy")

    // expect(await findByRole("option", {name: "Pidgey"})).toBeInTheDocument();

    userEvent.selectOptions(filterCombobox, await findByRole("option", { name: "Pidgey" }))
    expect(await findByText("pidgey")).toBeInTheDocument();
  });

  it("renders 'No Data' when there is no matching search results", async () => {
    const inputField = getByLabelText("Pokemon name");
    const searchButton = getAllByRole("button")[0];

    act(() => userEvent.type(inputField, "b"));
    act(() => userEvent.click(searchButton));

    expect(await findByText("No Data")).toBeInTheDocument();
  });
});
