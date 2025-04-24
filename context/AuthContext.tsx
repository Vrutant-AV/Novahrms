'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from '@/lib/api';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (typeof window === 'undefined') return;

      const token = localStorage.getItem('accessToken');
      console.log('[AuthContext] Access token:', token);

      if (!token) {
        console.warn('[AuthContext] No token found, skipping fetchUser');
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const loggedInUser = res.data.user;
        console.log('[AuthContext] User from /api/auth/me:', loggedInUser);

        if (loggedInUser) {
          setUser(loggedInUser);
        } else {
          console.warn('[AuthContext] No user found in response');
          setUser(null);
        }
      } catch (err: any) {
        console.error('[AuthContext] Failed to fetch user:', err.response?.data || err.message);
        setUser(null);
      } finally {
        setLoading(false);
        console.log('[AuthContext] Finished loading');
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
