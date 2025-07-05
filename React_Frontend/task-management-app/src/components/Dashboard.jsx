// // import React from "react";
// // import {
// //   PieChart, Pie, Cell,
// //   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
// //   ResponsiveContainer
// // } from "recharts";

// // export default function Dashboard({ user }) {
// //   // Dummy data
// //   const totalUsers = 5;
// //   const totalProjects = 8;

// //   const projectsByStatus = [
// //     { name: "Active", value: 3 },
// //     { name: "Archived", value: 2 },
// //   ];

// //   const projectsByManager = [
// //     { manager: "Alice", projects: 2 },
// //     { manager: "Bob", projects: 3 },
// //     { manager: "Charlie", projects: 3 },
// //   ];

// //   const COLORS = ["#FBBF24", "#10B981", "#3B82F6"]; // yellow, green, blue

// //   // Manager dummy data
// //   const managedProjects = 4;
// //   const totalTasks = 20;
// //   const completedTasks = 12;
// //   const pendingTasks = totalTasks - completedTasks;
// //   const teamMembers = 7;

// //   const projectProgress = [
// //     { name: "Project Alpha", progress: 80 },
// //     { name: "Project Beta", progress: 55 },
// //   ];

// //   const upcomingDeadlines = [
// //     { task: "Design UI", due: "2025-07-01" },
// //     { task: "Setup Backend", due: "2025-07-03" },
// //     { task: "Write Docs", due: "2025-07-05" },
// //   ];

// //   // Contributor dummy data
// //   const assignedProjects = 3;
// //   const assignedTasks = 10;
// //   const tasksCompleted = 5;
// //   const tasksInProgress = 3;
// //   const tasksPending = assignedTasks - tasksCompleted - tasksInProgress;

// //   const contributorTaskStatus = [
// //     { name: "Completed", value: tasksCompleted },
// //     { name: "In Progress", value: tasksInProgress },
// //     { name: "Pending", value: tasksPending },
// //   ];

// //   const recentActivity = [
// //     { activity: "Submitted project report", date: "2025-06-28" },
// //     { activity: "Updated task status to Done", date: "2025-06-27" },
// //     { activity: "Joined Project Beta", date: "2025-06-25" },
// //   ];

// //   const TASK_COLORS = ["#10B981", "#FBBF24", "#EF4444"]; // green, yellow, red

// //   return (
// //     <div className="p-8">
// //       <h1 className="text-2xl font-bold mb-6">
// //         Welcome, {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
// //       </h1>

// //       {user.role === "admin" && (
// //         <>
// //           {/* Admin Summary cards */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
// //             <div className="bg-white shadow rounded p-4 text-center">
// //               <h2 className="text-gray-500">Total Users</h2>
// //               <p className="text-3xl font-bold">{totalUsers}</p>
// //             </div>
// //             <div className="bg-white shadow rounded p-4 text-center">
// //               <h2 className="text-gray-500">Total Projects</h2>
// //               <p className="text-3xl font-bold">{totalProjects}</p>
// //             </div>
// //           </div>

// //           {/* Admin Charts */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //             <div className="bg-white shadow rounded p-4">
// //               <h2 className="text-lg font-semibold mb-4">Projects by Status</h2>
// //               <ResponsiveContainer width="100%" height={300}>
// //                 <PieChart>
// //                   <Pie
// //                     data={projectsByStatus}
// //                     dataKey="value"
// //                     nameKey="name"
// //                     outerRadius={100}
// //                     label
// //                   >
// //                     {projectsByStatus.map((entry, index) => (
// //                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// //                     ))}
// //                   </Pie>
// //                   <Tooltip />
// //                   <Legend />
// //                 </PieChart>
// //               </ResponsiveContainer>
// //             </div>

// //             <div className="bg-white shadow rounded p-4">
// //               <h2 className="text-lg font-semibold mb-4">Projects by Project Manager</h2>
// //               <ResponsiveContainer width="100%" height={300}>
// //                 <BarChart data={projectsByManager}>
// //                   <CartesianGrid strokeDasharray="3 3" />
// //                   <XAxis dataKey="manager" />
// //                   <YAxis />
// //                   <Tooltip />
// //                   <Legend />
// //                   <Bar dataKey="projects" fill="#3B82F6" />
// //                 </BarChart>
// //               </ResponsiveContainer>
// //             </div>
// //           </div>
// //         </>
// //       )}

// //       {user.role === "manager" && (
// //         <>
// //           {/* Manager Summary cards */}
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
// //             <div className="bg-white shadow rounded p-4 text-center">
// //               <h2 className="text-gray-500">Projects Managed</h2>
// //               <p className="text-3xl font-bold">{managedProjects}</p>
// //             </div>
// //             <div className="bg-white shadow rounded p-4 text-center">
// //               <h2 className="text-gray-500">Total Tasks</h2>
// //               <p className="text-3xl font-bold">{totalTasks}</p>
// //             </div>
// //             <div className="bg-white shadow rounded p-4 text-center">
// //               <h2 className="text-gray-500">Team Members</h2>
// //               <p className="text-3xl font-bold">{teamMembers}</p>
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //             {/* Task Completion Pie Chart */}
// //             <div className="bg-white shadow rounded p-4">
// //               <h2 className="text-lg font-semibold mb-4">Task Completion</h2>
// //               <ResponsiveContainer width="100%" height={300}>
// //                 <PieChart>
// //                   <Pie
// //                     data={[
// //                       { name: "Completed", value: completedTasks },
// //                       { name: "Pending", value: pendingTasks },
// //                     ]}
// //                     dataKey="value"
// //                     nameKey="name"
// //                     outerRadius={100}
// //                     label
// //                   >
// //                     <Cell fill="#10B981" />
// //                     <Cell fill="#FBBF24" />
// //                   </Pie>
// //                   <Tooltip />
// //                   <Legend />
// //                 </PieChart>
// //               </ResponsiveContainer>
// //             </div>

// //             {/* Project Progress */}
// //             <div className="bg-white shadow rounded p-4">
// //               <h2 className="text-lg font-semibold mb-4">Project Progress</h2>
// //               {projectProgress.map((proj, idx) => (
// //                 <div key={idx} className="mb-4">
// //                   <div className="flex justify-between mb-1">
// //                     <p className="text-gray-600">{proj.name}</p>
// //                     <p className="text-gray-600">{proj.progress}%</p>
// //                   </div>
// //                   <div className="bg-gray-200 rounded-full h-4 w-full">
// //                     <div
// //                       className="bg-blue-600 h-4 rounded-full"
// //                       style={{ width: `${proj.progress}%` }}
// //                     ></div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Upcoming Deadlines */}
// //           <div className="bg-white shadow rounded p-4 mt-8">
// //             <h2 className="text-lg font-semibold mb-4">Upcoming Deadlines</h2>
// //             <ul className="list-disc pl-5 text-gray-700">
// //               {upcomingDeadlines.map((task, idx) => (
// //                 <li key={idx}>
// //                   {task.task} - due {task.due}
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         </>
// //       )}

// //       {user.role === "contributor" && (
// //         <>
// //           {/* Contributor Summary Cards */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
// //             <div className="bg-white shadow rounded p-4 text-center">
// //               <h2 className="text-gray-500">Projects Assigned</h2>
// //               <p className="text-3xl font-bold">{assignedProjects}</p>
// //             </div>
// //             <div className="bg-white shadow rounded p-4 text-center">
// //               <h2 className="text-gray-500">Tasks Assigned</h2>
// //               <p className="text-3xl font-bold">{assignedTasks}</p>
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //             {/* Task Status Pie Chart */}
// //             <div className="bg-white shadow rounded p-4">
// //               <h2 className="text-lg font-semibold mb-4">Task Status</h2>
// //               <ResponsiveContainer width="100%" height={300}>
// //                 <PieChart>
// //                   <Pie
// //                     data={contributorTaskStatus}
// //                     dataKey="value"
// //                     nameKey="name"
// //                     outerRadius={100}
// //                     label
// //                   >
// //                     {contributorTaskStatus.map((entry, index) => (
// //                       <Cell key={`cell-${index}`} fill={TASK_COLORS[index % TASK_COLORS.length]} />
// //                     ))}
// //                   </Pie>
// //                   <Tooltip />
// //                   <Legend />
// //                 </PieChart>
// //               </ResponsiveContainer>
// //             </div>

// //             {/* Upcoming Deadlines */}
// //             <div className="bg-white shadow rounded p-4">
// //               <h2 className="text-lg font-semibold mb-4">Upcoming Deadlines</h2>
// //               <ul className="list-disc pl-5 text-gray-700">
// //                 {upcomingDeadlines.map((task, idx) => (
// //                   <li key={idx}>
// //                     {task.task} - due {task.due}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           </div>

// //           {/* Recent Activity */}
// //           <div className="bg-white shadow rounded p-4 mt-8">
// //             <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
// //             <ul className="list-disc pl-5 text-gray-700">
// //               {recentActivity.map((act, idx) => (
// //                 <li key={idx}>
// //                   {act.activity} ({act.date})
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import { fetchAdminStats } from "../API/DashboardAPI";

// import axios from "axios";
// import {
//   PieChart, Pie, Cell,
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
//   ResponsiveContainer
// } from "recharts";

// const COLORS = ["#FBBF24", "#10B981", "#3B82F6"]; // yellow, green, blue
// const TASK_COLORS = ["#10B981", "#FBBF24", "#EF4444"]; // green, yellow, red

// export default function Dashboard({ user }) {
//   // Admin dynamic data
//   const [adminStats, setAdminStats] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Manager dummy data
//   const managedProjects = 4;
//   const totalTasks = 20;
//   const completedTasks = 12;
//   const pendingTasks = totalTasks - completedTasks;
//   const teamMembers = 7;
//   const projectProgress = [
//     { name: "Project Alpha", progress: 80 },
//     { name: "Project Beta", progress: 55 },
//   ];
//   const upcomingDeadlines = [
//     { task: "Design UI", due: "2025-07-01" },
//     { task: "Setup Backend", due: "2025-07-03" },
//     { task: "Write Docs", due: "2025-07-05" },
//   ];

//   // Contributor dummy data
//   const assignedProjects = 3;
//   const assignedTasks = 10;
//   const tasksCompleted = 5;
//   const tasksInProgress = 3;
//   const tasksPending = assignedTasks - tasksCompleted - tasksInProgress;
//   const contributorTaskStatus = [
//     { name: "Completed", value: tasksCompleted },
//     { name: "In Progress", value: tasksInProgress },
//     { name: "Pending", value: tasksPending },
//   ];
//   const recentActivity = [
//     { activity: "Submitted project report", date: "2025-06-28" },
//     { activity: "Updated task status to Done", date: "2025-06-27" },
//     { activity: "Joined Project Beta", date: "2025-06-25" },
//   ];

//   useEffect(() => {
//     if (user.role === "admin") {
//       setLoading(true);
//       setError(null);
//       fetchAdminStats()
//         .then(data => setAdminStats(data))
//         .catch(err => setError("Failed to load admin stats"))
//         .finally(() => setLoading(false));
//     }
//   }, [user.role]);
  

//   return (
//     <div className="p-8">
//       {/* <h1 className="text-2xl font-bold mb-6">
//         Welcome, {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
//       </h1> */}

//       <h1 className="text-2xl font-bold mb-6">
//         Welcome, {user.username
//           .split(" ")
//           .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//           .join(" ")}
//       </h1>

//       {user.role === "admin" && (
//         <>
//           {loading && <div>Loading admin dashboard...</div>}
//           {error && <div className="text-red-500">{error}</div>}
//           {adminStats && (
//           <>
//             {/* Admin Summary cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//               <div className="bg-white shadow rounded p-4 text-center">
//                 <h2 className="text-gray-500">Total Users</h2>
//                 <p className="text-3xl font-bold">{adminStats.totalUsers}</p>
//               </div>
//               <div className="bg-white shadow rounded p-4 text-center">
//                 <h2 className="text-gray-500">Total Projects</h2>
//                 <p className="text-3xl font-bold">{adminStats.totalProjects}</p>
//               </div>
//             </div>

//             {/* Admin Charts */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div className="bg-white shadow rounded p-4">
//                 <h2 className="text-lg font-semibold mb-4">Projects by Status</h2>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={adminStats.projectsByStatus.map((item) => ({
//                         name: item.status,
//                         value: item.count,
//                       }))}
//                       dataKey="value"
//                       nameKey="name"
//                       outerRadius={100}
//                       label
//                     >
//                       {adminStats.projectsByStatus.map((_, index) => (
//                         <Cell
//                           key={`cell-status-${index}`}
//                           fill={COLORS[index % COLORS.length]}
//                         />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>

//               <div className="bg-white shadow rounded p-4">
//                 <h2 className="text-lg font-semibold mb-4">Projects by Manager</h2>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart
//                     data={adminStats.projectsByManager.map((item) => ({
//                       manager: item.manager,
//                       projects: item.count,
//                     }))}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="manager" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="projects" fill="#3B82F6" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </>
//          )}
//         </> 
//       )}

//       {user.role === "manager" && (
//         <>
//           {/* Manager Summary cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//             <div className="bg-white shadow rounded p-4 text-center">
//               <h2 className="text-gray-500">Projects Managed</h2>
//               <p className="text-3xl font-bold">{managedProjects}</p>
//             </div>
//             <div className="bg-white shadow rounded p-4 text-center">
//               <h2 className="text-gray-500">Total Tasks</h2>
//               <p className="text-3xl font-bold">{totalTasks}</p>
//             </div>
//             <div className="bg-white shadow rounded p-4 text-center">
//               <h2 className="text-gray-500">Team Members</h2>
//               <p className="text-3xl font-bold">{teamMembers}</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Task Completion Pie Chart */}
//             <div className="bg-white shadow rounded p-4">
//               <h2 className="text-lg font-semibold mb-4">Task Completion</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={[
//                       { name: "Completed", value: completedTasks },
//                       { name: "Pending", value: pendingTasks },
//                     ]}
//                     dataKey="value"
//                     nameKey="name"
//                     outerRadius={100}
//                     label
//                   >
//                     <Cell fill="#10B981" />
//                     <Cell fill="#FBBF24" />
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Project Progress */}
//             <div className="bg-white shadow rounded p-4">
//               <h2 className="text-lg font-semibold mb-4">Project Progress</h2>
//               {projectProgress.map((proj, idx) => (
//                 <div key={idx} className="mb-4">
//                   <div className="flex justify-between mb-1">
//                     <p className="text-gray-600">{proj.name}</p>
//                     <p className="text-gray-600">{proj.progress}%</p>
//                   </div>
//                   <div className="bg-gray-200 rounded-full h-4 w-full">
//                     <div
//                       className="bg-blue-600 h-4 rounded-full"
//                       style={{ width: `${proj.progress}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Upcoming Deadlines */}
//           <div className="bg-white shadow rounded p-4 mt-8">
//             <h2 className="text-lg font-semibold mb-4">Upcoming Deadlines</h2>
//             <ul className="list-disc pl-5 text-gray-700">
//               {upcomingDeadlines.map((task, idx) => (
//                 <li key={idx}>
//                   {task.task} - due {task.due}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </>
//       )}

