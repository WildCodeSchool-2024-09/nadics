import { useEffect, useState } from "react";
import avatar from "../assets/images/avatar.jpg";
import editIcon from "../assets/images/edit-icon.png";
import "../components/ProfilComponent.css";
// import DeleteUser from "./DeleteUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

function Profil() {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    // Récupérer le token depuis les cookies
    const token = Cookies.get("authToken");

    if (token) {
      // Décoder le token pour récupérer les informations de l'utilisateur
      const decodedToken = jwt.decode(token) as { sub: string } | null;

      if (decodedToken) {
        // Extraire l'ID de l'utilisateur depuis le payload
        const userId = Number.parseInt(decodedToken.sub, 10);
        setUserId(userId);
      }
    }
  }, []);

  if (userId === null) {
    return <div>Loading...</div>; // Gérer le cas où l'utilisateur n'est pas connecté
  }

  return (
    <div id="page_container">
      <main id="mainProfile">
        <div id="avatar_icon_container">
          <div id="icon_container">
            <button type="button" className="button_icon">
              <img src={editIcon} alt="edit icon" id="edit_icon" />
            </button>
          </div>
          <div id="avatar_container">
            <img src={avatar} alt="avatar pic" id="avatar" />
          </div>
        </div>
        <div id="champ_container">
          <div className="text_container">
            <h3>Marc antoine</h3>
            <button type="button" className="button_icon">
              <img src={editIcon} alt="edit icon" className="edit_icon" />
            </button>
          </div>
          <div className="text_container">
            <h3>Berger avec baton</h3>
            <button type="button" className="button_icon">
              <img src={editIcon} alt="edit icon" className="edit_icon" />
            </button>
          </div>
          <div className="text_container">
            <h3>29/02/2006</h3>
            <button type="button" className="button_icon">
              <img src={editIcon} alt="edit icon" className="edit_icon" />
            </button>
          </div>
        </div>
        <div id="lien_container">
          <a href="Change my password" id="lien_change">
            Change my password
          </a>
          <br /> {/* pour le test  */}
          {/* <DeleteUser id={userId} /> */}
        </div>
      </main>
    </div>
  );
}

export default Profil;
