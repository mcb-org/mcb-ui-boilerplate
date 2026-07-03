import {
  useState,
  useCallback,
  type ReactNode,
  type FC,
} from "react";
import { AuthContext, type User } from "./authContext";

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("authToken");
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const saved = localStorage.getItem("user");
      const parsedUser = saved ? (JSON.parse(saved) as User) : null;
      const fallbackName = email.split("@")[0]?.replace(/[._-]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) || "Starter User";

      const mockUser: User = {
        id: parsedUser?.id ?? 1,
        email,
        password,
        name: parsedUser?.name ?? fallbackName,
      };

      localStorage.setItem("authToken", "mock-token-123");
      localStorage.setItem("user", JSON.stringify(mockUser));

      setUser(mockUser);
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
