interface RequestDetailCardProps {
  title: string;
  details: string;
  theme: string;
}

const RequestDetailCard: React.FC<RequestDetailCardProps> = ({
  title,
  details,
  theme,
}) => {
  return (
    <div className="request-detail-card">
      <h2>{title}</h2>
      <p>{details || "No description available"}</p>

      <div className="impact-sections">
        <div className="avatar-container">{theme}</div>
        <div className="impact-person">
          <h3>Impacting person</h3>
          <p>user1 en dur</p>
        </div>

        <div className="impact-person">
          <h3>Impacted person</h3>
          <p>user1 en dur</p>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailCard;
