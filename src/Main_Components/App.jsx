import { ToastContainer } from "react-toastify";
import SignUp from "../Auth/SignUp";
import Navbar from "../Navbar/Navbar";
import {  ThemeLightDark } from "../../tailwind.config";

const App = () => {
  return (
    <div className={`App ${ThemeLightDark} transition-all`}>
      <Navbar />
      <SignUp />
      <ToastContainer />
    </div>
  );
};

export default App;
