import React, { Fragment, useState } from "react";
import { ThemeDarkToLight, ThemeLightToDark } from "../Script/index";
import { useForm } from "react-hook-form";

import { rejectMessage, resolveMessage } from "../Script/index";
import { ClipLoader } from "react-spinners";
import { BiArrowFromLeft } from "react-icons/bi";
import { cloudinaryConfig } from "../ConfigFiles/Cloudinary_Config";
import { auth, db } from "../ConfigFiles/firebase_Config";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import uuid from "react-uuid";
import { IoIosWarning } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";

import { Tooltip } from "react-tooltip";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Employee_Add = () => {
  const [employeeAddLoading, setEmployeeAddLoading] = useState(false);
  const [employeeID, setEmployeeID] = useState(uuid().slice(0, 15));
  const employeeAddInputs = [
    { ID: "employeeName", Placeholder: "Name", Type: "text" },
    { ID: "employeeEmail", Placeholder: "Email", Type: "email" },
    {
      ID: "employeeID",
      Placeholder: "ID",
      Type: "text",
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

  const employee_ID_Handler = () => {
    const id = uuid().slice(0, 15);
    setEmployeeID(id);
  };

  const employee_Add_Form_Handler = async (employee_Added_Data) => {
    try {
      event.preventDefault();
      if (!employee_Added_Data.employeeProfile[0].type.includes("image")) {
        rejectMessage("Profile Extension Not Supported");
        return;
      }
      setEmployeeAddLoading(true);
      const employeeProfile = employee_Added_Data.employeeProfile[0];
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
      const { url, public_id } = data;
      employee_Added_Data.employeeProfilePublicID = public_id;
      employee_Added_Data.employeeProfile = url;
      employee_Added_Data.employeeAddingTime = serverTimestamp();
      employee_Added_Data.role = "Employee";
      await addDoc(collection(db, "Employees"), employee_Added_Data);
      resolveMessage("Employee Added");
      setEmployeeAddLoading(false);
      employee_ID_Handler();
    } catch (error) {
      // reset();
      console.log(error);
      setEmployeeAddLoading(false);
      rejectMessage(error.message);
    }
  };

  return (
    <Fragment>
      <div
        className={`Employee_Add_Page w-full h-full md:h-[90svh]  flex flex-col justify-center items-center p-2 mt-[10svh] ${ThemeLightToDark}`}
      >
        <form
          className={`Employee_Add_Form flex flex-wrap items-center justify-evenly gap-4 w-[1000px] max-w-full p-8 border border-colorTwo dark:border-colorOne
            
            ${employeeAddLoading && "select-none cursor-not-allowed"}`}
          onSubmit={handleSubmit(employee_Add_Form_Handler)}
        >
          <h1 className="font-semibold tracking-tighter text-4xl w-[100%] py-2 text-center text-colorTwo dark:text-colorOne">
            Add Employee
          </h1>
          {employeeAddInputs.map((elem, index) => {
            const { ID, Placeholder, Type } = elem;
            return (
              <React.Fragment key={index}>
                <label
                  htmlFor={ID}
                  className={`flex flex-col items-start justify-center gap-2 font-normal text-colorTwo dark:text-colorOne ${
                    employeeAddLoading && "cursor-not-allowed"
                  } ${ID === "employeeID" && "relative overflow-hidden"}`}
                >
                  {Placeholder}
                  <input
                    disabled={employeeAddLoading && true}
                    type={Type}
                    placeholder={Placeholder}
                    value={ID === "employeeID" ? employeeID : null}
                    id={Type === "file" ? ID : Placeholder}
                    className={`p-2 bg-transparent border border-colorTwo dark:border-colorOne color-colorTwo font-light tracking-[1px] placeholder:text-colorTwo dark:placeholder:text-colorOne focus:outline-0 w-[300px] ${
                      employeeAddLoading && "cursor-not-allowed"
                    }`}
                    {...register(ID, {
                      required: `${Placeholder} is required.`,
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
                    <div className="p-2 cursor-pointer bg-transparent border border-colorTwo color-light_Bg font-light tracking-[1px] dark:border-colorOne w-[300px]">
                      Profile
                    </div>
                  )}

                  {ID === "employeeID" && (
                    <>
                      <Tooltip
                        anchorSelect=".employee_id_generate_icons"
                        id="employee_id_generate_icons"
                        place="top"
                        content="Generte Unique ID"
                        position="top"
                      />
                      <button
                        className="absolute right-2 cursor-pointer employee_id_generate_icons"
                        type="button"
                        onClick={() => {
                          employee_ID_Handler();
                        }}
                        disabled={employeeAddLoading && true}
                      >
                        <VscDebugRestart size={22} />
                      </button>
                    </>
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
                employeeAddLoading && "cursor-not-allowed"
              }`}
              id="Employee_Form_Submit_Button"
              disabled={employeeAddLoading && true}
            >
              <span>Add Employee</span>

              {employeeAddLoading ? (
                <ClipLoader
                  loading={employeeAddLoading}
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

export default Employee_Add;
