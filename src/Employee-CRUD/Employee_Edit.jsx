import React, { Fragment, useEffect, useState } from "react";
import { AuthUseContext } from "../Utilities/Auth_Provider";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Config-Files/firebase_Config";
import {
  rejectMessage,
  resolveMessage,
  ThemeDarkToLight,
  ThemeLightToDark,
} from "../Script";
import LoadingArrows from "../Loading/Loading_Arrows";
import { IoIosWarning } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import { BiArrowFromLeft } from "react-icons/bi";
import { useForm } from "react-hook-form";

const Employee_Edit = () => {
  const navigate = useNavigate();
  const { editEmployeeId } = AuthUseContext();
  const [employeeEditGettingLoading, setEmployeeEditGettingLoading] =
    useState(false);
  const [employeeEditingLoading, setEmployeeEditingLoading] = useState(false);
  const [employeeEditData, setEmployeeEditData] = useState(false);
  const [employeeStatus, setEmployeeStatus] = useState(null);

  useEffect(() => {
    document.title = "EmpManage | | Employee Edit";
  }, []);

  const employeeEditInputs = [
    { ID: "employeeName", Placeholder: "Name", Type: "text" },
    {
      ID: "employeeEmail",
      Placeholder: "Email",
      Type: "email",
    },
    {
      ID: "employeeAddress",
      Placeholder: "Address",
      Type: "text",
    },
    { ID: "employeeCity", Placeholder: "City", Type: "text" },
    { ID: "employeeAge", Placeholder: "Age", Type: "number" },
    { ID: "employeeSalary", Placeholder: "Salary", Type: "number" },
    {
      ID: "employeeProfession",
      Placeholder: "Profession",
      Type: "text",
    },
    {
      ID: "employeeExperience",
      Placeholder: "Experience",
      Type: "number",
    },
    { ID: "employeeStatus", Placeholder: "Status" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editEmployeeId === null) {
      navigate("/employees", { replace: true });
      return;
    }
    (async () => {
      try {
        const employeeEditDoc = doc(db, "Employees", editEmployeeId);
        setEmployeeEditGettingLoading(true);
        const editEmployee = await getDoc(employeeEditDoc);
        setEmployeeStatus(editEmployee.data().employeeStatus);
        setEmployeeEditData(editEmployee.data());
      } catch (error) {
        console.log(error);
        rejectMessage(error.message);
      } finally {
        setEmployeeEditGettingLoading(false);
      }
    })();
  }, [setEmployeeEditData, navigate, editEmployeeId]);

  useEffect(() => {
    Object.keys(employeeEditData).forEach((key) => {
      setValue(key, employeeEditData[key]);
    });
  }, [employeeEditData, setValue]);

  if (employeeEditGettingLoading) {
    return <LoadingArrows />;
  }

  const employee_Edit_Form_Handler = async (employee_Edit_Data) => {
    try {
      const employeeEditDoc = doc(db, "Employees", editEmployeeId);
      setEmployeeEditingLoading(true);
      await updateDoc(employeeEditDoc, {
        employeeName: employee_Edit_Data.employeeName,
        employeeEmail: employee_Edit_Data.employeeEmail,
        employeeAddress: employee_Edit_Data.employeeAddress,
        employeeCity: employee_Edit_Data.employeeCity,
        employeeAge: employee_Edit_Data.employeeAge,
        employeeProfession: employee_Edit_Data.employeeProfession,
        employeeExperience: employee_Edit_Data.employeeExperience,
        employeeSalary: employee_Edit_Data.employeeSalary,
        employeeStatus: employeeStatus,
        employeeEdited: true,
      });
      resolveMessage("Employee Edited");
      navigate("/employees");
    } catch (error) {
      console.log(error);
      rejectMessage(error.message);
    } finally {
      setEmployeeEditingLoading(false);
    }
  };

  return (
    <Fragment>
      <div
        className={`Employee_Edit_Page w-full h-full md:h-[90svh] flex flex-col justify-center items-center p-2 mt-[10svh] ${ThemeLightToDark}`}
      >
        <form
          className={`Employee_Edit_Form flex flex-wrap items-center justify-evenly gap-4 w-[1000px] max-w-full p-8 border border-colorTwo dark:border-colorOne
          ${employeeEditingLoading && "select-none cursor-not-allowed"}`}
          onSubmit={handleSubmit(employee_Edit_Form_Handler)}
        >
          <h1 className="font-semibold tracking-tighter text-4xl w-[100%] py-2 text-center text-colorTwo dark:text-colorOne">
            Edit Employee
          </h1>

          {employeeEditInputs.map((elem, index) => {
            let { ID, Placeholder, Type } = elem;

            return (
              <React.Fragment key={index}>
                <label
                  htmlFor={ID}
                  className={`flex flex-col items-start justify-center gap-2 font-normal text-colorTwo dark:text-colorOne ${
                    employeeEditingLoading && "cursor-not-allowed"
                  } ${ID === "employeeID" && "relative overflow-hidden"}`}
                >
                  {Placeholder}

                  {ID === "employeeStatus" ? (
                    <select
                      name={Placeholder}
                      id={ID}
                      className="bg-transparent border border-colorTwo dark:border-colorOne color-colorTwo outline-0 p-2 rounded-none"
                      onChange={(e) => {
                        setEmployeeStatus(e.target.value);
                      }}
                    >
                      &nbsp;&nbsp;&nbsp;Select {Placeholder}
                      <option value="active">Active</option>
                      <option
                        value="unactive"
                        selected={employeeStatus === "unactive" && true}
                      >
                        unActive
                      </option>
                    </select>
                  ) : (
                    <input
                      disabled={employeeEditingLoading && true}
                      type={Type}
                      placeholder={Placeholder}
                      id={Type === "file" ? ID : Placeholder}
                      className={`p-2 bg-transparent border border-colorTwo dark:border-colorOne color-colorTwo font-light tracking-[1px] placeholder:text-colorTwo dark:placeholder:text-colorOne focus:outline-0 w-[300px] ${
                        employeeEditingLoading && "cursor-not-allowed"
                      }`}
                      {...register(ID, {
                        required: `${Placeholder} is required.`,
                        max: {
                          value:
                            ID === "employeeAge"
                              ? 40
                              : ID === "employeeExperience"
                              ? 20
                              : null,
                          message:
                            ID === "employeeAge"
                              ? "Age must not exceed 40 years."
                              : ID === "employeeExperience"
                              ? "Experience must not exceed 20 years."
                              : null,
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
                    />
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
                employeeEditingLoading && "cursor-not-allowed"
              }`}
              id="Employee_Form_Submit_Button"
              disabled={employeeEditingLoading && true}
            >
              <span>Edit Employee</span>

              {employeeEditingLoading ? (
                <ClipLoader
                  loading={employeeEditingLoading}
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

export default Employee_Edit;
