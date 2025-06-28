import React from "react";

export default function FilesSubmissions() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Files & Submissions</h1>
      <div className="mb-4">
        <input type="file" className="border p-2 rounded" />
        <button className="ml-2 bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
      </div>
      <ul className="bg-white rounded shadow divide-y">
        <li className="p-4">assignment1.pdf <button className="ml-2 bg-green-500 text-white px-2 py-1 rounded">Download</button></li>
        <li className="p-4">project.zip <button className="ml-2 bg-green-500 text-white px-2 py-1 rounded">Download</button></li>
      </ul>
    </div>
  );
} 