import { Fragment, useState } from "react";
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

  const { register, handleSubmit, reset } = useForm();
  const Employee_Form_Handler = async (employee_Data) => {
    try {
      event.preventDefault();
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
      <div className="Employee_Page w-full h-full min-h-screen flex flex-col justify-evenly items-center p-1">
        <form
          className={`Employee_Form flex flex-wrap items-center justify-evenly gap-4 w-[1000px] max-w-full min-h-max p-8  ${ThemeDarkToLight}`}
          onSubmit={handleSubmit(Employee_Form_Handler)}
        >
          <AuthHeading HeadingText={"Employee"} />
          <label htmlFor="Employee_First_Name" className={EmployeeLabel}>
            Enter First Name
            <input
              type="text"
              placeholder="First Name"
              id="Employee_First_Name"
              className={EmployeeInput}
              {...register("Employee_First_Name", {
                required: true,
              })}
            />
          </label>
          <label htmlFor="Employee_Last_Name" className={EmployeeLabel}>
            Enter Last Name
            <input
              type="text"
              placeholder="Last Name"
              id="Employee_Last_Name"
              className={EmployeeInput}
              {...register("Employee_Last_Name", { required: true })}
            />
          </label>
          <label htmlFor="Employee_Email" className={EmployeeLabel}>
            Enter Email
            <input
              type="email"
              placeholder="Email"
              id="Employee_Email"
              className={EmployeeInput}
              {...register("Employee_Email", { required: true })}
            />
          </label>
          <label htmlFor="Employee_Phone_Number" className={EmployeeLabel}>
            Enter Phone Number
            <input
              type="number"
              placeholder="Phone Number"
              id="Employee_Phone_Number"
              className={EmployeeInput}
              {...register("Employee_Phone_Number", { required: true })}
            />
          </label>

          <label htmlFor="Employee_Address" className={EmployeeLabel}>
            Enter Address
            <input
              type="text"
              placeholder="Address"
              id="Employee_Address"
              className={EmployeeInput}
              {...register("Employee_Address", { required: true })}
            />
          </label>
          <label htmlFor="Employee_City" className={EmployeeLabel}>
            Enter City
            <input
              type="text"
              placeholder="City"
              id="Employee_City"
              className={EmployeeInput}
              {...register("Employee_City", { required: true })}
            />
          </label>
          <label htmlFor="Employee_State" className={EmployeeLabel}>
            Enter State
            <input
              type="text"
              placeholder="State"
              id="Employee_State"
              className={EmployeeInput}
              {...register("Employee_State", { required: true })}
            />
          </label>
          <label htmlFor="Employee_Age" className={EmployeeLabel}>
            Enter Age
            <input
              type="number"
              placeholder="Age"
              id="Employee_Age"
              className={EmployeeInput}
              {...register("Employee_Age", { required: true })}
            />
          </label>

          <label htmlFor="Empolyee_Profession" className={EmployeeLabel}>
            Enter Profession
            <input
              type="text"
              placeholder="Profession"
              id="Empolyee_Profession"
              className={EmployeeInput}
              {...register("Empolyee_Profession", { required: true })}
            />
          </label>

          <label htmlFor="Empolyee_Experience" className={EmployeeLabel}>
            Enter Experience
            <input
              type="number"
              placeholder="Experience Year"
              id="Empolyee_Experience"
              className={EmployeeInput}
              {...register("Empolyee_Experience", { required: true })}
            />
          </label>

          <div className="w-full p-2 m-2 flex items-center justify-center">
            <button
              type="submit"
              className="cursor-pointer bg-colorOne dark:bg-colorTwo text-colorTwo dark:text-colorOne border-0 px-[15px] py-[8px] rounded-[20px] text-1xln hover:translate-y-1 transition-all flex justify-center items-center gap-5"
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
