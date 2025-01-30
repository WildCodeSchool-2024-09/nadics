import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export type UserType = {
  sub: number;
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

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

export const UserProvider = ({
  // creation de provider pour passer context
  children,
}: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const authToken = getCookie("authToken");
    if (authToken) {
      const decodedToken = jwtDecode<UserType>(authToken);
      // Extraire les informations nécessaires
      setUser(decodedToken);
    }
  }, []);

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
