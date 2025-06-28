import React from "react";

export default function Notifications({ user }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <ul className="bg-white rounded shadow divide-y">
        <li className="p-4">System update scheduled for tomorrow.</li>
        <li className="p-4">New project assigned to you.</li>
        <li className="p-4">Task deadline approaching.</li>
        <li className="p-4">Welcome, {user.username}!</li>
      </ul>
    </div>
  );
} 