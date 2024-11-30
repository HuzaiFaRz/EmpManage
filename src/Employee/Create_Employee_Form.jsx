import React, { Fragment, useState } from "react";
import { ThemeDarkToLight } from "../Main_Components/App";
import { useForm } from "react-hook-form";
import {
  addDoc,
  auth,
  collection,
  createUserWithEmailAndPassword,
  db,
  serverTimestamp,
} from "../Auth/firebase_Confic";
import { rejectMessage, resolveMessage } from "../Global_Files/index";
import { ClipLoader } from "react-spinners";
import { BiArrowFromLeft } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import { cloudinaryConfig } from "../Auth/Cloudinary_Confic";
import Employee_Heading from "./Employee_Heading";
import Navbar from "../Navbar/Navbar";

const Create_Employee_Form = () => {
  const [createEmployeeLoading, setCreateEmployeeLoading] = useState(false);
  const createEmployeeInputs = [
    { ID: "Employee_First_Name", Placeholder: "First Name", Type: "text" },
    { ID: "Employee_Last_Name", Placeholder: "Last Name", Type: "text" },
    { ID: "Employee_Email", Placeholder: "Email", Type: "email" },
    { ID: "Employee_Password", Placeholder: "Password", Type: "password" },
    {
      ID: "Employee_Phone_Number",
      Placeholder: "Phone Number",
      Type: "number",
    },
    { ID: "Employee_Address", Placeholder: "Address", Type: "text" },
    { ID: "Employee_City", Placeholder: "City", Type: "text" },
    { ID: "Employee_State", Placeholder: "State", Type: "text" },
    { ID: "Employee_Age", Placeholder: "Age", Type: "number" },
    { ID: "Empolyee_Profession", Placeholder: "Profession", Type: "text" },
    {
      ID: "Empolyee_Experience",
      Placeholder: "Experience",
      Type: "number",
    },
    {
      ID: "Empolyee_Profile",
      Placeholder: "Profile Pic",
      Type: "file",
    },
  ];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const Create_Employee_Form_Handler = async (create_Employee_Data) => {
    try {
      event.preventDefault();
      if (!create_Employee_Data.Empolyee_Profile[0].type.includes("image")) {
        rejectMessage("File Extension Not Supported");
        return;
      }
      setCreateEmployeeLoading(true);
      const employeeProfile = create_Employee_Data.Empolyee_Profile[0];
      const employeeProfileData = new FormData();
      employeeProfileData.append("file", employeeProfile);
      employeeProfileData.append(
        "upload_preset",
        cloudinaryConfig.uploadPreset
      );
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        { method: "POST", body: employeeProfileData }
      );
      const data = await response.json();
      const { url } = data;
      create_Employee_Data.Empolyee_Profile = url;
      await createUserWithEmailAndPassword(
        auth,
        create_Employee_Data.Employee_Email,
        create_Employee_Data.Employee_Password
      );
      const create_Employee_Main_Data = {
        employee_Data: create_Employee_Data,
        Employee_Sign_Up_Time: serverTimestamp(),
        role: "Employee",
      };
      await addDoc(collection(db, "Employees"), create_Employee_Main_Data);
      resolveMessage("Account Created");
      reset();
      setCreateEmployeeLoading(false);
    } catch (error) {
      setCreateEmployeeLoading(false);
      rejectMessage(error.message);
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      <Navbar />
      <div className="Employee_Page w-full h-full flex flex-col justify-center items-center p-2">
        <form
          className={`Employee_Form flex flex-wrap items-center justify-evenly gap-4 w-[1000px] max-w-full p-8 ${ThemeDarkToLight} ${
            createEmployeeLoading && "select-none cursor-not-allowed"
          }`}
          onSubmit={handleSubmit(Create_Employee_Form_Handler)}
        >
          <Employee_Heading HeadingText={"Create Employee"} />
          {createEmployeeInputs.map((elem, index) => {
            const { ID, Placeholder, Type } = elem;
            return (
              <React.Fragment key={index}>
                <label
                  htmlFor={ID}
                  className={`flex flex-col items-start justify-center gap-2 font-light ${
                    createEmployeeLoading && "cursor-not-allowed"
                  } `}
                >
                  {Type === "file"
                    ? "Select Profile"
                    : Type === "password"
                    ? "Create Password"
                    : ID === "Empolyee_Experience"
                    ? "Experience"
                    : Placeholder}
                  <input
                    disabled={createEmployeeLoading && true}
                    type={Type}
                    placeholder={Placeholder}
                    id={Type === "file" ? ID : Placeholder}
                    autoComplete="on"
                    className={`p-2 bg-transparent border-2 border-colorOne color-colorOne font-light tracking-[1px] placeholder:text-colorOne focus:outline-0 dark:border-colorTwo w-[300px] dark:placeholder:text-colorTwo placeholder:opacity-60 ${
                      createEmployeeLoading && "cursor-not-allowed"
                    } `}
                    {...register(ID, {
                      required: `${Placeholder} is required.`,
                      minLength:
                        ID === "Employee_Password"
                          ? {
                              value: 8,
                              message: "8 Characters required",
                            }
                          : null,
                      maxLength:
                        ID === "Employee_Age" || ID === "Empolyee_Experience"
                          ? {
                              value: 2,
                              message: "2 Characters required",
                            }
                          : null,

                      pattern: {
                        value: /^[^\s]+(?:$|.*[^\s]+$)/,
                        message: "Remove Blank Space",
                      },
                    })}
                    hidden={Type === "file" && true}
                  />
                  {Type === "file" && (
                    <div className="p-2 cursor-pointer bg-transparent border-2 border-colorOne color-colorOne font-light tracking-[1px] dark:border-colorTwo w-[300px]">
                      <span className="opacity-60">Profile</span>
                    </div>
                  )}
                  <p
                    className={`text-[red] dark:text-white text-[13px] tracking-wider py-2 w-full h-[20px] flex items-center font-normal ${
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
              className={`cursor-pointer bg-colorOne dark:bg-colorTwo text-colorTwo dark:text-colorOne border-0 px-[15px] py-[8px] text-[15px] flex hover:rounded-xl transition-all justify-center items-center gap-5 ${
                createEmployeeLoading && "cursor-not-allowed"
              }`}
              id="Employee_Form_Submit_Button"
              disabled={createEmployeeLoading && true}
            >
              <span>Create Employee</span>
              {createEmployeeLoading ? (
                <ClipLoader
                  loading={createEmployeeLoading}
                  size={20}
                  color="white"
                />
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

export default Create_Employee_Form;
