import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userID, setUserID] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  const login = (newToken) => {
    setToken(newToken);
    setLoggedIn(true);
  };

  const logout = () => {
    setToken(null);
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, userID, setUserID, loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };