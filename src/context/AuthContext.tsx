import React, { createContext, useContext, useState} from "react";
import { loginRequest } from "../Services/LoginServce";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  async function login(user: string, password: string) {
    try {
      const { data } = await loginRequest(user, password);
      localStorage.setItem("token", data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log("Catch login");
      throw new Error("Credenciales invalidas")
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
