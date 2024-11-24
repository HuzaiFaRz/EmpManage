import { ToastContainer } from "react-toastify";
import EmployeeForm from "../Auth/EmployeeForm";
import Navbar from "../Navbar/Navbar";
import DefaultProfilePic from "../assets/Images/Default_Profile_Pic.jpg";
const ThemeLightToDark =
  "bg-colorOne dark:bg-colorTwo text-colorTwo dark:text-colorOne";
const ThemeDarkToLight =
  "bg-colorTwo text-colorOne dark:bg-colorOne dark:text-colorTwo";
const App = () => {
  return (
    <div
      className={`App transition-all flex flex-col justify-between items-center`}
    >
      <Navbar />
      <EmployeeForm />
      <ToastContainer />
    </div>
  );
};

export { ThemeLightToDark, ThemeDarkToLight, DefaultProfilePic };
export default App;
