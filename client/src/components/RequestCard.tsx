import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/request`)
      .then((response) => response.json())
      .then((data) => setRequests(data));
  }, []);

  return (
    <>
      {requests.map((request) => (
        <Link to={`/request-details/${request.id}`} key={request.id}>
          <div className="card" key={request.id}>
            <h2>{request.title}</h2>
            {request.details && <p>{request.details}</p>}
            <div className="card-footer">
              <p className="name">{request.theme}</p>
              <p className="name">{request.date}</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default RequestCard;
