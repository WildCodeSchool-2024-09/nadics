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
  width: 80vw;
  height: auto;
  min-height: 150px;
  background: #FFF;
  font-size: 1em;
  font-weight: 400;
  fill: #F5F5F5;
  filter: drop-shadow(10px 10px 14px rgba(0, 0, 0, 0.25));
  display: flex;
  align-items: center;
  box-sizing: border-box;
.ql-container {
  min-height: 200px;
  background: #FFF;
  width: 80vw;
}
.ql-editor.ql-blank::before {
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 500;
  padding: 10px;
  box-sizing :border-box ;
}
.ql-editor p {
  width: 100%;
  min-height: 100%;
  margin: 0;
  box-sizing: border-box;
}
@media screen and (max-width: 431px) {
  width: 80vw;
  .ql-container {
    background: #FFF;
    width: 80vw;
  }
  .ql-editor {
    min-height: 200px;
  background: #FFF;
  width: 80vw;
 }
  .ql-editor p {
    min-height: 100%;
    width: 78vw;
  }
  .ql-editor.ql-blank::before {
    height: 100%;
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.5);
    font-weight: 500;
  }
  .quill {
    width: 80vw;
  }
}
`;