//       {user.role === "contributor" && (
//         <>
//           {/* Contributor Summary Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//             <div className="bg-white shadow rounded p-4 text-center">
//               <h2 className="text-gray-500">Projects Assigned</h2>
//               <p className="text-3xl font-bold">{assignedProjects}</p>
//             </div>
//             <div className="bg-white shadow rounded p-4 text-center">
//               <h2 className="text-gray-500">Tasks Assigned</h2>
//               <p className="text-3xl font-bold">{assignedTasks}</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Task Status Pie Chart */}
//             <div className="bg-white shadow rounded p-4">
//               <h2 className="text-lg font-semibold mb-4">Task Status</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={contributorTaskStatus}
//                     dataKey="value"
//                     nameKey="name"
//                     outerRadius={100}
//                     label
//                   >
//                     {contributorTaskStatus.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={TASK_COLORS[index % TASK_COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Upcoming Deadlines */}
//             <div className="bg-white shadow rounded p-4">
//               <h2 className="text-lg font-semibold mb-4">Upcoming Deadlines</h2>
//               <ul className="list-disc pl-5 text-gray-700">
//                 {upcomingDeadlines.map((task, idx) => (
//                   <li key={idx}>
//                     {task.task} - due {task.due}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Recent Activity */}
//           <div className="bg-white shadow rounded p-4 mt-8">
//             <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
//             <ul className="list-disc pl-5 text-gray-700">
//               {recentActivity.map((act, idx) => (
//                 <li key={idx}>
//                   {act.activity} ({act.date})
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// Before Version
// import React, { useEffect, useState } from "react";
// import { fetchAdminStats,fetchContributorStats, fetchManagerStats  } from "../API/DashboardAPI";

// import axios from "axios";
// import {
//   PieChart, Pie, Cell,
//   LineChart, Line,
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
//   ResponsiveContainer,Label
// } from "recharts";

// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { CalendarDaysIcon } from '@heroicons/react/24/solid';
// import TaskDetail from "./TaskDetail";

// const COLORS = ["#FBBF24", "#10B981", "#3B82F6"]; // yellow, green, blue
// const TASK_COLORS = ["#10B981", "#FBBF24", "#EF4444"]; // green, yellow, red
// const PROJECT_STATUS_COLORS = ["#2136d9", "#9CA3AF"];
// const TASK_STATUS_COLORS = ["#9CA3AF", "#f7dc43", "#35cc6f"];

// export default function Dashboard({ user }) {
//     // Contributor state
//   const [contribData, setContribData] = useState(null);
//   const [contribLoading, setContribLoading] = useState(false);
//   const [contribError, setContribError] = useState(null);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [taskDetail, setTaskDetail] = useState(null);

//   // Admin dynamic data
//   const [adminStats, setAdminStats] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // State for period in Activity Report
//   const [adminPeriod, setAdminPeriod] = useState('weekly');

//     // Manager state
//   const [managerData, setManagerData] = useState(null);
//   const [managerLoading, setManagerLoading] = useState(false);
//   const [managerError, setManagerError] = useState(null);

//   // Manager dummy data
//   const managedProjects = 4;
//   const totalTasks = 20;
//   const completedTasks = 12;
//   const pendingTasks = totalTasks - completedTasks;
//   const teamMembers = 7;
//   const projectProgress = [
//     { name: "Project Alpha", progress: 80 },
//     { name: "Project Beta", progress: 55 },
//   ];
//   const upcomingDeadlines = [
//     { task: "Design UI", due: "2025-07-01" },
//     { task: "Setup Backend", due: "2025-07-03" },
//     { task: "Write Docs", due: "2025-07-05" },
//   ];
//   // Chart period state (contributor)
//     const [period, setPeriod] = useState('monthly');

//   // Contributor dummy data
//   const assignedProjects = 3;
//   const assignedTasks = 10;
//   const tasksCompleted = 5;
//   const tasksInProgress = 3;
//   const tasksPending = assignedTasks - tasksCompleted - tasksInProgress;
//   const contributorTaskStatus = [
//     { name: "Completed", value: tasksCompleted },
//     { name: "In Progress", value: tasksInProgress },
//     { name: "Pending", value: tasksPending },
//   ];
//   const recentActivity = [
//     { activity: "Submitted project report", date: "2025-06-28" },
//     { activity: "Updated task status to Done", date: "2025-06-27" },
//     { activity: "Joined Project Beta", date: "2025-06-25" },
//   ];

//   useEffect(() => {
//     if (user.role === "admin") {
//       setLoading(true);
//       setError(null);
//       fetchAdminStats()
//         .then(data => setAdminStats(data))
//         .catch(err => setError("Failed to load admin dashboard"))
//         .finally(() => setLoading(false));
//     }
//     if (user.role === "contributor") {
//       setContribLoading(true);
//       setContribError(null);
//       fetchContributorStats(user.username)
//         .then(data => setContribData(data))
//         .catch(err => setContribError("Failed to load contributor dashboard"))
//         .finally(() => setContribLoading(false));
//     }

//     if (user.role === "manager") {
//       setManagerLoading(true);
//       setManagerError(null);
//       fetchManagerStats(user.username)
//         .then(data => setManagerData(data))
//         .catch(() => setManagerError("Failed to load manager dashboard"))
//         .finally(() => setManagerLoading(false));
//     }
//   }, [user.role,user.username]);

//     // --- Custom tooltip/legend logic same as your template ---
//     const CustomTooltip = ({ active, payload, label }) => {
//       if (active && payload && payload.length) {
//         return (
//           <div className="p-2 bg-white border rounded shadow text-xs">
//             <p className="font-bold text-sm">{label}</p>
//             <p className="text-teal-500 text-sm font-semibold">{payload[0].value} tasks</p>
//           </div>
//         );
//       }
//       return null;
//     };
    

    

//     const renderCustomLegend = (props) => {
//       const { payload } = props;
//       return (
//         <ul className="flex flex-col space-y-1">
//           {payload.map((entry, index) => (
//             <li key={`item-${index}`} className="flex items-center space-x-2">
//               <span
//                 className="w-3 h-3 rounded-full"
//                 style={{ backgroundColor: entry.color }}
//               ></span>
//               <span className="text-sm">{entry.value}</span>
//             </li>
//           ))}
//         </ul>
//       );
//     };

//     const PriorityTooltip = ({ active, payload }) => {
//       if (active && payload && payload.length) {
//         return (
//           <div className="p-2 bg-white border rounded shadow text-xs">
//             <p className="font-bold text-sm">{payload[0].name} : {payload[0].value}</p>
//           </div>
//         );
//       }
//       return null;
//     };

//     const ActivityTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-2 rounded shadow text-gray-700 border border-gray-200">
//           <div className="font-bold">{label}</div>
//           {payload.map((entry, i) => (
//             <div key={i} style={{ color: entry.color, fontWeight: 500 }}>
//               {entry.name}: <span className="text-teal-500">{entry.value} users</span>
//             </div>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//     const ProjectManagerTooltip = ({ active, payload, label }) => {
//       if (active && payload && payload.length) {
//         const entry = payload[0];
//         return (
//           <div className="bg-white p-2 rounded shadow text-gray-700 border border-gray-200">
//             <div className="font-bold">{entry.payload.manager}</div>
//             <div className="text-teal-500">{entry.value} projects</div>
//           </div>
//         );
//       }
//       return null;
//     };
  
//    // Function to load a task by id
//     const openTaskDetail = async (taskId) => {
//       const res = await fetch(`http://localhost:5047/api/tasks/${taskId}`);
//       if (res.ok) {
//         const data = await res.json();
//         setTaskDetail(data);
//         setSelectedTask(taskId);
//       }
//     };

//     // To close the modal
//     const closeTaskDetail = () => {
//       setSelectedTask(null);
//       setTaskDetail(null);
//     };

//     // Helper for project progress bar color
//     const getProgressColor = (percent) => {
//       if (percent >= 75) return '#15803d';
//       if (percent >= 50) return '#c1db3b';
//       if (percent >= 25) return '#facc15';
//       return '#f87171';
//     };


//   return (
//     <div className="p-8">
//       {/* <h1 className="text-2xl font-bold mb-6">
//         Welcome, {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
//       </h1> */}

//       <h1 className="text-2xl font-bold mb-6">
//         Welcome, {user.username
//           .split(" ")
//           .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//           .join(" ")}
//       </h1>

//       {user.role === "admin" && (
//             <>
//               {loading && <div>Loading admin dashboard...</div>}
//               {error && <div className="text-red-500">{error}</div>}
//               {adminStats && (
//                 <>
//                   {/* Summary Cards */}
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//                     <div className="bg-purple-100 rounded p-4 text-center">
//                       <p className="text-3xl font-bold">{adminStats.totalUsers}</p>
//                       <h2 className="text-gray-500 text-sm">Total Users</h2>
//                     </div>
//                     <div className="bg-blue-100 rounded p-4 text-center">
//                       <p className="text-3xl font-bold">{adminStats.totalProjects}</p>
//                       <h2 className="text-gray-500 text-sm">Total Projects</h2>
//                     </div>
//                     <div className="bg-green-100 rounded p-4 text-center">
//                       <p className="text-3xl font-bold">{adminStats.totalTasks}</p>
//                       <h2 className="text-gray-500 text-sm">Total Tasks</h2>
//                     </div>
//                   </div>
//                   {/* Activity Report & Projects by Manager */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//                     <div className="bg-white shadow rounded p-4">
//                       <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-lg font-bold">Activity Report</h2>
//                         <select
//                           value={adminPeriod}
//                           onChange={e => setAdminPeriod(e.target.value)}
//                           className="border rounded px-3 py-1 text-xs"
//                         >
//                           <option value="weekly">Weekly</option>
//                           <option value="monthly">Monthly</option> 
//                           <option value="yearly">Yearly</option>
//                         </select>
//                       </div>
//                       <ResponsiveContainer width="100%" height={250}>
//                         <BarChart data={adminStats.adminActivityDataset[adminPeriod]} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
//                           <CartesianGrid strokeDasharray="3 3" />
//                           <XAxis dataKey="period" tick={{ fontSize: 12 }} />
//                           <YAxis label={{
//                             value: 'Users', angle: -90, position: 'insideLeft',
//                             offset: 15, style: { fontSize: 16, fontWeight: 'bold' }
//                           }} tick={{ fontSize: 12 }} />
//                           <Tooltip content={<ActivityTooltip />} />
//                           <Legend verticalAlign="bottom" align="center" layout="horizontal" content={renderCustomLegend} />
//                           <Bar dataKey="admin" name="Admin" fill="#6366F1" />
//                           <Bar dataKey="contributor" name="Contributor" fill="#A78BFA" />
//                           <Bar dataKey="manager" name="Manager" fill="#60A5FA" />
//                       </BarChart>
//                       </ResponsiveContainer>
//                     </div>
//                     <div className="bg-white shadow rounded p-4">
//                       <h2 className="text-lg font-bold mb-4">Projects by Project Manager</h2>
//                       <ResponsiveContainer width="100%" height={250}>
//                         <BarChart data={adminStats.projectsByManager} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
//                           <CartesianGrid strokeDasharray="3 3" />
//                           <XAxis dataKey="manager" tick={{ fontSize: 12 }} />
//                           <YAxis label={{
//                             value: 'Projects', angle: -90, position: 'insideLeft',
//                             offset: 15, style: { fontSize: 16, fontWeight: 'bold' }
//                           }} tick={{ fontSize: 12 }} />
//                           <Tooltip content={<ProjectManagerTooltip />} />
//                           <Bar dataKey="projects" fill="#f06f13" />
//                         </BarChart>
//                       </ResponsiveContainer>
//                     </div>
//                   </div>
//                   {/* Pie charts: user by role, project by status, task by status */}
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div className="bg-white shadow rounded p-4">
//                       <h2 className="text-lg font-bold mb-4">User by Role</h2>
//                       <ResponsiveContainer width="100%" height={200}>
//                         <PieChart>
//                           {(() => {
//                                   const totalUsersByRole = adminStats.userByRoleData.reduce((sum, e) => sum + e.value, 0);
//                                   return (
//                                     <Pie data={adminStats.userByRoleData}
//                                       dataKey="value"
//                                       nameKey="name"
//                                       outerRadius={80}
//                                       innerRadius={40}
//                                       labelLine={false}
//                                       label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
//                                         const RADIAN = Math.PI / 180;
//                                         const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//                                         const x = cx + radius * Math.cos(-midAngle * RADIAN);
//                                         const y = cy + radius * Math.sin(-midAngle * RADIAN);
//                                         return (
//                                           <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="12">
//                                             {`${(percent * 100).toFixed(0)}%`}
//                                           </text>
//                                         );
//                                       }}
//                                     >
//                                       {adminStats.userByRoleData.map((entry, i) => (
//                                         <Cell key={i} fill={COLORS[i % COLORS.length]} />
//                                       ))}
//                                       <Label
//                                         value={`Total: ${totalUsersByRole}`}
//                                         position="center"
//                                         fontSize={16}
//                                         fontWeight="bold"
//                                         fill="#333"
//                                       />
//                                     </Pie>
//                                   );
//                                 })()}
//                              <Tooltip content={<PriorityTooltip />} />
//                           <Legend verticalAlign="top" align="right" layout="vertical" content={renderCustomLegend} />
//                         </PieChart>
//                       </ResponsiveContainer>
//                     </div>
//                     <div className="bg-white shadow rounded p-4">
//                       <h2 className="text-lg font-bold mb-4">Project by Status</h2>
//                       <ResponsiveContainer width="100%" height={200}>
//                         <PieChart>
//                           {(() => {
//                           const totalProjectsByStatus = adminStats.adminProjectByStatus.reduce((sum, e) => sum + e.value, 0);
//                           return (
//                             <Pie
//                               data={adminStats.adminProjectByStatus}
//                               dataKey="value"
//                               nameKey="name"
//                               outerRadius={80}
//                               innerRadius={40}
//                               labelLine={false}
//                               label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
//                                 const RADIAN = Math.PI / 180;
//                                 const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//                                 const x = cx + radius * Math.cos(-midAngle * RADIAN);
//                                 const y = cy + radius * Math.sin(-midAngle * RADIAN);
//                                 return (
//                                   <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="12">
//                                     {`${(percent * 100).toFixed(0)}%`}
//                                   </text>
//                                 );
//                               }}
//                             >
//                               {adminStats.adminProjectByStatus.map((entry, i) => (
//                                 <Cell key={i} fill={PROJECT_STATUS_COLORS[i % PROJECT_STATUS_COLORS.length]} />
//                               ))}
//                               <Label
//                                 value={`Total: ${totalProjectsByStatus}`}
//                                 position="center"
//                                 fontSize={16}
//                                 fontWeight="bold"
//                                 fill="#333"
//                               />
//                             </Pie>
//                               );
//                             })()}
//                           <Tooltip content={<PriorityTooltip />} />
//                           <Legend verticalAlign="top" align="right" layout="vertical" content={renderCustomLegend} />
//                         </PieChart>
//                       </ResponsiveContainer>
//                     </div>
//                     <div className="bg-white shadow rounded p-4">
//                       <h2 className="text-lg font-bold mb-4">Task by Status</h2>
//                       <ResponsiveContainer width="100%" height={200}>
//                         <PieChart>
//                            {(() => {
//                             const totalTasksByStatus = adminStats.adminTaskByStatus.reduce((sum, e) => sum + e.value, 0);
//                             return (
//                               <Pie
//                                 data={adminStats.adminTaskByStatus}
//                                 dataKey="value"
//                                 nameKey="name"
//                                 outerRadius={80}
//                                 innerRadius={40}
//                                 labelLine={false}
//                                 label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
//                                   const RADIAN = Math.PI / 180;
//                                   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//                                   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//                                   const y = cy + radius * Math.sin(-midAngle * RADIAN);
//                                   return (
//                                     <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="12">
//                                       {`${(percent * 100).toFixed(0)}%`}
//                                     </text>
//                                   );
//                                 }}
//                               >
//                                 {adminStats.adminTaskByStatus.map((entry, i) => (
//                                   <Cell key={i} fill={TASK_STATUS_COLORS[i % TASK_STATUS_COLORS.length]} />
//                                 ))}
//                                 <Label
//                                   value={`Total: ${totalTasksByStatus}`}
//                                   position="center"
//                                   fontSize={16}
//                                   fontWeight="bold"
//                                   fill="#333"
//                                 />
//                               </Pie>
//                             );
//                           })()}
//                           <Tooltip content={<PriorityTooltip />} />
//                           <Legend verticalAlign="top" align="right" layout="vertical" content={renderCustomLegend} />
//                         </PieChart>
//                       </ResponsiveContainer>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </>
//           )}


