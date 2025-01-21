interface PropsType {
  id: number;
}
function DeleteRequest({ id }: PropsType) {
  const handleDelete = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/request/${id}`, {
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
        Delete
      </button>
    </>
  );
}
export default DeleteRequest;
