// // import React from "react";

// // export default function TaskBoard({ user }) {
// //   return (
// //     <div className="p-8">
// //       <h1 className="text-2xl font-bold mb-4">Task Board</h1>
// //       <div className="flex gap-4">
// //         <div className="flex-1 bg-gray-100 p-4 rounded shadow">
// //           <h2 className="font-semibold mb-2">To-Do</h2>
// //           <div className="bg-white p-2 rounded mb-2">Task 1</div>
// //           <div className="bg-white p-2 rounded mb-2">Task 2</div>
// //         </div>
// //         <div className="flex-1 bg-gray-100 p-4 rounded shadow">
// //           <h2 className="font-semibold mb-2">In Progress</h2>
// //           <div className="bg-white p-2 rounded mb-2">Task 3</div>
// //         </div>
// //         <div className="flex-1 bg-gray-100 p-4 rounded shadow">
// //           <h2 className="font-semibold mb-2">Done</h2>
// //           <div className="bg-white p-2 rounded mb-2">Task 4</div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // } 

// import React, { useEffect, useState } from "react";
// import { getProjectsWithTasks } from "../API/TaskBoardAPI";
// import TaskDetail from "./TaskDetail";

// export default function TaskBoard({ user }) {
//   const [projects, setProjects] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null);

//   // Load projects with tasks on mount
//   useEffect(() => {
//     getProjectsWithTasks()
//       .then(setProjects)
//       .catch(e => alert("Failed to load projects: " + e));
//   }, []);

//   if (!user || !["manager", "contributor"].includes(user.role.toLowerCase())) {
//     return <div className="p-8">Access Denied</div>;
//   }

//   // Helper to update a single task inside its project
//   const handleTaskUpdate = (updatedTask) => {
//     setProjects(prev =>
//       prev.map(project =>
//         // Find the project the task belongs to
//         project.id === (selectedTask?.project?.id ?? updatedTask.projectId)
//           ? {
//               ...project,
//               tasks: project.tasks.map(t =>
//                 t.id === updatedTask.id ? updatedTask : t
//               ),
//             }
//           : project
//       )
//     );
//     setSelectedTask(null); // Close modal after update
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">All Projects</h1>
//       {projects.map(project => (
//         <div key={project.id} className="mb-12">
//           <div className="mb-2 text-xl font-bold">{project.name}:</div>
//           <div className="grid grid-cols-4 gap-4 bg-white rounded-xl shadow p-6">
//             {["To-Do", "In Progress", "Done", "All Tasks"].map((status) => (
//               <div key={status} className="bg-gray-100 rounded-lg p-4 min-h-[180px]">
//                 <div className="font-semibold mb-2">{status}</div>
//                 {status !== "All Tasks"
//                   ? project.tasks.filter(t => t.status === status).map(task => (
//                       <div
//                         key={task.id}
//                         className="bg-white p-2 rounded mb-2 shadow cursor-pointer hover:bg-blue-100"
//                         onClick={() => setSelectedTask({ task, project })}
//                       >
//                         {task.title}
//                       </div>
//                     ))
//                   : project.tasks.map(task => (
//                       <div
//                         key={task.id}
//                         className="bg-white p-2 rounded mb-2 shadow cursor-pointer hover:bg-blue-100"
//                         onClick={() => setSelectedTask({ task, project })}
//                       >
//                         {task.title}
//                       </div>
//                     ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}

//       {/* Modal for task details */}
//       {selectedTask && (
//         <TaskDetail
//           user={user}
//           task={selectedTask.task}
//           onClose={() => setSelectedTask(null)}
//           onUpdate={handleTaskUpdate}
//         />
//       )}
//     </div>
//   );
// }


// // Latest version
// import { CalendarDaysIcon } from '@heroicons/react/24/solid';
// import React, { useEffect, useState } from "react";
// import { getProjectsWithTasks } from "../API/TaskBoardAPI";
// import TaskDetail from "./TaskDetail";

// // Header badge colors for each column
// const headerColors = {
//   "To-Do": "bg-gray-400 text-white",
//   "In Progress": "bg-yellow-500 text-white",
//   Done: "bg-green-500 text-white",
//   "All Tasks": "bg-blue-900 text-white", // customize if needed
// };

// // You may want to remap your priority/status/due color logic here for badge rendering

