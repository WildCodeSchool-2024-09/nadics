import type { ReactNode } from "react";

type CommentData = {
  details: string;
};

interface CommentFormProps {
  children: ReactNode;
  defaultValue: CommentData;
  onSubmit: (category: CommentData) => void;
}

function CommentForm({ children, defaultValue, onSubmit }: CommentFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const details = formData.get("details") as string;
        onSubmit({
          details,
        });
      }}
    >
      <input type="text" name="details" defaultValue={defaultValue.details} />

      <button type="submit">{children}</button>
    </form>
  );
}

export default CommentForm;
