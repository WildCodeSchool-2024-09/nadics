import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentAdd from "../components/CommentAdd";
import CommentDelete from "../components/CommentDelete";
import CommentEdit from "../components/CommentEdit";
import RequestDetailCard from "../components/RequestDetailCard";
import "./RequestDetails.css";
import parse from "html-react-parser";
import defaultAvatar from "../assets/images/avatar.jpg";
import DeleteRequest from "../components/RequestDelete";
import RequestEdit from "../components/RequestEdit";
import EditorText from "../components/reuasble-ui/EditorText";
import UserContext from "../context/userContext";
import type { UserTypeContext } from "../context/userContext";

export interface CommentType {
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
  impacted_person: number;
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
  const [editedComment, setEditedComment] = useState<Partial<CommentType>>({});
  const [isEditing, setIsEditing] = useState<boolean>(false); //etat pour modifier request
  const [isEditingComment, setIsEditingComment] = useState<boolean>(false); //etat pour modifier comment

  useEffect(() => {
    if (!id) return; // Vérifie si user est null avant d'exécuter le fetch
    const requestId = Number(id);
    fetch(`${import.meta.env.VITE_API_URL}/api/request/${requestId}`)
      .then((response) => response.json())
      .then((data) => {
        setRequest(data);
        setEditedRequest({ ...data }); // au rechargement du composant editedRequest va garder sa valeur précédente grâce à {... data}
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
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setEditedRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (name: string, value: string) => {
    setEditedRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChangeComment = (value: string) => {
    setEditedComment((prev) => ({ ...prev, details: value }));
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
                      <EditorText
                        name={key}
                        value={
                          (editedRequest[key as keyof RequestUser] as string) ||
                          ""
                        }
                        onChange={(value: string) =>
                          handleEditorChange(key, value)
                        }
                        placeholder="Edit your decision here ..."
                      />
                    ) : request[key as keyof RequestUser] ? (
                      parse(request[key as keyof RequestUser] as string)
                    ) : (
                      "No description available."
                    )}
                  </details>
                </div>
              ))}
              <RequestEdit
                request={request}
                setRequest={setRequest}
                editedRequest={editedRequest}
                setEditedRequest={setEditedRequest}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
              {comments && (
                <div className="details-container">
                  <details>
                    <summary>Comments</summary>
                    {comments.map((comment: CommentType) => (
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
                        {isEditingComment ? (
                          <EditorText
                            name="details"
                            value={
                              editedComment.details === undefined
                                ? comment.details
                                : editedComment.details
                            }
                            onChange={handleInputChangeComment}
                            placeholder="Edit your comment here ..."
                          />
                        ) : (
                          parse(comment.details as string)
                        )}
                        <div className="group-button">
                          {user && comment.user_id === user.id && (
                            <CommentDelete id={comment.id} />
                          )}
                          {user && comment.user_id === user.id && (
                            <CommentEdit
                              comment={comment}
                              editedComment={editedComment}
                              setEditedComment={setEditedComment}
                              isEditingComment={isEditingComment}
                              setIsEditingComment={setIsEditingComment}
                            />
                          )}
                        </div>
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
              <RequestDetailCard impacted_personId={request.impacted_person} />
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