//        {user.role === "manager" && (
//         <>
//           {managerLoading && <div>Loading manager dashboard...</div>}
//           {managerError && <div className="text-red-500">{managerError}</div>}
//           {managerData && (
//             <>
//               {/* First Row: Summary Cards */}
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//                 <div className="bg-purple-100 rounded p-4 text-center">
//                   <p className="text-3xl font-bold">{managerData.totalProjects}</p>
//                   <h2 className="text-gray-500 text-sm">Total Projects</h2>
//                 </div>
//                 <div className="bg-blue-100 rounded p-4 text-center">
//                   <p className="text-3xl font-bold">{managerData.activeProjects}</p>
//                   <h2 className="text-gray-500 text-sm">Active Projects</h2>
//                 </div>
//                 <div className="bg-green-100 rounded p-4 text-center">
//                   <p className="text-3xl font-bold">{managerData.archivedProjects}</p>
//                   <h2 className="text-gray-500 text-sm">Archived Projects</h2>
//                 </div>
//                 <div className="bg-yellow-100 rounded p-4 text-center">
//                   <p className="text-3xl font-bold">{managerData.managerTotalTasks}</p>
//                   <h2 className="text-gray-500 text-sm">Total Tasks</h2>
//                 </div>
//               </div>

//               {/* Second Row: Upcoming Project Deadlines + Overdue Tasks */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//                 <div className="bg-white shadow rounded p-4">
//                   <h2 className="text-lg font-bold mb-4">Upcoming Project Deadlines</h2>
//                   <table className="w-full text-sm text-left">
//                     <thead>
//                       <tr>
//                         <th>Members</th><th>Project</th><th>Due Date</th><th>Progress</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {managerData.upcomingDeadlines.map((item, i) => (
//                         <tr key={i} className="border-t">
//                           <td>{item.employee}</td>
//                           <td>{item.project}</td>
//                           <td>{item.dueDate}</td>
//                           <td className="py-2">
//                             <div className="flex items-center w-full">
//                               <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
//                                 <div
//                                   className="h-2.5 rounded-full"
//                                   style={{
//                                     width: `${item.progress}%`,
//                                     backgroundColor: getProgressColor(item.progress)
//                                   }}
//                                 ></div>
//                               </div>
//                               <span className="text-xs">{item.progress}%</span>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="bg-white shadow rounded p-4">
//                   <h2 className="text-lg font-bold mb-4">Overdue Tasks</h2>
//                   <table className="w-full text-sm text-left">
//                     <thead>
//                       <tr>
//                         <th>Overdue</th><th>Task Title</th><th>Due Date</th><th>Assigned Members</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {managerData.managerOverdueTasks.map((task, i) => (
//                         <tr key={i} className="border-t">
//                           <td className="text-red-500 py-1.5 font-medium">{task.overdue}</td>
//                           <td>{task.task}</td>
//                           <td>{task.dueDate}</td>
//                           <td>{task.member}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* Third Row: Project Progress + Project/Task Status */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//                 {/* Project Progress */}
//                 <div className="bg-white shadow rounded p-4">
//                   <h2 className="text-lg font-bold mb-4">Project Progress</h2>
//                   <ResponsiveContainer width="100%" height={managerData.projectProgress.length * 100}>
//                     <BarChart 
//                       data={managerData.projectProgress} 
//                       layout="vertical" 
//                       margin={{ left: 10, right: 10, top: 20, bottom: 15 }}
//                       barCategoryGap="15%"
//                     >
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis type="number" domain={[0, 100]} hide />
//                       <YAxis 
//                         type="category" 
//                         dataKey="name"
//                         width={80}
//                         tick={{ fontSize: 12 }}
//                       />
//                       <Tooltip />
//                       <Bar 
//                         dataKey="percent"
//                         barSize={60}  
//                         isAnimationActive={false}
//                         label={{
//                           position: 'insideRight',
//                           fill: '#fff',
//                           fontWeight: 'normal',
//                           fontSize: 12,
//                           formatter: (value) => `${value}%`
//                         }}
//                       >
//                         {managerData.projectProgress.map((entry, index) => (
//                           <Cell 
//                             key={`cell-${index}`} 
//                             fill={getProgressColor(entry.percent)} 
//                           />
//                         ))}
//                       </Bar>
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>

//                 {/* Right Column: Project by Status + Task by Status */}
//                 <div className="space-y-8">
//                   <div className="bg-white shadow rounded p-4">
//                     <h2 className="text-lg font-bold mb-4">Project by Status</h2>
//                     <ResponsiveContainer width="100%" height={200}>
//                       <PieChart>
//                         <Pie
//                           data={managerData.projectByStatus}
//                           dataKey="value"
//                           nameKey="name"
//                           outerRadius={90}
//                           innerRadius={40}
//                           label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
//                           const RADIAN = Math.PI / 180;
//                           const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//                           const x = cx + radius * Math.cos(-midAngle * RADIAN);
//                           const y = cy + radius * Math.sin(-midAngle * RADIAN);

//                           return (
//                             <text
//                               x={x}
//                               y={y}
//                               fill="white"
//                               textAnchor="middle"
//                               dominantBaseline="central"
//                               fontSize="12"
//                             >
//                               {`${(percent * 100).toFixed(0)}%`}
//                             </text>
//                           );
//                         }}
//                           labelLine={false}          
//                           >
//                           {managerData.projectByStatus.map((entry, index) => (
//                             <Cell
//                               key={`cell-${index}`}
//                               fill={entry.name === "Active" ? "#2136d9" : "#9CA3AF"}
//                             />
//                           ))}
//                         </Pie>
//                         <Tooltip content={<PriorityTooltip />} />
//                         <Legend
//                           verticalAlign="top"
//                           align="right"
//                           layout="vertical"
//                           content={renderCustomLegend}
//                         />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                   <div className="bg-white shadow rounded p-4">
//                     <h2 className="text-lg font-bold mb-4">Task by Status</h2>
//                     <ResponsiveContainer width="100%" height={200}>
//                       <PieChart>
//                         <Pie
//                           data={managerData.taskByStatus}
//                           dataKey="value"
//                           nameKey="name"
//                           outerRadius={90}
//                           innerRadius={40}
//                           label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
//                           const RADIAN = Math.PI / 180;
//                           const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//                           const x = cx + radius * Math.cos(-midAngle * RADIAN);
//                           const y = cy + radius * Math.sin(-midAngle * RADIAN);

//                           return (
//                             <text
//                               x={x}
//                               y={y}
//                               fill="white"
//                               textAnchor="middle"
//                               dominantBaseline="central"
//                               fontSize="12"
//                             >
//                               {`${(percent * 100).toFixed(0)}%`}
//                             </text>
//                           );
//                         }}
//                         labelLine={false}
//                         >
//                           {managerData.taskByStatus.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={
//                               entry.name === "To-Do" ? "#9CA3AF"
//                                 : entry.name === "In Progress" ? "#f7dc43"
//                                 : "#35cc6f"
//                             } />
//                           ))}
//                         </Pie>
//                         <Tooltip content={<PriorityTooltip />} />
//                         <Legend
//                           verticalAlign="top"
//                           align="right"
//                           layout="vertical"
//                           content={renderCustomLegend}
//                         />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>
//               </div>

//               {/* Number of Tasks per Project */}
//               <div className="bg-white shadow rounded p-4 mb-8">
//                 <h2 className="text-lg font-bold mb-4">Number of Tasks per Project</h2>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={managerData.tasksPerProject}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="project" tick={{ fontSize: 14 }} />
//                     <YAxis tick={{ fontSize: 14 }} />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Bar dataKey="tasks" fill="#003080" />
//                     <Line type="monotone" dataKey="tasks" stroke="#06B6D4" strokeWidth={2} dot={{ r: 4 }} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* Right Side: Calendar, Comments, Recently Visited (if you want to keep them) */}
//               {/* ... Use managerData.newComments, managerData.recentlyVisited, etc. as in your design ... */}

//             </>
//           )}
//         </>
//       )}


//       {/* --- Contributor NEW DASHBOARD --- */}
//       {user.role === "contributor" && (
//         <>
//           {contribLoading && <div>Loading contributor dashboard...</div>}
//           {contribError && <div className="text-red-500">{contribError}</div>}
//           {contribData && (
//             <>
//               {/* Summary Cards */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//                 <div className="bg-purple-100 rounded p-4 flex justify-center items-center gap-4">
//                   <div className="flex flex-col items-center">
//                     <p className="text-2xl font-bold">{contribData.totalTasks}</p>
//                     <h2 className="text-gray-500 text-sm">Total Task</h2>
//                   </div>
//                 </div>
//                 <div className="bg-blue-100 rounded p-4 flex justify-center items-center gap-4">
//                   <div className="flex flex-col items-center">
//                     <p className="text-2xl font-bold">{contribData.toDoTasks}</p>
//                     <h2 className="text-gray-500 text-sm">To-Do</h2>
//                   </div>
//                 </div>
//                 <div className="bg-pink-100 rounded p-4 flex justify-center items-center gap-4">
//                   <div className="flex flex-col items-center">
//                     <p className="text-2xl font-bold">{contribData.inProgressTasks}</p>
//                     <h2 className="text-gray-500 text-sm">In-Progress</h2>
//                   </div>
//                 </div>
//                 <div className="bg-green-100 rounded p-4 flex justify-center items-center gap-4">
//                   <div className="flex flex-col items-center">
//                     <p className="text-2xl font-bold">{contribData.doneTasks}</p>
//                     <h2 className="text-gray-500 text-sm">Done</h2>
//                   </div>
//                 </div>
//               </div>

//               {/* Main 3-column grid */}
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//                 {/* Left Column */}
//                 <div className="space-y-8">
//                   {/* Activity Report */}
//                   <div className="bg-white shadow rounded p-4">
//                     <div className="flex justify-between items-center mb-4">
//                       <h2 className="text-lg font-bold">Activity Report</h2>
//                       <select
//                         value={period}
//                         onChange={e => setPeriod(e.target.value)}
//                         className="border rounded px-3 py-1 text-xs"
//                       >
//                         {/* <option value="daily">Daily</option> */}
//                         <option value="weekly">Weekly</option>
//                         <option value="monthly">Monthly</option>
//                         <option value="yearly">Yearly</option>
//                       </select>
//                     </div>
//                     <ResponsiveContainer width="100%" minWidth={300} height={200}>
//                       <LineChart
//                         data={contribData.activityDataset[period]}
//                         margin={{ top: 5, right: 20, left: 0, bottom: 20 }}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis
//                           dataKey={
//                             period === 'daily' ? 'time' :
//                             period === 'weekly' ? 'day' :
//                             period === 'monthly' ? 'week' : 'month'
//                           }
//                           label={{
//                             value:
//                               period === 'daily' ? 'Time' :
//                               period === 'weekly' ? 'Day' :
//                               period === 'monthly' ? 'Week' : 'Month',
//                             position: 'insideBottom',
//                             offset: -15,
//                             style: { fontSize: 16, fontWeight: 'bold' }
//                           }}
//                           tick={{ fontSize: 14 }}
//                         />
//                         <YAxis
//                           label={{
//                             value: 'Tasks',
//                             angle: -90,
//                             position: 'insideLeft',
//                             offset: 15,
//                             style: { fontSize: 16, fontWeight: 'bold' }
//                           }}
//                           tick={{ fontSize: 14 }}
//                         />
//                         <Tooltip content={<CustomTooltip />} />
//                         <Line
//                           type="monotone"
//                           dataKey="tasks"
//                           stroke="#14B8A6"
//                           dot={false}
//                           activeDot={{ r: 6, strokeWidth: 2 }}
//                         />
//                       </LineChart>
//                     </ResponsiveContainer>
//                   </div>

//                   {/* Task by Priority */}
//                   <div className="bg-white shadow rounded p-4">
//                     <h2 className="text-lg font-bold mb-4">Task by Priority</h2>
//                     <ResponsiveContainer width="100%" height={200}>
//                       <PieChart>
//                         <Pie
//                           data={contribData.taskPriority}
//                           dataKey="value"
//                           nameKey="name"
//                           outerRadius={90}
//                           innerRadius={50}
//                         >
//                           {contribData.taskPriority.map((entry, i) => (
//                             <Cell key={i} fill={TASK_COLORS[i]} />
//                           ))}
//                         </Pie>
//                         <Tooltip content={<PriorityTooltip />} />
//                         <Legend
//                           verticalAlign="top"
//                           align="right"
//                           layout="vertical"
//                           content={renderCustomLegend}
//                         />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>

//                 {/* Center Column */}
//                 <div className="space-y-8">
//                   {/* Upcoming Tasks */}
//                   <div className="bg-white shadow rounded p-4">
//                     <h2 className="text-lg font-bold mb-4">
//                       Upcoming Tasks <span className="text-gray-500 font-semibold ml-2">({contribData.upcomingTasks.length})</span>
//                     </h2>
//                     <ul className="space-y-4">
//                       {contribData.upcomingTasks.map((task, i) => (
//                         <li key={i} 
//                           className="border rounded-lg p-4 bg-white shadow"
//                           onClick={() => openTaskDetail(task.id)}
//                            >
//                           <div className="text-sm font-semibold mb-3">{task.title}</div>
//                           <div className="flex items-center gap-2 mb-2 flex-wrap">
//                             <span className={`text-xs px-2 py-1 rounded-full ${
//                               task.status === "Done"
//                                 ? "bg-green-100 text-green-800"
//                                 : task.status === "In Progress"
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : "bg-gray-200 text-gray-800"
//                             }`}>{task.status}</span>
//                             <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full flex items-center gap-1">
//                               <CalendarDaysIcon className="h-4 w-4" />
//                               {task.dueDate}
//                             </span>
//                             <span className={`text-xs px-2 py-1 rounded-full ${
//                               task.priority === "High"
//                                 ? "bg-red-200 text-red-800"
//                                 : task.priority === "Medium"
//                                 ? "bg-orange-200 text-orange-800"
//                                 : "bg-blue-200 text-blue-800"
//                             }`}>{task.priority}</span>
//                           </div>
//                           <div className="text-xs text-gray-700">{task.description}</div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   {/* Overdue Tasks */}
//                   <div className="bg-white shadow rounded p-4">
//                     <h2 className="text-lg font-bold mb-4">
//                       Overdue Tasks <span className="text-gray-500 font-semibold ml-2">({contribData.overdueTasks.length})</span>
//                     </h2>
//                     <ul className="space-y-4">
//                       {contribData.overdueTasks.map((task, i) => (
//                         <li key={i} 
//                           className="border rounded-lg p-4 bg-white shadow"
//                           onClick={() => openTaskDetail(task.id)}
//                             >
//                           <div className="text-sm font-semibold mb-3">{task.title}</div>
//                           <div className="flex items-center gap-2 mb-2 flex-wrap">
//                             <span className={`text-xs px-2 py-1 rounded-full ${
//                               task.status === "Done"
//                                 ? "bg-green-100 text-green-800"
//                                 : task.status === "In Progress"
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : "bg-gray-200 text-gray-800"
//                             }`}>{task.status}</span>
//                             <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full flex items-center gap-1">
//                               <CalendarDaysIcon className="h-4 w-4" />
//                               {task.dueDate}
//                             </span>
//                             <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Overdue</span>
//                             <span className={`text-xs px-2 py-1 rounded-full ${
//                               task.priority === "High"
//                                 ? "bg-red-200 text-red-800"
//                                 : task.priority === "Medium"
//                                 ? "bg-orange-200 text-orange-800"
//                                 : "bg-blue-200 text-blue-800"
//                             }`}>{task.priority}</span>
//                           </div>
//                           <div className="text-xs text-gray-700">{task.description}</div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>

