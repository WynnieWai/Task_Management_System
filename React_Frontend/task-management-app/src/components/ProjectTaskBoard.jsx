import React, { useState } from "react";
import TaskDetail from "./TaskDetail";

export default function ProjectTaskBoard({ user, tasks: initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  return (
    <div className="p-4 bg-white rounded shadow">
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
        <div className="flex-1 bg-gray-100 p-4 rounded shadow">
          <h2 className="font-semibold mb-2">All Tasks</h2>
          {tasks.map(task => (
            <div
              key={task.id}
              className="bg-white p-2 rounded mb-2 cursor-pointer hover:bg-blue-100"
              onClick={() => setSelectedTask(task)}
            >
              {task.title}
            </div>
          ))}
        </div>
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
