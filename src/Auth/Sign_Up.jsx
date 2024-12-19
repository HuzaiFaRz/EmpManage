import React, { Fragment, useEffect, useState } from "react";
import { cloudinaryConfig } from "../ConfigFiles/Cloudinary_Config";
import {
  dismissLoadingMessage,
  loadingMessage,
  rejectMessage,
  resolveMessage,
  ThemeDarkToLight,
  ThemeLightToDark,
} from "../Script";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../ConfigFiles/firebase_Config";
import { IoIosWarning } from "react-icons/io";
import { PiEyeClosedBold, PiEyeFill } from "react-icons/pi";
import { ClipLoader } from "react-spinners";
import { BiArrowFromLeft } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import ThemeChangerButton from "../ThemeChanger/Theme_Changer_Button";

const Sign_Up = () => {
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signUpPasswordEye, setSignUpPasswordEye] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    document.title = "EmpManage | | SignUp";
  }, []);
  const signUpInputs = [
    { ID: "signUpName", Placeholder: "Name", Type: "text" },
    { ID: "signUpEmail", Placeholder: "Email", Type: "email" },
    {
      ID: "signUpPassword",
      Placeholder: "Password",
      Type: signUpPasswordEye ? "text" : "password",
    },

    {
      ID: "signUpProfile",
      Placeholder: "Profile Pic",
      Type: "file",
    },
  ];

  const sign_Up_Form_Handler = async (sign_Up_Data) => {
    try {
      event.preventDefault();
      if (!sign_Up_Data.signUpProfile[0].type.includes("image")) {
        rejectMessage("Profile Extension Not Supported");
        return;
      }
      loadingMessage("Wait...");
      setSignUpLoading(true);
      const signUpProfile = sign_Up_Data.signUpProfile[0];
      const signUpProfileData = new FormData();

      signUpProfileData.append("file", signUpProfile);
      signUpProfileData.append("upload_preset", cloudinaryConfig.uploadPreset);

      signUpProfileData.append("folder", "EmpManage/UserProfilePics");
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        { method: "POST", body: signUpProfileData }
      );
      if (!response.ok) {
        throw new Error("Failed to upload profile image");
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        sign_Up_Data.signUpEmail,
        sign_Up_Data.signUpPassword
      );
      const { uid } = userCredential.user;
      const data = await response.json();
      const { url } = data;
      sign_Up_Data.signUpProfile = url;
      sign_Up_Data.signUpAddingTime = serverTimestamp();
      sign_Up_Data.role = "User";
      await setDoc(doc(db, "Users", uid), sign_Up_Data);
      reset();
      resolveMessage("SignUp SuccessFully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      rejectMessage(error.message);
    } finally {
      dismissLoadingMessage();
      setSignUpLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="w-full h-[10svh] flex flex-row justify-center items-center">
        <ThemeChangerButton />
      </div>
      <div
        className={`Sign_Up_Page w-full h-[90svh] mt-[10svh] xs:mt-0 flex flex-col justify-center items-center p-2 ${ThemeLightToDark}`}
      >
        <form
          className={`Sign_Up_Form flex flex-wrap items-center justify-evenly gap-4 w-[800px] max-w-full p-8 border border-colorTwo dark:border-colorOne ${
            signUpLoading && "select-none cursor-not-allowed"
          }`}
          onSubmit={handleSubmit(sign_Up_Form_Handler)}
        >
          <h1 className="font-semibold tracking-tighter text-4xl w-[100%] py-2 text-center text-colorTwo dark:text-colorOne">
            Sign Up
          </h1>
          {signUpInputs.map((elem, index) => {
            const { ID, Placeholder, Type } = elem;
            return (
              <React.Fragment key={index}>
                <label
                  htmlFor={ID}
                  className={`flex flex-col items-start justify-center gap-2 font-normal text-colorTwo dark:text-colorOne ${
                    ID === "signUpPassword" && "relative overflow-hidden"
                  } ${signUpLoading && "cursor-not-allowed"}`}
                >
                  {Placeholder}
                  <input
                    disabled={signUpLoading && true}
                    type={Type}
                    placeholder={Placeholder}
                    id={Type === "file" ? ID : Placeholder}
                    className={`p-2 bg-transparent border border-colorTwo dark:border-colorOne color-colorTwo font-light tracking-[1px] placeholder:text-colorTwo dark:placeholder:text-colorOne focus:outline-0 w-[300px] ${
                      signUpLoading && "cursor-not-allowed"
                    }`}
                    {...register(ID, {
                      required: `${Placeholder} is required.`,
                      minLength: {
                        value: ID === "signUpPassword" ? 8 : undefined,
                        message:
                          ID === "signUpPassword"
                            ? "Password must be at least 8 characters"
                            : undefined,
                      },
                      pattern: {
                        value: /^[^\s]+(?:$|.*[^\s]+$)/,
                        message: "Remove Blank Space",
                      },
                    })}
                    hidden={Type === "file" && true}
                  />
                  {Type === "file" && (
                    <div className="p-2 cursor-pointer bg-transparent border border-colorTwo color-light_Bg font-light tracking-[1px] dark:border-colorOne w-[300px]">
                      Profile
                    </div>
                  )}

                  {ID === "signUpPassword" && (
                    <button
                      className="absolute right-2 cursor-pointer"
                      type="button"
                      onClick={() => {
                        setSignUpPasswordEye(!signUpPasswordEye);
                      }}
                    >
                      {signUpPasswordEye ? (
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
                    {errors[ID] && (
                      <span className="flex flex-row justify-center items-center gap-2">
                        {" "}
                        <IoIosWarning />
                        {errors[ID]?.message}{" "}
                      </span>
                    )}
                  </p>
                </label>
              </React.Fragment>
            );
          })}
          <div className="w-full p-2 m-2 flex items-center justify-center">
            <button
              type="submit"
              className={`cursor-pointer ${ThemeDarkToLight} border-0 px-[15px] py-[8px] text-[15px] flex hover:rounded-xl transition-all justify-center items-center gap-5 ${
                signUpLoading && "cursor-not-allowed"
              }`}
              id="Sign_Up_Form_Submit_Button"
              disabled={signUpLoading && true}
            >
              <span>Sign Up</span>

              {signUpLoading ? (
                <ClipLoader
                  loading={signUpLoading}
                  size={20}
                  className="LoadingLoader"
                />
              ) : (
                <BiArrowFromLeft size={20} />
              )}
            </button>
          </div>
          <span className="flex flex-row gap-4">
            Do You Have an Acount?
            <Link to={"/login"} className="underline underline-offset-4">
              Log In
            </Link>{" "}
          </span>
        </form>
      </div>
    </Fragment>
  );
};

export default Sign_Up;