// export default function TaskBoard({ user }) {
//   const [projects, setProjects] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null);

//   // Load projects and their tasks from backend API
//   useEffect(() => {
//     getProjectsWithTasks()
//       .then(setProjects)
//       .catch(e => alert("Failed to load projects: " + e));
//   }, []);

//   // Load projects and their tasks from backend API
//   // useEffect(() => {
//   //   getProjectsWithTasks()
//   //     .then((allProjects) => {
//   //       // Filter projects based on user role
//   //       let filteredProjects = [];
//   //       if (user.role.toLowerCase() === "manager") {
//   //         // Manager: projects where user is assigned manager
//   //         filteredProjects = allProjects.filter(
//   //           (p) => p.manager === user.username
//   //         );
//   //         // Show all tasks in those projects
//   //       } else if (user.role.toLowerCase() === "contributor") {
//   //         // Contributor: projects where user is a member
//   //         filteredProjects = allProjects
//   //           .filter(
//   //             (p) =>
//   //               Array.isArray(p.members)
//   //                 ? p.members.includes(user.username)
//   //                 : (typeof p.members === "string" && p.members.split(",").map(m => m.trim()).includes(user.username))
//   //           )
//   //           .map((p) => ({
//   //             ...p,
//   //             // Only show tasks assigned to this user
//   //             tasks: (p.tasks || []).filter((t) =>
//   //               Array.isArray(t.members)
//   //                 ? t.members.includes(user.username)
//   //                 : (typeof t.members === "string" && t.members.split(",").map(m => m.trim()).includes(user.username))
//   //             ),
//   //           }));
//   //       }
//   //       setProjects(filteredProjects);
//   //     })
//   //     .catch(e => alert("Failed to load projects: " + e));
//   // }, [user]);

//   // Handle updates to a single task
//   const handleTaskUpdate = (updatedTask) => {
//     setProjects(prev =>
//       prev.map(project =>
//         project.id === updatedTask.projectId
//           ? {
//               ...project,
//               tasks: project.tasks.map(t =>
//                 t.id === updatedTask.id ? updatedTask : t
//               ),
//             }
//           : project
//       )
//     );
//     setSelectedTask(null);
//   };

//   // For role-based access
//   if (!user || !["manager", "contributor"].includes(user.role?.toLowerCase())) {
//     return <div className="p-8">Access Denied</div>;
//   }

//   // Helper for badge color by status
//   const statusBadgeClass = (status) =>
//     status === "Done"
//       ? "bg-green-100 text-green-800"
//       : status === "In Progress"
//       ? "bg-yellow-100 text-yellow-800"
//       : "bg-gray-200 text-gray-800";

//   // Helper for badge color by priority
//   const priorityBadgeClass = (priority) =>
//     priority === "High"
//       ? "bg-red-200 text-red-800"
//       : priority === "Medium"
//       ? "bg-orange-200 text-orange-800"
//       : "bg-blue-200 text-blue-800";

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">All Projects</h1>
//       {projects.map(project => (
//         <div key={project.id} className="mb-12">
//           <div className="mb-2 text-xl font-bold">{project.name}:</div>
//           <div className="grid grid-cols-4 gap-4">
//             {["To-Do", "In Progress", "Done", "All Tasks"].map(status => {
//               // For each column, select tasks for the status (or all)
//               const tasksInColumn =
//                 status !== "All Tasks"
//                   ? project.tasks.filter(t => t.status === status)
//                   : project.tasks;

