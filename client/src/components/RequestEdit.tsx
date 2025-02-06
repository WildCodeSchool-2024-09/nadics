import type { RequestUser } from "../pages/RequestDetails";

interface EditProps {
  request: RequestUser;
  setRequest: React.Dispatch<React.SetStateAction<RequestUser | null>>;
  editedRequest: Partial<RequestUser>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function RequestEdit({
  request,
  setRequest,
  editedRequest,
  isEditing,
  setIsEditing,
}: EditProps) {
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (!request) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/request/${request.id}`, {
        method: "PUT",
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
      });
      setRequest({ ...request, ...editedRequest } as RequestUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error while fetching :", error);
    }
  };
  return (
    <>
      <button
        id="button_icon-update-my-profile"
        type="button"
        onClick={handleEditToggle}
      >
        {isEditing ? "Cancel" : "Edit request"}
      </button>
      {isEditing && (
        <button type="button" onClick={handleSave}>
          Save
        </button>
      )}
    </>
  );
}

export default RequestEdit;
