import { FONT, IMAGE, BACKGROUND, BORDER } from "constants/styles/StyleParams";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

// Tracks
const DETAILS_TRACK = gql`
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

// Styled Components
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
  border: solid 0.188rem ${BORDER.color.black};
  cursor: pointer;

  &:hover,
  &:focus {
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

const Content = styled.div`
  width: 100%;
  height: 15rem;
`;

const CardText = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
`;

const CardTextAbilities = styled(CardText)`
  margin-top: 0.188rem;
  margin-bottom: 0.188rem;
  text-transform: capitalize;
`;

const CardTextWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
`;

const CardTitle = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  text-transform: capitalize;
  color: ${FONT.color.black};
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

const InfoSectionWrapperFloat = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  float: ${(props) => props.floatSide};
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

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  &:last-of-type {
    margin-bottom: 6.125rem;
  }

  display: flex;
  justify-content: center;

  font-family: ${FONT.family.main};
`;

const WrapperForImageSection = styled(Wrapper)`
  margin-top: 1.125rem;
`;

function CardDetails() {
  const pokeid = parseInt(useParams().pokeid) || 1;

  const { error, data } = useQuery(DETAILS_TRACK, {
    variables: { pokeid },
  });

  if (error) return `Error! ${error.message}`;

  return (
    <>
      <ButtonsWrapper>
        <Button to={"/"}>Back</Button>
      </ButtonsWrapper>

      <WrapperForImageSection>
        <ImageWrapper>
          <img src={IMAGE.card} alt="Pokemon Logo" />
        </ImageWrapper>
      </WrapperForImageSection>

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
                      <CardTextAbilities>
                        {ability?.pokemon_v2_ability?.name}
                      </CardTextAbilities>
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

export { DETAILS_TRACK };
export default CardDetails;
