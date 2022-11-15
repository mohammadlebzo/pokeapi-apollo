import { render, screen } from "@testing-library/react";
import { OPTIONS_MOCK_DATA } from "constants/mocks/MockData";
import userEvent from "@testing-library/user-event";
import SortBy from "components/filters/SortBy";

const { getByRole } = screen;

beforeEach(() => {
  render(
    <SortBy
      setFilter={(data) => data}
      setOffset={(data) => data}
      setSpeciesFilterToggle={(data) => data}
    />
  );
});

describe("SortBy component", () => {
  it("renders the options content", () => {
    const options = OPTIONS_MOCK_DATA.map((option) =>
      getByRole("option", { name: option })
    );
    options.map((option, idx) =>
      expect(option).toHaveTextContent(OPTIONS_MOCK_DATA[idx])
    );
  });

  it("changes the value of the combobox", () => {
    const combobox = getByRole("combobox");
    userEvent.selectOptions(
      combobox,
      getByRole("option", { name: "Name Ascending" })
    );
    expect(combobox).toHaveTextContent("Name Ascending");
  });
});
