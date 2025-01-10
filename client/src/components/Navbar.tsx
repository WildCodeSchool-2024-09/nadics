import "./Navbar.css";
import { useState } from "react";
import logo from "../assets/images/logo-removebg.png";

function Navbar() {
  const [burger_class, setBurger_class] = useState("burger-bar unClicked");
  const [menu_class, setMenu_class] = useState("menu hidden");
  const [isMenuClicked, setMenuClicked] = useState(false);
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
      <img src={logo} alt="logo" className="logoImg" />
      <nav>
        <div className={menu_class}>
          <a href="/home" className="menu_text">
            Home
          </a>
          <a href="/login" className="menu_text">
            Login
          </a>
          <a href="/post_request" className="menu_text">
            Create request
          </a>
          <a href="signup" className="menu_text">
            Sign up
          </a>
        </div>
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
      </nav>
    </header>
  );
}

export default Navbar;
