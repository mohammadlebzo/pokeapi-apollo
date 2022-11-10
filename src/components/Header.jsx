import { FONT, BACKGROUND, IMAGE, MEDIA, OUTLINE, BORDER } from "constants/styles/StyleParams";
import styled from "styled-components";

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  @media screen and (${MEDIA.mobile}) {
    width: 100%;
    overflow: hidden;
    animation: none;
  }
`;

const HeaderEl = styled.header`
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${BACKGROUND.color.goldenrod};
  width: 100%;
  z-index: 10;
  transition: top 0.2s linear;
  @media screen and (${MEDIA.mobile}) {
    width: 100vw;
  }
`;

const LogoWrapper = styled.a`
  &:focus {
    outline: 0;
    border-radius: ${BORDER.radius.focus};
    box-shadow: ${OUTLINE.params} ${OUTLINE.color};
  }
  @media screen and (${MEDIA.mobile}) {
    display: none;
  }
`;

const LogoMobile = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  max-width: 87.5rem;
  width: 100%;
  padding: 0 2.5rem;
  @media screen and (${MEDIA.mobile}) {
    padding: 0 1rem;
  }
`;

const SubMedia = styled.div`
  display: flex;
  justify-content: center;
  overflow: visible;
  @media screen and (${MEDIA.mobile}) {
    display: none;
  }
`;

const SubMediaMobile = styled.div`
  display: none;
  width: 100%;
  @media screen and (${MEDIA.mobile}) {
    display: flex;
  }
  & a {
    display: flex;
    color: ${FONT.color.white};
  }
`;

function Header() {
  return (
    <>
      <HeaderEl>
        <Content>
          <NavWrapper>
            <SubMedia>
              <LogoWrapper href="/" tabIndex={0}>
                <img
                  src={IMAGE.logo}
                  alt="Pokemone Logo"
                  width={200}
                  height={70}
                />
              </LogoWrapper>
            </SubMedia>

            <SubMediaMobile>
              <LogoMobile>
                <a href="/">
                  <img
                    src={IMAGE.logo}
                    alt="Pokemone Logo"
                    width={130}
                    height={50}
                  />
                </a>
              </LogoMobile>
            </SubMediaMobile>
          </NavWrapper>
        </Content>
      </HeaderEl>
    </>
  );
}

export default Header;
