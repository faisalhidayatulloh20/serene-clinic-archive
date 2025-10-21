import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export type UserRole = 'admin' | 'dokter';

export interface AuthUser {
  email: string;
  role: UserRole;
  name: string;
}

const MOCK_USERS = [
  { email: 'admin@psiarsip.com', password: 'admin123', role: 'admin' as UserRole, name: 'Admin Sistem' },
  { email: 'dokter@psiarsip.com', password: 'dokter123', role: 'dokter' as UserRole, name: 'Dr. John Doe' },
];

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const authUser: AuthUser = {
        email: foundUser.email,
        role: foundUser.role,
        name: foundUser.name,
      };
      localStorage.setItem('user', JSON.stringify(authUser));
      setUser(authUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const isAdmin = () => user?.role === 'admin';

  return { user, loading, login, logout, isAdmin };
};
