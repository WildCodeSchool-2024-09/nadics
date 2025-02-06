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
      <button type="submit" onClick={handleDelete}>
        Delete comment
      </button>
    </>
  );
}
export default CommentDelete;
