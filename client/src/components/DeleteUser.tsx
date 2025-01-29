import { useContext } from "react";
import UserContext from "../context/userContext";
import type { UserTypeContext } from "../context/userContext";

// interface PropsType {
//   id: number;
// }
function DeleteUser() {
  const { user } = useContext<UserTypeContext>(UserContext);

  const handleDelete = () => {
    user &&
      fetch(`${import.meta.env.VITE_API_URL}/api/users/${user.sub}`, {
        method: "delete",
      }).then((response) => {
        if (response.status === 204) {
          window.location.reload();
        }
      });
  };
  return (
    <>
      <button type="submit" onClick={handleDelete}>
        Delete my account
      </button>
    </>
  );
}
export default DeleteUser;

// import { useNavigate } from "react-router-dom";

// interface DeleteUserProps {
//   id: number;
// }

// function DeleteUser({ id }: DeleteUserProps) {
//   const navigate = useNavigate();

//   const handleDelete = async () => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete your account? This action cannot be undone.",
//     );
//     if (confirmDelete) {
//       try {
//         const response = await fetch(`/api/users/${id}`, {
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
