import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defaultAvatar from "../assets/images/avatar.jpg";
import "./RequestCard.css";

// Définir un type pour les données de chaque demande date`,title, theme, details, user_id
interface Request {
  id: number;
  title: string;
  theme: string;
  date: string;
  details?: string;
  avatar: string;
  firstname: string;
  lastname: string;
  tag1: string;
  tag2?: string;
}

function RequestCard(): JSX.Element {
  const [requests, setRequests] = useState<Request[]>([]); // Utilisation du premier élément du tableau
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/request/`)
      .then((response) => response.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error("Erreur lors du fetch :", error));
  }, []);

  return (
    <>
      {requests.map((request) => (
        <div key={request.id}>
          <Link to={`/request-details/${request.id}`} key={request.id}>
            <div className="card" key={request.id}>
              <div className="tags">
                {request.tag1 && <span className="tag-1">{request.tag1}</span>}
                {request.tag2 && <span className="tag-2">{request.tag2}</span>}
              </div>
              <h2 className="title-card">{request.title}</h2>
              {request.details && <p>{request.details}</p>}
              <div className="card-footer">
                <p className="name">{request.theme}</p>
              </div>
              <div className="footer-card">
                <img
                  src={
                    request.avatar
                      ? `${import.meta.env.VITE_API_URL}/${request.avatar}`
                      : defaultAvatar
                  }
                  alt="avatar"
                  id="avatar_icon"
                />
                <p>
                  By {request.firstname} {request.lastname}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}

export default RequestCard;
