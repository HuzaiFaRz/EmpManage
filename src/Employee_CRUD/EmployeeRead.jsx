import { FaCheck } from "react-icons/fa";
import { ThemeLightToDark } from "../Main_Components/App";
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../ConfigFiles/firebase_Config";

const EmployeeRead = () => {
  const employee = {
    employeeAddress: "ranchorline",
    employeeAge: "19",
    employeeCity: "karachi",
    employeeEmail: "furqan@gmail.com",
    employeeExperience: "2",
    employeeName: "furqan",
    employeePassword: "12345678",
    employeeProfession: "web developer",
    employeeProfile:
      "http://res.cloudinary.com/ddaor3t8o/image/upload/v1733610779/uckb5pkjoekf6zozoibw.png",
    role: "Employee",
  };
  const [employeeSelect, setEmployeeSelect] = useState(false);
  const [employees, setEmployees] = null(async () => {
    const employeeGettingQuery = collection(db, "Employees");
    const data = await getDocs(employeeGettingQuery);
    data.docs.forEach((data) => {
      console.log(data.data());
    });
  })();

  return (
    <div
      className={`Employee_Create_Page w-full h-full md:h-[90svh]  flex flex-col justify-center items-center p-2 mt-[10svh] ${ThemeLightToDark}`}
    >
      <h1 className="font-semibold tracking-tighter text-4xl w-[100%] py-2 text-center text-colorTwo dark:text-colorOne">
        Employees
      </h1>
      <ul className="flex flex-wrap justify-evenly items-center p-2 w-full">
        <div
          className={`w-[500px] rounded-sm bg-opacity-50 border-2 p-2 dark:text-colorOne text-colorTwo capitalize cursor-pointer ${
            employeeSelect
              ? "bg-gray-500"
              : "border-colorTwo  dark:border-colorOne "
          }`}
        >
          <div className="flex flex-row justify-between items-center p-3">
            <div className="flex flex-row justify-center items-center gap-3">
              <img
                src={employee?.employeeProfile}
                alt={`${employee.employeeName}'s profile`}
                className="w-20 h-20 rounded-full object-cover border-2 dark:border-colorOne border-colorTwo"
              />
              <div className="flex flex-col justify-center items-start">
                <h2 className="text-lg font-bold tracking-wide">
                  {employee.employeeName}
                </h2>
                <p className="text-sm">{employee.employeeProfession}</p>
              </div>
            </div>
            <span
              className="w-[25px] h-[25px] bg-colorTwo dark:bg-colorOne relative cursor-pointer flex justify-center items-center rounded-sm"
              onClick={() => {
                setEmployeeSelect(!employeeSelect);
              }}
            >
              {employeeSelect && (
                <FaCheck className="fill-colorOne dark:fill-colorTwo" />
              )}
            </span>
          </div>
          <ul className="flex flex-col justify-between items-start gap-5 p-3">
            <li className="lowercase">
              <span className="capitalize">Email: </span>
              {employee.employeeEmail}
            </li>
            <li className="capitalize">
              <span>Age: </span> {employee.employeeAge}
            </li>
            <li className="capitalize">
              <span>Experience: </span> {employee.employeeExperience} years
            </li>
            <li className="capitalize">
              <span>City: </span> {employee.employeeCity}
            </li>
            <li className="capitalize">
              <span>Address: </span> {employee.employeeAddress}
            </li>
          </ul>
        </div>
      </ul>
    </div>
  );
};

export default EmployeeRead;
