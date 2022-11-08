import { render, screen } from "@testing-library/react";
import { OPTIONS_MOCK_DATA } from "constants/styles/mocks/MockData";
import userEvent from "@testing-library/user-event";
import Filter from "components/Filter";

const { getByRole } = screen;

beforeEach(() => {
  render(<Filter setFilter={(data) => data} />);
});

describe("Filter component", () => {
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
