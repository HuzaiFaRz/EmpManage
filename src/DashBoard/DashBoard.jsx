import { doc, getDoc } from "firebase/firestore";
import { rejectMessage, ThemeDarkToLight } from "../Script";
import { auth, db } from "../ConfigFiles/firebase_Config";
import { Fragment, useEffect, useState } from "react";

const DashBoard = () => {
  const [currentLoggedData, setCurrentLoggedData] = useState();
  useEffect(() => {
    (async () => {
      try {
        const adminCollection = doc(db, "Admin", auth.currentUser.uid);
        const response = await getDoc(adminCollection);
        const data = response.data();
        setCurrentLoggedData(data);
      } catch (error) {
        console.log(error);
        rejectMessage(error.message);
      }
    })();
  }, []);

  return (
    <Fragment>
      <div className="w-full h-[100svh] flex flex-col justify-center items-center gap-5">
        <div className="dashboard_header h-[40svh] w-full p-3 flex flex-row justify-start items-center gap-4">
          <img
            src={currentLoggedData?.profile}
            className="w-[150px] sm:w-[300px] h-[150px] sm:h-[300px] rounded-full object-cover object-center"
            alt="Profile"
          />

          <div className="flex flex-col justify-between items-start gap-3">
            <h1 className="text-2xl sm:text-3xl text-colorTwo dark:text-colorOne">
              Hi! {currentLoggedData?.name}
            </h1>
            <h3
              className={`text-sm sm:text-2xl p-1 rounded-sm shadow-2xl focus:outline-none ${ThemeDarkToLight}`}
            >
              {auth.currentUser.email}
            </h3>
          </div>
        </div>
        <div className="h-[50svh]"></div>
      </div>
    </Fragment>
  );
};

export default DashBoard;
