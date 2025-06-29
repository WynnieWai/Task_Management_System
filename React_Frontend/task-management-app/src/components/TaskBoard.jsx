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

import React, { useEffect, useState } from "react";
import { getProjectsWithTasks } from "../API/TaskBoardAPI";
import TaskDetail from "./TaskDetail";

export default function TaskBoard({ user }) {
  const [projects, setProjects] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  // Load projects with tasks on mount
  useEffect(() => {
    getProjectsWithTasks()
      .then(setProjects)
      .catch(e => alert("Failed to load projects: " + e));
  }, []);

  if (!user || !["manager", "contributor"].includes(user.role.toLowerCase())) {
    return <div className="p-8">Access Denied</div>;
  }

  // Helper to update a single task inside its project
  const handleTaskUpdate = (updatedTask) => {
    setProjects(prev =>
      prev.map(project =>
        // Find the project the task belongs to
        project.id === (selectedTask?.project?.id ?? updatedTask.projectId)
          ? {
              ...project,
              tasks: project.tasks.map(t =>
                t.id === updatedTask.id ? updatedTask : t
              ),
            }
          : project
      )
    );
    setSelectedTask(null); // Close modal after update
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">All Projects</h1>
      {projects.map(project => (
        <div key={project.id} className="mb-12">
          <div className="mb-2 text-xl font-bold">{project.name}:</div>
          <div className="grid grid-cols-4 gap-4 bg-white rounded-xl shadow p-6">
            {["To-Do", "In Progress", "Done", "All Tasks"].map((status) => (
              <div key={status} className="bg-gray-100 rounded-lg p-4 min-h-[180px]">
                <div className="font-semibold mb-2">{status}</div>
                {status !== "All Tasks"
                  ? project.tasks.filter(t => t.status === status).map(task => (
                      <div
                        key={task.id}
                        className="bg-white p-2 rounded mb-2 shadow cursor-pointer hover:bg-blue-100"
                        onClick={() => setSelectedTask({ task, project })}
                      >
                        {task.title}
                      </div>
                    ))
                  : project.tasks.map(task => (
                      <div
                        key={task.id}
                        className="bg-white p-2 rounded mb-2 shadow cursor-pointer hover:bg-blue-100"
                        onClick={() => setSelectedTask({ task, project })}
                      >
                        {task.title}
                      </div>
                    ))}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal for task details */}
      {selectedTask && (
        <TaskDetail
          user={user}
          task={selectedTask.task}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleTaskUpdate}
        />
      )}
    </div>
  );
}
