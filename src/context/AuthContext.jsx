import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(); // This creates a "global" place to store auth info

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // We'll store the logged-in user's info here

  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // If already logged in, get from storage
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (userData) => {
    setUser(userData); // Save in memory
    localStorage.setItem('user', JSON.stringify(userData)); // Save in localStorage for reloads
  };

  const logout = () => {
    setUser(null); // Remove from memory
    localStorage.removeItem('user'); // Clear from storage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // Hook to use in other components
