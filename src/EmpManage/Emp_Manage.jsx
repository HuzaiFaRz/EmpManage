import { Fragment } from "react";
import LayOut from "../LayOut/LayOut";
import { Outlet } from "react-router-dom";
import AuthProvider from "../Utilities/Auth_Provider";

const Emp_Manage = () => {
  // const { isAdminLogged } = AuthProvider();
  // console.log(isAdminLogged);
  return (
    <Fragment>
      <LayOut />
    </Fragment>
  );
};

export default Emp_Manage;
