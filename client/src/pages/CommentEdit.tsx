import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CommentForm from "../components/CommentForm";

type Comment = {
  id: number;
  details: string;
  date: string;
};

function CommentEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [comment, setComment] = useState<Comment | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/comments/${id}`)
      .then((response) => response.json())
      .then((data: Comment) => {
        setComment(data);
      });
  }, [id]);

  return (
    <>
      {comment && (
        <>
          <p>{comment.date}</p>
          <CommentForm
            defaultValue={comment}
            onSubmit={(commentData) => {
              fetch(
                `${import.meta.env.VITE_API_URL}/api/comments/${comment.id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(commentData),
                },
              ).then((response) => {
                if (response.status === 204) {
                  navigate(`/comment_edit/${comment.id}`);
                }
              });
            }}
          >
            Modifier
          </CommentForm>
        </>
      )}
    </>
  );
}

export default CommentEdit;
