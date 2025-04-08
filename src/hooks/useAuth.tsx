
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export type UserType = 'CUSTOMER' | 'VENDOR' | 'DELIVERY' | null;

interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
}

interface AuthContextType {
  user: User | null;
  userType: UserType;
  loading: boolean;
  login: (email: string, password: string, userType: UserType) => Promise<void>;
  signup: (name: string, email: string, password: string, userType: UserType) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('rentEverythingUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('rentEverythingUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, userType: UserType) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate a successful login
      const mockUser = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email,
        type: userType
      };
      
      setUser(mockUser);
      localStorage.setItem('rentEverythingUser', JSON.stringify(mockUser));
      
      toast.success('Login successful!');
      navigate(`/dashboard/${userType?.toLowerCase()}`);
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, userType: UserType) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate a successful signup
      const mockUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        type: userType
      };
      
      setUser(mockUser);
      localStorage.setItem('rentEverythingUser', JSON.stringify(mockUser));
      
      toast.success('Account created successfully!');
      navigate(`/dashboard/${userType?.toLowerCase()}`);
    } catch (error) {
      toast.error('Signup failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rentEverythingUser');
    toast.info('You have been logged out');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userType: user?.type || null, 
      loading, 
      login, 
      signup, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
