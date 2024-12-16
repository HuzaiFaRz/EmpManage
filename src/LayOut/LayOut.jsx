import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import ThemeChangerButton from "../ThemeChanger/Theme_Changer_Button";

import { MdDashboard } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { FaBookReader } from "react-icons/fa";
import { ThemeDarkToLight } from "../Script";
import { ImProfile } from "react-icons/im";

const LayOut = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const sideBarsLinks = [
    { name: "Profile", to: "profile" },
    { name: "Dashboard", to: "dashBoard" },
    { name: "Employees", to: "employees" },
    { name: "Add Employee", to: "employee_add" },
  ];
  useEffect(() => {
    isSideBarOpen
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "scroll");
  }, [isSideBarOpen]);

  return (
    <Fragment>
      <nav className="fixed top-0 w-full flex items-center justify-between bg-colorOne dark:bg-colorTwo dark:text-colorOne text-colorTwo px-5 py-3 h-[10svh] z-[50]">
        <div className="flex flex-row justify-center items-center h-full gap-5">
          <div
            className={`w-[80px] h-full flex flex-col justify-center items-center gap-3 cursor-pointer scale-50 xs:scale-75 sm:scale-90 ${
              isSideBarOpen ? "setIsSideBarOpen" : null
            }`}
            onClick={(e) => {
              e.currentTarget.classList.toggle("setIsSideBarOpen");
              setIsSideBarOpen(!isSideBarOpen);
            }}
          >
            <span className="w-[40px] h-[2px] dark:bg-colorOne bg-colorTwo"></span>
            <span
              className={`w-[60px] h-[2px] dark:bg-colorOne bg-colorTwo nav-menu-bar-line-2 relative transition-all ${
                isSideBarOpen ? "-ml-5 " : "ml-5 "
              }`}
            ></span>
            <span className="w-[40px] h-[2px] dark:bg-colorOne bg-colorTwo"></span>
          </div>

          <Link to={"/"} className="text-lg sm:text-2xl font-semibold">
            EmpManage
          </Link>
        </div>

        <ThemeChangerButton />
      </nav>

      <div
        className={`dark:bg-colorTwo bg-colorOne dark:text-colorOne text-colorTwo p-4 h-[90svh] flex flex-col justify-between w-[80%] md:w-[50%] z-[100] fixed top-[10svh] bottom-0 transition-all ${
          isSideBarOpen ? "left-[0%]" : "left-[-80%]"
        }`}
      >
        <div>
          <h2 className="text-[14px] sm:text-[20px] font-bold mb-6 tracking-normal py-1 sm:py-3 px-1 sm:px-2">
            Employee Management System
          </h2>
          <div className="space-y-8 w-full flex flex-col">
            {sideBarsLinks.map((link, index) => (
              <React.Fragment key={index}>
                <NavLink
                  onClick={() => {
                    setIsSideBarOpen(!isSideBarOpen);
                  }}
                  key={link.name}
                  to={link.to}
                  className={`py-1 sm:py-3 px-1 sm:px-3 w-full hover:bg-colorTwo hover:text-colorOne dark:hover:bg-colorOne dark:hover:text-colorTwo rounded-lg text-sm sm:text-lg flex flex-row justify-start items-center gap-5`}
                >
                  {link.name === "Dashboard" ? (
                    <MdDashboard size={25} />
                  ) : link.name === "Profile" ? (
                    <ImProfile size={25} />
                  ) : link.name === "Employees" ? (
                    <FaBookReader size={25} />
                  ) : link.name === "Add Employee" ? (
                    <IoIosPersonAdd size={25} />
                  ) : undefined}{" "}
                  {link.name}
                </NavLink>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className={`logOutBtn p-2 sm:p-3 ${ThemeDarkToLight} rounded-md w-20 sm:w-28`}
          >
            Log Out
          </button>
        </div>
      </div>

      <div
        className={`w-full h-[100svh] bg-none bg-opacity-50 filter fixed z-40 bg-colorTwo ${
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
