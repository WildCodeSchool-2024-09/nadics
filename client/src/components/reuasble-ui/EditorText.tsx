import ReactQuill from "react-quill";
import styled from "styled-components";

interface EditorTextProps extends Record<string, unknown> {
  className?: string;
  placeholder?: string;
}

export default function EditorText({
  className,
  placeholder,
  ...extraProps
}: EditorTextProps) {
  return (
    <EditorTextStyled>
      <ReactQuill
        className={className}
        placeholder={placeholder}
        {...extraProps}
      />
    </EditorTextStyled>
  );
}

const EditorTextStyled = styled.div`
  width: 100%; 
  max-width: 400px; 
  height: auto;
  min-height: 150px; 
  background: #FFF;
  font-size: 1em;
  font-weight: 400;
  fill: #f5f5f5;
  filter: drop-shadow(10px 10px 14px rgba(0, 0, 0, 0.25));

.ql-container {
  min-height: 200px; 
  height: auto;
  background: #FFF;
  width: 100%; 
  max-width: 400px; 
  overflow-y: auto;
}

.ql-editor {
  display: block;
  min-height: 150px; 
  height: auto;
  padding: 10px;
  box-sizing: border-box;
}

.ql-editor.ql-blank::before {
  height: 100%;
  display: block;
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.5); 
  font-weight: 500; 
  padding: 10px; 
}


.ql-editor p {
  width: 100%;
  min-height: 100%;
  margin: 0;
  box-sizing: border-box;
}

@media screen and (min-width: 431px) {
    max-width: 1600px; 
    

    .ql-container {
      max-width: 100%;
      min-height: 198px; 
    }

    .ql-editor {
      min-height: 198px;
    }
  }

  
`;