//               return (
//                 <div
//                   key={status}
//                   className="rounded-lg overflow-hidden shadow border border-gray-200"
//                 >
//                   {/* Header */}
//                   <div className={`${headerColors[status]} px-4 py-2 font-semibold text-base flex justify-between items-center`}>
//                     <span>{status}</span>
//                     <span className="text-sm">{tasksInColumn.length}</span>
//                   </div>
//                   {/* Tasks List */}
//                   <div className="bg-gray-100 p-4 min-h-[180px] font-medium text-sm">
//                     {tasksInColumn.map(task => (
//                       <div
//                         key={task.id}
//                         className="bg-white p-3 rounded-lg mb-3 shadow border cursor-pointer hover:bg-gray-50"
//                         onClick={() => setSelectedTask({ ...task, projectTitle: project.name, projectId: project.id })}
//                       >
//                         {/* Title */}
//                         <div className="text-sm font-semibold mb-3">{task.title}</div>
//                         {/* Badges */}
//                         <div className="flex items-center gap-2 mb-2 flex-wrap">
//                           <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${statusBadgeClass(task.status)}`}>
//                             {task.status}
//                           </span>
//                           <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full flex items-center gap-1">
//                             <CalendarDaysIcon className="h-4 w-4" />
//                             {task.dueDate ? task.dueDate.split('T')[0] : ''}
//                           </span>
//                           <span className={`text-xs px-2 py-1 rounded-full ${priorityBadgeClass(task.priority)}`}>
//                             {task.priority}
//                           </span>
//                         </div>
//                         {/* Description */}
//                         <div className="text-xs text-gray-700 mb-2">{task.description}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ))}
//       {/* Task Detail Modal */}
//       {selectedTask && (
//         <TaskDetail
//           user={user}
//           task={selectedTask}
//           onClose={() => setSelectedTask(null)}
//           onUpdate={handleTaskUpdate}
//         />
//       )}
//     </div>
//   );
// }


// Last Correct Version
// import { CalendarDaysIcon } from '@heroicons/react/24/solid';
// import React, { useEffect, useState } from "react";
// import { getProjectsWithTasks } from "../API/TaskBoardAPI";
// import TaskDetail from "./TaskDetail";

// // Header badge colors for each column
// const headerColors = {
//   "To-Do": "bg-gray-400 text-white",
//   "In Progress": "bg-yellow-500 text-white",
//   Done: "bg-green-500 text-white",
//   "All Tasks": "bg-blue-900 text-white", // customize if needed
// };

// // You may want to remap your priority/status/due color logic here for badge rendering

// export default function TaskBoard({ user }) {
//   const [projects, setProjects] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null);

//   // Load projects and their tasks from backend API
//   useEffect(() => {
//     getProjectsWithTasks()
//       .then(setProjects)
//       .catch(e => alert("Failed to load projects: " + e));
//   }, []);

//   useEffect(() => {
//     getProjectsWithTasks()
//       .then((allProjects) => {
//         let filteredProjects = [];
//         if (user.role.toLowerCase() === "manager") {
//           // Manager: projects where user is assigned manager
//           filteredProjects = allProjects.filter(
//             (p) => p.manager === user.username
//           );
//           // Show all tasks in those projects
//         } else if (user.role.toLowerCase() === "contributor") {
//           // Contributor: projects where user is a member
//           filteredProjects = allProjects
//             .filter(
//               (p) =>
//                 Array.isArray(p.members)
//                   ? p.members.includes(user.username)
//                   : (typeof p.members === "string" && p.members.split(",").map(m => m.trim()).includes(user.username))
//             )
//             .map((p) => ({
//               ...p,
//               // Only show tasks assigned to this user
//               tasks: (p.tasks || []).filter((t) =>
//                 Array.isArray(t.members)
//                   ? t.members.includes(user.username)
//                   : (typeof t.members === "string" && t.members.split(",").map(m => m.trim()).includes(user.username))
//               ),
//             }));
//         }
//         setProjects(filteredProjects);
//       })
//       .catch(e => alert("Failed to load projects: " + e));
//   }, [user]);

//   // Handle updates to a single task
//   const handleTaskUpdate = (updatedTask) => {
//     setProjects(prev =>
//       prev.map(project =>
//         project.id === updatedTask.projectId
//           ? {
//               ...project,
//               tasks: project.tasks.map(t =>
//                 t.id === updatedTask.id ? updatedTask : t
//               ),
//             }
//           : project
//       )
//     );
//     setSelectedTask(null);
//   };

//   // For role-based access
//   if (!user || !["manager", "contributor"].includes(user.role?.toLowerCase())) {
//     return <div className="p-8">Access Denied</div>;
//   }

//   // Helper for badge color by status
//   const statusBadgeClass = (status) =>
//     status === "Done"
//       ? "bg-green-100 text-green-800"
//       : status === "In Progress"
//       ? "bg-yellow-100 text-yellow-800"
//       : "bg-gray-200 text-gray-800";

