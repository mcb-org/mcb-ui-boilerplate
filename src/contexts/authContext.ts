import { createContext, } from "react";

export interface User {
  id: number;
  email: string;
  password?: string; // Optional, only for login
  name: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
