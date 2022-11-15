import { FONT, BACKGROUND } from "constants/styles/StyleParams";
import styled from "styled-components";

const FooterEl = styled.footer`
  font-family: ${FONT.family.main};
  background-color: ${BACKGROUND.color.goldenrod};
  width: 100%;
  height: 6.25rem;
  position: absolute;
  bottom: 0;
  clear: both;
`;

function Footer() {
  return <FooterEl></FooterEl>;
}

export default Footer;
