import React from "react";

export default function TaskBoard({ user }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Task Board</h1>
      <div className="flex gap-4">
        <div className="flex-1 bg-gray-100 p-4 rounded shadow">
          <h2 className="font-semibold mb-2">To-Do</h2>
          <div className="bg-white p-2 rounded mb-2">Task 1</div>
          <div className="bg-white p-2 rounded mb-2">Task 2</div>
        </div>
        <div className="flex-1 bg-gray-100 p-4 rounded shadow">
          <h2 className="font-semibold mb-2">In Progress</h2>
          <div className="bg-white p-2 rounded mb-2">Task 3</div>
        </div>
        <div className="flex-1 bg-gray-100 p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Done</h2>
          <div className="bg-white p-2 rounded mb-2">Task 4</div>
        </div>
      </div>
    </div>
  );
} 