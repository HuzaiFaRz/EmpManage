import { useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { ThemeDarkToLight, ThemeLightToDark } from "../../Main_Components/App";

const ThemeChangerButton = () => {
  const [dark, setDark] = useState(false);
  const themeChangerHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <button
      onClick={themeChangerHandler}
      className={`w-[40px] h-[40px] flex justify-center items-center rounded-full ${ThemeDarkToLight}`}
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
