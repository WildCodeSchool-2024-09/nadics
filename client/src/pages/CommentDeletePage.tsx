import CommentDelete from "../components/CommentDelete";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CommentDeletePage() {
  const [comment, setComment] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/comments/${id}`)
      .then((response) => response.json())
      .then((data) => setComment(data.details));
  }, [id]);

  return <>{id && <CommentDelete id={id} comment={comment} />}</>;
}

export default CommentDeletePage;
