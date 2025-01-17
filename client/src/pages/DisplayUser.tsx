import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function DisplayUser() {
  interface usersType {
    id: number;
    firstname: string;
    lastname: string;
    birthday: string;
  }

  // Data en dur pour tester :

  // const users: usersType[] = [
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
          <p>{user.birthday}</p>
          <Link to={`/users/${user.id}/edit`}>Modifier</Link>{" "}
          {/*pour atterir dans la page du user en question pour modifier ses infos*/}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default DisplayUser;
