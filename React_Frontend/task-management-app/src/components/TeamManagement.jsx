import React from "react";

export default function TeamManagement() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Team Management</h1>
      <button className="mb-4 bg-blue-600 text-white px-4 py-2 rounded">Assign User to Team</button>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Team Name</th>
            <th className="border px-4 py-2">Members</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Team A</td>
            <td className="border px-4 py-2">admin, manager</td>
            <td className="border px-4 py-2">
              <button className="bg-yellow-400 px-2 py-1 rounded mr-2">Edit</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Team B</td>
            <td className="border px-4 py-2">student</td>
            <td className="border px-4 py-2">
              <button className="bg-yellow-400 px-2 py-1 rounded mr-2">Edit</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
} 