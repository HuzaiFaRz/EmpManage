import { useState } from "react";
import { IoSunny } from "react-icons/io5";

import { IoMoon } from "react-icons/io5";
import { ThemeLightDark } from "../../tailwind.config";

const ThemeChangerButton = () => {
  const [dark, setDark] = useState(false);
  const themeChangerHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };
  return (
    <button
      onClick={themeChangerHandler}
      className={`w-[40px] h-[40px] flex justify-center items-center rounded-full ${ThemeLightDark}`}
    >
      {dark ? (
        <IoSunny className="text-2xl" />
      ) : (
        <IoMoon className="text-2xl" />
      )}
    </button>
  );
};

export default ThemeChangerButton;
