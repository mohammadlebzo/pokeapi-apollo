import { useQuery, gql } from "@apollo/client";
import Card from "components/Card";
import styled from "styled-components";
import SearchBar from "components/SearchBar";
import Filter from "components/Filter";

import { useState, useEffect } from "react";
import { BACKGROUND, BORDER, FONT } from "constants/styles/StyleParams";

let DEFULT = new Array(20).fill(0);

const DEFULT_TRACK = gql`
  query MyQuery(
    $searchName: String_comparison_exp!
    $filter: [pokemon_v2_pokemon_order_by!]
    $offset: Int!
  ) {
    pokemon: pokemon_v2_pokemon(
      limit: 20
      offset: $offset
      where: { name: $searchName }
      order_by: $filter
    ) {
      id
      name
      height
      weight
      base_experience
      abilities: pokemon_v2_pokemonabilities(limit: 2) {
        pokemon_v2_ability {
          id
          name
        }
      }
    }
    pokeNum: pokemon_v2_pokemon_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const Button = styled.button`
  &:first-of-type {
    margin: 0;
  }

  margin-left: 1rem;
  color: ${FONT.color.black};
  padding: 0.938rem 2rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;

  border: solid 0.188rem ${BORDER.color.black};
  cursor: pointer;

  &:hover,
  &:focus {
    outline: 0;
    background-color: ${BACKGROUND.color.goldenrod};
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 10rem;
`;

const CardsWrapper = styled.div`
  width: 80%;

  padding: 1.625rem 0.625rem 0.75rem 0.625rem;
  white-space: normal;
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
  align-items: center;
`;

const MainWrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`;

const NoDataMessege = styled.p`
  font-family: ${FONT.family.main};
  font-size: 3rem;
  font-weight: bold;
  margin-top: 10rem;
`;

function Tracks() {
  const [searchName, setSearchName] = useState({});
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);

  const [offset, setOffset] = useState(0);

  const handlePageNext = (e) => {
    e.preventDefault();

    setPage((prev) => (prev += 1));
    setOffset((prev) => (prev += 20));
  };

  const handlePagePrev = (e) => {
    e.preventDefault();

    setPage((prev) => (prev -= 1));
    setOffset((prev) => (prev -= 20));
  };

  const { loading, error, data, refetch } = useQuery(DEFULT_TRACK, {
    variables: { searchName, filter, offset },
  });

  let remaining = data?.pokeNum?.aggregate?.count;

  useEffect(() => {
    refetch();
  }, [searchName, filter, page]);

  if (error) return <p>{`Error! ${error.message}`}</p>;

  return (
    <>
      <SearchBar
        setSearchName={setSearchName}
        setPage={setPage}
        setOffset={setOffset}
        offset={offset}
      />
      {page > 0 && <Filter setFilter={setFilter} setOffset={setOffset} />}
      <MainWrapper>
        <CardsWrapper>

          {data?.pokemon?.map((pokemon) => {
            return <Card key={pokemon.id} pokemon={pokemon} />;
          }) ??
            DEFULT.map((defPokemon, idx) => {
              return <Card key={idx} pokemon={{}} />;
            })}

          {data?.pokemon?.length == 0 && <NoDataMessege>No Data</NoDataMessege>}
        </CardsWrapper>
      </MainWrapper>
      <ButtonsWrapper>
        {page !== 0 && (
          <>
            {page !== 1 && <Button onClick={handlePagePrev}>Prev</Button>}
            {!(offset + 20 >= remaining) && (
              <Button onClick={handlePageNext}>Next</Button>
            )}
          </>
        )}
      </ButtonsWrapper>
    </>
  );
}

export { DEFULT_TRACK };
export default Tracks;
