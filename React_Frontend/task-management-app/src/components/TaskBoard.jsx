// import React from "react";

// export default function TaskBoard({ user }) {
//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Task Board</h1>
//       <div className="flex gap-4">
//         <div className="flex-1 bg-gray-100 p-4 rounded shadow">
//           <h2 className="font-semibold mb-2">To-Do</h2>
//           <div className="bg-white p-2 rounded mb-2">Task 1</div>
//           <div className="bg-white p-2 rounded mb-2">Task 2</div>
//         </div>
//         <div className="flex-1 bg-gray-100 p-4 rounded shadow">
//           <h2 className="font-semibold mb-2">In Progress</h2>
//           <div className="bg-white p-2 rounded mb-2">Task 3</div>
//         </div>
//         <div className="flex-1 bg-gray-100 p-4 rounded shadow">
//           <h2 className="font-semibold mb-2">Done</h2>
//           <div className="bg-white p-2 rounded mb-2">Task 4</div>
//         </div>
//       </div>
//     </div>
//   );
// } 


import React, { useState } from "react";
import TaskDetail from "./TaskDetail";

const initialTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Design the project wireframes.",
    timeline: "Jun 5 - Jun 11",
    dueDate: "2024-06-11",
    priority: "Low",
    status: "To-Do",
    submission: null,
    comments: [
      { user: "manager", text: "Please start ASAP." },
      { user: "student", text: "Will do!" }
    ]
  },
  {
    id: 2,
    title: "Task 2",
    description: "Set up the backend API.",
    timeline: "Jun 12 - Jun 18",
    dueDate: "2024-06-18",
    priority: "Medium",
    status: "To-Do",
    submission: null,
    comments: []
  },
  {
    id: 3,
    title: "Task 3",
    description: "Implement authentication.",
    timeline: "Jun 19 - Jun 25",
    dueDate: "2024-06-25",
    priority: "High",
    status: "In Progress",
    submission: null,
    comments: []
  },
  {
    id: 4,
    title: "Task 4",
    description: "Write documentation.",
    timeline: "Jun 26 - Jul 2",
    dueDate: "2024-07-02",
    priority: "Low",
    status: "Done",
    submission: "doc.pdf",
    comments: [{ user: "manager", text: "Great job!" }]
  }
];

export default function TaskBoard({ user }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);

  // Update task in state (for submission, status, comments)
  const updateTask = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Task Board</h1>
      <div className="flex gap-4">
        {["To-Do", "In Progress", "Done"].map(status => (
          <div key={status} className="flex-1 bg-gray-100 p-4 rounded shadow">
            <h2 className="font-semibold mb-2">{status}</h2>
            {tasks.filter(t => t.status === status).map(task => (
              <div
                key={task.id}
                className="bg-white p-2 rounded mb-2 cursor-pointer hover:bg-blue-100"
                onClick={() => setSelectedTask(task)}
              >
                {task.title}
              </div>
            ))}
          </div>
        ))}
      </div>
      {selectedTask && (
        <TaskDetail
          user={user}
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={updateTask}
        />
      )}
    </div>
  );
}