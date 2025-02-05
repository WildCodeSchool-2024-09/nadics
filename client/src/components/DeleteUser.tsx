import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import type { UserTypeContext } from "../context/userContext";

function DeleteUser() {
  const { user, setUser } = useContext<UserTypeContext>(UserContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    if (user?.id) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${user.id}`,
          {
            method: "delete",
          },
        );

        if (response.ok) {
          alert("Account deleted successfully.");

          document.cookie = "authToken=; Max-Age=0"; // Suppression du cookie "authToken" pour déconnecter l'utilisateur. Expire immédiatement le cookie

          setUser(null); // Mettre à jour le contexte pour supprimer l'utilisateur de l'état

          navigate("/"); // Rediriger l'utilisateur vers la page de connexion ou la page d'accueil
        } else {
          alert("Failed to delete account. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the account.");
      }
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="delete-button"
      >
        Delete my account
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>
              ⚠️
              <br />
              <br />
              Are you sure you want to delete your account?
              <br />
              <br />
              This action cannot be undone.
            </p>
            <button type="button" id="delete-button-yes" onClick={handleDelete}>
              Yes, delete
            </button>
            <button
              type="button"
              id="delete-button-cancel"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteUser;
