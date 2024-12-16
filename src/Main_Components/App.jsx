// import DefaultProfilePic from "../assets/Images/Default_Profile_Pic.jpg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "../Auth/LogIn.jsx";
import DashBoard from "../DashBoard/DashBoard.jsx";
import Employee_Add from "../Employee_CRUD/Employee_Add.jsx";
import EmpManage from "../EmpManage/Emp_Manage.jsx";
import AuthProvider from "../Utilities/Auth_Provider.jsx";
import { ToastContainer } from "react-toastify";
import Employees from "../Employee_CRUD/Employees";
import { Fragment } from "react";
import EmployeeEdit from "../Employee_CRUD/Employee_Edit.jsx";
import ProtectedRoute from "../ProtectedRoutes/Protected_Route.jsx";
import Profile from "../Profile/Profile.jsx";
import LayOut from "../LayOut/LayOut.jsx";

const App = () => {
  return (
    <Fragment>
      <ToastContainer />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<LogIn />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/" element={<LayOut />}>
                <Route path="/" element={<EmpManage />} />
                <Route path="dashBoard" element={<DashBoard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="employee_edit" element={<EmployeeEdit />} />
                <Route path="employee_add" element={<Employee_Add />} />
                <Route path="employees" element={<Employees />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Fragment>
  );
};

export default App;
