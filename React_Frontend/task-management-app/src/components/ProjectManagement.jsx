import React from "react";

export default function ProjectManagement({ user }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Project Management</h1>
      <button className="mb-4 bg-blue-600 text-white px-4 py-2 rounded">Create New Project</button>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Project Name</th>
            <th className="border px-4 py-2">Manager</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Project Alpha</td>
            <td className="border px-4 py-2">manager</td>
            <td className="border px-4 py-2">Active</td>
            <td className="border px-4 py-2">
              <button className="bg-yellow-400 px-2 py-1 rounded mr-2">Edit</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">Archive</button>
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Project Beta</td>
            <td className="border px-4 py-2">manager</td>
            <td className="border px-4 py-2">Completed</td>
            <td className="border px-4 py-2">
              <button className="bg-yellow-400 px-2 py-1 rounded mr-2">Edit</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">Archive</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
} 