import React, { Fragment, useState } from "react";
import AuthHeading from "./AuthHeading";
import { ThemeDarkToLight } from "../Main_Components/App";
import { useForm } from "react-hook-form";
import {
  addDoc,
  collection,
  db,
  RejectMessage,
  ResolveMessage,
} from "../Auth/firebase_Confic";
import { ClipLoader } from "react-spinners";
import { BiArrowFromLeft } from "react-icons/bi";
import { ToastContainer } from "react-toastify";

const EmployeeForm = () => {
  const EmployeeInput =
    "p-2 bg-transparent border-2 border-colorOne color-colorOne font-light capitalize tracking-[1px] placeholder:text-colorOne focus:outline-0 dark:border-colorTwo w-[300px] dark:placeholder:text-colorTwo";
  const EmployeeLabel =
    "flex flex-col items-start justify-center gap-2 font-light";
  const [employeeSubmitLoading, setEmployeeSubmitLoading] = useState(false);
  const inputs = [
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
      Placeholder: "Experience Year",
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
    setError,
    formState: { errors },
  } = useForm();

  const Employee_Form_Handler = async (employee_Data) => {
    try {
      event.preventDefault();
      if (employee_Data?.Empolyee_Profile[0]?.type !== "image/jpeg") {
        RejectMessage("File Extension Not Supported");
        return;
      }
      employee_Data.Empolyee_Profile = employee_Data.Empolyee_Profile[0].name;
      console.log(employee_Data);
      setError("test", { type: "focus" }, { shouldFocus: true });
      setEmployeeSubmitLoading(true);
      const employeDataAdding = await addDoc(
        collection(db, "Employees"),
        employee_Data
      );
      reset();
      setEmployeeSubmitLoading(false);
      ResolveMessage("Employee Added");
      console.log(employeDataAdding);
    } catch (error) {
      setEmployeeSubmitLoading(false);
      console.log(error.message);
      RejectMessage(error.message);
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      <div className="Employee_Page w-full h-full flex flex-col justify-center items-center p-2">
        <form
          className={`Employee_Form flex flex-wrap items-center justify-evenly gap-4 w-[1000px] max-w-full p-8 ${ThemeDarkToLight}`}
          onSubmit={handleSubmit(Employee_Form_Handler)}
        >
          <AuthHeading HeadingText={"Employee"} />

          {inputs.map((elem, index) => {
            const { ID, Placeholder, Type } = elem;
            return (
              <React.Fragment key={index}>
                <label htmlFor={ID} className={EmployeeLabel}>
                  {Type === "file"
                    ? "Select"
                    : Type === "password"
                    ? "Create"
                    : "Enter"}{" "}
                  {Placeholder}
                  <input
                    type={Type}
                    placeholder={Placeholder}
                    id={Type === "file" ? ID : Placeholder}
                    className={`${EmployeeInput} ${
                      Type === "file" && "hidden"
                    }`}
                    {...register(ID, {
                      required: `${Placeholder} is required.`,
                    })}
                  />
                  {Type === "file" && (
                    <div className="cursor-pointer bg-colorOne dark:bg-colorTwo text-colorTwo dark:text-colorOne  border-0 px-[15px] py-[8px] text-1xl">
                      Profile Photo
                    </div>
                  )}
                  <p
                    className="text-[red] dark:text-white text-[13px] tracking-wider py-2 w-full h-[20px] flex items-center"
                    id="Error_Para"
                  >
                    {errors[ID] && errors?.[ID]?.message}
                  </p>
                </label>
              </React.Fragment>
            );
          })}
          <div className="w-full p-2 m-2 flex items-center justify-center">
            <button
              type="submit"
              className="cursor-pointer bg-colorOne dark:bg-colorTwo text-colorTwo dark:text-colorOne border-0 px-[15px] py-[8px] text-1xln hover:translate-y-1 transition-all flex justify-center items-center gap-5"
              id="Employee_Form_Submit_Button"
              disabled={employeeSubmitLoading && true}
            >
              <span>Add Employee</span>
              {employeeSubmitLoading ? (
                <ClipLoader
                  loading={employeeSubmitLoading}
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

export default EmployeeForm;
