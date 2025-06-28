import React from "react";

export default function Dashboard({ user }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</h1>
      <p>This is your dashboard. (Add stats, charts, etc. here.)</p>
    </div>
  );
} 