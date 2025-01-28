import "./Navbar.css";
import { useContext, useState } from "react";
import type { SetStateAction } from "react";
import { Link } from "react-router-dom";
import type { Auth } from "../App";
import logo from "../assets/images/logo-removebg.png";
import defaultAvatar from "../assets/images/avatar.jpg";
import UserContext from "../context/userContext";
import type { UserTypeContext } from "../context/userContext";

interface NavbarProps {
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>; // Typage correct de setAuth
  auth: Auth | null;
}

function Navbar({ auth, setAuth }: NavbarProps) {
  const handleLogout = () => {
    // Supprimer cookie "authToken"
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

    // Déconnexion en mettant auth à null
    setAuth(null);
  };

  const { user } = useContext<UserTypeContext>(UserContext);

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
    <header>
      <Link to="/home">
        <img src={logo} alt="logo" className="logoImg" />
      </Link>
      <nav>
        <div
          className="menu_burger"
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
        <Link to="/profil">
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
      <div className={menu_class}>
        <Link
          to="/login"
          className={`homeLink ${hoveredLink === "login" ? "hovered" : ""}`} // survole de souris il change classname
          onMouseEnter={() => handleMouseEnter("login")}
          onMouseLeave={handleMouseLeave}
          onClick={updateMenu}
        >
          Login
        </Link>
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
          to="/profil"
          className={`homeLink ${hoveredLink === "profil" ? "hovered" : ""}`}
          onMouseEnter={() => handleMouseEnter("profil")}
          onMouseLeave={handleMouseLeave}
          onClick={updateMenu}
        >
          Profil
        </Link>
        <Link
          to="/post_request"
          className={`homeLink ${hoveredLink === "post_request" ? "hovered" : ""}`}
          onMouseEnter={() => handleMouseEnter("post_request")}
          onMouseLeave={handleMouseLeave}
          onClick={updateMenu}
        >
          Create request
        </Link>
        <Link
          to="/signup"
          className={`homeLink ${hoveredLink === "signup" ? "hovered" : ""}`}
          onMouseEnter={() => handleMouseEnter("signup")}
          onMouseLeave={handleMouseLeave}
          onClick={updateMenu}
        >
          Sign up
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
