import { ToastContainer } from "react-toastify";
import SignUp from "../Auth/SignUp";
import Navbar from "../Navbar/Navbar";

const ThemeLightToDark =
  "bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText";
const ThemeDarkToLight =
  "bg-darkBg text-darkText dark:bg-lightBg dark:text-lightText";
const App = () => {
  return (
    <div className={`App transition-all`}>
      <Navbar />
      <SignUp />
      <ToastContainer />
    </div>
  );
};

export { ThemeLightToDark, ThemeDarkToLight };
export default App;
