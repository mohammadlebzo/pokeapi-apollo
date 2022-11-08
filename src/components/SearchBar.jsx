import styled from "styled-components";
import PropTypes from "prop-types";
import { BACKGROUND } from "constants/styles/StyleParams";

import { useRef } from "react";

const Wrapper = styled.div`
  display: flex;
  margin-top: 10rem;
  box-sizing: border-box;
  justify-content: center;
`;

const Form = styled.form`
  width: 60%;
  display: flex;

  & input {
    padding: 0.75rem;
    font-size: 1.063rem;
    border: none;
    float: left;
    width: 80%;
    background: ${BACKGROUND.color.veryLightBlack};
    border-radius: 0.313rem 0 0 0.313rem;
  }

  & button {
    float: left;
    width: 20%;
    padding: 0.75rem;
    background: ${BACKGROUND.color.goldenrod};
    // color: white;
    font-size: 1.063rem;
    border: none;
    border-left: none;
    cursor: pointer;
    border-radius: 0 0.313rem 0.313rem 0;

    &:hover {
      background: ${BACKGROUND.color.yellow};
    }
  }
`;

const SearchItem = styled.span`
  background-image: url(${BACKGROUND.iconURL.search});
  font-size: 2.1rem;
  display: inline-flex;
  min-width: 2.1rem;
  min-height: 2.1rem;
  width: 2.1rem;
  height: 2.1rem;
`;

function SearchBar({ setSearchName, setPage }) {
  const inputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    if (inputRef.current.value) {
      setSearchName({ _ilike: inputRef.current.value });
      setPage(0);
    } else {
      setSearchName({});
      setPage(1);
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={submitHandler}>
        <input
          ref={inputRef}
          name="searchInput"
          type="text"
          placeholder="Search.."
          onChange={(e) => {
            e.preventDefault();
            if (!e.target.value) {
              setSearchName({});
              setPage(1);
            }
          }}
        />
        <button type="submit">
          <SearchItem></SearchItem>
        </button>
      </Form>
    </Wrapper>
  );
}

SearchBar.propTypes = {
  setSearchName: PropTypes.func,
  setPage: PropTypes.func,
};

export default SearchBar;
