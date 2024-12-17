import { FaCheck } from "react-icons/fa";
import {
  resolveMessage,
  ThemeDarkToLight,
  ThemeLightToDark,
} from "../Script/index";
import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../ConfigFiles/firebase_Config";
import LoadingArrows from "../Components/Loading_Arrows";
import { useRef } from "react";
import { CgClose } from "react-icons/cg";
import { IoIosWarning } from "react-icons/io";
import LoadingSpinner from "../Components/Loading_Spinner";
import { rejectMessage } from "../Script";
import { ClipLoader } from "react-spinners";
import { AuthUseContext } from "../Utilities/Auth_Provider";
import { replace, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";

const Employees = () => {
  const [employeeSelectID, setEmployeeSelectID] = useState([]);
  const [employees, setEmployees] = useState();
  const [employeeSearchInput, setEmployeeSearchInput] = useState("");
  const employeeCardRef = useRef([]);
  const employeeNameRef = useRef([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState({
    editModalOpen: false,
    employeeID: null,
  });
  const [scrollCount, setScrollCount] = useState(3);
  const [employeeLoading, setEmployeeLoading] = useState(false);
  const [employeeDeleteLoading, setEmployeeDeleteLoading] = useState(false);
  const { setEditEmployeeId } = AuthUseContext();
  const navigate = useNavigate();

  useEffect(() => {
    isDeleteModalOpen
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
  }, [employees, isDeleteModalOpen]);

  useEffect(() => {
    setEmployeeLoading(true);
    const employeessCollection = query(
      collection(db, "Employees"),
      orderBy("employeeAddingTime", "asc"),
      limit(scrollCount)
    );
    const unsubscribe = onSnapshot(employeessCollection, (querySnapshot) => {
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
    employeeNameRef.current.forEach((data, index) => {
      if (employeeCardRef.current[index]) {
        const employeeCardElement = employeeCardRef.current[index];
        if (data?.textContent.includes(employeeSearchInput)) {
          employeeCardElement.style.transition =
            "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
          employeeCardElement.style.opacity = "1";
          employeeCardElement.style.width = "400px";
          employeeCardElement.style.height = "auto";
          employeeCardElement.style.overflow = "auto";
          employeeCardElement.style.visibility = "visible";
        } else {
          employeeCardElement.style.visibility = "hidden";
          employeeCardElement.style.opacity = "0";
          employeeCardElement.style.width = "0";
          employeeCardElement.style.height = "0";
          employeeCardElement.style.overflow = "hidden";
          employeeCardElement.style.appearance = "none";
          employeeCardElement.style.transition =
            "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
        }
      }
    });
  };

  const employeeDeleteHandler = async () => {
    try {
      employeeSelectID.forEach(async (data) => {
        const docRef = doc(db, "Employees", data);
        setEmployeeDeleteLoading(true);
        await deleteDoc(docRef);
      });
      setEmployeeDeleteLoading(false);
      setEmployeeSelectID([]);
      setIsDeleteModalOpen(false);
      resolveMessage("Employee Deleted");
    } catch (error) {
      console.log(error);
      setEmployeeDeleteLoading(false);
      setEmployeeSelectID([]);
      setIsDeleteModalOpen(false);
      rejectMessage(error.message);
    }
  };

  const employeeEditHandler = () => {
    setEditEmployeeId(isEditModalOpen.employeeID);
    navigate("/employee_edit");
  };

  return (
    <div
      className={`Employee_Read_Page w-full h-full md:h-full flex flex-col justify-center items-center p-2 mt-[10svh] ${ThemeLightToDark}`}
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
            onChange={(event) => {
              employeeSearchHandler(event);
            }}
          />
          <button
            className={`${ThemeDarkToLight} cursor-pointer border-0 relative px-3 py-2 sm:px-6 text-[13px] sm:text-[15px] flex hover:rounded-xl transition-all justify-center items-center gap-5`}
            disabled={
              employeeSelectID.length === 0 && employees?.length === 0 && true
            }
          >
            {" "}
            <p>
              {employeeSelectID.length}

              {employeeSelectID.length === employees?.length
                ? " UnSelect all"
                : " Select all"}
            </p>
            {/* {employees?.length === 0
              ? "Selected"
              :  */}
            <input
              type="checkbox"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              onChange={() => {
                employeeAllSelectHandler();
              }}
            />
          </button>
          <button
            className="bg-[#a63232] text-colorOne cursor-pointer border-0 relative text-[13px] sm:text-[15px] flex flex-row hover:rounded-xl transition-all justify-center items-center gap-1 px-3 py-2 sm:px-6"
            disabled={
              employeeSelectID.length === 0 && employees?.length === 0 && true
            }
            onClick={() => {
              employeeSelectID.length === 0 || setIsDeleteModalOpen(true);
            }}
          >
            <IoIosWarning /> Delete
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      {/* Delete Modal */}
      {/* Delete Modal */}
      {/* Delete Modal */}

      <div
        className={`modal w-full h-[100svh] z-[80] fixed top-0 left-0 bg-colorTwo backdrop-blur-lg bg-opacity-50 ${
          isDeleteModalOpen ? "flex" : "hidden"
        } justify-center items-center`}
        onClick={() => {
          setIsDeleteModalOpen(false);
        }}
      >
        {" "}
      </div>

      <div
        className={`${ThemeDarkToLight} w-full sm:w-[600px] h-[300px] rounded-sm cursor-pointer z-[100] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col justify-between items-center ${
          isDeleteModalOpen ? "flex" : "hidden"
        }`}
      >
        <div className="modal-header flex flex-row justify-between items-center p-2 w-full">
          <div></div>
          <CgClose
            size={25}
            onClick={() => {
              setIsDeleteModalOpen(false);
            }}
          />
        </div>
        <div className="modal-body w-full flex text-center justify-center items-center">
          <span className="text-sm sm:text-lg font-bold p-5">
            Are you sure you want to delete {employeeSelectID.length} selected
            employees?
          </span>
        </div>
        <div className="modal-footer flex flex-row justify-evenly gap-5 items-center p-2 mb-5 w-full">
          <button
            className="bg-[#5cb85c] text-colorOne cursor-pointer border-0 px-[15px] py-[8px] text-[13px] sm:text-[15px] hover:rounded-xl transition-all"
            onClick={() => {
              setIsDeleteModalOpen(false);
            }}
          >
            Cancle
          </button>
          <button
            className="bg-[#a63232] text-colorOne cursor-pointer border-0 relative px-[15px] py-[8px] text-[13px] sm:text-[15px] flex hover:rounded-xl transition-all justify-center items-center gap-2"
            disabled={
              employeeSelectID.length === 0 && employees?.length === 0 && true
            }
            onClick={employeeDeleteHandler}
          >
            {employeeDeleteLoading ? (
              <ClipLoader color="white" size={20} />
            ) : (
              <IoIosWarning size={20} />
            )}{" "}
            Delete
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      {/* Delete Modal */}
      {/* Delete Modal */}
      {/* Delete Modal */}

      {/* Edit Modal */}
      {/* Edit Modal */}
      {/* Edit Modal */}
      {/* Edit Modal */}

      <div
        className={`modal w-full h-[100svh] z-[80] fixed top-0 left-0 bg-colorTwo backdrop-blur-lg bg-opacity-50 ${
          isEditModalOpen.editModalOpen ? "flex" : "hidden"
        } justify-center items-center`}
        onClick={() => {
          setIsEditModalOpen({
            editModalOpen: false,
            employeeID: null,
          });
        }}
      >
        {" "}
      </div>

      <div
        className={`${ThemeDarkToLight} w-full sm:w-[600px] h-[300px] rounded-sm cursor-pointer z-[100] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col justify-between items-center ${
          isEditModalOpen.editModalOpen ? "flex" : "hidden"
        }`}
      >
        <div className="modal-header flex flex-row justify-between items-center p-2 w-full">
          <div></div>
          <CgClose
            size={25}
            onClick={() => {
              setIsEditModalOpen({
                editModalOpen: false,
                employeeID: null,
              });
            }}
          />
        </div>
        <div className="modal-body w-full flex text-center justify-center items-center">
          <span className="text-sm sm:text-lg font-bold p-5">
            Are you sure you want to Edit a employee?
          </span>
        </div>
        <div className="modal-footer flex flex-row justify-evenly gap-5 items-center p-2 mb-5 w-full">
          <button
            className="bg-[#5cb85c] text-colorOne cursor-pointer border-0 px-[15px] py-[8px] text-[13px] sm:text-[15px] hover:rounded-xl transition-all"
            onClick={() => {
              setIsEditModalOpen({
                editModalOpen: false,
                employeeID: null,
              });
            }}
          >
            Cancle
          </button>
          <button
            className="bg-[#32a662] text-colorOne cursor-pointer border-0 relative px-[15px] py-[8px] text-[13px] sm:text-[15px] flex hover:rounded-xl transition-all justify-center items-center gap-2"
            disabled={
              employeeSelectID.length === 0 && employees?.length === 0 && true
            }
            onClick={employeeEditHandler}
          >
            {employeeDeleteLoading ? (
              <ClipLoader color="white" size={20} />
            ) : (
              <MdEdit size={20} />
            )}{" "}
            Edit
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {/* Edit Modal */}
      {/* Edit Modal */}
      {/* Edit Modal */}

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
              const { seconds, nanoseconds } = data.employeeAddingTime;
              const employeeAddingTimeConvert = new Date(
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
                          className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover border-2 dark:border-colorOne border-colorTwo"
                        />
                        <div className="flex flex-col justify-center items-start">
                          <h2
                            className="text-lg font-bold tracking-wide"
                            ref={(el) => {
                              employeeNameRef.current.push(el);
                            }}
                          >
                            {employeeName}
                          </h2>
                          <p className="text-sm">{employeeProfession}</p>
                        </div>
                      </div>

                      <button
                        className="bg-[#32a655] text-colorOne cursor-pointer border-0 relative px-[15px] py-[5px] text-[13px] sm:text-[15px] flex hover:rounded-xl transition-all justify-center items-center gap-2"
                        onClick={() => {
                          setIsEditModalOpen({
                            editModalOpen: true,
                            employeeID: Id,
                          });
                        }}
                      >
                        <MdEdit /> Edit
                      </button>

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
                        <span className="capitalize font-bold text-sm sm:text-lg">
                          Email:{" "}
                        </span>
                        <p className="lowercase"> {employeeEmail}</p>
                      </li>
                      <li className="capitalize flex flex-row justify-start items-center gap-1">
                        <span className="font-bold text-sm sm:text-lg">
                          Age:{" "}
                        </span>{" "}
                        <p> {employeeAge}</p>
                      </li>
                      <li className="capitalize flex flex-row justify-start items-center gap-1">
                        <span className="font-bold text-sm sm:text-lg">
                          Experience:{" "}
                        </span>{" "}
                        <p> {employeeExperience >= 5 ? "Senior" : "Junior"}</p>
                      </li>
                      <li className="capitalize flex flex-row justify-start items-center gap-1">
                        <span className="font-bold text-sm sm:text-lg">
                          City:{" "}
                        </span>{" "}
                        <p> {employeeCity}</p>
                      </li>
                      <li className="capitalize flex flex-row justify-start items-center gap-1">
                        <span className="font-bold text-sm sm:text-lg">
                          Address:{" "}
                        </span>{" "}
                        <p> {employeeAddress}</p>
                      </li>
                      <li className="capitalize flex flex-row justify-start items-center gap-1">
                        <span className="font-bold text-sm sm:text-lg">
                          Apply time:{" "}
                        </span>{" "}
                        <p> {employeeAddingTimeConvert}</p>
                      </li>
                    </ul>

                    {data?.employeeEdited && (
                      <div className="w-full flex justify-end p-4">Edited</div>
                    )}
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

export default Employees;
