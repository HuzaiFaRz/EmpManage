import LoadingArrows from "../Components/Loading_Arrows";
import { AuthUseContext } from "../Utilities/Auth_Provider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAdminLogged, authLoading } = AuthUseContext();

  if (authLoading) {
    return <LoadingArrows />;
  }

  if (isAdminLogged === null || isAdminLogged === false) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
