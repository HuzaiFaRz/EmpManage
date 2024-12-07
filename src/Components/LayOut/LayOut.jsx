import React, { Fragment, useState } from "react";
import { RiMenuFold3Line, RiMenuUnfold3Line } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import ThemeChangerButton from "../ThemeChanger/ThemeChangerButton";

const LayOut = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const links = [
    { name: "Dashboard", to: "dashboard" },
    { name: "Employees", to: "employees" },
    { name: "Settings", to: "settings" },
    { name: "Log Out", to: null },
  ];

  return (
    <Fragment>
      <nav className="fixed top-0 w-full flex items-center justify-between bg-colorTwo dark:bg-colorOne text-colorOne dark:text-colorTwo px-4 py-3 h-[10svh] z-50">
        <div className="flex flex-row justify-center items-center gap-5">
          {isSideBarOpen === true ? (
            <RiMenuFold3Line
              size={30}
              className="cursor-pointer"
              onClick={() => {
                setIsSideBarOpen(!isSideBarOpen);
                console.log(isSideBarOpen);
              }}
            />
          ) : (
            <RiMenuUnfold3Line
              size={30}
              className="cursor-pointer"
              onClick={() => {
                setIsSideBarOpen(!isSideBarOpen);
              }}
            />
          )}

          <span className="self-center text-lg font-semibold sm:text-2xl whitespace-nowrap">
            EmpManage
          </span>
        </div>

        <ThemeChangerButton />
      </nav>
      <div
        className={`bg-colorTwo dark:bg-colorOne text-colorOne dark:text-colorTwo p-4 h-[90svh] flex flex-col w-[50%] md:w-[30%] z-50 fixed top-[10svh] bottom-0 left-0 transition-all ${
          isSideBarOpen ? "left-0" : "left-[-50%] "
        }`}
      >
        <h2 className="text-[14px] md:text-[20px] font-bold mb-6 tracking-normal py-1 md:py-3 px-1 md:px-2">
          Employee Management System
        </h2>
        <div className="space-y-8 w-full flex flex-col">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={`py-1 md:py-3 px-1 md:px-2 w-full hover:bg-colorOne hover:text-colorTwo dark:hover:bg-colorTwo dark:hover:text-colorOne rounded-lg text-sm md:text-lg`}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
      <div
        className={`w-full h-[100svh] bg-colorTwo bg-opacity-10 absolute z-30 ${
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
