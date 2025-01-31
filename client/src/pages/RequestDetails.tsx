import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentAdd from "../components/CommentAdd";
import RequestDetailCard from "../components/RequestDetailCard";
import "./RequestDetails.css";
import defaultAvatar from "../assets/images/avatar.jpg";
import UserContext from "../context/userContext";
import type { UserTypeContext } from "../context/userContext";

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

interface RequestUser {
  id: number;
  title: string;
  theme: string;
  date: string;
  details?: string;
  firstname: string;
  lastname: string;
  avatar: string;
}

function RequestDetails() {
  const { user } = useContext<UserTypeContext>(UserContext);
  const { id } = useParams<string>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Gérer la modale
  const [comments, setComments] = useState<CommentType[]>([]);
  const [request, setRequest] = useState<RequestUser | null>(null);

  useEffect(() => {
    if (!id) return; // Vérifie si user est null avant d'exécuter le fetch
    const requestId = Number(id);
    fetch(`${import.meta.env.VITE_API_URL}/api/request/${requestId}`)
      .then((response) => response.json())
      .then((data) => setRequest(data))
      .catch((error) => console.error("Erreur lors du fetch :", error));
  }, [id]);

  useEffect(() => {
    if (!user) return; // Vérifie si user est null avant d'exécuter le fetch
    if (!request) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/comments/request/${request.id}`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Erreur lors du fetch :", error));
  }, [user, request]);

  return (
    <>
      {request && (
        <div className="request-details-container">
          <div className="mobile-header-tags">
            <span className="mobile-tag1">Tag 1</span>
            <span className="mobile-tag2">Tag 2</span>
          </div>
          <h1>{request.title}</h1>
          <div id="user_info">
            <img
              src={
                request.avatar
                  ? `${import.meta.env.VITE_API_URL}/${request.avatar}`
                  : defaultAvatar
              }
              alt="avatar"
              id="avatar_icon"
            />
            <p className="name_user">by {request.firstname}</p>
          </div>
          <div className="details-wrapper">
            <div className="details-and-table">
              <div className="details-container">
                {["Reason of the request", "How to do it", "Why to do it"].map(
                  (summaryText) => (
                    <details key={summaryText}>
                      <summary>{summaryText}</summary>
                      {request.details || "No description available."}
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
                title={""}
                userName={""}
                userAvatar={""}
                impactingUserAvatar={""}
                impactedUserAvatar={""}
                events={[]}
              />
            </div>
          </div>
          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <CommentAdd
                  onClose={() => setIsModalOpen(false)}
                  requestId={request.id}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default RequestDetails;
