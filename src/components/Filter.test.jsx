import { render, screen } from "@testing-library/react";
import {
  OPTIONS_MOCK_DATA,
  SPECIES_DATA_STATE,
} from "constants/mocks/MockData";
import userEvent from "@testing-library/user-event";
import Filter from "components/Filter";

const { getByRole, findByRole } = screen;

const utils = (
  <Filter
    filterID={"sortBy"}
    labelTitle={"Sort pokemons by"}
    defaultSelectTitle={"Select Sort Option"}
    setFilter={(data) => data}
    setOffset={(data) => data}
    setSpeciesFilterToggle={(data) => data}
  />
);

describe("Filter component", () => {
  it("renders the options content for the 'Sort By' filter", () => {
    render(utils);
    const options = OPTIONS_MOCK_DATA.map((option) =>
      getByRole("option", { name: option })
    );
    options.map((option, idx) =>
      expect(option).toHaveTextContent(OPTIONS_MOCK_DATA[idx])
    );
  });

  it("changes the value of the combobox for 'Sort By' filter", () => {
    render(utils);
    const combobox = getByRole("combobox");
    userEvent.selectOptions(
      combobox,
      getByRole("option", { name: "Name Ascending" })
    );
    expect(combobox).toHaveTextContent("Name Ascending");
  });

    it("renders the options content for the 'Species' filter", async () => {
      render(
        <Filter
          filterID={"filterSpecy"}
          labelTitle={"Select Pokemon Specy"}
          defaultSelectTitle={"Select Specy"}
          options={SPECIES_DATA_STATE.data.species}
          getPokemons={(data) => data}
          setSpeciesFilterToggle={(data) => data}
        />
      );
      expect(await findByRole("option", { name: "Pidgey" })).toBeInTheDocument();
    });
});
