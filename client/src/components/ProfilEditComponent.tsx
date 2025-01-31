import { useContext, useState } from "react";
import defaultAvatar from "../assets/images/avatar.jpg";
import editIcon from "../assets/images/edit-icon.png";
import "../components/ProfilComponent.css";

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
        `${import.meta.env.VITE_API_URL}/upload-avatar/${user.sub}`,
        {
          method: "POST",
          headers: {},
          body: formData,
        },
      );

      const data = await response.json();
      if (response.ok) {
        // Mettre à jour l'utilisateur avec le nouvel avatar
        setUser(data);
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
                    navigate("/profil");
                  } else {
                    alert(
                      "Une erreur s'est produite lors de la mise à jour du profil.",
                    );
                  }
                })
                .catch((error) => {
                  console.error(
                    "Erreur lors de la mise à jour du profil :",
                    error,
                  );
                  alert("Erreur de connexion au serveur.");
                });
            }}
          >
            <button type="submit" id="button_icon-update-my-profile">
              <span>Edit My Profile</span>
            </button>
          </UserForm>

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

export default ProfileEditComponent;
