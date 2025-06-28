import React from "react";
import { Link, useNavigate } from "react-router-dom";

const menus = {
  admin: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/users", label: "User Management" },
    { to: "/projects", label: "Project Management" },
    { to: "/teams", label: "Team Management" },
    { to: "/reports", label: "Reports & Analytics" },
    { to: "/settings", label: "Settings" },
    { to: "/notifications", label: "Notifications" },
  ],
  manager: [
    { to: "/dashboard", label: "My Dashboard" },
    { to: "/projects", label: "My Projects" },
    { to: "/teams", label: "Team/Student Management" },
    { to: "/tasks", label: "Task Board" },
    { to: "/reports", label: "Project Analytics" },
    { to: "/comments", label: "Comments/Announcements" },
    { to: "/notifications", label: "Notifications" },
  ],
  contributor: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/projects", label: "My Projects" },
    { to: "/tasks", label: "My Tasks" },
    { to: "/files", label: "Files & Submissions" },
    { to: "/comments", label: "Comments/Discussion" },
    { to: "/notifications", label: "Notifications" },
  ],
};

export default function Sidebar({ user, setUser }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6 font-bold text-xl border-b">Task Manager</div>
      <nav className="flex-1 p-4">
        {menus[user.role].map(item => (
          <Link key={item.to} to={item.to} className="block py-2 px-3 rounded hover:bg-blue-100">{item.label}</Link>
        ))}
      </nav>
      <button onClick={handleLogout} className="m-4 bg-red-500 text-white py-2 rounded">Logout</button>
    </aside>
  );
}