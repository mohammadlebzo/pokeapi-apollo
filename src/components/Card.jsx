import { IMAGE, FONT, BORDER, OUTLINE } from "constants/styles/StyleParams";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const CardCateg = styled.div`
  margin: 0.625rem;
  margin-bottom: 0.625rem;
  background: linear-gradient(to right, goldenrod, yellow, goldenrod);
  border-radius: 0.313rem;
  border: solid 0.313rem ${BORDER.color.black};
`;

const CardWrapper = styled.div`
  width: 18.75rem;
  height: 22.5rem;
  position: relative;
  box-shadow: 0 0.313rem 0.313rem 0 rgba(0, 0, 0, 0.3);
`;

const CardContent = styled.div`
  font-family: ${FONT.family.main};
`;

const CardTitle = styled(Link)`
  font-size: 1.25rem;
  font-weight: bold;
  padding-left: 0.625rem;
  text-transform: capitalize;
  text-decoration: none;
  color: ${FONT.color.black};

  &:focus {
    outline: 0;
    border-radius: ${BORDER.radius.focus};
    box-shadow: ${OUTLINE.params} ${OUTLINE.color};
  }

  &:hover {
    color: ${FONT.color.yellow};
    cursor: pointer;
  }
`;

const CardText = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const CardTextAbilities = styled(CardText)`
  margin-top: 0.188rem;
  margin-bottom: 0.188rem;
  text-transform: capitalize;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.25rem;
`;

const InfoWrapper = styled.div`
  border-radius: 0.313rem;
  border: solid 0.188rem ${BORDER.color.black};
  margin-left: 1.25rem;
  margin-right: 1.25rem;
  height: 7.5rem;
`;

const Image = styled.img`
  width: 100%;
  border: solid 0.188rem ${BORDER.color.black};
  border-radius: 0.25rem;
`;

const InfoSectionWrapperFloat = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  float: ${(props) => props.floatSide};
`;

const InfoSectionWrapperClear = styled.div`
  display: flex;
  justify-content: center;
  clear: both;
`;

const InnerInfoTitle = styled.p`
  clear: both;
  margin-left: 1.25rem;
  font-size: 1.125rem;
  margin-bottom: 0;
  font-weight: bold;
`;

const TitleWrapper = styled.div`
  margin-top: 1.25rem;
  margin-left: 1.25rem;
  margin-right: 1.25rem;
  background-color: goldenrod;
  box-shadow: 0.063rem 0.313rem 0.313rem 0.063rem rgba(0, 0, 0, 0.3);
`;

function Card({ pokemon }) {
  return (
    <CardCateg>
      <CardWrapper>
        <CardContent>
          <TitleWrapper>
            <CardTitle to={`details/${pokemon.id}`}>
              {pokemon?.name ?? "Name"}
            </CardTitle>
          </TitleWrapper>

          <ImageWrapper>
            <Image src={IMAGE.card} alt="Pokemon Logo" />
          </ImageWrapper>

          <InfoWrapper>
            <InfoSectionWrapperFloat floatSide={"right"}>
              <CardText>
                <b>Base XP:</b> {pokemon?.base_experience ?? "000"}
              </CardText>
            </InfoSectionWrapperFloat>

            <InfoSectionWrapperFloat floatSide={"left"}>
              <CardText>
                <b>H:</b> {pokemon?.height ?? "00"} <b>W:</b>{" "}
                {pokemon?.weight ?? "00"}
              </CardText>
            </InfoSectionWrapperFloat>

            <InnerInfoTitle>Abilities:</InnerInfoTitle>

            {pokemon &&
              pokemon?.abilities?.map((ability) => {
                return (
                  <InfoSectionWrapperClear key={ability.pokemon_v2_ability.id}>
                    <CardTextAbilities>
                      {ability.pokemon_v2_ability.name}
                    </CardTextAbilities>
                  </InfoSectionWrapperClear>
                );
              })}
          </InfoWrapper>
        </CardContent>
      </CardWrapper>
    </CardCateg>
  );
}

Card.propTypes = {
  pokemon: PropTypes.object,
};

export default Card;
