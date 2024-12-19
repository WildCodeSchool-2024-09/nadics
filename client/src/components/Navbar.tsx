import "./Navbar.css";
import { useState } from "react";

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
      <h3>Smart choise hub </h3>
      <nav>
        <div className={menu_class}>
          <a href="Browse requests">Home </a>
          <a href="My requests">My requests </a>
          <a href="Notifictaions">Notifictaions </a>
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
