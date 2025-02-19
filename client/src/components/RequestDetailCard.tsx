import { useEffect, useState } from "react";
import "./RequestDetailCard.css";
import type { UserType } from "../context/userContext";

interface PropsType {
  impacted_personId: number;
}

function RequestDetailCard({ impacted_personId }: PropsType) {
  const [impactedPerson, setImpactedPerson] = useState<UserType | null>(null);
  useEffect(() => {
    if (!impacted_personId) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/users/${impacted_personId}`)
      .then((response) => response.json())
      .then((data) => {
        setImpactedPerson(data);
      })
      .catch((error) => console.error("Error while fetching :", error));
  }, [impacted_personId]);

  return (
    <div className="request-detail-card">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th colSpan={2} className="centered-title">
                Save the Date
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
          {/* <tbody>
            {events.map((event) => (
              <tr key={event.date}>
                <td>{event.date}</td>
                <td>{event.event}</td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
      <div className="impact-sections">
        <div className="impact-person">
          <h2>Impacting Person</h2>
          <div className="impact-person">
            <div className="avatar">
              {" "}
              <img
                className="avatar"
                src={`${import.meta.env.VITE_API_URL}/${impactedPerson?.avatar}`}
                alt=""
              />
            </div>
            <p>{impactedPerson?.firstname}</p>
          </div>
        </div>
        <div className="impact-person">
          <h2>Impacted Person</h2>
          <div className="impact-person">
            <div className="avatar">
              {" "}
              <img
                className="avatar"
                src={`${import.meta.env.VITE_API_URL}/${impactedPerson?.avatar}`}
                alt=""
              />
            </div>
            <p>{impactedPerson?.firstname}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestDetailCard;
