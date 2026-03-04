import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUsername = localStorage.getItem("username");
    const savedUserId = localStorage.getItem("userId");

    if (savedToken && savedUsername) {
      setToken(savedToken);
      setAuthUser(savedUsername);
      setUserId(savedUserId);
    }

    setLoading(false);
  }, []);

  const login = ({ token, username, userId }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId);

    setToken(token);
    setAuthUser(username);
    setUserId(userId);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setAuthUser(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        token,
        userId,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
