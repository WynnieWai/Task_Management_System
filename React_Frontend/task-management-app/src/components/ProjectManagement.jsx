// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   getAllProjects,
//   getAllUsers,
//   addProject,
//   updateProject,
//   deleteProject
// } from "../API/ProjectAPI";

// const statusOptions = ["Active", "Archived"];
// const dueStatusOptions = ["Overdue", "Done on time", "Done overdue"];

// export default function ProjectManagement({ user }) {
//   const [projects, setProjects] = useState([]);
//   const [editIdx, setEditIdx] = useState(null);
//   const [editProject, setEditProject] = useState(null);
//   const [addingNew, setAddingNew] = useState(false);
//   const [allUsers, setAllUsers] = useState([]);

//   useEffect(() => {
//     getAllProjects()
//       .then((allProjects) => {
//         let filtered;
//         if (isAdmin) {
//           filtered = allProjects;
//         } else if (isManager) {
//           filtered = allProjects.filter(
//             (p) =>
//               p.manager === user.username ||
//               ensureArray(p.members).includes(user.username)
//           );
//         } else if (isContributor) {
//           filtered = allProjects.filter((p) =>
//             ensureArray(p.members).includes(user.username)
//           );
//         }
//         setProjects(filtered);
//       })
//       .catch((err) => alert("Failed to load projects: " + err));

//     getAllUsers()
//       .then(setAllUsers)
//       .catch((err) => alert("Failed to load users: " + err));
//   }, []);

