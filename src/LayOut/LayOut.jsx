import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import ThemeChangerButton from "../ThemeChanger/Theme_Changer_Button";

import { MdDashboard } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { FaBookReader, FaUsers } from "react-icons/fa";
import { rejectMessage, resolveMessage, ThemeDarkToLight } from "../Script";
import { ImProfile } from "react-icons/im";
import { signOut } from "firebase/auth";
import { auth } from "../ConfigFiles/firebase_Config";
import { CgClose } from "react-icons/cg";
import { ClipLoader } from "react-spinners";
import { IoLogOut } from "react-icons/io5";
import { AuthUseContext } from "../Utilities/Auth_Provider";

const LayOut = () => {
  const { isAdminLogged, isUserLogged } = AuthUseContext();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [logOutModal, setLogOutModal] = useState(false);
  const [logOutLoading, setLogOutLoading] = useState(false);
  useEffect(() => {
    isSideBarOpen
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "scroll");
  }, [isSideBarOpen]);

  const sideBarsLinks = [
    { name: "Profile", to: "profile" },
    { name: "Dashboard", to: "dashBoard" },
    { name: "Employees", to: "employees" },
  ];

  if (isAdminLogged !== null) {
    sideBarsLinks.push({ name: "Users", to: "users" });
    sideBarsLinks.push({ name: "Add Employee", to: "employee_add" });
  }

  const logOutHandler = async () => {
    try {
      setLogOutLoading(true);
      await signOut(auth);
      resolveMessage("Log Out SuccessFully");
    } catch (error) {
      console.log(error);
      rejectMessage(error.message);
    } finally {
      setLogOutLoading(false);
      setLogOutModal(false);
      setIsSideBarOpen(false);
    }
  };

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
            {sideBarsLinks.map((link, index) => {
              return (
                <React.Fragment key={index}>
                  <NavLink
                    onClick={() => {
                      setIsSideBarOpen(!isSideBarOpen);
                    }}
                    key={link?.name}
                    to={link?.to}
                    className={`py-1 sm:py-3 px-1 sm:px-3 w-full hover:bg-colorTwo hover:text-colorOne dark:hover:bg-colorOne dark:hover:text-colorTwo rounded-lg text-sm sm:text-lg flex flex-row justify-start items-center gap-5`}
                  >
                    {link.name === "Dashboard" ? (
                      <MdDashboard size={25} />
                    ) : link.name === "Profile" ? (
                      <ImProfile size={25} />
                    ) : link.name === "Employees" ? (
                      <FaBookReader size={25} />
                    ) : null}

                    {isAdminLogged && link.name === "Add Employee" && (
                      <IoIosPersonAdd size={25} />
                    )}

                    {isAdminLogged && link.name === "Users" && (
                      <FaUsers size={25} />
                    )}

                    {link?.name}
                  </NavLink>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className={`logOutBtn p-2 sm:p-3 ${ThemeDarkToLight} rounded-md w-20 sm:w-28`}
            onClick={() => {
              setLogOutModal(true);
            }}
          >
            Log out
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

      <div
        className={`modal w-full h-[100svh] z-[200] fixed top-0 left-0 bg-colorTwo backdrop-blur-lg bg-opacity-50 ${
          logOutModal ? "flex" : "hidden"
        } justify-center items-center`}
        onClick={() => {
          setLogOutModal(false);
        }}
      >
        {" "}
      </div>

      <div
        className={`${ThemeDarkToLight} w-full sm:w-[600px] h-[300px] rounded-sm cursor-pointer z-[300] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col justify-between items-center ${
          logOutModal ? "flex" : "hidden"
        }`}
      >
        <div className="modal-header flex flex-row justify-between items-center p-2 w-full">
          <div></div>
          <CgClose
            size={25}
            onClick={() => {
              setLogOutModal(false);
            }}
          />
        </div>
        <div className="modal-body w-full flex text-center justify-center items-center">
          <span className="text-sm sm:text-lg font-bold p-5">
            Do you Really Logout {auth?.currentUser?.email}
          </span>
        </div>
        <div className="modal-footer flex flex-row justify-evenly gap-5 items-center p-2 mb-5 w-full">
          <button
            className="bg-[#5cb85c] text-colorOne cursor-pointer border-0 px-[15px] py-[8px] text-[15px] hover:rounded-xl transition-all"
            onClick={() => {
              setLogOutModal(false);
            }}
          >
            Cancle
          </button>
          <button
            className="bg-[#a63232] text-colorOne cursor-pointer border-0 relative px-[15px] py-[8px] text-[15px] flex hover:rounded-xl transition-all justify-center items-center gap-2"
            disabled={logOutLoading && true}
            onClick={logOutHandler}
          >
            {logOutLoading ? (
              <ClipLoader color="white" size={20} />
            ) : (
              <IoLogOut size={20} />
            )}{" "}
            LogOut
          </button>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default LayOut;
