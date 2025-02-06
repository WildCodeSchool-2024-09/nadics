import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";
import UserContext from "../context/userContext";

interface PropsType {
  id: number;
}
function DeleteRequest({ id }: PropsType) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { auth } = useContext(AuthContext);
  const token = auth?.token;
  const handleDelete = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/request/${id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: user?.id, requestId: id }),
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
      <button id="delete-button" type="submit" onClick={handleDelete}>
        Delete request
      </button>
    </>
  );
}
export default DeleteRequest;
