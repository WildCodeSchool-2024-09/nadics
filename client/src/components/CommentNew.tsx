import { useOutletContext } from "react-router-dom";
import type { Auth } from "../App";

function CommentNew() {
  const { auth } = useOutletContext() as { auth: Auth | null };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const commentData = {
      details: formData.get("details") as string,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth as Auth}`,
          },
          body: JSON.stringify(commentData),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create comment");
      }
      if (response.status === 201) {
        alert("Comment created successfully!");
        return;
      }
    } catch (error) {
      console.error("Error creating comment");
      alert("An error please try again");
    }
  };
  return (
    <>
      <h2>Insérer un commentaire</h2>
      <form className="commentform" onSubmit={handleSubmit}>
        <label htmlFor="details">
          <input
            type="details"
            id="commentdetails"
            name="details"
            defaultValue=""
            placeholder="Details"
            required
          />
        </label>
        <button id="commentbutton" type="submit">
          Post your comment
        </button>
      </form>
    </>
  );
}

export default CommentNew;
