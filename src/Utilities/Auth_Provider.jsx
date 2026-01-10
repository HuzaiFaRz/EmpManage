import { createContext, useContext, useEffect, useState } from "react";

import { auth, db } from "../Config-Files/firebase_Config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

const AuthCreateContext = createContext();
export const AuthUseContext = () => useContext(AuthCreateContext);
const Auth_Provider = ({ children }) => {
  const [isAdminLogged, setIsAdminLogged] = useState(null);
  const [isUserLogged, setIsUserLogged] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [userpass, setUserPass] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthLoading(false);
      if (user) {
        if (user?.email === "huzaifa.admin.a@gmail.com") {
          setIsAdminLogged(user);
          setIsUserLogged(null);
          onSnapshot(doc(db, "Admin", user.uid), (doc) => {
            setUserPass(doc.data().adminPassword);
          });
        } else {
          setIsUserLogged(user);
          setIsAdminLogged(null);
          onSnapshot(doc(db, "Users", user.uid), (doc) => {
            setUserPass(doc.data().signUpPassword);
          });
        }
      } else {
        setIsUserLogged(null);
        setIsAdminLogged(null);
      }
    });
  }, [authLoading, isUserLogged?.uid]);

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
        userpass,
        setUserPass,
      }}
    >
      {children}
    </AuthCreateContext.Provider>
  );
};

export default Auth_Provider;
