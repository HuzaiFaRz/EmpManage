import React from "react";
import { AuthUseContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";
import EmpManage from "../Components/EmpManage/EmpManage";

const ProtectedRoute = () => {
  const { isAdminLogged, setIsAdminLogged } = AuthUseContext();
  return isAdminLogged === null ? <Navigate to={"login"} /> : <EmpManage />;
};

export default ProtectedRoute;
