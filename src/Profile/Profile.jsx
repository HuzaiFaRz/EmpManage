import React, { useEffect } from "react";

import { Fragment, useState } from "react";
import {
  rejectMessage,
  resolveMessage,
  ThemeDarkToLight,
  ThemeLightToDark,
} from "../Script";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../ConfigFiles/firebase_Config";
import { IoIosWarning } from "react-icons/io";
import { PiEyeClosedBold, PiEyeFill } from "react-icons/pi";
import { ClipLoader } from "react-spinners";
import { BiArrowFromLeft } from "react-icons/bi";
import { useForm } from "react-hook-form";
import ThemeChangerButton from "../ThemeChanger/Theme_Changer_Button";
import LoadingArrows from "../Loading/Loading_Arrows";
import { AuthUseContext } from "../Utilities/Auth_Provider";
import { accessibility } from "@cloudinary/react";
import { Tooltip } from "react-tooltip";
import { MdEdit } from "react-icons/md";

const Profile = () => {
  const { isAdminLogged, isUserLogged } = AuthUseContext();
  const [currentLoggedData, setCurrentLoggedData] = useState();
  const [profilePasswordEye, setprofilePasswordEye] = useState(false);
  const [profileContentLoading, setProfileContentLoading] = useState(false);
  const [profileUpdatingLoading, setProfileUpdatingLoading] = useState(false);
  const [profileUpdate, setProfileUpdate] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm();

  const profileInputs = [
    { ID: "profileName", Placeholder: "Name", Type: "text" },
    { ID: "profileEmail", Placeholder: "Email", Type: "email" },
    {
      ID: "profilePassword",
      Placeholder: "Password",
      Type: profilePasswordEye ? "text" : "password",
    },
  ];
  useEffect(() => {
    (async () => {
      try {
        setProfileContentLoading(true);
        if (isAdminLogged) {
          const currentLoggedCollection = doc(db, "Admin", isAdminLogged?.uid);
          const currentLoggedResponse = await getDoc(currentLoggedCollection);
          const data = currentLoggedResponse.data();
          setCurrentLoggedData(data);
        } else {
          const currentLoggedCollection = doc(db, "Users", isUserLogged?.uid);
          const currentLoggedResponse = await getDoc(currentLoggedCollection);
          const data = currentLoggedResponse.data();
          setCurrentLoggedData(data);
        }
      } catch (error) {
        console.log(error);
        rejectMessage(error.message);
      } finally {
        setProfileContentLoading(false);
      }
    })();
  }, [isAdminLogged, isUserLogged?.uid]);

  if (profileContentLoading) {
    return <LoadingArrows />;
  }

  const profile_Updating_Form_Handler = async (profile_Updating_Form_Data) => {
    try {
      if (isAdminLogged) {
        const adminProfileEditCollection = doc(db, "Admin", isAdminLogged?.uid);
        if (
          profile_Updating_Form_Data.profileName !==
          currentLoggedData?.adminName
        ) {
          console.log(profile_Updating_Form_Data.profileName);
          await updateDoc(adminProfileEditCollection, {
            adminName: profile_Updating_Form_Data.profileName,
          });
          return;
        }

        // if (
        //   profile_Updating_Form_Data.profilePassword ===
        //   currentLoggedData?.adminPassword
        // ) {
        //   rejectMessage("No Changes Found");
        // } else {
        //   resolveMessage("Changes Found");
        // }
      } else {
        if (
          profile_Updating_Form_Data.profileName ===
          currentLoggedData?.signUpName
        ) {
          rejectMessage("No Changes Found");
        } else {
          resolveMessage("Changes Found");
        }
        if (
          profile_Updating_Form_Data.profilePassword ===
          currentLoggedData?.signUpPassword
        ) {
          rejectMessage("No Changes Found");
        } else {
          resolveMessage("Changes Found");
        }
      }
    } catch (error) {
      console.log(error);
      rejectMessage(error.message);
    }
  };
  let value;
  profileInputs.forEach((input) => {
    const { ID } = input;

    value =
      ID === "profileName"
        ? isAdminLogged
          ? currentLoggedData?.adminName
          : currentLoggedData?.signUpName
        : ID === "profileEmail"
        ? isAdminLogged
          ? currentLoggedData?.adminEmail
          : currentLoggedData?.signUpEmail
        : isAdminLogged
        ? currentLoggedData?.adminPassword
        : currentLoggedData?.signUpPassword;
    setValue(ID, value);
  });

  return (
    <Fragment>
      <div className="w-full h-[10svh] flex flex-row justify-center items-center">
        <ThemeChangerButton />
      </div>
      <div
        className={`Profile_Page w-full h-[90svh] flex flex-col justify-center items-center p-2 ${ThemeLightToDark}`}
      >
        <form
          className={`Profile_Form flex flex-wrap items-center justify-evenly gap-4 w-[800px] max-w-full p-8 border border-colorTwo dark:border-colorOne

            ${profileUpdatingLoading && "select-none cursor-not-allowed"}`}
          onSubmit={handleSubmit(profile_Updating_Form_Handler)}
        >
          <h1 className="font-semibold tracking-tighter text-4xl w-[100%] py-2 text-center text-colorTwo dark:text-colorOne">
            Profile
          </h1>
          {profileInputs.map((elem, index) => {
            const { ID, Placeholder, Type } = elem;

            return (
              <React.Fragment key={index}>
                <label
                  htmlFor={ID}
                  className={`flex flex-col items-start justify-center gap-2 font-normal text-colorTwo dark:text-colorOne ${
                    ID === "profilePassword" && "relative overflow-hidden"
                  } ${
                    !profileUpdate && profileUpdatingLoading
                      ? "cursor-not-allowed select-none"
                      : null
                  }
                  `}
                >
                  {Placeholder}
                  <input
                    disabled={
                      ID === "profileEmail" ||
                      !profileUpdate ||
                      (profileUpdatingLoading && true)
                    }
                    type={Type}
                    placeholder={Placeholder}
                    id={Type === "file" ? ID : Placeholder}
                    className={`p-2 bg-transparent border border-colorTwo dark:border-colorOne color-colorTwo font-light tracking-[1px] placeholder:text-colorTwo dark:placeholder:text-colorOne focus:outline-0 w-[300px] ${
                      ID === "profileEmail" && "profileEmailInput"
                    } ${
                      !profileUpdate && profileUpdatingLoading
                        ? "cursor-not-allowed select-none"
                        : null
                    }`}
                    {...register(ID, {
                      required: `${Placeholder} is required.`,
                      minLength: {
                        value: ID === "profilePassword" ? 8 : undefined,
                        message:
                          ID === "profilePassword"
                            ? "Password must be at least 8 characters"
                            : undefined,
                      },
                      pattern: {
                        value: /^[^\s]+(?:$|.*[^\s]+$)/,
                        message: "Remove Blank Space",
                      },
                    })}
                  />
                  {ID === "profileEmail" && (
                    <Tooltip
                      anchorSelect=".profileEmailInput"
                      id="profileEmailInput"
                      content="Email editing is restricted for security purposes."
                    />
                  )}

                  {ID === "profilePassword" && (
                    <button
                      className="absolute right-2 cursor-pointer"
                      type="button"
                      onClick={() => {
                        setprofilePasswordEye(!profilePasswordEye);
                      }}
                    >
                      {profilePasswordEye ? (
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
              className={` ${
                profileUpdate ? "bg-[#a63232]" : "bg-[#32a655]"
              } text-colorOne cursor-pointer border-0 relative px-[18px] py-[8px] text-[13px] sm:text-[15px] flex hover:rounded-xl transition-all justify-center items-center gap-2 ${
                profileUpdatingLoading && "cursor-not-allowed"
              }`}
              id="Sign_Up_Form_Submit_Button"
              // disabled={profileUpdatingLoading && true}
              onClick={() => {
                setProfileUpdate(!profileUpdate);
                console.log(profileUpdate);
              }}
            >
              <span>{profileUpdate ? "Cancle" : "Edit Profile"}</span>
              {profileUpdatingLoading ? (
                <ClipLoader
                  loading={profileUpdatingLoading}
                  size={20}
                  className="LoadingLoader"
                />
              ) : profileUpdate ? (
                <IoIosWarning size={20} />
              ) : (
                <MdEdit size={20} />
              )}
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Profile;
