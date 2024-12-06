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

const ThemeLightToDark =
  "bg-colorOne dark:bg-colorTwo text-colorTwo dark:text-colorOne";

const ThemeDarkToLight =
  "bg-colorTwo text-colorOne dark:bg-colorOne dark:text-colorTwo";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogIn />} />
      
          <Route path="/" element={<LayOut />} index={true} />
          <Route path="/empmanage" element={<EmpManage />} />
          <Route path="/admindashBoard" element={<AdminDashBoard />} />
          <Route path="/employeedashBoard" element={<EmployeeDashBoard />} />
          <Route path="/employeecreate" element={<EmployeeCreate />} />
          <Route path="/employeeupdate" element={<EmployeeUpdate />} />
    
      </Routes>
    </BrowserRouter>
  );
};

export { ThemeLightToDark, ThemeDarkToLight };
export default App;
