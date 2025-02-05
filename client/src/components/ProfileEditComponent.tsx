import { useContext, useState } from "react";
import defaultAvatar from "../assets/images/avatar.jpg";
import editIcon from "../assets/images/edit-icon.png";
import "../components/ProfileEditComponent.css";

import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import DeleteUser from "./DeleteUser";
import UserForm from "./UserForm";

function ProfileEditComponent() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

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
                    <span>Confirm my avatar</span>
                  </button>
                )}
              </div>
            </form>
          </div>

          <div id="fieldsAndButtons">
            <UserForm
              defaultValue={user}
              onSubmit={(userData) => {
                fetch(`${import.meta.env.VITE_API_URL}/api/users/${user.id}`, {
                  method: "put",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(userData),
                })
                  .then((response) => {
                    if (response.status === 204) {
                      setUser((prevUser) =>
                        // Mise à jour de l'état local de l'utilisateur pour éviter d'utiliser window.location.reload();
                        prevUser ? { ...prevUser, ...userData } : null,
                      );
                      navigate("/profile");
                      // window.location.reload();
                    } else {
                      alert(
                        "Une erreur s'est produite lors de la mise à jour du profile.",
                      );
                    }
                  })
                  .catch((error) => {
                    console.error(
                      "Erreur lors de la mise à jour du profile :",
                      error,
                    );
                    alert("Erreur de connexion au serveur.");
                  });
              }}
            >
              <button type="submit" id="button_icon-update-my-profile">
                Confirm my information
              </button>
            </UserForm>
            <div id="password_recovery_container">
              <a href="/password_recovery" id="password_recovery_link">
                Change my password
              </a>
            </div>
            <DeleteUser />
          </div>
        </main>
      )}
    </div>
  );
}

export default ProfileEditComponent;
