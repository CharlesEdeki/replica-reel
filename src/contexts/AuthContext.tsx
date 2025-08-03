import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  registeredAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on app start
    const savedUser = localStorage.getItem('lotteryUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('lotteryUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists in localStorage users
    const savedUsers = localStorage.getItem('lotteryUsers');
    let users: User[] = [];
    
    if (savedUsers) {
      try {
        users = JSON.parse(savedUsers);
      } catch (error) {
        console.error('Error parsing saved users:', error);
      }
    }
    
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem('lotteryUser', JSON.stringify(existingUser));
      setIsLoading(false);
      return true;
    } else {
      // For MVP, create a basic user if not found (dummy auth)
      const newUser: User = {
        id: Date.now().toString(),
        email: email.toLowerCase(),
        firstName: 'Demo',
        lastName: 'User',
        registeredAt: new Date().toISOString()
      };
      
      setUser(newUser);
      localStorage.setItem('lotteryUser', JSON.stringify(newUser));
      
      // Also save to users list
      users.push(newUser);
      localStorage.setItem('lotteryUsers', JSON.stringify(users));
      
      setIsLoading(false);
      return true;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email.toLowerCase(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      dateOfBirth: userData.dateOfBirth,
      registeredAt: new Date().toISOString()
    };
    
    // Save user to localStorage
    setUser(newUser);
    localStorage.setItem('lotteryUser', JSON.stringify(newUser));
    
    // Save to users list
    const savedUsers = localStorage.getItem('lotteryUsers');
    let users: User[] = [];
    
    if (savedUsers) {
      try {
        users = JSON.parse(savedUsers);
      } catch (error) {
        console.error('Error parsing saved users:', error);
      }
    }
    
    users.push(newUser);
    localStorage.setItem('lotteryUsers', JSON.stringify(users));
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lotteryUser');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};