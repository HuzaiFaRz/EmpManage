import { FaCheck } from "react-icons/fa";
import { ThemeLightToDark } from "../Main_Components/App";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../ConfigFiles/firebase_Config";
import LoadingArrows from "../Components/LoadingArrows";
import { useRef } from "react";

const EmployeeRead = () => {
  const [employeeSelect, setEmployeeSelect] = useState({
    isEmployeeSelectId: [],
  });
  const [employees, setEmployees] = useState();
  const [employeeSearch, setEmployeeSearch] = useState()
  const employeeNameRef = useRef([null]);
  const employeeNamePushing = (element) => {
    employeeNameRef.current.push(element);
  };

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

  useEffect(() => {
    if (employeeNameRef.current) {
      employeeNameRef.current.forEach((data) => {
        console.log(data);
      });
    }
  }, [employeeNameRef,employeeSearch]);



  if (!employees) {
    return <LoadingArrows />;
  }
  const employeeSelectHandler = (Id) => {
    setEmployeeSelect((prevSetEmployeeSelect) => ({
      ...prevSetEmployeeSelect,
      isEmployeeSelectId: prevSetEmployeeSelect.isEmployeeSelectId.includes(Id)
        ? prevSetEmployeeSelect.isEmployeeSelectId.filter(
          (existingId) => existingId !== Id
        )
        : [...prevSetEmployeeSelect.isEmployeeSelectId, Id],
    }));
  };


  //   const employeeSearchHandler = (value) => {
  //   setEmployeeSearch(value.target.value);
  //   // const employeeInput = value.target.value.toLowerCase().replaceAll(" ", "");
  //   // const employeeNameElements = employeeNameRef?.current?.children;
  //   // console.log(employeeNameRef?.current ?)
  //   // if (!employeeNameElements) return;
  //   // Array.from(employeeNameElements).forEach((element, index) => {
  //   //   console.log(element)
  //   //   // const userName = employeeCardRef[index].allUserDATA.signUpName
  //   //   //   .toLowerCase()
  //   //   //   .replaceAll(" ", "");

  //   //   // if (userName.includes(employeeInput)) {
  //   //   //   element.style.display = "flex";
  //   //   // } else {
  //   //   //   element.style.display = "none";
  //   //   // }
  //   // });

  // }



  return (
    <div
      className={`Employee_Read_Page w-full h-full md:h-full  flex flex-col justify-center items-center p-2 mt-[10svh] ${ThemeLightToDark}`}
    >
      <div className="Employee_Header flex w-full p-2 flex-wrap justify-evenly items-center">
        <input
          type="text"
          id="employeeSearch"
          className="
        p-2 bg-transparent border border-colorTwo dark:border-colorOne color-colorTwo font-light tracking-[1px] placeholder:text-colorTwo dark:placeholder:text-colorOne focus:outline-0 w-[300px] 
        "
          placeholder="Search Employee By Name"
          onChange={(value) => {
            setEmployeeSearch(value.target.value)
          }}
        />

        <h1 className="font-semibold tracking-tighter text-4xl py-2 text-center text-colorTwo dark:text-colorOne">
          Employees
        </h1>
      </div>
      <ul className="flex flex-wrap justify-evenly items-center p-2 w-full h-full min-h-[500px] list-none gap-y-12 mt-5 gap-6">
        <>
          {employees?.length === 0 ? (
            <h1 className="text-xl text-colorTwo dark:text-colorOne">
              No Employee Found
            </h1>
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
                    className={`w-full sm:w-[400px] rounded-sm bg-opacity-50 border-2 p-2 dark:text-colorOne text-colorTwo capitalize cursor-pointer ${employeeSelect.isEmployeeSelectId.includes(Id)
                      ? "bg-gray-500"
                      : "border-colorTwo dark:border-colorOne"
                      }`}
                    id={`${role} Card ${Id}`}
                  >
                    <div className="flex flex-row justify-between items-center p-3">
                      <div className="flex flex-row justify-center items-center gap-3">
                        <img
                          src={employeeProfile}
                          alt={`${employeeName}'s profile`}
                          className="w-20 h-20 rounded-full object-cover border-2 dark:border-colorOne border-colorTwo"
                        />
                        <div className="flex flex-col justify-center items-start">
                          <h2 className="text-lg font-bold tracking-wide" ref={employeeNamePushing}>
                            {employeeName}
                          </h2>
                          <p className="text-sm">{employeeProfession}</p>
                        </div>
                      </div>
                      <span
                        className="w-[25px] h-[25px] bg-colorTwo dark:bg-colorOne relative cursor-pointer flex justify-center items-center rounded-sm"
                        id={`${Id}`}
                        onClick={() => {
                          employeeSelectHandler(Id);
                        }}
                      >
                        {employeeSelect.isEmployeeSelectId.includes(Id) && (
                          <FaCheck className="fill-colorOne dark:fill-colorTwo" />
                        )}
                      </span>
                    </div>
                    <ul className="flex flex-col justify-between items-start gap-5 p-3">
                      <li
                        className="capitalize flex flex-row justify-start items-center gap-1"
                      >
                        <span className="capitalize font-bold text-lg">
                          Email:{" "}
                        </span>
                        <p> {employeeEmail}</p>
                      </li>
                      <li
                        className="capitalize flex flex-row justify-start items-center gap-1"
                      >
                        <span className="font-bold text-lg">Age: </span>{" "}
                        <p> {employeeAge}</p>
                      </li>
                      <li
                        className="capitalize flex flex-row justify-start items-center gap-1"
                      >
                        <span className="font-bold text-lg">Experience: </span>{" "}
                        <p> {employeeExperience >= 5 ? "Senior" : "Junior"}</p>
                      </li>
                      <li
                        className="capitalize flex flex-row justify-start items-center gap-1"
                      >
                        <span className="font-bold text-lg">City: </span>{" "}
                        <p> {employeeCity}</p>
                      </li>
                      <li
                        className="capitalize flex flex-row justify-start items-center gap-1"
                      >
                        <span className="font-bold text-lg">Address: </span>{" "}
                        <p> {employeeAddress}</p>
                      </li>
                      <li
                        className="capitalize flex flex-row justify-start items-center gap-1"
                      >
                        <span className="font-bold text-lg">Apply time: </span>{" "}
                        <p> {employeeCreatingTimeConvert}</p>
                      </li>
                    </ul>
                  </div>
                </React.Fragment>
              );
            })
          )}
        </>
      </ul>
    </div>
  );


};

export default EmployeeRead;