//                 {/* Right Column */}
//                 <div className="space-y-8">
//                   {/* Calendar */}
//                   <div className="bg-white shadow rounded p-4">
//                     <h2 className="text-lg font-bold mb-4">Calendar</h2>
//                     <Calendar
//                       className="REACT-CALENDAR p-2"
//                       tileClassName={({ date, view }) => {
//                         view === 'month' && date.toDateString() === new Date().toDateString()
//                           ? 'bg-gray-800 text-white rounded-full'
//                           : ''
//                       }}
//                     />
//                     <style jsx>{`
//                       .REACT-CALENDAR {
//                         border: none;
//                         font-family: inherit;
//                       }
//                       .REACT-CALENDAR button {
//                         padding: 0.5rem;
//                         border-radius: 9999px;
//                       }
//                       .REACT-CALENDAR .react-calendar__tile--active {
//                         background: #D1D5DB !important;
//                         color: #111827 !important;
//                         border-radius: 9999px;
//                       }
//                       .REACT-CALENDAR .react-calendar__tile--active:hover {
//                         background: #D1D5DB !important;
//                       }
//                       .REACT-CALENDAR .react-calendar__navigation button {
//                         font-weight: 600;
//                       }
//                       .REACT-CALENDAR .react-calendar__month-view__weekdays {
//                         text-align: center;
//                         text-transform: none;
//                         font-weight: 600;
//                         color: #6b7280;
//                         margin-bottom: 1rem;
//                         font-size: 0.875rem;
//                       }
//                       .REACT-CALENDAR .react-calendar__navigation__label {
//                         font-size: 1rem;
//                         font-weight: 700;
//                       }
//                       .REACT-CALENDAR abbr {
//                         text-decoration: none !important;
//                         border-bottom: none !important;
//                       }
//                       .REACT-CALENDAR .react-calendar__tile--now {
//                         background: #1f2937 !important;
//                         color: white !important;
//                         border-radius: 9999px;
//                       }
//                       .REACT-CALENDAR {
//                         width: 100%;
//                         height: 100%;
//                       }
//                     `}</style>
//                   </div>

//                   {/* New Comments */}
//                   {/* <div className="bg-white shadow rounded p-4">
//                     <h2 className="text-lg font-bold mb-4">Member Comments</h2>
//                     <p className="text-xs text-gray-400 mb-4">
//                       Today <span className="mr-1 ml-1">•</span> {new Date().toLocaleDateString('en-GB', {
//                         day: '2-digit',
//                         month: 'short',
//                         year: 'numeric'
//                       })}
//                     </p> */}
//                     {/* <ul className="divide-y">
//                       {contribData.newComments.map((c, i) => (
//                         <li key={i} className="flex items-center py-2">
//                           <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700 mr-3">
//                             U
//                           </div>
//                           <div className="flex-1">
//                             <p className="font-semibold">{c.user}</p>
//                             <p className="text-sm text-gray-600">{c.comment}</p>
//                           </div>
//                           <div className="flex flex-col items-end space-y-1">
//                             <span className="text-xs text-gray-400">{c.date}</span>
//                             <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div> */}

//                   {/* Recently Visited */}
//                   <div className="bg-white shadow rounded p-4">
//                     <h2 className="text-lg font-bold mb-4">
//                       Recently Visited
//                       <span className="text-gray-500 font-semibold ml-2">({contribData.recentlyVisited.length})</span>
//                     </h2>
//                     <ul className="space-y-4">
//                       {contribData.recentlyVisited.map((task, i) => (
//                         <li key={i} 
//                           className="border rounded-lg p-4 bg-white shadow"
//                           onClick={() => openTaskDetail(task.id)}
//                             >
//                           <div className="text-sm font-semibold mb-3">{task.title}</div>
//                           <div className="flex items-center gap-2 mb-2 flex-wrap">
//                             <span className={`text-xs px-2 py-1 rounded-full ${
//                               task.status === "Done"
//                                 ? "bg-green-100 text-green-800"
//                                 : task.status === "In Progress"
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : "bg-gray-200 text-gray-800"
//                             }`}>{task.status}</span>
//                             <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full flex items-center gap-1">
//                               <CalendarDaysIcon className="h-4 w-4" />
//                               {task.dueDate}
//                             </span>
//                             <span className={`text-xs px-2 py-1 rounded-full ${
//                               task.priority === "High"
//                                 ? "bg-red-200 text-red-800"
//                                 : task.priority === "Medium"
//                                 ? "bg-orange-200 text-orange-800"
//                                 : "bg-blue-200 text-blue-800"
//                             }`}>{task.priority}</span>
//                           </div>
//                           <div className="text-xs text-gray-700">{task.description}</div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   {/* Modal Render */}
//                   {selectedTask && taskDetail && (
//                     <TaskDetail
//                       user={user}
//                       task={taskDetail}
//                       onClose={closeTaskDetail}
//                       onUpdate={() => {/* optionally reload dashboard stats */}}
//                     />
//                   )}
//                 </div>
//               </div>
//             </>
//           )}
//         </>
//       )}

//     </div>
//   );
// }


// Latest Version (5/7)
// import React, { useEffect, useState } from "react";
// import { fetchAdminStats,fetchContributorStats, fetchManagerStats  } from "../API/DashboardAPI";

// import axios from "axios";
// import {
//   PieChart, Pie, Cell,
//   LineChart, Line,
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
//   ResponsiveContainer,Label
// } from "recharts";

// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { CalendarDaysIcon } from '@heroicons/react/24/solid';
// import TaskDetail from "./TaskDetail";

// const COLORS = ["#FBBF24", "#10B981", "#3B82F6"]; // yellow, green, blue
// const TASK_COLORS = ["#6366F1", "#A78BFA", "#60A5FA"]; // green, yellow, red
// const PROJECT_STATUS_COLORS = ["#2136d9", "#9CA3AF"];
// const TASK_STATUS_COLORS = ["#9CA3AF", "#f7dc43", "#35cc6f"];
// const USER_ROLE_COLORS = ["#6366F1", "#A78BFA", "#60A5FA"];

// export default function Dashboard({ user }) {
//     // Contributor state
//   const [contribData, setContribData] = useState(null);
//   const [contribLoading, setContribLoading] = useState(false);
//   const [contribError, setContribError] = useState(null);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [taskDetail, setTaskDetail] = useState(null);

//   // Admin dynamic data
//   const [adminStats, setAdminStats] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // State for period in Activity Report
//   const [adminPeriod, setAdminPeriod] = useState('weekly');

//     // Manager state
//   const [managerData, setManagerData] = useState(null);
//   const [managerLoading, setManagerLoading] = useState(false);
//   const [managerError, setManagerError] = useState(null);

//   // Manager dummy data
//   const managedProjects = 4;
//   const totalTasks = 20;
//   const completedTasks = 12;
//   const pendingTasks = totalTasks - completedTasks;
//   const teamMembers = 7;
//   const projectProgress = [
//     { name: "Project Alpha", progress: 80 },
//     { name: "Project Beta", progress: 55 },
//   ];
//   const upcomingDeadlines = [
//     { task: "Design UI", due: "2025-07-01" },
//     { task: "Setup Backend", due: "2025-07-03" },
//     { task: "Write Docs", due: "2025-07-05" },
//   ];
//   // Chart period state (contributor)
//     const [period, setPeriod] = useState('monthly');

//   // Contributor dummy data
//   const assignedProjects = 3;
//   const assignedTasks = 10;
//   const tasksCompleted = 5;
//   const tasksInProgress = 3;
//   const tasksPending = assignedTasks - tasksCompleted - tasksInProgress;
//   const contributorTaskStatus = [
//     { name: "Completed", value: tasksCompleted },
//     { name: "In Progress", value: tasksInProgress },
//     { name: "Pending", value: tasksPending },
//   ];
//   const recentActivity = [
//     { activity: "Submitted project report", date: "2025-06-28" },
//     { activity: "Updated task status to Done", date: "2025-06-27" },
//     { activity: "Joined Project Beta", date: "2025-06-25" },
//   ];

//   useEffect(() => {
//     if (user.role === "admin") {
//       setLoading(true);
//       setError(null);
//       fetchAdminStats()
//         .then(data => setAdminStats(data))
//         .catch(err => setError("Failed to load admin dashboard"))
//         .finally(() => setLoading(false));
//     }
//     if (user.role === "contributor") {
//       setContribLoading(true);
//       setContribError(null);
//       fetchContributorStats(user.username)
//         .then(data => setContribData(data))
//         .catch(err => setContribError("Failed to load contributor dashboard"))
//         .finally(() => setContribLoading(false));
//     }

//     if (user.role === "manager") {
//       setManagerLoading(true);
//       setManagerError(null);
//       fetchManagerStats(user.username)
//         .then(data => setManagerData(data))
//         .catch(() => setManagerError("Failed to load manager dashboard"))
//         .finally(() => setManagerLoading(false));
//     }
//   }, [user.role,user.username]);

//     // --- Custom tooltip/legend logic same as your template ---
//     const CustomTooltip = ({ active, payload, label }) => {
//       if (active && payload && payload.length) {
//         return (
//           <div className="p-2 bg-white border rounded shadow text-xs">
//             <p className="font-bold text-sm">{label}</p>
//             <p className="text-teal-500 text-sm font-semibold">{payload[0].value} tasks</p>
//           </div>
//         );
//       }
//       return null;
//     };
//     const renderCustomLegend2 = () => (
//     <div className="flex justify-center gap-6 mt-4">
//       <span className="flex items-center gap-2 text-sm">
//         <span className="inline-block w-3 h-3 rounded-full" style={{ background: "#6366F1" }} />
//         Admin
//       </span>
//       <span className="flex items-center gap-2 text-sm">
//         <span className="inline-block w-3 h-3 rounded-full" style={{ background: "#A78BFA" }} />
//         Contributor
//       </span>
//       <span className="flex items-center gap-2 text-sm">
//         <span className="inline-block w-3 h-3 rounded-full" style={{ background: "#60A5FA" }} />
//         Manager
//       </span>
//     </div>
//     );
    
//       const renderCustomLegend = (props) => {
//         const { payload } = props;
//         return (
//           <ul className="flex flex-col space-y-1">
//             {payload
//               .filter(entry => entry.payload.value > 0) // Only show if count > 0
//               .map((entry, index) => (
//                 <li key={`item-${index}`} className="flex items-center space-x-2">
//                   <span
//                     className="w-3 h-3 rounded-full"
//                     style={{ backgroundColor: entry.color }}
//                   ></span>
//                   <span className="text-sm">{entry.value}</span>
//                 </li>
//               ))}
//           </ul>
//         );
//       };
//     const renderProgressLabel = ({ x, y, width, value }) => {
//       if (value === 0) return null; // Do not render label for 0%

//       const threshold = 30; // px, when to put label outside
//       const barWidth = width;
//       const labelX = barWidth < threshold ? x + barWidth + 10 : x + barWidth - 10;
//       const textAnchor = barWidth < threshold ? "start" : "end";
//       const fillColor = barWidth < threshold ? "#222" : "#fff";

//       return (
//         <text
//           x={labelX}
//           y={y + 35}
//           textAnchor={textAnchor}
//           dominantBaseline="middle"
//           fill={fillColor}
//           fontSize={14}
//         >
//           {`${value}%`}
//         </text>
//       );
//     };


//     const PriorityTooltip = ({ active, payload }) => {
//       if (active && payload && payload.length) {
//         return (
//           <div className="p-2 bg-white border rounded shadow text-xs">
//             <p className="font-bold text-sm">{payload[0].name} : {payload[0].value}</p>
//           </div>
//         );
//       }
//       return null;
//     };

//     const ActivityTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-2 rounded shadow text-gray-700 border border-gray-200">
//           <div className="font-bold">{label}</div>
//           {payload.map((entry, i) => (
//             <div key={i} style={{ color: entry.color, fontWeight: 500 }}>
//               {entry.name}: <span className="text-teal-500">{entry.value} users</span>
//             </div>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//     const ProjectManagerTooltip = ({ active, payload, label }) => {
//       if (active && payload && payload.length) {
//         const entry = payload[0];
//         return (
//           <div className="bg-white p-2 rounded shadow text-gray-700 border border-gray-200">
//             <div className="font-bold">{entry.payload.manager}</div>
//             <div className="text-teal-500">{entry.value} projects</div>
//           </div>
//         );
//       }
//       return null;
//     };
  
//    // Function to load a task by id
//     const openTaskDetail = async (taskId) => {
//       const res = await fetch(`http://localhost:5047/api/tasks/${taskId}`);
//       if (res.ok) {
//         const data = await res.json();
//         setTaskDetail(data);
//         setSelectedTask(taskId);
//       }
//     };

//     // To close the modal
//     const closeTaskDetail = () => {
//       setSelectedTask(null);
//       setTaskDetail(null);
//     };

//     // Helper for project progress bar color
//     const getProgressColor = (percent) => {
//       if (percent >= 75) return '#15803d';
//       if (percent >= 50) return '#c1db3b';
//       if (percent >= 25) return '#facc15';
//       return '#f87171';
//     };


//   return (
//     <div className="p-8">
//       {/* <h1 className="text-2xl font-bold mb-6">
//         Welcome, {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
//       </h1> */}

//       <h1 className="text-2xl font-bold mb-6">
//         Welcome, {user.username
//           .split(" ")
//           .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//           .join(" ")}
//       </h1>

