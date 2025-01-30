import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface ComponentAddProps {
  onClose: () => void;
}

function ComponentAdd({ onClose }: ComponentAddProps) {
  const [editorContent, setEditorContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <h2>Give your opinion</h2>

      <div className="comment-section">
        <textarea placeholder="Write a comment..." />
      </div>

      {isEditing ? (
        <ReactQuill value={editorContent} onChange={setEditorContent} />
      ) : (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <div className="wysiwyg-preview" onClick={() => setIsEditing(true)}>
          <p>{editorContent || "Click to edit..."}</p>
        </div>
      )}

      <div className="modal-buttons">
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button onClick={() => setIsEditing(!isEditing)}>Modify</button>
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button onClick={onClose}>Close</button>
      </div>
    </>
  );
}

export default ComponentAdd;
