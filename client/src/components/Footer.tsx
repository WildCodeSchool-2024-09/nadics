import "./Footer.css";
import facebook from "../assets/images/logo-Facebook.svg";
import instagram from "../assets/images/logo-Instagram.svg";
import x from "../assets/images/logo-X.svg";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-text">
        <p>All rights reserved ©</p>
      </div>
      <div>
        <div className="footer-logos">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            //(noopener) améliore la sécurité en empêchant un nouvel onglet d'accéder à la page d'origine
            //(noreferrer) protège la confidentialité en masquant l'URL de référence
            aria-label="Instagram"
          >
            <img src={instagram} alt="logo-instagram" className="footer-logo" />
          </a>
          <a
            href="https://www.x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
          >
            <img src={x} alt="logo-x" className="footer-logo" />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <img src={facebook} alt="logo-facebook" className="footer-logo" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
