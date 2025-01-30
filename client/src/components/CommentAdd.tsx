import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CommentAdd.css";
interface ComponentAddProps {
  onClose: () => void;
}

function ComponentAdd({ onClose }: ComponentAddProps) {
  const [editorContent, setEditorContent] = useState("");
  const [tempContent, setTempContent] = useState(editorContent);

  const handleSave = () => {
    setEditorContent(tempContent);
  };

  const handleCancel = () => {
    setTempContent(editorContent);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form className="opinion-form">
          <div className="editor-section">
            <label htmlFor="editor">Your opinion:</label>
            <ReactQuill value={tempContent} onChange={setTempContent} />
          </div>

          <div className="modal-buttons">
            <button type="button" className="save-button" onClick={handleSave}>
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
