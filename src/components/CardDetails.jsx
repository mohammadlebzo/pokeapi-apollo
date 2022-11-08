import { FONT, IMAGE, BACKGROUND } from "constants/styles/StyleParams";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const DEFULT_TRACK = gql`
  query MyQuery($pokeid: Int!) {
    pokemon: pokemon_v2_pokemon(where: { id: { _eq: $pokeid } }) {
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
  }
`;

const Wrapper = styled.div`
  &:last-of-type {
    margin-bottom: 6.125rem;
  }

  display: flex;
  justify-content: center;

  font-family: ${FONT.family.main};
`;

const ImageWrapper = styled.div`
  width: 50%;
  box-shadow: 0.063rem 0.313rem 0.313rem 0.063rem rgba(0, 0, 0, 0.3);
  border-radius: 0.625rem;

  & img {
    width: 100%;
    height: 100%;
    border-radius: 0.625rem 0.625rem 0 0;
  }
`;

const InfoWrapper = styled.div`
  width: 50%;
  box-shadow: 0.063rem 0.313rem 0.313rem 0.063rem rgba(0, 0, 0, 0.3);
  border-radius: 0.625rem;
`;

const Content = styled.div`
  width: 100%;
  height: 15rem;
`;

const InfoSectionWrapperFloat = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  float: ${(props) => props.floatSide};
`;

const CardText = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
`;

const CardTextWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CardTitle = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  text-transform: capitalize;
  color: black;
`;

const InnerInfoTitle = styled.p`
  clear: both;
  font-size: 1.8rem;
  padding-top: 1rem;
  margin-bottom: 0;
  font-weight: bold;
`;

const InfoSectionWrapperClear = styled.div`
  clear: both;
`;

const AbilitiesWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
`;

const Button = styled(Link)`
  color: ${FONT.color.black};
  padding: 0.738rem 1.2rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  border-radius: 2rem;
  border: solid 0.188rem black;
  cursor: pointer;

  &:hover {
    background-color: ${BACKGROUND.color.goldenrod};
  }
`;

const ButtonsWrapper = styled.div`
  position: absolute;
  top: 8rem;
  left: 3rem;
  display: flex;
  justify-content: center;
`;

function CardDetails() {
  let pokeid = parseInt(useParams().pokeid);

  const { loading, error, data } = useQuery(DEFULT_TRACK, {
    variables: { pokeid },
  });

  if (error) return `Error! ${error.message}`;

  return (
    <>
      <ButtonsWrapper>
        <Button to={"/"}>Back</Button>
      </ButtonsWrapper>

      <Wrapper style={{ marginTop: "8.125rem" }}>
        <ImageWrapper>
          <img src={IMAGE.card} alt="" />
        </ImageWrapper>
      </Wrapper>

      <Wrapper>
        <InfoWrapper>
          <Content>
            <TitleWrapper>
              <CardTitle to={"details"}>
                {data?.pokemon[0]?.name ?? "Name?"}
              </CardTitle>
            </TitleWrapper>
            <InfoSectionWrapperFloat floatSide={"right"}>
              <CardText>
                <b>Base XP:</b> {data?.pokemon[0]?.base_experience ?? "000"}
              </CardText>
            </InfoSectionWrapperFloat>

            <InfoSectionWrapperFloat floatSide={"left"}>
              <CardTextWrapper>
                <CardText>
                  <b>Height:</b> {data?.pokemon[0]?.height ?? "00"}
                </CardText>

                <CardText>
                  <b>Weight:</b> {data?.pokemon[0]?.weight ?? "00"}
                </CardText>
              </CardTextWrapper>
            </InfoSectionWrapperFloat>

            <Wrapper>
              <InnerInfoTitle>Abilities</InnerInfoTitle>
            </Wrapper>

            <Wrapper>
              <AbilitiesWrapper>
                {data?.pokemon[0]?.abilities?.map((ability) => {
                  return (
                    <InfoSectionWrapperClear
                      key={ability.pokemon_v2_ability.id}
                    >
                      <CardText
                        style={{
                          marginTop: "0.188rem",
                          marginBottom: "0.188rem",
                          textTransform: "capitalize",
                        }}
                      >
                        {ability?.pokemon_v2_ability?.name}
                      </CardText>
                    </InfoSectionWrapperClear>
                  );
                })}
              </AbilitiesWrapper>
            </Wrapper>
          </Content>
        </InfoWrapper>
      </Wrapper>
    </>
  );
}

export { DEFULT_TRACK };
export default CardDetails;
