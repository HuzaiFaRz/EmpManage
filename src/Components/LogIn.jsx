import React, { Fragment, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { rejectMessage, resolveMessage } from "../Script";
import { ThemeDarkToLight, ThemeLightToDark } from "../Main_Components/App";
import { BiArrowFromLeft } from "react-icons/bi";
import { ClipLoader } from "react-spinners";
import { PiEyeClosedBold, PiEyeFill } from "react-icons/pi";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../ConfigFiles/firebase_Config";
import { useNavigate } from "react-router-dom";
import { AuthUseContext } from "../Protected_Routes/AuthProvider";

const LogIn = () => {
  // const { isAdminLogged, setIsAdminLogged } = AuthUseContext();
  // console.log(isAdminLogged, setIsAdminLogged);
  console.log(AuthUseContext());
  const [signInLoading, setSignInLoading] = useState(false);
  const [signInPasswordEye, setSignInPasswordEye] = useState(false);
  const navigate = useNavigate();
  const loginInputs = [
    { ID: "signInEmail", Placeholder: "Email", Type: "email" },
    {
      ID: "signInPassword",
      Placeholder: "Password",
      Type: signInPasswordEye ? "text" : "password",
    },
  ];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const sign_In_Form_Handler = async (sign_In_Data) => {
    try {
      event.preventDefault();
      setSignInLoading(true);
      const { signInEmail, signInPassword } = sign_In_Data;
      const signIned = await signInWithEmailAndPassword(
        auth,
        signInEmail,
        signInPassword
      );
      resolveMessage("SignIn SuccessFully");
      reset();
      setSignInLoading(false);
    } catch (error) {
      console.log(error);
      setSignInLoading(false);
      rejectMessage(error.message);
    }
  };

  return (
    <Fragment>
      {/* <Navbar /> */}

      <div
        className={`Sign_In_Page w-full h-[90svh] flex flex-col justify-center items-center p-2  ${ThemeLightToDark}`}
      >
        <form
          className={`Sign_In_Form flex flex-col items-center justify-evenly gap-4 w-[500px] max-w-full p-8 border border-colorTwo dark:border-colorOne
            
            ${signInLoading && "select-none cursor-not-allowed"}`}
          onSubmit={handleSubmit(sign_In_Form_Handler)}
        >
          <h1 className="font-semibold tracking-tighter text-4xl w-[100%] py-2 text-center text-colorTwo dark:text-colorOne">
            Sign In
          </h1>
          {loginInputs.map((elem, index) => {
            const { ID, Placeholder, Type } = elem;
            return (
              <React.Fragment key={index}>
                <label
                  htmlFor={ID}
                  className={`flex flex-col items-start justify-center gap-2 font-normal text-colorTwo dark:text-colorOne w-full ${
                    signInLoading && "cursor-not-allowed"
                  } ${ID === "signInPassword" && "relative overflow-hidden"}`}
                >
                  {Placeholder}
                  <input
                    disabled={signInLoading && true}
                    type={Type}
                    placeholder={Placeholder}
                    id={Type === "file" ? ID : Placeholder}
                    className={`p-2 bg-transparent border border-colorTwo dark:border-colorOne color-colorTwo font-light tracking-[1px] placeholder:text-colorTwo dark:placeholder:text-colorOne focus:outline-0 w-full ${
                      signInLoading && "cursor-not-allowed"
                    }`}
                    {...register(ID, {
                      required: `${Placeholder} is required.`,
                      value:
                        Type === "email"
                          ? "huzaifaadmin@gmail.com"
                          : `2H|3£!XJ5BOK2P/uhw@V'RpUys&nq3]!(!X-6q>:Ij|MxQ{Kf`,
                    })}
                  />

                  {ID === "signInPassword" && (
                    <button
                      className="absolute right-2 cursor-pointer"
                      type="button"
                      onClick={() => {
                        setSignInPasswordEye(!signInPasswordEye);
                      }}
                    >
                      {signInPasswordEye ? (
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
                signInLoading && "cursor-not-allowed"
              }`}
              id="Employee_Form_Submit_Button"
              disabled={signInLoading && true}
            >
              <span>Sign In </span>

              {signInLoading ? (
                <ClipLoader loading={signInLoading} size={20} color="#f5f5f5" />
              ) : (
                <BiArrowFromLeft size={20} />
              )}
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default LogIn;
