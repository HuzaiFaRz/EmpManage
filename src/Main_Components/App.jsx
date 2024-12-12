// import DefaultProfilePic from "../assets/Images/Default_Profile_Pic.jpg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "../Components/LogIn";
import AdminDashBoard from "../Components/AdminDashBoard";
import Employee_Add from "../Employee_CRUD/Employee_Add.jsx";
import EmpManage from "../Components/EmpManage/EmpManage";
import LayOut from "../Components/LayOut/LayOut";
import AuthProvider from "../Protected_Routes/AuthProvider";
import { ToastContainer } from "react-toastify";
import Employees from "../Employee_CRUD/Employees";
import { Fragment } from "react";
import EmployeeEdit from "../Employee_CRUD/Employee_Edit.jsx";

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
              <Route path="admin_dashBoard" element={<AdminDashBoard />} />
              <Route path="employee_edit" element={<EmployeeEdit />} />
              <Route path="employee_add" element={<Employee_Add />} />
              <Route path="employees" element={<Employees />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Fragment>
  );
};

export { ThemeLightToDark, ThemeDarkToLight };
export default App;
