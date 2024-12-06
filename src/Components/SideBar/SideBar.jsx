import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Employees", to: "/employees" },
    { name: "Add Employee", to: "/add-employee" },
    { name: "Reports", to: "/reports" },
    { name: "Settings", to: "/settings" },
  ];

  return (
    <div className="bg-colorTwo dark:bg-colorOne text-colorOne dark:text-colorTwo w-64 p-4 hidden md:flex flex-col h-screen">
      <h2 className="text-xl font-bold mb-6">EmpManage</h2>
      <h2 className="text-sm font-bold mb-6 tracking-wide">
        Employee Managment System
      </h2>
      <nav className="space-y-4">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.to}
            className={({ isActive }) =>
              `block hover:text-blue-400 ${
                isActive ? "text-blue-400 font-bold" : ""
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
