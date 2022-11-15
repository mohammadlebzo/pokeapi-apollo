import { render, screen } from "@testing-library/react";
import SpeciesFilter from "./SpeciesFilter";
import { SPECIES_DATA_STATE } from "constants/mocks/MockData";

const { findByRole } = screen;

describe("SpeciesFilter component", () => {
  it("renders the options content", async () => {
    render(
      <SpeciesFilter
        options={SPECIES_DATA_STATE.data.species}
        getPokemons={(data) => data}
        setSpeciesFilterToggle={(data) => data}
      />
    );
    expect(await findByRole("option", { name: "Pidgey" })).toBeInTheDocument();
  });
});
