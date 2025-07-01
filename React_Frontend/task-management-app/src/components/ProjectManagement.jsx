// // Latest Possible With Many Changes Logic
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
//   const [isEditing, setIsEditing] = useState(false);
//   // Add a new state for error handling
//   const [error, setError] = useState(null);

//   const isAdmin = user && user.role.toLowerCase() === "admin";
//   const isManager = user && user.role.toLowerCase() === "manager";
//   const isContributor = user && user.role.toLowerCase() === "contributor";

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Add this effect right after your other state declarations
//   useEffect(() => {
//     // If selection changes while in edit mode, cancel the edit
//     if (isEditing && selected.length !== 1) {
//       handleCancel();
//     }
//   }, [selected]); // Runs when 'selected' changes
  
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

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setEditProject((prev) => prev ? { ...prev, [name]: value } : prev); // <- GUARD
//   };

//   const handleEditMembers = (e) => {
//     setEditProject((prev) =>
//       prev
//         ? { ...prev, members: e.target.value.split(",").map((m) => m.trim()).filter(Boolean) }
//         : prev
//     ); // <- GUARD
//   };

//   const handleEditTasks = (e) => {
//     setEditProject((prev) =>
//       prev
//         ? { ...prev, tasks: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) }
//         : prev
//     ); // <- GUARD
//   };

//   const handleEdit = (idx) => {
//     const project = projects[idx];
    
//     // Check permissions - Admin or Manager who is the assigned manager
//     const canEdit = isAdmin || (isManager && project.manager === user.username);
    
//     if (canEdit) {
//       setEditIdx(idx);
//       setEditProject({
//         ...project,
//         members: ensureArray(project.members),
//         tasks: ensureArray(project.tasks),
//       });
//       setAddingNew(false);
//       setIsEditing(true); // Set editing mode
//     } else {
//       alert("You are not allowed to edit this project.");
//     }
//   };

//   const handleSave = async (idx) => {
//     if (!editProject) return; // <- GUARD

//     // Validate required fields
//     if (!editProject.title?.trim()) {
//       setError("Project title is required");
//       return;
//     }
//     if (!editProject.manager?.trim()) {
//       setError("Manager assignment is required");
//       return;
//     }
//     if (!editProject.startDate || !editProject.dueDate) {
//       setError("Timeline dates are required");
//       return;
//     }
//     if (editProject.members.length === 0) {
//       setError("At least one project member is required");
//       return;
//     }

//     const payload = {
//       ...editProject,
//       members: editProject.members,
//       tasks: editProject.tasks,
//       startDate: editProject.startDate ? new Date(editProject.startDate).toISOString() : "",
//       dueDate: editProject.dueDate ? new Date(editProject.dueDate).toISOString() : "",
//     };

//     try {
//       if (addingNew) {
//         const newProject = await addProject(payload);
//         setProjects([...projects, newProject]);
//         setAddingNew(false);
//         setEditProject(null);
//         setError(null); // Clear any previous errors
//         setIsEditing(false);
//       } else {
//         const projectId = projects[editIdx].id;
//         await updateProject(projectId, payload);
//         const updated = projects.map((p, i) =>
//           i === editIdx ? { ...editProject, id: projectId } : p
//         );
//         setProjects(updated);
//         setEditIdx(null);
//         setEditProject(null);
//         setError(null); // Clear any previous errors
//         setIsEditing(false);
//       }
//       setSelected([]);
//     } catch (err) {
//       setError("Failed to save project: " + err.message);
//       // Keep the form open with the current values
//       setAddingNew(true);
//     }
//   };

//   const handleCancel = () => {
//     setEditIdx(null);
//     setEditProject(null);
//     setAddingNew(false);
//     setSelected([]);
//     setError(null);
//     setIsEditing(false);
//   };

//   const handleDelete = () => {
//     if (selected.length === 0) return;

//     if (window.confirm(`Are you sure you want to delete ${selected.length} project(s)?`)) {
//       Promise.all(selected.map(idx =>
//         deleteProject(projects[idx].id)
//       ))
//         .then(() => {
//           fetchData();
//           setSelected([]);
//         })
//         .catch(err => alert("Failed to delete projects: " + err));
//     }
//   };

