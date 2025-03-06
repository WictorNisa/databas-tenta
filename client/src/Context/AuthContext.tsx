import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { Navigate, useNavigate } from "react-router-dom";

// 1. Define Types
interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

// 2. Create Context with Explicit Type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Authentication Provider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load initial state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Login method
  const login = (userData: User, authToken: string) => {
    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);

    // Update state
    setUser(userData);
    setToken(authToken);
  };

  // Logout method
  const logout = () => {
    // Remove from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Clear state
    setUser(null);
    setToken(null);
  };

  // Context value
  const contextValue = {
    user,
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// 4. Custom Hook for Authentication
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

// 5. Protected Route Component
export const ProtectedRoute: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If user exists, render children
  return <>{children}</>;
};
