import { Link } from "react-router-dom";

// Définir un type pour les propriétés du composant RequestCard
interface RequestCardProps {
  requests: Request[]; // Attente d'un tableau d'objets Request
}

// Définir un type pour les données de chaque demande
interface Request {
  id: number;
  title: string;
  tags: string[];
  user: string;
  details?: string;
  imgSrc?: string;
}

function RequestCard({ requests }: RequestCardProps): JSX.Element {
  const request = requests[0]; // Utilisation du premier élément du tableau

  return (
    <div className="card">
      <h2>{request.title}</h2>

      <div className="tags">
        {request.tags.map((tag, index) => (
          <span key={`${request.id}-${index}`} className={`tag${index + 1}`}>
            {tag}
          </span>
        ))}
      </div>
      {request.details && <p>{request.details}</p>}
      <div className="card-footer">
        {request.imgSrc && (
          <img src={request.imgSrc} alt="" className="profile-img" />
        )}
        <p className="name">{request.user}</p>
      </div>
      <Link to={`/request-details/${request.id}`}>Détails</Link>
    </div>
  );
}

export default RequestCard;