//       {user.role === "admin" && (
//             <>
//               {loading && <div>Loading admin dashboard...</div>}
//               {error && <div className="text-red-500">{error}</div>}
//               {adminStats && (
//                 <>
//                   {/* Summary Cards */}
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//                     <div className="bg-purple-100 rounded p-4 text-center">
//                       <p className="text-3xl font-bold">{adminStats.totalUsers}</p>
//                       <h2 className="text-gray-500 text-sm">Total Users</h2>
//                     </div>
//                     <div className="bg-blue-100 rounded p-4 text-center">
//                       <p className="text-3xl font-bold">{adminStats.totalProjects}</p>
//                       <h2 className="text-gray-500 text-sm">Total Projects</h2>
//                     </div>
//                     <div className="bg-green-100 rounded p-4 text-center">
//                       <p className="text-3xl font-bold">{adminStats.totalTasks}</p>
//                       <h2 className="text-gray-500 text-sm">Total Tasks</h2>
//                     </div>
//                   </div>
//                   {/* Activity Report & Projects by Manager */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//                     <div className="bg-white shadow rounded p-4">
//                       <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-lg font-bold">Activity Report</h2>
//                         <select
//                           value={adminPeriod}
//                           onChange={e => setAdminPeriod(e.target.value)}
//                           className="border rounded px-3 py-1 text-xs"
//                         >
//                           <option value="weekly">Weekly</option>
//                           <option value="monthly">Monthly</option> 
//                           <option value="yearly">Yearly</option>
//                         </select>
//                       </div>
//                       <ResponsiveContainer width="100%" height={250}>
//                         <BarChart data={adminStats.adminActivityDataset[adminPeriod]} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
//                           <CartesianGrid strokeDasharray="3 3" />
//                           <XAxis dataKey="period" tick={{ fontSize: 12 }} />
//                           <YAxis label={{
//                             value: 'Users', angle: -90, position: 'insideLeft',
//                             offset: 15, style: { fontSize: 16, fontWeight: 'bold' }
//                           }} tick={{ fontSize: 12 }} />
//                           <Tooltip content={<ActivityTooltip />} />
//                           <Legend verticalAlign="bottom" align="center" layout="horizontal" content={renderCustomLegend2} />
//                           <Bar dataKey="admin" name="Admin" fill="#6366F1" />
//                           <Bar dataKey="contributor" name="Contributor" fill="#A78BFA" />
//                           <Bar dataKey="manager" name="Manager" fill="#60A5FA" />
//                       </BarChart>
//                       </ResponsiveContainer>
//                     </div>
//                     <div className="bg-white shadow rounded p-4">
//                       <h2 className="text-lg font-bold mb-4">Projects by Project Manager</h2>
//                       <ResponsiveContainer width="100%" height={250}>
//                         <BarChart data={adminStats.projectsByManager} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
//                           <CartesianGrid strokeDasharray="3 3" />
//                           <XAxis dataKey="manager" tick={{ fontSize: 12 }} />
//                           <YAxis label={{
//                             value: 'Projects', angle: -90, position: 'insideLeft',
//                             offset: 15, style: { fontSize: 16, fontWeight: 'bold' }
//                           }} tick={{ fontSize: 12 }} />
//                           <Tooltip content={<ProjectManagerTooltip />} />
//                           <Bar dataKey="projects" fill="#f06f13" />
//                         </BarChart>
//                       </ResponsiveContainer>
//                     </div>
//                   </div>
//                   {/* Pie charts: user by role, project by status, task by status */}
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div className="bg-white shadow rounded p-4">
//                       <h2 className="text-lg font-bold mb-4">User by Role</h2>
//                       <ResponsiveContainer width="100%" height={200}>
//                         <PieChart>
//                           {(() => {
//                                   const totalUsersByRole = adminStats.userByRoleData.reduce((sum, e) => sum + e.value, 0);
//                                   return (
//                                     <Pie data={adminStats.userByRoleData}
//                                       dataKey="value"
//                                       nameKey="name"
//                                       outerRadius={80}
//                                       innerRadius={40}
//                                       labelLine={false}
//                                       label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
//                                         const RADIAN = Math.PI / 180;
//                                         const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//                                         const x = cx + radius * Math.cos(-midAngle * RADIAN);
//                                         const y = cy + radius * Math.sin(-midAngle * RADIAN);
//                                         return (
//                                           <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="12">
//                                             {`${(percent * 100).toFixed(0)}%`}
//                                           </text>
//                                         );
//                                       }}
//                                     >
//                                       {adminStats.userByRoleData.map((entry, i) => (
//                                         <Cell key={i} fill={USER_ROLE_COLORS[i % USER_ROLE_COLORS.length]} />
//                                       ))}
//                                       <Label
//                                         value={`Total: ${totalUsersByRole}`}
//                                         position="center"
//                                         fontSize={16}
//                                         fontWeight="bold"
//                                         fill="#333"
//                                       />
//                                     </Pie>
//                                   );
//                                 })()}
//                              <Tooltip content={<PriorityTooltip />} />
//                           <Legend verticalAlign="top" align="right" layout="vertical" content={renderCustomLegend} />
//                         </PieChart>
//                       </ResponsiveContainer>
//                     </div>
//                     <div className="bg-white shadow rounded p-4">
//                       <h2 className="text-lg font-bold mb-4">Project by Status</h2>
//                       <ResponsiveContainer width="100%" height={200}>
//                         <PieChart>
//                           {(() => {
//                           const totalProjectsByStatus = adminStats.adminProjectByStatus.reduce((sum, e) => sum + e.value, 0);
//                           return (
//                             <Pie
//                               data={adminStats.adminProjectByStatus}
//                               dataKey="value"
//                               nameKey="name"
//                               outerRadius={80}
//                               innerRadius={40}
//                               labelLine={false}
//                               label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
//                                 const RADIAN = Math.PI / 180;
//                                 const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//                                 const x = cx + radius * Math.cos(-midAngle * RADIAN);
//                                 const y = cy + radius * Math.sin(-midAngle * RADIAN);
//                                 return (
//                                   <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="12">
//                                     {`${(percent * 100).toFixed(0)}%`}
//                                   </text>
//                                 );
//                               }}
//                             >
//                               {adminStats.adminProjectByStatus.map((entry, i) => (
//                                 <Cell key={i} fill={PROJECT_STATUS_COLORS[i % PROJECT_STATUS_COLORS.length]} />
//                               ))}
//                               <Label
//                                 value={`Total: ${totalProjectsByStatus}`}
//                                 position="center"
//                                 fontSize={16}
//                                 fontWeight="bold"
//                                 fill="#333"
//                               />
//                             </Pie>
//                               );
//                             })()}
//                           <Tooltip content={<PriorityTooltip />} />
//                           <Legend verticalAlign="top" align="right" layout="vertical" content={renderCustomLegend} />
//                         </PieChart>
//                       </ResponsiveContainer>
//                     </div>
//                     <div className="bg-white shadow rounded p-4">
//                       <h2 className="text-lg font-bold mb-4">Task by Status</h2>
//                       <ResponsiveContainer width="100%" height={200}>
//                         <PieChart>
//                            {(() => {
//                             const totalTasksByStatus = adminStats.adminTaskByStatus.reduce((sum, e) => sum + e.value, 0);
//                             return (
//                               <Pie
//                                 data={adminStats.adminTaskByStatus}
//                                 dataKey="value"
//                                 nameKey="name"
//                                 outerRadius={80}
//                                 innerRadius={40}
//                                 labelLine={false}
//                                 label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
//                                   const RADIAN = Math.PI / 180;
//                                   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//                                   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//                                   const y = cy + radius * Math.sin(-midAngle * RADIAN);
//                                   return (
//                                     <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="12">
//                                       {`${(percent * 100).toFixed(0)}%`}
//                                     </text>
//                                   );
//                                 }}
//                               >
//                                 {adminStats.adminTaskByStatus.map((entry, i) => (
//                                   <Cell key={i} fill={TASK_STATUS_COLORS[i % TASK_STATUS_COLORS.length]} />
//                                 ))}
//                                 <Label
//                                   value={`Total: ${totalTasksByStatus}`}
//                                   position="center"
//                                   fontSize={16}
//                                   fontWeight="bold"
//                                   fill="#333"
//                                 />
//                               </Pie>
//                             );
//                           })()}
//                           <Tooltip content={<PriorityTooltip />} />
//                           <Legend verticalAlign="top" align="right" layout="vertical" content={renderCustomLegend} />
//                         </PieChart>
//                       </ResponsiveContainer>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </>
//           )}


//        {user.role === "manager" && (
//         <>
//           {managerLoading && <div>Loading manager dashboard...</div>}
//           {managerError && <div className="text-red-500">{managerError}</div>}
//           {managerData && (
//             <>
//               {/* First Row: Summary Cards */}
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//                 <div className="bg-purple-100 rounded p-4 text-center">
//                   <p className="text-3xl font-bold">{managerData.totalProjects}</p>
//                   <h2 className="text-gray-500 text-sm">Total Projects</h2>
//                 </div>
//                 <div className="bg-blue-100 rounded p-4 text-center">
//                   <p className="text-3xl font-bold">{managerData.activeProjects}</p>
//                   <h2 className="text-gray-500 text-sm">Active Projects</h2>
//                 </div>
//                 <div className="bg-green-100 rounded p-4 text-center">
//                   <p className="text-3xl font-bold">{managerData.archivedProjects}</p>
//                   <h2 className="text-gray-500 text-sm">Archived Projects</h2>
//                 </div>
//                 <div className="bg-yellow-100 rounded p-4 text-center">
//                   <p className="text-3xl font-bold">{managerData.managerTotalTasks}</p>
//                   <h2 className="text-gray-500 text-sm">Total Tasks</h2>
//                 </div>
//               </div>

//               {/* Second Row: Upcoming Project Deadlines + Overdue Tasks */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//                 <div className="bg-white shadow rounded p-4">
//                   <h2 className="text-lg font-bold mb-4">Upcoming Project Deadlines</h2>
//                   <table className="w-full text-sm text-left">
//                     <thead>
//                       <tr>
//                         <th>Members</th><th>Project</th><th>Due Date</th><th>Progress</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {managerData.upcomingDeadlines.map((item, i) => (
//                         <tr key={i} className="border-t">
//                           <td>{item.employee}</td>
//                           <td>{item.project}</td>
//                           <td>{item.dueDate}</td>
//                           <td className="py-2">
//                             <div className="flex items-center w-full">
//                               <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
//                                 <div
//                                   className="h-2.5 rounded-full"
//                                   style={{
//                                     width: `${item.progress}%`,
//                                     backgroundColor: getProgressColor(item.progress)
//                                   }}
//                                 ></div>
//                               </div>
//                               <span className="text-xs">{item.progress}%</span>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="bg-white shadow rounded p-4">
//                   <h2 className="text-lg font-bold mb-4">Overdue Tasks</h2>
//                   <table className="w-full text-sm text-left">
//                     <thead>
//                       <tr>
//                         <th>Overdue</th><th>Task Title</th><th>Due Date</th><th>Assigned Members</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {managerData.managerOverdueTasks.map((task, i) => (
//                         <tr key={i} className="border-t">
//                           <td className="text-red-500 py-1.5 font-medium">{task.overdue}</td>
//                           <td>{task.task}</td>
//                           <td>{task.dueDate}</td>
//                           <td>{task.member}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* Third Row: Project Progress + Project/Task Status */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//                 {/* Project Progress */}
//                 <div className="bg-white shadow rounded p-4">
//                   <h2 className="text-lg font-bold mb-4">Project Progress</h2>
//                   <ResponsiveContainer width="100%" height={managerData.projectProgress.length * 90}>
//                     <BarChart 
//                       data={managerData.projectProgress} 
//                       layout="vertical" 
//                       margin={{ left: 10, right: 10, top: 20, bottom: 15 }}
//                       barCategoryGap="10%"
//                     >
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis type="number" domain={[0, 100]} hide />
//                       <YAxis 
//                         type="category" 
//                         dataKey="name"
//                         width={80}
//                         tick={{ fontSize: 12 }}
//                       />
//                       <Tooltip />
//                       <Bar 
//                         dataKey="percent"
//                         barSize={60}  
//                         isAnimationActive={false}
//                         label={renderProgressLabel}
//                       >
//                         {managerData.projectProgress.map((entry, index) => (
//                           <Cell 
//                             key={`cell-${index}`} 
//                             fill={getProgressColor(entry.percent)} 
//                           />
//                         ))}
//                       </Bar>
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>

//                 {/* Right Column: Project by Status + Task by Status */}
//                 <div className="space-y-8">
//                   <div className="bg-white shadow rounded p-4">
//                     <h2 className="text-lg font-bold mb-4">Project by Status</h2>
//                     <ResponsiveContainer width="100%" height={200}>
//                       <PieChart>
//                         {(() => {
//                           const totalProjectsByStatus = managerData.projectByStatus.reduce((sum, e) => sum + e.value, 0);
//                           return (
//                             <Pie
//                               data={managerData.projectByStatus}
//                               dataKey="value"
//                               nameKey="name"
//                               outerRadius={80}
//                               innerRadius={40}
//                               labelLine={false}
//                               label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
//                                 const RADIAN = Math.PI / 180;
//                                 const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//                                 const x = cx + radius * Math.cos(-midAngle * RADIAN);
//                                 const y = cy + radius * Math.sin(-midAngle * RADIAN);
//                                 return (
//                                   <text
//                                     x={x}
//                                     y={y}
//                                     fill="white"
//                                     textAnchor="middle"
//                                     dominantBaseline="central"
//                                     fontSize="12"
//                                   >
//                                     {`${(percent * 100).toFixed(0)}%`}
//                                   </text>
//                                 );
//                               }}
//                             >
//                               {managerData.projectByStatus.map((entry, i) => (
//                                 <Cell
//                                   key={i}
//                                   fill={PROJECT_STATUS_COLORS[i % PROJECT_STATUS_COLORS.length]}
//                                 />
//                               ))}
//                               <Label
//                                 value={`Total: ${totalProjectsByStatus}`}
//                                 position="center"
//                                 fontSize={16}
//                                 fontWeight="bold"
//                                 fill="#333"
//                               />
//                             </Pie>
//                           );
//                         })()}
//                         <Tooltip content={<PriorityTooltip />} />
//                         <Legend
//                           verticalAlign="top"
//                           align="right"
//                           layout="vertical"
//                           content={renderCustomLegend}
//                         />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                   <div className="bg-white shadow rounded p-4">
//                     <h2 className="text-lg font-bold mb-4">Task by Status</h2>
//                     <ResponsiveContainer width="100%" height={200}>
//                       <PieChart>
//                         {(() => {
//                           const totalTasksByStatus = managerData.taskByStatus.reduce((sum, e) => sum + e.value, 0);
//                           return (
//                             <Pie
//                               data={managerData.taskByStatus}
//                               dataKey="value"
//                               nameKey="name"
//                               outerRadius={80}
//                               innerRadius={40}
//                               labelLine={false}
//                               label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
//                                 const RADIAN = Math.PI / 180;
//                                 const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//                                 const x = cx + radius * Math.cos(-midAngle * RADIAN);
//                                 const y = cy + radius * Math.sin(-midAngle * RADIAN);
//                                 return (
//                                   <text
//                                     x={x}
//                                     y={y}
//                                     fill="white"
//                                     textAnchor="middle"
//                                     dominantBaseline="central"
//                                     fontSize="12"
//                                   >
//                                     {`${(percent * 100).toFixed(0)}%`}
//                                   </text>
//                                 );
//                               }}
//                             >
//                               {managerData.taskByStatus.map((entry, i) => (
//                                 <Cell
//                                   key={i}
//                                   fill={TASK_STATUS_COLORS[i % TASK_STATUS_COLORS.length]}
//                                 />
//                               ))}
//                               <Label
//                                 value={`Total: ${totalTasksByStatus}`}
//                                 position="center"
//                                 fontSize={16}
//                                 fontWeight="bold"
//                                 fill="#333"
//                               />
//                             </Pie>
//                           );
//                         })()}
//                         <Tooltip content={<PriorityTooltip />} />
//                         <Legend
//                           verticalAlign="top"
//                           align="right"
//                           layout="vertical"
//                           content={renderCustomLegend}
//                         />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>

//                 </div>
//               </div>

//               {/* Number of Tasks per Project */}
//               <div className="bg-white shadow rounded p-4 mb-8">
//                 <h2 className="text-lg font-bold mb-4">Number of Tasks per Project</h2>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={managerData.tasksPerProject}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="project" tick={{ fontSize: 14 }} />
//                     <YAxis tick={{ fontSize: 14 }} />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Bar dataKey="tasks" fill="#003080" />
//                     <Line type="monotone" dataKey="tasks" stroke="#06B6D4" strokeWidth={2} dot={{ r: 4 }} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* Right Side: Calendar, Comments, Recently Visited (if you want to keep them) */}
//               {/* ... Use managerData.newComments, managerData.recentlyVisited, etc. as in your design ... */}

//             </>
//           )}
//         </>
//       )}


