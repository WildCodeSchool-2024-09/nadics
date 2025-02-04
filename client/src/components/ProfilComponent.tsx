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
        setUser((prevUser) =>
          prevUser ? { ...prevUser, avatar: data.avatar } : null,
        );
        setAvatarFile(null); // Réinitialise avatarFile pour cacher le bouton
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
          <div id="avatarAndButton">
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              id="avatar_icon_container"
            >
              <div id="icon_container">
                <label htmlFor="input_upload" className="button_icon">
                  <img
                    src={editIcon}
                    alt="edit icon"
                    id="edit_icon_profile_avatar"
                  />
                </label>
                <input
                  type="file"
                  name="avatar"
                  id="input_upload"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
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
              <div id="boutonConfirmAvatar">
                {avatarFile && (
                  <button type="submit" id="button_icon-update-my-avatar">
                    <span>Confirm My Avatar</span>
                  </button>
                )}
              </div>
            </form>
          </div>

          <div id="fieldsAndButtons">
            <div id="champ_container">
              <div className="text_container">
                <h3>{user.firstname}</h3>
                <button
                  type="button"
                  className="button_icon_profile"
                  onClick={handleEditProfile}
                >
                  <img
                    src={editIcon}
                    alt="edit icon"
                    className="edit_icon_profile"
                  />
                </button>
              </div>
              <div className="text_container">
                <h3>{user.lastname}</h3>
                <button
                  type="button"
                  className="button_icon_profile"
                  onClick={handleEditProfile}
                >
                  <img
                    src={editIcon}
                    alt="edit icon"
                    className="edit_icon_profile"
                  />
                </button>
              </div>
              <div className="text_container">
                <h3>{user.birthday}</h3>
                <button
                  type="button"
                  className="button_icon_profile"
                  onClick={handleEditProfile}
                >
                  <img
                    src={editIcon}
                    alt="edit icon"
                    className="edit_icon_profile"
                  />
                </button>
              </div>
            </div>

            <div id="password_recovery_container">
              <a href="/password_recovery" id="password_recovery_link">
                Change My Password
              </a>
            </div>
            <DeleteUser />
          </div>
        </main>
      )}
    </div>
  );
}

export default Profil;
