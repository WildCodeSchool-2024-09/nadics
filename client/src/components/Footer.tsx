import styled from "styled-components";
import facebook from "../assets/images/logo-Facebook.svg";
import instagram from "../assets/images/logo-Instagram.svg";
import x from "../assets/images/logo-X.svg";

function Footer() {
  return (
    <FooterContainer>
      <FooterText>All rights reserved ©</FooterText>
      <FooterLogos aria-label="Réseaux sociaux">
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FooterLogo src={instagram} alt="logo-instagram" />
        </a>
        <a
          href="https://www.x.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X"
        >
          <FooterLogo src={x} alt="logo-x" />
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FooterLogo src={facebook} alt="logo-facebook" />
        </a>
      </FooterLogos>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  padding-bottom: 1rem;
  padding-top: 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: auto; /* Cette ligne garantit que le footer reste en bas */

  @media (min-width: 431px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const FooterText = styled.p`
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  font-style: normal;
  margin: 0;

  @media (min-width: 431px) {
    text-align: left;
    margin-left: 1rem;
  }
`;

const FooterLogos = styled.nav`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (min-width: 431px) {
    justify-content: flex-end;
    margin-right: 1rem;
  }
`;

const FooterLogo = styled.img`
  width: 2.3rem;
`;

export default Footer;
