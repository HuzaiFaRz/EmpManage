import { Fragment, useState } from "react";
import AuthHeading from "./AuthHeading";
import Flatpickr from "react-flatpickr";
import { DefaultProfilePic, ThemeDarkToLight } from "../Main_Components/App";
import Select from "react-select";

const EmployeeForm = () => {
  const [dateState, setDateState] = useState({
    date1: new Date(),
    date2: new Date(),
  });
  const [employeeProfessionSelect, setEmployeeProfessionSelect] =
    useState(null);

  console.log(employeeProfessionSelect);
  return (
    <Fragment>
      <div className="Employee_Page w-full h-screen flex flex-col justify-evenly items-center">
        <form
          className={`Employee_Form flex flex-wrap items-center justify-evenly gap-3 w-[1000px] h-[600px] p-2 ${ThemeDarkToLight}`}
        >
          <AuthHeading HeadingText={"Employee"} />
          <label
            htmlFor="Employee_First_Name"
            className="flex flex-col items-start justify-center gap-2"
          >
            Enter First Name
            <input
              type="text"
              placeholder="First Name"
              id="Employee_First_Name"
              className="p-2 bg-transparent border-2 border-lightBg color-lightBg font-semibold capitalize tracking-[1px] placeholder:text-lightBg focus:outline-0"
            />
          </label>
          <label
            htmlFor="Employee_Last_Name"
            className="flex flex-col items-start justify-center gap-2"
          >
            Enter Last Name
            <input
              type="text"
              placeholder="Last Name"
              id="Employee_Last_Name"
              className="p-2 bg-transparent border-2 border-lightBg color-lightBg font-semibold capitalize tracking-[1px] placeholder:text-lightBg focus:outline-0"
            />
          </label>
          <label
            htmlFor="Employee_Email"
            className="flex flex-col items-start justify-center gap-2"
          >
            Enter Email
            <input
              type="email"
              placeholder="Email"
              id="Employee_Email"
              className="p-2 bg-transparent border-2 border-lightBg color-lightBg font-semibold capitalize tracking-[1px] placeholder:text-lightBg focus:outline-0"
            />
          </label>
          <label
            htmlFor="Employee_Phone_Number"
            className="flex flex-col items-start justify-center gap-2"
          >
            Enter Phone Number
            <input
              type="number"
              placeholder="Phone Number"
              id="Employee_Phone_Number"
              className="p-2 bg-transparent border-2 border-lightBg color-lightBg font-semibold capitalize tracking-[1px] placeholder:text-lightBg focus:outline-0"
            />
          </label>

          <label
            htmlFor="Employee_Address"
            className="flex flex-col items-start justify-center gap-2"
          >
            Enter Address
            <input
              type="text"
              placeholder="Address"
              id="Employee_Address"
              className="p-2 bg-transparent border-2 border-lightBg color-lightBg font-semibold capitalize tracking-[1px] placeholder:text-lightBg focus:outline-0"
            />
          </label>
          <label
            htmlFor="Employee_City"
            className="flex flex-col items-start justify-center gap-2"
          >
            Enter City
            <input
              type="text"
              placeholder="City"
              id="Employee_City"
              className="p-2 bg-transparent border-2 border-lightBg color-lightBg font-semibold capitalize tracking-[1px] placeholder:text-lightBg focus:outline-0"
            />
          </label>
          <label
            htmlFor="Employee_State"
            className="flex flex-col items-start justify-center gap-2"
          >
            Enter State
            <input
              type="text"
              placeholder="State"
              id="Employee_State"
              className="p-2 bg-transparent border-2 border-lightBg color-lightBg font-semibold capitalize tracking-[1px] placeholder:text-lightBg focus:outline-0"
            />
          </label>
          <label
            htmlFor="Employee_BirthDay"
            className="flex flex-col items-start justify-center gap-2"
          >
            Date of Birth
            <Flatpickr
              value={dateState.date}
              onChange={([date1]) => {
                setDateState({ date1 });
              }}
              id="Employee_BirthDay"
              placeholder="Date of Birth"
              className="p-2 bg-transparent border-2 border-lightBg color-lightBg font-semibold capitalize tracking-[1px] placeholder:text-lightBg focus:outline-0"
            />
          </label>

          <div className="flex flex-col justify-center items-center">
            <label
              htmlFor="Empolyee_Profession"
              className="flex flex-col items-start justify-center gap-2"
            >
              Profession
              <Select
                isSearchable={false}
                isClearable={true}
                id="Empolyee_Profession"
                defaultValue={null}
                onChange={setEmployeeProfessionSelect}
                options={[
                  { value: "Web Developer", label: "Web Developer" },
                  { value: "App Developer", label: "App Developer" },
                  { value: "Graphic Designer", label: "Graphic Designer" },
                  { value: "Content Writer", label: "Content Writer" },
                ]}
              />
            </label>
            <label
              htmlFor="Empolyee_Profession"
              className="flex flex-col items-start justify-center gap-2"
            >
              Experience
              <Select
                isSearchable={false}
                isClearable={true}
                id="Empolyee_Profession"
                defaultValue={null}
                onChange={setEmployeeProfessionSelect}
                options={[
                  { value: "Junior", label: "Junior" },
                  { value: "Senior", label: "Senior" },
                ]}
              />
            </label>
          </div>

          <label
            htmlFor="Employee_Profile_Pic"
            className="flex flex-col items-start justify-center gap-2"
          >
            <img src={DefaultProfilePic} className="w-[100px] h-[100px]" />
            <input
              type="file"
              id="Employee_Profile_Pic"
              accept=".png .jpg .jpeg .webp"
            />
          </label>
        </form>
      </div>
    </Fragment>
  );
};

export default EmployeeForm;
