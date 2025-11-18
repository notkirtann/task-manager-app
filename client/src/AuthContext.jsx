// client/src/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import api from './api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  // Function to load user profile on mount or token change
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await api.get('/users/me'); // Get user profile
          setUser(response.data);
        } catch (e) {
          // Token invalid or expired, clear storage
          console.error('Failed to fetch user data:', e);
          logout();
        }
      }
      setIsLoading(false);
    };
    loadUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await api.post('/users/login', { email, password }); // Login endpoint
      const { user, token } = response.data;

      // Save token and update state
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      return true;
    } catch (e) {
      console.error('Login failed:', e.response.data.error || 'Invalid Login');
      throw new Error(e.response.data.error || 'Invalid Login');
    }
  };

  const signup = async (name, email, password, age) => {
    const response = await api.post('/users/signup', { name, email, password, age }); // Signup endpoint
    // Assume signup also returns user and token like login
    const { user, token } = response.data;
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
  };

  const logout = async () => {
    try {
      await api.post('/users/logout'); // Logout endpoint
    } catch (e) {
      console.warn('Logout failed on server, clearing client state anyway.');
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }
  };

  const value = { user, isLoading, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};