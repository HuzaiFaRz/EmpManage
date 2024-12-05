import Navbar from "../Components/Navbar";
import DefaultProfilePic from "../assets/Images/Default_Profile_Pic.jpg";
import Create_Employee from "../Employee_CRUD/Employee_Create";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const ThemeLightToDark =
  "bg-light_Bg dark:bg-dark_Bg text-light_Text dark:text-dark_Text";

const ThemeDarkToLight =
  "bg-dark_Bg text-dark_Text dark:bg-light_Bg dark:text-light_Text";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Create_Employee />} />
      </Routes>
    </BrowserRouter>
    // <div
    //   className={`App transition-all flex flex-col justify-between items-center`}
    // >
    //   <Navbar />
    //   <Create_Employee_Form />
    // </div>
  );
};

export { ThemeLightToDark, ThemeDarkToLight, DefaultProfilePic };
export default App;
