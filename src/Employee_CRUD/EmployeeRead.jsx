import { FaCheck } from "react-icons/fa";
import { ThemeDarkToLight, ThemeLightToDark } from "../Main_Components/App";
import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  disableNetwork,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../ConfigFiles/firebase_Config";
import LoadingArrows from "../Components/LoadingArrows";
import { useRef } from "react";
import { CgClose } from "react-icons/cg";
import { IoIosWarning } from "react-icons/io";
import LoadingSpinner from "../Components/LoadingSpinner";

const EmployeeRead = () => {
  const [employeeSelectID, setEmployeeSelectID] = useState([]);
  const [employees, setEmployees] = useState();
  const [employeeSearchInput, setEmployeeSearchInput] = useState("");
  const employeeCardRef = useRef([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollCount, setScrollCount] = useState(3);
  const [employeeLoading, setEmployeeLoading] = useState(false);

  useEffect(() => {
    isModalOpen
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "scroll");

    const employeeScrollHandler = () => {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight
      ) {
        setScrollCount((prevSetScrollCount) => prevSetScrollCount + 1);
        return;
      }
    };
    document.addEventListener("scroll", employeeScrollHandler);
    return () => document.removeEventListener("scroll", employeeScrollHandler);
  }, [isModalOpen, scrollCount]);

  useEffect(() => {
    setEmployeeLoading(true);
    const q = query(
      collection(db, "Employees"),
      orderBy("employeeCreatingTime", "asc"),
      limit(scrollCount)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const realTimeEmployee = querySnapshot.docs.map((data) => {
        return {
          Id: data.id,
          ...data.data(),
        };
      });
      setEmployees(realTimeEmployee);
      setEmployeeLoading(false);
    });

    return () => unsubscribe();
  }, [scrollCount]);

  const employeeSelectHandler = (Id) => {
    setEmployeeSelectID((prevSetEmployeeSelectId) =>
      prevSetEmployeeSelectId?.includes(Id)
        ? prevSetEmployeeSelectId.filter((existingId) => existingId !== Id)
        : [...prevSetEmployeeSelectId, Id]
    );
  };

  const employeeAllSelectHandler = () => {
    if (employeeSelectID.length === employees?.length) {
      setEmployeeSelectID([]);
    } else {
      setEmployeeSelectID(employees.map((data) => data.Id));
    }
  };

  const employeeSearchHandler = (event) => {
    const employeeSearchInput = event.target.value
      .toLowerCase()
      .replaceAll(" ", "");
    setEmployeeSearchInput(employeeSearchInput);
    employees?.forEach((data, index) => {
      const employeeName = data?.employeeName
        ?.toLowerCase()
        .replaceAll(" ", "");
      if (employeeCardRef.current[index]) {
        const cardElement = employeeCardRef.current[index];
        if (employeeName.includes(employeeSearchInput)) {
          cardElement.style.display = "block";
        } else {
          cardElement.style.display = "none";
        }
      }
    });
  };

  const employeeDeleteHandler = async () => {
    console.log(employeeSelectID);
    try {
      const docRef = doc(db, "Todos", employeeSelectID);
      await deleteDoc(docRef);
      console.log(this);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`Employee_Read_Page w-full h-full md:h-full  flex flex-col justify-center items-center p-2 mt-[10svh] ${ThemeLightToDark}`}
    >
      <div className="Employee_Header flex flex-wrap w-full p-2  justify-evenly items-center gap-5">
        <h1 className="font-semibold tracking-tighter text-4xl py-2 text-center text-colorTwo dark:text-colorOne w-full">
          Employees
        </h1>

        <div className="flex flex-wrap justify-evenly items-center w-full p-5 gap-5">
          <input
            type="text"
            id="employeeSearch"
            className="p-2 bg-transparent border border-colorTwo dark:border-colorOne color-colorTwo font-light tracking-[1px] placeholder:text-colorTwo dark:placeholder:text-colorOne focus:outline-0 w-[300px]"
            placeholder="Search Employee By Name"
            value={employeeSearchInput}
            onChange={employeeSearchHandler}
          />
          <button
            className={`${ThemeDarkToLight} cursor-pointer border-0 relative px-[15px] py-[8px] text-[15px] flex hover:rounded-xl transition-all justify-center items-center gap-5`}
          >
            {employeeSelectID.length === employees?.length
              ? "UnSelect All"
              : "Select All"}
            <input
              type="checkbox"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              onChange={() => {
                employeeAllSelectHandler();
              }}
            />
            <p>{employeeSelectID.length}</p>
          </button>
          <button
            className="bg-[#a63232] text-colorOne cursor-pointer border-0 relative px-[15px] py-[8px] text-[15px] flex flex-row hover:rounded-xl transition-all justify-center items-center gap-1"
            disabled={employeeSelectID.length === 0 && true}
            onClick={() => {
              employeeSelectID.length === 0 || setIsModalOpen(true);
              console.log(isModalOpen);
            }}
          >
            <IoIosWarning /> Delete
          </button>
        </div>
      </div>

      <div
        className={`modal w-full h-[100svh] z-[80] fixed top-0 left-0 bg-colorTwo bg-opacity-50 ${
          isModalOpen ? "flex" : "hidden"
        } justify-center items-center`}
        onClick={() => {
          setIsModalOpen(false);
          console.log(this);
        }}
      >
        {" "}
      </div>
      <div
        className={`${ThemeLightToDark} w-full sm:w-[600px] h-[300px] rounded-sm cursor-pointer z-[100] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col justify-between items-start ${
          isModalOpen ? "flex" : "hidden"
        }`}
      >
        <div className="modal-header flex flex-row justify-between items-center p-2 w-full">
          <div></div>
          <CgClose
            size={25}
            onClick={() => {
              setIsModalOpen(false);
            }}
          />
        </div>
        <div className="modal-body">
          <span className="text-lg text-colorTwo dark:text-colorOne font-bold p-5">
            Do you Really Want to Delete {employeeSelectID.length} Employees
          </span>
        </div>
        <div className="modal-footer flex flex-row justify-evenly gap-5 items-center p-2 mb-5 w-full">
          <button
            className="bg-[#5cb85c] text-colorOne cursor-pointer border-0 px-[15px] py-[8px] text-[15px] hover:rounded-xl transition-all"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            Cancle
          </button>
          <button
            className="bg-[#a63232] text-colorOne cursor-pointer border-0 relative px-[15px] py-[8px] text-[15px] flex hover:rounded-xl transition-all justify-center items-center gap-2"
            disabled={employeeSelectID.length === 0 && true}
            onClick={() => {
              employeeDeleteHandler();
            }}
          >
            <IoIosWarning /> Delete
          </button>
        </div>
      </div>

      <ul className="flex flex-wrap justify-evenly items-center p-2 w-full h-full min-h-[70svh] list-none gap-y-12 mt-5 gap-6">
        <>
          {!employees ? (
            <LoadingArrows />
          ) : employees?.length === 0 ? (
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
                    className={`w-full sm:w-[400px] rounded-sm bg-opacity-50 border-2 p-2 dark:text-colorOne text-colorTwo capitalize cursor-pointer ${
                      employeeSelectID.includes(Id)
                        ? "bg-gray-500"
                        : "border-colorTwo dark:border-colorOne"
                    }`}
                    id={`${role} Card ${Id}`}
                    ref={(el) => {
                      employeeCardRef.current.push(el);
                    }}
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
                        className="w-[25px] h-[25px] relative bg-colorTwo dark:bg-colorOne cursor-pointer flex justify-center items-center rounded-sm"
                        id={`${Id}`}
                      >
                        {employeeSelectID.includes(Id) && (
                          <FaCheck className="fill-colorOne dark:fill-colorTwo" />
                        )}
                        <input
                          type="checkbox"
                          className="absolute w-full h-full opacity-0 cursor-pointer"
                          onChange={() => {
                            employeeSelectHandler(Id);
                          }}
                        />
                      </span>
                    </div>
                    <ul className="flex flex-col justify-between items-start gap-5 p-3">
                      <li className="capitalize flex flex-row justify-start items-center gap-1">
                        <span className="capitalize font-bold text-lg">
                          Email:{" "}
                        </span>
                        <p> {employeeEmail}</p>
                      </li>
                      <li className="capitalize flex flex-row justify-start items-center gap-1">
                        <span className="font-bold text-lg">Age: </span>{" "}
                        <p> {employeeAge}</p>
                      </li>
                      <li className="capitalize flex flex-row justify-start items-center gap-1">
                        <span className="font-bold text-lg">Experience: </span>{" "}
                        <p> {employeeExperience >= 5 ? "Senior" : "Junior"}</p>
                      </li>
                      <li className="capitalize flex flex-row justify-start items-center gap-1">
                        <span className="font-bold text-lg">City: </span>{" "}
                        <p> {employeeCity}</p>
                      </li>
                      <li className="capitalize flex flex-row justify-start items-center gap-1">
                        <span className="font-bold text-lg">Address: </span>{" "}
                        <p> {employeeAddress}</p>
                      </li>
                      <li className="capitalize flex flex-row justify-start items-center gap-1">
                        <span className="font-bold text-lg">Apply time: </span>{" "}
                        <p> {employeeCreatingTimeConvert}</p>
                      </li>
                    </ul>
                  </div>
                </React.Fragment>
              );
            })
          )}


          
          {employeeLoading && <LoadingSpinner />}
        </>
      </ul>
    </div>
  );
};

export default EmployeeRead;
