import Navbar from "../Components/Navbar";
import DefaultProfilePic from "../assets/Images/Default_Profile_Pic.jpg";
import Create_Employee from "../Employee_CRUD/Employee_Create";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const ThemeLightToDark =
  "bg-colorOne dark:bg-colorTwo text-colorTwo dark:text-colorOne";

const ThemeDarkToLight =
  "bg-colorTwo text-colorOne dark:bg-colorOne dark:text-colorTwo";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Create_Employee />} />
      </Routes>
    </BrowserRouter>

  );
};

export { ThemeLightToDark, ThemeDarkToLight, DefaultProfilePic };
export default App;