//   const handleAddNew = () => {
//     setAddingNew(true);
//     setError(null);
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
//     if (addingNew) return;  // Prevent selection when adding a new project
//     setSelected((prev) =>
//       prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
//     );
//   };

//   const handleSelectAll = () => {
//     if (addingNew) return;  // Prevent selection when adding a new project
//     if (selectedAll) {
//       setSelected([]);
//     } else {
//       setSelected(projects.map((_, i) => i));
//     }
//   };

//   const handleMemberCheckboxChange = (e, username) => {
//     const { checked } = e.target;
//     setEditProject((prev) => {
//       if (!prev) return prev;
      
//       const members = prev.members || [];
//       return {
//         ...prev,
//         members: checked
//           ? [...members, username]
//           : members.filter((m) => m !== username),
//       };
//     });
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
//       .then(() => {
//         fetchData();
//         setSelected([]);
//       })
//       .catch(err => alert("Failed to archive projects: " + err));
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
//             ? "My Projects"
//             : isContributor
//               ? "My Projects"
//               : "Project Management"}
//       </h1>

//       {/* Only show Create button for Admin and Manager */}
//       {(isAdmin || isManager) && (
//         <button
//           className="mb-8 bg-mycustomblue text-white font-medium px-4 py-2 rounded disabled:opacity-50"
//           onClick={handleAddNew}
//           disabled={addingNew || isEditing || selected.length > 0}
//         >
//           Create New Project
//         </button>
//       )}

//       {/* Add this near your bulk actions section to show errors */}
//       {error && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
//           <p className="font-bold">Error</p>
//           <p>{error}</p>
//         </div>
//       )}

