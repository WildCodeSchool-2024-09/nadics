import { createContext, useEffect, useState } from "react";

export type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  birthday: string;
  avatar: string;
};

export type UserTypeContext = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  allUsers: UserType[];
  setAllUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
};

const defaultValue: UserTypeContext = {
  user: null, // Pas d'utilisateur par défaut
  setUser: () => {}, // Valeur par défaut temporaire
  allUsers: [],
  setAllUsers: () => [],
};

const UserContext = createContext<UserTypeContext>(defaultValue); // creation de context

export const UserProvider = ({
  // creation de provider pour passer context
  children,
}: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [userConnected, setUserConnected] = useState<UserType | null>(null);
  const [allUsers, setAllUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
          method: "GET",
          credentials: "include",
        });
        if (response.status === 200) {
          const data = await response.json();
          setUserConnected(data);
        } else {
          setUserConnected(null);
        }
      } catch (err) {
        setUserConnected(null);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (!userConnected) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/users/${userConnected.id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error("Error while fetching :", error));
  }, [userConnected]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users`)
      .then((response) => response.json())
      .then((data) => {
        setAllUsers(data);
      })
      .catch((error) => console.error("Error while fetching :", error));
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        allUsers,
        setAllUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
