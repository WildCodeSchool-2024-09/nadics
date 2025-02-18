import { useContext, useState } from "react";
import UserContext from "../context/userContext";
import type { UserType } from "../context/userContext";

interface PropsType {
  impactedPersonId: number | null; // L'état qui contient la personne impactée
  setImpactedPersonId: React.Dispatch<React.SetStateAction<number | null>>; // La fonction pour mettre à jour impactedPerson
}

function ImpactedPerson({
  impactedPersonId: impactedPerson,
  setImpactedPersonId: setImpactedPerson,
}: PropsType) {
  const { allUsers } = useContext(UserContext); // Récupère tous les utilisateurs depuis le contexte
  const [search, setSearch] = useState(""); // État pour gérer la recherche
  const [tempUsers, setTempUsers] = useState<UserType[]>([]); // Liste des utilisateurs sélectionnés

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
  const handleTempUserChange = (user: UserType) => {
    setTempUsers((prevUsers) => {
      if (prevUsers.includes(user)) {
        return prevUsers.filter((u) => u !== user); // Retire l'utilisateur de tempUsers s'il est déjà sélectionné
      }
      return [...prevUsers, user]; // Ajoute l'utilisateur à tempUsers s'il n'est pas encore sélectionné
    });
  };

  // Fonction pour mettre à jour la personne impactée dans les props
  const handleImpactedPersonChange = (id: number) => {
    setImpactedPerson(id); // Met à jour l'état de la personne impactée dans le parent
  };

  return (
    <>
      {/* Champ de recherche */}
      <h2>Impacted person</h2>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search a user impacted..."
      />

      {/* Liste filtrée des utilisateurs (n'affiche que si l'utilisateur a commencé à chercher) */}
      {
        search && filteredUsers.length > 0
          ? filteredUsers.map((user) => (
              <div className="listeFiltre" key={user.id}>
                <input
                  type="checkbox"
                  id={user.firstname}
                  checked={tempUsers.includes(user)}
                  onChange={() => {
                    handleTempUserChange(user);
                    handleImpactedPersonChange(user.id); // Met à jour impactedPerson lorsqu'un utilisateur est sélectionné
                  }}
                />
                <label htmlFor={user.firstname}>
                  {user.firstname} {user.lastname}
                </label>
              </div>
            ))
          : search && <div>User not found</div> // Affiche ce message uniquement si la recherche est active et sans résultat
      }

      {/* Afficher la personne impactée si elle est sélectionnée */}
      {impactedPerson && (
        <div>
          <h3>Selected Impacted Person</h3>
          <p>{impactedPerson}</p>
        </div>
      )}
    </>
  );
}

export default ImpactedPerson;
