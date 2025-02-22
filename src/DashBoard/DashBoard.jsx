import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { rejectMessage, ThemeDarkToLight } from "../Script";
import { db } from "../Config-Files/firebase_Config";
import { Fragment, useEffect, useState } from "react";
import LoadingArrows from "../Loading/Loading_Arrows";
import { PieChart } from "react-minimal-pie-chart";
import { AuthUseContext } from "../Utilities/Auth_Provider";

const DashBoard = () => {
  const { isAdminLogged, isUserLogged } = AuthUseContext();
  const [dashBoardContentLoading, setDashBoardContentLoading] = useState(false);
  const [currentLoggedData, setCurrentLoggedData] = useState();
  const [allEmployeesGetting, setAllEmployeesGetting] = useState([]);
  const [allUsersGetting, setAllUsersGetting] = useState([]);
  useEffect(() => {
    document.title = "EmpManage | | DashBoard ";
    (async () => {
      try {
        setDashBoardContentLoading(true);
        if (isAdminLogged) {
          const currentLoggedCollection = doc(db, "Admin", isAdminLogged?.uid);
          const currentLoggedResponse = await getDoc(currentLoggedCollection);
          const data = currentLoggedResponse.data();
          setCurrentLoggedData(data);
          const employeesCollection = collection(db, "Employees");
          onSnapshot(employeesCollection, (querySnapshot) => {
            const realTimeEmployee = querySnapshot.docs.map((data) => {
              return {
                Id: data.id,
                ...data.data(),
              };
            });
            setAllEmployeesGetting(realTimeEmployee);
          });
          const usersCollection = collection(db, "Users");
          onSnapshot(usersCollection, (querySnapshot) => {
            const realTimeUsers = querySnapshot.docs.map((data) => {
              return {
                Id: data.id,
                ...data.data(),
              };
            });
            setAllUsersGetting(realTimeUsers);
          });
        } else {
          const currentLoggedCollection = doc(db, "Users", isUserLogged?.uid);
          const currentLoggedResponse = await getDoc(currentLoggedCollection);
          const data = currentLoggedResponse.data();
          setCurrentLoggedData(data);
        }
      } catch (error) {
        console.log(error);
        rejectMessage(error.message);
      } finally {
        setDashBoardContentLoading(false);
      }
    })();
  }, [isAdminLogged, isUserLogged?.uid]);

  if (dashBoardContentLoading) {
    return <LoadingArrows />;
  }

  const totalData = allEmployeesGetting.length + allUsersGetting.length;

  const data = [
    {
      title: "Employees",
      value: allEmployeesGetting.length,
      color: "rosybrown",
    },
    {
      title: "Users",
      value: allUsersGetting.length,
      color: "salmon",
    },
  ];

  return (
    <Fragment>
      <div className="w-full h-[90svh] mt-[10svh] flex flex-col justify-center items-center gap-5">
        <div className="dashboard_header w-full flex flex-col sm:flex-row justify-center items-center gap-10 h-[500px]">
          {isAdminLogged && (
            <img
              src={currentLoggedData?.adminProfileURL}
              className="w-[150px] h-[150px] xs:w-[200px] xs:h-[200px] sm:w-[300px] sm:h-[300px] rounded-full object-cover object-center border-2 dark:border-colorOne border-colorTwo ml-10"
              alt="Profile"
            />
          )}

          {isUserLogged && (
            <div
              className={`w-[200px] h-[200px] rounded-full flex items-center justify-center text-5xl font-bold ${ThemeDarkToLight}`}
            >
              {currentLoggedData?.signUpName?.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="flex flex-col justify-center items-center gap-10">
            <>
              <h1 className="text-4xl sm:text-[5vw] text-colorTwo dark:text-colorOne">
                Hi!{" "}
                {isAdminLogged
                  ? currentLoggedData?.adminName
                  : currentLoggedData?.signUpName}
              </h1>
              <div
                className={`text-xl sm:text-[2vw] w-full py-3 rounded-sm shadow-2xl focus:outline-none px-5 text-center ${ThemeDarkToLight}`}
              >
                {isAdminLogged
                  ? currentLoggedData?.adminEmail
                  : currentLoggedData?.signUpEmail}
              </div>
            </>
          </div>
        </div>

        <div className="dashboard_Body">
          {isAdminLogged ? (
            <div
              className={`w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-colorTwo dark:bg-colorOne relative rounded-full`}
            >
              <PieChart
                data={totalData !== 0 && data}
                animate
                animationDuration={1000}
                animationEasing="ease-out"
                label={({ dataEntry }) =>
                  `${dataEntry.title}: ${Math.round(
                    (dataEntry.value / totalData) * 100
                  )}%`
                }
                labelStyle={{
                  fontSize: "4px",
                  color: "white",
                  fontWeight: "bold",
                }}
                labelPosition={50}
                radius={45}
                className="absolute w-full h-full "
              />
            </div>
          ) : (
            <div className="w-full h-[300px] text-colorTwo dark:text-colorOne text-5xl flex justify-center items-center">
              EmpManage
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default DashBoard;
