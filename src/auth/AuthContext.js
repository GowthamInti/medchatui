import React, { createContext, useEffect, useState } from 'react';
import apiService from '../api/apiservice';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      apiService.setAuthToken(token);
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await apiService.login(username, password);
      apiService.setAuthToken(response.token);
      setUser({ username, token: response.token });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    apiService.removeAuthToken();
    setUser(null);
  };

  const register = async (username, password, email) => {
    try {
      await apiService.register(username, password, email);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
