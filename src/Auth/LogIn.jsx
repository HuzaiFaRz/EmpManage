import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  rejectMessage,
  resolveMessage,
  ThemeDarkToLight,
  ThemeLightToDark,
} from "../Script";
import { BiArrowFromLeft } from "react-icons/bi";
import { ClipLoader } from "react-spinners";
import { PiEyeClosedBold, PiEyeFill } from "react-icons/pi";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config-Files/firebase_Config";
import { AuthUseContext } from "../Utilities/Auth_Provider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ThemeChangerButton from "../Theme-Changer/Theme_Changer_Button";

const LogIn = () => {
  const navigate = useNavigate();
  const { setIsAdminLogged, isAdminLogged, setIsUserLogged, isUserLogged } =
    AuthUseContext();
  const [logInLoading, setLogInLoading] = useState(false);
  const [logInPasswordEye, setLogInPasswordEye] = useState(false);
  const loginInputs = [
    { ID: "logInEmail", Placeholder: "Email", Type: "email" },
    {
      ID: "logInPassword",
      Placeholder: "Password",
      Type: logInPasswordEye ? "text" : "password",
    },
  ];
  useEffect(() => {
    document.title = "EmpManage | | Login";
    if (isAdminLogged !== null && isUserLogged !== null) {
      return <Navigate to="/login" replace />;
    }
  }, [isAdminLogged, isUserLogged, navigate]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const logIn_Form_Handler = async (login_Data) => {
    try {
      event.preventDefault();
      setLogInLoading(true);
      const { logInEmail, logInPassword } = login_Data;
      const loggedIn = await signInWithEmailAndPassword(
        auth,
        logInEmail,
        logInPassword
      );
      if (loggedIn.user.email === "huzaifa.admin.a@gmail.com") {
        setIsAdminLogged(loggedIn.user);
        setIsUserLogged(null);
        resolveMessage("Admin Login Successfully");
      } else {
        setIsUserLogged(loggedIn.user);
        setIsAdminLogged(null);
        resolveMessage("Login Successfully");
      }
      navigate("/", { replace: true });
      // reset();
    } catch (error) {
      console.log(error);
      rejectMessage(error.message);
    } finally {
      setLogInLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="w-full h-[10svh] flex flex-row justify-center items-center">
        <ThemeChangerButton />
      </div>
      <div
        className={`Log_In_Page w-full h-[90svh] flex flex-col justify-center items-center p-2 ${ThemeLightToDark}`}
      >
        <form
          className={`Log_In_Form flex flex-col items-center justify-evenly gap-4 w-[500px] max-w-full p-8 border border-colorTwo dark:border-colorOne

            ${logInLoading && "select-none cursor-not-allowed"}`}
          onSubmit={handleSubmit(logIn_Form_Handler)}
        >
          <h1 className="font-semibold tracking-tighter text-4xl w-[100%] py-2 text-center text-colorTwo dark:text-colorOne">
            Log In
          </h1>
          {loginInputs.map((elem, index) => {
            const { ID, Placeholder, Type } = elem;
            return (
              <React.Fragment key={index}>
                <label
                  htmlFor={ID}
                  className={`flex flex-col items-start justify-center gap-2 font-normal text-colorTwo dark:text-colorOne w-full ${
                    logInLoading && "cursor-not-allowed"
                  } ${ID === "logInPassword" && "relative overflow-hidden"}`}
                >
                  {Placeholder}
                  <input
                    disabled={logInLoading && true}
                    type={Type}
                    placeholder={Placeholder}
                    id={Type === "file" ? ID : Placeholder}
                    className={`p-2 bg-transparent border border-colorTwo dark:border-colorOne color-colorTwo font-light tracking-[1px] placeholder:text-colorTwo dark:placeholder:text-colorOne focus:outline-0 w-full ${
                      logInLoading && "cursor-not-allowed"
                    }`}
                    {...register(ID, {
                      required: `${Placeholder} is required.`,
                    })}
                  />

                  {ID === "logInPassword" && (
                    <button
                      className="absolute right-2 cursor-pointer"
                      type="button"
                      onClick={() => {
                        setLogInPasswordEye(!logInPasswordEye);
                      }}
                    >
                      {logInPasswordEye ? (
                        <PiEyeFill size={22} />
                      ) : (
                        <PiEyeClosedBold size={22} />
                      )}
                    </button>
                  )}

                  <p
                    className={`text-[#a63232] text-[13px] tracking-wider py-2 w-full h-[20px] flex items-center font-normal ${
                      errors[ID]?.message &&
                      "z-50 cursor-not-allowed select-none"
                    }`}
                    id="Error_Para"
                  >
                    {errors[ID]?.message}
                  </p>
                </label>
              </React.Fragment>
            );
          })}
          <div className="w-full p-2 m-2 flex items-center justify-center">
            <button
              type="submit"
              className={`cursor-pointer ${ThemeDarkToLight} border-0 px-[15px] py-[8px] text-[15px] flex hover:rounded-xl transition-all justify-center items-center gap-5 ${
                logInLoading && "cursor-not-allowed"
              }`}
              id="Employee_Form_Submit_Button"
              disabled={logInLoading && true}
            >
              <span>Log In </span>

              {logInLoading ? (
                <ClipLoader
                  loading={logInLoading}
                  size={20}
                  className="LoadingLoader"
                />
              ) : (
                <BiArrowFromLeft size={20} />
              )}
            </button>
          </div>
          <span className="flex flex-row gap-4">
            Don&apos;t Have an Acount?
            <Link
              to={"/sign_up"}
              className={`underline underline-offset-4 ${
                logInLoading && "disabled-link"
              }`}
            >
              Sign Up
            </Link>{" "}
          </span>
        </form>
      </div>
    </Fragment>
  );
};

export default LogIn;
