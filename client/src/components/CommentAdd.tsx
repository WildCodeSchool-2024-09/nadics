import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import "./CommentAdd.css";
import ReactQuill from "react-quill";

// import EditorText from "./reuasble-ui/EditorText";
import PrimaryButton from "./reuasble-ui/PrimaryButton";
interface ComponentAddProps {
  onClose: () => void;
  requestId: number | null;
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
  // Fonction pour récupérer uniquement le texte sans balises HTML
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const commentData = {
      details: tempContent,
      request_id: requestId,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/comments/`,
        {
          method: "POST",
          credentials: "include",
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
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating comment");
      alert("An error occurred, please try again");
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal-form">
        <form className="opinion-form" onSubmit={handleSubmit}>
          <div className="editor-section">
            <label htmlFor="editor">Your opinion:</label>
            {/* <EditorText
              value={tempContent}
              onChange={setTempContent}
              placeholder="Write your comment here ..."
            /> */}

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
          <PrimaryButton
            className="button-exit"
            type="button"
            onClick={onClose}
            label="Exit"
          />
        </form>
      </div>
    </div>
  );
}
export default ComponentAdd;
