import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defaultAvatar from "../assets/images/avatar.png";
import "./RequestCard.css";

interface Request {
  id: number;
  title: string;
  date: string;
  avatar: string;
  firstname: string;
  lastname: string;
  tag1: string;
  tag2?: string;
}

function RequestCard(): JSX.Element {
  const [requests, setRequests] = useState<Request[]>([]);
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
