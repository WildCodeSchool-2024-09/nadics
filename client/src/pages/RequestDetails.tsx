import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RequestDetailCard from "../components/RequestDetailCard";
import "./RequestDetails.css";
// import "./RequestDetailCard.css";

// Définition du type pour les détails de la demande
interface RequestDetailsType {
  id: number;
  title: string;
  details: string;
  theme: string;
  userAvatar: string; // Ajout de l'avatar de l'utilisateur
  userName: string; // Ajout du nom de l'utilisateur
}

const Table: React.FC = () => (
  <table>
    <thead>
      <tr>
        <th colSpan={2} className="centered-title">
          Save the date
        </th>
      </tr>
      <tr>
        <th>Date 1</th>
        <th>Event 1</th>
      </tr>
      <tr>
        <th colSpan={2} className="arrow">
          <span className="arrow-down">&#8595;</span>
        </th>
      </tr>
      <tr>
        <th>Date 2</th>
        <th>Event 2</th>
      </tr>
      <tr>
        <th colSpan={2} className="arrow">
          <span className="arrow-down">&#8595;</span>
        </th>
      </tr>
      <tr>
        <th>Date 3</th>
        <th>Event 3</th>
      </tr>
      <tr>
        <th colSpan={2} className="arrow">
          <span className="arrow-down">&#8595;</span>
        </th>
      </tr>
      <tr>
        <th>Date 4</th>
        <th>Event 4</th>
      </tr>
    </thead>
    <tbody>{/* No additional rows */}</tbody>
  </table>
);

function RequestDetails() {
  const { id } = useParams<string>(); // Récupère l'ID de la demande depuis les paramètres de l'URL
  const [requestDetails, setRequestDetails] =
    useState<RequestDetailsType | null>(null); // Données de la demande
  const [error, setError] = useState<string | null>(null); // Erreurs potentielles
  const [loading, setLoading] = useState<boolean>(true); // État de chargement des données

  const [isMobile, setIsMobile] = useState<boolean>(false); // État pour vérifier si c'est un appareil mobile

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // Si la largeur de la fenêtre est inférieure ou égale à 1024px, c'est un mobile
    };

    // Initialiser la vérification de la taille de l'écran
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // Nettoyer l'événement lors du démontage
    };
  }, []);

  useEffect(() => {
    if (!id) {
      setError("Request ID is not available."); // Si l'ID est manquant, afficher une erreur
      setLoading(false);
      return;
    }

    const requestId = Number(id); // Convertir l'ID en nombre

    // Fonction pour récupérer les détails de la demande (méthode GET)
    const fetchRequestDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/request/${requestId}`, // URL dynamique avec l'ID de la demande
        );
        if (!response.ok) {
          throw new Error("Request not found"); // Gérer l'erreur si la demande n'est pas trouvée
        }
        const data = await response.json(); // Si tout va bien, récupérer les données
        setRequestDetails(data); // Stocker les données dans l'état
        setLoading(false); // Fin du chargement
      } catch (err) {
        setError("Error fetching request details."); // Si une erreur se produit
        setLoading(false);
      }
    };

    fetchRequestDetails(); // Appeler la fonction pour récupérer les détails
  }, [id]);

  if (loading) return <div>Loading...</div>; // Afficher "Loading..." pendant le chargement des données
  if (error) return <div>{error}</div>; // Afficher l'erreur en cas de problème
  if (!requestDetails) return <div>Request not found.</div>; // Afficher un message si la demande n'est pas trouvée

  return (
    <div className="request-details-container">
      {isMobile && (
        <div className="mobile-header-tags">
          {/* Ajout de 2 tags uniquement pour la version mobile */}
          <span className="mobile-tag1">Tag 1</span>
          <span className="mobile-tag2">Tag 2</span>
        </div>
      )}
      <p className="request-id">Request n°: {requestDetails.id}</p>
      <div className="details-and-table">
        <div className="details-container">
          <details>
            <summary>Reason of the request</summary>
            {requestDetails.details || "No description available."}
          </details>
          <details>
            <summary>How to do it</summary>
            {requestDetails.details || "No description available."}
          </details>
          <details>
            <summary>Why to do it</summary>
            {requestDetails.details || "No description available."}
          </details>
        </div>

        <div className="button-container">
          <Link to="/" className="button-opinion">
            <button type="button" className="home-button">
              Give my opinion
            </button>
          </Link>
        </div>

        <div className="table-container">
          <Table />
        </div>
      </div>
      <RequestDetailCard
        title={requestDetails.title}
        details={requestDetails.details}
        theme={requestDetails.theme}
        userName={requestDetails.userName}
        userAvatar={requestDetails.userAvatar}
      />
    </div>
  );
}

export default RequestDetails;
