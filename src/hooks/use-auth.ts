import { AuthContext } from "@/contexts/auth";
import { useContext } from "react";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be inside AuthProvider')
  return {
    ...context,
  };
};
export default useAuth;
