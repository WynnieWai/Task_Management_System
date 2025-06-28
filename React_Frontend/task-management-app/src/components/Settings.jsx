import React from "react";

export default function Settings() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="bg-white p-6 rounded shadow mb-4">
        <h2 className="font-semibold mb-2">System Authentication</h2>
        <button className="bg-blue-500 text-white px-3 py-1 rounded">Configure</button>
      </div>
      <div className="bg-white p-6 rounded shadow mb-4">
        <h2 className="font-semibold mb-2">Notifications</h2>
        <button className="bg-blue-500 text-white px-3 py-1 rounded">Set Up</button>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-semibold mb-2">Branding</h2>
        <button className="bg-blue-500 text-white px-3 py-1 rounded">Manage</button>
      </div>
    </div>
  );
} 