import LoadingArrows from "../Components/Loading_Arrows";
import { AuthUseContext } from "../Utilities/Auth_Provider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAdminLogged, authLoading, isUserLogged } = AuthUseContext();

  if (authLoading) {
    return <LoadingArrows />;
  }

  if (isAdminLogged === null && isUserLogged === null) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
