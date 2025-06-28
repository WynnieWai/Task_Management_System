import React from "react";

export default function UserManagement() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <button className="mb-4 bg-blue-600 text-white px-4 py-2 rounded">Add New User</button>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">admin</td>
            <td className="border px-4 py-2">Admin</td>
            <td className="border px-4 py-2">
              <button className="bg-yellow-400 px-2 py-1 rounded mr-2">Edit</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">manager</td>
            <td className="border px-4 py-2">Manager</td>
            <td className="border px-4 py-2">
              <button className="bg-yellow-400 px-2 py-1 rounded mr-2">Edit</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">student</td>
            <td className="border px-4 py-2">Contributor</td>
            <td className="border px-4 py-2">
              <button className="bg-yellow-400 px-2 py-1 rounded mr-2">Edit</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
} 