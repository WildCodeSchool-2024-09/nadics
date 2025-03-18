import type { RequestUser } from "../pages/RequestDetails";
import "../pages/RequestDetails.css";

interface EditProps {
  request: RequestUser;
  setRequest: React.Dispatch<React.SetStateAction<RequestUser | null>>;
  editedRequest: Partial<RequestUser>;
  setEditedRequest: React.Dispatch<React.SetStateAction<Partial<RequestUser>>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function RequestEdit({
  request,
  setRequest,
  editedRequest,
  setEditedRequest,
  isEditing,
  setIsEditing,
}: EditProps) {
  const checkOwnership = async (requestId: number): Promise<boolean> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/request/${requestId}/isPoster`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (response.status === 403) {
        alert("You are not the owner of this request");
        return false;
      }

      return true; // L'utilisateur est bien le propriétaire
    } catch (error) {
      console.error("Error checking ownership:", error);
      return false;
    }
  };

  const handleEditToggle = async () => {
    if (!isEditing) {
      const isOwner = await checkOwnership(request.id);

      if (!isOwner) {
        setIsEditing(false);
        return;
      }
    }

    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (!request) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/request/${request.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editedRequest.title || request.title,
            tag1: editedRequest.tag1 || request.tag1,
            tag2: editedRequest.tag2 || request.tag2,
            details1: editedRequest.details1 || request.details1,
            details2: editedRequest.details2 || request.details2,
            details3: editedRequest.details3 || request.details3,
          }),
        },
      );

      if (response.status === 403) {
        alert("You are not the owner of this request");
        setEditedRequest({});
        setIsEditing(false);
        return;
      }

      setRequest({ ...request, ...editedRequest } as RequestUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error while saving:", error);
    }
  };

  return (
    <div id="edit_save_bouton_cantainer">
      <button
        id="button_icon-update-my-profile"
        type="button"
        onClick={handleEditToggle}
      >
        {isEditing ? "Cancel" : "Edit request"}
      </button>
      {isEditing && (
        <button
          id="button_icon-update-my-profile"
          type="button"
          onClick={handleSave}
        >
          Save changes
        </button>
      )}
    </div>
  );
}

export default RequestEdit;
