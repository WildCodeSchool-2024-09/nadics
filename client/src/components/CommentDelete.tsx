interface PropsType {
  id: string;
  comment: string; 
}

function CommentDelete({id, comment}: PropsType) {

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
      <h2>Affichage d'une décision selon son ID</h2>
      <p>{comment}</p>
      <button type="submit" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
}
export default CommentDelete;
