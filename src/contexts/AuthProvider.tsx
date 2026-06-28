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
      // Mock login - replace with real API call
      const mockUser: User = {
        id: 1,
        email,
        password,
        name: "John Doe",
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
