import React, { useEffect } from "react";

import { Fragment, useState } from "react";
import {
  rejectMessage,
  resolveMessage,
  ThemeDarkToLight,
  ThemeLightToDark,
} from "../Script";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, db } from "../Config-Files/firebase_Config";
import { IoIosWarning } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import ThemeChangerButton from "../Theme-Changer/Theme_Changer_Button";
import LoadingArrows from "../Loading/Loading_Arrows";
import { AuthUseContext } from "../Utilities/Auth_Provider";
import { Tooltip } from "react-tooltip";
import { MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import {
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { cloudinaryConfig } from "../Config-Files/Cloudinary_Config";
import axios from "axios";

const Profile = () => {
  const { isAdminLogged, isUserLogged } = AuthUseContext();
  const [currentLoggedData, setCurrentLoggedData] = useState();
  const [profileContentLoading, setProfileContentLoading] = useState(false);
  const [profileEditingLoading, setProfileEditingLoading] = useState(false);
  const [newProfileImageLoading, setNewProfileImageLoading] = useState(false);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [viewProfileImage, setViewProfileImage] = useState(false);
  const [newProfileImageFile, setNewProfileImageFile] = useState();
  useEffect(() => {
    document.title = "EmpManage | | Profile";
  }, []);
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
      value: auth.currentUser.email,
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

  const uploadNewProfileImageHandler = async () => {
    if (!newProfileImageFile[0].type.includes("image")) {
      rejectMessage("Profile Extension Not Supported");
      return;
    }

    try {
      const adminProfileEditCollection = doc(db, "Admin", isAdminLogged?.uid);
      const formData = new FormData();
      formData.append("file", newProfileImageFile[0]);
      formData.append("upload_preset", cloudinaryConfig.uploadPreset);
      formData.append("cloud_name", cloudinaryConfig.cloudName);
      setNewProfileImageLoading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        formData
      );
      await updateDoc(adminProfileEditCollection, {
        adminProfileURL: response.data.url,
      });
      resolveMessage("Image uploaded successfully!");
      setNewProfileImageFile(undefined);
      setIsProfileEdit(false);
    } catch (error) {
      console.error(error);
      rejectMessage("Error uploading image!");
    } finally {
      setNewProfileImageLoading(false);
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
        <div className="Profile_Div flex flex-col items-center justify-around gap-4 w-full sm:w-[600px] h-max max-w-full p-8 border border-colorTwo dark:border-colorOne">
          {isAdminLogged && (
            <>
              <img
                src={currentLoggedData?.adminProfileURL}
                className={`rounded-sm cursor-pointer ${
                  viewProfileImage
                    ? "absolute h-[500px] z-[5555]"
                    : "h-[150px] static"
                } `}
              />
              <div className="w-full flex justify-center gap-5">
                {isProfileEdit && isAdminLogged ? (
                  <>
                    <button
                      className={`bg-green-500 cursor-pointer border-0 px-4 py-2 hover:rounded-xl relative text-sm flex justify-center items-center gap-2`}
                      disabled={
                        profileEditingLoading ||
                        (newProfileImageLoading && true)
                      }
                    >
                      <input
                        type={"file"}
                        className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                        onChange={(e) => {
                          setNewProfileImageFile(e.target.files);
                        }}
                      />
                      Upload a New Image
                      {newProfileImageLoading && (
                        <ClipLoader size={20} color="white" />
                      )}
                    </button>
                    {newProfileImageFile?.length && (
                      <button
                        className={`bg-blue-500 cursor-pointer border-0 px-4 py-2 hover:rounded-xl relative text-sm flex justify-center items-center gap-2`}
                        onClick={uploadNewProfileImageHandler}
                        disabled={
                          profileEditingLoading ||
                          (newProfileImageLoading && true)
                        }
                      >
                        Set New Profile Picture{" "}
                        {newProfileImageLoading && (
                          <ClipLoader size={20} color="white" />
                        )}
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    className={`bg-colorOne cursor-pointer border-0 px-4 py-2 hover:rounded-xl ${ThemeDarkToLight}`}
                    onClick={() => {
                      setViewProfileImage(true);
                    }}
                  >
                    View Image
                  </button>
                )}
              </div>
              <div
                className={` w-full h-[100dvh] z-[80] fixed top-0 left-0 bg-colorTwo backdrop-blur-lg bg-opacity-50 ${
                  viewProfileImage ? "flex" : "hidden"
                } justify-center items-center`}
                onClick={() => {
                  setViewProfileImage(false);
                }}
              >
                {" "}
              </div>
            </>
          )}
          {profileInfoDiv?.map((element, index) => {
            const { label, value, id } = element;
            return (
              <React.Fragment key={index}>
                <div className="flex flex-col justify-center items-start gap-2 w-full">
                  <span className="text-xl">{label}:</span>
                  <span
                    className={`text-lg border border-colorTwo dark:border-colorOne rounded-sm whitespace-nowrap overflow-x-hidden w-full px-3 py-2 ${
                      id === "email" && "lowercase"
                    } ${!isProfileEdit || (id === "email" && "emailToolTip")}`}
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
              } text-colorOne cursor-pointer border-0 px-4 py-2 flex hover:rounded-xl transition-all justify-center items-center gap-2 ${
                profileEditingLoading && "cursor-not-allowed"
              }`}
              id="Sign_Up_Form_Submit_Button"
              disabled={
                profileEditingLoading || (newProfileImageLoading && true)
              }
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
                className={`${ThemeDarkToLight} cursor-pointer border-0 px-4 py-2 flex hover:rounded-xl transition-all justify-center items-center gap-2 ${
                  profileEditingLoading && "cursor-not-allowed"
                }`}
                id="Sign_Up_Form_Submit_Button"
                disabled={
                  profileEditingLoading || (newProfileImageLoading && true)
                }
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
