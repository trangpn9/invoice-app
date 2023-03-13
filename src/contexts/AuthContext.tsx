import React, { createContext, useState } from 'react';
import { AuthContextType, DefaultValAuth, IAuth } from '../utils/models';

const AuthContext = createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [auth, setAuth] = useState<IAuth>(DefaultValAuth);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  let signin = (user: string, accessToken: string, orgToken: string, callback: VoidFunction) => {
    setAuth((pre: IAuth) => ({ ...pre, user, accessToken, orgToken }));
    setIsAuthenticated(true);
    callback();
  };

  let signout = (callback: VoidFunction) => {
    setAuth(DefaultValAuth);
    setIsAuthenticated(false);
    callback();
  };

  let value = { auth, setAuth, signin, signout, isAuthenticated };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