//   const isAdmin = user && user.role.toLowerCase() === "admin";
//   const isManager = user && user.role.toLowerCase() === "manager";
//   const isContributor = user && user.role.toLowerCase() === "contributor";

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setEditProject((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditTasks = (e) => {
//     setEditProject((prev) => ({
//       ...prev,
//       tasks: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
//     }));
//   };


//   const handleEdit = (idx) => {
//     const project = projects[idx];

//     if (isAdmin || (isManager && project.manager === user.username)) {
//       setEditIdx(idx);
//       setEditProject({
//         ...project,
//         members: ensureArray(project.members),
//         tasks: ensureArray(project.tasks),
//       });
//       setAddingNew(false);
//     } else {
//       alert("You are not allowed to edit this project.");
//     }
//   };

//   const handleSave = (idx) => {
//     const payload = {
//       ...editProject,
//       members: editProject.members,
//       tasks: editProject.tasks,
//       startDate: editProject.startDate ? new Date(editProject.startDate).toISOString() : "",
//       dueDate: editProject.dueDate ? new Date(editProject.dueDate).toISOString() : "",
//     };

//     if (addingNew) {
//       addProject(payload)
//         .then((newProject) => setProjects([...projects, newProject]))
//         .catch((err) => alert("Failed to add project: " + err));
//       setAddingNew(false);
//     } else {
//       const projectId = projects[editIdx].id;
//       updateProject(projectId, payload)
//         .then(() => {
//           const updated = projects.map((p, i) =>
//             i === editIdx ? { ...editProject, id: projectId } : p
//           );
//           setProjects(updated);
//         })
//         .catch((err) => alert("Failed to update project: " + err));
//     }
//     setEditIdx(null);
//     setEditProject(null);
//   };

//   const handleCancel = () => {
//     setEditIdx(null);
//     setEditProject(null);
//     setAddingNew(false);
//   };

//   const handleDelete = (idx) => {
//     const projectId = projects[idx].id;
//     deleteProject(projectId)
//       .then(() => setProjects(projects.filter((_, i) => i !== idx)))
//       .catch((err) => alert("Failed to delete project: " + err));
//   };

//   const handleAddNew = () => {
//     setAddingNew(true);
//     setEditProject({
//       title: "",
//       goals: "",
//       status: statusOptions[0],
//       manager: isManager ? user.username : "",
//       startDate: "",
//       dueDate: "",
//       dueStatus: dueStatusOptions[0],
//       members: [],
//       tasks: [],
//     });
//   };

//   const handleMemberCheckboxChange = (e, username) => {
//     const { checked } = e.target;
//     setEditProject((prev) => {
//       const members = prev.members || [];
//       return {
//         ...prev,
//         members: checked
//           ? [...members, username]
//           : members.filter((m) => m !== username),
//       };
//     });
//   };

//   const ensureArray = (val) =>
//     Array.isArray(val)
//       ? val
//       : typeof val === "string"
//         ? val.split(",").map((v) => v.trim()).filter(Boolean)
//         : [];

//   const managerUsers = allUsers.filter(
//     (u) =>
//       u.role.toLowerCase() === "manager" ||
//       u.role.toLowerCase() === "projectmanager"
//   );

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">
//         {isAdmin
//           ? "Project Management"
//           : isManager
//           ? "My Projects"
//           : isContributor
//           ? "My Projects"
//           : "Project Management"}
//       </h1>

//       {!isContributor && (
//         <button
//           className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
//           onClick={handleAddNew}
//           disabled={addingNew}
//         >
//           Create New Project
//         </button>
//       )}

//       <div className="overflow-x-auto w-full">
//         <table className="min-w-[1600px] bg-white border whitespace-nowrap">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2">Project Title</th>
//               <th className="border px-4 py-2">Goals</th>
//               <th className="border px-4 py-2">Status</th>
//               <th className="border px-4 py-2">Assigned Manager</th>
//               <th className="border px-4 py-2">Timeline</th>
//               <th className="border px-4 py-2">Due Status</th>
//               <th className="border px-4 py-2">Project Members</th>
//               <th className="border px-4 py-2">List of Tasks</th>
//               {(isAdmin || isManager) && <th className="border px-4 py-2">Actions</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {projects.map((project, idx) => (
//               <tr key={project.id || idx}>
//                 <td className="border px-4 py-2">
//                   {editIdx === idx ? (
//                     <input
//                       className="border px-2 py-1 rounded w-full"
//                       name="title"
//                       value={editProject?.title ?? ""}
//                       onChange={handleFormChange}
//                     />
//                   ) : (
//                     <Link
//                       to={`/tasks/${project.id || idx}`}
//                       className="text-blue-600 underline hover:text-blue-800"
//                     >
//                       {project.title}
//                     </Link>
//                   )}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {editIdx === idx ? (
//                     <input
//                       className="border px-2 py-1 rounded w-full"
//                       name="goals"
//                       value={editProject?.goals ?? ""}
//                       onChange={handleFormChange}
//                     />
//                   ) : (
//                     project.goals
//                   )}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {editIdx === idx ? (
//                     <select
//                       className="border px-2 py-1 rounded w-full"
//                       name="status"
//                       value={editProject?.status ?? statusOptions[0]}
//                       onChange={handleFormChange}
//                     >
//                       {statusOptions.map((s) => (
//                         <option key={s} value={s}>{s}</option>
//                       ))}
//                     </select>
//                   ) : (
//                     project.status
//                   )}
//                 </td>
//                 {(isAdmin || isManager || isContributor) && (
//                   <td className="border px-4 py-2">
//                     {editIdx === idx ? (
//                       isAdmin ? (
//                         <select
//                           className="border px-2 py-1 rounded w-full"
//                           name="manager"
//                           value={editProject?.manager ?? ""}
//                           onChange={handleFormChange}
//                         >
//                           <option value="">Select Manager</option>
//                           {managerUsers.map((u) => (
//                             <option key={u.userId} value={u.username}>
//                               {u.username}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <input
//                           type="text"
//                           className="border px-2 py-1 rounded w-full bg-gray-100"
//                           value={editProject?.manager ?? ""}
//                           disabled
//                         />
//                       )
//                     ) : (
//                       project.manager
//                     )}
//                   </td>
//                 )}
//                 <td className="border px-4 py-2">
//                   {editIdx === idx ? (
//                     <div className="flex gap-2">
//                       <input
//                         type="date"
//                         className="border px-2 py-1 rounded w-full"
//                         name="startDate"
//                         value={editProject?.startDate?.substring(0, 10) ?? ""}
//                         onChange={handleFormChange}
//                       />
//                       <span>-</span>
//                       <input
//                         type="date"
//                         className="border px-2 py-1 rounded w-full"
//                         name="dueDate"
//                         value={editProject?.dueDate?.substring(0, 10) ?? ""}
//                         onChange={handleFormChange}
//                       />
//                     </div>
//                   ) : (
//                     `${String(project.startDate).substring(0,10)} to ${String(project.dueDate).substring(0,10)}`
//                   )}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {editIdx === idx ? (
//                     <select
//                       className="border px-2 py-1 rounded w-full"
//                       name="dueStatus"
//                       value={editProject?.dueStatus ?? dueStatusOptions[0]}
//                       onChange={handleFormChange}
//                     >
//                       {dueStatusOptions.map((d) => (
//                         <option key={d} value={d}>{d}</option>
//                       ))}
//                     </select>
//                   ) : (
//                     project.dueStatus
//                   )}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {editIdx === idx ? (
//                     isAdmin || (isManager && editProject.manager === user.username) ? (
//                       <div className="max-h-40 overflow-y-auto">
//                         {allUsers.map((u) => (
//                           <div key={u.userId} className="flex items-center">
//                             <input
//                               type="checkbox"
//                               id={`member-${idx}-${u.userId}`}
//                               checked={editProject?.members?.includes(u.username) || false}
//                               onChange={(e) => handleMemberCheckboxChange(e, u.username)}
//                               className="mr-2"
//                             />
//                             <label htmlFor={`member-${idx}-${u.userId}`}>
//                               {u.username} ({u.role})
//                             </label>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="text-gray-500 italic">Editing not allowed</div>
//                     )
//                   ) : (
//                     <div className="max-h-30 overflow-y-auto">
//                       <ul className="list-disc pl-4">
//                         {ensureArray(project.members).map((m) => (
//                           <li key={m}>{m}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {editIdx === idx ? (
//                     <input
//                       className="border px-2 py-1 rounded w-full"
//                       name="tasks"
//                       value={editProject?.tasks?.join(", ") ?? ""}
//                       onChange={handleEditTasks}
//                     />
//                   ) : (
//                     <ul className="list-disc pl-4">
//                       {ensureArray(project.tasks).map((t) => (
//                         <li key={t}>{t}</li>
//                       ))}
//                     </ul>
//                   )}
//                 </td>
//                 {(isAdmin || isManager) && (
//                   <td className="border px-4 py-2">
//                     {(isAdmin || (isManager && project.manager === user.username)) ? (
//                       <div className="flex gap-2">
//                         {editIdx === idx ? (
//                           <>
//                             <button
//                               className="bg-green-500 text-white px-2 py-1 rounded"
//                               onClick={() => handleSave(idx)}
//                             >
//                               Save
//                             </button>
//                             <button
//                               className="bg-gray-400 text-white px-2 py-1 rounded"
//                               onClick={handleCancel}
//                             >
//                               Cancel
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               className="bg-yellow-400 px-2 py-1 rounded"
//                               onClick={() => handleEdit(idx)}
//                             >
//                               Edit
//                             </button>
//                             <button
//                               className="bg-red-500 text-white px-2 py-1 rounded"
//                               onClick={() => handleDelete(idx)}
//                             >
//                               Delete
//                             </button>
//                           </>
//                         )}
//                       </div>
//                     ) : (
//                       <div className="text-gray-500 italic">No action is allowed</div>
//                     )}
//                   </td>
//                 )}
              
//               </tr>
//             ))}

//             {addingNew && (
//               <tr>
//                 <td className="border px-4 py-2">
//                   <input
//                     className="border px-2 py-1 rounded w-full"
//                     name="title"
//                     value={editProject.title}
//                     onChange={handleFormChange}
//                   />
//                 </td>
//                 <td className="border px-4 py-2">
//                   <input
//                     className="border px-2 py-1 rounded w-full"
//                     name="goals"
//                     value={editProject.goals}
//                     onChange={handleFormChange}
//                   />
//                 </td>
//                 <td className="border px-4 py-2">
//                   <select
//                     className="border px-2 py-1 rounded w-full"
//                     name="status"
//                     value={editProject.status}
//                     onChange={handleFormChange}
//                   >
//                     {statusOptions.map((s) => (
//                       <option key={s} value={s}>{s}</option>
//                     ))}
//                   </select>
//                 </td>
//                 {(isAdmin || isManager) && (
//                   <td className="border px-4 py-2">
//                     {isAdmin ? (
//                       <select
//                         className="border px-2 py-1 rounded w-full"
//                         name="manager"
//                         value={editProject.manager}
//                         onChange={handleFormChange}
//                       >
//                         <option value="">Select Manager</option>
//                         {managerUsers.map((u) => (
//                           <option key={u.userId} value={u.username}>
//                             {u.username}
//                           </option>
//                         ))}
//                       </select>
//                     ) : (
//                     <input
//                       type="text"
//                       className="border px-2 py-1 rounded w-full bg-gray-100"
//                       value={editProject.manager}
//                       disabled
//                     />
//                   )}
//                   </td>
//                 )}
//                 <td className="border px-4 py-2">
//                   <div className="flex gap-2">
//                     <input
//                       type="date"
//                       className="border px-2 py-1 rounded w-full"
//                       name="startDate"
//                       value={editProject.startDate}
//                       onChange={handleFormChange}
//                     />
//                     <span>-</span>
//                     <input
//                       type="date"
//                       className="border px-2 py-1 rounded w-full"
//                       name="dueDate"
//                       value={editProject.dueDate}
//                       onChange={handleFormChange}
//                     />
//                   </div>
//                 </td>
//                 <td className="border px-4 py-2">
//                   <select
//                     className="border px-2 py-1 rounded w-full"
//                     name="dueStatus"
//                     value={editProject.dueStatus}
//                     onChange={handleFormChange}
//                   >
//                     {dueStatusOptions.map((d) => (
//                       <option key={d} value={d}>{d}</option>
//                     ))}
//                   </select>
//                 </td>
//                 <td className="border px-4 py-2">
//                   <div className="max-h-40 overflow-y-auto">
//                     {allUsers.map((u) => (
//                       <div key={u.userId} className="flex items-center">
//                         <input
//                           type="checkbox"
//                           id={`new-member-${u.userId}`}
//                           checked={editProject.members.includes(u.username)}
//                           onChange={(e) => handleMemberCheckboxChange(e, u.username)}
//                           className="mr-2"
//                         />
//                         <label htmlFor={`new-member-${u.userId}`}>
//                           {u.username} ({u.role})
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </td>
//                 <td className="border px-4 py-2">
//                   <input
//                     className="border px-2 py-1 rounded w-full"
//                     name="tasks"
//                     value={editProject.tasks.join(", ")}
//                     onChange={handleEditTasks}
//                   />
//                 </td>
//                 <td className="border px-4 py-2">
//                   <div className="flex gap-2">
//                     <button
//                       className="bg-green-500 text-white px-2 py-1 rounded"
//                       onClick={() => handleSave(projects.length)}
//                     >
//                       Add
//                     </button>
//                     <button
//                       className="bg-gray-400 text-white px-2 py-1 rounded"
//                       onClick={handleCancel}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FolderIcon } from '@heroicons/react/24/solid';
// import { CheckCircleIcon, ExclamationCircleIcon, MinusCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
// import { UsersIcon } from '@heroicons/react/24/solid';

// const statusOptions = ["Active", "Archived"];
// const sampleManagers = ["manager", "admin"];
// const dueStatusOptions = ["On track", "Overdue", "Done on time", "Done overdue"];

// const initialProjects = [
//   {
//     title: "Project Alpha",
//     goals: "Launch MVP",
//     status: "Active",
//     manager: "manager",
//     startDate: "2025-06-01",
//     dueDate: "2025-07-01",
//     dueStatus: "Done on time",
//     members: ["manager", "student"],
//     tasks: ["task1", "task2"],
//   },
//   {
//     title: "Project Beta",
//     goals: "Expand features",
//     status: "Archived",
//     manager: "admin",
//     startDate: "2025-05-01",
//     dueDate: "2025-06-15",
//     dueStatus: "Done overdue",
//     members: ["manager", "contributor"],
//     tasks: ["task1", "task2"],
//   },
// ];

// export default function ProjectManagement({ user }) {
//   const [projects, setProjects] = useState(initialProjects);
//   const [editIdx, setEditIdx] = useState(null);
//   const [editProject, setEditProject] = useState(null);
//   const [addingNew, setAddingNew] = useState(false);
  
//   const [selected, setSelected] = useState([]);
//   const selectedAll = selected.length === projects.length;

//   const isAdmin = user && user.role.toLowerCase() === "admin";
//   const isManager = user && user.role.toLowerCase() === "manager";
//   const isContributor = user && user.role.toLowerCase() === "contributor";

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setEditProject((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditMembers = (e) => {
//     setEditProject((prev) => ({
//       ...prev,
//       members: e.target.value.split(",").map((m) => m.trim()).filter(Boolean),
//     }));
//   };

//   const handleEditTasks = (e) => {
//     setEditProject((prev) => ({
//       ...prev,
//       tasks: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
//     }));
//   };

//   const handleEdit = (idx) => {
//     setEditIdx(idx);
//     setEditProject({ ...projects[idx] });
//     setAddingNew(false);
//   };

//   const handleSave = (idx) => {
//     if (addingNew) {
//       setProjects([...projects, editProject]);
//       setAddingNew(false);
//     } else {
//       const updated = projects.map((p, i) => (i === idx ? editProject : p));
//       setProjects(updated);
//     }
//     setEditIdx(null);
//     setEditProject(null);
//   };

//   const handleCancel = () => {
//     setEditIdx(null);
//     setEditProject(null);
//     setAddingNew(false);
//   };

//   const handleDelete = (idx) => {
//     setProjects(projects.filter((_, i) => i !== idx));
//   };

//   const handleAddNew = () => {
//     setAddingNew(true);
//     setEditProject({
//       title: "",
//       goals: "",
//       status: statusOptions[0],
//       manager: sampleManagers[0],
//       startDate: "",
//       dueDate: "",
//       dueStatus: dueStatusOptions[0],
//       members: [],
//       tasks: [],
//     });
//   };

//   const handleSelect = (idx) => {
//     setSelected((prev) =>
//       prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedAll) {
//       setSelected([]);
//     } else {
//       setSelected(projects.map((_, i) => i));
//     }
//   };

//   const handleBulkEdit = () => {
//     if (selected.length === 1) {
//       const idx = selected[0];
//       setEditIdx(idx);
//       setEditProject({ ...projects[idx] });
//       setAddingNew(false);
//     } else {
//       alert("Please select only one project to edit at a time.");
//     }
//   };

//   const handleBulkArchive = () => {
//     const updated = projects.map((p, idx) =>
//       selected.includes(idx) ? { ...p, status: "Archived" } : p
//     );
//     setProjects(updated);
//     setSelected([]);
//   };

//   const handleBulkDelete = () => {
//     const updated = projects.filter((_, idx) => !selected.includes(idx));
//     setProjects(updated);
//     setSelected([]);
//   };

//   const handleBulkSave = () => {
//     console.log("Projects saved:", projects);
//     alert("Changes have been saved successfully!");
//     setSelected([]);
//     setEditIdx(null);         
//     setEditProject(null);     
//     setAddingNew(false);      
//   };

//   const handleMarkArchived = (idx) => {
//     const today = new Date().toISOString().split("T")[0];
//     const updated = projects.map((p, i) => {
//       if (i === idx) {
//         const dueStatus = today <= p.dueDate ? "Done on time" : "Done overdue";
//         return { ...p, completionDate: today, dueStatus, status: "Archived" };
//       }
//       return p;
//     });
//     setProjects(updated);
//   };

//   const renderDueStatusBadge = (project) => {
//     const today = new Date().toISOString().split("T")[0];
//     let content, color, Icon;

//     if (project.status === "Active") {
//       if (today <= project.dueDate) {
//         content = "On track";
//         color = "bg-blue-100 text-blue-800";
//         Icon = InformationCircleIcon;
//       } else {
//         content = "Overdue";
//         color = "bg-red-100 text-red-800";
//         Icon = ExclamationCircleIcon;
//       }
//     } else {
//       if (project.dueStatus === "Done on time") {
//         content = "Done on time";
//         color = "bg-green-100 text-green-800";
//         Icon = CheckCircleIcon;
//       } else {
//         content = "Done overdue";
//         color = "bg-red-100 text-red-800";
//         Icon = MinusCircleIcon;
//       }
//     }

//     return (
//       <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
//         <Icon className="h-4 w-4" />
//         {content}
//       </span>
//     );
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">Projects</h1>

//       {!isContributor && (
//         <button
//           className="mb-8 bg-mycustomblue text-white font-medium px-4 py-2 rounded"
//           onClick={handleAddNew}
//         >
//           Create New Project
//         </button>
//       )}

//       {selected.length > 0 && (
//         <div className="bg-white border rounded mb-2 px-4 py-2 flex items-center justify-between shadow-sm">
//           <span className="text-xs text-gray-800">SELECTED: {selected.length}</span>
//           <div className="flex gap-2">
//             <button
//               onClick={handleBulkEdit}
//               className="bg-white hover:bg-gray-200 px-3 py-1 rounded shadow-sm hover:shadow text-gray-800 text-xs"
//             >
//               EDIT
//             </button>
//             <button
//               onClick={handleBulkArchive}
//               className="bg-white hover:bg-gray-200 px-3 py-1 rounded shadow-sm hover:shadow text-gray-800 text-xs"
//             >
//               MARK AS ARCHIVED
//             </button>
//             <button
//               onClick={handleBulkDelete}
//               className="bg-white hover:bg-gray-200 px-3 py-1 rounded shadow-sm hover:shadow text-gray-800 text-xs"
//             >
//               DELETE
//             </button>
//             <button
//               onClick={handleBulkSave}
//               className="bg-white hover:bg-green-200 text-gray-800 px-3 py-1 rounded shadow-sm hover:shadow text-xs"
//             >
//               SAVE
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="overflow-x-auto w-full">
//         <div className="inline-block min-w-full rounded-lg overflow-hidden shadow border border-gray-200">
//         <table className="min-w-[1600px] bg-white border whitespace-nowrap">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2 text-left text-sm font-semibold">
//                 <input
//                   type="checkbox"
//                   checked={selectedAll}
//                   onChange={handleSelectAll}
//                 />
//               </th>
//               <th className="border px-4 py-2 text-left text-sm font-semibold">ID</th>
//               <th className="border px-4 py-2 text-left text-sm font-semibold">Project Title</th>
//               <th className="border px-4 py-2 text-left text-sm font-semibold">Goals</th>
//               <th className="border px-4 py-2 text-left text-sm font-semibold">Status</th>
//               {isAdmin && <th className="border px-4 py-2 text-left text-sm font-semibold">Assigned Manager</th>}
//               <th className="border px-4 py-2 text-left text-sm font-semibold">Timeline</th>
//               <th className="border px-4 py-2 text-left text-sm font-semibold">Due Status</th>
//               <th className="border px-4 py-2 text-left text-sm font-semibold">Project Members</th>
//               <th className="border px-4 py-2 text-left text-sm font-semibold">List of Tasks</th>
//               <th className="border px-4 py-2 text-left text-sm font-semibold">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {projects.map((project, idx) => (
//               <tr key={idx} className={selected.includes(idx) ? "bg-green-50" : ""}>
//                 <td className="border px-4 py-2 text-sm font-normal">
//                   <input
//                     type="checkbox"
//                     checked={selected.includes(idx)}
//                     onChange={() => handleSelect(idx)}
//                   />
//                 </td>
//                 <td className="border px-4 py-2 text-sm font-normal">{idx + 1}</td>
                
//                 <td className="border px-4 py-2 text-sm font-normal">
//                   <div className="flex items-center gap-2">
//                     <FolderIcon className="h-5 w-5 text-blue-500" /> {/* Icon */}
//                     {editIdx === idx ? (
//                       <input
//                         className="border px-2 py-1 rounded w-full text-sm font-normal"
//                         name="title"
//                         value={editProject.title}
//                         onChange={handleFormChange}
//                       />
//                     ) : (
//                       <Link to={`/tasks/${idx}`} className="text-sm font-normal">
//                         {project.title}
//                       </Link>
//                     )}
//                   </div>
//                 </td>
//                 <td className="border px-4 py-2 text-sm font-normal">
//                   {editIdx === idx ? (
//                     <input
//                       className="border px-2 py-1 rounded w-full text-sm font-normal"
//                       name="goals"
//                       value={editProject.goals}
//                       onChange={handleFormChange}
//                     />
//                   ) : (
//                     project.goals
//                   )}
//                 </td>
//                 <td className="border px-4 py-2 text-sm font-normal">
//                   {editIdx === idx ? (
//                     <select
//                       className="border px-2 py-1 rounded w-full text-sm font-normal"
//                       name="status"
//                       value={editProject.status}
//                       onChange={handleFormChange}
//                     >
//                       {statusOptions.map((s) => (
//                         <option key={s} value={s}>{s}</option>
//                       ))}
//                     </select>
//                   ) : (
//                     project.status
//                   )}
//                 </td>
//                 {isAdmin && (
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {editIdx === idx ? (
//                       <select
//                         className="border px-2 py-1 rounded w-full text-sm font-normal"
//                         name="manager"
//                         value={editProject.manager}
//                         onChange={handleFormChange}
//                       >
//                         {sampleManagers.map((m) => (
//                           <option key={m} value={m}>{m}</option>
//                         ))}
//                       </select>
//                     ) : (
//                       <span className="inline-block px-2 py-1 border border-grey-500 rounded-full text-xs font-medium">
//                         {project.manager === "manager" ? "Project manager" : project.manager}
//                       </span> 
//                     )}
//                   </td>
//                 )}
//                 <td className="border px-4 py-2 text-sm font-normal">
//                   {editIdx === idx ? (
//                     <div className="flex gap-2">
//                       <input
//                         type="date"
//                         className="border px-2 py-1 rounded w-full text-sm font-normal"
//                         name="startDate"
//                         value={editProject.startDate}
//                         onChange={handleFormChange}
//                       />
//                       <span>-</span>
//                       <input
//                         type="date"
//                         className="border px-2 py-1 rounded w-full text-sm font-normal"
//                         name="dueDate"
//                         value={editProject.dueDate}
//                         onChange={handleFormChange}
//                       />
//                     </div>
//                   ) : (
//                     `${project.startDate} - ${project.dueDate}`
//                   )}
//                 </td>
//                 <td className="border px-4 py-2 text-sm font-normal">
//                   {renderDueStatusBadge(project)}
//                 </td>
//                 <td className="border px-4 py-2 text-sm font-normal">
//                   {editIdx === idx ? (
//                     <input
//                       className="border px-2 py-1 rounded w-full text-sm font-normal"
//                       name="members"
//                       value={editProject.members.join(", ")}
//                       onChange={handleEditMembers}
//                     />
//                   ) : (
//                     <ul className="list-disc pl-4 text-sm font-normal">
//                       {project.members.map((m) => (
//                         <li key={m}>{m}</li>
//                       ))}
//                     </ul>
//                   )}
//                 </td>
//                 <td className="border px-4 py-2 text-sm font-normal">
//                   {editIdx === idx ? (
//                     <input
//                       className="border px-2 py-1 rounded w-full text-sm font-normal"
//                       name="tasks"
//                       value={editProject.tasks.join(", ")}
//                       onChange={handleEditTasks}
//                     />
//                   ) : (
//                     <ul className="list-disc pl-4 text-sm font-normal">
//                       {project.tasks.map((t) => (
//                         <li key={t}>{t}</li>
//                       ))}
//                     </ul>
//                   )}
//                 </td>
//                 <td className="border px-4 py-2 text-sm font-normal">
//                   {(isAdmin || isManager) && (
//                     <div className="flex gap-2">
//                       {editIdx === idx ? (
//                         <>
//                           <button
//                             className="bg-green-500 text-white px-2 py-1 rounded text-sm font-normal"
//                             onClick={() => handleSave(idx)}
//                           >
//                             Save
//                           </button>
//                           <button
//                             className="bg-gray-400 text-white px-2 py-1 rounded text-sm font-normal"
//                             onClick={handleCancel}
//                           >
//                             Cancel
//                           </button>
//                         </>
//                       ) : (
//                         <>
//                           <button
//                             className="bg-yellow-400 px-2 py-1 rounded text-xs font-medium"
//                             onClick={() => handleEdit(idx)}
//                           >
//                             EDIT
//                           </button>
//                           <button
//                             className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium"
//                             onClick={() => handleDelete(idx)}
//                           >
//                             DELETE
//                           </button>
//                           <button
//                             className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium"
//                             onClick={() => handleMarkArchived(idx)}
//                           >
//                             MARK AS ARCHIVED
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))}

//             {addingNew && (
//               <tr>
//                 <td className="border px-4 py-2 text-xs font-medium"></td> {/* Checkbox cell */}
//                 <td className="border px-4 py-2 text-xs font-medium">{projects.length + 1}</td> {/* ID */}
//                 <td className="border px-4 py-2 text-xs font-medium">
//                   <input
//                     className="border px-2 py-1 rounded w-full text-xs font-medium"
//                     name="title"
//                     value={editProject.title}
//                     onChange={handleFormChange}
//                   />
//                 </td>
//                 <td className="border px-4 py-2 text-xs font-medium">
//                   <input
//                     className="border px-2 py-1 rounded w-full text-xs font-medium"
//                     name="goals"
//                     value={editProject.goals}
//                     onChange={handleFormChange}
//                   />
//                 </td>
//                 <td className="border px-4 py-2 text-xs font-medium">
//                   <select
//                     className="border px-2 py-1 rounded w-full text-xs font-medium"
//                     name="status"
//                     value={editProject.status}
//                     onChange={handleFormChange}
//                   >
//                     {statusOptions.map((s) => (
//                       <option key={s} value={s}>{s}</option>
//                     ))}
//                   </select>
//                 </td>
//                 {isAdmin && (
//                   <td className="border px-4 py-2 text-xs font-medium">
//                     <select
//                       className="border px-2 py-1 rounded w-full text-xs font-medium"
//                       name="manager"
//                       value={editProject.manager}
//                       onChange={handleFormChange}
//                     >
//                       {sampleManagers.map((m) => (
//                         <option key={m} value={m}>{m}</option>
//                       ))}
//                     </select>
//                   </td>
//                 )}
//                 <td className="border px-4 py-2 text-xs font-medium">
//                   <div className="flex gap-2">
//                     <input
//                       type="date"
//                       className="border px-2 py-1 rounded w-full text-xs font-medium"
//                       name="startDate"
//                       value={editProject.startDate}
//                       onChange={handleFormChange}
//                     />
//                     <span>-</span>
//                     <input
//                       type="date"
//                       className="border px-2 py-1 rounded w-full text-xs font-medium"
//                       name="dueDate"
//                       value={editProject.dueDate}
//                       onChange={handleFormChange}
//                     />
//                   </div>
//                 </td>
//                 <td className="border px-4 py-2">
//                   <select
//                     className="border px-2 py-1 rounded w-full text-xs font-medium"
//                     name="dueStatus"
//                     value={editProject.dueStatus}
//                     onChange={handleFormChange}
//                   >
//                     {dueStatusOptions.map((d) => (
//                       <option key={d} value={d}>{d}</option>
//                     ))}
//                   </select>
//                 </td>
//                 <td className="border px-4 py-2 text-xs font-medium">
//                   <input
//                     className="border px-2 py-1 rounded w-full text-xs font-medium"
//                     name="members"
//                     value={editProject.members.join(", ")}
//                     onChange={handleEditMembers}
//                   />
//                 </td>
//                 <td className="border px-4 py-2 text-xs font-medium">
//                   <input
//                     className="border px-2 py-1 rounded w-full text-xs font-medium"
//                     name="tasks"
//                     value={editProject.tasks.join(", ")}
//                     onChange={handleEditTasks}
//                   />
//                 </td>
//                 <td className="border px-4 py-2">
//                   <div className="flex gap-2">
//                     <button
//                       className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium"
//                       onClick={() => handleSave(projects.length)}
//                     >
//                       ADD
//                     </button>
//                     <button
//                       className="bg-gray-400 text-white px-2 py-1 rounded text-xs font-medium"
//                       onClick={handleCancel}
//                     >
//                       CANCEL
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             )}

//           </tbody>
//         </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FolderIcon } from '@heroicons/react/24/solid';
// import { CheckCircleIcon, ExclamationCircleIcon, MinusCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
// import { UsersIcon } from '@heroicons/react/24/solid';
// import {
//   getAllProjects,
//   getAllUsers,
//   addProject,
//   updateProject,
//   deleteProject
// } from "../API/ProjectAPI";

// const statusOptions = ["Active", "Archived"];
// const dueStatusOptions = ["On track", "Overdue", "Done on time", "Done overdue"];

// export default function ProjectManagement({ user }) {
//   const [projects, setProjects] = useState([]);
//   const [editIdx, setEditIdx] = useState(null);
//   const [editProject, setEditProject] = useState(null);
//   const [addingNew, setAddingNew] = useState(false);
//   const [allUsers, setAllUsers] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const selectedAll = selected.length === projects.length;

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = () => {
//     getAllProjects()
//       .then((allProjects) => {
//         let filtered;
//         if (isAdmin) {
//           filtered = allProjects;
//         } else if (isManager) {
//           filtered = allProjects.filter(
//             (p) =>
//               p.manager === user.username ||
//               ensureArray(p.members).includes(user.username)
//           );
//         } else if (isContributor) {
//           filtered = allProjects.filter((p) =>
//             ensureArray(p.members).includes(user.username)
//           );
//         }
//         setProjects(filtered);
//       })
//       .catch((err) => alert("Failed to load projects: " + err));

//     getAllUsers()
//       .then(setAllUsers)
//       .catch((err) => alert("Failed to load users: " + err));
//   };

//   const isAdmin = user && user.role.toLowerCase() === "admin";
//   const isManager = user && user.role.toLowerCase() === "manager";
//   const isContributor = user && user.role.toLowerCase() === "contributor";

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setEditProject((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditMembers = (e) => {
//     setEditProject((prev) => ({
//       ...prev,
//       members: e.target.value.split(",").map((m) => m.trim()).filter(Boolean),
//     }));
//   };

//   const handleEditTasks = (e) => {
//     setEditProject((prev) => ({
//       ...prev,
//       tasks: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
//     }));
//   };

//   const handleEdit = (idx) => {
//     const project = projects[idx];

//     if (isAdmin || (isManager && project.manager === user.username)) {
//       setEditIdx(idx);
//       setEditProject({
//         ...project,
//         members: ensureArray(project.members),
//         tasks: ensureArray(project.tasks),
//       });
//       setAddingNew(false);
//     } else {
//       alert("You are not allowed to edit this project.");
//     }
//   };

//   const handleSave = (idx) => {
//     const payload = {
//       ...editProject,
//       members: editProject.members,
//       tasks: editProject.tasks,
//       startDate: editProject.startDate ? new Date(editProject.startDate).toISOString() : "",
//       dueDate: editProject.dueDate ? new Date(editProject.dueDate).toISOString() : "",
//     };

//     if (addingNew) {
//       addProject(payload)
//         .then((newProject) => {
//           setProjects([...projects, newProject]);
//           setAddingNew(false);
//         })
//         .catch((err) => alert("Failed to add project: " + err));
//     } else {
//       const projectId = projects[editIdx].id;
//       updateProject(projectId, payload)
//         .then(() => {
//           const updated = projects.map((p, i) =>
//             i === editIdx ? { ...editProject, id: projectId } : p
//           );
//           setProjects(updated);
//         })
//         .catch((err) => alert("Failed to update project: " + err));
//     }
//     setEditIdx(null);
//     setEditProject(null);
//   };

//   const handleCancel = () => {
//     setEditIdx(null);
//     setEditProject(null);
//     setAddingNew(false);
//   };

//   const handleDelete = (idx) => {
//     const projectId = projects[idx].id;
//     deleteProject(projectId)
//       .then(() => setProjects(projects.filter((_, i) => i !== idx)))
//       .catch((err) => alert("Failed to delete project: " + err));
//   };

//   const handleAddNew = () => {
//     setAddingNew(true);
//     setEditProject({
//       title: "",
//       goals: "",
//       status: statusOptions[0],
//       manager: isManager ? user.username : "",
//       startDate: "",
//       dueDate: "",
//       dueStatus: dueStatusOptions[0],
//       members: [],
//       tasks: [],
//     });
//   };

//   const handleSelect = (idx) => {
//     setSelected((prev) =>
//       prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedAll) {
//       setSelected([]);
//     } else {
//       setSelected(projects.map((_, i) => i));
//     }
//   };

//   const handleBulkEdit = () => {
//     if (selected.length === 1) {
//       const idx = selected[0];
//       handleEdit(idx);
//     } else {
//       alert("Please select only one project to edit at a time.");
//     }
//   };

//   const handleBulkArchive = () => {
//     const today = new Date().toISOString().split("T")[0];
//     const updates = selected.map(idx => {
//       const project = projects[idx];
//       const dueStatus = today <= project.dueDate ? "Done on time" : "Done overdue";
//       return {
//         ...project,
//         status: "Archived",
//         dueStatus
//       };
//     });

//     Promise.all(updates.map(update => 
//       updateProject(update.id, update)
//     ))
//     .then(() => {
//       fetchData(); // Refresh data after bulk update
//       setSelected([]);
//     })
//     .catch(err => alert("Failed to archive projects: " + err));
//   };

//   const handleBulkDelete = () => {
//     if (confirm(`Are you sure you want to delete ${selected.length} projects?`)) {
//       Promise.all(selected.map(idx => 
//         deleteProject(projects[idx].id)
//       ))
//       .then(() => {
//         fetchData(); // Refresh data after bulk delete
//         setSelected([]);
//       })
//       .catch(err => alert("Failed to delete projects: " + err));
//     }
//   };

//   const handleBulkSave = () => {
//     alert("Changes have been saved successfully!");
//     setSelected([]);
//     setEditIdx(null);         
//     setEditProject(null);     
//     setAddingNew(false);      
//   };

//   const handleMarkArchived = (idx) => {
//     const today = new Date().toISOString().split("T")[0];
//     const project = projects[idx];
//     const dueStatus = today <= project.dueDate ? "Done on time" : "Done overdue";
    
//     updateProject(project.id, {
//       ...project,
//       status: "Archived",
//       dueStatus
//     })
//     .then(() => fetchData())
//     .catch(err => alert("Failed to archive project: " + err));
//   };

//   const renderDueStatusBadge = (project) => {
//     const today = new Date().toISOString().split("T")[0];
//     let content, color, Icon;

//     if (project.status === "Active") {
//       if (today <= project.dueDate) {
//         content = "On track";
//         color = "bg-blue-100 text-blue-800";
//         Icon = InformationCircleIcon;
//       } else {
//         content = "Overdue";
//         color = "bg-red-100 text-red-800";
//         Icon = ExclamationCircleIcon;
//       }
//     } else {
//       if (project.dueStatus === "Done on time") {
//         content = "Done on time";
//         color = "bg-green-100 text-green-800";
//         Icon = CheckCircleIcon;
//       } else {
//         content = "Done overdue";
//         color = "bg-red-100 text-red-800";
//         Icon = MinusCircleIcon;
//       }
//     }

//     return (
//       <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
//         <Icon className="h-4 w-4" />
//         {content}
//       </span>
//     );
//   };

//   const ensureArray = (val) =>
//     Array.isArray(val)
//       ? val
//       : typeof val === "string"
//         ? val.split(",").map((v) => v.trim()).filter(Boolean)
//         : [];

//   const managerUsers = allUsers.filter(
//     (u) =>
//       u.role.toLowerCase() === "manager" ||
//       u.role.toLowerCase() === "projectmanager"
//   );

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">
//         {isAdmin
//           ? "Projects"
//           : isManager
//           ? "My Projects"
//           : isContributor
//           ? "My Projects"
//           : "Project Management"}
//       </h1>

//       {!isContributor && (
//         <button
//           className="mb-8 bg-mycustomblue text-white font-medium px-4 py-2 rounded"
//           onClick={handleAddNew}
//           disabled={addingNew}
//         >
//           Create New Project
//         </button>
//       )}

//       {selected.length > 0 && (
//         <div className="bg-white border rounded mb-2 px-4 py-2 flex items-center justify-between shadow-sm">
//           <span className="text-xs text-gray-800">SELECTED: {selected.length}</span>
//           <div className="flex gap-2">
//             <button
//               onClick={handleBulkEdit}
//               className="bg-white hover:bg-gray-200 px-3 py-1 rounded shadow-sm hover:shadow text-gray-800 text-xs"
//             >
//               EDIT
//             </button>
//             <button
//               onClick={handleBulkArchive}
//               className="bg-white hover:bg-gray-200 px-3 py-1 rounded shadow-sm hover:shadow text-gray-800 text-xs"
//             >
//               MARK AS ARCHIVED
//             </button>
//             <button
//               onClick={handleBulkDelete}
//               className="bg-white hover:bg-gray-200 px-3 py-1 rounded shadow-sm hover:shadow text-gray-800 text-xs"
//             >
//               DELETE
//             </button>
//             <button
//               onClick={handleBulkSave}
//               className="bg-white hover:bg-green-200 text-gray-800 px-3 py-1 rounded shadow-sm hover:shadow text-xs"
//             >
//               SAVE
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="overflow-x-auto w-full">
//         <div className="inline-block min-w-full rounded-lg overflow-hidden shadow border border-gray-200">
//           <table className="min-w-[1600px] bg-white border whitespace-nowrap">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">
//                   <input
//                     type="checkbox"
//                     checked={selectedAll}
//                     onChange={handleSelectAll}
//                   />
//                 </th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">ID</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">Project Title</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">Goals</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">Status</th>
//                 {isAdmin && <th className="border px-4 py-2 text-left text-sm font-semibold">Assigned Manager</th>}
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">Timeline</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">Due Status</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">Project Members</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">List of Tasks</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {projects.map((project, idx) => (
//                 <tr key={project.id || idx} className={selected.includes(idx) ? "bg-green-50" : ""}>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     <input
//                       type="checkbox"
//                       checked={selected.includes(idx)}
//                       onChange={() => handleSelect(idx)}
//                     />
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">{idx + 1}</td>
                  
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     <div className="flex items-center gap-2">
//                       <FolderIcon className="h-5 w-5 text-blue-500" />
//                       {editIdx === idx ? (
//                         <input
//                           className="border px-2 py-1 rounded w-full text-sm font-normal"
//                           name="title"
//                           value={editProject.title}
//                           onChange={handleFormChange}
//                         />
//                       ) : (
//                         <Link to={`/tasks/${project.id || idx}`} className="text-sm font-normal">
//                           {project.title}
//                         </Link>
//                       )}
//                     </div>
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {editIdx === idx ? (
//                       <input
//                         className="border px-2 py-1 rounded w-full text-sm font-normal"
//                         name="goals"
//                         value={editProject.goals}
//                         onChange={handleFormChange}
//                       />
//                     ) : (
//                       project.goals
//                     )}
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {editIdx === idx ? (
//                       <select
//                         className="border px-2 py-1 rounded w-full text-sm font-normal"
//                         name="status"
//                         value={editProject.status}
//                         onChange={handleFormChange}
//                       >
//                         {statusOptions.map((s) => (
//                           <option key={s} value={s}>{s}</option>
//                         ))}
//                       </select>
//                     ) : (
//                       project.status
//                     )}
//                   </td>
//                   {isAdmin && (
//                     <td className="border px-4 py-2 text-sm font-normal">
//                       {editIdx === idx ? (
//                         <select
//                           className="border px-2 py-1 rounded w-full text-sm font-normal"
//                           name="manager"
//                           value={editProject.manager}
//                           onChange={handleFormChange}
//                         >
//                           <option value="">Select Manager</option>
//                           {managerUsers.map((u) => (
//                             <option key={u.userId} value={u.username}>
//                               {u.username}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <span className="inline-block px-2 py-1 border border-grey-500 rounded-full text-xs font-medium">
//                           {project.manager === "manager" ? "Project manager" : project.manager}
//                         </span> 
//                       )}
//                     </td>
//                   )}
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {editIdx === idx ? (
//                       <div className="flex gap-2">
//                         <input
//                           type="date"
//                           className="border px-2 py-1 rounded w-full text-sm font-normal"
//                           name="startDate"
//                           value={editProject.startDate?.substring(0, 10) ?? ""}
//                           onChange={handleFormChange}
//                         />
//                         <span>-</span>
//                         <input
//                           type="date"
//                           className="border px-2 py-1 rounded w-full text-sm font-normal"
//                           name="dueDate"
//                           value={editProject.dueDate?.substring(0, 10) ?? ""}
//                           onChange={handleFormChange}
//                         />
//                       </div>
//                     ) : (
//                       `${project.startDate?.substring(0, 10) ?? ''} - ${project.dueDate?.substring(0, 10) ?? ''}`
//                     )}
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {renderDueStatusBadge(project)}
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {editIdx === idx ? (
//                       isAdmin || (isManager && editProject.manager === user.username) ? (
//                         <input
//                           className="border px-2 py-1 rounded w-full text-sm font-normal"
//                           name="members"
//                           value={editProject.members.join(", ")}
//                           onChange={handleEditMembers}
//                         />
//                       ) : (
//                         <div className="text-gray-500 italic">Editing not allowed</div>
//                       )
//                     ) : (
//                       <ul className="list-disc pl-4 text-sm font-normal">
//                         {ensureArray(project.members).map((m) => (
//                           <li key={m}>{m}</li>
//                         ))}
//                       </ul>
//                     )}
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {editIdx === idx ? (
//                       <input
//                         className="border px-2 py-1 rounded w-full text-sm font-normal"
//                         name="tasks"
//                         value={editProject.tasks.join(", ")}
//                         onChange={handleEditTasks}
//                       />
//                     ) : (
//                       <ul className="list-disc pl-4 text-sm font-normal">
//                         {ensureArray(project.tasks).map((t) => (
//                           <li key={t}>{t}</li>
//                         ))}
//                       </ul>
//                     )}
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {(isAdmin || isManager) && (
//                       <div className="flex gap-2">
//                         {editIdx === idx ? (
//                           <>
//                             <button
//                               className="bg-green-500 text-white px-2 py-1 rounded text-sm font-normal"
//                               onClick={() => handleSave(idx)}
//                             >
//                               Save
//                             </button>
//                             <button
//                               className="bg-gray-400 text-white px-2 py-1 rounded text-sm font-normal"
//                               onClick={handleCancel}
//                             >
//                               Cancel
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             {(isAdmin || (isManager && project.manager === user.username)) && (
//                               <>
//                                 <button
//                                   className="bg-yellow-400 px-2 py-1 rounded text-xs font-medium"
//                                   onClick={() => handleEdit(idx)}
//                                 >
//                                   EDIT
//                                 </button>
//                                 <button
//                                   className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium"
//                                   onClick={() => handleDelete(idx)}
//                                 >
//                                   DELETE
//                                 </button>
//                                 {project.status === "Active" && (
//                                   <button
//                                     className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium"
//                                     onClick={() => handleMarkArchived(idx)}
//                                   >
//                                     MARK AS ARCHIVED
//                                   </button>
//                                 )}
//                               </>
//                             )}
//                           </>
//                         )}
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}

//               {addingNew && (
//                 <tr>
//                   <td className="border px-4 py-2 text-xs font-medium"></td>
//                   <td className="border px-4 py-2 text-xs font-medium">{projects.length + 1}</td>
//                   <td className="border px-4 py-2 text-xs font-medium">
//                     <input
//                       className="border px-2 py-1 rounded w-full text-xs font-medium"
//                       name="title"
//                       value={editProject.title}
//                       onChange={handleFormChange}
//                     />
//                   </td>
//                   <td className="border px-4 py-2 text-xs font-medium">
//                     <input
//                       className="border px-2 py-1 rounded w-full text-xs font-medium"
//                       name="goals"
//                       value={editProject.goals}
//                       onChange={handleFormChange}
//                     />
//                   </td>
//                   <td className="border px-4 py-2 text-xs font-medium">
//                     <select
//                       className="border px-2 py-1 rounded w-full text-xs font-medium"
//                       name="status"
//                       value={editProject.status}
//                       onChange={handleFormChange}
//                     >
//                       {statusOptions.map((s) => (
//                         <option key={s} value={s}>{s}</option>
//                       ))}
//                     </select>
//                   </td>
//                   {isAdmin && (
//                     <td className="border px-4 py-2 text-xs font-medium">
//                       <select
//                         className="border px-2 py-1 rounded w-full text-xs font-medium"
//                         name="manager"
//                         value={editProject.manager}
//                         onChange={handleFormChange}
//                       >
//                         <option value="">Select Manager</option>
//                         {managerUsers.map((u) => (
//                           <option key={u.userId} value={u.username}>
//                             {u.username}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                   )}
//                   <td className="border px-4 py-2 text-xs font-medium">
//                     <div className="flex gap-2">
//                       <input
//                         type="date"
//                         className="border px-2 py-1 rounded w-full text-xs font-medium"
//                         name="startDate"
//                         value={editProject.startDate}
//                         onChange={handleFormChange}
//                       />
//                       <span>-</span>
//                       <input
//                         type="date"
//                         className="border px-2 py-1 rounded w-full text-xs font-medium"
//                         name="dueDate"
//                         value={editProject.dueDate}
//                         onChange={handleFormChange}
//                       />
//                     </div>
//                   </td>
//                   <td className="border px-4 py-2">
//                     <select
//                       className="border px-2 py-1 rounded w-full text-xs font-medium"
//                       name="dueStatus"
//                       value={editProject.dueStatus}
//                       onChange={handleFormChange}
//                     >
//                       {dueStatusOptions.map((d) => (
//                         <option key={d} value={d}>{d}</option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="border px-4 py-2 text-xs font-medium">
//                     <input
//                       className="border px-2 py-1 rounded w-full text-xs font-medium"
//                       name="members"
//                       value={editProject.members.join(", ")}
//                       onChange={handleEditMembers}
//                     />
//                   </td>
//                   <td className="border px-4 py-2 text-xs font-medium">
//                     <input
//                       className="border px-2 py-1 rounded w-full text-xs font-medium"
//                       name="tasks"
//                       value={editProject.tasks.join(", ")}
//                       onChange={handleEditTasks}
//                     />
//                   </td>
//                   <td className="border px-4 py-2">
//                     <div className="flex gap-2">
//                       <button
//                         className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium"
//                         onClick={() => handleSave(projects.length)}
//                       >
//                         ADD
//                       </button>
//                       <button
//                         className="bg-gray-400 text-white px-2 py-1 rounded text-xs font-medium"
//                         onClick={handleCancel}
//                       >
//                         CANCEL
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// // 1st modified ver
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FolderIcon } from '@heroicons/react/24/solid';
// import { CheckCircleIcon, ExclamationCircleIcon, MinusCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
// import { UsersIcon } from '@heroicons/react/24/solid';
// import {
//   getAllProjects,
//   getAllUsers,
//   addProject,
//   updateProject,
//   deleteProject
// } from "../API/ProjectAPI";

// const statusOptions = ["Active", "Archived"];
// const dueStatusOptions = ["On track", "Overdue", "Done on time", "Done overdue"];

// export default function ProjectManagement({ user }) {
//   const [projects, setProjects] = useState([]);
//   const [editIdx, setEditIdx] = useState(null);
//   const [editProject, setEditProject] = useState(null);
//   const [addingNew, setAddingNew] = useState(false);
//   const [allUsers, setAllUsers] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const selectedAll = selected.length === projects.length;

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = () => {
//     getAllProjects()
//       .then((allProjects) => {
//         let filtered;
//         if (isAdmin) {
//           filtered = allProjects;
//         } else if (isManager) {
//           filtered = allProjects.filter(
//             (p) =>
//               p.manager === user.username ||
//               ensureArray(p.members).includes(user.username)
//           );
//         } else if (isContributor) {
//           filtered = allProjects.filter((p) =>
//             ensureArray(p.members).includes(user.username)
//           );
//         }
//         setProjects(filtered);
//       })
//       .catch((err) => alert("Failed to load projects: " + err));

//     getAllUsers()
//       .then(setAllUsers)
//       .catch((err) => alert("Failed to load users: " + err));
//   };

//   const isAdmin = user && user.role.toLowerCase() === "admin";
//   const isManager = user && user.role.toLowerCase() === "manager";
//   const isContributor = user && user.role.toLowerCase() === "contributor";

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setEditProject((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditMembers = (e) => {
//     setEditProject((prev) => ({
//       ...prev,
//       members: e.target.value.split(",").map((m) => m.trim()).filter(Boolean),
//     }));
//   };

//   const handleEditTasks = (e) => {
//     setEditProject((prev) => ({
//       ...prev,
//       tasks: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
//     }));
//   };

//   const handleEdit = (idx) => {
//     const project = projects[idx];

//     if (isAdmin || (isManager && project.manager === user.username)) {
//       setEditIdx(idx);
//       setEditProject({
//         ...project,
//         members: ensureArray(project.members),
//         tasks: ensureArray(project.tasks),
//       });
//       setAddingNew(false);
//     } else {
//       alert("You are not allowed to edit this project.");
//     }
//   };

//   const handleSave = (idx) => {
//     const payload = {
//       ...editProject,
//       members: editProject.members,
//       tasks: editProject.tasks,
//       startDate: editProject.startDate ? new Date(editProject.startDate).toISOString() : "",
//       dueDate: editProject.dueDate ? new Date(editProject.dueDate).toISOString() : "",
//     };

//     if (addingNew) {
//       addProject(payload)
//         .then((newProject) => {
//           setProjects([...projects, newProject]);
//           setAddingNew(false);
//         })
//         .catch((err) => alert("Failed to add project: " + err));
//     } else {
//       const projectId = projects[editIdx].id;
//       updateProject(projectId, payload)
//         .then(() => {
//           const updated = projects.map((p, i) =>
//             i === editIdx ? { ...editProject, id: projectId } : p
//           );
//           setProjects(updated);
//         })
//         .catch((err) => alert("Failed to update project: " + err));
//     }
//     setEditIdx(null);
//     setEditProject(null);
//     setSelected([]);
//   };

//   const handleCancel = () => {
//     setEditIdx(null);
//     setEditProject(null);
//     setAddingNew(false);
//     setSelected([]);
//   };

//   const handleDelete = () => {
//     if (selected.length === 0) return;
    
//     if (confirm(`Are you sure you want to delete ${selected.length} project(s)?`)) {
//       Promise.all(selected.map(idx => 
//         deleteProject(projects[idx].id)
//       ))
//       .then(() => {
//         fetchData();
//         setSelected([]);
//       })
//       .catch(err => alert("Failed to delete projects: " + err));
//     }
//   };

//   const handleAddNew = () => {
//     setAddingNew(true);
//     setEditProject({
//       title: "",
//       goals: "",
//       status: statusOptions[0],
//       manager: isManager ? user.username : "",
//       startDate: "",
//       dueDate: "",
//       dueStatus: dueStatusOptions[0],
//       members: [],
//       tasks: [],
//     });
//   };

//   const handleSelect = (idx) => {
//     setSelected((prev) =>
//       prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedAll) {
//       setSelected([]);
//     } else {
//       setSelected(projects.map((_, i) => i));
//     }
//   };

//   const handleBulkArchive = () => {
//     if (selected.length === 0) return;
    
//     const today = new Date().toISOString().split("T")[0];
//     const updates = selected.map(idx => {
//       const project = projects[idx];
//       const dueStatus = today <= project.dueDate ? "Done on time" : "Done overdue";
//       return {
//         ...project,
//         status: "Archived",
//         dueStatus
//       };
//     });

//     Promise.all(updates.map(update => 
//       updateProject(update.id, update)
//     ))
//     .then(() => {
//       fetchData();
//       setSelected([]);
//     })
//     .catch(err => alert("Failed to archive projects: " + err));
//   };

//   const renderDueStatusBadge = (project) => {
//     const today = new Date().toISOString().split("T")[0];
//     let content, color, Icon;

//     if (project.status === "Active") {
//       if (today <= project.dueDate) {
//         content = "On track";
//         color = "bg-blue-100 text-blue-800";
//         Icon = InformationCircleIcon;
//       } else {
//         content = "Overdue";
//         color = "bg-red-100 text-red-800";
//         Icon = ExclamationCircleIcon;
//       }
//     } else {
//       if (project.dueStatus === "Done on time") {
//         content = "Done on time";
//         color = "bg-green-100 text-green-800";
//         Icon = CheckCircleIcon;
//       } else {
//         content = "Done overdue";
//         color = "bg-red-100 text-red-800";
//         Icon = MinusCircleIcon;
//       }
//     }

//     return (
//       <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
//         <Icon className="h-4 w-4" />
//         {content}
//       </span>
//     );
//   };

//   const ensureArray = (val) =>
//     Array.isArray(val)
//       ? val
//       : typeof val === "string"
//         ? val.split(",").map((v) => v.trim()).filter(Boolean)
//         : [];

//   const managerUsers = allUsers.filter(
//     (u) =>
//       u.role.toLowerCase() === "manager" ||
//       u.role.toLowerCase() === "projectmanager"
//   );

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">
//         {isAdmin
//           ? "Projects"
//           : isManager
//           ? "My Projects"
//           : isContributor
//           ? "My Projects"
//           : "Project Management"}
//       </h1>

//       {!isContributor && (
//         <button
//           className="mb-8 bg-mycustomblue text-white font-medium px-4 py-2 rounded"
//           onClick={handleAddNew}
//           disabled={addingNew}
//         >
//           Create New Project
//         </button>
//       )}

//       {(selected.length > 0 || addingNew) && (
//         <div className="bg-white border rounded mb-2 px-4 py-2 flex items-center justify-between shadow-sm">
//           <span className="text-xs text-gray-800">
//             {addingNew ? "ADDING NEW PROJECT" : `SELECTED: ${selected.length}`}
//           </span>
//           <div className="flex gap-2">
//             {addingNew ? (
//               <>
//                 <button
//                   onClick={() => handleSave(projects.length)}
//                   className="bg-green-500 text-white px-3 py-1 rounded shadow-sm hover:shadow text-xs"
//                 >
//                   SAVE
//                 </button>
//                 <button
//                   onClick={handleCancel}
//                   className="bg-gray-400 text-white px-3 py-1 rounded shadow-sm hover:shadow text-xs"
//                 >
//                   CANCEL
//                 </button>
//               </>
//             ) : (
//               <>
//                 {selected.length === 1 && (
//                   <button
//                     onClick={() => handleEdit(selected[0])}
//                     className="bg-yellow-400 px-3 py-1 rounded shadow-sm hover:shadow text-gray-800 text-xs"
//                   >
//                     EDIT
//                   </button>
//                 )}
//                 {(editIdx !== null) && (
//                   <button
//                     onClick={() => handleSave(editIdx)}
//                     className="bg-green-500 text-white px-3 py-1 rounded shadow-sm hover:shadow text-xs"
//                   >
//                     SAVE
//                   </button>
//                 )}
//                 <button
//                   onClick={handleBulkArchive}
//                   className="bg-blue-500 text-white px-3 py-1 rounded shadow-sm hover:shadow text-xs"
//                 >
//                   MARK AS ARCHIVED
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   className="bg-red-500 text-white px-3 py-1 rounded shadow-sm hover:shadow text-xs"
//                 >
//                   DELETE
//                 </button>
//                 <button
//                   onClick={handleCancel}
//                   className="bg-gray-400 text-white px-3 py-1 rounded shadow-sm hover:shadow text-xs"
//                 >
//                   CANCEL
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       <div className="overflow-x-auto w-full">
//         <div className="inline-block min-w-full rounded-lg overflow-hidden shadow border border-gray-200">
//           <table className="min-w-[1600px] bg-white border whitespace-nowrap">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">
//                   <input
//                     type="checkbox"
//                     checked={selectedAll}
//                     onChange={handleSelectAll}
//                   />
//                 </th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">ID</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">Project Title</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">Goals</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">Status</th>
//                 {isAdmin && <th className="border px-4 py-2 text-left text-sm font-semibold">Assigned Manager</th>}
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">Timeline</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">Due Status</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">Project Members</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">List of Tasks</th>
//               </tr>
//             </thead>

//             <tbody>
//               {projects.map((project, idx) => (
//                 <tr key={project.id || idx} className={selected.includes(idx) ? "bg-green-50" : ""}>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     <input
//                       type="checkbox"
//                       checked={selected.includes(idx)}
//                       onChange={() => handleSelect(idx)}
//                     />
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">{idx + 1}</td>
                  
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     <div className="flex items-center gap-2">
//                       <FolderIcon className="h-5 w-5 text-blue-500" />
//                       {editIdx === idx ? (
//                         <input
//                           className="border px-2 py-1 rounded w-full text-sm font-normal"
//                           name="title"
//                           value={editProject.title}
//                           onChange={handleFormChange}
//                         />
//                       ) : (
//                         <Link to={`/tasks/${project.id || idx}`} className="text-sm font-normal">
//                           {project.title}
//                         </Link>
//                       )}
//                     </div>
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {editIdx === idx ? (
//                       <input
//                         className="border px-2 py-1 rounded w-full text-sm font-normal"
//                         name="goals"
//                         value={editProject.goals}
//                         onChange={handleFormChange}
//                       />
//                     ) : (
//                       project.goals
//                     )}
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {editIdx === idx ? (
//                       <select
//                         className="border px-2 py-1 rounded w-full text-sm font-normal"
//                         name="status"
//                         value={editProject.status}
//                         onChange={handleFormChange}
//                       >
//                         {statusOptions.map((s) => (
//                           <option key={s} value={s}>{s}</option>
//                         ))}
//                       </select>
//                     ) : (
//                       project.status
//                     )}
//                   </td>
//                   {isAdmin && (
//                     <td className="border px-4 py-2 text-sm font-normal">
//                       {editIdx === idx ? (
//                         <select
//                           className="border px-2 py-1 rounded w-full text-sm font-normal"
//                           name="manager"
//                           value={editProject.manager}
//                           onChange={handleFormChange}
//                         >
//                           <option value="">Select Manager</option>
//                           {managerUsers.map((u) => (
//                             <option key={u.userId} value={u.username}>
//                               {u.username}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <span className="inline-block px-2 py-1 border border-grey-500 rounded-full text-xs font-medium">
//                           {project.manager === "manager" ? "Project manager" : project.manager}
//                         </span> 
//                       )}
//                     </td>
//                   )}
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {editIdx === idx ? (
//                       <div className="flex gap-2">
//                         <input
//                           type="date"
//                           className="border px-2 py-1 rounded w-full text-sm font-normal"
//                           name="startDate"
//                           value={editProject.startDate?.substring(0, 10) ?? ""}
//                           onChange={handleFormChange}
//                         />
//                         <span>-</span>
//                         <input
//                           type="date"
//                           className="border px-2 py-1 rounded w-full text-sm font-normal"
//                           name="dueDate"
//                           value={editProject.dueDate?.substring(0, 10) ?? ""}
//                           onChange={handleFormChange}
//                         />
//                       </div>
//                     ) : (
//                       `${project.startDate?.substring(0, 10) ?? ''} - ${project.dueDate?.substring(0, 10) ?? ''}`
//                     )}
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {renderDueStatusBadge(project)}
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {editIdx === idx ? (
//                       isAdmin || (isManager && editProject.manager === user.username) ? (
//                         <input
//                           className="border px-2 py-1 rounded w-full text-sm font-normal"
//                           name="members"
//                           value={editProject.members.join(", ")}
//                           onChange={handleEditMembers}
//                         />
//                       ) : (
//                         <div className="text-gray-500 italic">Editing not allowed</div>
//                       )
//                     ) : (
//                       <ul className="list-disc pl-4 text-sm font-normal">
//                         {ensureArray(project.members).map((m) => (
//                           <li key={m}>{m}</li>
//                         ))}
//                       </ul>
//                     )}
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {editIdx === idx ? (
//                       <input
//                         className="border px-2 py-1 rounded w-full text-sm font-normal"
//                         name="tasks"
//                         value={editProject.tasks.join(", ")}
//                         onChange={handleEditTasks}
//                       />
//                     ) : (
//                       <ul className="list-disc pl-4 text-sm font-normal">
//                         {ensureArray(project.tasks).map((t) => (
//                           <li key={t}>{t}</li>
//                         ))}
//                       </ul>
//                     )}
//                   </td>
//                 </tr>
//               ))}

//               {addingNew && (
//                 <tr>
//                   <td className="border px-4 py-2 text-xs font-medium"></td>
//                   <td className="border px-4 py-2 text-xs font-medium">{projects.length + 1}</td>
//                   <td className="border px-4 py-2 text-xs font-medium">
//                     <input
//                       className="border px-2 py-1 rounded w-full text-xs font-medium"
//                       name="title"
//                       value={editProject.title}
//                       onChange={handleFormChange}
//                     />
//                   </td>
//                   <td className="border px-4 py-2 text-xs font-medium">
//                     <input
//                       className="border px-2 py-1 rounded w-full text-xs font-medium"
//                       name="goals"
//                       value={editProject.goals}
//                       onChange={handleFormChange}
//                     />
//                   </td>
//                   <td className="border px-4 py-2 text-xs font-medium">
//                     <select
//                       className="border px-2 py-1 rounded w-full text-xs font-medium"
//                       name="status"
//                       value={editProject.status}
//                       onChange={handleFormChange}
//                     >
//                       {statusOptions.map((s) => (
//                         <option key={s} value={s}>{s}</option>
//                       ))}
//                     </select>
//                   </td>
//                   {isAdmin && (
//                     <td className="border px-4 py-2 text-xs font-medium">
//                       <select
//                         className="border px-2 py-1 rounded w-full text-xs font-medium"
//                         name="manager"
//                         value={editProject.manager}
//                         onChange={handleFormChange}
//                       >
//                         <option value="">Select Manager</option>
//                         {managerUsers.map((u) => (
//                           <option key={u.userId} value={u.username}>
//                             {u.username}
//                           </option>
//                         ))}
//                       </select>
//                     </td>
//                   )}
//                   <td className="border px-4 py-2 text-xs font-medium">
//                     <div className="flex gap-2">
//                       <input
//                         type="date"
//                         className="border px-2 py-1 rounded w-full text-xs font-medium"
//                         name="startDate"
//                         value={editProject.startDate}
//                         onChange={handleFormChange}
//                       />
//                       <span>-</span>
//                       <input
//                         type="date"
//                         className="border px-2 py-1 rounded w-full text-xs font-medium"
//                         name="dueDate"
//                         value={editProject.dueDate}
//                         onChange={handleFormChange}
//                       />
//                     </div>
//                   </td>
//                   <td className="border px-4 py-2">
//                     <select
//                       className="border px-2 py-1 rounded w-full text-xs font-medium"
//                       name="dueStatus"
//                       value={editProject.dueStatus}
//                       onChange={handleFormChange}
//                     >
//                       {dueStatusOptions.map((d) => (
//                         <option key={d} value={d}>{d}</option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="border px-4 py-2 text-xs font-medium">
//                     <input
//                       className="border px-2 py-1 rounded w-full text-xs font-medium"
//                       name="members"
//                       value={editProject.members.join(", ")}
//                       onChange={handleEditMembers}
//                     />
//                   </td>
//                   <td className="border px-4 py-2 text-xs font-medium">
//                     <input
//                       className="border px-2 py-1 rounded w-full text-xs font-medium"
//                       name="tasks"
//                       value={editProject.tasks.join(", ")}
//                       onChange={handleEditTasks}
//                     />
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FolderIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon, ExclamationCircleIcon, MinusCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import { UsersIcon } from '@heroicons/react/24/solid';
import {
  getAllProjects,
  getAllUsers,
  addProject,
  updateProject,
  deleteProject
} from "../API/ProjectAPI";

const statusOptions = ["Active", "Archived"];
const dueStatusOptions = ["On track", "Overdue", "Done on time", "Done overdue"];

export default function ProjectManagement({ user }) {
  const [projects, setProjects] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editProject, setEditProject] = useState(null);
  const [addingNew, setAddingNew] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const selectedAll = selected.length === projects.length;

  const isAdmin = user && user.role.toLowerCase() === "admin";
  const isManager = user && user.role.toLowerCase() === "manager";
  const isContributor = user && user.role.toLowerCase() === "contributor";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getAllProjects()
      .then((allProjects) => {
        let filtered;
        if (isAdmin) {
          filtered = allProjects;
        } else if (isManager) {
          filtered = allProjects.filter(
            (p) =>
              p.manager === user.username ||
              ensureArray(p.members).includes(user.username)
          );
        } else if (isContributor) {
          filtered = allProjects.filter((p) =>
            ensureArray(p.members).includes(user.username)
          );
        }
        setProjects(filtered);
      })
      .catch((err) => alert("Failed to load projects: " + err));

    getAllUsers()
      .then(setAllUsers)
      .catch((err) => alert("Failed to load users: " + err));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditProject((prev) => prev ? { ...prev, [name]: value } : prev); // <- GUARD
  };

  const handleEditMembers = (e) => {
    setEditProject((prev) =>
      prev
        ? { ...prev, members: e.target.value.split(",").map((m) => m.trim()).filter(Boolean) }
        : prev
    ); // <- GUARD
  };

  const handleEditTasks = (e) => {
    setEditProject((prev) =>
      prev
        ? { ...prev, tasks: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) }
        : prev
    ); // <- GUARD
  };

  const handleEdit = (idx) => {
    const project = projects[idx];
    if (isAdmin || (isManager && project.manager === user.username)) {
      setEditIdx(idx);
      setEditProject({
        ...project,
        members: ensureArray(project.members),
        tasks: ensureArray(project.tasks),
      });
      setAddingNew(false);
    } else {
      alert("You are not allowed to edit this project.");
    }
  };

  const handleSave = (idx) => {
    if (!editProject) return; // <- GUARD

    const payload = {
      ...editProject,
      members: editProject.members,
      tasks: editProject.tasks,
      startDate: editProject.startDate ? new Date(editProject.startDate).toISOString() : "",
      dueDate: editProject.dueDate ? new Date(editProject.dueDate).toISOString() : "",
    };

    if (addingNew) {
      addProject(payload)
        .then((newProject) => {
          setProjects([...projects, newProject]);
          setAddingNew(false);
          setEditProject(null);
        })
        .catch((err) => alert("Failed to add project: " + err));
    } else {
      const projectId = projects[editIdx].id;
      updateProject(projectId, payload)
        .then(() => {
          const updated = projects.map((p, i) =>
            i === editIdx ? { ...editProject, id: projectId } : p
          );
          setProjects(updated);
        })
        .catch((err) => alert("Failed to update project: " + err));
    }
    setEditIdx(null);
    setEditProject(null);
    setSelected([]);
  };

  const handleCancel = () => {
    setEditIdx(null);
    setEditProject(null);
    setAddingNew(false);
    setSelected([]);
  };

  const handleDelete = () => {
    if (selected.length === 0) return;

    if (window.confirm(`Are you sure you want to delete ${selected.length} project(s)?`)) {
      Promise.all(selected.map(idx =>
        deleteProject(projects[idx].id)
      ))
        .then(() => {
          fetchData();
          setSelected([]);
        })
        .catch(err => alert("Failed to delete projects: " + err));
    }
  };

  const handleAddNew = () => {
    setAddingNew(true);
    setEditProject({
      title: "",
      goals: "",
      status: statusOptions[0],
      manager: isManager ? user.username : "",
      startDate: "",
      dueDate: "",
      dueStatus: dueStatusOptions[0],
      members: [],
      tasks: [],
    });
  };

  const handleSelect = (idx) => {
    setSelected((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleSelectAll = () => {
    if (selectedAll) {
      setSelected([]);
    } else {
      setSelected(projects.map((_, i) => i));
    }
  };

  const handleBulkArchive = () => {
    if (selected.length === 0) return;

    const today = new Date().toISOString().split("T")[0];
    const updates = selected.map(idx => {
      const project = projects[idx];
      const dueStatus = today <= project.dueDate ? "Done on time" : "Done overdue";
      return {
        ...project,
        status: "Archived",
        dueStatus
      };
    });

    Promise.all(updates.map(update =>
      updateProject(update.id, update)
    ))
      .then(() => {
        fetchData();
        setSelected([]);
      })
      .catch(err => alert("Failed to archive projects: " + err));
  };

  const renderDueStatusBadge = (project) => {
    const today = new Date().toISOString().split("T")[0];
    let content, color, Icon;

    if (project.status === "Active") {
      if (today <= project.dueDate) {
        content = "On track";
        color = "bg-blue-100 text-blue-800";
        Icon = InformationCircleIcon;
      } else {
        content = "Overdue";
        color = "bg-red-100 text-red-800";
        Icon = ExclamationCircleIcon;
      }
    } else {
      if (project.dueStatus === "Done on time") {
        content = "Done on time";
        color = "bg-green-100 text-green-800";
        Icon = CheckCircleIcon;
      } else {
        content = "Done overdue";
        color = "bg-red-100 text-red-800";
        Icon = MinusCircleIcon;
      }
    }

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        <Icon className="h-4 w-4" />
        {content}
      </span>
    );
  };

  const ensureArray = (val) =>
    Array.isArray(val)
      ? val
      : typeof val === "string"
        ? val.split(",").map((v) => v.trim()).filter(Boolean)
        : [];

  const managerUsers = allUsers.filter(
    (u) =>
      u.role.toLowerCase() === "manager" ||
      u.role.toLowerCase() === "projectmanager"
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        {isAdmin
          ? "Projects"
          : isManager
            ? "My Projects"
            : isContributor
              ? "My Projects"
              : "Project Management"}
      </h1>

      {!isContributor && (
        <button
          className="mb-8 bg-mycustomblue text-white font-medium px-4 py-2 rounded"
          onClick={handleAddNew}
          disabled={addingNew}
        >
          Create New Project
        </button>
      )}

      {/* {(selected.length > 0 || addingNew) && (
        <div className="bg-white border rounded mb-2 px-4 py-2 flex items-center justify-between shadow-sm">
          <span className="text-xs text-gray-800">
            {addingNew ? "ADDING NEW PROJECT" : `SELECTED: ${selected.length}`}
          </span>
          <div className="flex gap-2">
            {addingNew ? (
              <>
                <button
                  onClick={() => handleSave(projects.length)}
                  className="bg-green-500 text-white px-3 py-1 rounded shadow-sm hover:shadow text-xs"
                >
                  SAVE
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-400 text-white px-3 py-1 rounded shadow-sm hover:shadow text-xs"
                >
                  CANCEL
                </button>
              </>
            ) : (
              <>
                {selected.length === 1 && (
                  <button
                    onClick={() => handleEdit(selected[0])}
                    className="bg-yellow-400 px-3 py-1 rounded shadow-sm hover:shadow text-gray-800 text-xs"
                  >
                    EDIT
                  </button>
                )}
                {(editIdx !== null && editProject) && (
                  <button
                    onClick={() => handleSave(editIdx)}
                    className="bg-green-500 text-white px-3 py-1 rounded shadow-sm hover:shadow text-xs"
                  >
                    SAVE
                  </button>
                )}
                <button
                  onClick={handleBulkArchive}
                  className="bg-blue-500 text-white px-3 py-1 rounded shadow-sm hover:shadow text-xs"
                >
                  MARK AS ARCHIVED
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-3 py-1 rounded shadow-sm hover:shadow text-xs"
                >
                  DELETE
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-400 text-white px-3 py-1 rounded shadow-sm hover:shadow text-xs"
                >
                  CANCEL
                </button>
              </>
            )}
          </div>
        </div>
      )} */}

      {(selected.length > 0 || addingNew) && (
        <div className="bg-white border rounded mb-2 px-4 py-2 flex items-center justify-between shadow-sm">
          <span className="text-xs text-gray-800">
            {addingNew ? "ADDING NEW PROJECT" : `SELECTED: ${selected.length}`}
          </span>
          <div className="flex gap-3">
            {addingNew ? (
              <>
                <button
                  onClick={() => handleSave(projects.length)}
                  className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
                >
                  SAVE
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
                >
                  CANCEL
                </button>
              </>
            ) : (
              <>
                {selected.length === 1 && (
                  <button
                    onClick={() => handleEdit(selected[0])}
                    className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
                  >
                    EDIT
                  </button>
                )}
                {(editIdx !== null && editProject) && (
                  <button
                    onClick={() => handleSave(editIdx)}
                    className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
                  >
                    SAVE
                  </button>
                )}
                <button
                  onClick={handleBulkArchive}
                  className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
                >
                  MARK AS ARCHIVED
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
                >
                  DELETE
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
                >
                  CANCEL
                </button>
              </>
            )}
          </div>
        </div>
      )}



      <div className="overflow-x-auto w-full">
        <div className="inline-block min-w-full rounded-lg overflow-hidden shadow border border-gray-200">
          <table className="min-w-[1600px] bg-white border whitespace-nowrap">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={selectedAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="border px-4 py-2 text-left text-sm font-semibold">ID</th>
                <th className="border px-4 py-2 text-left text-sm font-semibold">Project Title</th>
                <th className="border px-4 py-2 text-left text-sm font-semibold">Goals</th>
                <th className="border px-4 py-2 text-left text-sm font-semibold">Status</th>
                {isAdmin && <th className="border px-4 py-2 text-left text-sm font-semibold">Assigned Manager</th>}
                <th className="border px-4 py-2 text-left text-sm font-semibold">Timeline</th>
                <th className="border px-4 py-2 text-left text-sm font-semibold">Due Status</th>
                <th className="border px-4 py-2 text-left text-sm font-semibold">Project Members</th>
                <th className="border px-4 py-2 text-left text-sm font-semibold">List of Tasks</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, idx) => (
                <tr key={project.id || idx} className={selected.includes(idx) ? "bg-green-50" : ""}>
                  <td className="border px-4 py-2 text-sm font-normal">
                    <input
                      type="checkbox"
                      checked={selected.includes(idx)}
                      onChange={() => handleSelect(idx)}
                    />
                  </td>
                  <td className="border px-4 py-2 text-sm font-normal">{idx + 1}</td>
                  <td className="border px-4 py-2 text-sm font-normal">
                    <div className="flex items-center gap-2">
                      <FolderIcon className="h-5 w-5 text-blue-500" />
                      {editIdx === idx && editProject ? (
                        <input
                          className="border px-2 py-1 rounded w-full text-sm font-normal"
                          name="title"
                          value={editProject.title}
                          onChange={handleFormChange}
                        />
                      ) : (
                        <Link to={`/tasks/${project.id || idx}`} className="text-sm font-normal">
                          {project.title}
                        </Link>
                      )}
                    </div>
                  </td>
                  <td className="border px-4 py-2 text-sm font-normal">
                    {editIdx === idx && editProject ? (
                      <input
                        className="border px-2 py-1 rounded w-full text-sm font-normal"
                        name="goals"
                        value={editProject.goals}
                        onChange={handleFormChange}
                      />
                    ) : (
                      project.goals
                    )}
                  </td>
                  <td className="border px-4 py-2 text-sm font-normal">
                    {editIdx === idx && editProject ? (
                      <select
                        className="border px-2 py-1 rounded w-full text-sm font-normal"
                        name="status"
                        value={editProject.status}
                        onChange={handleFormChange}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    ) : (
                      project.status
                    )}
                  </td>
                  {isAdmin && (
                    <td className="border px-4 py-2 text-sm font-normal">
                      {editIdx === idx && editProject ? (
                        <select
                          className="border px-2 py-1 rounded w-full text-sm font-normal"
                          name="manager"
                          value={editProject.manager}
                          onChange={handleFormChange}
                        >
                          <option value="">Select Manager</option>
                          {managerUsers.map((u) => (
                            <option key={u.userId} value={u.username}>
                              {u.username}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="inline-block px-2 py-1 border border-grey-500 rounded-full text-xs font-medium">
                          {project.manager === "manager" ? "Project manager" : project.manager}
                        </span>
                      )}
                    </td>
                  )}
                  <td className="border px-4 py-2 text-sm font-normal">
                    {editIdx === idx && editProject ? (
                      <div className="flex gap-2">
                        <input
                          type="date"
                          className="border px-2 py-1 rounded w-full text-sm font-normal"
                          name="startDate"
                          value={editProject.startDate?.substring(0, 10) ?? ""}
                          onChange={handleFormChange}
                        />
                        <span>-</span>
                        <input
                          type="date"
                          className="border px-2 py-1 rounded w-full text-sm font-normal"
                          name="dueDate"
                          value={editProject.dueDate?.substring(0, 10) ?? ""}
                          onChange={handleFormChange}
                        />
                      </div>
                    ) : (
                      `${project.startDate?.substring(0, 10) ?? ''} - ${project.dueDate?.substring(0, 10) ?? ''}`
                    )}
                  </td>
                  <td className="border px-4 py-2 text-sm font-normal">
                    {renderDueStatusBadge(project)}
                  </td>
                  <td className="border px-4 py-2 text-sm font-normal">
                    {editIdx === idx && editProject ? (
                      isAdmin || (isManager && editProject.manager === user.username) ? (
                        <input
                          className="border px-2 py-1 rounded w-full text-sm font-normal"
                          name="members"
                          value={editProject.members.join(", ")}
                          onChange={handleEditMembers}
                        />
                      ) : (
                        <div className="text-gray-500 italic">Editing not allowed</div>
                      )
                    ) : (
                      <ul className="list-disc pl-4 text-sm font-normal">
                        {ensureArray(project.members).map((m) => (
                          <li key={m}>{m}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td className="border px-4 py-2 text-sm font-normal">
                    {editIdx === idx && editProject ? (
                      <input
                        className="border px-2 py-1 rounded w-full text-sm font-normal"
                        name="tasks"
                        value={editProject.tasks.join(", ")}
                        onChange={handleEditTasks}
                      />
                    ) : (
                      <ul className="list-disc pl-4 text-sm font-normal">
                        {ensureArray(project.tasks).map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                </tr>
              ))}

              {addingNew && editProject && (
                <tr>
                  <td className="border px-4 py-2 text-xs font-medium"></td>
                  <td className="border px-4 py-2 text-xs font-medium">{projects.length + 1}</td>
                  <td className="border px-4 py-2 text-xs font-medium">
                    <input
                      className="border px-2 py-1 rounded w-full text-xs font-medium"
                      name="title"
                      value={editProject.title}
                      onChange={handleFormChange}
                    />
                  </td>
                  <td className="border px-4 py-2 text-xs font-medium">
                    <input
                      className="border px-2 py-1 rounded w-full text-xs font-medium"
                      name="goals"
                      value={editProject.goals}
                      onChange={handleFormChange}
                    />
                  </td>
                  <td className="border px-4 py-2 text-xs font-medium">
                    <select
                      className="border px-2 py-1 rounded w-full text-xs font-medium"
                      name="status"
                      value={editProject.status}
                      onChange={handleFormChange}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  {isAdmin && (
                    <td className="border px-4 py-2 text-xs font-medium">
                      <select
                        className="border px-2 py-1 rounded w-full text-xs font-medium"
                        name="manager"
                        value={editProject.manager}
                        onChange={handleFormChange}
                      >
                        <option value="">Select Manager</option>
                        {managerUsers.map((u) => (
                          <option key={u.userId} value={u.username}>
                            {u.username}
                          </option>
                        ))}
                      </select>
                    </td>
                  )}
                  <td className="border px-4 py-2 text-xs font-medium">
                    <div className="flex gap-2">
                      <input
                        type="date"
                        className="border px-2 py-1 rounded w-full text-xs font-medium"
                        name="startDate"
                        value={editProject.startDate}
                        onChange={handleFormChange}
                      />
                      <span>-</span>
                      <input
                        type="date"
                        className="border px-2 py-1 rounded w-full text-xs font-medium"
                        name="dueDate"
                        value={editProject.dueDate}
                        onChange={handleFormChange}
                      />
                    </div>
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      className="border px-2 py-1 rounded w-full text-xs font-medium"
                      name="dueStatus"
                      value={editProject.dueStatus}
                      onChange={handleFormChange}
                    >
                      {dueStatusOptions.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </td>
                  <td className="border px-4 py-2 text-xs font-medium">
                    <input
                      className="border px-2 py-1 rounded w-full text-xs font-medium"
                      name="members"
                      value={editProject.members.join(", ")}
                      onChange={handleEditMembers}
                    />
                  </td>
                  <td className="border px-4 py-2 text-xs font-medium">
                    <input
                      className="border px-2 py-1 rounded w-full text-xs font-medium"
                      name="tasks"
                      value={editProject.tasks.join(", ")}
                      onChange={handleEditTasks}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
