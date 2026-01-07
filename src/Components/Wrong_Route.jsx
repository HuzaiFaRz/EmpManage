import { useEffect } from "react";

const Wrong_Route = () => {
  useEffect(() => {
    document.title = "ChatSpace | Error";
  }, []);

  return (
    <div
      id="error-page"
      className="w-full h-screen flex flex-col justify-center items-center gap-5 text-center text-white"
    >
      <h1 className="text-6xl font-bold">Oops!</h1>
      <p className="text-2xl">Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="text-xl">{"404 Not Found"}</i>
      </p>
    </div>
  );
};

export default Wrong_Route;
