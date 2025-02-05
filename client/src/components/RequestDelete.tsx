import { useNavigate } from "react-router-dom";

interface PropsType {
  id: number;
}
function DeleteRequest({ id }: PropsType) {
  const navigate = useNavigate();

  const handleDelete = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/request/${id}`, {
      method: "delete",
    }).then((response) => {
      if (response.status === 204) {
        navigate("/home");
      }
    });
  };
  return (
    <>
      <button id="delete-button" type="submit" onClick={handleDelete}>
        Delete request
      </button>
    </>
  );
}
export default DeleteRequest;
