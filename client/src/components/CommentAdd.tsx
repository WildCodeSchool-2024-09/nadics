import { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CommentAdd.css";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
interface ComponentAddProps {
  onClose: () => void;
  requestId: number;
}

function ComponentAdd({ onClose, requestId }: ComponentAddProps) {
  const [editorContent, setEditorContent] = useState("");
  const [tempContent, setTempContent] = useState("");

  const handleSave = () => {
    setEditorContent(tempContent);
  };

  const handleCancel = () => {
    setTempContent(editorContent);
  };
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Fonction pour récupérer uniquement le texte sans balises HTML
  const getPlainText = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const commentData = {
      details: getPlainText(tempContent),
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
    <div className="modal-overlay">
      <div className="modal-content">
        <form className="opinion-form" onSubmit={handleSubmit}>
          <div className="editor-section">
            <label htmlFor="editor">Your opinion:</label>
            <ReactQuill value={tempContent} onChange={setTempContent} />
          </div>

          <div className="modal-buttons">
            <button type="submit" className="save-button" onClick={handleSave}>
              Save
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              Delete my comment
            </button>
          </div>
          <button type="button" className="exit-button" onClick={onClose}>
            Exit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ComponentAdd;
