import { Link } from "react-router-dom";
import "./LandingPageComponent.css";
import logoDesktop from "../assets/images/logo-removebg.png";
import logoMobile from "../assets/images/logo favicon.png";
import requestcard from "../assets/images/request_card_with_explanation.png";
import Footer from "./Footer";

function LandingPageComponent() {
  return (
    <section id="mainPageLandingContainer">
      <header id="header-landing">
        <img src={logoMobile} alt="logo" id="logoImageMobileLanding" />
        <img src={logoDesktop} alt="logo" id="logoImageDesktop" />
        <div id="login-signup-container">
          <Link to="/login" id="login-button">
            Login
          </Link>
          <Link to="/signup">
            <button id="signupButtonMobileLanding" type="submit">
              Sign Up
            </button>
          </Link>
        </div>
      </header>
      <section id="mainsectionlandingpage">
        <div id="carousel">
          <h1 id="carousel-heading-text">
            Live the best experience ever with your community
          </h1>
        </div>
        <div id="startImpactingAndRequestImg">
          <h2 id="main_text">
            Start impacting your community and share your opinion
          </h2>
          <img src={requestcard} alt="requestcard" id="requestcardImg" />
        </div>

        <Link to="/signup">
          <button id="signupNowButtonMobile" type="submit">
            Sign Up Now !
          </button>
        </Link>
        <Link to="/login" id="alreadyaccount">
          Already have an account ? <span id="login-highlighted">Login</span>
        </Link>
      </section>
      <Footer />
    </section>
  );
}

export default LandingPageComponent;
