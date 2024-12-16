import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../ConfigFiles/firebase_Config";
import { onAuthStateChanged } from "firebase/auth";

const AuthCreateContext = createContext();
export const AuthUseContext = () => useContext(AuthCreateContext);
const AuthProvider = ({ children }) => {
  const [isAdminLogged, setIsAdminLogged] = useState(null);
  const [isUserLogged, setIsUserLogged] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthLoading(false);
      if (user) {
        if (user.email === "huzaifa.admin.a@gmail.com") {
          setIsAdminLogged(user);
          setIsUserLogged(null);
        } else {
          setIsUserLogged(user);
          setIsAdminLogged(null);
        }
        return;
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
        isUserLogged,
        setIsUserLogged,
      }}
    >
      {children}
    </AuthCreateContext.Provider>
  );
};

export default AuthProvider;
