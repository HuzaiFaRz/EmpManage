import { Fragment, useEffect } from "react";
import { ThemeDarkToLight } from "../Script";
import { auth } from "../Config-Files/firebase_Config";

const EmpManage = () => {
  useEffect(() => {
    document.title = "EmpManage";
  }, []);
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

export default EmpManage;
