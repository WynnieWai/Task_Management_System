// import React from "react";
// import {
//   PieChart, Pie, Cell,
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
//   ResponsiveContainer
// } from "recharts";

// export default function Dashboard({ user }) {
//   // Dummy data
//   const totalUsers = 5;
//   const totalProjects = 8;

//   const projectsByStatus = [
//     { name: "Active", value: 3 },
//     { name: "Archived", value: 2 },
//   ];

//   const projectsByManager = [
//     { manager: "Alice", projects: 2 },
//     { manager: "Bob", projects: 3 },
//     { manager: "Charlie", projects: 3 },
//   ];

//   const COLORS = ["#FBBF24", "#10B981", "#3B82F6"]; // yellow, green, blue

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

//   const TASK_COLORS = ["#10B981", "#FBBF24", "#EF4444"]; // green, yellow, red

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">
//         Welcome, {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
//       </h1>

//       {user.role === "admin" && (
//         <>
//           {/* Admin Summary cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//             <div className="bg-white shadow rounded p-4 text-center">
//               <h2 className="text-gray-500">Total Users</h2>
//               <p className="text-3xl font-bold">{totalUsers}</p>
//             </div>
//             <div className="bg-white shadow rounded p-4 text-center">
//               <h2 className="text-gray-500">Total Projects</h2>
//               <p className="text-3xl font-bold">{totalProjects}</p>
//             </div>
//           </div>

//           {/* Admin Charts */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="bg-white shadow rounded p-4">
//               <h2 className="text-lg font-semibold mb-4">Projects by Status</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={projectsByStatus}
//                     dataKey="value"
//                     nameKey="name"
//                     outerRadius={100}
//                     label
//                   >
//                     {projectsByStatus.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             <div className="bg-white shadow rounded p-4">
//               <h2 className="text-lg font-semibold mb-4">Projects by Project Manager</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={projectsByManager}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="manager" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="projects" fill="#3B82F6" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
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
//                       <Cell key={`cell-${index}`} fill={TASK_COLORS[index % TASK_COLORS.length]} />
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

import React, { useEffect, useState } from "react";
import { fetchAdminStats } from "../API/DashboardAPI";

import axios from "axios";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#FBBF24", "#10B981", "#3B82F6"]; // yellow, green, blue
const TASK_COLORS = ["#10B981", "#FBBF24", "#EF4444"]; // green, yellow, red

export default function Dashboard({ user }) {
  // Admin dynamic data
  const [adminStats, setAdminStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    if (user.role === "admin") {
      setLoading(true);
      setError(null);
      fetchAdminStats()
        .then(data => setAdminStats(data))
        .catch(err => setError("Failed to load admin stats"))
        .finally(() => setLoading(false));
    }
  }, [user.role]);
  

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
            {/* Admin Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white shadow rounded p-4 text-center">
                <h2 className="text-gray-500">Total Users</h2>
                <p className="text-3xl font-bold">{adminStats.totalUsers}</p>
              </div>
              <div className="bg-white shadow rounded p-4 text-center">
                <h2 className="text-gray-500">Total Projects</h2>
                <p className="text-3xl font-bold">{adminStats.totalProjects}</p>
              </div>
            </div>

            {/* Admin Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white shadow rounded p-4">
                <h2 className="text-lg font-semibold mb-4">Projects by Status</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={adminStats.projectsByStatus.map((item) => ({
                        name: item.status,
                        value: item.count,
                      }))}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      label
                    >
                      {adminStats.projectsByStatus.map((_, index) => (
                        <Cell
                          key={`cell-status-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white shadow rounded p-4">
                <h2 className="text-lg font-semibold mb-4">Projects by Manager</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={adminStats.projectsByManager.map((item) => ({
                      manager: item.manager,
                      projects: item.count,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="manager" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="projects" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
         )}
        </> 
      )}

      {user.role === "manager" && (
        <>
          {/* Manager Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white shadow rounded p-4 text-center">
              <h2 className="text-gray-500">Projects Managed</h2>
              <p className="text-3xl font-bold">{managedProjects}</p>
            </div>
            <div className="bg-white shadow rounded p-4 text-center">
              <h2 className="text-gray-500">Total Tasks</h2>
              <p className="text-3xl font-bold">{totalTasks}</p>
            </div>
            <div className="bg-white shadow rounded p-4 text-center">
              <h2 className="text-gray-500">Team Members</h2>
              <p className="text-3xl font-bold">{teamMembers}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Task Completion Pie Chart */}
            <div className="bg-white shadow rounded p-4">
              <h2 className="text-lg font-semibold mb-4">Task Completion</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Completed", value: completedTasks },
                      { name: "Pending", value: pendingTasks },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    <Cell fill="#10B981" />
                    <Cell fill="#FBBF24" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Project Progress */}
            <div className="bg-white shadow rounded p-4">
              <h2 className="text-lg font-semibold mb-4">Project Progress</h2>
              {projectProgress.map((proj, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <p className="text-gray-600">{proj.name}</p>
                    <p className="text-gray-600">{proj.progress}%</p>
                  </div>
                  <div className="bg-gray-200 rounded-full h-4 w-full">
                    <div
                      className="bg-blue-600 h-4 rounded-full"
                      style={{ width: `${proj.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white shadow rounded p-4 mt-8">
            <h2 className="text-lg font-semibold mb-4">Upcoming Deadlines</h2>
            <ul className="list-disc pl-5 text-gray-700">
              {upcomingDeadlines.map((task, idx) => (
                <li key={idx}>
                  {task.task} - due {task.due}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {user.role === "contributor" && (
        <>
          {/* Contributor Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white shadow rounded p-4 text-center">
              <h2 className="text-gray-500">Projects Assigned</h2>
              <p className="text-3xl font-bold">{assignedProjects}</p>
            </div>
            <div className="bg-white shadow rounded p-4 text-center">
              <h2 className="text-gray-500">Tasks Assigned</h2>
              <p className="text-3xl font-bold">{assignedTasks}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Task Status Pie Chart */}
            <div className="bg-white shadow rounded p-4">
              <h2 className="text-lg font-semibold mb-4">Task Status</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={contributorTaskStatus}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {contributorTaskStatus.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={TASK_COLORS[index % TASK_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white shadow rounded p-4">
              <h2 className="text-lg font-semibold mb-4">Upcoming Deadlines</h2>
              <ul className="list-disc pl-5 text-gray-700">
                {upcomingDeadlines.map((task, idx) => (
                  <li key={idx}>
                    {task.task} - due {task.due}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow rounded p-4 mt-8">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <ul className="list-disc pl-5 text-gray-700">
              {recentActivity.map((act, idx) => (
                <li key={idx}>
                  {act.activity} ({act.date})
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
