// Dans RequestDetailCard.tsx ou le fichier où le composant est défini
export interface RequestDetailCardProps {
  title: string;
  details: string;
  theme: string;
  userName: string; // Ajout de userName
  userAvatar: string; // Ajout de userAvatar
}

const RequestDetailCard: React.FC<RequestDetailCardProps> = ({
  title,
  details,
  theme,
  userName,
  userAvatar,
}) => {
  return (
    <div className="request-detail-card">
      <img src={userAvatar} alt={`${userName}'s avatar`} />
      <h2>{title}</h2>
      <p>{details}</p>
      <p>{theme}</p>
      <p>{userName}</p>
    </div>
  );
};

export default RequestDetailCard;
