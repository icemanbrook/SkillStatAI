import { createContext, useContext, useState } from 'react';
import { managers } from '../data/orgData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentManager, setCurrentManager] = useState(null);

  function login(username, password) {
    const found = managers.find(
      (m) => m.username === username && m.password === password
    );
    if (found) {
      setCurrentManager(found);
      return true;
    }
    return false;
  }

  function logout() {
    setCurrentManager(null);
  }

  return (
    <AuthContext.Provider value={{ currentManager, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}