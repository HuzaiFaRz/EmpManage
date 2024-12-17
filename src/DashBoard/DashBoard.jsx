import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { rejectMessage, ThemeDarkToLight } from "../Script";
import { auth, db } from "../ConfigFiles/firebase_Config";
import React, { Fragment, useEffect, useState } from "react";
import LoadingArrows from "../Components/Loading_Arrows";

const DashBoard = () => {
  const [currentLoggedData, setCurrentLoggedData] = useState();
  const [allEmployeesGetting, setAllEmployeesGetting] = useState();
  const [dashBoardContentLoading, setDashBoardContentLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setDashBoardContentLoading(true);
        const currentLoggedCollection = doc(db, "Admin", auth.currentUser.uid);
        const employeesCollection = collection(db, "Employees");
        const unsubscribe = onSnapshot(employeesCollection, (querySnapshot) => {
          const realTimeEmployee = querySnapshot.docs.map((data) => {
            return {
              Id: data.id,
              ...data.data(),
            };
          });
          setAllEmployeesGetting(realTimeEmployee);
        });

        const response = await getDoc(currentLoggedCollection);
        const data = response.data();
        setCurrentLoggedData(data);
        setDashBoardContentLoading(false);
      } catch (error) {
        setDashBoardContentLoading(false);
        console.log(error);
        rejectMessage(error.message);
      }
    })();
  }, []);

  if (dashBoardContentLoading) {
    return <LoadingArrows />;
  }

  return (
    <Fragment>
      <div className="w-full h-[100svh] flex flex-col justify-center items-center gap-5">
        <div className="dashboard_header w-full p-3 flex flex-row justify-start items-center gap-4">
          <img
            src={currentLoggedData?.adminProfileURL}
            className="w-[150px] sm:w-[300px] h-[150px] sm:h-[300px] rounded-full object-cover object-center"
            alt="Profile"
          />

          <div className="flex flex-col justify-between items-start gap-3">
            <h1 className="text-2xl sm:text-3xl text-colorTwo dark:text-colorOne">
              Hi! {currentLoggedData?.adminName}
            </h1>
            <h3
              className={`text-sm sm:text-2xl p-1 rounded-sm shadow-2xl focus:outline-none ${ThemeDarkToLight}`}
            >
              {auth.currentUser.email}
            </h3>
          </div>
        </div>
        <div className="dashboard_Body">
          {/* {allEmployeesGetting?.map((e, i) => {
            return (
              <React.Fragment key={i}>
                <div className="w-[400px] h-[400px] rounded-full bg-slate-50"></div>
              </React.Fragment>
            );
          })} */}
          <div className="w-[400px] h-[400px] rounded-full bg-slate-50"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default DashBoard;
