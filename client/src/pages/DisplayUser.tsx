import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DisplayUser() {
  interface usersType {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
  }

  //   const users: usersType[] = [
  //     {
  //       id: 1,
  //       firstname: "Alex",
  //       lastname: "Jana",
  //       email: "aljana@gmail.com",
  //     },
  //     {
  //       id: 2,
  //       firstname: "Nad",
  //       lastname: "ASNOS",
  //       email: "nadasnos@gmail.com",
  //     },
  //   ];

  const [user, setUser] = useState<usersType>();
  const { id } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`)
      .then((resultatApi) => resultatApi.json())
      .then((responseJson) => setUser(responseJson));
  }, [id]);

  return (
    <>
      {user ? (
        <div>
          <p>{user.id}</p>
          <p>{user.firstname}</p>
          <p>{user.lastname}</p>
          <p>{user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* <>
        <h1>User information</h1>
        <div>
          <p>{users[0].id}</p>
          <p>{users[0].firstname}</p>
          <p>{users[0].lastname}</p>
          <p>{users[0].email}</p>
        </div>
        <h1>User information</h1>
        <div>
          <p>{users[1].id}</p>
          <p>{users[1].firstname}</p>
          <p>{users[1].lastname}</p>
          <p>{users[1].email}</p>
        </div>
      </> */}
    </>
  );
}

export default DisplayUser;