//       {/* --- Contributor NEW DASHBOARD --- */}
//       {user.role === "contributor" && (
//         <>
//           {contribLoading && <div>Loading contributor dashboard...</div>}
//           {contribError && <div className="text-red-500">{contribError}</div>}
//           {contribData && (
//             <>
//               {/* Summary Cards */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//                 <div className="bg-purple-100 rounded p-4 flex justify-center items-center gap-4">
//                   <div className="flex flex-col items-center">
//                     <p className="text-2xl font-bold">{contribData.totalTasks}</p>
//                     <h2 className="text-gray-500 text-sm">Total Task</h2>
//                   </div>
//                 </div>
//                 <div className="bg-blue-100 rounded p-4 flex justify-center items-center gap-4">
//                   <div className="flex flex-col items-center">
//                     <p className="text-2xl font-bold">{contribData.toDoTasks}</p>
//                     <h2 className="text-gray-500 text-sm">To-Do</h2>
//                   </div>
//                 </div>
//                 <div className="bg-pink-100 rounded p-4 flex justify-center items-center gap-4">
//                   <div className="flex flex-col items-center">
//                     <p className="text-2xl font-bold">{contribData.inProgressTasks}</p>
//                     <h2 className="text-gray-500 text-sm">In-Progress</h2>
//                   </div>
//                 </div>
//                 <div className="bg-green-100 rounded p-4 flex justify-center items-center gap-4">
//                   <div className="flex flex-col items-center">
//                     <p className="text-2xl font-bold">{contribData.doneTasks}</p>
//                     <h2 className="text-gray-500 text-sm">Done</h2>
//                   </div>
//                 </div>
//               </div>

//               {/* Main 3-column grid */}
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//                 {/* Left Column */}
//                 <div className="space-y-8">
//                   {/* Activity Report */}
//                   <div className="bg-white shadow rounded p-4">
//                     <div className="flex justify-between items-center mb-4">
//                       <h2 className="text-lg font-bold">Activity Report</h2>
//                       <select
//                         value={period}
//                         onChange={e => setPeriod(e.target.value)}
//                         className="border rounded px-3 py-1 text-xs"
//                       >
//                         {/* <option value="daily">Daily</option> */}
//                         <option value="weekly">Weekly</option>
//                         <option value="monthly">Monthly</option>
//                         <option value="yearly">Yearly</option>
//                       </select>
//                     </div>
//                     <ResponsiveContainer width="100%" minWidth={300} height={200}>
//                       <LineChart
//                         data={contribData.activityDataset[period]}
//                         margin={{ top: 5, right: 20, left: 0, bottom: 20 }}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis
//                           dataKey={
//                             period === 'daily' ? 'time' :
//                             period === 'weekly' ? 'day' :
//                             period === 'monthly' ? 'week' : 'month'
//                           }
//                           label={{
//                             value:
//                               period === 'daily' ? 'Time' :
//                               period === 'weekly' ? 'Day' :
//                               period === 'monthly' ? 'Week' : 'Month',
//                             position: 'insideBottom',
//                             offset: -15,
//                             style: { fontSize: 16, fontWeight: 'bold' }
//                           }}
//                           tick={{ fontSize: 14 }}
//                         />
//                         <YAxis
//                           label={{
//                             value: 'Tasks',
//                             angle: -90,
//                             position: 'insideLeft',
//                             offset: 15,
//                             style: { fontSize: 16, fontWeight: 'bold' }
//                           }}
//                           tick={{ fontSize: 14 }}
//                         />
//                         <Tooltip content={<CustomTooltip />} />
//                         <Line
//                           type="monotone"
//                           dataKey="tasks"
//                           stroke="#14B8A6"
//                           dot={false}
//                           activeDot={{ r: 6, strokeWidth: 2 }}
//                         />
//                       </LineChart>
//                     </ResponsiveContainer>
//                   </div>
//                   <div className="bg-white shadow rounded p-4">
//                   <h2 className="text-lg font-bold mb-4">Task by Priority</h2>
//                   <ResponsiveContainer width="100%" height={200}>
//                     <PieChart>
//                       {(() => {
//                         const totalTasksByPriority = contribData.taskPriority.reduce((sum, e) => sum + e.value, 0);
//                         return (
//                           <Pie
//                             data={contribData.taskPriority}
//                             dataKey="value"
//                             nameKey="name"
//                             outerRadius={90}
//                             innerRadius={50}
//                             labelLine={false}
//                             label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
//                               if (percent === 0) return null; 
//                               const RADIAN = Math.PI / 180;
//                               const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
//                               const x = cx + radius * Math.cos(-midAngle * RADIAN);
//                               const y = cy + radius * Math.sin(-midAngle * RADIAN);
//                               return (
//                                 <text
//                                   x={x}
//                                   y={y}
//                                   fill="white"
//                                   textAnchor="middle"
//                                   dominantBaseline="central"
//                                   fontSize="12"
//                                 >
//                                   {`${(percent * 100).toFixed(0)}%`}
//                                 </text>
//                               );
//                             }}
//                           >
//                             {contribData.taskPriority.map((entry, i) => (
//                               <Cell key={i} fill={TASK_COLORS[i % TASK_COLORS.length]} />
//                             ))}
//                             <Label
//                               value={`Total: ${totalTasksByPriority}`}
//                               position="center"
//                               fontSize={16}
//                               fontWeight="bold"
//                               fill="#333"
//                             />
//                           </Pie>
//                         );
//                       })()}
//                       <Tooltip content={<PriorityTooltip />} />
//                     <Legend verticalAlign="top" align="right" layout="vertical" content={renderCustomLegend} />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>

//                 </div>

//                 {/* Center Column */}
//                 <div className="space-y-8">
//                   {/* Upcoming Tasks */}
//                   <div className="bg-white shadow rounded p-4">
//                     <h2 className="text-lg font-bold mb-4">
//                       Upcoming Tasks <span className="text-gray-500 font-semibold ml-2">({contribData.upcomingTasks.length})</span>
//                     </h2>
//                     <ul className="space-y-4">
//                       {contribData.upcomingTasks.map((task, i) => (
//                         <li key={i} 
//                           className="border rounded-lg p-4 bg-white shadow"
//                           onClick={() => openTaskDetail(task.id)}
//                            >
//                           <div className="text-sm font-semibold mb-3">{task.title}</div>
//                           <div className="flex items-center gap-2 mb-2 flex-wrap">
//                             <span className={`text-xs px-2 py-1 rounded-full ${
//                               task.status === "Done"
//                                 ? "bg-green-100 text-green-800"
//                                 : task.status === "In Progress"
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : "bg-gray-200 text-gray-800"
//                             }`}>{task.status}</span>
//                             <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full flex items-center gap-1">
//                               <CalendarDaysIcon className="h-4 w-4" />
//                               {task.dueDate}
//                             </span>
//                             <span className={`text-xs px-2 py-1 rounded-full ${
//                               task.priority === "High"
//                                 ? "bg-red-200 text-red-800"
//                                 : task.priority === "Medium"
//                                 ? "bg-orange-200 text-orange-800"
//                                 : "bg-blue-200 text-blue-800"
//                             }`}>{task.priority}</span>
//                           </div>
//                           <div className="text-xs text-gray-700">{task.description}</div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   {/* Overdue Tasks */}
//                   <div className="bg-white shadow rounded p-4">
//                     <h2 className="text-lg font-bold mb-4">
//                       Overdue Tasks <span className="text-gray-500 font-semibold ml-2">({contribData.overdueTasks.length})</span>
//                     </h2>
//                     <ul className="space-y-4">
//                       {contribData.overdueTasks.map((task, i) => (
//                         <li key={i} 
//                           className="border rounded-lg p-4 bg-white shadow"
//                           onClick={() => openTaskDetail(task.id)}
//                             >
//                           <div className="text-sm font-semibold mb-3">{task.title}</div>
//                           <div className="flex items-center gap-2 mb-2 flex-wrap">
//                             <span className={`text-xs px-2 py-1 rounded-full ${
//                               task.status === "Done"
//                                 ? "bg-green-100 text-green-800"
//                                 : task.status === "In Progress"
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : "bg-gray-200 text-gray-800"
//                             }`}>{task.status}</span>
//                             <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full flex items-center gap-1">
//                               <CalendarDaysIcon className="h-4 w-4" />
//                               {task.dueDate}
//                             </span>
//                             <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Overdue</span>
//                             <span className={`text-xs px-2 py-1 rounded-full ${
//                               task.priority === "High"
//                                 ? "bg-red-200 text-red-800"
//                                 : task.priority === "Medium"
//                                 ? "bg-orange-200 text-orange-800"
//                                 : "bg-blue-200 text-blue-800"
//                             }`}>{task.priority}</span>
//                           </div>
//                           <div className="text-xs text-gray-700">{task.description}</div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>

//                 {/* Right Column */}
//                 <div className="space-y-8">
//                   {/* Calendar */}
//                   <div className="bg-white shadow rounded p-4">
//                     <h2 className="text-lg font-bold mb-4">Calendar</h2>
//                     <Calendar
//                       className="REACT-CALENDAR p-2"
//                       tileClassName={({ date, view }) => {
//                         view === 'month' && date.toDateString() === new Date().toDateString()
//                           ? 'bg-gray-800 text-white rounded-full'
//                           : ''
//                       }}
//                     />
//                     <style jsx>{`
//                       .REACT-CALENDAR {
//                         border: none;
//                         font-family: inherit;
//                       }
//                       .REACT-CALENDAR button {
//                         padding: 0.5rem;
//                         border-radius: 9999px;
//                       }
//                       .REACT-CALENDAR .react-calendar__tile--active {
//                         background: #D1D5DB !important;
//                         color: #111827 !important;
//                         border-radius: 9999px;
//                       }
//                       .REACT-CALENDAR .react-calendar__tile--active:hover {
//                         background: #D1D5DB !important;
//                       }
//                       .REACT-CALENDAR .react-calendar__navigation button {
//                         font-weight: 600;
//                       }
//                       .REACT-CALENDAR .react-calendar__month-view__weekdays {
//                         text-align: center;
//                         text-transform: none;
//                         font-weight: 600;
//                         color: #6b7280;
//                         margin-bottom: 1rem;
//                         font-size: 0.875rem;
//                       }
//                       .REACT-CALENDAR .react-calendar__navigation__label {
//                         font-size: 1rem;
//                         font-weight: 700;
//                       }
//                       .REACT-CALENDAR abbr {
//                         text-decoration: none !important;
//                         border-bottom: none !important;
//                       }
//                       .REACT-CALENDAR .react-calendar__tile--now {
//                         background: #1f2937 !important;
//                         color: white !important;
//                         border-radius: 9999px;
//                       }
//                       .REACT-CALENDAR {
//                         width: 100%;
//                         height: 100%;
//                       }
//                     `}</style>
//                   </div>

//                   {/* New Comments */}
//                   {/* <div className="bg-white shadow rounded p-4">
//                     <h2 className="text-lg font-bold mb-4">Member Comments</h2>
//                     <p className="text-xs text-gray-400 mb-4">
//                       Today <span className="mr-1 ml-1">•</span> {new Date().toLocaleDateString('en-GB', {
//                         day: '2-digit',
//                         month: 'short',
//                         year: 'numeric'
//                       })}
//                     </p> */}
//                     {/* <ul className="divide-y">
//                       {contribData.newComments.map((c, i) => (
//                         <li key={i} className="flex items-center py-2">
//                           <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700 mr-3">
//                             U
//                           </div>
//                           <div className="flex-1">
//                             <p className="font-semibold">{c.user}</p>
//                             <p className="text-sm text-gray-600">{c.comment}</p>
//                           </div>
//                           <div className="flex flex-col items-end space-y-1">
//                             <span className="text-xs text-gray-400">{c.date}</span>
//                             <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div> */}

//                   {/* Recently Visited */}
//                   <div className="bg-white shadow rounded p-4">
//                     <h2 className="text-lg font-bold mb-4">
//                       Recently Visited
//                       <span className="text-gray-500 font-semibold ml-2">({contribData.recentlyVisited.length})</span>
//                     </h2>
//                     <ul className="space-y-4">
//                       {contribData.recentlyVisited.map((task, i) => (
//                         <li key={i} 
//                           className="border rounded-lg p-4 bg-white shadow"
//                           onClick={() => openTaskDetail(task.id)}
//                             >
//                           <div className="text-sm font-semibold mb-3">{task.title}</div>
//                           <div className="flex items-center gap-2 mb-2 flex-wrap">
//                             <span className={`text-xs px-2 py-1 rounded-full ${
//                               task.status === "Done"
//                                 ? "bg-green-100 text-green-800"
//                                 : task.status === "In Progress"
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : "bg-gray-200 text-gray-800"
//                             }`}>{task.status}</span>
//                             <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full flex items-center gap-1">
//                               <CalendarDaysIcon className="h-4 w-4" />
//                               {task.dueDate}
//                             </span>
//                             <span className={`text-xs px-2 py-1 rounded-full ${
//                               task.priority === "High"
//                                 ? "bg-red-200 text-red-800"
//                                 : task.priority === "Medium"
//                                 ? "bg-orange-200 text-orange-800"
//                                 : "bg-blue-200 text-blue-800"
//                             }`}>{task.priority}</span>
//                           </div>
//                           <div className="text-xs text-gray-700">{task.description}</div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   {/* Modal Render */}
//                   {selectedTask && taskDetail && (
//                     <TaskDetail
//                       user={user}
//                       task={taskDetail}
//                       onClose={closeTaskDetail}
//                       onUpdate={() => {/* optionally reload dashboard stats */}}
//                     />
//                   )}
//                 </div>
//               </div>
//             </>
//           )}
//         </>
//       )}

//     </div>
//   );
// }


// Latest Debugging (5/7)


import React, { useEffect, useState } from "react";
import { fetchAdminStats,fetchContributorStats, fetchManagerStats  } from "../API/DashboardAPI";

import axios from "axios";
import {
  PieChart, Pie, Cell,
  LineChart, Line,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,Label
} from "recharts";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import TaskDetail from "./TaskDetail";

const COLORS = ["#FBBF24", "#10B981", "#3B82F6"]; // yellow, green, blue
const TASK_COLORS = ["#6366F1", "#A78BFA", "#60A5FA"]; // green, yellow, red
const PROJECT_STATUS_COLORS = ["#2136d9", "#9CA3AF"];
const TASK_STATUS_COLORS = ["#9CA3AF", "#f7dc43", "#35cc6f"];
const USER_ROLE_COLORS = ["#6366F1", "#A78BFA", "#60A5FA"];

