import { Fragment } from "react";
import SignUp from "../Auth/SignUp";
import { ToastContainer } from "react-toastify";

import "../Auth/Cloudinary_Confic"

const App = () => {
  return (
    <Fragment>
      <SignUp />
      <ToastContainer />
    </Fragment>
  );
};

export default App;
