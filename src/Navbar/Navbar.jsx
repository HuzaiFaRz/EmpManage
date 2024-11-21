import { ThemeDarkLight } from "../../tailwind.config";
import ThemeChangerButton from "../Theme_Changer/ThemeChangerButton";

const Navbar = () => {
  return (
    <nav
      className={`fixed top-0 right-0 w-full h-[100px] flex justify-evenly items-center p-2 ${ThemeDarkLight}`}
    >
      <ThemeChangerButton />
    </nav>
  );
};

export default Navbar;
