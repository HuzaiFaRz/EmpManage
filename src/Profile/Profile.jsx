import React, { useEffect } from "react";

import { Fragment, useState } from "react";
import {
  rejectMessage,
  resolveMessage,
  ThemeDarkToLight,
  ThemeLightToDark,
} from "../Script";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, db } from "../ConfigFiles/firebase_Config";
import { IoIosWarning } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import ThemeChangerButton from "../ThemeChanger/Theme_Changer_Button";
import LoadingArrows from "../Loading/Loading_Arrows";
import { AuthUseContext } from "../Utilities/Auth_Provider";
import { Tooltip } from "react-tooltip";
import { MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import {
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth/web-extension";

const Profile = () => {
  const { isAdminLogged, isUserLogged } = AuthUseContext();
  const [currentLoggedData, setCurrentLoggedData] = useState();
  const [profileContentLoading, setProfileContentLoading] = useState(false);
  const [profileEditingLoading, setProfileEditingLoading] = useState(false);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [profileEditedValue, setProfileEditedValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const profileInfoDiv = [
    {
      id: "name",
      label: "Name",
      value: isAdminLogged
        ? currentLoggedData?.adminName
        : currentLoggedData?.signUpName,
    },

    {
      id: "email",
      label: "Email",
      value: isAdminLogged
        ? currentLoggedData?.adminEmail
        : currentLoggedData?.signUpEmail,
    },

    {
      id: "password",
      label: "Password",
      value: isAdminLogged
        ? currentLoggedData?.adminPassword
        : currentLoggedData?.signUpPassword,
    },
  ];
  useEffect(() => {
    (async () => {
      try {
        setProfileContentLoading(true);
        if (isAdminLogged) {
          onSnapshot(doc(db, "Admin", isAdminLogged?.uid), (doc) => {
            setCurrentLoggedData(doc.data());
          });
        } else {
          onSnapshot(doc(db, "Users", isUserLogged?.uid), (doc) => {
            setCurrentLoggedData(doc.data());
          });
        }
      } catch (error) {
        console.log(error);
        rejectMessage(error.message);
      } finally {
        setProfileContentLoading(false);
      }
    })();
  }, [isAdminLogged, isUserLogged?.uid]);

  if (profileContentLoading || currentLoggedData === undefined) {
    return <LoadingArrows />;
  }

  const profile_Edit_Button_Handler = () => {
    setIsProfileEdit(!isProfileEdit);
    if (!isProfileEdit) {
      profileInfoDiv.forEach((element) => {
        const { value, id } = element;
        setProfileEditedValue((prevSetProfileEditedValue) => ({
          ...prevSetProfileEditedValue,
          [id]: value,
        }));
      });
    }
  };

  const profileEditValuesHandler = (e) => {
    setProfileEditedValue((prevSetProfileEditedValue) => ({
      ...prevSetProfileEditedValue,
      [e.target.id]: e.target.textContent,
    }));
  };

  const profile_Saving_Form_Handler = async () => {
    if (!profileEditedValue.name) {
      rejectMessage("Name Field Required");
      return;
    } else if (!profileEditedValue.password) {
      rejectMessage("Password Field Required");
      return;
    } else if (profileEditedValue.password.length < 8) {
      rejectMessage("Passowrd at Least Eight Charactor");
      return;
    } else if (
      /^\s*$/.test(profileEditedValue.name) ||
      /\s/.test(profileEditedValue.password)
    ) {
      rejectMessage("Remove any Blank Space");
      return;
    }

    if (isAdminLogged) {
      const adminProfileEditCollection = doc(db, "Admin", isAdminLogged?.uid);
      try {
        setProfileEditingLoading(true);
        if (profileEditedValue.name !== currentLoggedData?.adminName) {
          await updateDoc(adminProfileEditCollection, {
            adminName: profileEditedValue.name,
          });
        }
        if (profileEditedValue.password !== currentLoggedData?.adminPassword) {
          const currentUser = auth.currentUser;
          const credential = EmailAuthProvider.credential(
            currentUser.email,
            currentLoggedData.adminPassword
          );
          await signInWithEmailAndPassword(
            auth,
            currentLoggedData.adminEmail,
            currentLoggedData.adminPassword
          );
          await reauthenticateWithCredential(currentUser, credential);
          await updatePassword(currentUser, profileEditedValue.password);
          await updateDoc(adminProfileEditCollection, {
            adminPassword: profileEditedValue.password,
          });
        }
        resolveMessage("Your profile has been successfully updated");
      } catch (error) {
        console.log(error);
        rejectMessage(error.message);
      } finally {
        setProfileEditingLoading(false);
        setIsProfileEdit(false);
      }
    } else {
      const userProfileEditCollection = doc(db, "Users", isUserLogged?.uid);
      try {
        setProfileEditingLoading(true);
        if (profileEditedValue.name !== currentLoggedData?.signUpName) {
          await updateDoc(userProfileEditCollection, {
            signUpName: profileEditedValue.name,
          });
        }
        if (profileEditedValue.password !== currentLoggedData?.signUpPassword) {
          const currentUser = auth.currentUser;
          const credential = EmailAuthProvider.credential(
            currentUser.email,
            currentLoggedData.signUpPassword
          );
          await signInWithEmailAndPassword(
            auth,
            currentLoggedData.signUpEmail,
            currentLoggedData.signUpPassword
          );
          await reauthenticateWithCredential(currentUser, credential);
          await updatePassword(currentUser, profileEditedValue.password);
          await updateDoc(userProfileEditCollection, {
            signUpPassword: profileEditedValue.password,
          });
        }
        resolveMessage("Your profile has been successfully updated");
      } catch (error) {
        console.log(error);
        rejectMessage(error.message);
      } finally {
        setProfileEditingLoading(false);
        setIsProfileEdit(false);
      }
    }
  };

  return (
    <Fragment>
      <div className="w-full h-[10svh] flex flex-row justify-center items-center">
        <ThemeChangerButton />
      </div>
      <div
        className={`Profile_Page w-full h-[90svh] flex flex-col justify-center items-center p-2 ${ThemeLightToDark}`}
      >
        <div className="Profile_Div flex flex-col items-center justify-around gap-4 w-full sm:w-[600px] h-[500px] max-w-full p-8 border border-colorTwo dark:border-colorOne">
          {profileInfoDiv?.map((element, index) => {
            const { label, value, id } = element;
            return (
              <React.Fragment key={index}>
                <div className="flex flex-row justify-start items-start gap-2 w-full">
                  <span className="text-xl sm:text-3xl">{label}:</span>
                  <span
                    className={`text-lg sm:text-2xl border-b-2 border-colorTwo dark:border-colorOne px-1 rounded-sm w-[300px] whitespace-nowrap overflow-x-hidden focus:outline-none focus:bg-gray-200 focus:dark:bg-gray-700 focus:shadow-md ${
                      !isProfileEdit || (id === "email" && "emailToolTip")
                    }`}
                    contentEditable={
                      !isProfileEdit || id === "email" ? undefined : "true"
                    }
                    onInput={
                      !isProfileEdit || id === "email"
                        ? undefined
                        : (e) => {
                            profileEditValuesHandler(e);
                          }
                    }
                    id={id}
                  >
                    {isProfileEdit && id !== "email" ? undefined : value}
                  </span>
                </div>

                {id === "email" || !isProfileEdit || (
                  <Tooltip
                    anchorSelect=".emailToolTip"
                    id="emailToolTip"
                    content="Email editing is restricted for security purposes."
                  />
                )}
              </React.Fragment>
            );
          })}

          <div className="flex flex-row justify-evenly items-center p-2 w-full">
            <button
              type="button"
              className={` ${
                isProfileEdit ? "bg-[#a63232]" : "bg-[#32a655]"
              } text-colorOne cursor-pointer border-0 relative px-[18px] py-[8px] text-[13px] sm:text-[15px] flex hover:rounded-xl transition-all justify-center items-center gap-2 ${
                profileEditingLoading && "cursor-not-allowed"
              }`}
              id="Sign_Up_Form_Submit_Button"
              disabled={profileEditingLoading && true}
              onClick={profile_Edit_Button_Handler}
            >
              <span>{isProfileEdit ? "Cancle" : "Edit Profile"}</span>
              {isProfileEdit ? (
                <IoIosWarning size={20} />
              ) : (
                <MdEdit size={20} />
              )}
            </button>

            {isProfileEdit && (
              <button
                type="button"
                className={`${ThemeDarkToLight} cursor-pointer border-0 relative px-[18px] py-[8px] text-[13px] sm:text-[15px] flex hover:rounded-xl transition-all justify-center items-center gap-2 ${
                  profileEditingLoading && "cursor-not-allowed"
                }`}
                id="Sign_Up_Form_Submit_Button"
                disabled={profileEditingLoading && true}
                onClick={profile_Saving_Form_Handler}
              >
                <span>Save</span>
                {profileEditingLoading ? (
                  <ClipLoader
                    loading={profileEditingLoading}
                    size={20}
                    className="LoadingLoader"
                  />
                ) : (
                  <FaSave size={20} />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
