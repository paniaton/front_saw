import { useHistory } from "react-router-dom";
import { LoginCredentials } from "../models/User";
import React, { useContext, useEffect, useState } from "react";
import { useAuthRepository } from "./AuthRepository";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (x: LoginCredentials) => Promise<string>;
  logout: () => void;
  loggedUserId: number | undefined;
  isAdmin: boolean;
}

export const AuthContext = React.createContext({} as AuthContextType);

const _isAuthenticated = () => !!localStorage.getItem("token");

export const AuthProvider = (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(_isAuthenticated());
  const history = useHistory();
  const authRepo = useAuthRepository();
  const [loggedUserId, setLoggedUserId] = useState<number | undefined>(
    Number(localStorage.getItem("user_id")!)
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    setIsAuthenticated(_isAuthenticated());
    if (isAuthenticated) {
      setLoggedUserId(Number(localStorage.getItem("user_id")));
      setIsAdmin(localStorage.getItem("admin") === "true");
    }
  }, []);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     const { id } = decode<{ id: number }>(localStorage.getItem("token")!);
  //     setLoggedUserId(id);
  //   }
  // }, [isAuthenticated]);

  const login = async (x: LoginCredentials) => {
    const { token, id, admin, session_id } = await authRepo.login(x);
    debugger;
    localStorage.setItem("token", token);
    localStorage.setItem("user_id", id);
    localStorage.setItem("admin", admin === 0 ? "false" : "true");
    localStorage.setItem("session_id", session_id);
    setIsAdmin(admin === 1);
    setLoggedUserId(id);
    setIsAuthenticated(true);
    history.push("/main/landing");
    return token;
  };

  const logout = () => {
    localStorage.setItem("token", "");
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    isAuthenticated,
    isAdmin,
    login,
    logout,
    loggedUserId,
  };
  return <AuthContext.Provider value={value} {...props} />;
};

export const useAuthService = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth debe estar dentro del proveedor AuthContext");
  }
  return authContext;
};
