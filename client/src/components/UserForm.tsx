import type { ReactNode } from "react";
import "./UserForm.css";

type UserData = {
  firstname: string;
  lastname: string;
  birthday: string;
};

interface UserFormProps {
  children: ReactNode;
  defaultValue: UserData;
  onSubmit: (user: UserData) => void;
}

function UserForm({ children, defaultValue, onSubmit }: UserFormProps) {
  return (
    <>
      <form
        id="userform"
        onSubmit={(event) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);

          const firstname = formData.get("firstname") as string;
          const lastname = formData.get("lastname") as string;
          const birthday = formData.get("birthday") as string;

          onSubmit({
            firstname,
            lastname,
            birthday,
          });
        }}
      >
        <input
          id="firstname-profile"
          type="text"
          name="firstname"
          defaultValue={defaultValue.firstname}
        />

        {/* */}

        <input
          id="lastname-profile"
          type="text"
          name="lastname"
          defaultValue={defaultValue.lastname}
        />

        {/* */}

        <input
          id="birthday-profile"
          type="date"
          name="birthday"
          defaultValue={defaultValue.birthday}
        />
        <button type="submit">{children}</button>
      </form>
    </>
  );
}

export default UserForm;
