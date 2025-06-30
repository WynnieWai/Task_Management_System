import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../notifications/NotificationsContext";

export default function Header({ user }) {
  const navigate = useNavigate();
  const { notifications } = useNotifications();

  // Filter notifications for this user
  const userNotifications = notifications.filter(n => n.user === user?.username);
  const unreadCount = userNotifications.length; // Adjust if you implement read status later

  return (
    <header className="flex items-center justify-between bg-white shadow px-6 h-16 border-b">
      <div className="text-xl font-bold text-blue-700">Tuesday</div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/notifications")}
          className="relative focus:outline-none"
        >
          <FaBell className="text-xl" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <FaUserCircle className="text-2xl text-gray-600" />
          <span>{user?.username}</span>
        </button>
      </div>
    </header>
  );
}
