import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteRequest from "./DeleteRequest";
import UserContext from "../context/userContext";
import defaultAvatar from "../assets/images/avatar.jpg";

// Définir un type pour les données de chaque demande date`,title, theme, details, user_id
interface Request {
  id: number;
  title: string;
  theme: string;
  date: string;
  details?: string;
}

function RequestCard(): JSX.Element {
  const [requests, setRequests] = useState<Request[]>([]); // Utilisation du premier élément du tableau

  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/request`)
      .then((response) => response.json())
      .then((data) => setRequests(data));
  }, []);

  return (
    <>
      {requests.map((request) => (
        <div key={request.id}>
          <Link to={`/request-details/${request.id}`} key={request.id}>
            <div className="card" key={request.id}>
              <h2>{request.title}</h2>
              {request.details && <p>{request.details}</p>}
              <div className="card-footer">
                <p className="name">{request.theme}</p>
                <p className="name">{request.date}</p>
              </div>
              {user && (
                <img
                  src={
                    user.avatar
                      ? `${import.meta.env.VITE_API_URL}/${user.avatar}`
                      : defaultAvatar
                  }
                  alt="avatar"
                  id="avatar_icon"
                />
              )}
            </div>
          </Link>

          <DeleteRequest id={request.id} />
        </div>
      ))}
    </>
  );
}

export default RequestCard;
