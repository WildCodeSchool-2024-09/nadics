import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export type AuthType = {
  token: string;
};

export type AuthContextType = {
  auth: AuthType | null; // Permet d'avoir un utilisateur ou null au départ
  setAuth: React.Dispatch<React.SetStateAction<AuthType | null>>; // Typage correct pour setUser
};

const defaultValue: AuthContextType = {
  auth: null, // Pas d'utilisateur par défaut
  setAuth: () => {}, // Valeur par défaut temporaire
};
const AuthContext = createContext<AuthContextType>(defaultValue);

export const AuthProvider = ({
  // creation de provider pour passer context
  children,
}: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthType | null>(null);

  useEffect(() => {
    // Vérifier la présence du token dans localStorage au démarrage
    const token = Cookies.get("authToken");
    if (token) {
      setAuth({ token });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
