"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  name: string;
  email: string;
  role: 'captain' | 'trainee';
  signedIn: boolean;
  timestamp: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    const isSignedIn = localStorage.getItem('isSignedIn');

    if (storedUser && isSignedIn === 'true') {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        
        // Auto-redirect if on sign-in page
        if (pathname === '/signin-trainee' || pathname === '/signin-captain') {
          const redirectPath = userData.role === 'captain' ? '/dashboard/home' : '/home';
          router.push(redirectPath);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('isSignedIn');
      }
    }
    setLoading(false);
  }, [pathname, router]);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isSignedIn', 'true');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('isSignedIn');
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
