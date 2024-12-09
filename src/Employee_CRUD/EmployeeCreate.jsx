import React, { Fragment, useState } from "react";
import { ThemeDarkToLight, ThemeLightToDark } from "../Main_Components/App";
import { useForm } from "react-hook-form";

import { rejectMessage, resolveMessage } from "../Script/index";
import { ClipLoader } from "react-spinners";
import { BiArrowFromLeft } from "react-icons/bi";
import { cloudinaryConfig } from "../ConfigFiles/Cloudinary_Config";
import { PiEyeClosedBold, PiEyeFill } from "react-icons/pi";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../ConfigFiles/firebase_Config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const EmployeeCreate = () => {
  const [employeeCreateLoading, setEmployeeCreateLoading] = useState(false);
  const [signInPasswordEye, setSignInPasswordEye] = useState(false);
  const employeecCreateInputs = [
    { ID: "employeeName", Placeholder: "Name", Type: "text" },
    { ID: "employeeEmail", Placeholder: "Email", Type: "email" },
    {
      ID: "employeePassword",
      Placeholder: "Password",
      Type: signInPasswordEye ? "text" : "password",
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

  const Employee_Create_Form_Handler = async (employee_created_Data) => {
    try {
      event.preventDefault();
      if (!employee_created_Data.employeeProfile[0].type.includes("image")) {
        rejectMessage("Profile Extension Not Supported");
        return;
      }
      setEmployeeCreateLoading(true);
      const employeeProfile = employee_created_Data.employeeProfile[0];
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
      employee_created_Data.employeeProfile = url;
      employee_created_Data.employeeCreatingTime = serverTimestamp();
      employee_created_Data.role = "Employee";
      await createUserWithEmailAndPassword(
        auth,
        employee_created_Data.employeeEmail,
        employee_created_Data.employeePassword
      );
      await addDoc(collection(db, "Employees"), employee_created_Data);
      resolveMessage("Employee Created");
      setEmployeeCreateLoading(false);
      reset();
    } catch (error) {
      console.log(error);
      setEmployeeCreateLoading(false);
      rejectMessage(error.message);
    }
  };

  return (
    <Fragment>
      <div
        className={`Employee_Create_Page w-full h-full md:h-[90svh]  flex flex-col justify-center items-center p-2 mt-[10svh] ${ThemeDarkToLight}`}
      >
        <form
          className={`Employee_Create_Form flex flex-wrap items-center justify-evenly gap-4 w-[1000px] max-w-full p-8 border dark:border-colorTwo dborder-colorOne
            
            ${employeeCreateLoading && "select-none cursor-not-allowed"}`}
          onSubmit={handleSubmit(Employee_Create_Form_Handler)}
        >
          <h1 className="font-semibold tracking-tighter text-4xl w-[100%] py-2 text-center dark:text-colorTwo text-colorOne">
            Create Employee
          </h1>
          {employeecCreateInputs.map((elem, index) => {
            const { ID, Placeholder, Type } = elem;
            return (
              <React.Fragment key={index}>
                <label
                  htmlFor={ID}
                  className={`flex flex-col items-start justify-center gap-2 font-normal dark:text-colorTwo text-colorOne ${
                    employeeCreateLoading && "cursor-not-allowed"
                  } ${ID === "employeePassword" && "relative overflow-hidden"}`}
                >
                  {Placeholder}
                  <input
                    disabled={employeeCreateLoading && true}
                    type={Type}
                    placeholder={Placeholder}
                    id={Type === "file" ? ID : Placeholder}
                    className={`p-2 bg-transparent border dark:border-colorTwo border-colorOne color-colorTwo font-light tracking-[1px] dark:placeholder:text-colorTwo placeholder:text-colorOne focus:outline-0  w-[300px]   ${
                      employeeCreateLoading && "cursor-not-allowed"
                    }`}
                    {...register(ID, {
                      required: `${Placeholder} is required.`,
                      minLength: {
                        value: ID === "employeePassword" && 8,
                        message:
                          ID === "employeePassword" &&
                          "Password At Least Eight Character",
                      },
                      min: {
                        value:
                          ID === "employeeAge"
                            ? 18
                            : ID === "employeeExperience"
                            ? 2
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
                    <div className="p-2 cursor-pointer bg-transparent border dark:border-colorTwo color-light_Bg font-light tracking-[1px] border-colorOne w-[300px]">
                      Profile
                    </div>
                  )}

                  {ID === "employeePassword" && (
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
              className={`cursor-pointer ${ThemeLightToDark} border-0 px-[15px] py-[8px] text-[15px] flex hover:rounded-xl transition-all justify-center items-center gap-5 ${
                employeeCreateLoading && "cursor-not-allowed"
              }`}
              id="Employee_Form_Submit_Button"
              disabled={employeeCreateLoading && true}
            >
              <span>Create Employee</span>

              {employeeCreateLoading ? (
                <ClipLoader
                  loading={employeeCreateLoading}
                  size={20}
                  className="LoadingLoader"
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

export default EmployeeCreate;
