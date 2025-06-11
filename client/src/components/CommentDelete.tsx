import "./CommentDelete.css";

interface PropsType {
  id: number;
}

function CommentDelete({ id }: PropsType) {
  const handleDelete = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/comments/${id}`, {
      method: "delete",
    }).then((response) => {
      if (response.status === 204) {
        window.location.reload();
      }
    });
  };
  return (
    <>
      <button type="submit" id="delete-button-comment" onClick={handleDelete}>
        Delete comment
      </button>
    </>
  );
}
export default CommentDelete;
