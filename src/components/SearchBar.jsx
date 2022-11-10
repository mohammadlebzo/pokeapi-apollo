import styled from "styled-components";
import PropTypes from "prop-types";
import { BACKGROUND, OUTLINE, BORDER } from "constants/styles/StyleParams";
import { useEffect, useRef } from "react";

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

    &:focus {
      outline: 0;
      border-radius: ${BORDER.radius.focus};
      box-shadow: ${OUTLINE.params} ${OUTLINE.color};
    }
  }

  & button {
    float: left;
    width: 20%;
    padding: 0.75rem;
    background: ${BACKGROUND.color.goldenrod};
    font-size: 1.063rem;
    border: none;
    border-left: none;
    cursor: pointer;
    border-radius: 0 0.313rem 0.313rem 0;

    &:hover {
      background: ${BACKGROUND.color.yellow};
    }

    &:focus {
      outline: 0;
      border-radius: ${BORDER.radius.focus};
      box-shadow: ${OUTLINE.params} ${OUTLINE.color};
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

const Wrapper = styled.div`
  display: flex;
  margin-top: 10rem;
  box-sizing: border-box;
  justify-content: center;
`;

const ReaderOnlyLabel = styled.label`
    border: 0;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip; rect(1px, 1px, 1px, 1px);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
`;

function SearchBar({ setSearchName, setPage, setOffset }) {

  const inputRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();

    if (inputRef.current.value) {
      setSearchName({ _ilike: inputRef.current.value });
      setPage(0);
      setOffset(0);
    } else {
      setSearchName({});
      setPage(1);
    }
  };


  return (
    <Wrapper>
      <Form onSubmit={submitHandler}>
        <ReaderOnlyLabel htmlFor="searchInput">Pokemon name</ReaderOnlyLabel>
        <input
          ref={inputRef}
          id="searchInput"
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
        <ReaderOnlyLabel htmlFor="searchButton">
          Search for pokemon name
        </ReaderOnlyLabel>
        <button type="submit" id="searchButton">
          <SearchItem></SearchItem>
        </button>
      </Form>
    </Wrapper>
  );
}

SearchBar.propTypes = {
  offset: PropTypes.number,
  setSearchName: PropTypes.func,
  setPage: PropTypes.func,
  setOffset: PropTypes.func,
};

export default SearchBar;
