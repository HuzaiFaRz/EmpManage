import { Link } from "react-router-dom";
import ThemeChangerButton from "../ThemeChanger/ThemeChangerButton";

const Topbar = () => {
  return (
    <div className="flex items-center justify-between bg-colorTwo dark:bg-colorOne text-colorOne dark:text-colorTwo px-4 py-3">
      {/* Logo */}
      <div className="text-xl font-bold">EmpManage</div>

      {/* Links */}
      <nav className="hidden md:flex space-x-4">
        <Link to="/dashboard" className="hover:text-blue-400">
          Dashboard
        </Link>
        <Link to="/employees" className="hover:text-blue-400">
          Employees
        </Link>
        <Link to="/reports" className="hover:text-blue-400">
          Reports
        </Link>
      </nav>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Theme Toggle */}
      <ThemeChangerButton />
    </div>
  );
};

export default Topbar;
