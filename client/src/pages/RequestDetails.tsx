import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentAdd from "../components/CommentAdd";
import type { Event as EventType } from "../components/RequestDetailCard";
import RequestDetailCard from "../components/RequestDetailCard";
import "./RequestDetails.css";
import defaultAvatar from "../assets/images/avatar.jpg";
import UserContext from "../context/userContext";
import type { UserTypeContext } from "../context/userContext";

interface RequestDetailsType {
  id: number;
  title: string;
  details: string;
  theme: string;
  userAvatar: string;
  userName: string;
  impactingUserAvatar: string;
  impactedUserAvatar: string;
  impactingUserName: string;
  impactedUserName: string;
  events: EventType[];
}
interface CommentType {
  id: number;
  date: string;
  details: string;
  user_id: number;
  request_id: number;
  firstname: string;
  lastname: string;
  avatar: string;
}

function RequestDetails() {
  const { user } = useContext<UserTypeContext>(UserContext);
  const { id } = useParams<string>();
  const [requestDetails, setRequestDetails] =
    useState<RequestDetailsType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Gérer la modale

  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    if (!id) {
      setError("Request ID is not available.");
      setLoading(false);
      return;
    }

    const requestId = Number(id);

    const fetchRequestDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/request/${requestId}`,
        );
        if (!response.ok) throw new Error("Request not found");
        const data = await response.json();

        const events: EventType[] = data.events || [];
        setRequestDetails({
          ...data,
          events,
        });
      } catch (err) {
        setError("Error fetching request details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetails();
  }, [id]);

  useEffect(() => {
    if (!user) return; // Vérifie si user est null avant d'exécuter le fetch
    if (!requestDetails) return; // Vérifie si user est null avant d'exécuter le fetch

    fetch(
      `${import.meta.env.VITE_API_URL}/api/comments/request/${requestDetails.id}`,
    )
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Erreur lors du fetch :", error));
  }, [user, requestDetails]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!requestDetails) return <div>Request not found.</div>;

  return (
    <>
      <div className="request-details-container">
        <div className="mobile-header-tags">
          <span className="mobile-tag1">Tag 1</span>
          <span className="mobile-tag2">Tag 2</span>
        </div>
        <h1>{requestDetails.title}</h1>
        <div id="user_info">
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
          <p className="name_user">by {user?.firstname}</p>
        </div>
        <div className="details-wrapper">
          <div className="details-and-table">
            <div className="details-container">
              {["Reason of the request", "How to do it", "Why to do it"].map(
                (summaryText) => (
                  <details key={summaryText}>
                    <summary>{summaryText}</summary>
                    {requestDetails.details || "No description available."}
                  </details>
                ),
              )}
            </div>
            {comments && (
              <div className="details-container">
                <details>
                  <summary>Comments</summary>
                  {comments.map((comment) => (
                    <details key={comment.id}>
                      <summary>
                        {comment.date} {comment.firstname} {comment.lastname}{" "}
                        <img
                          src={
                            comment.avatar
                              ? `${import.meta.env.VITE_API_URL}/${comment.avatar}`
                              : defaultAvatar
                          }
                          alt="comment_icon"
                          id="avatar_icon"
                        />{" "}
                      </summary>
                      {comment.details}
                    </details>
                  ))}
                </details>
              </div>
            )}
          </div>

          <div className="right-details">
            <div className="button-container">
              <button
                type="button"
                className="home-button"
                onClick={() => setIsModalOpen(true)}
              >
                Give my opinion
              </button>
            </div>
            <RequestDetailCard
              {...requestDetails}
              events={requestDetails.events}
            />
          </div>
        </div>
      </div>

      {/* Affichage de la modale */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CommentAdd
              onClose={() => setIsModalOpen(false)}
              requestId={requestDetails.id}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default RequestDetails;
