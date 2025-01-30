import { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";

interface ComponentAddProps {
  onClose: () => void;
  requestId: number;
}

function ComponentAdd({ onClose, requestId }: ComponentAddProps) {
  const [editorContent, setEditorContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const commentData = {
      details: formData.get("details") as string,
      user_id: user ? user.id : null,
      request_id: requestId,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/comments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Comment update failed");
      }
      if (response.status === 201) {
        alert("Comment submitted! Redirecting...");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error creating comment");
      alert("An error occurred, please try again");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Give your opinion</h2>

        <div className="comment-section">
          <textarea name="details" placeholder="Write a comment..." />
        </div>

        {isEditing ? (
          <div>
            <ReactQuill value={editorContent} onChange={setEditorContent} />
          </div>
        ) : (
          <button
            type="button"
            className="wysiwyg-preview"
            onClick={() => setIsEditing(true)}
          >
            <p>{editorContent || "Click to edit..."}</p>
          </button>
        )}

        <div className="modal-buttons">
          <button type="button" onClick={() => setIsEditing(!isEditing)}>
            Modify
          </button>
          <button type="button" onClick={onClose}>
            Close
          </button>
          <button type="submit" className="buttonSubmit">
            Submit your comment
          </button>
        </div>
      </form>
    </>
  );
}

export default ComponentAdd;
