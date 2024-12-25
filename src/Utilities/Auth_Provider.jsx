import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../Config-Files/firebase_Config";
import { onAuthStateChanged } from "firebase/auth";

const AuthCreateContext = createContext();
export const AuthUseContext = () => useContext(AuthCreateContext);
const Auth_Provider = ({ children }) => {
  const [isAdminLogged, setIsAdminLogged] = useState(null);
  const [isUserLogged, setIsUserLogged] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthLoading(false);
      if (user) {
        if (user?.email === "huzaifa.admin.a@gmail.com") {
          setIsAdminLogged(user);
          setIsUserLogged(null);
        } else {
          setIsUserLogged(user);
          setIsAdminLogged(null);
        }
      } else {
        setIsUserLogged(null);
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
        isUserLogged,
        setIsUserLogged,
        editEmployeeId,
        setEditEmployeeId,
      }}
    >
      {children}
    </AuthCreateContext.Provider>
  );
};

export default Auth_Provider;
