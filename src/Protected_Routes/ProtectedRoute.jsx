import React from "react";
import { AuthUseContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";
import EmpManage from "../Components/EmpManage/EmpManage";

const ProtectedRoute = () => {
  const {
    isAdminLogged,
    setIsAdminLogged,
    authLoading,
    setAuthLoading,
    isEmployeeLogged,
    setIsEmployeeLogged,
  } = AuthUseContext();

  return isAdminLogged === null && isEmployeeLogged === null ? (
    <Navigate to={"login"} />
  ) : (
    <Navigate to={"empmanage"} />
  );
};

export default ProtectedRoute;
