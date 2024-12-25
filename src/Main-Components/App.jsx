import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "../Auth/LogIn.jsx";
import DashBoard from "../DashBoard/DashBoard.jsx";
import Employee_Add from "../Employee-CRUD/Employee_Add.jsx";
import Emp_Manage from "../Emp-Manage/EmpManage.jsx";
import Auth_Provider from "../Utilities/Auth_Provider.jsx";
import { ToastContainer } from "react-toastify";
import Employees from "../Employee-CRUD/Employees.jsx";
import Employee_Edit from "../Employee-CRUD/Employee_Edit.jsx";
import Protected_Route from "../Protected-Routes/Protected_Route.jsx";
import Profile from "../Profile/Profile.jsx";
import LayOut from "../LayOut/LayOut.jsx";
import SignUp from "../Auth/SignUp.jsx";
import Users from "../Users/Users.jsx";
import FeedBack from "../FeedBack/FeedBack.jsx";
import FeedBacks from "../FeedBacks/FeedBacks.jsx";

const App = () => {
  return (
    <Fragment>
      <ToastContainer
        draggable="mouse"
        progressClassName="toastify__progress-bar"
        style={{ lineHeight: "20px" }}
      />
      <Auth_Provider>
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<LogIn />} />
            <Route path="sign_up" element={<SignUp />} />
            <Route path="/" element={<Protected_Route />}>
              <Route path="/" element={<LayOut />}>
                <Route path="/" element={<Emp_Manage />} />
                <Route path="dashBoard" element={<DashBoard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="employee_edit" element={<Employee_Edit />} />
                <Route path="employee_add" element={<Employee_Add />} />
                <Route path="employees" element={<Employees />} />
                <Route path="feedback" element={<FeedBack />} />
                <Route path="feedbacks" element={<FeedBacks />} />
                <Route path="users" element={<Users />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Auth_Provider>
    </Fragment>
  );
};

export default App;
