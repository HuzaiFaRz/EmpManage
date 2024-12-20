import { FaCheck } from "react-icons/fa";
import {
  resolveMessage,
  ThemeDarkToLight,
  ThemeLightToDark,
} from "../../Script/index";
import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../ConfigFiles/firebase_Config";
import LoadingArrows from "../../Loading/Loading_Arrows";
import { useRef } from "react";
import { CgClose } from "react-icons/cg";
import { IoIosWarning } from "react-icons/io";
import LoadingSpinner from "../../Loading/Loading_Spinner";
import { rejectMessage } from "../../Script/index";
import { ClipLoader } from "react-spinners";

const Users = () => {
  const [userSelectID, setUserSelectID] = useState([]);
  const [users, setUsers] = useState();
  const [userSearchInput, setUserSearchInput] = useState("");
  const userCardRef = useRef([]);
  const userNameRef = useRef([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [scrollCount, setScrollCount] = useState(3);
  const [userLoading, setUserLoading] = useState(false);
  const [userDeleteLoading, setUserDeleteLoading] = useState(false);

  useEffect(() => {
    document.title = "EmpManage | | Users";
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
  }, [users, isDeleteModalOpen]);

  useEffect(() => {
    setUserLoading(true);
    const employeessCollection = query(
      collection(db, "Users"),
      orderBy("signUpAddingTime", "asc"),
      limit(scrollCount)
    );
    const unsubscribe = onSnapshot(employeessCollection, (querySnapshot) => {
      const realTimeEmployee = querySnapshot.docs.map((data) => {
        return {
          Id: data.id,
          ...data.data(),
        };
      });
      setUsers(realTimeEmployee);
      setUserLoading(false);
    });

    return () => unsubscribe();
  }, [scrollCount]);

  const userSelectHandler = (Id) => {
    setUserSelectID((prevSetUserSelectId) =>
      prevSetUserSelectId?.includes(Id)
        ? prevSetUserSelectId.filter((existingId) => existingId !== Id)
        : [...prevSetUserSelectId, Id]
    );
  };

  const userAllSelectHandler = () => {
    if (userSelectID.length === users?.length) {
      setUserSelectID([]);
    } else {
      setUserSelectID(users.map((data) => data.Id));
    }
  };

  const userSearchHandler = (event) => {
    const employeeSearchInput = event.target.value
      .toLowerCase()
      .replaceAll(" ", "");
    setUserSearchInput(employeeSearchInput);
    userNameRef.current.forEach((data, index) => {
      if (userCardRef.current[index]) {
        const userCardElement = userCardRef.current[index];
        if (data?.textContent.includes(employeeSearchInput)) {
          userCardElement.style.transition =
            "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
          userCardElement.style.opacity = "1";
          userCardElement.style.width = "400px";
          userCardElement.style.height = "auto";
          userCardElement.style.overflow = "auto";
          userCardElement.style.visibility = "visible";
        } else {
          userCardElement.style.visibility = "hidden";
          userCardElement.style.opacity = "0";
          userCardElement.style.width = "0";
          userCardElement.style.height = "0";
          userCardElement.style.overflow = "hidden";
          userCardElement.style.appearance = "none";
          userCardElement.style.transition =
            "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
        }
      }
    });
  };

  const userDeleteHandler = async () => {
    try {
      userSelectID.forEach(async (data) => {
        const docRef = doc(db, "Employees", data);
        setUserDeleteLoading(true);
        await deleteDoc(docRef);
      });
      setUserDeleteLoading(false);
      setUserSelectID([]);
      setIsDeleteModalOpen(false);
      resolveMessage("Employee Deleted");
    } catch (error) {
      console.log(error);
      setUserDeleteLoading(false);
      setUserSelectID([]);
      setIsDeleteModalOpen(false);
      rejectMessage(error.message);
    }
  };

  return (
    <div
      className={`User_Read_Page w-full h-full md:h-full flex flex-col justify-center items-center p-2 mt-[10svh] ${ThemeLightToDark}`}
    >
      <div className="User_Header flex flex-wrap w-full p-2  justify-evenly items-center gap-5">
        <h1 className="font-semibold tracking-tighter text-4xl py-2 text-center text-colorTwo dark:text-colorOne w-full">
          Employees
        </h1>

        <div className="flex flex-wrap justify-evenly items-center w-full p-5 gap-5">
          <input
            type="text"
            id="employeeSearch"
            className="p-2 bg-transparent border border-colorTwo dark:border-colorOne color-colorTwo font-light tracking-[1px] placeholder:text-colorTwo dark:placeholder:text-colorOne focus:outline-0 w-[300px]"
            placeholder="Search Employee By Name"
            value={userSearchInput}
            onChange={(event) => {
              userSearchHandler(event);
            }}
          />
          <button
            className={`${ThemeDarkToLight} cursor-pointer border-0 relative px-3 py-2 sm:px-6 text-[13px] sm:text-[15px] flex hover:rounded-xl transition-all justify-center items-center gap-5`}
            disabled={userSelectID.length === 0 && users?.length === 0 && true}
          >
            {" "}
            <p>
              {userSelectID.length}

              {userSelectID.length === users?.length
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
                userAllSelectHandler();
              }}
            />
          </button>
          <button
            className="bg-[#a63232] text-colorOne cursor-pointer border-0 relative text-[13px] sm:text-[15px] flex flex-row hover:rounded-xl transition-all justify-center items-center gap-1 px-3 py-2 sm:px-6"
            disabled={userSelectID.length === 0 && users?.length === 0 && true}
            onClick={() => {
              userSelectID.length === 0 || setIsDeleteModalOpen(true);
            }}
          >
            <IoIosWarning /> Delete
          </button>
        </div>
      </div>

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
        className={`${ThemeDarkToLight} w-full sm:w-[600px] h-[200px] rounded-sm cursor-pointer z-[100] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col justify-between items-center ${
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
            Are you sure you want to delete {userSelectID.length} selected User?
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
            disabled={userSelectID.length === 0 && users?.length === 0 && true}
            onClick={userDeleteHandler}
          >
            {userDeleteLoading ? (
              <ClipLoader color="white" size={20} />
            ) : (
              <IoIosWarning size={20} />
            )}{" "}
            Delete
          </button>
        </div>
      </div>

      <ul className="flex flex-wrap justify-evenly items-center p-2 w-full h-full min-h-[70svh] list-none gap-y-12 mt-5 gap-6">
        <>
          {!users ? (
            <LoadingArrows />
          ) : users?.length === 0 ? (
            <h1 className="text-xl text-colorTwo dark:text-colorOne">
              No User Found
            </h1>
          ) : (
            users?.map((data, index) => {
              const { signUpEmail, signUpName, signUpProfile, Id } = data;
              const { seconds, nanoseconds } = data.signUpAddingTime;
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
                      userSelectID.includes(Id)
                        ? "bg-gray-500"
                        : "border-colorTwo dark:border-colorOne"
                    }`}
                    id={`Card ${Id}`}
                    ref={(el) => {
                      userCardRef.current.push(el);
                    }}
                  >
                    <div className="flex flex-row justify-between items-center p-3">
                      <div className="flex flex-row justify-center items-center gap-3">
                        <img
                          src={signUpProfile}
                          alt={`${signUpName}'s profile`}
                          className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover border-2 dark:border-colorOne border-colorTwo"
                        />
                        <div className="flex flex-col justify-center items-start">
                          <h2
                            className="text-lg font-bold tracking-wide"
                            ref={(el) => {
                              userNameRef.current.push(el);
                            }}
                          >
                            {signUpName}
                          </h2>
                        </div>
                      </div>

                      <span
                        className="w-[25px] h-[25px] relative bg-colorTwo dark:bg-colorOne cursor-pointer flex justify-center items-center rounded-sm"
                        id={`${Id}`}
                      >
                        {userSelectID.includes(Id) && (
                          <FaCheck className="fill-colorOne dark:fill-colorTwo" />
                        )}
                        <input
                          type="checkbox"
                          className="absolute w-full h-full opacity-0 cursor-pointer"
                          onChange={() => {
                            userSelectHandler(Id);
                          }}
                        />
                      </span>
                    </div>
                    <ul className="flex flex-col justify-between items-start gap-5 p-3">
                      <li className="capitalize flex flex-row justify-start items-center gap-1">
                        <span className="capitalize font-bold text-sm sm:text-lg">
                          Email:{" "}
                        </span>
                        <p className="lowercase"> {signUpEmail}</p>
                      </li>

                      <li className="capitalize flex flex-row justify-start items-center gap-1">
                        <span className="font-bold text-sm sm:text-lg">
                          Apply time:{" "}
                        </span>{" "}
                        <p> {employeeAddingTimeConvert}</p>
                      </li>
                    </ul>
                  </div>
                </React.Fragment>
              );
            })
          )}

          {userLoading && <LoadingSpinner />}
        </>
      </ul>
    </div>
  );
};

export default Users;
