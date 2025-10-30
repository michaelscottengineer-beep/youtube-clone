import type { TSession } from "@/types/auth";
import type { TUser } from "@/types/user";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContextProps {
  user: TUser | null;
  setAuthenticated: (user: TUser | null) => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const sessionItem = localStorage.getItem("session");
    if (sessionItem) {
      const session = JSON.parse(sessionItem) as TSession;
      setUser(session.user);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const setAuthenticated = (user: TUser | null) => {
    setUser(user);
  };

  const valueToShare = useMemo(() => {
    return {
      user,
      setAuthenticated,
    };
  }, [user]);

  return (
    <AuthContext.Provider value={valueToShare}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
