import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestCard from "../components/RequestCard";
import "./HomePage.css";

interface Request {
  id: number;
  title: string;
  tags: string[];
  user: string;
  details?: string;
  imgSrc?: string;
}

const simulatedOngoingRequests: Request[] = [
  {
    id: 0,
    title: "Problème de serveur",
    tags: ["Serveur", "Urgent", "Problème"],
    user: "Cédric",
    imgSrc: "/images/cedric.jpg",
  },
  {
    id: 1,
    title: "Problème réseau",
    tags: ["Réseau", "Urgent", "Problème"],
    user: "Amélie",
    imgSrc: "/images/amelie.jpg",
  },
  {
    id: 2,
    title: "Problème de sécurité",
    tags: ["Sécurité", "Urgent"],
    user: "Xavier",
    imgSrc: "/images/xavier.jpg",
  },
  {
    id: 3,
    title: "Problème d'impression",
    tags: ["Impression", "Matériel", "En attente"],
    user: "Isabelle",
    imgSrc: "/images/isabelle.jpg",
  },
];

function HomePage(): JSX.Element {
  const navigate = useNavigate();
  const [ongoingRequests, setOngoingRequests] = useState<Request[]>([]);

  useEffect(() => {
    setOngoingRequests(simulatedOngoingRequests);
  }, []);

  const handleCardClick = (id: number): void => {
    navigate(`/request-details/${id}`); // Redirige vers la page de détails
  };

  return (
    <div>
      <button id="button" type="button">
        Submit a request
      </button>
      <main>
        <section id="ongoing-requests">
          <h3>Ongoing Requests</h3>
          <div className="cards-container">
            {ongoingRequests.map((request) => (
              <button
                key={request.id}
                onClick={() => handleCardClick(request.id)}
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: 0,
                }}
                type="button"
              >
                <RequestCard requests={[request]} />
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
