
import SignUp from "../Auth/SignUp";
import { ToastContainer } from "react-toastify";

import "../Auth/Cloudinary_Confic"

const App = () => {
  return (
    <div className="App bg-white dark:bg-black">
      <SignUp />
      <ToastContainer />
    </div>
  );
};

export default App;
