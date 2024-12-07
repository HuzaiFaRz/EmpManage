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

const ThemeLightToDark =
  "bg-colorOne dark:bg-colorTwo text-colorTwo dark:text-colorOne";

const ThemeDarkToLight =
  "bg-colorTwo text-colorOne dark:bg-colorOne dark:text-colorTwo";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogIn />} />

          <Route path="/" element={<LayOut />} />
          <Route path="/empmanage" element={<EmpManage />} />
          <Route path="/admindashBoard" element={<AdminDashBoard />} />
          <Route path="/employeedashBoard" element={<EmployeeDashBoard />} />
          <Route path="/employeecreate" element={<EmployeeCreate />} />
          <Route path="/employeeupdate" element={<EmployeeUpdate />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export { ThemeLightToDark, ThemeDarkToLight };
export default App;
