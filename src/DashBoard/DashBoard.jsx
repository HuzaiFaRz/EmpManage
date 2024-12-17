import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { rejectMessage, ThemeDarkToLight } from "../Script";
import { auth, db } from "../ConfigFiles/firebase_Config";
import { Fragment, useEffect, useState } from "react";
import LoadingArrows from "../Loading/Loading_Arrows";
import { PieChart } from "react-minimal-pie-chart";
import { AuthUseContext } from "../Utilities/Auth_Provider";

const DashBoard = () => {
  const { isAdminLogged, isUserLogged } = AuthUseContext();

  console.log(isAdminLogged, "isAdminLogged =====================");
  console.log(isUserLogged, "isUserLogged====================");

  const [dashBoardContentLoading, setDashBoardContentLoading] = useState(false);
  const [currentLoggedData, setCurrentLoggedData] = useState();
  const [allEmployeesGetting, setAllEmployeesGetting] = useState([]);
  const [allUsersGetting, setAllUsersGetting] = useState([]);
  useEffect(() => {
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
      <div className="w-full h-[100svh] flex flex-col justify-center items-center gap-5">
        <div className="dashboard_header w-full p-3 flex flex-row justify-start items-center gap-4">
          <img
            src={
              isAdminLogged
                ? currentLoggedData?.adminProfileURL
                : currentLoggedData?.signUpProfile
            }
            className="w-[150px] sm:w-[300px] h-[150px] sm:h-[300px] rounded-full object-cover object-center"
            alt="Profile"
          />

          <div className="flex flex-col justify-between items-start gap-10">
            <>
              <h1 className="text-2xl sm:text-[7vw] text-colorTwo dark:text-colorOne">
                Hi!{" "}
                {isAdminLogged
                  ? currentLoggedData?.adminName
                  : currentLoggedData?.signUpName}
              </h1>
              <div
                className={`text-sm sm:text-3xl p-1 sm:p-3 rounded-sm shadow-2xl focus:outline-none ${ThemeDarkToLight}`}
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
                data={data}
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
            <div className="w-full h-[300px] text-colorOne text-5xl flex justify-center items-center">
              EmpManage
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default DashBoard;
