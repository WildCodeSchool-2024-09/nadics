import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserForm from "../components/UserForm";

type User = {
  id: number;
  firstname: string;
  lastname: string;
  birthday: string;
  email: string;
  hashed_password: string;
};

function UserEdit() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [user, setUser] = useState(null as null | User);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`)
      .then((response) => response.json())
      .then((data: User) => {
        setUser(data);
      });
  }, [id]);

  return (
    user && (
      <UserForm
        defaultValue={user}
        onSubmit={(userData) => {
          fetch(`${import.meta.env.VITE_API_URL}/api/users/${user.id}`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }).then((response) => {
            if (response.status === 204) {
              navigate("/profil");
            }
          });
        }}
      >
        Modifier
      </UserForm>
    )
  );
}

export default UserEdit;
