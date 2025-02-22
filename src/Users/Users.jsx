import { FaCheck } from "react-icons/fa";
import {
  resolveMessage,
  ThemeDarkToLight,
  ThemeLightToDark,
} from "../Script/index";
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
import { db } from "../Config-Files/firebase_Config";
import LoadingArrows from "../Loading/Loading_Arrows";
import { useRef } from "react";
import { CgClose } from "react-icons/cg";
import { IoIosWarning } from "react-icons/io";
import LoadingSpinner from "../Loading/Loading_Spinner";
import { rejectMessage } from "../Script/index";
import { ClipLoader } from "react-spinners";

const Users = () => {
  const [usersSelectID, setUsersSelectID] = useState([]);
  const [users, setUsers] = useState();
  const [usersSearchInput, setUsersSearchInput] = useState("");
  const usersCardRef = useRef([]);
  const usersNameRef = useRef([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [scrollCount, setScrollCount] = useState(3);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersDeleteLoading, setUsersDeleteLoading] = useState(false);

  useEffect(() => {
    document.title = "EmpManage | | Users";
    isDeleteModalOpen
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "scroll");

    const usersScrollHandler = () => {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight
      ) {
        setScrollCount((prevSetScrollCount) => prevSetScrollCount + 1);
        return;
      }
    };
    document.addEventListener("scroll", usersScrollHandler);
    return () => document.removeEventListener("scroll", usersScrollHandler);
  }, [users, isDeleteModalOpen]);

  useEffect(() => {
    setUsersLoading(true);
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
      setUsersLoading(false);
    });

    return () => unsubscribe();
  }, [scrollCount]);

  const userSelectHandler = (Id) => {
    setUsersSelectID((prevSetUserSelectId) =>
      prevSetUserSelectId?.includes(Id)
        ? prevSetUserSelectId.filter((existingId) => existingId !== Id)
        : [...prevSetUserSelectId, Id]
    );
  };

  const userAllSelectHandler = () => {
    if (usersSelectID.length === users?.length) {
      setUsersSelectID([]);
    } else {
      setUsersSelectID(users.map((data) => data.Id));
    }
  };

  const usersSearchHandler = (event) => {
    const usersSearchInput = event.target.value
      .toLowerCase()
      .replaceAll(" ", "");
    setUsersSearchInput(usersSearchInput);
    usersNameRef.current.forEach((data, index) => {
      const userName = data?.textContent.toLowerCase().replaceAll(" ", "");
      if (usersCardRef.current[index]) {
        const userCardElement = usersCardRef.current[index];
        if (userName.includes(usersSearchInput)) {
          userCardElement.style.display = "block";
        } else {
          userCardElement.style.display = "none";
        }
      }
    });
  };
  const userDeleteHandler = async () => {
    try {
      usersSelectID.forEach(async (data) => {
        const docRef = doc(db, "Users", data);
        setUsersDeleteLoading(true);
        await deleteDoc(docRef);
      });
      setUsersDeleteLoading(false);
      setUsersSelectID([]);
      setIsDeleteModalOpen(false);
      resolveMessage("User Deleted");
    } catch (error) {
      console.log(error);
      setUsersDeleteLoading(false);
      setUsersSelectID([]);
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
          Users
        </h1>

        <div className="flex flex-wrap justify-evenly items-center w-full p-5 gap-5">
          <input
            type="text"
            id="employeeSearch"
            className="p-2 bg-transparent border border-colorTwo dark:border-colorOne color-colorTwo font-light tracking-[1px] placeholder:text-colorTwo dark:placeholder:text-colorOne focus:outline-0 w-[300px]"
            placeholder="Search Employee By Name"
            value={usersSearchInput}
            onChange={(event) => {
              usersSearchHandler(event);
            }}
          />
          <button
            className={`${ThemeDarkToLight} cursor-pointer border-0 relative px-3 py-2 sm:px-6 text-[13px] sm:text-[15px] flex hover:rounded-xl transition-all justify-center items-center gap-5`}
            disabled={usersSelectID.length === 0 && users?.length === 0 && true}
          >
            {" "}
            <p>
              {usersSelectID.length}

              {usersSelectID.length === users?.length
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
            disabled={usersSelectID.length === 0 && users?.length === 0 && true}
            onClick={() => {
              usersSelectID.length === 0 || setIsDeleteModalOpen(true);
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
            Are you sure you want to delete {usersSelectID.length} selected
            User?
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
            disabled={usersSelectID.length === 0 && users?.length === 0 && true}
            onClick={userDeleteHandler}
          >
            {usersDeleteLoading ? (
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
              const { signUpEmail, signUpName, Id } = data;
              const { seconds, nanoseconds } = data.signUpAddingTime;
              const signUpAddingTimeConvert = new Date(
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
                      usersSelectID.includes(Id)
                        ? "bg-gray-500"
                        : "border-colorTwo dark:border-colorOne"
                    }`}
                    id={`Card ${Id}`}
                    ref={(el) => {
                      usersCardRef.current.push(el);
                    }}
                  >
                    <div className="flex flex-row justify-between items-center p-3">
                      <div className="flex flex-row justify-center items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${ThemeDarkToLight}`}
                        >
                          {signUpName?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col justify-center items-start">
                          <h2
                            className="text-lg font-bold tracking-wide"
                            ref={(el) => {
                              usersNameRef.current.push(el);
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
                        {usersSelectID.includes(Id) && (
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
                        <p> {signUpAddingTimeConvert}</p>
                      </li>
                    </ul>
                  </div>
                </React.Fragment>
              );
            })
          )}

          {usersLoading && <LoadingSpinner />}
        </>
      </ul>
    </div>
  );
};

export default Users;
