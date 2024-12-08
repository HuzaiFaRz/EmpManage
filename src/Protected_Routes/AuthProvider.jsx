/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";

import onAuthStateChanged, { auth } from "../ConfigFiles/firebase_Config";

const AuthCreateContext = createContext();
export const AuthUseContext = () => useContext(AuthCreateContext);
const AuthProvider = ({ children }) => {
  const [isAdminLogged, setIsAdminLogged] = useState(null);
  const [isEmployeeLogged, setIsEmployeeLogged] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  console.log(isAdminLogged, "isAdminLogged============");
  console.log(isEmployeeLogged, "isEmployeeLogged==========");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email === "huzaifaadmin@gmail.com") {
          setIsAdminLogged(user);
        } else {
          setIsEmployeeLogged(user);
        }
      } else {
        setIsEmployeeLogged(null);
        setIsAdminLogged(null);
      }
    });
  }, []);

  return (
    <AuthCreateContext.Provider
      value={{
        isAdminLogged,
        setIsAdminLogged,
        authLoading,
        setAuthLoading,
        isEmployeeLogged,
        setIsEmployeeLogged,
      }}
    >
      {children}
    </AuthCreateContext.Provider>
  );
};

export default AuthProvider;
