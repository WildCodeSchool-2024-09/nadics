import "./Navbar.css";
import { useContext, useState } from "react";
import type { SetStateAction } from "react";
import { Link } from "react-router-dom";
import defaultAvatar from "../assets/images/avatar.jpg";
import logoDesktop from "../assets/images/logo-removebg.png";
import logoMobile from "../assets/images/logo favicon.png";
import AuthContext from "../context/authContext";
import UserContext from "../context/userContext";
// import type { UserTypeContext } from "../context/userContext";

function Navbar() {
  const { auth } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/logout`,
        {
          method: "POST",
          credentials: "include", // Indispensable pour les cookies httpOnly !
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la déconnexion");
      }

      // Redirection après logout (ex: vers la page de connexion)
      window.location.href = "/login";
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
    }
  };

  const { user } = useContext(UserContext);

  const [burger_class, setBurger_class] = useState("burger-bar unClicked");
  const [menu_class, setMenu_class] = useState("menu hidden");
  const [isMenuClicked, setMenuClicked] = useState(false);

  const [hoveredLink, setHoveredLink] = useState(""); // État pour suivre le lien survolé

  const handleMouseEnter = (link: SetStateAction<string>) => {
    setHoveredLink(link);
  };
  const handleMouseLeave = () => {
    setHoveredLink("");
  };

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurger_class("burger-bar clicked");
      setMenu_class("menu visible");
    } else {
      setBurger_class("burger-bar unClicked");
      setMenu_class("menu hidden");
    }
    setMenuClicked(!isMenuClicked);
  };
  return (
    <header id="navbarContainer">
      <Link to="/home">
        <img src={logoMobile} alt="logo" id="logoImageMobile" />
        <img src={logoDesktop} alt="logo" id="logoImageDesktop" />
      </Link>
      <section id="LinksAndProfileDesktop">
        <nav id="navbarLinksDesktop">
          <Link to="/home" className="navBarLinks">
            Home
          </Link>

          <Link to="/profile" className="navBarLinks">
            My profile
          </Link>

          <Link to="/post_request" className="navBarLinks">
            Create a request
          </Link>

          <Link to="/login" className="navBarLinks">
            Logout
          </Link>
        </nav>
        <nav id="sectionBurgerAndProfile">
          <div
            id="menu_burger"
            onClick={updateMenu}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                updateMenu(); // Simulate click on "Enter" or "Space"
                e.preventDefault(); // Prevent scrolling for "Space"
              }
            }}
          >
            <div className={burger_class} />
            <div className={burger_class} />
            <div className={burger_class} />
          </div>
          <Link to="/profile">
            {auth && user && (
              <img
                src={
                  user.avatar
                    ? `${import.meta.env.VITE_API_URL}/${user.avatar}`
                    : defaultAvatar
                }
                alt="avatar"
                id="avatar_icon"
              />
            )}
          </Link>
        </nav>
      </section>

      <div className={menu_class}>
        <Link
          to="/home"
          className={`homeLink ${hoveredLink === "home" ? "hovered" : ""}`} // survole de souris il change classname
          onMouseEnter={() => handleMouseEnter("home")}
          onMouseLeave={handleMouseLeave}
          onClick={updateMenu}
        >
          Home
        </Link>

        <Link
          to="/profile"
          className={`homeLink ${hoveredLink === "profile" ? "hovered" : ""}`}
          onMouseEnter={() => handleMouseEnter("profile")}
          onMouseLeave={handleMouseLeave}
          onClick={updateMenu}
        >
          My profile
        </Link>

        <Link
          to="/post_request"
          className={`homeLink ${hoveredLink === "post_request" ? "hovered" : ""}`}
          onMouseEnter={() => handleMouseEnter("post_request")}
          onMouseLeave={handleMouseLeave}
          onClick={updateMenu}
        >
          Create a request
        </Link>

        <Link
          to="/login"
          className={`homeLink ${hoveredLink === "logout" ? "hovered" : ""}`}
          onMouseEnter={() => handleMouseEnter("logout")}
          onMouseLeave={handleMouseLeave}
          onClick={handleLogout}
        >
          Logout
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
