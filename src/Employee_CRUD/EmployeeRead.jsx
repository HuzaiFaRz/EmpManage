import { FaCheck } from "react-icons/fa";
import { ThemeLightToDark } from "../Main_Components/App";
import React, { useEffect, useReducer, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../ConfigFiles/firebase_Config";
import LoadingArrows from "../Components/LoadingArrows";

const EmployeeRead = () => {
  const [employeeSelect, setEmployeeSelect] = useState(false);
  const [employees, setEmployees] = useState();

  useEffect(() => {
    const q = query(collection(db, "Employees"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const a = querySnapshot.docs.map((data) => {
        return {
          Id: data.id,
          ...data.data(),
        };
      });
      setEmployees(a);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div
      className={`Employee_Create_Page w-full h-full md:h-[90svh]  flex flex-col justify-center items-center p-2 mt-[10svh] ${ThemeLightToDark}`}
    >
      <h1 className="font-semibold tracking-tighter text-4xl w-[100%] py-2 text-center text-colorTwo dark:text-colorOne">
        Employees
      </h1>
      <ul className="flex flex-wrap justify-evenly items-center p-2 w-full h-full list-none">
        {employees?.length === undefined ? (
          <LoadingArrows />
        ) : (
          employees?.map((data, index) => {
            const {
              Id,
              employeeAddress,
              employeeAge,
              employeeCity,
              employeeEmail,
              employeeExperience,
              employeeName,
              employeeProfession,
              employeeProfile,
              role,
            } = data;
            const { seconds, nanoseconds } = data.employeeCreatingTime;
            const employeeCreatingTimeConvert = new Date(
              seconds * 1000 + nanoseconds / 1000000
            )?.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: "true",
              year: "2-digit",
              month: "long",
              day: "2-digit",
            });
            return (
              <React.Fragment key={index}>
                <div
                  className={`w-[500px] rounded-sm bg-opacity-50 border-2 p-2 dark:text-colorOne text-colorTwo capitalize cursor-pointer ${
                    employeeSelect
                      ? "bg-gray-500"
                      : "border-colorTwo  dark:border-colorOne "
                  }`}
                  id={`${role}Card ${Id}`}
                >
                  <div className="flex flex-row justify-between items-center p-3">
                    <div className="flex flex-row justify-center items-center gap-3">
                      <img
                        src={employeeProfile}
                        alt={`${employeeName}'s profile`}
                        className="w-20 h-20 rounded-full object-cover border-2 dark:border-colorOne border-colorTwo"
                      />
                      <div className="flex flex-col justify-center items-start">
                        <h2 className="text-lg font-bold tracking-wide">
                          {employeeName}
                        </h2>
                        <p className="text-sm">{employeeProfession}</p>
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
                      {employeeEmail}
                    </li>
                    <li className="capitalize">
                      <span>Age: </span> {employeeAge}
                    </li>
                    <li className="capitalize">
                      <span>Experience: </span> {employeeExperience} years
                    </li>
                    <li className="capitalize">
                      <span>City: </span> {employeeCity}
                    </li>
                    <li className="capitalize">
                      <span>Address: </span> {employeeAddress}
                    </li>
                    <li className="capitalize">
                      <span>Apply time: </span> {employeeCreatingTimeConvert}
                    </li>
                  </ul>
                </div>
              </React.Fragment>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default EmployeeRead;
