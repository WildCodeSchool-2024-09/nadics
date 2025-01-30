import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import type { UserTypeContext } from "../context/userContext";

function DeleteUser() {
  const { user, setUser } = useContext<UserTypeContext>(UserContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    if (user?.sub) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${user.sub}`,
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
        id="delete-button"
      >
        Delete my account
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>
              ❌ Are you sure you want to delete your account? This action
              cannot be undone.
            </p>
            <button type="button" id="delete-button-yes" onClick={handleDelete}>
              🔴Yes, delete
            </button>
            <button
              type="button"
              id="delete-button-cancel"
              onClick={() => setShowModal(false)}
            >
              🟢Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteUser;

// /////////
// /////////
// /////////
// /////////
// /////////
// /////////
// /////////
// /////////
// /////////
// /////////
// /////////
// /////////

// import { useContext } from "react";
// import UserContext from "../context/userContext";
// import type { UserTypeContext } from "../context/userContext";
// import { useNavigate } from "react-router-dom";

// // interface PropsType {
// //   id: number;
// // }
// function DeleteUser() {
//   const { user } = useContext<UserTypeContext>(UserContext);
//   const navigate = useNavigate();

//   const handleDelete = () => {
//     user &&
//       fetch(`${import.meta.env.VITE_API_URL}/api/users/${user.sub}`, {
//         method: "delete",
//       }).then((response) => {
//         if (response.status === 204) {
//           navigate("/");
//         }
//       });
//   };
//   return (
//     <>
//       <button type="submit" onClick={handleDelete}>
//         Delete my account
//       </button>
//     </>
//   );
// }
// export default DeleteUser;

// ///////

// import { useContext } from "react";
// import UserContext from "../context/userContext";
// import type { UserTypeContext } from "../context/userContext";
// import { useNavigate } from "react-router-dom";

// function DeleteUser() {
//   const { user } = useContext<UserTypeContext>(UserContext);
//   const navigate = useNavigate();

//   const handleDelete = async () => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete your account? This action cannot be undone.",
//     );
//     if (confirmDelete) {
//       try {
//         const response = await fetch(`/api/users/${user.sub}`, {
//           method: "DELETE",
//         });

//         if (response.ok) {
//           alert("Account deleted successfully.");
//           navigate("/"); // Redirige vers la page d'accueil après la suppression
//         } else {
//           alert("Failed to delete account.");
//         }
//       } catch (error) {
//         console.error("Error deleting user:", error);
//         alert("An error occurred while deleting the account.");
//       }
//     }
//   };

//   return (
//     <button type="button" onClick={handleDelete} className="delete-button">
//       Delete my account
//     </button>
//   );
// }

// export default DeleteUser;
