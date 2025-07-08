import { useState, useEffect } from 'react';
import { User, AuthState } from '../types';

const mockAdmin: User = {
  id: '1',
  email: 'admin@society.com',
  name: 'Admin User',
  role: 'admin',
  phoneNumber: '+1234567890',
  createdAt: new Date(),
  isActive: true,
};

const mockResident: User = {
  id: '2',
  email: 'resident@society.com',
  name: 'John Doe',
  role: 'resident',
  flatNumber: 'A-101',
  phoneNumber: '+1234567891',
  createdAt: new Date(),
  isActive: true,
};

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('society_user');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          setAuthState({
            user,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState({
            user: null,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        setAuthState({
          user: null,
          isLoading: false,
          error: 'Failed to load user session',
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let user: User;
      if (email === 'admin@society.com') {
        user = mockAdmin;
      } else {
        user = mockResident;
      }

      localStorage.setItem('society_user', JSON.stringify(user));
      setAuthState({
        user,
        isLoading: false,
        error: null,
      });

      return { success: true };
    } catch (error) {
      setAuthState({
        user: null,
        isLoading: false,
        error: 'Invalid credentials',
      });
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const logout = () => {
    localStorage.removeItem('society_user');
    setAuthState({
      user: null,
      isLoading: false,
      error: null,
    });
  };

  return {
    ...authState,
    login,
    logout,
  };
};