// import DefaultProfilePic from "../assets/Images/Default_Profile_Pic.jpg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "../Components/LogIn";
import AdminDashBoard from "../Components/AdminDashBoard";
import EmployeeDashBoard from "../Employee_CRUD/EmployeeDashBoard";
import EmployeeCreate from "../Employee_CRUD/EmployeeCreate";
import EmployeeUpdate from "../Employee_CRUD/EmployeeUpdate";
import EmpManage from "../Components/EmpManage/EmpManage";
import ProtectedRoute from "../Protected_Routes/ProtectedRoute";
import LayOut from "../Components/LayOut/LayOut";
import AuthProvider from "../Protected_Routes/AuthProvider";
import { ToastContainer } from "react-toastify";
import EmployeeRead from "../Employee_CRUD/EmployeeRead";
import { Fragment } from "react";

const ThemeLightToDark =
  "bg-colorOne dark:bg-colorTwo text-colorTwo dark:text-colorOne";

const ThemeDarkToLight =
  "bg-colorTwo text-colorOne dark:bg-colorOne dark:text-colorTwo";

const App = () => {
  return (
    <Fragment>
      <ToastContainer />

      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayOut />}>
              <Route path="login" element={<LogIn />} />
              <Route path="empmanage" element={<EmpManage />} />
              <Route path="admindashBoard" element={<AdminDashBoard />} />
              <Route path="employeedashBoard" element={<EmployeeDashBoard />} />
              <Route path="employeecreate" element={<EmployeeCreate />} />
              <Route path="employees" element={<EmployeeRead />} />
              <Route path="employeeupdate" element={<EmployeeUpdate />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Fragment>
  );
};

export { ThemeLightToDark, ThemeDarkToLight };
export default App;
