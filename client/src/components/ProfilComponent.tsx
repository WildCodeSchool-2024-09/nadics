import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/images/avatar.jpg";
import editIcon from "../assets/images/edit-icon.png";
import "../components/ProfilComponent.css";

import UserContext from "../context/userContext";

import DeleteUser from "./DeleteUser";

function Profil() {
  const { user, setUser } = useContext(UserContext);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleEditProfile = () => {
    if (user?.id) {
      navigate(`/users/${user.id}/edit`);
    } else {
      alert("User ID not found");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setAvatarFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!avatarFile || !user) {
      alert("File not selected");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/upload-avatar/${user.id}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();
      if (response.ok) {
        // Mettre à jour l'utilisateur avec le nouvel avatar
        setUser((prevUser) =>
          prevUser ? { ...prevUser, avatar: data.avatar } : null,
        );
        alert("Avatar updated");
      } else {
        alert(data.message || "Une erreur s'est produite.");
      }
    } catch (error) {
      console.error("An error occurred while uploading avatar", error);
      alert("Erreur de connexion au serveur.");
    }
  };

  return (
    <div id="page_container">
      {user && (
        <main id="mainProfile">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            id="avatar_icon_container"
          >
            <div id="icon_container">
              <input
                type="file"
                name="avatar"
                onChange={handleFileChange}
                id="input_upload"
              />
              <button type="button" className="button_icon">
                <img src={editIcon} alt="edit icon" id="edit_icon" />
              </button>
            </div>
            <div id="avatar_container">
              <img
                src={
                  user.avatar
                    ? `${import.meta.env.VITE_API_URL}/${user.avatar}`
                    : defaultAvatar
                }
                alt="avatar pic"
                id="avatar"
              />
            </div>
            <button type="submit" id="button_icon-update">
              <span>Edit My Avatar</span>
            </button>
          </form>
          <div id="champ_container">
            <div className="text_container">
              <h3>{user.firstname}</h3>
              {/* <button type="button" className="button_icon">
                <img src={editIcon} alt="edit icon" className="edit_icon" />
              </button> */}
            </div>
            <div className="text_container">
              <h3>{user.lastname}</h3>
              {/* <button type="button" className="button_icon">
                <img src={editIcon} alt="edit icon" className="edit_icon" />
              </button> */}
            </div>
            <div className="text_container">
              <h3>{user.birthday}</h3>
              {/* <button type="button" className="button_icon">
                <img src={editIcon} alt="edit icon" className="edit_icon" />
              </button> */}
            </div>
          </div>
          <button
            type="button"
            id="button_icon-update-my-profile"
            onClick={handleEditProfile}
          >
            <span>Edit My Profile</span>
          </button>

          <div id="lien_container">
            <a href="/password_recovery" id="lien_change">
              Change My Password
            </a>

            <DeleteUser />
          </div>
        </main>
      )}
    </div>
  );
}

export default Profil;
