import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

type AuthContextType = {
  userToken: string | null;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  userToken: null,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<any> = ({ children }: { children: any }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await SecureStore.getItem('userToken');
      } catch (e) {
        console.log('Restoring token failed', e);
      }
      setUserToken(token?? null);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    userToken,
    isLoading,
    signIn: async (token: string) => {
      setUserToken(token);
      await SecureStore.setItemAsync('userToken', token);
    },
    signOut: async () => {
      setUserToken(null);
      await SecureStore.deleteItemAsync('userToken');
    },
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};
