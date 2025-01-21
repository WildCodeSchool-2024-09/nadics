import type { ReactNode } from "react";

type RequestData = {
  title: string;
  theme: string;
};

interface RequestFormProps {
  children: ReactNode;
  defaultValue: RequestData;
  onSubmit: (category: RequestData) => void;
}

function RequestForm({ children, defaultValue, onSubmit }: RequestFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const title = formData.get("title") as string;
        const theme = formData.get("theme") as string;

        onSubmit({
          title,
          theme,
        });
      }}
    >
      <input type="text" name="title" defaultValue={defaultValue.title} />
      <input type="text" name="theme" defaultValue={defaultValue.theme} />
      <button type="submit">{children}</button>
    </form>
  );
}

export default RequestForm;
