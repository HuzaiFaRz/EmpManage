import { useState } from "react";
import { IoSunny } from "react-icons/io5";

import { IoMoon } from "react-icons/io5";
import { ThemeLightToDark } from "../Main_Components/App";

const ThemeChangerButton = () => {
  const [dark, setDark] = useState(false);
  const themeChangerHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };
  return (
    <button
      onClick={themeChangerHandler}
      className={`w-[40px] h-[40px] flex justify-center items-center rounded-full ${ThemeLightToDark}`}
    >
      {dark ? (
        <IoMoon className="text-2xl" />
      ) : (
        <IoSunny className="text-2xl" />
      )}
    </button>
  );
};

export default ThemeChangerButton;
