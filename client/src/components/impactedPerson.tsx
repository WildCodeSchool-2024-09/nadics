import { useContext, useState } from "react";
import defaultAvatar from "../assets/images/avatar.png";
import UserContext from "../context/userContext";
interface PropsType {
  impactedPersonIds: number[]; // L'état qui contient id de la personne  impactée
  setImpactedPersonIds: React.Dispatch<React.SetStateAction<number[]>>;
}

function ImpactedPerson({
  impactedPersonIds,
  setImpactedPersonIds,
}: PropsType) {
  const { allUsers } = useContext(UserContext);
  const [search, setSearch] = useState(""); // État pour gérer la recherche
  // Fonction pour gérer la recherche
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value); // Met à jour l'état de la recherche
  };
  // Fonction pour filtrer les utilisateurs en fonction de la recherche
  const filteredUsers = allUsers.filter(
    (user) =>
      user.firstname
        .toLowerCase()
        .includes(search.toLowerCase()) || // Filtrage par prénom
      user.lastname.toLowerCase().includes(search.toLowerCase()), // Filtrage par nom
  );
  // Fonction pour gérer le changement de sélection des utilisateurs
  const handleImpactedPersonChange = (id: number) => {
    setImpactedPersonIds((prevIds) => {
      if (prevIds.includes(id)) {
        // Si l'utilisateur est déjà sélectionné, le retirer
        return prevIds.filter((userId) => userId !== id);
      }
      // Sinon, l'ajouter à la sélection
      return [...prevIds, id];
    });
  };
  return (
    <>
      {/* Champ de recherche */}
      <h2 id="titre_impact">Impacted person</h2>
      <input
        className="input_create"
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search impacted users..."
      />
      {/* Liste filtrée des utilisateurs (n'affiche que si l'utilisateur a commencé à chercher) */}
      <div id="filtre_container">
        {
          search && filteredUsers.length > 0
            ? filteredUsers.map((user) => (
                <div className="listeFiltre" key={user.id}>
                  <input
                    type="checkbox"
                    id="checkBox"
                    checked={impactedPersonIds.includes(user.id)}
                    onChange={() => {
                      handleImpactedPersonChange(user.id); // Met à jour impactedPerson lorsqu'un utilisateur est sélectionné
                    }}
                  />
                  <label
                    className="search_user"
                    htmlFor={`checkbox-${user.id}`}
                  >
                    <img
                      src={
                        user.avatar
                          ? `${import.meta.env.VITE_API_URL}/${user.avatar}`
                          : defaultAvatar
                      }
                      alt="avatar pic"
                      className="avatar_search"
                    />
                    {user.firstname} {user.lastname}
                  </label>
                </div>
              ))
            : search && <div>User not found</div> // Affiche ce message uniquement si la recherche est active et sans résultat
        }
      </div>
    </>
  );
}

export default ImpactedPerson;
