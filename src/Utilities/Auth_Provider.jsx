import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../ConfigFiles/firebase_Config";
import { onAuthStateChanged } from "firebase/auth";

const AuthCreateContext = createContext();
export const AuthUseContext = () => useContext(AuthCreateContext);
const AuthProvider = ({ children }) => {
  const [isAdminLogged, setIsAdminLogged] = useState(null);
  const [isUserLogged, setIsUserLogged] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthLoading(false);
      if (!user) {
        setIsUserLogged(null);
        setIsAdminLogged(null);
      }
      if (user.email !== "huzaifa.admin.a@gmail.com") {
        setIsUserLogged(user);
        setIsAdminLogged(null);
      }
      setIsAdminLogged(user);
      setIsUserLogged(null);
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

export default AuthProvider;
