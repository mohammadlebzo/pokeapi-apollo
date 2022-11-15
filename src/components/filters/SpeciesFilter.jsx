import {
  FONT,
  BACKGROUND,
  MEDIA,
  BORDER,
  OUTLINE,
} from "constants/styles/StyleParams";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useRef } from "react";

const FilterSortCard = styled.div`
  &:first-of-type {
    margin-top: 0;
  }

  margin-top: 0.75rem;
  min-width: 16.25rem;
  width: 16.25rem;
  border: 0.063rem solid ${BORDER.color.lightGray};
  border-radius: ${BORDER.radius.default};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: hidden;
  box-shadow: 0 0.25rem 0.5rem ${BACKGROUND.color.veryLightBlack};

  // margin-right: 18rem;

  @media screen and (${MEDIA.mobile}) {
    min-width: 100%;
    width: 100%;
    margin-right: 0;
    display: flex;
    justify-content: center;
  }
`;

const FilterContainer = styled.div`
  border-top: 0.063rem solid ${BORDER.color.veryLightGray};
  padding: 0.2rem 1rem 1rem 1rem;
  background-color: ${BACKGROUND.color.goldenrod};
  width: 100%;

  & h3 {
    display: inline-flex;
    font-size: 1rem;
    font-weight: 300;
    margin-bottom: 0.625rem;
  }

  & select {
    width: 100%;
    margin-top: 0.8rem;
    font-family: ${FONT.family.main};
    font-size: 0.9rem;
    font-weight: 500;
    border-width: 0;
    outline: 0;
    position: relative;
    padding: 0.375rem 0.75rem;

    background-color: ${BACKGROUND.color.grayBG1_base};
    border-radius: 0.25rem;

    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out,
      border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    cursor: pointer;

    &:focus {
      outline: 0;
      border-radius: ${BORDER.radius.focus};
      box-shadow: ${OUTLINE.params} ${OUTLINE.color};
    }

    & option {
      background-color: ${BACKGROUND.color.white};
      font-weight: 600;
    }

    & option:hover {
      background-color: ${BACKGROUND.color.grayBG1_hover};
    }
  }

  & select:hover {
    background-color: ${BACKGROUND.color.grayBG1_hover};
  }
`;

const MainFilterWrapper = styled.div`
  justify-content: left;
  display: flex;
  margin-top: 5rem;
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

function SpeciesFilter({ options, getPokemons, setSpeciesFilterToggle }) {
  const option = useRef();

  return (
    <MainFilterWrapper>
      <FilterSortCard>
        <FilterContainer>
          <ReaderOnlyLabel htmlFor="filter">Select Pokemon Specy</ReaderOnlyLabel>
          <select
            ref={option}
            name="filter"
            id="filter"
            onChange={() => {
              getPokemons({
                variables: { filterPokemonID: option.current.value },
              });
              setSpeciesFilterToggle(true);
            }}
          >
            <option value="" selected disabled hidden>
              -- Select Specy --
            </option>
            {options?.map((item) => {
              return (
                <option value={`${item.id}`}>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </option>
              );
            })}
          </select>
        </FilterContainer>
      </FilterSortCard>
    </MainFilterWrapper>
  );
}

SpeciesFilter.propTypes = {
  options: PropTypes.array,
  getPokemons: PropTypes.func,
  setSpeciesFilterToggle: PropTypes.func,
};

export default SpeciesFilter;
