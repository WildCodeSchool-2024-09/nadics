import { Link } from "react-router-dom";
import "./LandingPageComponent.css";
import logo from "../assets/images/logo favicon.ico";
import requestcard from "../assets/images/request_card_with_explanation.png";
import Footer from "./Footer";

function LandingPageComponent() {
  return (
    <>
      <header id="header-landing">
        <img src={logo} alt="logo" id="logoImg" />
        <div id="login-signup-container">
          <Link to="/login" id="login-button">
            Login
          </Link>
          <Link to="/signup">
            <button id="signupButtonMobile" type="submit">
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
        <h2 id="main_text">
          Start impacting your community and share your opinion
        </h2>
        <img src={requestcard} alt="requestcard" id="requestcardImg" />
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
    </>
  );
}

export default LandingPageComponent;
