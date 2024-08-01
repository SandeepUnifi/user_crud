import React from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">MyApp</div>
        <div className="flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-indigo-500"
                : "text-gray-300 hover:text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/user"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-indigo-500"
                : "text-gray-300 hover:text-white"
            }
          >
            User RBAC
          </NavLink>
          <NavLink
            to="/permissions"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-indigo-500"
                : "text-gray-300 hover:text-white"
            }
          >
            Roles
          </NavLink>
          <NavLink
            to="/roles"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-indigo-500"
                : "text-gray-300 hover:text-white"
            }
          >
            Permissions
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