export default function Dashboard({ user }) {
    // Contributor state
  const [contribData, setContribData] = useState(null);
  const [contribLoading, setContribLoading] = useState(false);
  const [contribError, setContribError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskDetail, setTaskDetail] = useState(null);

  // Admin dynamic data
  const [adminStats, setAdminStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for period in Activity Report
  const [adminPeriod, setAdminPeriod] = useState('weekly');

    // Manager state
  const [managerData, setManagerData] = useState(null);
  const [managerLoading, setManagerLoading] = useState(false);
  const [managerError, setManagerError] = useState(null);

  // Manager dummy data
  const managedProjects = 4;
  const totalTasks = 20;
  const completedTasks = 12;
  const pendingTasks = totalTasks - completedTasks;
  const teamMembers = 7;
  const projectProgress = [
    { name: "Project Alpha", progress: 80 },
    { name: "Project Beta", progress: 55 },
  ];
  const upcomingDeadlines = [
    { task: "Design UI", due: "2025-07-01" },
    { task: "Setup Backend", due: "2025-07-03" },
    { task: "Write Docs", due: "2025-07-05" },
  ];
  // Chart period state (contributor)
    const [period, setPeriod] = useState('monthly');

  const [stats, setStats] = useState(null);

  // Contributor dummy data
  const assignedProjects = 3;
  const assignedTasks = 10;
  const tasksCompleted = 5;
  const tasksInProgress = 3;
  const tasksPending = assignedTasks - tasksCompleted - tasksInProgress;
  const contributorTaskStatus = [
    { name: "Completed", value: tasksCompleted },
    { name: "In Progress", value: tasksInProgress },
    { name: "Pending", value: tasksPending },
  ];
  const recentActivity = [
    { activity: "Submitted project report", date: "2025-06-28" },
    { activity: "Updated task status to Done", date: "2025-06-27" },
    { activity: "Joined Project Beta", date: "2025-06-25" },
  ];

//   useEffect(() => {
//     const handleUserChange = () => {
//       console.log("Refresh triggered by user change");
//       // Reload data based on role
//       if (user.role === "admin") {
//         fetchAdminStats().then(data => setAdminStats(data));
//       } else if (user.role === "manager") {
//         fetchManagerStats(user.username).then(data => setManagerData(data));
//       } else if (user.role === "contributor") {
//         fetchContributorStats(user.username).then(data => setContribData(data));
//       }
//     };

//   window.addEventListener('userStatusChanged', handleUserChange);
//   window.addEventListener('userRoleChanged', handleUserChange);

//   return () => {
//     window.removeEventListener('userStatusChanged', handleUserChange);
//     window.removeEventListener('userRoleChanged', handleUserChange);
//   };
// }, [user.role, user.username]);

//   useEffect(() => {
//     if (user.role === "admin") {
//       setLoading(true);
//       setError(null);
//       fetchAdminStats()
//         .then(data => setAdminStats(data))
//         .catch(err => setError("Failed to load admin dashboard"))
//         .finally(() => setLoading(false));
//     }
//     if (user.role === "contributor") {
//       setContribLoading(true);
//       setContribError(null);
//       fetchContributorStats(user.username)
//         .then(data => setContribData(data))
//         .catch(err => setContribError("Failed to load contributor dashboard"))
//         .finally(() => setContribLoading(false));
//     }

//     if (user.role === "manager") {
//       setManagerLoading(true);
//       setManagerError(null);
//       fetchManagerStats(user.username)
//         .then(data => setManagerData(data))
//         .catch(() => setManagerError("Failed to load manager dashboard"))
//         .finally(() => setManagerLoading(false));
//     }
//   }, [user.role,user.username]);


useEffect(() => {
  const handleUserChange = () => {
    console.log("Refresh triggered by user change");
    // Reload data based on role
    if (user.role === "admin") {
      setLoading(true);
      fetchAdminStats()
        .then(data => setAdminStats(data))
        .catch(err => setError("Failed to load admin dashboard"))
        .finally(() => setLoading(false));
    } else if (user.role === "manager") {
      setManagerLoading(true);
      fetchManagerStats(user.username)
        .then(data => setManagerData(data))
        .catch(() => setManagerError("Failed to load manager dashboard"))
        .finally(() => setManagerLoading(false));
    } else if (user.role === "contributor") {
      setContribLoading(true);
      fetchContributorStats(user.username)
        .then(data => setContribData(data))
        .catch(err => setContribError("Failed to load contributor dashboard"))
        .finally(() => setContribLoading(false));
    }
  };

  // Add event listeners
  window.addEventListener('userStatusChanged', handleUserChange);
  window.addEventListener('userRoleChanged', handleUserChange);

  // Initial load
  handleUserChange();

  // Cleanup
  return () => {
    window.removeEventListener('userStatusChanged', handleUserChange);
    window.removeEventListener('userRoleChanged', handleUserChange);
  };
}, [user.role, user.username]);


    // --- Custom tooltip/legend logic same as your template ---
    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="p-2 bg-white border rounded shadow text-xs">
            <p className="font-bold text-sm">{label}</p>
            <p className="text-teal-500 text-sm font-semibold">{payload[0].value} tasks</p>
          </div>
        );
      }
      return null;
    };
    const renderCustomLegend2 = () => (
    <div className="flex justify-center gap-6 mt-4">
      <span className="flex items-center gap-2 text-sm">
        <span className="inline-block w-3 h-3 rounded-full" style={{ background: "#6366F1" }} />
        Admin
      </span>
      <span className="flex items-center gap-2 text-sm">
        <span className="inline-block w-3 h-3 rounded-full" style={{ background: "#A78BFA" }} />
        Contributor
      </span>
      <span className="flex items-center gap-2 text-sm">
        <span className="inline-block w-3 h-3 rounded-full" style={{ background: "#60A5FA" }} />
        Manager
      </span>
    </div>
    );
    
      const renderCustomLegend = (props) => {
        const { payload } = props;
        return (
          <ul className="flex flex-col space-y-1">
            {payload
              .filter(entry => entry.payload.value > 0) // Only show if count > 0
              .map((entry, index) => (
                <li key={`item-${index}`} className="flex items-center space-x-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  ></span>
                  <span className="text-sm">{entry.value}</span>
                </li>
              ))}
          </ul>
        );
      };
    const renderProgressLabel = ({ x, y, width, value }) => {
      if (value === 0) return null; // Do not render label for 0%

      const threshold = 30; // px, when to put label outside
      const barWidth = width;
      const labelX = barWidth < threshold ? x + barWidth + 10 : x + barWidth - 10;
      const textAnchor = barWidth < threshold ? "start" : "end";
      const fillColor = barWidth < threshold ? "#222" : "#fff";

      return (
        <text
          x={labelX}
          y={y + 35}
          textAnchor={textAnchor}
          dominantBaseline="middle"
          fill={fillColor}
          fontSize={14}
        >
          {`${value}%`}
        </text>
      );
    };


    const PriorityTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        return (
          <div className="p-2 bg-white border rounded shadow text-xs">
            <p className="font-bold text-sm">{payload[0].name} : {payload[0].value}</p>
          </div>
        );
      }
      return null;
    };

    const ActivityTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded shadow text-gray-700 border border-gray-200">
          <div className="font-bold">{label}</div>
          {payload.map((entry, i) => (
            <div key={i} style={{ color: entry.color, fontWeight: 500 }}>
              {entry.name}: <span className="text-teal-500">{entry.value} users</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

    const ProjectManagerTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        const entry = payload[0];
        return (
          <div className="bg-white p-2 rounded shadow text-gray-700 border border-gray-200">
            <div className="font-bold">{entry.payload.manager}</div>
            <div className="text-teal-500">{entry.value} projects</div>
          </div>
        );
      }
      return null;
    };
  
   // Function to load a task by id
    const openTaskDetail = async (taskId) => {
      const res = await fetch(`http://localhost:5047/api/tasks/${taskId}`);
      if (res.ok) {
        const data = await res.json();
        setTaskDetail(data);
        setSelectedTask(taskId);
      }
    };

    // To close the modal
    const closeTaskDetail = () => {
      setSelectedTask(null);
      setTaskDetail(null);
    };

    // Helper for project progress bar color
    const getProgressColor = (percent) => {
      if (percent >= 75) return '#15803d';
      if (percent >= 50) return '#c1db3b';
      if (percent >= 25) return '#facc15';
      return '#f87171';
    };


  return (
    <div className="p-8">
      {/* <h1 className="text-2xl font-bold mb-6">
        Welcome, {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
      </h1> */}

      <h1 className="text-2xl font-bold mb-6">
        Welcome, {user.username
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </h1>

      {user.role === "admin" && (
            <>
              {loading && <div>Loading admin dashboard...</div>}
              {error && <div className="text-red-500">{error}</div>}
              {adminStats && (
                <>
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-purple-100 rounded p-4 text-center">
                      <p className="text-3xl font-bold">{adminStats.totalUsers}</p>
                      <h2 className="text-gray-500 text-sm">Total Users</h2>
                    </div>
                    <div className="bg-blue-100 rounded p-4 text-center">
                      <p className="text-3xl font-bold">{adminStats.totalProjects}</p>
                      <h2 className="text-gray-500 text-sm">Total Projects</h2>
                    </div>
                    <div className="bg-green-100 rounded p-4 text-center">
                      <p className="text-3xl font-bold">{adminStats.totalTasks}</p>
                      <h2 className="text-gray-500 text-sm">Total Tasks</h2>
                    </div>
                  </div>
                  {/* Activity Report & Projects by Manager */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-white shadow rounded p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Activity Report</h2>
                        <select
                          value={adminPeriod}
                          onChange={e => setAdminPeriod(e.target.value)}
                          className="border rounded px-3 py-1 text-xs"
                        >
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option> 
                          <option value="yearly">Yearly</option>
                        </select>
                      </div>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={adminStats.adminActivityDataset[adminPeriod]} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                          <YAxis label={{
                            value: 'Users', angle: -90, position: 'insideLeft',
                            offset: 15, style: { fontSize: 16, fontWeight: 'bold' }
                          }} tick={{ fontSize: 12 }} />
                          <Tooltip content={<ActivityTooltip />} />
                          <Legend verticalAlign="bottom" align="center" layout="horizontal" content={renderCustomLegend2} />
                          <Bar dataKey="admin" name="Admin" fill="#6366F1" />
                          <Bar dataKey="contributor" name="Contributor" fill="#A78BFA" />
                          <Bar dataKey="manager" name="Manager" fill="#60A5FA" />
                      </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white shadow rounded p-4">
                      <h2 className="text-lg font-bold mb-4">Projects by Project Manager</h2>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={adminStats.projectsByManager} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="manager" tick={{ fontSize: 12 }} />
                          <YAxis label={{
                            value: 'Projects', angle: -90, position: 'insideLeft',
                            offset: 15, style: { fontSize: 16, fontWeight: 'bold' }
                          }} tick={{ fontSize: 12 }} />
                          <Tooltip content={<ProjectManagerTooltip />} />
                          <Bar dataKey="projects" fill="#f06f13" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  {/* Pie charts: user by role, project by status, task by status */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white shadow rounded p-4">
                      <h2 className="text-lg font-bold mb-4">User by Role</h2>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          {(() => {
                                  const totalUsersByRole = adminStats.userByRoleData.reduce((sum, e) => sum + e.value, 0);
                                  return (
                                    <Pie data={adminStats.userByRoleData}
                                      dataKey="value"
                                      nameKey="name"
                                      outerRadius={80}
                                      innerRadius={40}
                                      labelLine={false}
                                      label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
                                        const RADIAN = Math.PI / 180;
                                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                        return (
                                          <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="12">
                                            {`${(percent * 100).toFixed(0)}%`}
                                          </text>
                                        );
                                      }}
                                    >
                                      {adminStats.userByRoleData.map((entry, i) => (
                                        <Cell key={i} fill={USER_ROLE_COLORS[i % USER_ROLE_COLORS.length]} />
                                      ))}
                                      <Label
                                        value={`Total: ${totalUsersByRole}`}
                                        position="center"
                                        fontSize={16}
                                        fontWeight="bold"
                                        fill="#333"
                                      />
                                    </Pie>
                                  );
                                })()}
                             <Tooltip content={<PriorityTooltip />} />
                          <Legend verticalAlign="top" align="right" layout="vertical" content={renderCustomLegend} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white shadow rounded p-4">
                      <h2 className="text-lg font-bold mb-4">Project by Status</h2>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          {(() => {
                          const totalProjectsByStatus = adminStats.adminProjectByStatus.reduce((sum, e) => sum + e.value, 0);
                          return (
                            <Pie
                              data={adminStats.adminProjectByStatus}
                              dataKey="value"
                              nameKey="name"
                              outerRadius={80}
                              innerRadius={40}
                              labelLine={false}
                              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
                                const RADIAN = Math.PI / 180;
                                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                return (
                                  <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="12">
                                    {`${(percent * 100).toFixed(0)}%`}
                                  </text>
                                );
                              }}
                            >
                              {adminStats.adminProjectByStatus.map((entry, i) => (
                                <Cell key={i} fill={PROJECT_STATUS_COLORS[i % PROJECT_STATUS_COLORS.length]} />
                              ))}
                              <Label
                                value={`Total: ${totalProjectsByStatus}`}
                                position="center"
                                fontSize={16}
                                fontWeight="bold"
                                fill="#333"
                              />
                            </Pie>
                              );
                            })()}
                          <Tooltip content={<PriorityTooltip />} />
                          <Legend verticalAlign="top" align="right" layout="vertical" content={renderCustomLegend} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white shadow rounded p-4">
                      <h2 className="text-lg font-bold mb-4">Task by Status</h2>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                           {(() => {
                            const totalTasksByStatus = adminStats.adminTaskByStatus.reduce((sum, e) => sum + e.value, 0);
                            return (
                              <Pie
                                data={adminStats.adminTaskByStatus}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={80}
                                innerRadius={40}
                                labelLine={false}
                                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
                                  const RADIAN = Math.PI / 180;
                                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                  return (
                                    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="12">
                                      {`${(percent * 100).toFixed(0)}%`}
                                    </text>
                                  );
                                }}
                              >
                                {adminStats.adminTaskByStatus.map((entry, i) => (
                                  <Cell key={i} fill={TASK_STATUS_COLORS[i % TASK_STATUS_COLORS.length]} />
                                ))}
                                <Label
                                  value={`Total: ${totalTasksByStatus}`}
                                  position="center"
                                  fontSize={16}
                                  fontWeight="bold"
                                  fill="#333"
                                />
                              </Pie>
                            );
                          })()}
                          <Tooltip content={<PriorityTooltip />} />
                          <Legend verticalAlign="top" align="right" layout="vertical" content={renderCustomLegend} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </>
              )}
            </>
          )}


       {user.role === "manager" && (
        <>
          {managerLoading && <div>Loading manager dashboard...</div>}
          {managerError && <div className="text-red-500">{managerError}</div>}
          {managerData && (
            <>
              {/* First Row: Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-purple-100 rounded p-4 text-center">
                  <p className="text-3xl font-bold">{managerData.totalProjects}</p>
                  <h2 className="text-gray-500 text-sm">Total Projects</h2>
                </div>
                <div className="bg-blue-100 rounded p-4 text-center">
                  <p className="text-3xl font-bold">{managerData.activeProjects}</p>
                  <h2 className="text-gray-500 text-sm">Active Projects</h2>
                </div>
                <div className="bg-green-100 rounded p-4 text-center">
                  <p className="text-3xl font-bold">{managerData.archivedProjects}</p>
                  <h2 className="text-gray-500 text-sm">Archived Projects</h2>
                </div>
                <div className="bg-yellow-100 rounded p-4 text-center">
                  <p className="text-3xl font-bold">{managerData.managerTotalTasks}</p>
                  <h2 className="text-gray-500 text-sm">Total Tasks</h2>
                </div>
              </div>

              {/* Second Row: Upcoming Project Deadlines + Overdue Tasks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white shadow rounded p-4">
                  <h2 className="text-lg font-bold mb-4">Upcoming Project Deadlines</h2>
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr>
                        <th>Members</th><th>Project</th><th>Due Date</th><th>Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {managerData.upcomingDeadlines.map((item, i) => (
                        <tr key={i} className="border-t">
                          <td>{item.employee}</td>
                          <td>{item.project}</td>
                          <td>{item.dueDate}</td>
                          <td className="py-2">
                            <div className="flex items-center w-full">
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                <div
                                  className="h-2.5 rounded-full"
                                  style={{
                                    width: `${item.progress}%`,
                                    backgroundColor: getProgressColor(item.progress)
                                  }}
                                ></div>
                              </div>
                              <span className="text-xs">{item.progress}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-white shadow rounded p-4">
                  <h2 className="text-lg font-bold mb-4">Overdue Tasks</h2>
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr>
                        <th>Overdue</th><th>Task Title</th><th>Due Date</th><th>Assigned Members</th>
                      </tr>
                    </thead>
                    <tbody>
                      {managerData.managerOverdueTasks.map((task, i) => (
                        <tr key={i} className="border-t">
                          <td className="text-red-500 py-1.5 font-medium">{task.overdue}</td>
                          <td>{task.task}</td>
                          <td>{task.dueDate}</td>
                          <td>{task.member}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Third Row: Project Progress + Project/Task Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* Project Progress */}
                <div className="bg-white shadow rounded p-4">
                  <h2 className="text-lg font-bold mb-4">Project Progress</h2>
                  <ResponsiveContainer width="100%" height={managerData.projectProgress.length * 90}>
                    <BarChart 
                      data={managerData.projectProgress} 
                      layout="vertical" 
                      margin={{ left: 10, right: 10, top: 20, bottom: 15 }}
                      barCategoryGap="10%"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis 
                        type="category" 
                        dataKey="name"
                        width={80}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip />
                      <Bar 
                        dataKey="percent"
                        barSize={60}  
                        isAnimationActive={false}
                        label={renderProgressLabel}
                      >
                        {managerData.projectProgress.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={getProgressColor(entry.percent)} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Right Column: Project by Status + Task by Status */}
                <div className="space-y-8">
                  <div className="bg-white shadow rounded p-4">
                    <h2 className="text-lg font-bold mb-4">Project by Status</h2>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        {(() => {
                          const totalProjectsByStatus = managerData.projectByStatus.reduce((sum, e) => sum + e.value, 0);
                          return (
                            <Pie
                              data={managerData.projectByStatus}
                              dataKey="value"
                              nameKey="name"
                              outerRadius={80}
                              innerRadius={40}
                              labelLine={false}
                              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
                                const RADIAN = Math.PI / 180;
                                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                return (
                                  <text
                                    x={x}
                                    y={y}
                                    fill="white"
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    fontSize="12"
                                  >
                                    {`${(percent * 100).toFixed(0)}%`}
                                  </text>
                                );
                              }}
                            >
                              {managerData.projectByStatus.map((entry, i) => (
                                <Cell
                                  key={i}
                                  fill={PROJECT_STATUS_COLORS[i % PROJECT_STATUS_COLORS.length]}
                                />
                              ))}
                              <Label
                                value={`Total: ${totalProjectsByStatus}`}
                                position="center"
                                fontSize={16}
                                fontWeight="bold"
                                fill="#333"
                              />
                            </Pie>
                          );
                        })()}
                        <Tooltip content={<PriorityTooltip />} />
                        <Legend
                          verticalAlign="top"
                          align="right"
                          layout="vertical"
                          content={renderCustomLegend}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-white shadow rounded p-4">
                    <h2 className="text-lg font-bold mb-4">Task by Status</h2>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        {(() => {
                          const totalTasksByStatus = managerData.taskByStatus.reduce((sum, e) => sum + e.value, 0);
                          return (
                            <Pie
                              data={managerData.taskByStatus}
                              dataKey="value"
                              nameKey="name"
                              outerRadius={80}
                              innerRadius={40}
                              labelLine={false}
                              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
                                const RADIAN = Math.PI / 180;
                                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                return (
                                  <text
                                    x={x}
                                    y={y}
                                    fill="white"
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    fontSize="12"
                                  >
                                    {`${(percent * 100).toFixed(0)}%`}
                                  </text>
                                );
                              }}
                            >
                              {managerData.taskByStatus.map((entry, i) => (
                                <Cell
                                  key={i}
                                  fill={TASK_STATUS_COLORS[i % TASK_STATUS_COLORS.length]}
                                />
                              ))}
                              <Label
                                value={`Total: ${totalTasksByStatus}`}
                                position="center"
                                fontSize={16}
                                fontWeight="bold"
                                fill="#333"
                              />
                            </Pie>
                          );
                        })()}
                        <Tooltip content={<PriorityTooltip />} />
                        <Legend
                          verticalAlign="top"
                          align="right"
                          layout="vertical"
                          content={renderCustomLegend}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                </div>
              </div>

              {/* Number of Tasks per Project */}
              <div className="bg-white shadow rounded p-4 mb-8">
                <h2 className="text-lg font-bold mb-4">Number of Tasks per Project</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={managerData.tasksPerProject}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="project" tick={{ fontSize: 14 }} />
                    <YAxis tick={{ fontSize: 14 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="tasks" fill="#003080" />
                    <Line type="monotone" dataKey="tasks" stroke="#06B6D4" strokeWidth={2} dot={{ r: 4 }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Right Side: Calendar, Comments, Recently Visited (if you want to keep them) */}
              {/* ... Use managerData.newComments, managerData.recentlyVisited, etc. as in your design ... */}

            </>
          )}
        </>
      )}


      {/* --- Contributor NEW DASHBOARD --- */}
      {user.role === "contributor" && (
        <>
          {contribLoading && <div>Loading contributor dashboard...</div>}
          {contribError && <div className="text-red-500">{contribError}</div>}
          {contribData && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-purple-100 rounded p-4 flex justify-center items-center gap-4">
                  <div className="flex flex-col items-center">
                    <p className="text-2xl font-bold">{contribData.totalTasks}</p>
                    <h2 className="text-gray-500 text-sm">Total Task</h2>
                  </div>
                </div>
                <div className="bg-blue-100 rounded p-4 flex justify-center items-center gap-4">
                  <div className="flex flex-col items-center">
                    <p className="text-2xl font-bold">{contribData.toDoTasks}</p>
                    <h2 className="text-gray-500 text-sm">To-Do</h2>
                  </div>
                </div>
                <div className="bg-pink-100 rounded p-4 flex justify-center items-center gap-4">
                  <div className="flex flex-col items-center">
                    <p className="text-2xl font-bold">{contribData.inProgressTasks}</p>
                    <h2 className="text-gray-500 text-sm">In-Progress</h2>
                  </div>
                </div>
                <div className="bg-green-100 rounded p-4 flex justify-center items-center gap-4">
                  <div className="flex flex-col items-center">
                    <p className="text-2xl font-bold">{contribData.doneTasks}</p>
                    <h2 className="text-gray-500 text-sm">Done</h2>
                  </div>
                </div>
              </div>

              {/* Main 3-column grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column */}
                <div className="space-y-8">
                  {/* Activity Report */}
                  <div className="bg-white shadow rounded p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-bold">Activity Report</h2>
                      <select
                        value={period}
                        onChange={e => setPeriod(e.target.value)}
                        className="border rounded px-3 py-1 text-xs"
                      >
                        {/* <option value="daily">Daily</option> */}
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                    <ResponsiveContainer width="100%" minWidth={300} height={200}>
                      <LineChart
                        data={contribData.activityDataset[period]}
                        margin={{ top: 5, right: 20, left: 0, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey={
                            period === 'daily' ? 'time' :
                            period === 'weekly' ? 'day' :
                            period === 'monthly' ? 'week' : 'month'
                          }
                          label={{
                            value:
                              period === 'daily' ? 'Time' :
                              period === 'weekly' ? 'Day' :
                              period === 'monthly' ? 'Week' : 'Month',
                            position: 'insideBottom',
                            offset: -15,
                            style: { fontSize: 16, fontWeight: 'bold' }
                          }}
                          tick={{ fontSize: 14 }}
                        />
                        <YAxis
                          label={{
                            value: 'Tasks',
                            angle: -90,
                            position: 'insideLeft',
                            offset: 15,
                            style: { fontSize: 16, fontWeight: 'bold' }
                          }}
                          tick={{ fontSize: 14 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="tasks"
                          stroke="#14B8A6"
                          dot={false}
                          activeDot={{ r: 6, strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-white shadow rounded p-4">
                  <h2 className="text-lg font-bold mb-4">Task by Priority</h2>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      {(() => {
                        const totalTasksByPriority = contribData.taskPriority.reduce((sum, e) => sum + e.value, 0);
                        return (
                          <Pie
                            data={contribData.taskPriority}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={90}
                            innerRadius={50}
                            labelLine={false}
                            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
                              if (percent === 0) return null; 
                              const RADIAN = Math.PI / 180;
                              const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
                              const x = cx + radius * Math.cos(-midAngle * RADIAN);
                              const y = cy + radius * Math.sin(-midAngle * RADIAN);
                              return (
                                <text
                                  x={x}
                                  y={y}
                                  fill="white"
                                  textAnchor="middle"
                                  dominantBaseline="central"
                                  fontSize="12"
                                >
                                  {`${(percent * 100).toFixed(0)}%`}
                                </text>
                              );
                            }}
                          >
                            {contribData.taskPriority.map((entry, i) => (
                              <Cell key={i} fill={TASK_COLORS[i % TASK_COLORS.length]} />
                            ))}
                            <Label
                              value={`Total: ${totalTasksByPriority}`}
                              position="center"
                              fontSize={16}
                              fontWeight="bold"
                              fill="#333"
                            />
                          </Pie>
                        );
                      })()}
                      <Tooltip content={<PriorityTooltip />} />
                    <Legend verticalAlign="top" align="right" layout="vertical" content={renderCustomLegend} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                </div>

                {/* Center Column */}
                <div className="space-y-8">
                  {/* Upcoming Tasks */}
                  <div className="bg-white shadow rounded p-4">
                    <h2 className="text-lg font-bold mb-4">
                      Upcoming Tasks <span className="text-gray-500 font-semibold ml-2">({contribData.upcomingTasks.length})</span>
                    </h2>
                    <ul className="space-y-4">
                      {contribData.upcomingTasks.map((task, i) => (
                        <li key={i} 
                          className="border rounded-lg p-4 bg-white shadow"
                          onClick={() => openTaskDetail(task.id)}
                           >
                          <div className="text-sm font-semibold mb-3">{task.title}</div>
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              task.status === "Done"
                                ? "bg-green-100 text-green-800"
                                : task.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-200 text-gray-800"
                            }`}>{task.status}</span>
                            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full flex items-center gap-1">
                              <CalendarDaysIcon className="h-4 w-4" />
                              {task.dueDate}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              task.priority === "High"
                                ? "bg-red-200 text-red-800"
                                : task.priority === "Medium"
                                ? "bg-orange-200 text-orange-800"
                                : "bg-blue-200 text-blue-800"
                            }`}>{task.priority}</span>
                          </div>
                          <div className="text-xs text-gray-700">{task.description}</div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Overdue Tasks */}
                  <div className="bg-white shadow rounded p-4">
                    <h2 className="text-lg font-bold mb-4">
                      Overdue Tasks <span className="text-gray-500 font-semibold ml-2">({contribData.overdueTasks.length})</span>
                    </h2>
                    <ul className="space-y-4">
                      {contribData.overdueTasks.map((task, i) => (
                        <li key={i} 
                          className="border rounded-lg p-4 bg-white shadow"
                          onClick={() => openTaskDetail(task.id)}
                            >
                          <div className="text-sm font-semibold mb-3">{task.title}</div>
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              task.status === "Done"
                                ? "bg-green-100 text-green-800"
                                : task.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-200 text-gray-800"
                            }`}>{task.status}</span>
                            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full flex items-center gap-1">
                              <CalendarDaysIcon className="h-4 w-4" />
                              {task.dueDate}
                            </span>
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Overdue</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              task.priority === "High"
                                ? "bg-red-200 text-red-800"
                                : task.priority === "Medium"
                                ? "bg-orange-200 text-orange-800"
                                : "bg-blue-200 text-blue-800"
                            }`}>{task.priority}</span>
                          </div>
                          <div className="text-xs text-gray-700">{task.description}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Calendar */}
                  <div className="bg-white shadow rounded p-4">
                    <h2 className="text-lg font-bold mb-4">Calendar</h2>
                    <Calendar
                      className="REACT-CALENDAR p-2"
                      tileClassName={({ date, view }) => {
                        view === 'month' && date.toDateString() === new Date().toDateString()
                          ? 'bg-gray-800 text-white rounded-full'
                          : ''
                      }}
                    />
                    <style jsx>{`
                      .REACT-CALENDAR {
                        border: none;
                        font-family: inherit;
                      }
                      .REACT-CALENDAR button {
                        padding: 0.5rem;
                        border-radius: 9999px;
                      }
                      .REACT-CALENDAR .react-calendar__tile--active {
                        background: #D1D5DB !important;
                        color: #111827 !important;
                        border-radius: 9999px;
                      }
                      .REACT-CALENDAR .react-calendar__tile--active:hover {
                        background: #D1D5DB !important;
                      }
                      .REACT-CALENDAR .react-calendar__navigation button {
                        font-weight: 600;
                      }
                      .REACT-CALENDAR .react-calendar__month-view__weekdays {
                        text-align: center;
                        text-transform: none;
                        font-weight: 600;
                        color: #6b7280;
                        margin-bottom: 1rem;
                        font-size: 0.875rem;
                      }
                      .REACT-CALENDAR .react-calendar__navigation__label {
                        font-size: 1rem;
                        font-weight: 700;
                      }
                      .REACT-CALENDAR abbr {
                        text-decoration: none !important;
                        border-bottom: none !important;
                      }
                      .REACT-CALENDAR .react-calendar__tile--now {
                        background: #1f2937 !important;
                        color: white !important;
                        border-radius: 9999px;
                      }
                      .REACT-CALENDAR {
                        width: 100%;
                        height: 100%;
                      }
                    `}</style>
                  </div>

                  {/* New Comments */}
                  {/* <div className="bg-white shadow rounded p-4">
                    <h2 className="text-lg font-bold mb-4">Member Comments</h2>
                    <p className="text-xs text-gray-400 mb-4">
                      Today <span className="mr-1 ml-1">•</span> {new Date().toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p> */}
                    {/* <ul className="divide-y">
                      {contribData.newComments.map((c, i) => (
                        <li key={i} className="flex items-center py-2">
                          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700 mr-3">
                            U
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{c.user}</p>
                            <p className="text-sm text-gray-600">{c.comment}</p>
                          </div>
                          <div className="flex flex-col items-end space-y-1">
                            <span className="text-xs text-gray-400">{c.date}</span>
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div> */}

                  {/* Recently Visited */}
                  <div className="bg-white shadow rounded p-4">
                    <h2 className="text-lg font-bold mb-4">
                      Recently Visited
                      <span className="text-gray-500 font-semibold ml-2">({contribData.recentlyVisited.length})</span>
                    </h2>
                    <ul className="space-y-4">
                      {contribData.recentlyVisited.map((task, i) => (
                        <li key={i} 
                          className="border rounded-lg p-4 bg-white shadow"
                          onClick={() => openTaskDetail(task.id)}
                            >
                          <div className="text-sm font-semibold mb-3">{task.title}</div>
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              task.status === "Done"
                                ? "bg-green-100 text-green-800"
                                : task.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-200 text-gray-800"
                            }`}>{task.status}</span>
                            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full flex items-center gap-1">
                              <CalendarDaysIcon className="h-4 w-4" />
                              {task.dueDate}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              task.priority === "High"
                                ? "bg-red-200 text-red-800"
                                : task.priority === "Medium"
                                ? "bg-orange-200 text-orange-800"
                                : "bg-blue-200 text-blue-800"
                            }`}>{task.priority}</span>
                          </div>
                          <div className="text-xs text-gray-700">{task.description}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Modal Render */}
                  {selectedTask && taskDetail && (
                    <TaskDetail
                      user={user}
                      task={taskDetail}
                      onClose={closeTaskDetail}
                      onUpdate={() => {/* optionally reload dashboard stats */}}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}

    </div>
  );
}
