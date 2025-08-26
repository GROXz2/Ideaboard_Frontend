import React, { createContext, useContext, useState } from 'react';

type AuthContextType = {
  user: null | { name: string };
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<null | { name: string }>(null);
  const login = () => setUser({ name: 'Demo User' });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
