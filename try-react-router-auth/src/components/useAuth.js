import { useContext, createContext } from 'react';

export const UserContext = createContext(null);
// null => { token, setToken }

export const useAuth = () => {
  return useContext(UserContext);
  // custom hooks
};