//   // Helper for badge color by priority
//   const priorityBadgeClass = (priority) =>
//     priority === "High"
//       ? "bg-red-200 text-red-800"
//       : priority === "Medium"
//       ? "bg-orange-200 text-orange-800"
//       : "bg-blue-200 text-blue-800";

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">All Projects</h1>
//       {projects.map(project => (
//         <div key={project.id} className="mb-12">
//           <div className="mb-2 text-xl font-bold">{project.name}:</div>
//           <div className="grid grid-cols-4 gap-4">
//             {["To-Do", "In Progress", "Done", "All Tasks"].map(status => {
//               // For each column, select tasks for the status (or all)
//               const tasksInColumn =
//                 status !== "All Tasks"
//                   ? project.tasks.filter(t => t.status === status)
//                   : project.tasks;

//               return (
//                 <div
//                   key={status}
//                   className="rounded-lg overflow-hidden shadow border border-gray-200"
//                 >
//                   {/* Header */}
//                   <div className={`${headerColors[status]} px-4 py-2 font-semibold text-base flex justify-between items-center`}>
//                     <span>{status}</span>
//                     <span className="text-sm">{tasksInColumn.length}</span>
//                   </div>
//                   {/* Tasks List */}
//                   <div className="bg-gray-100 p-4 min-h-[180px] font-medium text-sm">
//                     {tasksInColumn.map(task => (
//                       <div
//                         key={task.id}
//                         className="bg-white p-3 rounded-lg mb-3 shadow border cursor-pointer hover:bg-gray-50"
//                         onClick={() => setSelectedTask({ ...task, projectTitle: project.name, projectId: project.id })}
//                       >
//                         {/* Title */}
//                         <div className="text-sm font-semibold mb-3">{task.title}</div>
//                         {/* Badges */}
//                         <div className="flex items-center gap-2 mb-2 flex-wrap">
//                           <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${statusBadgeClass(task.status)}`}>
//                             {task.status}
//                           </span>
//                           <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full flex items-center gap-1">
//                             <CalendarDaysIcon className="h-4 w-4" />
//                             {task.dueDate ? task.dueDate.split('T')[0] : ''}
//                           </span>
//                           <span className={`text-xs px-2 py-1 rounded-full ${priorityBadgeClass(task.priority)}`}>
//                             {task.priority}
//                           </span>
//                         </div>
//                         {/* Description */}
//                         <div className="text-xs text-gray-700 mb-2">{task.description}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ))}
//       {/* Task Detail Modal */}
//       {selectedTask && (
//         <TaskDetail
//           user={user}
//           task={selectedTask}
//           onClose={() => setSelectedTask(null)}
//           onUpdate={handleTaskUpdate}
//         />
//       )}
//     </div>
//   );
// }

// Latest Debugging
// import { CalendarDaysIcon } from '@heroicons/react/24/solid';
// import React, { useEffect, useState } from "react";
// import { getProjectsWithTasks } from "../API/TaskBoardAPI";
// import TaskDetail from "./TaskDetail";

// // Header badge colors for each column
// const headerColors = {
//   "To-Do": "bg-gray-400 text-white",
//   "In Progress": "bg-yellow-500 text-white",
//   Done: "bg-green-500 text-white",
//   "All Tasks": "bg-blue-900 text-white", // customize if needed
// };

// // You may want to remap your priority/status/due color logic here for badge rendering

// export default function TaskBoard({ user }) {
//   const [projects, setProjects] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null);

//   useEffect(() => {
//     const reload = () => {
//       // re-fetch projects/users
//       getAllUsers().then(setAllUsers);
//       // ...fetch projects/tasks as above...
//     };
//     window.addEventListener('userRoleChanged', reload);
//     window.addEventListener('userStatusChanged', reload);
//     return () => {
//       window.removeEventListener('userRoleChanged', reload);
//       window.removeEventListener('userStatusChanged', reload);
//     };
//   }, []);

//   // Load projects and their tasks from backend API
//   useEffect(() => {
//     getProjectsWithTasks()
//       .then(setProjects)
//       .catch(e => alert("Failed to load projects: " + e));
//   }, []);

