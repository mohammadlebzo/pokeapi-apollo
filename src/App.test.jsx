import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { DEFULT_TRACK_MOCK_RESULT } from "constants/styles/mocks/MockData";
import { DEFULT_TRACK } from "pages/Tracks";
import App from "App";

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
];

describe("App component", () => {
  it("renders", () => {
    render(
      <MemoryRouter>
        <MockedProvider>
          <App />
        </MockedProvider>
      </MemoryRouter>
    );
  });
});
