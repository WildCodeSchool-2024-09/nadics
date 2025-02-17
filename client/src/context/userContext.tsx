import { createContext, useState } from "react";

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
