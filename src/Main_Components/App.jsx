import { ToastContainer } from "react-toastify";
import EmployeeForm from "../Auth/EmployeeForm";
import Navbar from "../Navbar/Navbar";
import DefaultProfilePic from "../assets/Images/Default_Profile_Pic.jpg";
const ThemeLightToDark =
  "bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText";
const ThemeDarkToLight =
  "bg-darkBg text-darkText dark:bg-lightBg dark:text-lightText";
const App = () => {
  return (
    <div className={`App transition-all`}>
      <Navbar />
      <EmployeeForm />
      <ToastContainer />
    </div>
  );
};

export { ThemeLightToDark, ThemeDarkToLight, DefaultProfilePic };
export default App;
