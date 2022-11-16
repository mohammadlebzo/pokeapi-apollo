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
import { MemoryRouter } from "react-router-dom";

const {
  findByText,
  findAllByText,
  getByRole,
  findByRole,
  getAllByRole,
  getByLabelText,
} = screen;

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

const utils = (
  <MemoryRouter>
    <MockedProvider mocks={mocks} addTypename={false}>
      <Tracks />
    </MockedProvider>
  </MemoryRouter>
);

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

  it("renders without error", async () => {
    render(utils);
    expect(await findAllByText("chlorophyll")).toHaveLength(2);
  });

  it("moves to the next and prev pages ", async () => {
    render(utils);
    const nextButton = getByRole("button", { name: "Next" });
    expect(nextButton).toHaveTextContent("Next");

    userEvent.click(nextButton);

    const prevButton = getByRole("button", { name: "Prev" });
    expect(prevButton).toHaveTextContent("Prev");

    userEvent.click(prevButton);

    expect(prevButton).not.toBeInTheDocument(prevButton);
  });

  it("renders the search reasult when pressing the button", async () => {
    render(utils);
    const inputField = getByRole("textbox");
    const searchButton = getAllByRole("button")[0];

    userEvent.type(inputField, "bulbasaur");
    userEvent.click(searchButton);

    expect(await findAllByText("chlorophyll")).toHaveLength(1);

    userEvent.type(inputField, "{selectall}{del}");
    userEvent.click(searchButton);
  });

  it("renders the correct species when changing the combobox value", async () => {
    render(utils);
    const filterCombobox = getByLabelText("Select Pokemon Specy");

    userEvent.selectOptions(
      filterCombobox,
      await findByRole("option", { name: "Pidgey" })
    );
    expect(await findByText("pidgey")).toBeInTheDocument();
  });

  it("renders 'No Data' when there is no matching search results", async () => {
    render(utils);
    const inputField = getByLabelText("Pokemon name");
    const searchButton = getAllByRole("button")[0];

    userEvent.type(inputField, "b");
    userEvent.click(searchButton);

    expect(await findByText("No Data")).toBeInTheDocument();
  });
});
