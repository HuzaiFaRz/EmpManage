import React, { Fragment, useState } from "react";
import { ThemeDarkToLight, ThemeLightToDark } from "../Main_Components/App";
import { useForm } from "react-hook-form";
import {
  addDoc,
  collection,
  db,
  serverTimestamp,
} from "../Auth/firebase_Confic";
import { rejectMessage, resolveMessage } from "../Script/index";
import { ClipLoader } from "react-spinners";
import { BiArrowFromLeft } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import { cloudinaryConfig } from "../Auth/Cloudinary_Confic";
import Navbar from "../Components/Navbar";

const Create_Employee = () => {
  const [createEmployeeLoading, setCreateEmployeeLoading] = useState(false);
  const createEmployeeInputs = [
    { ID: "employeeName", Placeholder: "Name", Type: "text" },
    { ID: "employeeEmail", Placeholder: "Email", Type: "email" },
    {
      ID: "employeePhone_Number",
      Placeholder: "Phone Number",
      Type: "number",
    },
    { ID: "employeeAddress", Placeholder: "Address", Type: "text" },
    { ID: "employeeCity", Placeholder: "City", Type: "text" },
    { ID: "employeeAge", Placeholder: "Age", Type: "number" },
    { ID: "employeeProfession", Placeholder: "Profession", Type: "text" },
    {
      ID: "employeeExperience",
      Placeholder: "Experience",
      Type: "number",
    },
    {
      ID: "employeeProfile",
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
      if (!create_Employee_Data.employeeProfile[0].type.includes("image")) {
        rejectMessage("Profile Extension Not Supported");
        return;
      }
      setCreateEmployeeLoading(true);
      const employeeProfile = create_Employee_Data.employeeProfile[0];
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
      create_Employee_Data.employeeProfile = url;
      await addDoc(collection(db, "Employees"), {
        create_Employee_Data,
        employeeCreatingTime: serverTimestamp(),
        role: "Employee",
      });
      resolveMessage("Employee Created");
      reset();
      setCreateEmployeeLoading(false);
    } catch (error) {
      console.log(error);
      setCreateEmployeeLoading(false);
      rejectMessage(error.message);
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      <Navbar />

      <div
        className={`Employee_Create_Page w-full h-screen flex flex-col justify-center items-center p-2  ${ThemeLightToDark}`}
      >
        <form
          className={`Employee_Create_Form flex flex-wrap items-center justify-evenly gap-4 w-[1000px] max-w-full p-8 border border-colorTwo dark:border-colorOne
            
            ${createEmployeeLoading && "select-none cursor-not-allowed"}`}
          onSubmit={handleSubmit(Create_Employee_Form_Handler)}
        >
          <h1 className="font-semibold tracking-tighter text-4xl w-[100%] py-2 text-center text-colorTwo dark:text-colorOne">
            Create Employee
          </h1>
          {createEmployeeInputs.map((elem, index) => {
            const { ID, Placeholder, Type } = elem;
            return (
              <React.Fragment key={index}>
                <label
                  htmlFor={ID}
                  className={`flex flex-col items-start justify-center gap-2 font-normal text-colorTwo dark:text-colorOne ${
                    createEmployeeLoading && "cursor-not-allowed"
                  }`}
                >
                  {Placeholder}
                  <input
                    disabled={createEmployeeLoading && true}
                    type={Type}
                    placeholder={Placeholder}
                    id={Type === "file" ? ID : Placeholder}
                    className={`p-2 bg-transparent border border-colorTwo dark:border-colorOne color-colorTwo font-light tracking-[1px] placeholder:text-colorTwo dark:placeholder:text-colorOne focus:outline-0  w-[300px]   ${
                      createEmployeeLoading && "cursor-not-allowed"
                    }`}
                    {...register(ID, {
                      required: `${Placeholder} is required.`,
                      min: {
                        value:
                          ID === "employeeAge"
                            ? 18
                            : ID === "employeeExperience"
                            ? 1
                            : null,
                        message:
                          ID === "employeeAge"
                            ? "Age must be 18+"
                            : ID === "employeeExperience"
                            ? "Experience too low"
                            : null,
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
                  color="#f5f5f5"
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

export default Create_Employee;
