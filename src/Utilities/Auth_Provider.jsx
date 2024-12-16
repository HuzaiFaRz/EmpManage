
import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../ConfigFiles/firebase_Config";
import { onAuthStateChanged } from "firebase/auth";

const AuthCreateContext = createContext();
export const AuthUseContext = () => useContext(AuthCreateContext);
const AuthProvider = ({ children }) => {
  const [isAdminLogged, setIsAdminLogged] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthLoading(false);
      if (user?.email === "huzaifa.admin.a@gmail.com") {
        setIsAdminLogged(user);
      } else {
        setIsAdminLogged(null);
      }
    });
  }, [authLoading]);

  return (
    <AuthCreateContext.Provider
      value={{
        isAdminLogged,
        setIsAdminLogged,
        authLoading,
        setAuthLoading,
      }}
    >
      {children}
    </AuthCreateContext.Provider>
  );
};

export default AuthProvider;
