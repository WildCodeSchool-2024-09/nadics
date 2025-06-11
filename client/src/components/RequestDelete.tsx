import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";

interface PropsType {
  id: number;
}
function DeleteRequest({ id }: PropsType) {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/request/${id}`, {
      method: "delete",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user?.id, // On passe aussi l'ID de l'utilisateur connecté
        requestId: id, // L'ID de la Request à supprimer
      }),
    }).then((response) => {
      if (response.status === 403) {
        alert("You are not owner of this request ");
      }
      if (response.status === 204) {
        navigate("/home");
      }
    });
  };

  return (
    <>
      <button
        id="delete-button"
        type="submit"
        onClick={() => setShowModal(true)}
      >
        Delete request
      </button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>
              ⚠️
              <br />
              <br />
              Are you sure you want to delete your request?
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
export default DeleteRequest;