//   useEffect(() => {
//     getProjectsWithTasks()
//       .then((allProjects) => {
//         let filteredProjects = [];
//         if (user.role.toLowerCase() === "manager") {
//           // Manager: projects where user is assigned manager
//           filteredProjects = allProjects.filter(
//             (p) => p.manager === user.username
//           );
//           // Show all tasks in those projects
//         } else if (user.role.toLowerCase() === "contributor") {
//           // Contributor: projects where user is a member
//           filteredProjects = allProjects
//             .filter(
//               (p) =>
//                 Array.isArray(p.members)
//                   ? p.members.includes(user.username)
//                   : (typeof p.members === "string" && p.members.split(",").map(m => m.trim()).includes(user.username))
//             )
//             .map((p) => ({
//               ...p,
//               // Only show tasks assigned to this user
//               tasks: (p.tasks || []).filter((t) =>
//                 Array.isArray(t.members)
//                   ? t.members.includes(user.username)
//                   : (typeof t.members === "string" && t.members.split(",").map(m => m.trim()).includes(user.username))
//               ),
//             }));
//         }
//         setProjects(filteredProjects);
//       })
//       .catch(e => alert("Failed to load projects: " + e));
//   }, [user]);

//   // Handle updates to a single task
//   const handleTaskUpdate = (updatedTask) => {
//     setProjects(prev =>
//       prev.map(project =>
//         project.id === updatedTask.projectId
//           ? {
//               ...project,
//               tasks: project.tasks.map(t =>
//                 t.id === updatedTask.id ? updatedTask : t
//               ),
//             }
//           : project
//       )
//     );
//     setSelectedTask(null);
//   };

//   // For role-based access
//   if (!user || !["manager", "contributor"].includes(user.role?.toLowerCase())) {
//     return <div className="p-8">Access Denied</div>;
//   }

//   // Helper for badge color by status
//   const statusBadgeClass = (status) =>
//     status === "Done"
//       ? "bg-green-100 text-green-800"
//       : status === "In Progress"
//       ? "bg-yellow-100 text-yellow-800"
//       : "bg-gray-200 text-gray-800";

//   // Helper for badge color by priority
//   const priorityBadgeClass = (priority) =>
//     priority === "High"
//       ? "bg-red-200 text-red-800"
//       : priority === "Medium"
//       ? "bg-orange-200 text-orange-800"
//       : "bg-blue-200 text-blue-800";

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">All Projects</h1>
//       {projects.map(project => (
//         <div key={project.id} className="mb-12">
//           <div className="mb-2 text-xl font-bold">{project.name}:</div>
//           <div className="grid grid-cols-4 gap-4">
//             {["To-Do", "In Progress", "Done", "All Tasks"].map(status => {
//               // For each column, select tasks for the status (or all)
//               const tasksInColumn =
//                 status !== "All Tasks"
//                   ? project.tasks.filter(t => t.status === status)
//                   : project.tasks;

//               return (
//                 <div
//                   key={status}
//                   className="rounded-lg overflow-hidden shadow border border-gray-200"
//                 >
//                   {/* Header */}
//                   <div className={`${headerColors[status]} px-4 py-2 font-semibold text-base flex justify-between items-center`}>
//                     <span>{status}</span>
//                     <span className="text-sm">{tasksInColumn.length}</span>
//                   </div>
//                   {/* Tasks List */}
//                   <div className="bg-gray-100 p-4 min-h-[180px] font-medium text-sm">
//                     {tasksInColumn.map(task => (
//                       <div
//                         key={task.id}
//                         className="bg-white p-3 rounded-lg mb-3 shadow border cursor-pointer hover:bg-gray-50"
//                         onClick={() => setSelectedTask({ ...task, projectTitle: project.name, projectId: project.id })}
//                       >
//                         {/* Title */}
//                         <div className="text-sm font-semibold mb-3">{task.title}</div>
//                         {/* Badges */}
//                         <div className="flex items-center gap-2 mb-2 flex-wrap">
//                           <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${statusBadgeClass(task.status)}`}>
//                             {task.status}
//                           </span>
//                           <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full flex items-center gap-1">
//                             <CalendarDaysIcon className="h-4 w-4" />
//                             {task.dueDate ? task.dueDate.split('T')[0] : ''}
//                           </span>
//                           <span className={`text-xs px-2 py-1 rounded-full ${priorityBadgeClass(task.priority)}`}>
//                             {task.priority}
//                           </span>
//                         </div>
//                         {/* Description */}
//                         <div className="text-xs text-gray-700 mb-2">{task.description}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ))}
//       {/* Task Detail Modal */}
//       {selectedTask && (
//         <TaskDetail
//           user={user}
//           task={selectedTask}
//           onClose={() => setSelectedTask(null)}
//           onUpdate={handleTaskUpdate}
//         />
//       )}
//     </div>
//   );
// }

