import { Fragment, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import ThemeChangerButton from "../ThemeChanger/ThemeChangerButton";
import { ThemeDarkToLight, ThemeLightToDark } from "../../Main_Components/App";

const LayOut = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const sideBarsLinks = [
    { name: "Dashboard", to: "dashboard" },
    { name: "Employees", to: "employees" },
    { name: "Create Employee", to: "employeecreate" },
  ];

  isSideBarOpen ? (document.body.style.overflow = "hidden") : null;

  return (
    <Fragment>
      <nav className="fixed top-0 w-full flex items-center justify-between bg-colorOne dark:bg-colorTwo dark:text-colorOne text-colorTwo px-5 py-3 h-[10svh] z-50">
        <div className="flex flex-row justify-between items-center h-full">
          <div
            className={`w-[70px] md:w-[80px] h-full flex flex-col justify-center items-center gap-2 cursor-pointer ${
              isSideBarOpen ? "setIsSideBarOpen" : null
            }`}
            onClick={(e) => {
              e.currentTarget.classList.toggle("setIsSideBarOpen");
              setIsSideBarOpen(!isSideBarOpen);
            }}
          >
            <span className="w-[30px] md:w-[40px] h-[2px] dark:bg-colorOne bg-colorTwo"></span>
            <span
              className={`w-[50px] md:w-[60px] h-[2px] dark:bg-colorOne bg-colorTwo nav-menu-bar-line-2 relative transition-all ${
                isSideBarOpen ? "-ml-5 " : "ml-5 "
              }`}
            ></span>
            <span className="w-[30px] md:w-[40px] h-[2px] dark:bg-colorOne bg-colorTwo"></span>
          </div>

          <span className="self-center text-lg font-semibold sm:text-2xl whitespace-nowrap px-10">
            EmpManage
          </span>
        </div>

        <ThemeChangerButton />
      </nav>

      <div
        className={`dark:bg-colorTwo bg-colorOne dark:text-colorOne text-colorTwo p-4 h-[90svh] flex flex-col justify-between w-[80%] md:w-[50%] z-[22222222222222] fixed top-[10svh] bottom-0 left-0   transition-all ${
          isSideBarOpen ? "left-[0%]" : "left-[-80%]"
        }`}
      >
        <div>
          <h2 className="text-[14px] md:text-[20px] font-bold mb-6 tracking-normal py-1 md:py-3 px-1 md:px-2">
            Employee Management System
          </h2>
          <div className="space-y-8 w-full flex flex-col">
            {sideBarsLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={`py-1 md:py-3 px-1 md:px-3 w-full hover:bg-colorTwo hover:text-colorOne dark:hover:bg-colorOne dark:hover:text-colorTwo rounded-lg text-sm md:text-lg`}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className={`logOutBtn p-3 ${ThemeDarkToLight} rounded-md w-28`}
          >
            Log Out
          </button>
        </div>
      </div>
      <div
        className={`w-full h-[100svh] bg-none bg-opacity-50 filter absolute z-30 bg-colorTwo ${
          isSideBarOpen ? "block" : "hidden"
        }`}
        onClick={() => {
          setIsSideBarOpen(!isSideBarOpen);
        }}
      ></div>

      <Outlet />
    </Fragment>
  );
};

export default LayOut;
