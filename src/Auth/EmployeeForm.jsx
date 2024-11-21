import { Fragment, useState } from "react";
import AuthHeading from "./AuthHeading";
import Flatpickr from "react-flatpickr";
import { DefaultProfilePic } from "../Main_Components/App";

const EmployeeForm = () => {
  console.log(DefaultProfilePic);
  const [dateState, setDateState] = useState({
    date1: new Date(),
    date2: new Date(),
  });
  return (
    <Fragment>
      <div className="Employee_Page w-full h-screen flex flex-col justify-evenly items-center">
        <AuthHeading HeadingText={"Employee"} />
        <form className="Employee_Form">
          <label htmlFor="Employee_Profile_Pic">
            <img src={DefaultProfilePic} />
            <input type="file" id="Employee_Profile_Pic"  />
          </label>
          <label htmlFor="Employee_First_Name">
            <input
              type="text"
              placeholder="Enter First Name"
              id="Employee_First_Name"
            />
          </label>
          <label htmlFor="Employee_Last_Name">
            <input
              type="text"
              placeholder="Enter Last Name"
              id="Employee_Last_Name"
            />
          </label>
          <label htmlFor="Employee_Email">
            <input type="text" placeholder="Enter Email" id="Employee_Email" />
          </label>
          <label htmlFor="Employee_Phone_Number">
            <input
              type="number"
              placeholder="Enter Phone Number"
              id="Employee_Phone_Number"
            />
          </label>
          <label htmlFor="Employee_Address">
            <input
              type="text"
              placeholder="Enter Address"
              id="Employee_Address"
            />
          </label>
          <label htmlFor="Employee_City">
            <input type="text" placeholder="Enter City" id="Employee_City" />
          </label>
          <label htmlFor="Employee_State">
            <input type="text" placeholder="Enter State" id="Employee_State" />
          </label>
          <label htmlFor="Employee_BirthDay">
            Date of Birth
            <Flatpickr
              value={dateState.date}
              onChange={([date1]) => {
                setDateState({ date1 });
              }}
              id="Employee_BirthDay"
              placeholder="Date of Birth"
            />
          </label>
        </form>
      </div>
    </Fragment>
  );
};

export default EmployeeForm;
