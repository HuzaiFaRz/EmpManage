import { Fragment } from "react";
import AuthHeading from "./AuthHeading";

const Signup = () => {
  return (
    <Fragment>
      <div className="SignUp_Page w-full h-screen flex flex-col justify-evenly items-center">
 
        <AuthHeading HeadingText={"Sign Up"} />
      </div>
    </Fragment>
  );
};

export default Signup;
