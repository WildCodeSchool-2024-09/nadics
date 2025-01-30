import "./RequestDetailCard.css";

// Définir le type des événements et des dates
export interface Event {
  date: string;
  event: string;
}

export interface RequestDetailCardProps {
  title: string;
  details?: string;
  theme?: string;
  userName: string;
  userAvatar: string;
  impactingUserAvatar: string;
  impactedUserAvatar: string;
  events: Event[]; // Tableau d'événements et dates
  tags?: string[]; // Rendre tags optionnel
}

const ImpactPerson: React.FC<{ userName: string; userAvatar: string }> = ({
  userName,
  userAvatar,
}) => (
  <div className="impact-person">
    <div className="avatar">{userAvatar}</div>
    <p>{userName}</p>
  </div>
);

const ImpactSection: React.FC<{
  impactingUserAvatar: string;
  impactedUserAvatar: string;
}> = ({ impactingUserAvatar, impactedUserAvatar }) => {
  const defaultImpactingUserName = "Impacting User";
  const defaultImpactedUserName = "Impacted User";

  return (
    <div className="impact-sections">
      <div className="impact-person">
        <h2>Impacting Person</h2>
        <ImpactPerson
          userName={defaultImpactingUserName}
          userAvatar={impactingUserAvatar}
        />
      </div>
      <div className="impact-person">
        <h2>Impacted Person</h2>
        <ImpactPerson
          userName={defaultImpactedUserName}
          userAvatar={impactedUserAvatar}
        />
      </div>
    </div>
  );
};

const Table: React.FC<{ events: Event[] }> = ({ events }) => (
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
      <tbody>
        {events.map((event) => (
          <tr key={event.date}>
            <td>{event.date}</td>
            <td>{event.event}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const RequestDetailCard: React.FC<RequestDetailCardProps> = ({
  impactingUserAvatar,
  impactedUserAvatar,
  events,
}) => {
  const defaultEvents: Event[] = [
    { date: "2025-02-15", event: "Project Kickoff" },
    { date: "2025-03-10", event: "Mid Phase Review" },
    { date: "2025-04-01", event: "Project Launch" },
  ];

  const defaultImpactingUserAvatar = "👩‍💼";
  const defaultImpactedUserAvatar = "🧑‍🔧";

  return (
    <div className="request-detail-card">
      <Table events={events || defaultEvents} />
      <ImpactSection
        impactingUserAvatar={impactingUserAvatar || defaultImpactingUserAvatar}
        impactedUserAvatar={impactedUserAvatar || defaultImpactedUserAvatar}
      />
    </div>
  );
};

export default RequestDetailCard;
