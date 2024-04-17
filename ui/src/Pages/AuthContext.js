import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userIDFromCookie = Cookies.get('userID');
    if (userIDFromCookie) {
      setUserID(userIDFromCookie);
      setLoggedIn(true);
    }
  }, []);

  const login = (userID) => {
    Cookies.set('userID', userID, { expires: 7 });
    setLoggedIn(true);
    setUserID(userID);
  };

  const logout = () => {
    Cookies.remove('userID');
    setLoggedIn(false);
    setUserID(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, userID, loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
