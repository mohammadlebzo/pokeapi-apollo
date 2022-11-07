import { FONT, BACKGROUND, IMAGE, MEDIA } from "constants/styles/StyleParams";
import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";

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
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${BACKGROUND.color.goldenrod};
  width: 100%;
  z-index: 10;
  transition: top 0.2s linear;
  &.up {
    top: -5rem;
  }
  @media screen and (${MEDIA.mobile}) {
    width: 100vw;
  }
`;

const LogoWrapper = styled.a`
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

const SideMenu = styled.li`
  width: 33%;
  display: flex;
  align-items: center;
  & span {
    background-image: url(${BACKGROUND.iconURL.sideMenu});
    filter: invert(1);
    font-size: 1.4rem;
  }
`;

function Header() {
  const [headClassOnScroll, setheadClassOnScroll] = useState("down");
  let lastScrollTop = 0;

  const handleNavigation = useCallback(
    (e) => {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        setheadClassOnScroll("up");
      } else {
        setheadClassOnScroll("down");
      }
      lastScrollTop = st <= 0 ? 0 : st;
    },
    [window]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  return (
    <>
      <HeaderEl className={headClassOnScroll}>
        <Content>
          <NavWrapper>
            <SubMedia>
              <LogoWrapper href="">
                <img src={IMAGE.logo} alt="" width={200} height={70} />
              </LogoWrapper>
            </SubMedia>

            <SubMediaMobile>
              <LogoMobile>
                <a href="">
                  <img src={IMAGE.logo} alt="" width={130} height={50} />
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
