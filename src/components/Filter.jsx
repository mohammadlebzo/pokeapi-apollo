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
import { OPTIONS_MOCK_DATA } from "constants/mocks/MockData";

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
  margin-top: 5rem;

  @media screen and (${MEDIA.mobile}) {
    margin-top: 2rem;
    margin-right: 2rem;
    margin-left: 2rem;

    &:first-of-type {
      margin-top: 5rem;
    }
  }
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

const OPTIONS_VALUES = [
  "name.desc",
  "name.asc",
  "height.desc",
  "height.asc",
  "base_experience.desc",
  "base_experience.asc",
];

function Filter({
  defaultSelectTitle,
  labelTitle,
  filterID,
  setFilter,
  setOffset,
  setSpeciesFilterToggle,
  options,
  getPokemons,
}) {
  const option = useRef();

  const handleSelection = (e) => {
    e.preventDefault();

    const content = e.target.value.split(".");
    const contentToObject = JSON.parse(`{"${content[0]}": "${content[1]}"}`);
    setFilter(contentToObject);
    setOffset(0);
    setSpeciesFilterToggle(false);
  };

  return (
    <MainFilterWrapper>
      <FilterSortCard>
        <FilterContainer>
          <ReaderOnlyLabel htmlFor={filterID}>{labelTitle}</ReaderOnlyLabel>
          <select
            ref={option}
            name={filterID}
            id={filterID}
            onChange={
              getPokemons
                ? () => {
                    getPokemons({
                      variables: { filterPokemonID: option.current.value },
                    });
                    setSpeciesFilterToggle(true);
                  }
                : handleSelection
            }
          >
            <option value="" hidden>
              -- {defaultSelectTitle} --
            </option>
            {options
              ? options.map((item) => {
                  return (
                    <option key={item.id} value={`${item.id}`}>
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </option>
                  );
                })
              : OPTIONS_MOCK_DATA.map((data, idx) => {
                  return (
                    <option key={idx} value={OPTIONS_VALUES[idx]}>
                      {data}
                    </option>
                  );
                })}
          </select>
        </FilterContainer>
      </FilterSortCard>
    </MainFilterWrapper>
  );
}

Filter.propTypes = {
  setFilter: PropTypes.func,
  setOffset: PropTypes.func,
  setSpeciesFilterToggle: PropTypes.func,
  options: PropTypes.array,
  getPokemons: PropTypes.func,
  filterID: PropTypes.string,
  labelTitle: PropTypes.string,
  defaultSelectTitle: PropTypes.string,
};

export default Filter;
