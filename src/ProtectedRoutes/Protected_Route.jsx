import LoadingArrows from "../Components/Loading_Arrows";
import { AuthUseContext } from "../Utilities/Auth_Provider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAdminLogged, authLoading, isUserLogged, editEmployeeData } =
    AuthUseContext();

  if (authLoading) {
    return <LoadingArrows />;
  }

  if (!isAdminLogged && !isUserLogged) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
