import { ThemeDarkToLight, ThemeLightToDark } from "../Main_Components/App";
import ThemeChangerButton from "./ThemeChangerButton";

const Navbar = () => {
  return (
    <nav
      className={`w-full h-[100px] flex justify-evenly items-center p-2 ${ThemeDarkToLight}`}
    >
      <ThemeChangerButton />
    </nav>
  );
};

export default Navbar;
