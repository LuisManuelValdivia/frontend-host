import React, { createContext, useState, useEffect } from 'react';
//import axios from 'axios';
import api from '../config/axios';

interface User {
    _id: string;
    nombre: string;
    rol: string; // 'admin' | 'usuario'
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  checkSession: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  checkSession: async () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const checkSession = async () => {
    try {
      const resp = await api.get('/users/check-auth', { withCredentials: true });
      if (resp.data.loggedIn) {
        setIsLoggedIn(true);
        setUser(resp.data.user); // user.rol => 'admin' o 'usuario'
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    // Verificar la sesión al montar el componente
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
};