//       {/* Only show bulk actions for Admin and Manager */}
//       {(isAdmin || isManager) && (selected.length > 0 || addingNew) && (
//         <div className="bg-white border rounded mb-2 px-4 py-2 flex items-center justify-between shadow-sm">
//           <span className="text-xs text-gray-800">
//             {addingNew ? "ADDING NEW PROJECT" : `SELECTED: ${selected.length}`}
//           </span>
//           <div className="flex gap-3">
//             {addingNew ? (
//               <>
//                 <button 
//                   onClick={() => handleSave(projects.length)}
//                   className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//                 >
//                   SAVE
//                 </button>
//                 <button 
//                   onClick={handleCancel}
//                   className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//                 >
//                   CANCEL
//                 </button>
//               </>
//             ) : isEditing ? ( // When in edit mode
//               <>
//                 <button
//                   onClick={() => handleSave(editIdx)}
//                   className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//                 >
//                   SAVE
//                 </button>
//                 <button
//                   onClick={handleCancel}
//                   className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//                 >
//                   CANCEL
//                 </button>
//               </>
//             ) : ( // When not in edit mode
//               <>
//                 {selected.length === 1 && (
//                   <button
//                     onClick={() => handleEdit(selected[0])}
//                     className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//                   >
//                     EDIT
//                   </button>
//                 )}
//                 <button
//                   onClick={handleBulkArchive}
//                   className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//                 >
//                   MARK AS ARCHIVED
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//                 >
//                   DELETE
//                 </button>
//                 <button
//                   onClick={handleCancel}
//                   className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
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
//                 {/* Only show checkbox for Admin and Manager */}
//                 {(isAdmin || isManager) && (
//                   <th className="border px-4 py-2 text-left text-sm font-semibold">
//                     <input
//                       type="checkbox"
//                       checked={selectedAll}
//                       onChange={handleSelectAll}
//                       disabled={addingNew}  // Disable when adding a new project
//                     />
//                   </th>
//                 )}
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">ID</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">Project Title</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">Goals</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">Status</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">Assigned Manager</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">Timeline</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">Due Status</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">Project Members</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold">List of Tasks</th>
//               </tr>
//             </thead>
//             <tbody>
//               {projects.map((project, idx) => (
//                 <tr key={project.id || idx} className={selected.includes(idx) ? "bg-green-50" : ""}>
//                   {/* Only show checkbox for Admin and Manager */}
//                   {(isAdmin || isManager) && (
//                     <td className="border px-4 py-2 text-sm font-normal">
//                       <input
//                         type="checkbox"
//                         checked={selected.includes(idx)}
//                         onChange={() => handleSelect(idx)}
//                         disabled={addingNew}  // Disable when adding a new project
//                       />
//                     </td>
//                   )}
//                   <td className="border px-4 py-2 text-sm font-normal">{idx + 1}</td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     <div className="flex items-center gap-2">
//                       <FolderIcon className="h-5 w-5 text-blue-500" />
//                       {editIdx === idx && editProject ? (
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
//                     {editIdx === idx && editProject ? (
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
//                     {editIdx === idx && editProject ? (
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
//                   {(isAdmin || isManager || isContributor) && (
//                     <td className="border px-4 py-2 text-sm font-normal">
//                       {editIdx === idx && editProject ? (
//                         isAdmin ? (
//                           <select
//                             className="border px-2 py-1 rounded w-full text-sm font-normal"
//                             name="manager"
//                             value={editProject.manager}
//                             onChange={handleFormChange}
//                           >
//                             <option value="">Select Manager</option>
//                             {managerUsers.map((u) => (
//                               <option key={u.userId} value={u.username}>
//                                 {u.username}
//                               </option>
//                             ))}
//                           </select>
//                         ) : (
//                           <input
//                             type="text"
//                             className="border px-2 py-1 rounded w-full text-sm font-normal bg-gray-100"
//                             value={editProject.manager}
//                             readOnly
//                           />
//                         )
//                       ) : (
//                         <span className="inline-block px-2 py-1 border border-grey-500 rounded-full text-xs font-medium">
//                           {project.manager}
//                         </span>
//                       )}
//                     </td>
//                   )}
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {editIdx === idx && editProject ? (
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
//                     {editIdx === idx && editProject ? (
//                       isAdmin || (isManager && editProject.manager === user.username) ? (
//                         <div className="max-h-40 overflow-y-auto">
//                           {allUsers.map((u) => (
//                             <div key={u.userId} className="flex items-center">
//                               <input
//                                 type="checkbox"
//                                 id={`member-${idx}-${u.userId}`}
//                                 checked={editProject.members?.includes(u.username) || false}
//                                 onChange={(e) => handleMemberCheckboxChange(e, u.username)}
//                                 className="mr-2"
//                               />
//                               <label htmlFor={`member-${idx}-${u.userId}`} className="text-sm">
//                                 {u.username}
//                               </label>
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         <div className="text-gray-500 italic text-sm">Editing not allowed</div>
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
//                     {editIdx === idx && editProject ? (
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

//               {addingNew && editProject && (
//                 <tr className="bg-yellow-50">
//                   <td className="border px-4 py-2 text-xs font-medium"></td>
//                   <td className="border px-4 py-2 text-xs font-medium">{projects.length + 1}</td>
//                   <td className="border px-4 py-2 text-xs font-medium">
//                     <div className="flex items-center gap-2">
//                       <FolderIcon className="h-5 w-5 text-blue-500" />
//                       <input
//                         className="border px-2 py-1 rounded w-full text-xs font-medium"
//                         name="title"
//                         value={editProject.title}
//                         onChange={handleFormChange}
//                       />
//                     </div>
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
//                   {(isAdmin || isManager) && (
//                     <td className="border px-4 py-2 text-xs font-medium">
//                       {isAdmin ? (
//                         <select
//                           className="border px-2 py-1 rounded w-full text-xs font-medium"
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
//                         <input
//                           type="text"
//                           className="border px-2 py-1 rounded w-full bg-gray-100"
//                           value={editProject.manager}
//                           disabled
//                         />
//                       )}
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
//                     <div className="max-h-40 overflow-y-auto">
//                       {allUsers.map((u) => (
//                         <div key={u.userId} className="flex items-center">
//                           <input
//                             type="checkbox"
//                             id={`new-member-${u.userId}`}
//                             checked={editProject.members.includes(u.username)}
//                             onChange={(e) => handleMemberCheckboxChange(e, u.username)}
//                             className="mr-2"
//                           />
//                           <label htmlFor={`new-member-${u.userId}`} className="text-xs">
//                             {u.username}
//                           </label>
//                         </div>
//                       ))}
//                     </div>
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
  const [isEditing, setIsEditing] = useState(false);
  // Add this near your other state declarations
  const [hasArchivedSelected, setHasArchivedSelected] = useState(false);
  const [hasActiveSelected, setHasActiveSelected] = useState(false);
  // Add a new state for error handling
  const [error, setError] = useState(null);

  const isAdmin = user && user.role.toLowerCase() === "admin";
  const isManager = user && user.role.toLowerCase() === "manager";
  const isContributor = user && user.role.toLowerCase() === "contributor";

  // Add this helper function near the top of your component
  const canManageProject = (project) => {
    return isAdmin || (isManager && project.manager === user.username);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add this effect right after your other state declarations
  useEffect(() => {
    // If selection changes while in edit mode, cancel the edit
    if (isEditing && selected.length !== 1) {
      handleCancel();
    }
  }, [selected]); // Runs when 'selected' changes

  // Add this effect to track selection status
  useEffect(() => {
    if (selected.length > 0) {
      const selectedProjects = selected.map(idx => projects[idx]);
      setHasArchivedSelected(selectedProjects.some(p => p.status === "Archived"));
      setHasActiveSelected(selectedProjects.some(p => p.status === "Active"));
    } else {
      setHasArchivedSelected(false);
      setHasActiveSelected(false);
    }
  }, [selected, projects]);
  
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
    
    // Check permissions - Admin or Manager who is the assigned manager
    const canEdit = (isAdmin || (isManager && project.manager === user.username)) && project.status === "Active";
    
    if (canEdit) {
      setEditIdx(idx);
      setEditProject({
        ...project,
        members: ensureArray(project.members),
        tasks: ensureArray(project.tasks),
      });
      setAddingNew(false);
      setIsEditing(true); // Set editing mode
    } else {
      alert(project.status === "Archived" 
      ? "Archived projects cannot be edited" 
      : "You are not allowed to edit this project");
    }
  };

  const handleSave = async (idx) => {
    if (!editProject) return; // <- GUARD

    // Validate required fields
    if (!editProject.title?.trim()) {
      setError("Project title is required");
      return;
    }
    if (!editProject.manager?.trim()) {
      setError("Manager assignment is required");
      return;
    }
    if (!editProject.startDate || !editProject.dueDate) {
      setError("Timeline dates are required");
      return;
    }
    if (editProject.members.length === 0) {
      setError("At least one project member is required");
      return;
    }

    const payload = {
      ...editProject,
      members: editProject.members,
      tasks: editProject.tasks,
      startDate: editProject.startDate ? new Date(editProject.startDate).toISOString() : "",
      dueDate: editProject.dueDate ? new Date(editProject.dueDate).toISOString() : "",
    };

    try {
      if (addingNew) {
        const newProject = await addProject(payload);
        setProjects([...projects, newProject]);
        setAddingNew(false);
        setEditProject(null);
        setError(null); // Clear any previous errors
        setIsEditing(false);
      } else {
        const projectId = projects[editIdx].id;
        await updateProject(projectId, payload);
        const updated = projects.map((p, i) =>
          i === editIdx ? { ...editProject, id: projectId } : p
        );
        setProjects(updated);
        setEditIdx(null);
        setEditProject(null);
        setError(null); // Clear any previous errors
        setIsEditing(false);
      }
      setSelected([]);
    } catch (err) {
      setError("Failed to save project: " + err.message);
      // Keep the form open with the current values
      setAddingNew(true);
    }
  };

  const handleCancel = () => {
    setEditIdx(null);
    setEditProject(null);
    setAddingNew(false);
    setSelected([]);
    setError(null);
    setIsEditing(false);
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
    setError(null);
    setEditProject({
      title: "",
      goals: "",
      status: "Active",
      manager: isManager ? user.username : "",
      startDate: "",
      dueDate: "",
      dueStatus: "On track",
      members: [],
      tasks: [],
    });
  };

  const handleSelect = (idx) => {
    if (addingNew) return;  // Prevent selection when adding a new project
    
    // For managers, only allow selection if they're the assigned manager
    if (isManager && !canManageProject(projects[idx])) {
      return;
    }
    
    setSelected((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleSelectAll = () => {
    if (addingNew) return;  // Prevent selection when adding a new project
    if (selectedAll) {
      setSelected([]);
    } else {
      // For managers, only select projects they can manage
      const selectableProjects = isManager 
        ? projects.map((p, i) => canManageProject(p) ? i : null).filter(i => i !== null)
        : projects.map((_, i) => i);
      // setSelected(projects.map((_, i) => i));
      setSelected(selectableProjects);  // Use selectableProjects instead of projects.map
    }
  };

  const handleMemberCheckboxChange = (e, username) => {
    const { checked } = e.target;
    setEditProject((prev) => {
      if (!prev) return prev;
      
      const members = prev.members || [];
      return {
        ...prev,
        members: checked
          ? [...members, username]
          : members.filter((m) => m !== username),
      };
    });
  };

  // const handleBulkArchive = () => {
  //   if (selected.length === 0) return;

  //   const today = new Date().toISOString().split("T")[0];
  //   const updates = selected.map(idx => {
  //     const project = projects[idx];
  //     const dueStatus = today <= project.dueDate ? "Done on time" : "Done overdue";
  //     return {
  //       ...project,
  //       status: "Archived",
  //       dueStatus
  //     };
  //   });

  //   Promise.all(updates.map(update =>
  //     updateProject(update.id, update)
  //   ))
  //     .then(() => {
  //       fetchData();
  //       setSelected([]);
  //     })
  //     .catch(err => alert("Failed to archive projects: " + err));
  // };

    const handleBulkArchive = () => {
    if (selected.length === 0) return;

    const activeSelected = selected.filter(idx => projects[idx].status === "Active");
    if (activeSelected.length === 0) return;

    const projectNames = activeSelected.map(idx => projects[idx].title).join(", ");
      if (window.confirm(`Are you sure you want to archive these projects?\nProjects: ${projectNames}`)) {
        const today = new Date().toISOString().split("T")[0];
        const updates = activeSelected.map(idx => {
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
    }
  };

  const handleBulkActivate = () => {
    if (selected.length === 0) return;

    const archivedSelected = selected.filter(idx => projects[idx].status === "Archived");
    if (archivedSelected.length === 0) return;

    // if (window.confirm(`Are you sure you want to activate ${selected.length} project(s)?`)) {
    //   const updates = selected.map(idx => ({
    //     ...projects[idx],
    //     status: "Active"
    //   }));

    const projectNames = archivedSelected.map(idx => projects[idx].title).join(", ");
    if (window.confirm(`Are you sure you want to activate these projects?\nProjects: ${projectNames}`)) {
      const updates = archivedSelected.map(idx => ({
        ...projects[idx],
        status: "Active",
        // // Reset due status when activating
        // dueStatus: "On track"
      }));

      Promise.all(updates.map(update =>
        updateProject(update.id, update)
      ))
        .then(() => {
          fetchData();
          setSelected([]);
        })
        .catch(err => alert("Failed to activate projects: " + err));
    }
  };

  // const renderDueStatusBadge = (project) => {
  //   const today = new Date().toISOString().split("T")[0];
  //   let content, color, Icon;

  //   if (project.status === "Active") {
  //     if (today <= project.dueDate) {
  //       content = "On track";
  //       color = "bg-blue-100 text-blue-800";
  //       Icon = InformationCircleIcon;
  //     } else {
  //       content = "Overdue";
  //       color = "bg-red-100 text-red-800";
  //       Icon = ExclamationCircleIcon;
  //     }
  //   } else {
  //     if (project.dueStatus === "Done on time") {
  //       content = "Done on time";
  //       color = "bg-green-100 text-green-800";
  //       Icon = CheckCircleIcon;
  //     } else {
  //       content = "Done overdue";
  //       color = "bg-red-100 text-red-800";
  //       Icon = MinusCircleIcon;
  //     }
  //   }

  //   return (
  //     <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
  //       <Icon className="h-4 w-4" />
  //       {content}
  //     </span>
  //   );
  // };
  const renderDueStatusBadge = (project) => {
    const today = new Date().toISOString().split("T")[0];
    let content, color, Icon;

    // Handle both object and project formats
    const status = project.status || "Active";
    const dueStatus = project.dueStatus || "On track";

    if (status === "Active") {
      if (today <= (project.dueDate || "9999-12-31")) {
        content = "On track";
        color = "bg-blue-100 text-blue-800";
        Icon = InformationCircleIcon;
      } else {
        content = "Overdue";
        color = "bg-red-100 text-red-800";
        Icon = ExclamationCircleIcon;
      }
    } else {
      if (dueStatus === "Done on time") {
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

  const renderStatusBadge = (status) => {
    let content, color, Icon;

    switch (status) {
      case "Active":
        content = "Active";
        color = "bg-blue-100 text-blue-800";
        Icon = InformationCircleIcon;
        break;
      case "Archived":
        content = "Archived";
        color = "bg-gray-100 text-gray-800";
        Icon = MinusCircleIcon;
        break;
      default:
        content = status;
        color = "bg-gray-100 text-gray-800";
        Icon = InformationCircleIcon;
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

      {/* Only show Create button for Admin and Manager */}
      {(isAdmin || isManager) && (
        <button
          className="mb-8 bg-mycustomblue text-white font-medium px-4 py-2 rounded disabled:opacity-50"
          onClick={handleAddNew}
          disabled={addingNew || isEditing || selected.length > 0}
        >
          Create New Project
        </button>
      )}

      {/* Add this near your bulk actions section to show errors */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {/* Only show bulk actions for Admin and Manager */}
      {(isAdmin || isManager) && (selected.length > 0 || addingNew) && (
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
            ) : isEditing ? (
              <>
                <button
                  onClick={() => handleSave(editIdx)}
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
                {selected.length === 1 && canManageProject(projects[selected[0]]) && projects[selected[0]].status === "Active" && (
                  <button
                    onClick={() => handleEdit(selected[0])}
                    className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
                  >
                    EDIT
                  </button>
                )}
                {hasActiveSelected && selected.every(idx => canManageProject(projects[idx])) && (
                  <button
                    onClick={handleBulkArchive}
                    className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
                    disabled={!hasActiveSelected}
                  >
                    MARK AS ARCHIVED
                  </button>
                )}
                {hasArchivedSelected && selected.every(idx => canManageProject(projects[idx])) && (
                  <button
                    onClick={handleBulkActivate}
                    className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
                    disabled={!hasArchivedSelected}
                  >
                    MARK AS ACTIVE
                  </button>
                )}
                {selected.every(idx => canManageProject(projects[idx])) && (
                  <button
                    onClick={handleDelete}
                    className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
                  >
                    DELETE
                  </button>
                )}
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
                {/* Only show checkbox for Admin and Manager */}
                {(isAdmin || isManager) && (
                  <th className="border px-4 py-2 text-left text-sm font-semibold">
                    <input
                      type="checkbox"
                      checked={selectedAll}
                      onChange={handleSelectAll}
                      disabled={addingNew}  // Disable when adding a new project
                    />
                  </th>
                )}
                <th className="border px-4 py-2 text-left text-sm font-semibold">ID</th>
                <th className="border px-4 py-2 text-left text-sm font-semibold">Project Title</th>
                <th className="border px-4 py-2 text-left text-sm font-semibold">Goals</th>
                <th className="border px-4 py-2 text-left text-sm font-semibold">Status</th>
                <th className="border px-4 py-2 text-left text-sm font-semibold">Assigned Manager</th>
                <th className="border px-4 py-2 text-left text-sm font-semibold">Timeline</th>
                <th className="border px-4 py-2 text-left text-sm font-semibold">Due Status</th>
                <th className="border px-4 py-2 text-left text-sm font-semibold">Project Members</th>
                <th className="border px-4 py-2 text-left text-sm font-semibold">List of Tasks</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, idx) => (
                <tr key={project.id || idx} className={selected.includes(idx) ? "bg-green-50" : ""}>
                  {/* Only show checkbox for Admin and Manager */}
                  {(isAdmin || isManager) && (
                    <td className="border px-4 py-2 text-sm font-normal">
                      <input
                        type="checkbox"
                        checked={selected.includes(idx)}
                        onChange={() => handleSelect(idx)}
                        // disabled={addingNew}  // Disable when adding a new project
                        disabled={addingNew || (isManager && !canManageProject(project))}  // Add this check
                      />
                    </td>
                  )}
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
                  {/* <td className="border px-4 py-2 text-sm font-normal">
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
                  </td> */}
                  {/* <td className="border px-4 py-2 text-sm font-normal">
                    {editIdx === idx && editProject ? (
                      renderStatusBadge(editProject.status) // Show badge instead of dropdown during edit
                    ) : (
                      renderStatusBadge(project.status)
                    )}
                  </td> */}
                  <td className="border px-4 py-2 text-sm font-normal">
                    {renderStatusBadge(editIdx === idx && editProject ? editProject.status : project.status)}
                  </td>
                  {(isAdmin || isManager || isContributor) && (
                    <td className="border px-4 py-2 text-sm font-normal">
                      {editIdx === idx && editProject ? (
                        isAdmin ? (
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
                          <input
                            type="text"
                            className="border px-2 py-1 rounded w-full text-sm font-normal bg-gray-100"
                            value={editProject.manager}
                            readOnly
                          />
                        )
                      ) : (
                        <span className="inline-block px-2 py-1 border border-grey-500 rounded-full text-xs font-medium">
                          {project.manager}
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
                        <div className="max-h-40 overflow-y-auto">
                          {allUsers.map((u) => (
                            <div key={u.userId} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`member-${idx}-${u.userId}`}
                                checked={editProject.members?.includes(u.username) || false}
                                onChange={(e) => handleMemberCheckboxChange(e, u.username)}
                                className="mr-2"
                              />
                              <label htmlFor={`member-${idx}-${u.userId}`} className="text-sm">
                                {u.username}
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-gray-500 italic text-sm">Editing not allowed</div>
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
                <tr className="bg-yellow-50">
                  <td className="border px-4 py-2 text-xs font-medium"></td>
                  <td className="border px-4 py-2 text-xs font-medium">{projects.length + 1}</td>
                  <td className="border px-4 py-2 text-xs font-medium">
                    <div className="flex items-center gap-2">
                      <FolderIcon className="h-5 w-5 text-blue-500" />
                      <input
                        className="border px-2 py-1 rounded w-full text-xs font-medium"
                        name="title"
                        value={editProject.title}
                        onChange={handleFormChange}
                      />
                    </div>
                  </td>
                  <td className="border px-4 py-2 text-xs font-medium">
                    <input
                      className="border px-2 py-1 rounded w-full text-xs font-medium"
                      name="goals"
                      value={editProject.goals}
                      onChange={handleFormChange}
                    />
                  </td>
                  {/* <td className="border px-4 py-2 text-xs font-medium">
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
                  </td> */}
                  <td className="border px-4 py-2 text-xs font-medium">
                    {renderStatusBadge("Active")}
                    <input type="hidden" name="status" value="Active" />
                  </td>
                  {(isAdmin || isManager) && (
                    <td className="border px-4 py-2 text-xs font-medium">
                      {isAdmin ? (
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
                      ) : (
                        <input
                          type="text"
                          className="border px-2 py-1 rounded w-full bg-gray-100"
                          value={editProject.manager}
                          disabled
                        />
                      )}
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
                  {/* <td className="border px-4 py-2">
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
                  </td> */}
                  <td className="border px-4 py-2 text-xs font-medium">
                    {renderDueStatusBadge({ status: "Active", dueStatus: "On track" })}
                    <input type="hidden" name="dueStatus" value="On track" />
                  </td>
                  <td className="border px-4 py-2 text-xs font-medium">
                    <div className="max-h-40 overflow-y-auto">
                      {allUsers.map((u) => (
                        <div key={u.userId} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`new-member-${u.userId}`}
                            checked={editProject.members.includes(u.username)}
                            onChange={(e) => handleMemberCheckboxChange(e, u.username)}
                            className="mr-2"
                          />
                          <label htmlFor={`new-member-${u.userId}`} className="text-xs">
                            {u.username}
                          </label>
                        </div>
                      ))}
                    </div>
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
