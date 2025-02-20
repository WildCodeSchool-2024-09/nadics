import { createContext, useEffect, useState } from "react";

export type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  birthday: string;
  avatar: string;
};

export type UserTypeContext = {
  user: UserType | null; // Permet d'avoir un utilisateur ou null au départ
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>; // Typage correct pour setUser
};

const defaultValue: UserTypeContext = {
  user: null, // Pas d'utilisateur par défaut
  setUser: () => {}, // Valeur par défaut temporaire
};

const UserContext = createContext<UserTypeContext>(defaultValue); // creation de context

export const UserProvider = ({
  // creation de provider pour passer context
  children,
}: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [userConnected, setUserConnected] = useState<UserType | null>(null);

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

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
