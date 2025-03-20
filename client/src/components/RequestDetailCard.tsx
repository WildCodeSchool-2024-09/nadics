import { useEffect, useState } from "react";
import "./RequestDetailCard.css";

interface PropsType {
  requestId: number;
}
interface Impacted_personType {
  id: number;
  firstname: string;
  lasttname: string;
  avatar: string;
}

function RequestDetailCard({ requestId }: PropsType) {
  const [impactedPersons, setImpactedPersons] = useState<
    Impacted_personType[] | null
  >([]);
  const [impactingPersons, setImpactingPersons] = useState<
    Impacted_personType[] | null
  >([]);

  useEffect(() => {
    if (requestId)
      fetch(`${import.meta.env.VITE_API_URL}/api/impacted_person/${requestId}`)
        .then((response) => response.json())
        .then((data) => {
          setImpactedPersons(data);
        })
        .catch((error) => console.error("Error while fetching :", error));
  }, [requestId]);

  useEffect(() => {
    if (requestId)
      fetch(`${import.meta.env.VITE_API_URL}/api/impacting_person/${requestId}`)
        .then((response) => response.json())
        .then((data) => {
          setImpactingPersons(data);
        })
        .catch((error) => console.error("Error while fetching :", error));
  }, [requestId]);

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
        <div>
          <h2>Impacted Person</h2>
          <div className="impact-person">
            {impactedPersons?.map((impactedPerson) => (
              <div key={impactedPerson.id}>
                <div className="avatar">
                  {" "}
                  <img
                    className="avatar"
                    src={`${import.meta.env.VITE_API_URL}/${impactedPerson.avatar}`}
                    alt=""
                  />
                </div>
                <p className="user-name">{impactedPerson.firstname}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2>Impacting Person</h2>
          <div className="impact-person">
            {impactingPersons?.map((impactingPerson) => (
              <div key={impactingPerson.id}>
                <div className="avatar">
                  {" "}
                  <img
                    className="avatar"
                    src={`${import.meta.env.VITE_API_URL}/${impactingPerson.avatar}`}
                    alt=""
                  />
                </div>
                <p className="user-name">{impactingPerson.firstname}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestDetailCard;
