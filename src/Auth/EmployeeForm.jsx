import { Fragment } from "react";
import AuthHeading from "./AuthHeading";
import { DefaultProfilePic, ThemeDarkToLight } from "../Main_Components/App";

const EmployeeForm = () => {
  const EmployeeInput =
    "p-2 bg-transparent border border-lightBg color-lightBg font-light capitalize tracking-[1px] placeholder:text-lightBg focus:outline-0 dark:border-darkBg w-[300px]  dark:placeholder:text-darkBg";
  const EmployeeLabel =
    "flex flex-col items-start justify-center gap-2 font-light";

  return (
    <Fragment>
      <div className="Employee_Page w-full h-screen flex flex-col justify-evenly items-center p-1">
        <form
          className={`Employee_Form flex flex-wrap items-center justify-evenly gap-4 w-[1000px] max-w-full h-[600px] min-h-max p-2 ${ThemeDarkToLight}`}
        >
          <AuthHeading HeadingText={"Employee"} />
          <label htmlFor="Employee_First_Name" className={EmployeeLabel}>
            Enter First Name
            <input
              type="text"
              placeholder="First Name"
              id="Employee_First_Name"
              className={EmployeeInput}
            />
          </label>
          <label htmlFor="Employee_Last_Name" className={EmployeeLabel}>
            Enter Last Name
            <input
              type="text"
              placeholder="Last Name"
              id="Employee_Last_Name"
              className={EmployeeInput}
            />
          </label>
          <label htmlFor="Employee_Email" className={EmployeeLabel}>
            Enter Email
            <input
              type="email"
              placeholder="Email"
              id="Employee_Email"
              className={EmployeeInput}
            />
          </label>
          <label htmlFor="Employee_Phone_Number" className={EmployeeLabel}>
            Enter Phone Number
            <input
              type="number"
              placeholder="Phone Number"
              id="Employee_Phone_Number"
              className={EmployeeInput}
            />
          </label>

          <label htmlFor="Employee_Address" className={EmployeeLabel}>
            Enter Address
            <input
              type="text"
              placeholder="Address"
              id="Employee_Address"
              className={EmployeeInput}
            />
          </label>
          <label htmlFor="Employee_City" className={EmployeeLabel}>
            Enter City
            <input
              type="text"
              placeholder="City"
              id="Employee_City"
              className={EmployeeInput}
            />
          </label>
          <label htmlFor="Employee_State" className={EmployeeLabel}>
            Enter State
            <input
              type="text"
              placeholder="State"
              id="Employee_State"
              className={EmployeeInput}
            />
          </label>
          <label htmlFor="Employee_Age" className={EmployeeLabel}>
            Age
            <input
              type="number"
              placeholder="Age"
              id="Employee_Age"
              className={EmployeeInput}
            />
          </label>

          <label htmlFor="Empolyee_Profession" className={EmployeeLabel}>
            Profession
            <input
              type="text"
              placeholder="Profession"
              id="Empolyee_Profession"
              className={EmployeeInput}
            />
          </label>

          <label htmlFor="Empolyee_Experience" className={EmployeeLabel}>
            Experience
            <input
              type="text"
              placeholder="Experience"
              id="Empolyee_Experience"
              className={EmployeeInput}
            />
          </label>

          <label htmlFor="Employee_Profile_Pic" className={EmployeeLabel}>
            <img src={DefaultProfilePic} className="w-[100px] h-[100px]" />
            <button className="Employee_Profile_Pic">
              Select Profile Photo
            </button>
            <input
              type="file"
              id="Employee_Profile_Pic"
              accept="image/*"
              className="hidden"
            />
          </label>

          <input
            type="submit"
            id="Employee_Form_Submit_Button"
            className="cursor-pointer bg-lightBg text-lightText border-0 px-[15px] py-[8px] rounded-[20px] text-1xl"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default EmployeeForm;
