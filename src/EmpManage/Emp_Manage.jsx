import { Fragment } from "react";
import { ThemeDarkToLight } from "../Script";
import { auth } from "../ConfigFiles/firebase_Config";
import { AuthUseContext } from "../Utilities/Auth_Provider";

const Emp_Manage = () => {
  const { isAdminLogged, isUserLogged } = AuthUseContext();
  console.log(isAdminLogged, "<<<<============ isAdminLogged");
  console.log(isUserLogged, "<<<<============ isUserLogged");
  return (
    <Fragment>
      <div className="w-full h-[100svh] flex flex-col justify-center items-center gap-5">
        <h1 className="text-2xl sm:text-5xl text-colorTwo dark:text-colorOne">
          Welcome In EmpManage
        </h1>
        <h3
          className={`text-xl sm:text-3xl p-1 sm:p-3 rounded-sm shadow-2xl focus:outline-none ${ThemeDarkToLight}`}
        >
          {auth?.currentUser?.email}
        </h3>
      </div>
    </Fragment>
  );
};

export default Emp_Manage;
