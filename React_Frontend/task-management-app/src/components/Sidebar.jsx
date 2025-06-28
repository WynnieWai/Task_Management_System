import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaChevronLeft,
  FaChevronRight,
  FaTachometerAlt,
  FaUsers,
  FaTasks,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";

const menus = {
  admin: [
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/users", label: "User Management", icon: <FaUsers /> },
    { to: "/projects", label: "Project Management", icon: <FaTasks /> },
    // { to: "/teams", label: "Team Management" },
    // { to: "/reports", label: "Reports & Analytics" },
    // { to: "/settings", label: "Settings" },
    // { to: "/notifications", label: "Notifications" },
  ],
  manager: [
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/projects", label: "My Projects", icon: <FaTasks /> },
    // { to: "/teams", label: "Team/Student Management" },
    { to: "/tasks", label: "Task Board", icon: <FaClipboardList /> },
    // { to: "/reports", label: "Project Analytics" },
    // { to: "/comments", label: "Comments/Announcements" },
    // { to: "/notifications", label: "Notifications" },
  ],
  contributor: [
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/projects", label: "My Projects", icon: <FaTasks /> },
    { to: "/tasks", label: "My Tasks", icon: <FaClipboardList /> },
    // { to: "/files", label: "Files & Submissions" },
    // { to: "/comments", label: "Comments/Discussion" },
    // { to: "/notifications", label: "Notifications" },
  ],
};

export default function Sidebar({ user, setUser, open, setOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white shadow-lg flex flex-col transition-all duration-300 z-40 ${
        open ? "w-64" : "w-16"
      }`}
    >
      {/* Sidebar header */}
      <div className="flex items-center justify-between p-4 border-b">
        {open && <span className="font-bold text-lg">Task Manager</span>}
        <button
          className="bg-gray-100 rounded-full hover:bg-gray-200 flex items-center justify-center w-8 h-8"
          onClick={() => setOpen(!open)}
          aria-label="Toggle sidebar"
        >
          {open ? (
            <FaChevronLeft className="text-sm" />
          ) : (
            <FaChevronRight className="text-sm" />
          )}
        </button>
      </div>

      {/* Menu links */}
      <nav className="flex-1 p-2">
        {menus[user.role].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center gap-2 py-2 px-3 rounded hover:bg-blue-100"
          >
            <span className="text-lg">{item.icon}</span>
            {open && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className={`${
          open ? "m-4" : "mx-auto my-4"
        } bg-red-500 text-white py-2 rounded flex items-center justify-center ${
          open ? "w-auto px-4" : "w-10 h-10"
        }`}
      >
        {open ? (
          <>
            <FaSignOutAlt className="mr-2" /> Logout
          </>
        ) : (
          <FaSignOutAlt />
        )}
      </button>
    </aside>
  );
}
