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
          <a href="/login" className="menu_text">
            Login
          </a>
          <a href="/post_request" className="menu_text">
            Create request
          </a>
          <a href="Notifictaions" className="menu_text">
            Notification
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
