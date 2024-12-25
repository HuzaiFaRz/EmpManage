import LoadingArrows from "../Loading/Loading_Arrows";
import { AuthUseContext } from "../Utilities/Auth_Provider";
import { Navigate, Outlet } from "react-router-dom";

const Protected_Route = () => {
  const { isAdminLogged, authLoading, isUserLogged } = AuthUseContext();

  if (authLoading) {
    return <LoadingArrows />;
  }

  if (!isAdminLogged && !isUserLogged) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default Protected_Route;
