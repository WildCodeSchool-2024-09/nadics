import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentAdd from "../components/CommentAdd";
import RequestDetailCard from "../components/RequestDetailCard";
import "./RequestDetails.css";
import defaultAvatar from "../assets/images/avatar.jpg";
import DeleteRequest from "../components/RequestDelete";
import RequestEdit from "../components/RequestEdit";
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

export interface RequestUser {
  id: number;
  title: string;
  date: string;
  tag1: string;
  tag2: string;
  details1: string;
  details2: string;
  details3: string;
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
  const [editedRequest, setEditedRequest] = useState<Partial<RequestUser>>({});
  const [isEditing, setIsEditing] = useState<boolean>(false); //etat pour modifier request

  useEffect(() => {
    if (!id) return; // Vérifie si user est null avant d'exécuter le fetch
    const requestId = Number(id);
    fetch(`${import.meta.env.VITE_API_URL}/api/request/${requestId}`)
      .then((response) => response.json())
      .then((data) => {
        setRequest(data);
        setEditedRequest({ ...data });
      })
      .catch((error) => console.error("Error while fetching :", error));
  }, [id]);

  useEffect(() => {
    if (!user) return; // Vérifie si user est null avant d'exécuter le fetch
    if (!request) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/comments/request/${request.id}`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error while fetching :", error));
  }, [user, request]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setEditedRequest((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {request && (
        <div className="request-details-container">
          {isEditing ? (
            <input
              type="text"
              name="title"
              value={editedRequest.title || ""}
              onChange={handleInputChange}
            />
          ) : (
            <h1>{request.title}</h1>
          )}
          <div className="mobile-header-tags">
            {isEditing ? (
              <div className="tag_select">
                <label htmlFor="choix">Select primary tag (required):</label>
                <select
                  id="choix"
                  name="tag1"
                  value={editedRequest.tag1 || ""}
                  onChange={handleInputChange}
                >
                  <option value="Sport">Sport</option>
                  <option value="Eat">Eat</option>
                  <option value="Drink">Drink</option>
                  <option value="Sex">Sex</option>
                </select>
              </div>
            ) : (
              <span className="mobile-tag1">{request.tag1}</span>
            )}
            {isEditing ? (
              <div className="tag_select">
                <label htmlFor="choix">Select primary tag (required):</label>
                <select
                  id="choix"
                  name="tag2"
                  value={editedRequest.tag2 || ""}
                  onChange={handleInputChange}
                >
                  <option value="Sport">Sport</option>
                  <option value="Eat">Eat</option>
                  <option value="Drink">Drink</option>
                  <option value="Sex">Sex</option>
                </select>
              </div>
            ) : (
              <span className="mobile-tag1">{request.tag2}</span>
            )}
          </div>

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
              {["details1", "details2", "details3"].map((key, index) => (
                <div className="details-container" key={key}>
                  <details>
                    <summary>
                      {index === 0
                        ? "Reason of the request"
                        : index === 1
                          ? "How to do it"
                          : "Why to do it?"}
                    </summary>
                    {isEditing ? (
                      <input
                        type="text"
                        name={key}
                        value={editedRequest[key as keyof RequestUser] || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      request[key as keyof RequestUser] ||
                      "No description available."
                    )}
                  </details>
                </div>
              ))}
              <RequestEdit
                request={request}
                setRequest={setRequest}
                editedRequest={editedRequest}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
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
          <DeleteRequest id={request.id} />
        </div>
      )}
    </>
  );
}

export default RequestDetails;
