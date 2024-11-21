import { ThemeDarkToLight } from "../Main_Components/App";
import ThemeChangerButton from "../Theme_Changer/ThemeChangerButton";

const Navbar = () => {
  return (
    <nav
      className={`fixed top-0 right-0 w-full h-[100px] flex justify-evenly items-center p-2 ${ThemeDarkToLight}`}
    >
      <ThemeChangerButton />
    </nav>
  );
};

export default Navbar;
