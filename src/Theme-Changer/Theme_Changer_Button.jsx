import { useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { ThemeDarkToLight } from "../Script";


const ThemeChangerButton = () => {
  const [dark, setDark] = useState(false);
  const themeChangerHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <button
      onClick={themeChangerHandler}
      className={`w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] flex justify-center items-center rounded-full ${ThemeDarkToLight} mr-5`}
    >
      {dark ? (
        <IoSunny className="text-lg sm:text-2xl" />
      ) : (
        <IoMoon className="text-lg sm:text-2xl" />
      )}
    </button>
  );
};

export default ThemeChangerButton;