import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from "react";
import { getProjectsWithTasks } from "../API/TaskBoardAPI";
import { getAllUsers } from '../API/ProjectAPI';
import TaskDetail from "./TaskDetail";

// Header badge colors for each column
const headerColors = {
  "To-Do": "bg-gray-400 text-white",
  "In Progress": "bg-yellow-500 text-white",
  Done: "bg-green-500 text-white",
  "All Tasks": "bg-blue-900 text-white",
};

export default function TaskBoard({ user }) {
  const [projects, setProjects] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  
  // Load all users to check manager status
  useEffect(() => {
    getAllUsers()
      .then(setAllUsers)
      .catch(e => console.error("Failed to load users: ", e));
  }, []);

  
  // Filter projects based on user role and manager status
  // const filterProjects = (allProjects) => {
  //   if (!allUsers.length) return [];
    
  //   // Create a map of managers and their status
  //   const managerStatus = {};
  //   allUsers.forEach(u => {
  //     managerStatus[u.username] = {
  //       role: u.role?.toLowerCase(),
  //       isLocked: u.isLocked
  //     };
  //   });

  //   let filteredProjects = [];
    
  //   if (user.role.toLowerCase() === "manager") {
  //     // Manager: projects where user is assigned manager
  //     filteredProjects = allProjects.filter(
  //       (p) => p.manager === user.username
  //     );
  //   } else if (user.role.toLowerCase() === "contributor") {
  //     // Contributor: projects where user is a member
  //     filteredProjects = allProjects
  //       .filter(p => {
  //         // First check if the project manager is still valid
  //         const managerInfo = managerStatus[p.manager] || {};
  //         if (managerInfo.role !== 'manager' || managerInfo.isLocked) {
  //           return false; // Remove project if manager is invalid
  //         }
          
  //         // Then check if current user is a member
  //         return Array.isArray(p.members)
  //           ? p.members.includes(user.username)
  //           : (typeof p.members === "string" && p.members.split(",").map(m => m.trim()).includes(user.username));
  //       })
  //       .map((p) => ({
  //         ...p,
  //         // Only show tasks assigned to this user
  //         tasks: (p.tasks || []).filter((t) =>
  //           Array.isArray(t.members)
  //             ? t.members.includes(user.username)
  //             : (typeof t.members === "string" && t.members.split(",").map(m => m.trim()).includes(user.username))
  //         ),
  //       }));
  //   }

  //   // Additional filter for manager view to remove projects with invalid managers
  //   if (user.role.toLowerCase() === "manager") {
  //     filteredProjects = filteredProjects.filter(p => {
  //       const managerInfo = managerStatus[p.manager] || {};
  //       return managerInfo.role === 'manager' && !managerInfo.isLocked;
  //     });
  //   }

  //   return filteredProjects;
  // };

  // Filter projects based on user role and manager status
  const filterProjects = (allProjects) => {
    if (!allUsers.length) return [];
    
    // Create a map of managers and their status
    const managerStatus = {};
    allUsers.forEach(u => {
      managerStatus[u.username] = {
        role: u.role?.toLowerCase(),
        status: u.status,  // "Active" or "Locked"
        isLocked: u.isLocked // Just in case, we'll check both
      };
    });

    let filteredProjects = [];
    
    if (user.role.toLowerCase() === "manager") {
      // Manager: projects where user is assigned manager and is active
      filteredProjects = allProjects.filter(
        (p) => p.manager === user.username && 
              managerStatus[p.manager]?.status !== "Locked" && 
              !managerStatus[p.manager]?.isLocked
      );
    } else if (user.role.toLowerCase() === "contributor") {
      // Contributor: projects where user is a member and manager is valid
      filteredProjects = allProjects
        .filter(p => {
          const managerInfo = managerStatus[p.manager] || {};
          
          // Remove project if:
          // 1. Manager is not a manager role
          // 2. Manager is locked (check both status and isLocked)
          // 3. Current user is not a member
          if (managerInfo.role !== 'manager' || 
              managerInfo.status === "Locked" || 
              managerInfo.isLocked) {
            return false;
          }
          
          return Array.isArray(p.members)
            ? p.members.includes(user.username)
            : (typeof p.members === "string" && p.members.split(",").map(m => m.trim()).includes(user.username));
        })
        .map((p) => ({
          ...p,
          // Only show tasks assigned to this user
          tasks: (p.tasks || []).filter((t) =>
            Array.isArray(t.members)
              ? t.members.includes(user.username)
              : (typeof t.members === "string" && t.members.split(",").map(m => m.trim()).includes(user.username))
          ),
        }));
    }

    return filteredProjects;
  };

  // Load projects and filter them
  useEffect(() => {
    getProjectsWithTasks()
      .then(allProjects => {
        setProjects(filterProjects(allProjects));
      })
      .catch(e => alert("Failed to load projects: " + e));
  }, [allUsers]); // Re-filter when users data changes

  // Handle user role/status changes
  useEffect(() => {
    const reload = () => {
      getAllUsers().then(users => {
        setAllUsers(users);
        getProjectsWithTasks()
          .then(allProjects => setProjects(filterProjects(allProjects)))
          .catch(e => console.error("Failed to reload projects: ", e));
      });
    };
    
    window.addEventListener('userRoleChanged', reload);
    window.addEventListener('userStatusChanged', reload);
    
    return () => {
      window.removeEventListener('userRoleChanged', reload);
      window.removeEventListener('userStatusChanged', reload);
    };
  }, [user]);

  // Rest of the component remains the same...
  const handleTaskUpdate = (updatedTask) => {
    setProjects(prev =>
      prev.map(project =>
        project.id === updatedTask.projectId
          ? {
              ...project,
              tasks: project.tasks.map(t =>
                t.id === updatedTask.id ? updatedTask : t
              ),
            }
          : project
      )
    );
    setSelectedTask(null);
  };

  const statusBadgeClass = (status) =>
    status === "Done"
      ? "bg-green-100 text-green-800"
      : status === "In Progress"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-gray-200 text-gray-800";

  const priorityBadgeClass = (priority) =>
    priority === "High"
      ? "bg-red-200 text-red-800"
      : priority === "Medium"
      ? "bg-orange-200 text-orange-800"
      : "bg-blue-200 text-blue-800";

  if (!user || !["manager", "contributor"].includes(user.role?.toLowerCase())) {
    return <div className="p-8">Access Denied</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">All Projects</h1>
      {projects.length === 0 ? (
        <div className="text-gray-500">No projects available</div>
      ) : (
        projects.map(project => (
          <div key={project.id} className="mb-12">
            <div className="mb-2 text-xl font-bold">{project.name}:</div>
            <div className="grid grid-cols-4 gap-4">
              {["To-Do", "In Progress", "Done", "All Tasks"].map(status => {
                const tasksInColumn =
                  status !== "All Tasks"
                    ? project.tasks.filter(t => t.status === status)
                    : project.tasks;

                return (
                  <div
                    key={status}
                    className="rounded-lg overflow-hidden shadow border border-gray-200"
                  >
                    <div className={`${headerColors[status]} px-4 py-2 font-semibold text-base flex justify-between items-center`}>
                      <span>{status}</span>
                      <span className="text-sm">{tasksInColumn.length}</span>
                    </div>
                    <div className="bg-gray-100 p-4 min-h-[180px] font-medium text-sm">
                      {tasksInColumn.map(task => (
                        <div
                          key={task.id}
                          className="bg-white p-3 rounded-lg mb-3 shadow border cursor-pointer hover:bg-gray-50"
                          onClick={() => setSelectedTask({ ...task, projectTitle: project.name, projectId: project.id })}
                        >
                          <div className="text-sm font-semibold mb-3">{task.title}</div>
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${statusBadgeClass(task.status)}`}>
                              {task.status}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full flex items-center gap-1">
                              <CalendarDaysIcon className="h-4 w-4" />
                              {task.dueDate ? task.dueDate.split('T')[0] : ''}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${priorityBadgeClass(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>
                          <div className="text-xs text-gray-700 mb-2">{task.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
      {selectedTask && (
        <TaskDetail
          user={user}
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleTaskUpdate}
        />
      )}
    </div>
  );
}