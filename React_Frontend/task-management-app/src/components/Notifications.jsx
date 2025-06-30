import React from "react";
import { useNotifications } from "../notifications/NotificationsContext";

export default function Notifications({ user }) {
  const { notifications } = useNotifications();

  const userNotifications = notifications.filter(n => n.user === user.username);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <ul className="bg-white rounded shadow divide-y">
        {userNotifications.length === 0 ? (
          <li className="p-4 text-gray-500">No notifications.</li>
        ) : (
          userNotifications.map((n) => (
            <li key={n.id} className="p-4">
              <div className="font-medium">{n.message}</div>
              <div className="text-sm text-gray-500">{n.time}</div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
