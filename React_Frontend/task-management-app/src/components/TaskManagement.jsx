// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   getTasksByProject,
//   addTask,
//   updateTask,
//   deleteTask,
//   uploadTaskFile
// } from "../API/TaskAPI";

// // File picker modal component
// function FilePickerModal({
//   open,
//   onClose,
//   file,
//   saveAs,
//   onFileChange,
//   onSaveAsChange,
//   onUpload,
//   onRemoveFile
// }) {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
//       <div className="bg-white rounded-lg shadow-xl min-w-[420px] max-w-full relative px-8 py-8">
//         <h2 className="text-xl font-semibold mb-4">File picker</h2>
//         <div>
//           <div className="mb-4">
//             <label className="block font-medium mb-1" htmlFor="fileInput">
//               Attachment
//             </label>
//             <input
//               id="fileInput"
//               type="file"
//               className="mb-1"
//               onChange={onFileChange}
//               style={{ display: 'inline-block' }}
//             />
//             <div className="text-gray-800 text-sm mb-1 flex items-center gap-3">
//               {file ? (
//                 <>
//                   <span>
//                     Current file: <span className="font-semibold">{file}</span>
//                   </span>
//                   <button
//                     type="button"
//                     className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-xs"
//                     onClick={onRemoveFile}
//                   >
//                     Remove
//                   </button>
//                 </>
//               ) : (
//                 <>No file chosen</>
//               )}
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block font-medium mb-1" htmlFor="saveAsInput">
//               Save as
//             </label>
//             <input
//               id="saveAsInput"
//               type="text"
//               value={saveAs}
//               onChange={onSaveAsChange}
//               className="border border-black rounded px-2 py-1 w-full"
//               placeholder="Rename the file (optional)"
//               style={{ fontSize: "1rem" }}
//             />
//           </div>
//           <div className="flex justify-end gap-3 mt-8">
//             <button
//               className="bg-blue-600 text-white px-4 py-2 rounded font-semibold"
//               onClick={onUpload}
//             >
//               Upload this file
//             </button>
//             <button
//               className="bg-gray-400 text-white px-4 py-2 rounded font-semibold"
//               onClick={onClose}
//               type="button"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//         <button
//           className="absolute top-2 right-3 text-gray-400 text-2xl hover:text-gray-800"
//           onClick={onClose}
//         >x</button>
//       </div>
//     </div>
//   );
// }

// const priorityOptions = ["High", "Medium", "Low"];
// const statusOptions = ["To-Do", "In Progress", "Done"];
// const dueStatusOptions = ["Done on time", "Overdue", "Done overdue"];

// export default function TaskManagement({ user }) {
//   const { projectId } = useParams();
//   const [tasks, setTasks] = useState([]);
//   const [editIdx, setEditIdx] = useState(null);
//   const [editTask, setEditTask] = useState(null);
//   const [addingNew, setAddingNew] = useState(false);

//   // File modal state
//   const [showFileModal, setShowFileModal] = useState(false);
//   const [fileModalIdx, setFileModalIdx] = useState(null);
//   const [modalFile, setModalFile] = useState("");
//   const [modalSaveAs, setModalSaveAs] = useState("");
//   const [modalFileObj, setModalFileObj] = useState(null);

//   const navigate = useNavigate();

//   // Role helpers
//   const isAdmin = user && user.role && user.role.toLowerCase() === "admin";
//   const isManager = user && user.role && user.role.toLowerCase() === "manager";
//   const isContributor = user && user.role && user.role.toLowerCase() === "contributor";

//   useEffect(() => {
//     if (!projectId) return;
//     getTasksByProject(projectId)
//       .then((res) => setTasks(res.data))
//       .catch((err) => alert("Failed to load tasks: " + err));
//   }, [projectId]);

//   // --- File modal handlers ---
//   const openFileModal = (idx) => {
//     setFileModalIdx(idx);
//     setShowFileModal(true);
//     const task = idx === "addingNew" ? editTask : tasks[idx];
//     setModalFile(task?.file || "");
//     setModalSaveAs(task?.file || "");
//     setModalFileObj(null);
//   };
//   const closeFileModal = () => {
//     setShowFileModal(false);
//     setFileModalIdx(null);
//     setModalFile("");
//     setModalSaveAs("");
//     setModalFileObj(null);
//   };
//   const handleModalFileChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setModalFile(e.target.files[0].name);
//       setModalSaveAs(e.target.files[0].name);
//       setModalFileObj(e.target.files[0]);
//     }
//   };
//   const handleModalSaveAsChange = (e) => setModalSaveAs(e.target.value);

//   const handleModalUpload = async () => {
//     let fileName = modalSaveAs || modalFile;
//     let fileUrl = "";

//     if (modalFileObj) {
//       try {
//         const res = await uploadTaskFile(modalFileObj);
//         fileUrl = res.data.url;
//         fileName = modalSaveAs || res.data.originalName;
//       } catch (err) {
//         alert("File upload failed: " + err);
//         return;
//       }
//     } else {
//       if (fileModalIdx === "addingNew") {
//         fileUrl = editTask?.fileUrl || "";
//       } else {
//         fileUrl = tasks[fileModalIdx]?.fileUrl || "";
//       }
//     }

//     if (fileModalIdx === "addingNew") {
//       setEditTask((prev) => ({
//         ...prev,
//         file: fileName,
//         fileUrl: fileUrl,
//       }));
//     } else {
//       setTasks((prev) =>
//         prev.map((task, i) =>
//           i === fileModalIdx
//             ? { ...task, file: fileName, fileUrl: fileUrl }
//             : task
//         )
//       );
//       // Also update editTask if in edit mode
//       if (editIdx === fileModalIdx) {
//         setEditTask((prev) => ({
//           ...prev,
//           file: fileName,
//           fileUrl: fileUrl,
//         }));
//       }
//     }
//     closeFileModal();
//   };

//   const handleFileDownload = async (task) => {
//     if (!task.fileUrl) return;
//     try {
//       const fileName = task.fileUrl.split('/').pop();
//       const response = await fetch(`http://localhost:5047/api/tasks/files/${fileName}`);
//       if (!response.ok) throw new Error('File not found');
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = task.file || fileName;
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//       document.body.removeChild(a);
//     } catch (error) {
//       alert('Failed to download file. Please try again.');
//     }
//   };

//   // Members handling (multiline)
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setEditTask((prev) => ({ ...prev, [name]: value }));
//   };
//   const handleEditMembers = (e) => {
//     setEditTask((prev) => ({
//       ...prev,
//       members: e.target.value.split("\n"),
//     }));
//   };
//   const membersText = editTask?.members?.join("\n") || "";
//   const renderMembers = (members) => {
//     if (!members) return null;
//     const arr = Array.isArray(members) ? members : members.split("\n");
//     return (
//       <div>
//         {arr.map((m, i) => (
//           <span key={i} style={{ display: "block", whiteSpace: "pre-wrap" }}>{m}</span>
//         ))}
//       </div>
//     );
//   };

//   // --- Only admin/manager can edit/create ---
//   const handleSave = (idx) => {
//     if (!(isAdmin || isManager)) return;
//     if (addingNew) {
//       const payload = { ...editTask, projectId: parseInt(projectId) };
//       addTask(payload)
//         .then((res) => setTasks([...tasks, res.data]))
//         .catch((err) => alert("Failed to add task: " + err));
//       setAddingNew(false);
//     } else {
//       const taskId = tasks[editIdx].id;
//       updateTask(taskId, { ...editTask, projectId: parseInt(projectId) })
//         .then(() => {
//           const updated = tasks.map((t, i) =>
//             i === editIdx ? { ...editTask, id: taskId, projectId: parseInt(projectId) } : t
//           );
//           setTasks(updated);
//         })
//         .catch((err) => alert("Failed to update task: " + err));
//     }
//     setEditIdx(null);
//     setEditTask(null);
//   };
//   const handleCancel = () => {
//     setEditIdx(null);
//     setEditTask(null);
//     setAddingNew(false);
//     closeFileModal();
//   };
//   const handleEdit = (idx) => {
//     if (!(isAdmin || isManager)) return;
//     setEditIdx(idx);
//     setEditTask({ ...tasks[idx] });
//     setAddingNew(false);
//   };
//   const handleDelete = (idx) => {
//     if (!(isAdmin || isManager)) return;
//     const taskId = tasks[idx].id;
//     deleteTask(taskId)
//       .then(() => setTasks(tasks.filter((_, i) => i !== idx)))
//       .catch((err) => alert("Failed to delete task: " + err));
//   };
//   const handleAddNew = () => {
//     if (!(isAdmin || isManager)) return;
//     setAddingNew(true);
//     setEditTask({
//       title: "",
//       description: "",
//       members: [],
//       startDate: "",
//       dueDate: "",
//       dueStatus: dueStatusOptions[0],
//       priority: priorityOptions[0],
//       status: statusOptions[0],
//       file: "",
//       fileUrl: "",
//     });
//   };

//   const handleModalRemoveFile = () => {
//     setModalFile("");
//     setModalSaveAs("");
//     setModalFileObj(null);

//     if (fileModalIdx === "addingNew") {
//       setEditTask((prev) => ({
//         ...prev,
//         file: "",
//         fileUrl: "",
//       }));
//     } else if (fileModalIdx !== null) {
//       setTasks((prev) =>
//         prev.map((task, i) =>
//           i === fileModalIdx
//             ? { ...task, file: "", fileUrl: "" }
//             : task
//         )
//       );
//       if (editIdx === fileModalIdx) {
//         setEditTask((prev) => ({
//           ...prev,
//           file: "",
//           fileUrl: "",
//         }));
//       }
//     }
//   };

//   return (
//     <div className="p-8">
//       <button
//         className="mb-4 bg-gray-500 text-white px-4 py-2 rounded"
//         onClick={() => navigate("/projects")}
//       >
//         ← Back to Projects
//       </button>
//       <h1 className="text-2xl font-bold mb-4">Task Management</h1>
//       {(isAdmin || isManager) && (
//         <button
//           className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
//           onClick={handleAddNew}
//         >
//           Create New Task
//         </button>
//       )}
//       <div className="overflow-x-auto w-full">
//         <table className="min-w-[1600px] bg-white border whitespace-nowrap">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2">Task Title</th>
//               <th className="border px-4 py-2">Description</th>
//               <th className="border px-4 py-2">Assigned Members</th>
//               <th className="border px-4 py-2">Timeline</th>
//               <th className="border px-4 py-2">Due Date Status</th>
//               <th className="border px-4 py-2">Priority</th>
//               <th className="border px-4 py-2">Status</th>
//               <th className="border px-4 py-2">File Attachments</th>
//               <th className="border px-4 py-2">Submission</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((task, idx) => (
//               <tr key={task.id || idx}>
//                 <td className="border px-4 py-2">
//                   {(isAdmin || isManager) && editIdx === idx ? (
//                     <textarea name="title" value={editTask.title}
//                       onChange={handleFormChange}
//                       className="border border-black rounded px-2 py-1 w-full resize-none"
//                       rows={2} style={{ fontSize: '1rem' }}
//                     />
//                   ) : (task.title)}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {(isAdmin || isManager) && editIdx === idx ? (
//                     <textarea name="description" value={editTask.description}
//                       onChange={handleFormChange}
//                       className="border border-black rounded px-2 py-1 w-full resize-none"
//                       rows={2} style={{ fontSize: '1rem' }}
//                     />
//                   ) : (task.description)}
//                 </td>
//                 <td className="border px-4 py-2" style={{ verticalAlign: "top" }}>
//                   {(isAdmin || isManager) && editIdx === idx ? (
//                     <textarea
//                       name="members"
//                       value={membersText}
//                       onChange={handleEditMembers}
//                       className="border border-black rounded px-2 py-1 w-full resize-none"
//                       rows={2}
//                       placeholder="Enter one member per line"
//                       style={{ fontSize: '1rem' }}
//                     />
//                   ) : renderMembers(task.members)}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {(isAdmin || isManager) && editIdx === idx ? (
//                     <div className="flex gap-2">
//                       <input type="date" name="startDate" value={editTask.startDate?.substring(0, 10) || ""} onChange={handleFormChange} className="border border-black rounded px-2 py-1" />
//                       <span>-</span>
//                       <input type="date" name="dueDate" value={editTask.dueDate?.substring(0, 10) || ""} onChange={handleFormChange} className="border border-black rounded px-2 py-1" />
//                     </div>
//                   ) : (
//                     `${String(task.startDate).substring(0, 10)} to ${String(task.dueDate).substring(0, 10)}`
//                   )}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {(isAdmin || isManager) && editIdx === idx ? (
//                     <select name="dueStatus" value={editTask.dueStatus} onChange={handleFormChange} className="border border-black rounded px-2 py-1 w-full" style={{ fontSize: '1rem' }}>
//                       {dueStatusOptions.map((d) => <option key={d} value={d}>{d}</option>)}
//                     </select>
//                   ) : (task.dueStatus)}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {(isAdmin || isManager) && editIdx === idx ? (
//                     <select name="priority" value={editTask.priority} onChange={handleFormChange} className="border border-black rounded px-2 py-1 w-full" style={{ fontSize: '1rem' }}>
//                       {priorityOptions.map((p) => <option key={p} value={p}>{p}</option>)}
//                     </select>
//                   ) : (task.priority)}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {(isAdmin || isManager) && editIdx === idx ? (
//                     <select name="status" value={editTask.status} onChange={handleFormChange} className="border border-black rounded px-2 py-1 w-full" style={{ fontSize: '1rem' }}>
//                       {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
//                     </select>
//                   ) : (task.status)}
//                 </td>
//                 {/* File Attachments */}
//                 <td className="border px-4 py-2">
//                   {(isAdmin || isManager) && editIdx === idx ? (
//                     <button
//                       type="button"
//                       className="text-blue-700 underline hover:text-blue-900 font-semibold"
//                       onClick={() => openFileModal(idx)}
//                     >
//                       {editTask.file || "Upload/View File"}
//                     </button>
//                   ) : (
//                     task.file && task.fileUrl ? (
//                       <div className="flex flex-col gap-1">
//                         <a
//                           href={`http://localhost:5047${task.fileUrl}`}
//                           className="text-blue-700 underline hover:text-blue-900 font-semibold text-sm"
//                           download={task.file}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           {task.file}
//                         </a>
//                         <button
//                           onClick={() => handleFileDownload(task)}
//                           className="text-sm text-blue-600 underline"
//                         >
                          
//                         </button>
//                       </div>
//                     ) : (<span className="text-gray-400">No file</span>)
//                   )}
//                 </td>

//                  {/* --- Submission column: --- */}
//               <td className="border px-4 py-2">
//                 {task.submissionFileName && task.submissionFileUrl ? (
//                   <a
//                     href={`http://localhost:5047${task.submissionFileUrl}`}
//                     className="text-blue-700 underline hover:text-blue-900 font-semibold text-sm"
//                     download={task.submissionFileName}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     {task.submissionFileName}
//                   </a>
//                 ) : (
//                   <span className="text-gray-400">No submission</span>
//                 )}
//               </td>
//                 {/* Actions */}
//                 <td className="border px-4 py-2">
//                   {(isAdmin || isManager) ? (
//                     editIdx === idx ? (
//                       <div className="flex gap-2">
//                         <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleSave(idx)}>Save</button>
//                         <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={handleCancel}>Cancel</button>
//                       </div>
//                     ) : (
//                       <div className="flex gap-2">
//                         <button className="bg-yellow-400 px-2 py-1 rounded" onClick={() => handleEdit(idx)}>Edit</button>
//                         <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(idx)}>Delete</button>
//                       </div>
//                     )
//                   ) : (
//                     <span className="text-gray-500">View Only</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//             {(isAdmin || isManager) && addingNew && (
//               <tr>
//                 <td className="border px-4 py-2">
//                   <textarea name="title" value={editTask.title}
//                     onChange={handleFormChange}
//                     className="border border-black rounded px-2 py-1 w-full resize-none"
//                     rows={2} style={{ fontSize: '1rem' }}
//                   />
//                 </td>
//                 <td className="border px-4 py-2">
//                   <textarea name="description" value={editTask.description}
//                     onChange={handleFormChange}
//                     className="border border-black rounded px-2 py-1 w-full resize-none"
//                     rows={2} style={{ fontSize: '1rem' }}
//                   />
//                 </td>
//                 <td className="border px-4 py-2">
//                   <textarea
//                     name="members"
//                     value={editTask.members?.join("\n") || ""}
//                     onChange={handleEditMembers}
//                     className="border border-black rounded px-2 py-1 w-full resize-none"
//                     rows={2}
//                     placeholder="Enter one member per line"
//                     style={{ fontSize: '1rem' }}
//                   />
//                 </td>
//                 <td className="border px-4 py-2">
//                   <div className="flex gap-2">
//                     <input type="date" name="startDate" value={editTask.startDate} onChange={handleFormChange} className="border border-black rounded px-2 py-1" />
//                     <span>-</span>
//                     <input type="date" name="dueDate" value={editTask.dueDate} onChange={handleFormChange} className="border border-black rounded px-2 py-1" />
//                   </div>
//                 </td>
//                 <td className="border px-4 py-2">
//                   <select name="dueStatus" value={editTask.dueStatus} onChange={handleFormChange} className="border border-black rounded px-2 py-1 w-full" style={{ fontSize: '1rem' }}>
//                     {dueStatusOptions.map((d) => <option key={d} value={d}>{d}</option>)}
//                   </select>
//                 </td>
//                 <td className="border px-4 py-2">
//                   <select name="priority" value={editTask.priority} onChange={handleFormChange} className="border border-black rounded px-2 py-1 w-full" style={{ fontSize: '1rem' }}>
//                     {priorityOptions.map((p) => <option key={p} value={p}>{p}</option>)}
//                   </select>
//                 </td>
//                 <td className="border px-4 py-2">
//                   <select name="status" value={editTask.status} onChange={handleFormChange} className="border border-black rounded px-2 py-1 w-full" style={{ fontSize: '1rem' }}>
//                     {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
//                   </select>
//                 </td>
//                 <td className="border px-4 py-2">
//                   <button
//                     type="button"
//                     className="text-blue-700 underline hover:text-blue-900 font-semibold"
//                     onClick={() => openFileModal("addingNew")}
//                   >
//                     {editTask.file || "Upload/View File"}
//                   </button>
//                 </td>
//                 <td className="border px-4 py-2">
//                     <span className="text-gray-400">No submission</span>
//                   </td>
//                 <td className="border px-4 py-2">
//                   <div className="flex gap-2">
//                     <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleSave(tasks.length)}>Add</button>
//                     <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={handleCancel}>Cancel</button>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         <FilePickerModal
//           open={showFileModal}
//           onClose={closeFileModal}
//           file={modalFile}
//           saveAs={modalSaveAs}
//           onFileChange={handleModalFileChange}
//           onSaveAsChange={handleModalSaveAsChange}
//           onUpload={handleModalUpload}
//           onRemoveFile={handleModalRemoveFile}
//         />
//       </div>
//     </div>
//   );
// }

// // Correct version
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   getTasksByProject,
//   addTask,
//   updateTask,
//   deleteTask,
//   uploadTaskFile
// } from "../API/TaskAPI";

// // --- File picker modal component ---
// function FilePickerModal({
//   open,
//   onClose,
//   file,
//   saveAs,
//   onFileChange,
//   onSaveAsChange,
//   onUpload,
//   onRemoveFile
// }) {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
//       <div className="bg-white rounded-lg shadow-xl min-w-[420px] max-w-full relative px-8 py-8">
//         <h2 className="text-xl font-semibold mb-4">File picker</h2>
//         <div>
//           <div className="mb-4">
//             <label className="block font-medium mb-1" htmlFor="fileInput">
//               Attachment
//             </label>
//             <input
//               id="fileInput"
//               type="file"
//               className="mb-1"
//               onChange={onFileChange}
//               style={{ display: 'inline-block' }}
//             />
//             <div className="text-gray-800 text-sm mb-1 flex items-center gap-3">
//               {file ? (
//                 <>
//                   <span>
//                     Current file: <span className="font-semibold">{file}</span>
//                   </span>
//                   <button
//                     type="button"
//                     className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-xs"
//                     onClick={onRemoveFile}
//                   >
//                     Remove
//                   </button>
//                 </>
//               ) : (
//                 <>No file chosen</>
//               )}
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block font-medium mb-1" htmlFor="saveAsInput">
//               Save as
//             </label>
//             <input
//               id="saveAsInput"
//               type="text"
//               value={saveAs}
//               onChange={onSaveAsChange}
//               className="border border-black rounded px-2 py-1 w-full"
//               placeholder="Rename the file (optional)"
//               style={{ fontSize: "1rem" }}
//             />
//           </div>
//           <div className="flex justify-end gap-3 mt-8">
//             <button
//               className="bg-blue-600 text-white px-4 py-2 rounded font-semibold"
//               onClick={onUpload}
//             >
//               Upload this file
//             </button>
//             <button
//               className="bg-gray-400 text-white px-4 py-2 rounded font-semibold"
//               onClick={onClose}
//               type="button"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//         <button
//           className="absolute top-2 right-3 text-gray-400 text-2xl hover:text-gray-800"
//           onClick={onClose}
//         >x</button>
//       </div>
//     </div>
//   );
// }

// const priorityOptions = ["High", "Medium", "Low"];
// const statusOptions = ["To-Do", "In Progress", "Done"];
// const dueStatusOptions = ["Done on time", "Overdue", "Done overdue"];

// export default function TaskManagement({ user }) {
//   const { projectId } = useParams();
//   const [tasks, setTasks] = useState([]);
//   const [editIdx, setEditIdx] = useState(null);
//   const [editTask, setEditTask] = useState(null);
//   const [addingNew, setAddingNew] = useState(false);

//   // File modal state
//   const [showFileModal, setShowFileModal] = useState(false);
//   const [fileModalIdx, setFileModalIdx] = useState(null);
//   const [modalFile, setModalFile] = useState("");
//   const [modalSaveAs, setModalSaveAs] = useState("");
//   const [modalFileObj, setModalFileObj] = useState(null);

//   const navigate = useNavigate();

//   // Role helpers
//   const isAdmin = user && user.role && user.role.toLowerCase() === "admin";
//   const isManager = user && user.role && user.role.toLowerCase() === "manager";
//   const isContributor = user && user.role && user.role.toLowerCase() === "contributor";

//   useEffect(() => {
//     if (!projectId) return;
//     getTasksByProject(projectId)
//       .then((res) => setTasks(res.data))
//       .catch((err) => alert("Failed to load tasks: " + err));
//   }, [projectId]);

//   // --- File modal handlers ---
//   const openFileModal = (idx) => {
//     setFileModalIdx(idx);
//     setShowFileModal(true);
//     const task = idx === "addingNew" ? editTask : tasks[idx];
//     setModalFile(task?.file || "");
//     setModalSaveAs(task?.file || "");
//     setModalFileObj(null);
//   };
//   const closeFileModal = () => {
//     setShowFileModal(false);
//     setFileModalIdx(null);
//     setModalFile("");
//     setModalSaveAs("");
//     setModalFileObj(null);
//   };
//   const handleModalFileChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setModalFile(e.target.files[0].name);
//       setModalSaveAs(e.target.files[0].name);
//       setModalFileObj(e.target.files[0]);
//     }
//   };
//   const handleModalSaveAsChange = (e) => setModalSaveAs(e.target.value);

//   const handleModalUpload = async () => {
//     let fileName = modalSaveAs || modalFile;
//     let fileUrl = "";

//     if (modalFileObj) {
//       try {
//         const res = await uploadTaskFile(modalFileObj);
//         fileUrl = res.data.url;
//         fileName = modalSaveAs || res.data.originalName;
//       } catch (err) {
//         alert("File upload failed: " + err);
//         return;
//       }
//     } else {
//       if (fileModalIdx === "addingNew") {
//         fileUrl = editTask?.fileUrl || "";
//       } else {
//         fileUrl = tasks[fileModalIdx]?.fileUrl || "";
//       }
//     }

//     if (fileModalIdx === "addingNew") {
//       setEditTask((prev) => ({
//         ...prev,
//         file: fileName,
//         fileUrl: fileUrl,
//       }));
//     } else {
//       setTasks((prev) =>
//         prev.map((task, i) =>
//           i === fileModalIdx
//             ? { ...task, file: fileName, fileUrl: fileUrl }
//             : task
//         )
//       );
//       if (editIdx === fileModalIdx) {
//         setEditTask((prev) => ({
//           ...prev,
//           file: fileName,
//           fileUrl: fileUrl,
//         }));
//       }
//     }
//     closeFileModal();
//   };

//   const handleFileDownload = async (task) => {
//     if (!task.fileUrl) return;
//     try {
//       const fileName = task.fileUrl.split('/').pop();
//       const response = await fetch(`http://localhost:5047/api/tasks/files/${fileName}`);
//       if (!response.ok) throw new Error('File not found');
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = task.file || fileName;
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//       document.body.removeChild(a);
//     } catch (error) {
//       alert('Failed to download file. Please try again.');
//     }
//   };

//   // Members handling (multiline)
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setEditTask((prev) => ({ ...prev, [name]: value }));
//   };
//   const handleEditMembers = (e) => {
//     setEditTask((prev) => ({
//       ...prev,
//       members: e.target.value.split("\n"),
//     }));
//   };
//   const membersText = editTask?.members?.join("\n") || "";
//   const renderMembers = (members) => {
//     if (!members) return null;
//     const arr = Array.isArray(members) ? members : members.split("\n");
//     return (
//       <div>
//         {arr.map((m, i) => (
//           <span key={i} style={{ display: "block", whiteSpace: "pre-wrap" }}>{m}</span>
//         ))}
//       </div>
//     );
//   };

//   // --- Only admin/manager can edit/create ---
//   const handleSave = (idx) => {
//     if (!(isAdmin || isManager)) return;

//     // === Validation ===
//     if (!editTask.title?.trim()) {
//       alert("Title is required");
//       return;
//     }
//     if (!editTask.startDate) {
//       alert("Start Date is required");
//       return;
//     }
//     if (!editTask.dueDate) {
//       alert("Due Date is required");
//       return;
//     }

//     // === Prepare payload ===
//     const payload = {
//       ...editTask,
//       projectId: parseInt(projectId),
//       members: Array.isArray(editTask.members) ? editTask.members : [],
//       startDate: new Date(editTask.startDate).toISOString(),
//       dueDate: new Date(editTask.dueDate).toISOString(),
//       file: editTask.file || "",
//       fileUrl: editTask.fileUrl || "",
//       submissionFileName: editTask.submissionFileName || "",
//       submissionFileUrl: editTask.submissionFileUrl || "",
//     };

//     if (addingNew) {
//       addTask(payload)
//         .then((res) => setTasks([...tasks, res.data]))
//         .catch((err) => alert("Failed to add task: " + (err?.response?.data || err)));
//       setAddingNew(false);
//     } else {
//       const taskId = tasks[editIdx].id;
//       updateTask(taskId, payload)
//         .then(() => {
//           const updated = tasks.map((t, i) =>
//             i === editIdx ? { ...editTask, id: taskId, projectId: parseInt(projectId) } : t
//           );
//           setTasks(updated);
//         })
//         .catch((err) => alert("Failed to update task: " + (err?.response?.data || err)));
//     }
//     setEditIdx(null);
//     setEditTask(null);
//   };

//   const handleCancel = () => {
//     setEditIdx(null);
//     setEditTask(null);
//     setAddingNew(false);
//     closeFileModal();
//   };
//   const handleEdit = (idx) => {
//     if (!(isAdmin || isManager)) return;
//     setEditIdx(idx);
//     setEditTask({ ...tasks[idx] });
//     setAddingNew(false);
//   };
//   const handleDelete = (idx) => {
//     if (!(isAdmin || isManager)) return;
//     const taskId = tasks[idx].id;
//     deleteTask(taskId)
//       .then(() => setTasks(tasks.filter((_, i) => i !== idx)))
//       .catch((err) => alert("Failed to delete task: " + err));
//   };
//   const handleAddNew = () => {
//     if (!(isAdmin || isManager)) return;
//     setAddingNew(true);
//     setEditTask({
//       title: "",
//       description: "",
//       members: [],
//       startDate: "",
//       dueDate: "",
//       dueStatus: dueStatusOptions[0],
//       priority: priorityOptions[0],
//       status: statusOptions[0],
//       file: "",
//       fileUrl: "",
//       submissionFileName: "",    
//       submissionFileUrl: "", 
//     });
//   };

//   const handleModalRemoveFile = () => {
//     setModalFile("");
//     setModalSaveAs("");
//     setModalFileObj(null);

//     if (fileModalIdx === "addingNew") {
//       setEditTask((prev) => ({
//         ...prev,
//         file: "",
//         fileUrl: "",
//       }));
//     } else if (fileModalIdx !== null) {
//       setTasks((prev) =>
//         prev.map((task, i) =>
//           i === fileModalIdx
//             ? { ...task, file: "", fileUrl: "" }
//             : task
//         )
//       );
//       if (editIdx === fileModalIdx) {
//         setEditTask((prev) => ({
//           ...prev,
//           file: "",
//           fileUrl: "",
//         }));
//       }
//     }
//   };

//   return (
//     <div className="p-8">
//       <button
//         className="mb-4 bg-gray-500 text-white px-4 py-2 rounded"
//         onClick={() => navigate("/projects")}
//       >
//         ← Back to Projects
//       </button>
//       <h1 className="text-2xl font-bold mb-4">Task Management</h1>
//       {(isAdmin || isManager) && (
//         <button
//           className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
//           onClick={handleAddNew}
//         >
//           Create New Task
//         </button>
//       )}
//       <div className="overflow-x-auto w-full">
//         <table className="min-w-[1600px] bg-white border whitespace-nowrap">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2">Task Title</th>
//               <th className="border px-4 py-2">Description</th>
//               <th className="border px-4 py-2">Assigned Members</th>
//               <th className="border px-4 py-2">Timeline</th>
//               <th className="border px-4 py-2">Due Date Status</th>
//               <th className="border px-4 py-2">Priority</th>
//               <th className="border px-4 py-2">Status</th>
//               <th className="border px-4 py-2">File Attachments</th>
//               <th className="border px-4 py-2">Submission</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((task, idx) => (
//               <tr key={task.id || idx}>
//                 <td className="border px-4 py-2">
//                   {(isAdmin || isManager) && editIdx === idx ? (
//                     <textarea name="title" value={editTask.title}
//                       onChange={handleFormChange}
//                       className="border border-black rounded px-2 py-1 w-full resize-none"
//                       rows={2} style={{ fontSize: '1rem' }}
//                     />
//                   ) : (task.title)}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {(isAdmin || isManager) && editIdx === idx ? (
//                     <textarea name="description" value={editTask.description}
//                       onChange={handleFormChange}
//                       className="border border-black rounded px-2 py-1 w-full resize-none"
//                       rows={2} style={{ fontSize: '1rem' }}
//                     />
//                   ) : (task.description)}
//                 </td>
//                 <td className="border px-4 py-2" style={{ verticalAlign: "top" }}>
//                   {(isAdmin || isManager) && editIdx === idx ? (
//                     <textarea
//                       name="members"
//                       value={membersText}
//                       onChange={handleEditMembers}
//                       className="border border-black rounded px-2 py-1 w-full resize-none"
//                       rows={2}
//                       placeholder="Enter one member per line"
//                       style={{ fontSize: '1rem' }}
//                     />
//                   ) : renderMembers(task.members)}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {(isAdmin || isManager) && editIdx === idx ? (
//                     <div className="flex gap-2">
//                       <input type="date" name="startDate" value={editTask.startDate?.substring(0, 10) || ""} onChange={handleFormChange} className="border border-black rounded px-2 py-1" required />
//                       <span>-</span>
//                       <input type="date" name="dueDate" value={editTask.dueDate?.substring(0, 10) || ""} onChange={handleFormChange} className="border border-black rounded px-2 py-1" required />
//                     </div>
//                   ) : (
//                     `${String(task.startDate).substring(0, 10)} to ${String(task.dueDate).substring(0, 10)}`
//                   )}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {(isAdmin || isManager) && editIdx === idx ? (
//                     <select name="dueStatus" value={editTask.dueStatus} onChange={handleFormChange} className="border border-black rounded px-2 py-1 w-full" style={{ fontSize: '1rem' }}>
//                       {dueStatusOptions.map((d) => <option key={d} value={d}>{d}</option>)}
//                     </select>
//                   ) : (task.dueStatus)}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {(isAdmin || isManager) && editIdx === idx ? (
//                     <select name="priority" value={editTask.priority} onChange={handleFormChange} className="border border-black rounded px-2 py-1 w-full" style={{ fontSize: '1rem' }}>
//                       {priorityOptions.map((p) => <option key={p} value={p}>{p}</option>)}
//                     </select>
//                   ) : (task.priority)}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {(isAdmin || isManager) && editIdx === idx ? (
//                     <select name="status" value={editTask.status} onChange={handleFormChange} className="border border-black rounded px-2 py-1 w-full" style={{ fontSize: '1rem' }}>
//                       {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
//                     </select>
//                   ) : (task.status)}
//                 </td>
//                 {/* File Attachments */}
//                 <td className="border px-4 py-2">
//                   {(isAdmin || isManager) && editIdx === idx ? (
//                     <button
//                       type="button"
//                       className="text-blue-700 underline hover:text-blue-900 font-semibold"
//                       onClick={() => openFileModal(idx)}
//                     >
//                       {editTask.file || "Upload/View File"}
//                     </button>
//                   ) : (
//                     task.file && task.fileUrl ? (
//                       <div className="flex flex-col gap-1">
//                         <a
//                           href={`http://localhost:5047${task.fileUrl}`}
//                           className="text-blue-700 underline hover:text-blue-900 font-semibold text-sm"
//                           download={task.file}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           {task.file}
//                         </a>
//                         <button
//                           onClick={() => handleFileDownload(task)}
//                           className="text-sm text-blue-600 underline"
//                         >
//                         </button>
//                       </div>
//                     ) : (<span className="text-gray-400">No file</span>)
//                   )}
//                 </td>
//                 {/* --- Submission column: --- */}
//                 <td className="border px-4 py-2">
//                   {task.submissionFileName && task.submissionFileUrl ? (
//                     <a
//                       href={`http://localhost:5047${task.submissionFileUrl}`}
//                       className="text-blue-700 underline hover:text-blue-900 font-semibold text-sm"
//                       download={task.submissionFileName}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       {task.submissionFileName}
//                     </a>
//                   ) : (
//                     <span className="text-gray-400">No submission</span>
//                   )}
//                 </td>
//                 {/* Actions */}
//                 <td className="border px-4 py-2">
//                   {(isAdmin || isManager) ? (
//                     editIdx === idx ? (
//                       <div className="flex gap-2">
//                         <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleSave(idx)}>Save</button>
//                         <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={handleCancel}>Cancel</button>
//                       </div>
//                     ) : (
//                       <div className="flex gap-2">
//                         <button className="bg-yellow-400 px-2 py-1 rounded" onClick={() => handleEdit(idx)}>Edit</button>
//                         <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(idx)}>Delete</button>
//                       </div>
//                     )
//                   ) : (
//                     <span className="text-gray-500">View Only</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//             {(isAdmin || isManager) && addingNew && (
//               <tr>
//                 <td className="border px-4 py-2">
//                   <textarea name="title" value={editTask.title}
//                     onChange={handleFormChange}
//                     className="border border-black rounded px-2 py-1 w-full resize-none"
//                     rows={2} style={{ fontSize: '1rem' }}
//                   />
//                 </td>
//                 <td className="border px-4 py-2">
//                   <textarea name="description" value={editTask.description}
//                     onChange={handleFormChange}
//                     className="border border-black rounded px-2 py-1 w-full resize-none"
//                     rows={2} style={{ fontSize: '1rem' }}
//                   />
//                 </td>
//                 <td className="border px-4 py-2">
//                   <textarea
//                     name="members"
//                     value={editTask.members?.join("\n") || ""}
//                     onChange={handleEditMembers}
//                     className="border border-black rounded px-2 py-1 w-full resize-none"
//                     rows={2}
//                     placeholder="Enter one member per line"
//                     style={{ fontSize: '1rem' }}
//                   />
//                 </td>
//                 <td className="border px-4 py-2">
//                   <div className="flex gap-2">
//                     <input type="date" name="startDate" value={editTask.startDate} onChange={handleFormChange} className="border border-black rounded px-2 py-1" required />
//                     <span>-</span>
//                     <input type="date" name="dueDate" value={editTask.dueDate} onChange={handleFormChange} className="border border-black rounded px-2 py-1" required />
//                   </div>
//                 </td>
//                 <td className="border px-4 py-2">
//                   <select name="dueStatus" value={editTask.dueStatus} onChange={handleFormChange} className="border border-black rounded px-2 py-1 w-full" style={{ fontSize: '1rem' }}>
//                     {dueStatusOptions.map((d) => <option key={d} value={d}>{d}</option>)}
//                   </select>
//                 </td>
//                 <td className="border px-4 py-2">
//                   <select name="priority" value={editTask.priority} onChange={handleFormChange} className="border border-black rounded px-2 py-1 w-full" style={{ fontSize: '1rem' }}>
//                     {priorityOptions.map((p) => <option key={p} value={p}>{p}</option>)}
//                   </select>
//                 </td>
//                 <td className="border px-4 py-2">
//                   <select name="status" value={editTask.status} onChange={handleFormChange} className="border border-black rounded px-2 py-1 w-full" style={{ fontSize: '1rem' }}>
//                     {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
//                   </select>
//                 </td>
//                 <td className="border px-4 py-2">
//                   <button
//                     type="button"
//                     className="text-blue-700 underline hover:text-blue-900 font-semibold"
//                     onClick={() => openFileModal("addingNew")}
//                   >
//                     {editTask.file || "Upload/View File"}
//                   </button>
//                 </td>
//                 {/* Submission column for adding new task */}
//                 <td className="border px-4 py-2 min-w-[140px] text-center">
//                   <span className="text-gray-400">No submission</span>
//                 </td>
//                 <td className="border px-4 py-2">
//                   <div className="flex gap-2">
//                     <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleSave(tasks.length)}>Add</button>
//                     <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={handleCancel}>Cancel</button>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         <FilePickerModal
//           open={showFileModal}
//           onClose={closeFileModal}
//           file={modalFile}
//           saveAs={modalSaveAs}
//           onFileChange={handleModalFileChange}
//           onSaveAsChange={handleModalSaveAsChange}
//           onUpload={handleModalUpload}
//           onRemoveFile={handleModalRemoveFile}
//         />
//       </div>
//     </div>
//   );
// }


// Haven change more logic version
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   getTasksByProject,
//   addTask,
//   updateTask,
//   deleteTask,
//   uploadTaskFile
// } from "../API/TaskAPI";
// import { MentionsInput, Mention } from "react-mentions";
// import { useNotifications } from "../notifications/NotificationsContext";
// import {
//   CheckCircleIcon, ExclamationCircleIcon, MinusCircleIcon, InformationCircleIcon,
//   DocumentTextIcon, ClipboardDocumentIcon, ClockIcon, EllipsisHorizontalCircleIcon,
//   FaceSmileIcon, AtSymbolIcon, PaperClipIcon, ChatBubbleOvalLeftEllipsisIcon
// } from '@heroicons/react/24/solid';
// import Tippy from '@tippyjs/react';
// import 'tippy.js/dist/tippy.css';
// import Picker from '@emoji-mart/react';
// import data from '@emoji-mart/data';
// import { ChevronRightIcon } from '@heroicons/react/24/solid';
// import axios from "axios";
// import { getCommentsByTaskId, addComment } from "../API/CommentsAPI";

// const priorityOptions = ["High", "Medium", "Low"];
// const statusOptions = ["To-Do", "In Progress", "Done"];
// const dueStatusOptions = ["On track", "Overdue", "Done on time", "Done overdue"];
// const usersList = [
//   { id: "admin", display: "admin" },
//   { id: "manager", display: "manager" },
//   { id: "student", display: "student" },
// ];

// export default function TaskManagement({ user }) {
//   const { projectId } = useParams();
//   const navigate = useNavigate();
//   const { addNotification } = useNotifications();

//   // Role helpers
//   const isAdmin = user?.role?.toLowerCase() === "admin";
//   const isManager = user?.role?.toLowerCase() === "manager";
//   const canEdit = isAdmin || isManager;

//   const [tasks, setTasks] = useState([]);
//   const [editIdx, setEditIdx] = useState(null);
//   const [editTask, setEditTask] = useState(null);
//   const [addingNew, setAddingNew] = useState(false);

//   // --- Bulk selection logic
//   const [selectedTasks, setSelectedTasks] = useState([]);
//   const selectedAllTasks = selectedTasks.length === tasks.length;

//   // --- File Modal logic
//   const [showFileModal, setShowFileModal] = useState(false);
//   const [modalFile, setModalFile] = useState("");
//   const [modalFileObj, setModalFileObj] = useState(null);
//   const [fileType, setFileType] = useState(""); // "attachment" or "submission"
//   const [modalIdx, setModalIdx] = useState(null);

//   // --- File native input logic
//   const [attachmentFileObj, setAttachmentFileObj] = useState(null);

//   // --- Comments
//   //const [comments, setComments] = useState({});
//   const [comments, setComments] = useState([]);
//   const [mentionInputs, setMentionInputs] = useState({});
//   const [showEmojiPickers, setShowEmojiPickers] = useState({});
//   const [commentFiles, setCommentFiles] = useState({});
//   const [showCommentsPanel, setShowCommentsPanel] = useState(false);
//   const [currentCommentTaskIdx, setCurrentCommentTaskIdx] = useState(null);

//   // --- Load tasks from backend ---
//   useEffect(() => {
//     if (!projectId) return;
//     getTasksByProject(projectId)
//       .then((res) => setTasks(res.data))
//       .catch((err) => alert("Failed to load tasks: " + (err?.response?.data || err)));
//   }, [projectId]);

//   //Comment
//   useEffect(() => {
//   if (showCommentsPanel && currentCommentTaskIdx !== null) {
//     const taskId = tasks[currentCommentTaskIdx]?.id;
//     if (taskId) {
//       getCommentsByTaskId(taskId)
//         .then(res => setComments(res.data))
//         .catch(() => setComments([]));
//     }
//   }
// }, [showCommentsPanel, currentCommentTaskIdx, tasks]);

//   // Restrict ticking while editing
//   const handleSelectTask = (idx) => {
//     if (editIdx !== null || addingNew) {
//       window.alert("Please click SAVE or CANCEL before selecting other tasks.");
//       return;
//     }
//     setSelectedTasks((prev) => prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]);
//   };

//   const handleSelectAllTasks = () => {
//     if (editIdx !== null || addingNew) {
//       window.alert("Please click SAVE or CANCEL before selecting other tasks.");
//       return;
//     }
//     setSelectedTasks(selectedAllTasks ? [] : tasks.map((_, i) => i));
//   };

//   // Bulk Action Handlers
//   const handleBulkEdit = () => {
//     if (!canEdit || selectedTasks.length !== 1) return;
//     handleEdit(selectedTasks[0]);
//   };
//   const handleBulkMarkDone = () => {
//     if (!canEdit) return;
//     selectedTasks.forEach(idx => {
//       const task = tasks[idx];
//       if (task.status !== "Done") {
//         updateTask(task.id, { ...task, status: "Done" })
//           .then((res) => setTasks(prev => prev.map((t, i) => i === idx ? res.data : t)));
//       }
//     });
//     setSelectedTasks([]);
//   };
//   const handleBulkDelete = () => {
//     if (!canEdit || selectedTasks.length !== 1) return;
//     handleDelete(selectedTasks[0]);
//     setSelectedTasks([]);
//   };
//   const handleBulkSave = () => {
//     if (!canEdit || selectedTasks.length !== 1) return;
//     handleSave(selectedTasks[0]);
//     setSelectedTasks([]);
//   };

//   // --- Form logic
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setEditTask((prev) => ({ ...prev, [name]: value }));
//   };
//   const handleEditMembers = (e) => {
//     setEditTask((prev) => ({
//       ...prev,
//       members: e.target.value.split(",").map((m) => m.trim()).filter(Boolean),
//     }));
//   };

//   // --- File Modal logic ---
//   const openFileModal = (idx, type) => {
//     setShowFileModal(true);
//     setModalIdx(idx);
//     setFileType(type);
//     const task = idx === "addingNew" ? editTask : tasks[idx];
//     if (type === "attachment") {
//       setModalFile(task?.file || "");
//     } else {
//       setModalFile(task?.submissionFileName || "");
//     }
//     setModalFileObj(null);
//   };
//   const closeFileModal = () => {
//     setShowFileModal(false);
//     setModalFile("");
//     setModalFileObj(null);
//     setModalIdx(null);
//     setFileType("");
//   };

//   const handleModalFileChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setModalFile(e.target.files[0].name);
//       setModalFileObj(e.target.files[0]);
//     }
//   };

//   const handleModalUpload = async () => {
//     if (!modalFileObj) {
//       closeFileModal();
//       return;
//     }
//     try {
//       const res = await uploadTaskFile(modalFileObj);
//       const fileName = modalFile;
//       const fileUrl = res.data.url;

//       if (modalIdx === "addingNew") {
//         setEditTask((prev) => ({
//           ...prev,
//           ...(fileType === "attachment"
//             ? { file: fileName, fileUrl }
//             : { submissionFileName: fileName, submissionFileUrl: fileUrl }),
//         }));
//       } else {
//         setTasks((prev) =>
//           prev.map((task, i) =>
//             i === modalIdx
//               ? {
//                   ...task,
//                   ...(fileType === "attachment"
//                     ? { file: fileName, fileUrl }
//                     : { submissionFileName: fileName, submissionFileUrl: fileUrl }),
//                 }
//               : task
//           )
//         );
//         if (editIdx === modalIdx) {
//           setEditTask((prev) => ({
//             ...prev,
//             ...(fileType === "attachment"
//               ? { file: fileName, fileUrl }
//               : { submissionFileName: fileName, submissionFileUrl: fileUrl }),
//           }));
//         }
//       }
//       closeFileModal();
//     } catch (err) {
//       alert("File upload failed: " + (err?.response?.data || err));
//     }
//   };

//   // File native input for attachment (used in table row)
//   const handleAttachmentFileChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setAttachmentFileObj(e.target.files[0]);
//       setEditTask((prev) => ({
//         ...prev,
//         file: e.target.files[0].name,
//       }));
//     }
//   };
//   const handleAttachmentUpload = async () => {
//     if (!attachmentFileObj) return;
//     try {
//       const res = await uploadTaskFile(attachmentFileObj);
//       setEditTask((prev) => ({
//         ...prev,
//         fileUrl: res.data.url,
//       }));
//       setAttachmentFileObj(null);
//     } catch (err) {
//       alert("File upload failed: " + (err?.response?.data || err));
//     }
//   };

//   // CRUD
//   const handleAddNew = () => {
//     if (!canEdit) return;
//     setAddingNew(true);
//     setEditTask({
//       title: "",
//       description: "",
//       members: [],
//       startDate: "",
//       dueDate: "",
//       dueStatus: dueStatusOptions[0],
//       priority: priorityOptions[0],
//       status: statusOptions[0],
//       file: "",
//       fileUrl: "",
//       submissionFileName: "",
//       submissionFileUrl: "",
//     });
//     setEditIdx(null);
//     setSelectedTasks([]);
//   };

//   const handleEdit = (idx) => {
//     if (!canEdit) return;
//     setEditIdx(idx);
//     setEditTask({ ...tasks[idx] });
//     setAddingNew(false);
//     setSelectedTasks([idx]);
//   };

//   const handleSave = (idx) => {
//     if (!canEdit) return;
//     if (!editTask.title?.trim()) return alert("Title is required");
//     if (!editTask.startDate) return alert("Start Date is required");
//     if (!editTask.dueDate) return alert("Due Date is required");

//     const payload = {
//       ...editTask,
//       projectId: parseInt(projectId),
//       members: Array.isArray(editTask.members) ? editTask.members : [],
//       file: editTask.file || "",
//       fileUrl: editTask.fileUrl || "",
//       submissionFileName: editTask.submissionFileName || "",
//       submissionFileUrl: editTask.submissionFileUrl || "",
//     };

//     if (addingNew) {
//       addTask(payload)
//         .then((res) => setTasks([...tasks, res.data]))
//         .catch((err) => alert("Failed to add task: " + (err?.response?.data || err)));
//       setAddingNew(false);
//     } else {
//       const taskId = tasks[editIdx].id;
//       updateTask(taskId, payload)
//         .then((res) => {
//           setTasks(tasks.map((t, i) => (i === editIdx ? res.data : t)));
//         })
//         .catch((err) => alert("Failed to update task: " + (err?.response?.data || err)));
//     }
//     setEditIdx(null);
//     setEditTask(null);
//     setAttachmentFileObj(null);
//     setSelectedTasks([]);
//   };

//   const handleCancel = () => {
//     setEditIdx(null);
//     setEditTask(null);
//     setAddingNew(false);
//     setAttachmentFileObj(null);
//     setSelectedTasks([]);
//   };

//   const handleDelete = (idx) => {
//     if (!canEdit) return;
//     const taskId = tasks[idx].id;
//     deleteTask(taskId)
//       .then(() => setTasks(tasks.filter((_, i) => i !== idx)))
//       .catch((err) => alert("Failed to delete task: " + (err?.response?.data || err)));
//     setEditIdx(null);
//     setAddingNew(false);
//     setSelectedTasks([]);
//   };

//   // Comments
  
//   // Comments: per-task state
//     const handleAddComment = async (taskIdx) => {
//       const taskId = tasks[taskIdx]?.id;
//       if (!mentionInputs[taskId] && !commentFiles[taskId]) return;

//       // Find mentioned users for notification
//       const mentionsRegex = /@\[[^\]]+\]\(([^)]+)\)/g;
//       let mentionedUsers = [];
//       let match;
//       while ((match = mentionsRegex.exec(mentionInputs[taskId] || "")) !== null) {
//         mentionedUsers.push(match[1]);
//       }
//         console.log("Mentioned users:", mentionedUsers);
//   // // File upload logic (per task)
//   //     let fileUrl = "";
//   //     const fileToUpload = commentFiles[taskId];
//   //     if (fileToUpload) {
//   //       const formData = new FormData();
//   //       formData.append("file", fileToUpload);
//   //       try {
//   //           const res = await axios.post(
//   //             "http://localhost:5047/api/comments/upload",
//   //             formData // Do NOT set headers here!
//   //         );
//   //         fileUrl = res.data.url;
//   //       } catch (e) {
//   //         alert("Failed to upload comment file: " + (e?.response?.data || e));
//   //         return; // Don’t add comment if file upload fails
//   //       }
//   //     }

//       // Prepare comment data
//       const task = tasks[taskIdx];
//       addComment({
//         taskId: task.id,
//         author: user.username,
//         text: mentionInputs[taskId], // includes emoji and mentions
//         fileUrl: "", // TODO: handle commentFile upload if needed
//       }).then(res => {
//         setComments(prev => [...prev, res.data]);
//         mentionedUsers.forEach((username) => {
//           console.log("Sending notification to:", username);
//           addNotification({
//             id: Date.now() + Math.random(),
//             user: username,
//             message: `You were mentioned in task ${task.title}: "${mentionInputs[taskId]}"`,
//             time: new Date().toLocaleString(),
//           });
//         });
//         setMentionInputs((prev) => ({ ...prev, [taskId]: "" }));
//         setCommentFiles((prev) => ({ ...prev, [taskId]: null }));
//         setShowEmojiPickers((prev) => ({ ...prev, [taskId]: false }));
//       });
//     };

//     const openCommentsPanel = (idx) => {
//       setCurrentCommentTaskIdx(idx);
//       setShowCommentsPanel(true);
//     };
//     const closeCommentsPanel = () => {
//       setShowCommentsPanel(false);
//       setCurrentCommentTaskIdx(null);
//     };
//   // const handleAddComment = (taskIdx) => {
//   //     if (!mentionInputs && !commentFiles) return;

//   //     // Find mentioned users for notification
//   //     const mentionsRegex = /@\[[^\]]+\]\(([^)]+)\)/g;
//   //     let mentionedUsers = [];
//   //     let match;
//   //     while ((match = mentionsRegex.exec(mentionInputs)) !== null) {
//   //       mentionedUsers.push(match[1]);
//   //     }

//   //     // Prepare comment data
//   //     const task = tasks[taskIdx];
//   //     addComment({
//   //       taskId: task.id,
//   //       author: user.username,
//   //       text: mentionInputs, // includes emoji and mentions
//   //       fileUrl: "",        // TODO: handle commentFile upload if needed
//   //     }).then(res => {
//   //       // Push new comment into comments array
//   //       setComments(prev => [...prev, res.data]);

//   //       // Send notification for each mentioned user
//   //       mentionedUsers.forEach((username) => {
//   //         addNotification({
//   //           id: Date.now() + Math.random(),
//   //           user: username,
//   //           message: `You were mentioned in task ${task.title}: "${mentionInputs}"`,
//   //           time: new Date().toLocaleString(),
//   //         });
//   //       });

//   //       setMentionInputs("");
//   //       setCommentFiles(null);
//   //     });
//   //   };

//   // // const handleAddComment = (taskIdx) => {
//   // //    if (!mentionInput && !commentFile) return;
     
//   // //   // const mentionsRegex = /@(\w+)/g;
//   // //   // const mentionedUsers = [];
//   // //   // let match;
//   // //   // while ((match = mentionsRegex.exec(mentionInput)) !== null) {
//   // //   //   mentionedUsers.push(match[1]);
//   // //   // }
//   // //   const mentionsRegex = /@\[[^\]]+\]\(([^)]+)\)/g;
//   // //   let mentionedUsers = [];
//   // //   let match;
//   // //   while ((match = mentionsRegex.exec(mentionInput)) !== null) {
//   // //     mentionedUsers.push(match[1]);
//   // //   }
//   // //   console.log("mentionInput:", mentionInput);
//   // //   console.log("mentionedUsers:", mentionedUsers);
//   // //   setComments((prev) => ({
//   // //     ...prev,
//   // //     [taskIdx]: [
//   // //       ...(prev[taskIdx] || []),
//   // //       { text: mentionInput, file: commentFile },
//   // //     ],
//   // //   }));
//   // //   console.log("mentionInput:", mentionInput);
//   // //   console.log("mentionedUsers:", mentionedUsers);
//   // //   mentionedUsers.forEach((user) => {
//   // //     addNotification({
//   // //       id: Date.now() + Math.random(),
//   // //       user,
//   // //       message: `You were mentioned in task ${tasks[taskIdx]?.title}: "${mentionInput}"`,
//   // //       time: new Date().toLocaleString(),
//   // //     });
//   // //   });
//   // //   setMentionInput("");
//   // //   setCommentFile(null);
//   // // };


//   // const openCommentsPanel = (idx) => {
//   //   setCurrentCommentTaskIdx(idx);
//   //   setShowCommentsPanel(true);
//   // };
//   // const closeCommentsPanel = () => {
//   //   setShowCommentsPanel(false);
//   //   setCurrentCommentTaskIdx(null);
//   // };

//   // Renderers
//   const renderDueStatusBadge = (task) => {
//     const today = new Date().toISOString().split("T")[0];
//     let content, color, Icon;
//     const dueDate = (typeof task.dueDate === "string" ? task.dueDate.substring(0,10) : task.dueDate);
//     if (task.status !== "Done") {
//       if (today <= dueDate) {
//         content = "On track"; color = "bg-blue-100 text-blue-800"; Icon = InformationCircleIcon;
//       } else {
//         content = "Overdue"; color = "bg-red-100 text-red-800"; Icon = ExclamationCircleIcon;
//       }
//     } else {
//       if ((task.completedDate || today) <= dueDate) {
//         content = "Done on time"; color = "bg-green-100 text-green-800"; Icon = CheckCircleIcon;
//       } else {
//         content = "Done overdue"; color = "bg-red-100 text-red-800"; Icon = MinusCircleIcon;
//       }
//     }
//     return (
//       <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
//         <Icon className="h-4 w-4" />{content}
//       </span>
//     );
//   };
//   const renderPriorityBadge = (priority) => {
//     let colorClasses = "";
//     switch (priority) {
//       case "High": colorClasses = "bg-red-700 text-white"; break;
//       case "Medium": colorClasses = "bg-orange-500 text-white"; break;
//       case "Low": colorClasses = "bg-blue-400 text-white"; break;
//       default: colorClasses = "bg-gray-200 text-gray-800";
//     }
//     return (
//       <span className={`inline-block px-3 py-1 rounded-full text-xs font-normal ${colorClasses}`}>{priority}</span>
//     );
//   };
//   const renderStatusBadge = (status) => {
//     let bgColor, textColor, Icon;
//     if (status === "To-Do") {
//       bgColor = "bg-gray-200"; textColor = "text-gray-800"; Icon = EllipsisHorizontalCircleIcon;
//     } else if (status === "In Progress") {
//       bgColor = "bg-yellow-100"; textColor = "text-yellow-800"; Icon = ClockIcon;
//     } else {
//       bgColor = "bg-green-100"; textColor = "text-green-800"; Icon = CheckCircleIcon;
//     }
//     return (
//       <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
//         <Icon className="h-4 w-4" />{status}
//       </span>
//     );
//   };

//   //--Get project name
//   const [projectName, setProjectName] = useState("Loading...");
//   useEffect(() => {
//     if (!projectId) return;
//     axios.get(`http://localhost:5047/api/projects/${projectId}`)
//       .then(res => {
//         console.log("Project fetch result:", res.data);
//         setProjectName(res.data.title || "Project");
//       })
//       .catch(err => {
//         console.log("Project fetch error:", err);
//         setProjectName("Project");
//       });
//   }, [projectId]);

//   // user list
//   const [usersList, setUsersList] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5047/api/User")
//       .then(res => {
//         setUsersList(
//           res.data.map(user => ({
//             id: user.username,
//             display: user.username
//           }))
//         );
//       });
//   }, []);
//   // --- UI Render ---
//   return (
//     <div className="p-8 min-h-screen bg-[#f6f8fa]">
//       {/* Breadcrumb */}
//        <div className="flex items-center mb-6">
//         <span
//           className="mr-4 hover:text-mycustomblue cursor-pointer text-3xl font-bold"
//           onClick={() => navigate('/projects')}
//         >
//           Projects
//         </span>
//         <ChevronRightIcon className="h-5 w-5 text-gray-500" />
//             <span className="ml-2 text-3xl font-bold text-gray-800">
//               {projectName}
//            </span>
//       </div>

//       {canEdit && (
//         <button
//           className="mb-8 bg-mycustomblue text-white font-medium px-4 py-2 rounded"
//           onClick={handleAddNew}
//         >
//           Create New Task
//         </button>
//       )}

//       {/* ACTION BAR */}
//       {/* {selectedTasks.length > 0 && (
//         <div className="bg-white border rounded mb-2 px-4 py-2 flex items-center justify-between shadow-sm">
//           <span className="text-xs text-gray-800">
//             SELECTED: {selectedTasks.length}
//           </span>
//           <div className="flex gap-2">
//             <button
//               onClick={handleBulkEdit}
//               className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//               disabled={!canEdit || selectedTasks.length !== 1 || editIdx !== null || addingNew}
//             >
//               EDIT
//             </button>
//             <button
//               onClick={handleBulkMarkDone}
//               className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//               disabled={!canEdit}
//             >
//               MARK AS DONE
//             </button>
//             <button
//               onClick={handleBulkDelete}
//               className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//               disabled={!canEdit || selectedTasks.length !== 1}
//             >
//               DELETE
//             </button>
//             {editIdx !== null && selectedTasks.length === 1 && selectedTasks[0] === editIdx && (
//               <button
//                 onClick={handleBulkSave}
//                 className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//               >
//                 SAVE
//               </button>
//             )}
//             <button
//               onClick={handleCancel}
//               className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//             >
//               CANCEL
//             </button>
//           </div>
//         </div>
//       )} */}

//     {(selectedTasks.length > 0 || addingNew) && (
//       <div className="bg-white border rounded mb-2 px-4 py-2 flex items-center justify-between shadow-sm">
//         <span className="text-xs text-gray-800">
//           {addingNew ? "ADDING NEW TASK" : `SELECTED: ${selectedTasks.length}`}
//         </span>
//         <div className="flex gap-3">
//           {addingNew ? (
//             <>
//               <button
//                 onClick={handleBulkSave}
//                 className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//               >
//                 SAVE
//               </button>
//               <button
//                 onClick={handleCancel}
//                 className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//               >
//                 CANCEL
//               </button>
//             </>
//           ) : (
//             <>
//               {/* Show EDIT when only one is selected, and not in edit mode or adding new */}
//               {selectedTasks.length === 1 && editIdx === null && !addingNew && (
//                 <button
//                   onClick={() => handleBulkEdit(selectedTasks[0])}
//                   className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//                 >
//                   EDIT
//                 </button>
//               )}
//               {/* Show SAVE when one is selected and in edit mode */}
//               {editIdx !== null && selectedTasks.length === 1 && selectedTasks[0] === editIdx && (
//                 <button
//                   onClick={handleBulkSave}
//                   className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//                 >
//                   SAVE
//                 </button>
//               )}
//               {/* Always allow mark as done and delete if editable */}
//               <button
//                 onClick={handleBulkMarkDone}
//                 className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//                 disabled={!canEdit}
//               >
//                 MARK AS DONE
//               </button>
//               <button
//                 onClick={handleBulkDelete}
//                 className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//                 disabled={!canEdit}
//               >
//                 DELETE
//               </button>
//               <button
//                 onClick={handleCancel}
//                 className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//               >
//                 CANCEL
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     )}

//       <div className="overflow-x-auto w-full">
//         <table className="min-w-[1400px] bg-white border whitespace-nowrap">
//           <thead>
//             <tr>
//               <th className="sticky left-0 bg-white z-10 border px-4 py-2 text-left text-sm font-semibold">
//                 <input
//                   type="checkbox"
//                   checked={selectedAllTasks}
//                   onChange={handleSelectAllTasks}
//                   disabled={!canEdit || editIdx !== null || addingNew}
//                 />
//               </th>
//               <th className="border px-4 py-2 text-left text-sm font-semibold">ID</th>
//               <th className="border px-4 py-2 text-left text-sm font-semibold">Task Title</th>
//               <th className="border px-4 py-2 text-left text-sm font-semibold">Description</th>
//               <th className="border px-4 py-2 text-left text-sm font-semibold">Status</th>
//               <th className="border px-4 py-2 text-left text-sm font-semibold">Priority</th>
//               <th className="border px-4 py-2 text-left text-sm font-semibold">Assigned Members</th>
//               <th className="border px-4 py-2 text-left text-sm font-semibold">Timeline</th>
//               <th className="border px-4 py-2 text-left text-sm font-semibold">Due Status</th>
//               <th className="border px-4 py-2 text-left text-sm font-semibold">File Attachment</th>
//               <th className="border px-4 py-2 text-left text-sm font-semibold">File Submission</th>
//               <th className="border px-4 py-2 text-left text-sm font-semibold">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((task, idx) => (
//               <tr key={task.id || idx} className={selectedTasks.includes(idx) ? "bg-green-50" : ""}>
//                 <td className="sticky left-0 bg-white z-10 border px-4 py-2 text-sm font-normal">
//                   <input
//                     type="checkbox"
//                     checked={selectedTasks.includes(idx)}
//                     onChange={() => handleSelectTask(idx)}
//                     disabled={!canEdit || editIdx !== null || addingNew}
//                   />
//                 </td>
//                 <td className="border px-4 py-2 text-sm font-normal">{idx + 1}</td>
//                 <td className="border px-4 py-2 text-sm font-normal">
//                   <div className="flex items-center gap-2">
//                     <ClipboardDocumentIcon className="h-5 w-5 text-blue-500" />
//                     {(canEdit && editIdx === idx) ? (
//                       <input
//                         name="title"
//                         value={editTask.title}
//                         onChange={handleFormChange}
//                         className="border px-2 py-1 rounded w-full"
//                       />
//                     ) : task.title}
//                   </div>
//                 </td>
//                 <td className="border px-4 py-2 text-sm font-normal">
//                   {(canEdit && editIdx === idx) ? (
//                     <input
//                       name="description"
//                       value={editTask.description}
//                       onChange={handleFormChange}
//                       className="border px-2 py-1 rounded w-full"
//                     />
//                   ) : (
//                     <Tippy content={<span>{task.description}</span>} theme="light" placement="top" maxWidth="300px" className="p-2">
//                       <span className="block max-w-xs truncate cursor-pointer">
//                         {task.description}
//                       </span>
//                     </Tippy>
//                   )}
//                 </td>
//                 <td className="border px-4 py-2 text-sm font-normal">
//                   {(canEdit && editIdx === idx) ? (
//                     <select
//                       name="status"
//                       value={editTask.status}
//                       onChange={handleFormChange}
//                       className="border px-2 py-1 rounded w-full"
//                     >
//                       {statusOptions.map((s) => (
//                         <option key={s} value={s}>{s}</option>
//                       ))}
//                     </select>
//                   ) : (
//                     renderStatusBadge(task.status)
//                   )}
//                 </td>
//                 <td className="border px-4 py-2 text-sm font-normal">
//                   {(canEdit && editIdx === idx) ? (
//                     <select
//                       name="priority"
//                       value={editTask.priority}
//                       onChange={handleFormChange}
//                       className="border px-2 py-1 rounded w-full"
//                     >
//                       {priorityOptions.map((p) => (
//                         <option key={p} value={p}>{p}</option>
//                       ))}
//                     </select>
//                   ) : (
//                     renderPriorityBadge(task.priority)
//                   )}
//                 </td>
//                 <td className="border px-4 py-2 text-sm font-normal">
//                   {(canEdit && editIdx === idx) ? (
//                     <input
//                       name="members"
//                       value={editTask.members?.join(", ") || ""}
//                       onChange={handleEditMembers}
//                       className="border px-2 py-1 rounded w-full"
//                     />
//                   ) : (
//                     <ul className="list-disc pl-4">
//                       {(task.members || []).map((m) => (
//                         <li key={m}>{m}</li>
//                       ))}
//                     </ul>
//                   )}
//                 </td>
//                 <td className="border px-4 py-2 text-sm font-normal">
//                   {(canEdit && editIdx === idx) ? (
//                     <div className="flex gap-2">
//                       <input
//                         type="date"
//                         name="startDate"
//                         value={editTask.startDate?.substring(0, 10) || ""}
//                         onChange={handleFormChange}
//                         className="border px-2 py-1 rounded"
//                       />
//                       <span>-</span>
//                       <input
//                         type="date"
//                         name="dueDate"
//                         value={editTask.dueDate?.substring(0, 10) || ""}
//                         onChange={handleFormChange}
//                         className="border px-2 py-1 rounded"
//                       />
//                     </div>
//                   ) : (
//                     `${String(task.startDate).substring(0, 10)} - ${String(task.dueDate).substring(0, 10)}`
//                   )}
//                 </td>
//                 <td className="border px-4 py-2 text-sm font-normal">
//                   {renderDueStatusBadge(task)}
//                 </td>
//                 {/* File Attachment (native file input like screenshot 4, and modal as fallback) */}
//                 <td className="border px-4 py-2 text-sm font-normal text-center">
//                   {(canEdit && editIdx === idx) ? (
//                     <div className="flex flex-col items-center">
//                       <input
//                         type="file"
//                         onChange={handleAttachmentFileChange}
//                         className="mb-1"
//                         accept="*"
//                       />
//                       {editTask.file && (
//                         <div className="text-xs text-gray-800 mb-1">
//                           Current file: <span className="font-semibold">{editTask.file}</span>
//                         </div>
//                       )}
//                       {attachmentFileObj && (
//                         <button
//                           className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
//                           onClick={handleAttachmentUpload}
//                           type="button"
//                         >
//                           Upload
//                         </button>
//                       )}
//                     </div>
//                   ) : (
//                     task.file && task.fileUrl && (
//                       <a
//                         href={`http://localhost:5047${task.fileUrl}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center gap-2"
//                       >
//                         <DocumentTextIcon className="h-5 w-5 text-blue-500 inline-block" />
//                         <span>{task.file}</span>
//                       </a>
//                     )
//                   )}
//                 </td>
//                 {/* File Submission (View only) */}
//                 <td className="border px-4 py-2 text-sm font-normal text-center">
//                   {task.submissionFileName && task.submissionFileUrl ? (
//                     <a
//                       href={`http://localhost:5047${task.submissionFileUrl}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-2"
//                     >
//                       <DocumentTextIcon className="h-5 w-5 text-black-500 inline-block" />
//                       <span>{task.submissionFileName}</span>
//                     </a>
//                   ) : (
//                     <span className="text-gray-400">No Submission</span>
//                   )}
//                 </td>
//                 {/* Actions */}
//                 <td className="border px-4 py-2 text-xs font-medium">
//                   {canEdit ? (
//                     editIdx === idx ? (
//                       <div className="flex gap-2">
//                         <button
//                           className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
//                           onClick={() => handleSave(idx)}
//                         >SAVE</button>
//                         <button
//                           className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
//                           onClick={handleCancel}
//                         >CANCEL</button>
//                       </div>
//                     ) : (
//                       <div className="flex gap-2 text-xs font-medium">
//                         <button
//                           className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
//                           onClick={() => openCommentsPanel(idx)}
//                         >
//                           <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
//                         </button>
//                         {/* <button
//                           className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
//                           onClick={() => handleEdit(idx)}
//                           disabled={editIdx !== null || addingNew}
//                         >EDIT</button>
//                         <button
//                           className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
//                           onClick={() => handleBulkMarkDone(idx)}
//                         >MARK AS DONE</button>
//                         <button
//                           className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
//                           onClick={() => handleDelete(idx)}
//                         >DELETE</button>
//                         <button
//                           className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
//                           onClick={handleCancel}
//                         >CANCEL</button> */}
//                       </div>
//                     )
//                   ) : (
//                     <span className="text-gray-500">View Only</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//             {(canEdit && addingNew) && (
//               <tr className="bg-yellow-50">
//                 <td className="border px-4 py-2 text-sm font-normal"></td>
//                 <td className="border px-4 py-2 text-sm font-normal">{tasks.length + 1}</td>
//                 <td className="border px-4 py-2 text-sm font-normal">
//                   <input
//                     name="title"
//                     value={editTask.title}
//                     onChange={handleFormChange}
//                     className="border px-2 py-1 rounded w-full"
//                   />
//                 </td>
//                 <td className="border px-4 py-2 text-sm font-normal">
//                   <input
//                     name="description"
//                     value={editTask.description}
//                     onChange={handleFormChange}
//                     className="border px-2 py-1 rounded w-full"
//                   />
//                 </td>
//                 <td className="border px-4 py-2 text-sm font-normal">
//                   <select
//                     name="status"
//                     value={editTask.status}
//                     onChange={handleFormChange}
//                     className="border px-2 py-1 rounded w-full"
//                   >
//                     {statusOptions.map((s) => (
//                       <option key={s} value={s}>{s}</option>
//                     ))}
//                   </select>
//                 </td>
//                 <td className="border px-4 py-2 text-sm font-normal">
//                   <select
//                     name="priority"
//                     value={editTask.priority}
//                     onChange={handleFormChange}
//                     className="border px-2 py-1 rounded w-full"
//                   >
//                     {priorityOptions.map((p) => (
//                       <option key={p} value={p}>{p}</option>
//                     ))}
//                   </select>
//                 </td>
//                 <td className="border px-4 py-2 text-sm font-normal">
//                   <input
//                     name="members"
//                     value={editTask.members?.join(", ") || ""}
//                     onChange={handleEditMembers}
//                     className="border px-2 py-1 rounded w-full"
//                   />
//                 </td>
//                 <td className="border px-4 py-2 text-sm font-normal">
//                   <div className="flex gap-2">
//                     <input
//                       type="date"
//                       name="startDate"
//                       value={editTask.startDate}
//                       onChange={handleFormChange}
//                       className="border px-2 py-1 rounded"
//                     />
//                     <span>-</span>
//                     <input
//                       type="date"
//                       name="dueDate"
//                       value={editTask.dueDate}
//                       onChange={handleFormChange}
//                       className="border px-2 py-1 rounded"
//                     />
//                   </div>
//                 </td>
//                 <td className="border px-4 py-2 text-sm font-normal"></td>
//                 <td className="border px-4 py-2 text-sm font-normal text-center">
//                   <div className="flex flex-col items-center">
//                     <input
//                       type="file"
//                       onChange={handleAttachmentFileChange}
//                       className="mb-1"
//                     />
//                     {editTask.file && (
//                       <div className="text-xs text-gray-800 mb-1">
//                         Current file: <span className="font-semibold">{editTask.file}</span>
//                       </div>
//                     )}
//                     {attachmentFileObj && (
//                       <button
//                         className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
//                         onClick={handleAttachmentUpload}
//                         type="button"
//                       >
//                         Upload
//                       </button>
//                     )}

//                   </div>
//                 </td>
//                 <td className="border px-4 py-2 text-sm font-normal text-center">
//                   <span className="text-gray-400">No Submission</span>
//                 </td>
//                 <td className="border px-4 py-2 text-xs font-medium">
//                   <div className="flex gap-2">
//                     <button
//                       className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
//                       onClick={() => handleSave(null)}
//                     >SAVE</button>
//                     <button
//                       className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
//                       onClick={handleCancel}
//                     >CANCEL</button>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       {/* Side Comments Panel */}


//       {showCommentsPanel && (
//         <>
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeCommentsPanel}></div>
//           <div className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-lg z-50 overflow-y-auto">
//             <div className="flex justify-between items-center border-b px-6 py-3">
//               <h2 className="text-lg font-extrabold">{tasks[currentCommentTaskIdx]?.title}</h2>
//               <button onClick={closeCommentsPanel} className="text-gray-600 text-2xl font-extrabold">×</button>
//             </div>
//             <div className="border-t p-6">
//               {/* Add Comment Section */}
//               <div className="mb-8 relative">
//                 <MentionsInput
//                   value={mentionInputs[tasks[currentCommentTaskIdx]?.id] || ""}
//                   onChange={(e) =>
//                     setMentionInputs((prev) => ({
//                       ...prev,
//                       [tasks[currentCommentTaskIdx]?.id]: e.target.value,
//                     }))
//                   }
//                   className="border rounded p-2 w-full min-h-[80px]"
//                   placeholder="Add Comment..."
//                   style={{
//                     control: { padding: "8px", fontSize: 14 },
//                     highlighter: { padding: "8px" },
//                     input: { padding: "8px" }
//                   }}
//                 >
//                   <Mention trigger="@" data={usersList} className="bg-blue-200" />
//                 </MentionsInput>
//                 <div className="flex items-center justify-between mt-2">
//                   <div className="flex gap-2">
//                     {/* Emoji Picker */}
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setShowEmojiPickers((prev) => ({
//                           ...prev,
//                           [tasks[currentCommentTaskIdx]?.id]: !prev[tasks[currentCommentTaskIdx]?.id],
//                         }))
//                       }
//                       className="text-gray-600 hover:text-gray-800"
//                     >
//                       <FaceSmileIcon className="h-5 w-5" />
//                     </button>
//                     {/* @ Button */}
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setMentionInputs((prev) => ({
//                           ...prev,
//                           [tasks[currentCommentTaskIdx]?.id]:
//                             (prev[tasks[currentCommentTaskIdx]?.id] || "") + "@",
//                         }))
//                       }
//                       className="text-gray-600 hover:text-gray-800"
//                     >
//                       <AtSymbolIcon className="h-5 w-5" />
//                     </button>
//                     {/* File Attachment */}
//                     {/* <label className="cursor-pointer">
//                       <input
//                         type="file"
//                         className="hidden"
//                         onChange={(e) =>
//                           setCommentFiles((prev) => ({
//                             ...prev,
//                             [tasks[currentCommentTaskIdx]?.id]: e.target.files[0],
//                           }))
//                         }
//                       />
//                       <PaperClipIcon className="h-5 w-5 text-gray-600 hover:text-gray-800" />
//                     </label> */}
//                   </div>
//                   <button
//                     className="bg-blue-700 text-white px-4 py-1 rounded text-sm"
//                     onClick={() => {
//                       handleAddComment(currentCommentTaskIdx);
//                       setShowEmojiPickers((prev) => ({
//                         ...prev,
//                         [tasks[currentCommentTaskIdx]?.id]: false
//                       }));
//                     }}
//                   >
//                     Send
//                   </button>
//                 </div>
//                 {/* Show emoji picker for this task */}
//                 {showEmojiPickers[tasks[currentCommentTaskIdx]?.id] && (
//                   <div className="absolute z-50 mt-2">
//                     <Picker
//                       data={data}
//                       onEmojiSelect={(emoji) =>
//                         setMentionInputs((prev) => ({
//                           ...prev,
//                           [tasks[currentCommentTaskIdx]?.id]:
//                             (prev[tasks[currentCommentTaskIdx]?.id] || "") + emoji.native,
//                         }))
//                       }
//                       theme="light"
//                     />
//                   </div>
//                 )}
//               </div>
//               {/* Published comments */}
//               {comments.map((comment, ci) => (
//                 <div key={ci} className="flex items-start gap-2 mb-4">
//                   <div className="flex-shrink-0">
//                     <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
//                       {comment.author[0].toUpperCase()}
//                     </div>
//                   </div>
//                   <div>
//                     <div className="text-xs text-gray-500 mb-1">
//                       {comment.author} • {new Date(comment.createdAt).toLocaleString()}
//                     </div>
//                     <div className="bg-gray-100 rounded px-3 py-2 text-sm">
//                       <p>{comment.text}</p>
//                       {comment.fileUrl && (
//                         <div className="mt-2">
//                           <a
//                             href={comment.fileUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 underline"
//                           >
//                             File Attachment
//                           </a>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </>
//       )}
      
//     </div>
//   );
// }


// Debugging version (with llocked)
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTasksByProject,
  addTask,
  updateTask,
  deleteTask,
  uploadTaskFile
} from "../API/TaskAPI";
import { MentionsInput, Mention } from "react-mentions";
import { useNotifications } from "../notifications/NotificationsContext";
import {
  CheckCircleIcon, ExclamationCircleIcon, MinusCircleIcon, InformationCircleIcon,
  DocumentTextIcon, ClipboardDocumentIcon, ClockIcon, EllipsisHorizontalCircleIcon,
  FaceSmileIcon, AtSymbolIcon, PaperClipIcon, ChatBubbleOvalLeftEllipsisIcon
} from '@heroicons/react/24/solid';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import axios from "axios";
import { getCommentsByTaskId, addComment } from "../API/CommentsAPI";

const priorityOptions = ["High", "Medium", "Low"];
const statusOptions = ["To-Do", "In Progress", "Done"];
const dueStatusOptions = ["On track", "Overdue", "Done on time", "Done overdue"];
const usersList = [
  { id: "admin", display: "admin" },
  { id: "manager", display: "manager" },
  { id: "student", display: "student" },
];

export default function TaskManagement({ user }) {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  // Role helpers
  const isAdmin = user?.role?.toLowerCase() === "admin";
  const isManager = user?.role?.toLowerCase() === "manager";
  const isContributor = user?.role?.toLowerCase() === "contributor";
  const canEdit = isAdmin || isManager;

  const [tasks, setTasks] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [addingNew, setAddingNew] = useState(false);
  const [projectMembers, setProjectMembers] = useState([]);
  const [projectStatus, setProjectStatus] = useState("Active");
  const [lockedUsernames, setLockedUsernames] = useState([]);


  // Extra
  const tableBodyRef = useRef(null); // Add this ref
  const commentsEndRef = useRef(null);

  // --- Bulk selection logic
  const [selectedTasks, setSelectedTasks] = useState([]);
  const selectedAllTasks = selectedTasks.length === tasks.length;

  // --- File Modal logic
  const [showFileModal, setShowFileModal] = useState(false);
  const [modalFile, setModalFile] = useState("");
  const [modalFileObj, setModalFileObj] = useState(null);
  const [fileType, setFileType] = useState(""); // "attachment" or "submission"
  const [modalIdx, setModalIdx] = useState(null);

  // --- File native input logic
  const [attachmentFileObj, setAttachmentFileObj] = useState(null);

  // --- Comments
  //const [comments, setComments] = useState({});
  const [comments, setComments] = useState([]);
  const [mentionInputs, setMentionInputs] = useState({});
  const [showEmojiPickers, setShowEmojiPickers] = useState({});
  const [commentFiles, setCommentFiles] = useState({});
  const [showCommentsPanel, setShowCommentsPanel] = useState(false);
  const [currentCommentTaskIdx, setCurrentCommentTaskIdx] = useState(null);

  // --- Load tasks from backend ---
  useEffect(() => {
    if (!projectId) return;
    getTasksByProject(projectId)
      .then((res) => setTasks(res.data))
      .catch((err) => alert("Failed to load tasks: " + (err?.response?.data || err)));
  }, [projectId]);

  useEffect(() => {
  if (!projectId) return;
    // Fetch project details to get members
    axios.get(`http://localhost:5047/api/projects/${projectId}`)
      .then(res => {
        setProjectStatus(res.data.status || "Active");
        setProjectMembers(res.data.members || []);
      });
  }, [projectId]);

  // Add this useEffect to fetch locked users
  useEffect(() => {
    if (!projectId) return;
    axios.get("http://localhost:5047/api/User")
      .then(res => {
        const locked = res.data.filter(u => u.status === "Locked").map(u => u.username);
        setLockedUsernames(locked);
      });
  }, [projectId]);

  const locked = projectStatus === "Archived";

  //Comment
  useEffect(() => {
    if (showCommentsPanel && currentCommentTaskIdx !== null) {
      const taskId = tasks[currentCommentTaskIdx]?.id;
      if (taskId) {
        getCommentsByTaskId(taskId)
          .then(res => setComments(res.data))
          .catch(() => setComments([]));
      }
    }
  }, [showCommentsPanel, currentCommentTaskIdx, tasks]);

  useEffect(() => {
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  // Restrict ticking while editing
  const handleSelectTask = (idx) => {
    if (editIdx !== null || addingNew) {
      window.alert("Please click SAVE or CANCEL before selecting other tasks.");
      return;
    }
    setSelectedTasks((prev) => prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]);
  };

  const handleSelectAllTasks = () => {
    if (editIdx !== null || addingNew) {
      window.alert("Please click SAVE or CANCEL before selecting other tasks.");
      return;
    }
    setSelectedTasks(selectedAllTasks ? [] : tasks.map((_, i) => i));
  };

  // Bulk Action Handlers
  const handleBulkEdit = () => {
    if (!canEdit || selectedTasks.length !== 1) return;
    handleEdit(selectedTasks[0]);
  };
  // const handleBulkMarkDone = () => {
  //   if (!canEdit) return;
  //   selectedTasks.forEach(idx => {
  //     const task = tasks[idx];
  //     if (task.status !== "Done") {
  //       updateTask(task.id, { ...task, status: "Done" })
  //         .then((res) => setTasks(prev => prev.map((t, i) => i === idx ? res.data : t)));
  //     }
  //   });
  //   setSelectedTasks([]);
  // };

  const handleBulkMarkDone = () => {
    if (!canEdit) return;

    const notDoneTasks = selectedTasks.filter(idx => tasks[idx].status !== "Done");
    if (notDoneTasks.length === 0) {
      alert("All selected tasks are already marked as Done.");
      return;
    }

    // Create a formatted list of task names
    const taskNames = notDoneTasks.map(idx => 
      `• ${tasks[idx].title || `Task ${idx + 1}`}`
    ).join('\n');

    if (!window.confirm(`Are you sure you want to mark ${notDoneTasks.length} task(s) as Done?\n\nTask(s):\n${taskNames}`)) {
      return;
    }

    notDoneTasks.forEach(idx => {
      const task = tasks[idx];
      // Build a full payload with all required fields
      const payload = {
        ...task,
        status: "Done",
        projectId: task.projectId, // ensure this is present
        title: task.title,
        description: task.description,
        members: task.members,
        startDate: task.startDate,
        dueDate: task.dueDate,
        dueStatus: task.dueStatus,
        priority: task.priority,
        file: task.file || "",
        fileUrl: task.fileUrl || "",
        submissionFileName: task.submissionFileName || "",
        submissionFileUrl: task.submissionFileUrl || "",
      };
      updateTask(task.id, payload)
        .then((res) => setTasks(prev => prev.map((t, i) => i === idx ? res.data : t)))
        .catch(err => alert("Failed to mark as done: " + (err?.response?.data || err)));
    });

    setSelectedTasks([]);
  };

  const handleBulkDelete = () => {
    if (!canEdit || selectedTasks.length !== 1) return;
    handleDelete(selectedTasks[0]);
    setSelectedTasks([]);
  };
  const handleBulkSave = () => {
    if (!canEdit || selectedTasks.length !== 1) return;
    handleSave(selectedTasks[0]);
    setSelectedTasks([]);
  };

  // --- Form logic
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prev) => ({ ...prev, [name]: value }));
  };
  const handleEditMembers = (e) => {
    setEditTask((prev) => ({
      ...prev,
      members: e.target.value.split(",").map((m) => m.trim()).filter(Boolean),
    }));
  };

  // --- File Modal logic ---
  const openFileModal = (idx, type) => {
    setShowFileModal(true);
    setModalIdx(idx);
    setFileType(type);
    const task = idx === "addingNew" ? editTask : tasks[idx];
    if (type === "attachment") {
      setModalFile(task?.file || "");
    } else {
      setModalFile(task?.submissionFileName || "");
    }
    setModalFileObj(null);
  };
  const closeFileModal = () => {
    setShowFileModal(false);
    setModalFile("");
    setModalFileObj(null);
    setModalIdx(null);
    setFileType("");
  };

  const handleModalFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setModalFile(e.target.files[0].name);
      setModalFileObj(e.target.files[0]);
    }
  };

  const handleModalUpload = async () => {
    if (!modalFileObj) {
      closeFileModal();
      return;
    }
    try {
      const res = await uploadTaskFile(modalFileObj);
      const fileName = modalFile;
      const fileUrl = res.data.url;

      if (modalIdx === "addingNew") {
        setEditTask((prev) => ({
          ...prev,
          ...(fileType === "attachment"
            ? { file: fileName, fileUrl }
            : { submissionFileName: fileName, submissionFileUrl: fileUrl }),
        }));
      } else {
        setTasks((prev) =>
          prev.map((task, i) =>
            i === modalIdx
              ? {
                  ...task,
                  ...(fileType === "attachment"
                    ? { file: fileName, fileUrl }
                    : { submissionFileName: fileName, submissionFileUrl: fileUrl }),
                }
              : task
          )
        );
        if (editIdx === modalIdx) {
          setEditTask((prev) => ({
            ...prev,
            ...(fileType === "attachment"
              ? { file: fileName, fileUrl }
              : { submissionFileName: fileName, submissionFileUrl: fileUrl }),
          }));
        }
      }
      closeFileModal();
    } catch (err) {
      alert("File upload failed: " + (err?.response?.data || err));
    }
  };

  // File native input for attachment (used in table row)
  const handleAttachmentFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachmentFileObj(e.target.files[0]);
      setEditTask((prev) => ({
        ...prev,
        file: e.target.files[0].name,
      }));
    }
  };
  const handleAttachmentUpload = async () => {
    if (!attachmentFileObj) return;
    try {
      const res = await uploadTaskFile(attachmentFileObj);
      setEditTask((prev) => ({
        ...prev,
        fileUrl: res.data.url,
      }));
      setAttachmentFileObj(null);
    } catch (err) {
      alert("File upload failed: " + (err?.response?.data || err));
    }
  };

  // CRUD
  const handleAddNew = () => {
    if (!canEdit) return;
    setAddingNew(true);
    setEditTask({
      title: "",
      description: "",
      members: [],
      startDate: "",
      dueDate: "",
      dueStatus: "On track",
      priority: priorityOptions[0],
      status: statusOptions[0],
      file: "",
      fileUrl: "",
      submissionFileName: "",
      submissionFileUrl: "",
    });
    setEditIdx(null);
    setSelectedTasks([]);

    // Scroll to bottom after state updates
    setTimeout(() => {
      if (tableBodyRef.current) {
        tableBodyRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'end' 
        });
      }
    }, 0);
  };

  const handleEdit = (idx) => {
    if (!canEdit) return;
    setEditIdx(idx);
    setEditTask({ ...tasks[idx] });
    setAddingNew(false);
    setSelectedTasks([idx]);
  };

  const handleSave = (idx) => {
    if (!canEdit) return;
    if (!editTask.title?.trim()) return alert("Task Title is required");
    if (!editTask.startDate) return alert("Start Date is required");
    if (!editTask.dueDate) return alert("Due Date is required");

    const payload = {
      ...editTask,
      projectId: parseInt(projectId),
      members: Array.isArray(editTask.members) ? editTask.members : [],
      file: editTask.file || "",
      fileUrl: editTask.fileUrl || "",
      submissionFileName: editTask.submissionFileName || "",
      submissionFileUrl: editTask.submissionFileUrl || "",
    };

    if (addingNew) {
      addTask(payload)
        .then((res) => setTasks([...tasks, res.data]))
        .catch((err) => alert("Failed to add task: " + (err?.response?.data || err)));
      setAddingNew(false);
    } else {
      const taskId = tasks[editIdx].id;
      updateTask(taskId, payload)
        .then((res) => {
          setTasks(tasks.map((t, i) => (i === editIdx ? res.data : t)));
        })
        .catch((err) => alert("Failed to update task: " + (err?.response?.data || err)));
    }
    setEditIdx(null);
    setEditTask(null);
    setAttachmentFileObj(null);
    setSelectedTasks([]);
  };

  const handleCancel = () => {
    setEditIdx(null);
    setEditTask(null);
    setAddingNew(false);
    setAttachmentFileObj(null);
    setSelectedTasks([]);
  };

  // const handleDelete = (idx) => {
  //   if (!canEdit) return;
  //   const task = tasks[idx];
  //   const taskName = task.title || `Task ${idx + 1}`;
  //   const confirmDelete = window.confirm(`Are you sure you want to delete these tasks?\nTasks: ${taskName}`);

  //   if (!confirmDelete) return;
  //   const taskId = task.id;
  //   deleteTask(taskId)
  //     .then(() => setTasks(tasks.filter((_, i) => i !== idx)))
  //     .catch((err) => alert("Failed to delete task: " + (err?.response?.data || err)));
  //   setEditIdx(null);
  //   setAddingNew(false);
  //   setSelectedTasks([]); 
  // };

  // 1. Update the handleDelete function to handle multiple tasks
const handleDelete = () => {
  if (!canEdit || selectedTasks.length === 0) return;
  
  const taskNames = selectedTasks.map(idx => `• ${tasks[idx].title || `Task ${idx + 1}`}`).join('\n');
  const confirmDelete = window.confirm(
    `Are you sure you want to delete ${selectedTasks.length} task(s)?\n\nTask(s):\n${taskNames}`
  );

  if (!confirmDelete) return;

  // Delete all selected tasks
    Promise.all(
      selectedTasks.map(idx => {
        const taskId = tasks[idx].id;
        return deleteTask(taskId)
          .then(() => idx) // Return the index if successful
          .catch(err => {
            alert(`Failed to delete task: ${tasks[idx].title || `Task ${idx + 1}`}`);
            return null;
          });
      })
    ).then(results => {
      // Filter out nulls (failed deletions) and remove deleted tasks
      const deletedIndices = results.filter(idx => idx !== null);
      setTasks(prev => prev.filter((_, i) => !deletedIndices.includes(i)));
      setEditIdx(null);
      setAddingNew(false);
      setSelectedTasks([]);
    });
  };

  // Comments
  // Comments: per-task state
  const handleAddComment = async (taskIdx) => {
    const taskId = tasks[taskIdx]?.id;
    if (!mentionInputs[taskId] && !commentFiles[taskId]) return;

    // Find mentioned users for notification
    const mentionsRegex = /@\[[^\]]+\]\(([^)]+)\)/g;
    let mentionedUsers = [];
    let match;
    while ((match = mentionsRegex.exec(mentionInputs[taskId] || "")) !== null) {
      mentionedUsers.push(match[1]);
    }
      console.log("Mentioned users:", mentionedUsers);
  // // File upload logic (per task)
  //     let fileUrl = "";
  //     const fileToUpload = commentFiles[taskId];
  //     if (fileToUpload) {
  //       const formData = new FormData();
  //       formData.append("file", fileToUpload);
  //       try {
  //           const res = await axios.post(
  //             "http://localhost:5047/api/comments/upload",
  //             formData // Do NOT set headers here!
  //         );
  //         fileUrl = res.data.url;
  //       } catch (e) {
  //         alert("Failed to upload comment file: " + (e?.response?.data || e));
  //         return; // Don’t add comment if file upload fails
  //       }
  //     }

    // Prepare comment data
    const task = tasks[taskIdx];
    addComment({
      taskId: task.id,
      author: user.username,
      text: mentionInputs[taskId], // includes emoji and mentions
      fileUrl: "", // TODO: handle commentFile upload if needed
    }).then(res => {
      const commentId = res.data.id; 
      setComments(prev => [...prev, res.data]);
      mentionedUsers.forEach((username) => {
        console.log("Sending notification to:", username);
        addNotification({
          // id: Date.now() + Math.random(),
          // user: username,
          // message: `You were mentioned in task ${task.title}: "${mentionInputs[taskId]}"`,
          // time: new Date().toLocaleString(),
          user: username,
          message: `You were mentioned in task "${task.title}": "${mentionInputs[taskId]}"`,
          link: `/projects/${projectId}/tasks/${task.id}?commentId=${commentId}`,
        });
      });
      setMentionInputs((prev) => ({ ...prev, [taskId]: "" }));
      setCommentFiles((prev) => ({ ...prev, [taskId]: null }));
      setShowEmojiPickers((prev) => ({ ...prev, [taskId]: false }));
    });
  };

  const openCommentsPanel = (idx) => {
    setCurrentCommentTaskIdx(idx);
    setShowCommentsPanel(true);
  };
  const closeCommentsPanel = () => {
    setShowCommentsPanel(false);
    setCurrentCommentTaskIdx(null);
  };
  // // Comments: per-task state
  //   const handleAddComment = async (taskIdx) => {
  //     const taskId = tasks[taskIdx]?.id;
  //     if (!mentionInputs[taskId] && !commentFiles[taskId]) return;

  //     // Find mentioned users for notification
  //     const mentionsRegex = /@\[[^\]]+\]\(([^)]+)\)/g;
  //     let mentionedUsers = [];
  //     let match;
  //     while ((match = mentionsRegex.exec(mentionInputs[taskId] || "")) !== null) {
  //       mentionedUsers.push(match[1]);
  //     }
  //       console.log("Mentioned users:", mentionedUsers);
  // // // File upload logic (per task)
  // //     let fileUrl = "";
  // //     const fileToUpload = commentFiles[taskId];
  // //     if (fileToUpload) {
  // //       const formData = new FormData();
  // //       formData.append("file", fileToUpload);
  // //       try {
  // //           const res = await axios.post(
  // //             "http://localhost:5047/api/comments/upload",
  // //             formData // Do NOT set headers here!
  // //         );
  // //         fileUrl = res.data.url;
  // //       } catch (e) {
  // //         alert("Failed to upload comment file: " + (e?.response?.data || e));
  // //         return; // Don’t add comment if file upload fails
  // //       }
  // //     }

  //     // Prepare comment data
  //     const task = tasks[taskIdx];
  //     addComment({
  //       taskId: task.id,
  //       author: user.username,
  //       text: mentionInputs[taskId], // includes emoji and mentions
  //       fileUrl: "", // TODO: handle commentFile upload if needed
  //     }).then(res => {
  //       setComments(prev => [...prev, res.data]);
  //       mentionedUsers.forEach((username) => {
  //         console.log("Sending notification to:", username);
  //         addNotification({
  //           id: Date.now() + Math.random(),
  //           user: username,
  //           message: `You were mentioned in task ${task.title}: "${mentionInputs[taskId]}"`,
  //           time: new Date().toLocaleString(),
  //         });
  //       });
  //       setMentionInputs((prev) => ({ ...prev, [taskId]: "" }));
  //       setCommentFiles((prev) => ({ ...prev, [taskId]: null }));
  //       setShowEmojiPickers((prev) => ({ ...prev, [taskId]: false }));
  //     });
  //   };

  //   const openCommentsPanel = (idx) => {
  //     setCurrentCommentTaskIdx(idx);
  //     setShowCommentsPanel(true);
  //   };
  //   const closeCommentsPanel = () => {
  //     setShowCommentsPanel(false);
  //     setCurrentCommentTaskIdx(null);
  //   };

  // const handleAddComment = (taskIdx) => {
  //     if (!mentionInputs && !commentFiles) return;

  //     // Find mentioned users for notification
  //     const mentionsRegex = /@\[[^\]]+\]\(([^)]+)\)/g;
  //     let mentionedUsers = [];
  //     let match;
  //     while ((match = mentionsRegex.exec(mentionInputs)) !== null) {
  //       mentionedUsers.push(match[1]);
  //     }

  //     // Prepare comment data
  //     const task = tasks[taskIdx];
  //     addComment({
  //       taskId: task.id,
  //       author: user.username,
  //       text: mentionInputs, // includes emoji and mentions
  //       fileUrl: "",        // TODO: handle commentFile upload if needed
  //     }).then(res => {
  //       // Push new comment into comments array
  //       setComments(prev => [...prev, res.data]);

  //       // Send notification for each mentioned user
  //       mentionedUsers.forEach((username) => {
  //         addNotification({
  //           id: Date.now() + Math.random(),
  //           user: username,
  //           message: `You were mentioned in task ${task.title}: "${mentionInputs}"`,
  //           time: new Date().toLocaleString(),
  //         });
  //       });

  //       setMentionInputs("");
  //       setCommentFiles(null);
  //     });
  //   };

  // // const handleAddComment = (taskIdx) => {
  // //    if (!mentionInput && !commentFile) return;
     
  // //   // const mentionsRegex = /@(\w+)/g;
  // //   // const mentionedUsers = [];
  // //   // let match;
  // //   // while ((match = mentionsRegex.exec(mentionInput)) !== null) {
  // //   //   mentionedUsers.push(match[1]);
  // //   // }
  // //   const mentionsRegex = /@\[[^\]]+\]\(([^)]+)\)/g;
  // //   let mentionedUsers = [];
  // //   let match;
  // //   while ((match = mentionsRegex.exec(mentionInput)) !== null) {
  // //     mentionedUsers.push(match[1]);
  // //   }
  // //   console.log("mentionInput:", mentionInput);
  // //   console.log("mentionedUsers:", mentionedUsers);
  // //   setComments((prev) => ({
  // //     ...prev,
  // //     [taskIdx]: [
  // //       ...(prev[taskIdx] || []),
  // //       { text: mentionInput, file: commentFile },
  // //     ],
  // //   }));
  // //   console.log("mentionInput:", mentionInput);
  // //   console.log("mentionedUsers:", mentionedUsers);
  // //   mentionedUsers.forEach((user) => {
  // //     addNotification({
  // //       id: Date.now() + Math.random(),
  // //       user,
  // //       message: `You were mentioned in task ${tasks[taskIdx]?.title}: "${mentionInput}"`,
  // //       time: new Date().toLocaleString(),
  // //     });
  // //   });
  // //   setMentionInput("");
  // //   setCommentFile(null);
  // // };


  // const openCommentsPanel = (idx) => {
  //   setCurrentCommentTaskIdx(idx);
  //   setShowCommentsPanel(true);
  // };
  // const closeCommentsPanel = () => {
  //   setShowCommentsPanel(false);
  //   setCurrentCommentTaskIdx(null);
  // };

  // Renderers
  const renderDueStatusBadge = (task) => {
    // Handle new task case
    if (!task || (!task.dueDate && !task.startDate)) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <InformationCircleIcon className="h-4 w-4" />
          On track
        </span>
      );
    }

    const today = new Date().toISOString().split("T")[0];
    let content, color, Icon;
    const dueDate = (typeof task.dueDate === "string" ? task.dueDate.substring(0,10) : task.dueDate);
    if (task.status !== "Done") {
      if (today <= dueDate) {
        content = "On track"; color = "bg-blue-100 text-blue-800"; Icon = InformationCircleIcon;
      } else {
        content = "Overdue"; color = "bg-red-100 text-red-800"; Icon = ExclamationCircleIcon;
      }
    } else {
      if ((task.completedDate || today) <= dueDate) {
        content = "Done on time"; color = "bg-green-100 text-green-800"; Icon = CheckCircleIcon;
      } else {
        content = "Done overdue"; color = "bg-red-100 text-red-800"; Icon = MinusCircleIcon;
      }
    }
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        <Icon className="h-4 w-4" />{content}
      </span>
    );
  };
  const renderPriorityBadge = (priority) => {
    let colorClasses = "";
    switch (priority) {
      case "High": colorClasses = "bg-red-700 text-white"; break;
      case "Medium": colorClasses = "bg-orange-500 text-white"; break;
      case "Low": colorClasses = "bg-blue-400 text-white"; break;
      default: colorClasses = "bg-gray-200 text-gray-800";
    }
    return (
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-normal ${colorClasses}`}>{priority}</span>
    );
  };
  // const renderStatusBadge = (status) => {
  //   let bgColor, textColor, Icon;
  //   if (status === "To-Do") {
  //     bgColor = "bg-gray-200"; textColor = "text-gray-800"; Icon = EllipsisHorizontalCircleIcon;
  //   } else if (status === "In Progress") {
  //     bgColor = "bg-yellow-100"; textColor = "text-yellow-800"; Icon = ClockIcon;
  //   } else {
  //     bgColor = "bg-green-100"; textColor = "text-green-800"; Icon = CheckCircleIcon;
  //   }
  //   return (
  //     <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
  //       <Icon className="h-4 w-4" />{status}
  //     </span>
  //   );
  // };

  const renderStatusBadge = (status) => {
    console.log('Rendering status badge for:', status); // Debug log
    let bgColor, textColor, Icon;
    if (status === "To-Do") {
      bgColor = "bg-gray-200"; 
      textColor = "text-gray-800"; 
      Icon = EllipsisHorizontalCircleIcon;
    } else if (status === "In Progress") {
      bgColor = "bg-yellow-100"; 
      textColor = "text-yellow-800"; 
      Icon = ClockIcon;
    } else if (status === "Done") {
      bgColor = "bg-green-100"; 
      textColor = "text-green-800"; 
      Icon = CheckCircleIcon;
    } else {
      // Default case if status is unexpected
      bgColor = "bg-gray-200";
      textColor = "text-gray-800";
      Icon = InformationCircleIcon;
    }
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        <Icon className="h-4 w-4" />{status}
      </span>
    );
  };
  //--Get project name
  const [projectName, setProjectName] = useState("Loading...");
  useEffect(() => {
    if (!projectId) return;
    axios.get(`http://localhost:5047/api/projects/${projectId}`)
      .then(res => {
        console.log("Project fetch result:", res.data);
        setProjectName(res.data.title || "Project");
      })
      .catch(err => {
        console.log("Project fetch error:", err);
        setProjectName("Project");
      });
  }, [projectId]);

  // user list
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5047/api/User")
      .then(res => {
        setUsersList(
          res.data.map(user => ({
            id: user.username,
            display: user.username
          }))
        );
      });
  }, []);
  // --- UI Render ---
  return (
    // <div className="p-8 min-h-screen bg-[#f6f8fa]">
    <div className="p-8 flex flex-col h-[calc(100vh-4rem)]">
      <div>
        {/* Breadcrumb */}
        <div className="flex items-center mb-6">
          <span
            className="mr-4 hover:text-mycustomblue cursor-pointer text-3xl font-bold"
            onClick={() => navigate('/projects')}
          >
            {isAdmin
              ? "All Projects"
              : isManager
                ? "My Projects"
                : isContributor
                  ? "My Projects"
                  : "Project Management"}
          </span>
          <ChevronRightIcon className="h-5 w-5 text-gray-500" />
              <span className="ml-2 text-3xl font-bold text-gray-800">
                {projectName}
            </span>
        </div>

        {canEdit && (
          <button
            // className="mb-8 bg-mycustomblue text-white font-medium px-4 py-2 rounded"
            className={`mb-8 bg-mycustomblue text-white font-medium px-4 py-2 rounded ${
              locked || addingNew || editIdx !== null || (isContributor && locked) ? 'cursor-not-allowed' : ''
            }`}
            onClick={handleAddNew}
            // disabled={locked || addingNew || editIdx !== null || !canEdit}
            disabled={locked || addingNew || editIdx !== null || (isContributor && locked)}
          >
            Create New Task
          </button>
        )}
      </div>
      {/* ACTION BAR */}
      {/* {selectedTasks.length > 0 && (
        <div className="bg-white border rounded mb-2 px-4 py-2 flex items-center justify-between shadow-sm">
          <span className="text-xs text-gray-800">
            SELECTED: {selectedTasks.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleBulkEdit}
              className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
              disabled={!canEdit || selectedTasks.length !== 1 || editIdx !== null || addingNew}
            >
              EDIT
            </button>
            <button
              onClick={handleBulkMarkDone}
              className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
              disabled={!canEdit}
            >
              MARK AS DONE
            </button>
            <button
              onClick={handleBulkDelete}
              className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
              disabled={!canEdit || selectedTasks.length !== 1}
            >
              DELETE
            </button>
            {editIdx !== null && selectedTasks.length === 1 && selectedTasks[0] === editIdx && (
              <button
                onClick={handleBulkSave}
                className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
              >
                SAVE
              </button>
            )}
            <button
              onClick={handleCancel}
              className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
            >
              CANCEL
            </button>
          </div>
        </div>
      )} */}

    {/* {(selectedTasks.length > 0 || addingNew) && (
      <div className="bg-white border rounded mb-2 px-4 py-2 flex items-center justify-between shadow-sm">
        <span className="text-xs text-gray-800">
          {addingNew ? "ADDING NEW TASK" : `SELECTED: ${selectedTasks.length}`}
        </span>
        <div className="flex gap-3">
          {addingNew ? (
            <>
              <button
                onClick={handleBulkSave}
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
            <> */}
              {/* Show EDIT when only one is selected, and not in edit mode or adding new */}
              {/* {selectedTasks.length === 1 && editIdx === null && !addingNew && (
                <button
                  onClick={() => handleBulkEdit(selectedTasks[0])}
                  className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
                >
                  EDIT
                </button>
              )} */}
              {/* Show SAVE when one is selected and in edit mode */}
              {/* {editIdx !== null && selectedTasks.length === 1 && selectedTasks[0] === editIdx && (
                <button
                  onClick={handleBulkSave}
                  className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
                >
                  SAVE
                </button>
              )} */}
              {/* Always allow mark as done and delete if editable */}
              {/* <button
                onClick={handleBulkMarkDone}
                className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
                disabled={!canEdit}
              >
                MARK AS DONE
              </button>
              <button
                onClick={handleBulkDelete}
                className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
                disabled={!canEdit}
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
    )} */}

      {(selectedTasks.length > 0 || addingNew) && (
        <div className="bg-white border rounded mb-2 px-4 py-2 flex items-center justify-between shadow-sm">
          <span className="text-xs text-gray-800">
            {addingNew ? "ADDING NEW TASK" : `SELECTED: ${selectedTasks.length}`}
          </span>
          <div className="flex gap-3">
            {addingNew ? (
              <>
                <button
                  onClick={handleSave}
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
            ) : editIdx !== null ? (
              <>
                <button
                  onClick={handleSave}
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
                {selectedTasks.length === 1 && (
                  <button
                    onClick={() => handleBulkEdit(selectedTasks[0])}
                    className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
                    disabled={!canEdit}
                  >
                    EDIT
                  </button>
                )}
                <button
                  onClick={handleBulkMarkDone}
                  className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
                  disabled={!canEdit || selectedTasks.length === 0}
                >
                  MARK AS DONE
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
                  disabled={!canEdit || selectedTasks.length === 0}
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

      <div className="flex-1 overflow-hidden">
        <div className="overflow-x-auto w-full h-full">
          <table className="min-w-[1400px] bg-white border whitespace-nowrap">
            <thead>
              <tr>
                <th className="sticky top-0 left-0 bg-white z-20 w-12 border px-4 py-2 text-left text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={selectedAllTasks}
                    onChange={handleSelectAllTasks}
                    disabled={locked || !canEdit || editIdx !== null || addingNew}
                  />
                </th>
                <th className="sticky top-0 left-12 bg-white z-20 w-12 border px-4 py-2 text-left text-sm font-semibold">ID</th>
                <th className="sticky top-0 left-24 bg-white z-20 border px-4 py-2 text-left text-sm font-semibold">Task Title</th>
                <th className="sticky top-0 bg-white z-10 border px-4 py-2 text-left text-sm font-semibold">Description</th>
                <th className="sticky top-0 bg-white z-10 border px-4 py-2 text-left text-sm font-semibold">Status</th>
                <th className="sticky top-0 bg-white z-10 border px-4 py-2 text-left text-sm font-semibold">Priority</th>
                <th className="sticky top-0 bg-white z-10 border px-4 py-2 text-left text-sm font-semibold">Assigned Members</th>
                <th className="sticky top-0 bg-white z-10 border px-4 py-2 text-left text-sm font-semibold">Timeline</th>
                <th className="sticky top-0 bg-white z-10 border px-4 py-2 text-left text-sm font-semibold">Due Status</th>
                <th className="sticky top-0 bg-white z-10 border px-4 py-2 text-left text-sm font-semibold">File Attachment</th>
                <th className="sticky top-0 bg-white z-10 border px-4 py-2 text-left text-sm font-semibold">File Submission</th>
                <th className="sticky top-0 bg-white z-10 border px-4 py-2 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody ref={tableBodyRef} className="divide-y divide-gray-200">
              {tasks.map((task, idx) => (
                // <tr key={task.id || idx} className={selectedTasks.includes(idx) ? "bg-green-50" : ""}>
                <tr
                  key={task.id || idx}
                  className={
                    selectedTasks.includes(idx)
                      ? "bg-green-50"
                      : locked
                        ? "bg-gray-100"
                        : ""
                  }
                >  
                  <td className={`sticky left-0 ${selectedTasks.includes(idx) ? "bg-green-50" : locked ? "bg-gray-100" : "bg-white"} z-10 w-12 border px-4 py-2 text-sm font-normal`}>
                    <input
                      type="checkbox"
                      checked={selectedTasks.includes(idx)}
                      // onChange={() => handleSelectTask(idx)}
                      onChange={() => {
                        if (!isContributor || !locked) {
                          handleSelectTask(idx);
                        }
                      }}
                      disabled={locked || !canEdit || editIdx !== null || addingNew || (isContributor && locked)}
                      className={isContributor && locked ? 'cursor-not-allowed' : ''}
                    />
                  </td>
                  <td className={`sticky left-12 ${selectedTasks.includes(idx) ? "bg-green-50" : locked ? "bg-gray-100" : "bg-white"} z-10 w-12 border px-4 py-2 text-sm font-normal`}>{idx + 1}</td>
                  <td className={`sticky left-24 ${selectedTasks.includes(idx) ? "bg-green-50" : locked ? "bg-gray-100" : "bg-white"} z-10 border px-4 py-2 text-sm font-normal`}>
                    <div className="flex items-center gap-2">
                      <ClipboardDocumentIcon className="h-5 w-5 text-blue-500" />
                      {(canEdit && editIdx === idx) ? (
                        <input
                          name="title"
                          value={editTask.title}
                          onChange={handleFormChange}
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : task.title}
                    </div>
                  </td>
                  <td className="border px-4 py-2 text-sm font-normal">
                    {(canEdit && editIdx === idx) ? (
                      <input
                        name="description"
                        value={editTask.description}
                        onChange={handleFormChange}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      <Tippy content={
                        <span style={{ wordBreak: "break-word", whiteSpace: "normal", display: "block", maxWidth: "300px" }}>
                          {task.description}
                        </span>} 
                        theme="light" placement="top" maxWidth="300px" className="p-2">
                        <span className="block max-w-xs truncate cursor-pointer">
                          {task.description}
                        </span>
                      </Tippy>
                    )}
                  </td>
                  <td className="border px-4 py-2 text-sm font-normal">
                    {(canEdit && editIdx === idx) ? (
                      <select
                        name="status"
                        value={editTask.status}
                        onChange={handleFormChange}
                        className="border px-2 py-1 rounded w-full"
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    ) : (
                      renderStatusBadge(task.status)
                    )}
                  </td>
                  <td className="border px-4 py-2 text-sm font-normal">
                    {(canEdit && editIdx === idx) ? (
                      <select
                        name="priority"
                        value={editTask.priority}
                        onChange={handleFormChange}
                        className="border px-2 py-1 rounded w-full"
                      >
                        {priorityOptions.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    ) : (
                      renderPriorityBadge(task.priority)
                    )}
                  </td>
                  {/* <td className="border px-4 py-2 text-sm font-normal">
                    {(canEdit && editIdx === idx) ? (
                      <input
                        name="members"
                        value={editTask.members?.join(", ") || ""}
                        onChange={handleEditMembers}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      <ul className="list-disc pl-4">
                        {(task.members || []).map((m) => (
                          <li key={m}>{m}</li>
                        ))}
                      </ul>
                    )}
                  </td> */}
                  {/* <td className="border px-4 py-2 text-sm font-normal">
                    {(canEdit && editIdx === idx) ? (
                      <div className="flex flex-col gap-1">
                        {projectMembers.map((m) => (
                          <label key={m} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={editTask.members?.includes(m)}
                              onChange={e => {
                                setEditTask(prev => ({
                                  ...prev,
                                  members: e.target.checked
                                    ? [...(prev.members || []), m]
                                    : (prev.members || []).filter(x => x !== m)
                                }));
                              }}
                            />
                            <span>{m}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <ul className="list-disc pl-4">
                        {(task.members || []).map((m) => (
                          <li key={m}>{m}</li>
                        ))}
                      </ul>
                    )}
                  </td> */}
                  <td className="border px-4 py-2 text-sm font-normal">
                    {(canEdit && editIdx === idx) ? (
                      <div className="flex flex-col gap-1">
                        {projectMembers.map((m) => {
                          const isLocked = lockedUsernames.includes(m);
                          const isChecked = editTask.members?.includes(m);
                          return (
                            <label key={m} className={`flex items-center gap-2 ${isLocked ? 'opacity-70' : ''}`}>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={e => {
                                  if (!isLocked) {
                                    setEditTask(prev => ({
                                      ...prev,
                                      members: e.target.checked
                                        ? [...(prev.members || []), m]
                                        : (prev.members || []).filter(x => x !== m)
                                    }));
                                  }
                                }}
                                disabled={isLocked && !isChecked}
                                className={isLocked ? 'cursor-not-allowed' : ''}
                              />
                              <span className={isLocked ? "text-gray-400" : ""}>{m}</span>
                            </label>
                          );
                        })}
                      </div>
                    ) : (
                      <ul className="list-disc pl-4">
                        {(task.members || []).map((m) => {
                          const isLocked = lockedUsernames.includes(m);
                          return (
                            <li key={m} className={isLocked ? "text-gray-400" : ""}>
                              {m}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </td>
                  <td className="border px-4 py-2 text-sm font-normal">
                    {(canEdit && editIdx === idx) ? (
                      <div className="flex gap-2">
                        <input
                          type="date"
                          name="startDate"
                          value={editTask.startDate?.substring(0, 10) || ""}
                          onChange={handleFormChange}
                          className="border px-2 py-1 rounded"
                        />
                        <span>-</span>
                        <input
                          type="date"
                          name="dueDate"
                          value={editTask.dueDate?.substring(0, 10) || ""}
                          onChange={handleFormChange}
                          className="border px-2 py-1 rounded"
                        />
                      </div>
                    ) : (
                      `${String(task.startDate).substring(0, 10)} - ${String(task.dueDate).substring(0, 10)}`
                    )}
                  </td>
                  <td className="border px-4 py-2 text-sm font-normal">
                    {renderDueStatusBadge(task)}
                  </td>
                  {/* File Attachment (native file input like screenshot 4, and modal as fallback) */}
                  <td className="border px-4 py-2 text-sm font-normal text-center">
                    {(canEdit && editIdx === idx) ? (
                      <div className="flex flex-col items-center">
                        <input
                          type="file"
                          onChange={handleAttachmentFileChange}
                          className="mb-1"
                          accept="*"
                        />
                        {editTask.file && (
                          <div className="text-xs text-gray-800 mb-1">
                            Current file: <span className="font-semibold">{editTask.file}</span>
                          </div>
                        )}
                        {attachmentFileObj && (
                          <button
                            className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                            onClick={handleAttachmentUpload}
                            type="button"
                          >
                            Upload
                          </button>
                        )}
                      </div>
                    ) : task.file && task.fileUrl ? (
                        <a
                          href={`http://localhost:5047${task.fileUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <DocumentTextIcon className="h-5 w-5 text-blue-500 inline-block" />
                          <span>{task.file}</span>
                        </a>
                      ) : (
                        <span className="text-gray-400 italic">No Attachment</span>
                      )}
                  </td>
                  {/* File Submission (View only) */}
                  <td className="border px-4 py-2 text-sm font-normal text-center">
                    {task.submissionFileName && task.submissionFileUrl ? (
                      <a
                        href={`http://localhost:5047${task.submissionFileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <DocumentTextIcon className="h-5 w-5 text-black-500 inline-block" />
                        <span>{task.submissionFileName}</span>
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">No Submission</span>
                    )}
                  </td>
                  {/* Actions */}
                  <td className="border px-4 py-2 text-xs font-medium">
                    {canEdit ? (
                      editIdx === idx ? (
                        <div className="flex gap-2">
                          <button
                            className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
                            onClick={() => handleSave(idx)}
                          >SAVE</button>
                          <button
                            className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
                            onClick={handleCancel}
                          >CANCEL</button>
                        </div>
                      ) : (
                        <div className="flex gap-2 text-xs font-medium">
                          <button
                            className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
                            onClick={() => openCommentsPanel(idx)}
                            // disabled={locked}
                          >
                            <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
                          </button>
                          {/* <button
                            className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
                            onClick={() => handleEdit(idx)}
                            disabled={editIdx !== null || addingNew}
                          >EDIT</button>
                          <button
                            className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
                            onClick={() => handleBulkMarkDone(idx)}
                          >MARK AS DONE</button>
                          <button
                            className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
                            onClick={() => handleDelete(idx)}
                          >DELETE</button>
                          <button
                            className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
                            onClick={handleCancel}
                          >CANCEL</button> */}
                        </div>
                      )
                    ) : (
                      // <span className="text-gray-500">View Only</span>
                      // Contributor: Only show comment button
                      <div className="flex gap-2 text-xs font-medium">
                        <button
                          className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
                          onClick={() => openCommentsPanel(idx)}
                        >
                          <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {(canEdit && addingNew) && (
                <tr className="bg-yellow-50">
                  <td className="bg-yellow-50 sticky left-0 bg-white z-10 w-12 border px-4 py-2 text-sm font-normal"></td>
                  <td className="bg-yellow-50 sticky left-12 bg-white z-10 w-12 border px-4 py-2 text-sm font-normal">{tasks.length + 1}</td>
                  <td className="bg-yellow-50 sticky left-24 bg-white z-10 border px-4 py-2 text-sm font-normal">
                    <div className="flex items-center gap-2">
                      <ClipboardDocumentIcon className="h-5 w-5 text-blue-500" />
                      <input
                        name="title"
                        value={editTask.title}
                        onChange={handleFormChange}
                        className="border px-2 py-1 rounded w-full"
                      />
                    </div>
                  </td>
                  <td className="border px-4 py-2 text-sm font-normal">
                    <input
                      name="description"
                      value={editTask.description}
                      onChange={handleFormChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="border px-4 py-2 text-sm font-normal">
                    <select
                      name="status"
                      value={editTask.status}
                      onChange={handleFormChange}
                      className="border px-2 py-1 rounded w-full"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="border px-4 py-2 text-sm font-normal">
                    <select
                      name="priority"
                      value={editTask.priority}
                      onChange={handleFormChange}
                      className="border px-2 py-1 rounded w-full"
                    >
                      {priorityOptions.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </td>
                  {/* <td className="border px-4 py-2 text-sm font-normal">
                    <input
                      name="members"
                      value={editTask.members?.join(", ") || ""}
                      onChange={handleEditMembers}
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td> */}
                  {/* <td className="border px-4 py-2 text-sm font-normal">
                    <div className="flex flex-col gap-1">
                      {projectMembers.map((m) => (
                        <label key={m} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={editTask.members?.includes(m)}
                            onChange={e => {
                              setEditTask(prev => ({
                                ...prev,
                                members: e.target.checked
                                  ? [...(prev.members || []), m]
                                  : (prev.members || []).filter(x => x !== m)
                              }));
                            }}
                          />
                          <span>{m}</span>
                        </label>
                      ))}
                    </div>
                  </td> */}
                  <td className="border px-4 py-2 text-sm font-normal">
                    <div className="flex flex-col gap-1">
                      {projectMembers.map((m) => {
                        const isLocked = lockedUsernames.includes(m);
                        const isChecked = editTask.members?.includes(m);
                        return (
                          <label key={m} className={`flex items-center gap-2 ${isLocked ? 'opacity-70' : ''}`}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={e => {
                                if (!isLocked) {
                                  setEditTask(prev => ({
                                    ...prev,
                                    members: e.target.checked
                                      ? [...(prev.members || []), m]
                                      : (prev.members || []).filter(x => x !== m)
                                  }));
                                }
                              }}
                              disabled={isLocked && !isChecked}
                              className={isLocked ? 'cursor-not-allowed' : ''}
                            />
                            <span className={isLocked ? "text-gray-400" : ""}>{m}</span>
                          </label>
                        );
                      })}
                    </div>
                  </td>
                  <td className="border px-4 py-2 text-sm font-normal">
                    <div className="flex gap-2">
                      <input
                        type="date"
                        name="startDate"
                        value={editTask.startDate}
                        onChange={handleFormChange}
                        className="border px-2 py-1 rounded"
                      />
                      <span>-</span>
                      <input
                        type="date"
                        name="dueDate"
                        value={editTask.dueDate}
                        onChange={handleFormChange}
                        className="border px-2 py-1 rounded"
                      />
                    </div>
                  </td>
                  <td className="border px-4 py-2 text-sm font-normal">{renderDueStatusBadge(editTask)}</td>
                  <td className="border px-4 py-2 text-sm font-normal text-center">
                    <div className="flex flex-col items-center">
                      <input
                        type="file"
                        onChange={handleAttachmentFileChange}
                        className="mb-1"
                      />
                      {editTask.file && (
                        <div className="text-xs text-gray-800 mb-1">
                          Current file: <span className="font-semibold">{editTask.file}</span>
                        </div>
                      )}
                      {attachmentFileObj && (
                        <button
                          className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                          onClick={handleAttachmentUpload}
                          type="button"
                        >
                          Upload
                        </button>
                      )}

                    </div>
                  </td>
                  <td className="border px-4 py-2 text-sm font-normal text-center">
                    <span className="text-gray-400">No Submission</span>
                  </td>
                  <td className="border px-4 py-2 text-xs font-medium">
                    <div className="flex gap-2">
                      <button
                        className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
                        onClick={() => handleSave(null)}
                      >SAVE</button>
                      <button
                        className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
                        onClick={handleCancel}
                      >CANCEL</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Side Comments Panel */}


      {/* {showCommentsPanel && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeCommentsPanel}></div>
          <div className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-lg z-50 overflow-y-auto">
            <div className="flex justify-between items-center border-b px-6 py-3">
              <h2 className="text-lg font-extrabold">{tasks[currentCommentTaskIdx]?.title}</h2>
              <button onClick={closeCommentsPanel} className="text-gray-600 text-2xl font-extrabold">×</button>
            </div>
            <div className="border-t p-6"> */}
              {/* Add Comment Section */}
              {/* <div className="mb-8 relative">
                <MentionsInput
                  value={mentionInputs[tasks[currentCommentTaskIdx]?.id] || ""}
                  onChange={(e) =>
                    setMentionInputs((prev) => ({
                      ...prev,
                      [tasks[currentCommentTaskIdx]?.id]: e.target.value,
                    }))
                  }
                  className="border rounded p-2 w-full min-h-[80px]"
                  placeholder="Add Comment..."
                  style={{
                    control: { padding: "8px", fontSize: 14 },
                    highlighter: { padding: "8px" },
                    input: { padding: "8px" }
                  }}
                >
                  <Mention trigger="@" data={usersList} className="bg-blue-200" />
                </MentionsInput>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-2"> */}
                    {/* Emoji Picker */}
                    {/* <button
                      type="button"
                      onClick={() =>
                        setShowEmojiPickers((prev) => ({
                          ...prev,
                          [tasks[currentCommentTaskIdx]?.id]: !prev[tasks[currentCommentTaskIdx]?.id],
                        }))
                      }
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <FaceSmileIcon className="h-5 w-5" />
                    </button> */}
                    {/* @ Button */}
                    {/* <button
                      type="button"
                      onClick={() =>
                        setMentionInputs((prev) => ({
                          ...prev,
                          [tasks[currentCommentTaskIdx]?.id]:
                            (prev[tasks[currentCommentTaskIdx]?.id] || "") + "@",
                        }))
                      }
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <AtSymbolIcon className="h-5 w-5" />
                    </button> */}
                    {/* File Attachment */}
                    {/* <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          setCommentFiles((prev) => ({
                            ...prev,
                            [tasks[currentCommentTaskIdx]?.id]: e.target.files[0],
                          }))
                        }
                      />
                      <PaperClipIcon className="h-5 w-5 text-gray-600 hover:text-gray-800" />
                    </label> */}
                  {/* </div>
                  <button
                    className="bg-blue-700 text-white px-4 py-1 rounded text-sm"
                    onClick={() => {
                      handleAddComment(currentCommentTaskIdx);
                      setShowEmojiPickers((prev) => ({
                        ...prev,
                        [tasks[currentCommentTaskIdx]?.id]: false
                      }));
                    }}
                  >
                    Send
                  </button>
                </div> */}
                {/* Show emoji picker for this task */}
                {/* {showEmojiPickers[tasks[currentCommentTaskIdx]?.id] && (
                  <div className="absolute z-50 mt-2">
                    <Picker
                      data={data}
                      onEmojiSelect={(emoji) =>
                        setMentionInputs((prev) => ({
                          ...prev,
                          [tasks[currentCommentTaskIdx]?.id]:
                            (prev[tasks[currentCommentTaskIdx]?.id] || "") + emoji.native,
                        }))
                      }
                      theme="light"
                    />
                  </div>
                )}
              </div> */}
              {/* Published comments */}
              {/* {comments.map((comment, ci) => (
                <div key={ci} className="flex items-start gap-2 mb-4">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
                      {comment.author[0].toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      {comment.author} • {new Date(comment.createdAt).toLocaleString()}
                    </div>
                    <div className="bg-gray-100 rounded px-3 py-2 text-sm">
                      <p>{comment.text}</p>
                      {comment.fileUrl && (
                        <div className="mt-2">
                          <a
                            href={comment.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            File Attachment
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )} */}
      
      {showCommentsPanel && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeCommentsPanel}
          ></div>

          {/* Panel */}
          <div
            className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-lg z-50 flex flex-col"
            style={{ maxHeight: "100vh" }}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b px-6 py-3 flex-shrink-0">
              <h2 className="text-lg font-extrabold">
                {tasks[currentCommentTaskIdx]?.title}
              </h2>
              <button
                onClick={closeCommentsPanel}
                className="text-gray-600 text-2xl font-extrabold"
              >
                ×
              </button>
            </div>

            {/* Input Area */}
            {!locked && (
              <div className="border-t px-6 py-4 flex-shrink-0 bg-white">
                <div className="relative">
                    <MentionsInput
                      value={mentionInputs[tasks[currentCommentTaskIdx]?.id] || ""}
                      onChange={(e) =>
                        setMentionInputs((prev) => ({
                          ...prev,
                          [tasks[currentCommentTaskIdx]?.id]: e.target.value,
                        }))
                      }
                      className="border rounded w-full min-h-[80px]"
                      placeholder="Add Comment..."
                      style={{
                        control: { padding: "0px", fontSize: 14 },
                        highlighter: { padding: "8px" },
                        input: { padding: "8px" },
                      }}
                    >
                    <Mention
                      trigger="@"
                      data={usersList}
                      className="bg-blue-200"
                      displayTransform={(id, display) => `@${display}`}
                    />
                  </MentionsInput>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex gap-2">
                      {/* Emoji Picker Button */}
                      <button
                        type="button"
                        onClick={() =>
                          setShowEmojiPickers((prev) => ({
                            ...prev,
                            [tasks[currentCommentTaskIdx]?.id]:
                              !prev[tasks[currentCommentTaskIdx]?.id],
                          }))
                        }
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <FaceSmileIcon className="h-5 w-5" />
                      </button>
                      {/* @ Button */}
                      <button
                        type="button"
                        onClick={() =>
                          setMentionInputs((prev) => ({
                            ...prev,
                            [tasks[currentCommentTaskIdx]?.id]:
                              (prev[tasks[currentCommentTaskIdx]?.id] || "") + "@",
                          }))
                        }
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <AtSymbolIcon className="h-5 w-5" />
                      </button>
                      {/* File Attachment (if enabled)
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            setCommentFiles((prev) => ({
                              ...prev,
                              [tasks[currentCommentTaskIdx]?.id]: e.target.files[0],
                            }))
                          }
                        />
                        <PaperClipIcon className="h-5 w-5 text-gray-600 hover:text-gray-800" />
                      </label>
                      */}
                    </div>
                    <button
                      className="bg-blue-700 text-white px-4 py-1 rounded text-sm"
                      onClick={() => {
                        handleAddComment(currentCommentTaskIdx);
                        setShowEmojiPickers((prev) => ({
                          ...prev,
                          [tasks[currentCommentTaskIdx]?.id]: false,
                        }));
                      }}
                    >
                      Send
                    </button>
                  </div>
                  {/* Show emoji picker for this task */}
                  {showEmojiPickers[tasks[currentCommentTaskIdx]?.id] && (
                    <div className="absolute z-50 mt-2">
                      <Picker
                        data={data}
                        onEmojiSelect={(emoji) =>
                          setMentionInputs((prev) => ({
                            ...prev,
                            [tasks[currentCommentTaskIdx]?.id]:
                              (prev[tasks[currentCommentTaskIdx]?.id] || "") + emoji.native,
                          }))
                        }
                        theme="light"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SCROLLABLE Comments Section */}
            <div className="overflow-y-auto flex-1 px-6 py-4" style={{ minHeight: 0 }}>
              {comments.map((comment, ci) => (
                <div key={ci} className="flex items-start gap-2 mb-4">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
                      {comment.author[0].toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      {comment.author} • {new Date(comment.createdAt).toLocaleString()}
                    </div>
                    <div className="bg-gray-100 rounded px-3 py-2 text-sm">
                      <p>{comment.text}</p>
                      {comment.fileUrl && (
                        <div className="mt-2">
                          <a
                            href={comment.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            File Attachment
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {/* Add the ref here! */}
              <div ref={commentsEndRef} />
            </div>

          </div>
        </>
      )}
      
    </div>  
  );
}


// (No locked)
// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   getTasksByProject,
//   addTask,
//   updateTask,
//   deleteTask,
//   uploadTaskFile
// } from "../API/TaskAPI";
// import { MentionsInput, Mention } from "react-mentions";
// import { useNotifications } from "../notifications/NotificationsContext";
// import {
//   CheckCircleIcon, ExclamationCircleIcon, MinusCircleIcon, InformationCircleIcon,
//   DocumentTextIcon, ClipboardDocumentIcon, ClockIcon, EllipsisHorizontalCircleIcon,
//   FaceSmileIcon, AtSymbolIcon, PaperClipIcon, ChatBubbleOvalLeftEllipsisIcon
// } from '@heroicons/react/24/solid';
// import Tippy from '@tippyjs/react';
// import 'tippy.js/dist/tippy.css';
// import Picker from '@emoji-mart/react';
// import data from '@emoji-mart/data';
// import { ChevronRightIcon } from '@heroicons/react/24/solid';
// import axios from "axios";
// import { getCommentsByTaskId, addComment } from "../API/CommentsAPI";

// const priorityOptions = ["High", "Medium", "Low"];
// const statusOptions = ["To-Do", "In Progress", "Done"];
// const dueStatusOptions = ["On track", "Overdue", "Done on time", "Done overdue"];
// const usersList = [
//   { id: "admin", display: "admin" },
//   { id: "manager", display: "manager" },
//   { id: "student", display: "student" },
// ];

// export default function TaskManagement({ user }) {
//   const { projectId } = useParams();
//   const navigate = useNavigate();
//   const { addNotification } = useNotifications();

//   // Role helpers
//   const isAdmin = user?.role?.toLowerCase() === "admin";
//   const isManager = user?.role?.toLowerCase() === "manager";
//   const isContributor = user?.role?.toLowerCase() === "contributor";
//   const canEdit = isAdmin || isManager;

//   const [tasks, setTasks] = useState([]);
//   const [editIdx, setEditIdx] = useState(null);
//   const [editTask, setEditTask] = useState(null);
//   const [addingNew, setAddingNew] = useState(false);
//   const [projectMembers, setProjectMembers] = useState([]);
//   const [projectStatus, setProjectStatus] = useState("Active");

//   // Extra
//   const tableBodyRef = useRef(null); // Add this ref
//   const commentsEndRef = useRef(null);

//   // --- Bulk selection logic
//   const [selectedTasks, setSelectedTasks] = useState([]);
//   const selectedAllTasks = selectedTasks.length === tasks.length;

//   // --- File Modal logic
//   const [showFileModal, setShowFileModal] = useState(false);
//   const [modalFile, setModalFile] = useState("");
//   const [modalFileObj, setModalFileObj] = useState(null);
//   const [fileType, setFileType] = useState(""); // "attachment" or "submission"
//   const [modalIdx, setModalIdx] = useState(null);

//   // --- File native input logic
//   const [attachmentFileObj, setAttachmentFileObj] = useState(null);

//   // --- Comments
//   //const [comments, setComments] = useState({});
//   const [comments, setComments] = useState([]);
//   const [mentionInputs, setMentionInputs] = useState({});
//   const [showEmojiPickers, setShowEmojiPickers] = useState({});
//   const [commentFiles, setCommentFiles] = useState({});
//   const [showCommentsPanel, setShowCommentsPanel] = useState(false);
//   const [currentCommentTaskIdx, setCurrentCommentTaskIdx] = useState(null);

//   // --- Load tasks from backend ---
//   useEffect(() => {
//     if (!projectId) return;
//     getTasksByProject(projectId)
//       .then((res) => setTasks(res.data))
//       .catch((err) => alert("Failed to load tasks: " + (err?.response?.data || err)));
//   }, [projectId]);

//   useEffect(() => {
//   if (!projectId) return;
//     // Fetch project details to get members
//     axios.get(`http://localhost:5047/api/projects/${projectId}`)
//       .then(res => {
//         setProjectStatus(res.data.status || "Active");
//         setProjectMembers(res.data.members || []);
//       });
//   }, [projectId]);

//   const locked = projectStatus === "Archived";

//   //Comment
//   useEffect(() => {
//     if (showCommentsPanel && currentCommentTaskIdx !== null) {
//       const taskId = tasks[currentCommentTaskIdx]?.id;
//       if (taskId) {
//         getCommentsByTaskId(taskId)
//           .then(res => setComments(res.data))
//           .catch(() => setComments([]));
//       }
//     }
//   }, [showCommentsPanel, currentCommentTaskIdx, tasks]);

//   useEffect(() => {
//     if (commentsEndRef.current) {
//       commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [comments]);

//   // Restrict ticking while editing
//   const handleSelectTask = (idx) => {
//     if (editIdx !== null || addingNew) {
//       window.alert("Please click SAVE or CANCEL before selecting other tasks.");
//       return;
//     }
//     setSelectedTasks((prev) => prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]);
//   };

//   const handleSelectAllTasks = () => {
//     if (editIdx !== null || addingNew) {
//       window.alert("Please click SAVE or CANCEL before selecting other tasks.");
//       return;
//     }
//     setSelectedTasks(selectedAllTasks ? [] : tasks.map((_, i) => i));
//   };

//   // Bulk Action Handlers
//   const handleBulkEdit = () => {
//     if (!canEdit || selectedTasks.length !== 1) return;
//     handleEdit(selectedTasks[0]);
//   };
//   // const handleBulkMarkDone = () => {
//   //   if (!canEdit) return;
//   //   selectedTasks.forEach(idx => {
//   //     const task = tasks[idx];
//   //     if (task.status !== "Done") {
//   //       updateTask(task.id, { ...task, status: "Done" })
//   //         .then((res) => setTasks(prev => prev.map((t, i) => i === idx ? res.data : t)));
//   //     }
//   //   });
//   //   setSelectedTasks([]);
//   // };

//   const handleBulkMarkDone = () => {
//     if (!canEdit) return;

//     const notDoneTasks = selectedTasks.filter(idx => tasks[idx].status !== "Done");
//     if (notDoneTasks.length === 0) {
//       alert("All selected tasks are already marked as Done.");
//       return;
//     }

//     // Create a formatted list of task names
//     const taskNames = notDoneTasks.map(idx => 
//       `• ${tasks[idx].title || `Task ${idx + 1}`}`
//     ).join('\n');

//     if (!window.confirm(`Are you sure you want to mark ${notDoneTasks.length} task(s) as Done?\n\nTask(s):\n${taskNames}`)) {
//       return;
//     }

//     notDoneTasks.forEach(idx => {
//       const task = tasks[idx];
//       // Build a full payload with all required fields
//       const payload = {
//         ...task,
//         status: "Done",
//         projectId: task.projectId, // ensure this is present
//         title: task.title,
//         description: task.description,
//         members: task.members,
//         startDate: task.startDate,
//         dueDate: task.dueDate,
//         dueStatus: task.dueStatus,
//         priority: task.priority,
//         file: task.file || "",
//         fileUrl: task.fileUrl || "",
//         submissionFileName: task.submissionFileName || "",
//         submissionFileUrl: task.submissionFileUrl || "",
//       };
//       updateTask(task.id, payload)
//         .then((res) => setTasks(prev => prev.map((t, i) => i === idx ? res.data : t)))
//         .catch(err => alert("Failed to mark as done: " + (err?.response?.data || err)));
//     });

//     setSelectedTasks([]);
//   };

//   const handleBulkDelete = () => {
//     if (!canEdit || selectedTasks.length !== 1) return;
//     handleDelete(selectedTasks[0]);
//     setSelectedTasks([]);
//   };
//   const handleBulkSave = () => {
//     if (!canEdit || selectedTasks.length !== 1) return;
//     handleSave(selectedTasks[0]);
//     setSelectedTasks([]);
//   };

//   // --- Form logic
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setEditTask((prev) => ({ ...prev, [name]: value }));
//   };
//   const handleEditMembers = (e) => {
//     setEditTask((prev) => ({
//       ...prev,
//       members: e.target.value.split(",").map((m) => m.trim()).filter(Boolean),
//     }));
//   };

//   // --- File Modal logic ---
//   const openFileModal = (idx, type) => {
//     setShowFileModal(true);
//     setModalIdx(idx);
//     setFileType(type);
//     const task = idx === "addingNew" ? editTask : tasks[idx];
//     if (type === "attachment") {
//       setModalFile(task?.file || "");
//     } else {
//       setModalFile(task?.submissionFileName || "");
//     }
//     setModalFileObj(null);
//   };
//   const closeFileModal = () => {
//     setShowFileModal(false);
//     setModalFile("");
//     setModalFileObj(null);
//     setModalIdx(null);
//     setFileType("");
//   };

//   const handleModalFileChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setModalFile(e.target.files[0].name);
//       setModalFileObj(e.target.files[0]);
//     }
//   };

//   const handleModalUpload = async () => {
//     if (!modalFileObj) {
//       closeFileModal();
//       return;
//     }
//     try {
//       const res = await uploadTaskFile(modalFileObj);
//       const fileName = modalFile;
//       const fileUrl = res.data.url;

//       if (modalIdx === "addingNew") {
//         setEditTask((prev) => ({
//           ...prev,
//           ...(fileType === "attachment"
//             ? { file: fileName, fileUrl }
//             : { submissionFileName: fileName, submissionFileUrl: fileUrl }),
//         }));
//       } else {
//         setTasks((prev) =>
//           prev.map((task, i) =>
//             i === modalIdx
//               ? {
//                   ...task,
//                   ...(fileType === "attachment"
//                     ? { file: fileName, fileUrl }
//                     : { submissionFileName: fileName, submissionFileUrl: fileUrl }),
//                 }
//               : task
//           )
//         );
//         if (editIdx === modalIdx) {
//           setEditTask((prev) => ({
//             ...prev,
//             ...(fileType === "attachment"
//               ? { file: fileName, fileUrl }
//               : { submissionFileName: fileName, submissionFileUrl: fileUrl }),
//           }));
//         }
//       }
//       closeFileModal();
//     } catch (err) {
//       alert("File upload failed: " + (err?.response?.data || err));
//     }
//   };

//   // File native input for attachment (used in table row)
//   const handleAttachmentFileChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setAttachmentFileObj(e.target.files[0]);
//       setEditTask((prev) => ({
//         ...prev,
//         file: e.target.files[0].name,
//       }));
//     }
//   };
//   const handleAttachmentUpload = async () => {
//     if (!attachmentFileObj) return;
//     try {
//       const res = await uploadTaskFile(attachmentFileObj);
//       setEditTask((prev) => ({
//         ...prev,
//         fileUrl: res.data.url,
//       }));
//       setAttachmentFileObj(null);
//     } catch (err) {
//       alert("File upload failed: " + (err?.response?.data || err));
//     }
//   };

//   // CRUD
//   const handleAddNew = () => {
//     if (!canEdit) return;
//     setAddingNew(true);
//     setEditTask({
//       title: "",
//       description: "",
//       members: [],
//       startDate: "",
//       dueDate: "",
//       dueStatus: "On track",
//       priority: priorityOptions[0],
//       status: statusOptions[0],
//       file: "",
//       fileUrl: "",
//       submissionFileName: "",
//       submissionFileUrl: "",
//     });
//     setEditIdx(null);
//     setSelectedTasks([]);

//     // Scroll to bottom after state updates
//     setTimeout(() => {
//       if (tableBodyRef.current) {
//         tableBodyRef.current.scrollIntoView({ 
//           behavior: 'smooth', 
//           block: 'end' 
//         });
//       }
//     }, 0);
//   };

//   const handleEdit = (idx) => {
//     if (!canEdit) return;
//     setEditIdx(idx);
//     setEditTask({ ...tasks[idx] });
//     setAddingNew(false);
//     setSelectedTasks([idx]);
//   };

//   const handleSave = (idx) => {
//     if (!canEdit) return;
//     if (!editTask.title?.trim()) return alert("Task Title is required");
//     if (!editTask.startDate) return alert("Start Date is required");
//     if (!editTask.dueDate) return alert("Due Date is required");

//     const payload = {
//       ...editTask,
//       projectId: parseInt(projectId),
//       members: Array.isArray(editTask.members) ? editTask.members : [],
//       file: editTask.file || "",
//       fileUrl: editTask.fileUrl || "",
//       submissionFileName: editTask.submissionFileName || "",
//       submissionFileUrl: editTask.submissionFileUrl || "",
//     };

//     if (addingNew) {
//       addTask(payload)
//         .then((res) => setTasks([...tasks, res.data]))
//         .catch((err) => alert("Failed to add task: " + (err?.response?.data || err)));
//       setAddingNew(false);
//     } else {
//       const taskId = tasks[editIdx].id;
//       updateTask(taskId, payload)
//         .then((res) => {
//           setTasks(tasks.map((t, i) => (i === editIdx ? res.data : t)));
//         })
//         .catch((err) => alert("Failed to update task: " + (err?.response?.data || err)));
//     }
//     setEditIdx(null);
//     setEditTask(null);
//     setAttachmentFileObj(null);
//     setSelectedTasks([]);
//   };

//   const handleCancel = () => {
//     setEditIdx(null);
//     setEditTask(null);
//     setAddingNew(false);
//     setAttachmentFileObj(null);
//     setSelectedTasks([]);
//   };

//   // const handleDelete = (idx) => {
//   //   if (!canEdit) return;
//   //   const task = tasks[idx];
//   //   const taskName = task.title || `Task ${idx + 1}`;
//   //   const confirmDelete = window.confirm(`Are you sure you want to delete these tasks?\nTasks: ${taskName}`);

//   //   if (!confirmDelete) return;
//   //   const taskId = task.id;
//   //   deleteTask(taskId)
//   //     .then(() => setTasks(tasks.filter((_, i) => i !== idx)))
//   //     .catch((err) => alert("Failed to delete task: " + (err?.response?.data || err)));
//   //   setEditIdx(null);
//   //   setAddingNew(false);
//   //   setSelectedTasks([]); 
//   // };

//   // 1. Update the handleDelete function to handle multiple tasks
// const handleDelete = () => {
//   if (!canEdit || selectedTasks.length === 0) return;
  
//   const taskNames = selectedTasks.map(idx => `• ${tasks[idx].title || `Task ${idx + 1}`}`).join('\n');
//   const confirmDelete = window.confirm(
//     `Are you sure you want to delete ${selectedTasks.length} task(s)?\n\nTask(s):\n${taskNames}`
//   );

//   if (!confirmDelete) return;

//   // Delete all selected tasks
//     Promise.all(
//       selectedTasks.map(idx => {
//         const taskId = tasks[idx].id;
//         return deleteTask(taskId)
//           .then(() => idx) // Return the index if successful
//           .catch(err => {
//             alert(`Failed to delete task: ${tasks[idx].title || `Task ${idx + 1}`}`);
//             return null;
//           });
//       })
//     ).then(results => {
//       // Filter out nulls (failed deletions) and remove deleted tasks
//       const deletedIndices = results.filter(idx => idx !== null);
//       setTasks(prev => prev.filter((_, i) => !deletedIndices.includes(i)));
//       setEditIdx(null);
//       setAddingNew(false);
//       setSelectedTasks([]);
//     });
//   };

//   // Comments
//   // Comments: per-task state
//   const handleAddComment = async (taskIdx) => {
//     const taskId = tasks[taskIdx]?.id;
//     if (!mentionInputs[taskId] && !commentFiles[taskId]) return;

//     // Find mentioned users for notification
//     const mentionsRegex = /@\[[^\]]+\]\(([^)]+)\)/g;
//     let mentionedUsers = [];
//     let match;
//     while ((match = mentionsRegex.exec(mentionInputs[taskId] || "")) !== null) {
//       mentionedUsers.push(match[1]);
//     }
//       console.log("Mentioned users:", mentionedUsers);
//   // // File upload logic (per task)
//   //     let fileUrl = "";
//   //     const fileToUpload = commentFiles[taskId];
//   //     if (fileToUpload) {
//   //       const formData = new FormData();
//   //       formData.append("file", fileToUpload);
//   //       try {
//   //           const res = await axios.post(
//   //             "http://localhost:5047/api/comments/upload",
//   //             formData // Do NOT set headers here!
//   //         );
//   //         fileUrl = res.data.url;
//   //       } catch (e) {
//   //         alert("Failed to upload comment file: " + (e?.response?.data || e));
//   //         return; // Don’t add comment if file upload fails
//   //       }
//   //     }

//     // Prepare comment data
//     const task = tasks[taskIdx];
//     addComment({
//       taskId: task.id,
//       author: user.username,
//       text: mentionInputs[taskId], // includes emoji and mentions
//       fileUrl: "", // TODO: handle commentFile upload if needed
//     }).then(res => {
//       const commentId = res.data.id; 
//       setComments(prev => [...prev, res.data]);
//       mentionedUsers.forEach((username) => {
//         console.log("Sending notification to:", username);
//         addNotification({
//           // id: Date.now() + Math.random(),
//           // user: username,
//           // message: `You were mentioned in task ${task.title}: "${mentionInputs[taskId]}"`,
//           // time: new Date().toLocaleString(),
//           user: username,
//           message: `You were mentioned in task "${task.title}": "${mentionInputs[taskId]}"`,
//           link: `/projects/${projectId}/tasks/${task.id}?commentId=${commentId}`,
//         });
//       });
//       setMentionInputs((prev) => ({ ...prev, [taskId]: "" }));
//       setCommentFiles((prev) => ({ ...prev, [taskId]: null }));
//       setShowEmojiPickers((prev) => ({ ...prev, [taskId]: false }));
//     });
//   };

//   const openCommentsPanel = (idx) => {
//     setCurrentCommentTaskIdx(idx);
//     setShowCommentsPanel(true);
//   };
//   const closeCommentsPanel = () => {
//     setShowCommentsPanel(false);
//     setCurrentCommentTaskIdx(null);
//   };
//   // // Comments: per-task state
//   //   const handleAddComment = async (taskIdx) => {
//   //     const taskId = tasks[taskIdx]?.id;
//   //     if (!mentionInputs[taskId] && !commentFiles[taskId]) return;

//   //     // Find mentioned users for notification
//   //     const mentionsRegex = /@\[[^\]]+\]\(([^)]+)\)/g;
//   //     let mentionedUsers = [];
//   //     let match;
//   //     while ((match = mentionsRegex.exec(mentionInputs[taskId] || "")) !== null) {
//   //       mentionedUsers.push(match[1]);
//   //     }
//   //       console.log("Mentioned users:", mentionedUsers);
//   // // // File upload logic (per task)
//   // //     let fileUrl = "";
//   // //     const fileToUpload = commentFiles[taskId];
//   // //     if (fileToUpload) {
//   // //       const formData = new FormData();
//   // //       formData.append("file", fileToUpload);
//   // //       try {
//   // //           const res = await axios.post(
//   // //             "http://localhost:5047/api/comments/upload",
//   // //             formData // Do NOT set headers here!
//   // //         );
//   // //         fileUrl = res.data.url;
//   // //       } catch (e) {
//   // //         alert("Failed to upload comment file: " + (e?.response?.data || e));
//   // //         return; // Don’t add comment if file upload fails
//   // //       }
//   // //     }

//   //     // Prepare comment data
//   //     const task = tasks[taskIdx];
//   //     addComment({
//   //       taskId: task.id,
//   //       author: user.username,
//   //       text: mentionInputs[taskId], // includes emoji and mentions
//   //       fileUrl: "", // TODO: handle commentFile upload if needed
//   //     }).then(res => {
//   //       setComments(prev => [...prev, res.data]);
//   //       mentionedUsers.forEach((username) => {
//   //         console.log("Sending notification to:", username);
//   //         addNotification({
//   //           id: Date.now() + Math.random(),
//   //           user: username,
//   //           message: `You were mentioned in task ${task.title}: "${mentionInputs[taskId]}"`,
//   //           time: new Date().toLocaleString(),
//   //         });
//   //       });
//   //       setMentionInputs((prev) => ({ ...prev, [taskId]: "" }));
//   //       setCommentFiles((prev) => ({ ...prev, [taskId]: null }));
//   //       setShowEmojiPickers((prev) => ({ ...prev, [taskId]: false }));
//   //     });
//   //   };

//   //   const openCommentsPanel = (idx) => {
//   //     setCurrentCommentTaskIdx(idx);
//   //     setShowCommentsPanel(true);
//   //   };
//   //   const closeCommentsPanel = () => {
//   //     setShowCommentsPanel(false);
//   //     setCurrentCommentTaskIdx(null);
//   //   };

//   // const handleAddComment = (taskIdx) => {
//   //     if (!mentionInputs && !commentFiles) return;

//   //     // Find mentioned users for notification
//   //     const mentionsRegex = /@\[[^\]]+\]\(([^)]+)\)/g;
//   //     let mentionedUsers = [];
//   //     let match;
//   //     while ((match = mentionsRegex.exec(mentionInputs)) !== null) {
//   //       mentionedUsers.push(match[1]);
//   //     }

//   //     // Prepare comment data
//   //     const task = tasks[taskIdx];
//   //     addComment({
//   //       taskId: task.id,
//   //       author: user.username,
//   //       text: mentionInputs, // includes emoji and mentions
//   //       fileUrl: "",        // TODO: handle commentFile upload if needed
//   //     }).then(res => {
//   //       // Push new comment into comments array
//   //       setComments(prev => [...prev, res.data]);

//   //       // Send notification for each mentioned user
//   //       mentionedUsers.forEach((username) => {
//   //         addNotification({
//   //           id: Date.now() + Math.random(),
//   //           user: username,
//   //           message: `You were mentioned in task ${task.title}: "${mentionInputs}"`,
//   //           time: new Date().toLocaleString(),
//   //         });
//   //       });

//   //       setMentionInputs("");
//   //       setCommentFiles(null);
//   //     });
//   //   };

//   // // const handleAddComment = (taskIdx) => {
//   // //    if (!mentionInput && !commentFile) return;
     
//   // //   // const mentionsRegex = /@(\w+)/g;
//   // //   // const mentionedUsers = [];
//   // //   // let match;
//   // //   // while ((match = mentionsRegex.exec(mentionInput)) !== null) {
//   // //   //   mentionedUsers.push(match[1]);
//   // //   // }
//   // //   const mentionsRegex = /@\[[^\]]+\]\(([^)]+)\)/g;
//   // //   let mentionedUsers = [];
//   // //   let match;
//   // //   while ((match = mentionsRegex.exec(mentionInput)) !== null) {
//   // //     mentionedUsers.push(match[1]);
//   // //   }
//   // //   console.log("mentionInput:", mentionInput);
//   // //   console.log("mentionedUsers:", mentionedUsers);
//   // //   setComments((prev) => ({
//   // //     ...prev,
//   // //     [taskIdx]: [
//   // //       ...(prev[taskIdx] || []),
//   // //       { text: mentionInput, file: commentFile },
//   // //     ],
//   // //   }));
//   // //   console.log("mentionInput:", mentionInput);
//   // //   console.log("mentionedUsers:", mentionedUsers);
//   // //   mentionedUsers.forEach((user) => {
//   // //     addNotification({
//   // //       id: Date.now() + Math.random(),
//   // //       user,
//   // //       message: `You were mentioned in task ${tasks[taskIdx]?.title}: "${mentionInput}"`,
//   // //       time: new Date().toLocaleString(),
//   // //     });
//   // //   });
//   // //   setMentionInput("");
//   // //   setCommentFile(null);
//   // // };


//   // const openCommentsPanel = (idx) => {
//   //   setCurrentCommentTaskIdx(idx);
//   //   setShowCommentsPanel(true);
//   // };
//   // const closeCommentsPanel = () => {
//   //   setShowCommentsPanel(false);
//   //   setCurrentCommentTaskIdx(null);
//   // };

//   // Renderers
//   const renderDueStatusBadge = (task) => {
//     // Handle new task case
//     if (!task || (!task.dueDate && !task.startDate)) {
//       return (
//         <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//           <InformationCircleIcon className="h-4 w-4" />
//           On track
//         </span>
//       );
//     }

//     const today = new Date().toISOString().split("T")[0];
//     let content, color, Icon;
//     const dueDate = (typeof task.dueDate === "string" ? task.dueDate.substring(0,10) : task.dueDate);
//     if (task.status !== "Done") {
//       if (today <= dueDate) {
//         content = "On track"; color = "bg-blue-100 text-blue-800"; Icon = InformationCircleIcon;
//       } else {
//         content = "Overdue"; color = "bg-red-100 text-red-800"; Icon = ExclamationCircleIcon;
//       }
//     } else {
//       if ((task.completedDate || today) <= dueDate) {
//         content = "Done on time"; color = "bg-green-100 text-green-800"; Icon = CheckCircleIcon;
//       } else {
//         content = "Done overdue"; color = "bg-red-100 text-red-800"; Icon = MinusCircleIcon;
//       }
//     }
//     return (
//       <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
//         <Icon className="h-4 w-4" />{content}
//       </span>
//     );
//   };
//   const renderPriorityBadge = (priority) => {
//     let colorClasses = "";
//     switch (priority) {
//       case "High": colorClasses = "bg-red-700 text-white"; break;
//       case "Medium": colorClasses = "bg-orange-500 text-white"; break;
//       case "Low": colorClasses = "bg-blue-400 text-white"; break;
//       default: colorClasses = "bg-gray-200 text-gray-800";
//     }
//     return (
//       <span className={`inline-block px-3 py-1 rounded-full text-xs font-normal ${colorClasses}`}>{priority}</span>
//     );
//   };
//   // const renderStatusBadge = (status) => {
//   //   let bgColor, textColor, Icon;
//   //   if (status === "To-Do") {
//   //     bgColor = "bg-gray-200"; textColor = "text-gray-800"; Icon = EllipsisHorizontalCircleIcon;
//   //   } else if (status === "In Progress") {
//   //     bgColor = "bg-yellow-100"; textColor = "text-yellow-800"; Icon = ClockIcon;
//   //   } else {
//   //     bgColor = "bg-green-100"; textColor = "text-green-800"; Icon = CheckCircleIcon;
//   //   }
//   //   return (
//   //     <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
//   //       <Icon className="h-4 w-4" />{status}
//   //     </span>
//   //   );
//   // };

//   const renderStatusBadge = (status) => {
//     console.log('Rendering status badge for:', status); // Debug log
//     let bgColor, textColor, Icon;
//     if (status === "To-Do") {
//       bgColor = "bg-gray-200"; 
//       textColor = "text-gray-800"; 
//       Icon = EllipsisHorizontalCircleIcon;
//     } else if (status === "In Progress") {
//       bgColor = "bg-yellow-100"; 
//       textColor = "text-yellow-800"; 
//       Icon = ClockIcon;
//     } else if (status === "Done") {
//       bgColor = "bg-green-100"; 
//       textColor = "text-green-800"; 
//       Icon = CheckCircleIcon;
//     } else {
//       // Default case if status is unexpected
//       bgColor = "bg-gray-200";
//       textColor = "text-gray-800";
//       Icon = InformationCircleIcon;
//     }
//     return (
//       <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
//         <Icon className="h-4 w-4" />{status}
//       </span>
//     );
//   };
//   //--Get project name
//   const [projectName, setProjectName] = useState("Loading...");
//   useEffect(() => {
//     if (!projectId) return;
//     axios.get(`http://localhost:5047/api/projects/${projectId}`)
//       .then(res => {
//         console.log("Project fetch result:", res.data);
//         setProjectName(res.data.title || "Project");
//       })
//       .catch(err => {
//         console.log("Project fetch error:", err);
//         setProjectName("Project");
//       });
//   }, [projectId]);

//   // user list
//   const [usersList, setUsersList] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5047/api/User")
//       .then(res => {
//         setUsersList(
//           res.data.map(user => ({
//             id: user.username,
//             display: user.username
//           }))
//         );
//       });
//   }, []);
//   // --- UI Render ---
//   return (
//     // <div className="p-8 min-h-screen bg-[#f6f8fa]">
//     <div className="p-8 flex flex-col h-[calc(100vh-4rem)]">
//       <div>
//         {/* Breadcrumb */}
//         <div className="flex items-center mb-6">
//           <span
//             className="mr-4 hover:text-mycustomblue cursor-pointer text-3xl font-bold"
//             onClick={() => navigate('/projects')}
//           >
//             {isAdmin
//               ? "All Projects"
//               : isManager
//                 ? "My Projects"
//                 : isContributor
//                   ? "My Projects"
//                   : "Project Management"}
//           </span>
//           <ChevronRightIcon className="h-5 w-5 text-gray-500" />
//               <span className="ml-2 text-3xl font-bold text-gray-800">
//                 {projectName}
//             </span>
//         </div>

//         {canEdit && (
//           <button
//             // className="mb-8 bg-mycustomblue text-white font-medium px-4 py-2 rounded"
//             className={`mb-8 bg-mycustomblue text-white font-medium px-4 py-2 rounded ${
//               locked || addingNew || editIdx !== null ? 'cursor-not-allowed' : ''
//             }`}
//             onClick={handleAddNew}
//             disabled={locked || addingNew || editIdx !== null || !canEdit}
//           >
//             Create New Task
//           </button>
//         )}
//       </div>
//       {/* ACTION BAR */}
//       {/* {selectedTasks.length > 0 && (
//         <div className="bg-white border rounded mb-2 px-4 py-2 flex items-center justify-between shadow-sm">
//           <span className="text-xs text-gray-800">
//             SELECTED: {selectedTasks.length}
//           </span>
//           <div className="flex gap-2">
//             <button
//               onClick={handleBulkEdit}
//               className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//               disabled={!canEdit || selectedTasks.length !== 1 || editIdx !== null || addingNew}
//             >
//               EDIT
//             </button>
//             <button
//               onClick={handleBulkMarkDone}
//               className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//               disabled={!canEdit}
//             >
//               MARK AS DONE
//             </button>
//             <button
//               onClick={handleBulkDelete}
//               className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//               disabled={!canEdit || selectedTasks.length !== 1}
//             >
//               DELETE
//             </button>
//             {editIdx !== null && selectedTasks.length === 1 && selectedTasks[0] === editIdx && (
//               <button
//                 onClick={handleBulkSave}
//                 className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//               >
//                 SAVE
//               </button>
//             )}
//             <button
//               onClick={handleCancel}
//               className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//             >
//               CANCEL
//             </button>
//           </div>
//         </div>
//       )} */}

//     {/* {(selectedTasks.length > 0 || addingNew) && (
//       <div className="bg-white border rounded mb-2 px-4 py-2 flex items-center justify-between shadow-sm">
//         <span className="text-xs text-gray-800">
//           {addingNew ? "ADDING NEW TASK" : `SELECTED: ${selectedTasks.length}`}
//         </span>
//         <div className="flex gap-3">
//           {addingNew ? (
//             <>
//               <button
//                 onClick={handleBulkSave}
//                 className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//               >
//                 SAVE
//               </button>
//               <button
//                 onClick={handleCancel}
//                 className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//               >
//                 CANCEL
//               </button>
//             </>
//           ) : (
//             <> */}
//               {/* Show EDIT when only one is selected, and not in edit mode or adding new */}
//               {/* {selectedTasks.length === 1 && editIdx === null && !addingNew && (
//                 <button
//                   onClick={() => handleBulkEdit(selectedTasks[0])}
//                   className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//                 >
//                   EDIT
//                 </button>
//               )} */}
//               {/* Show SAVE when one is selected and in edit mode */}
//               {/* {editIdx !== null && selectedTasks.length === 1 && selectedTasks[0] === editIdx && (
//                 <button
//                   onClick={handleBulkSave}
//                   className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//                 >
//                   SAVE
//                 </button>
//               )} */}
//               {/* Always allow mark as done and delete if editable */}
//               {/* <button
//                 onClick={handleBulkMarkDone}
//                 className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//                 disabled={!canEdit}
//               >
//                 MARK AS DONE
//               </button>
//               <button
//                 onClick={handleBulkDelete}
//                 className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//                 disabled={!canEdit}
//               >
//                 DELETE
//               </button>
//               <button
//                 onClick={handleCancel}
//                 className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//               >
//                 CANCEL
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     )} */}

//       {(selectedTasks.length > 0 || addingNew) && (
//         <div className="bg-white border rounded mb-2 px-4 py-2 flex items-center justify-between shadow-sm">
//           <span className="text-xs text-gray-800">
//             {addingNew ? "ADDING NEW TASK" : `SELECTED: ${selectedTasks.length}`}
//           </span>
//           <div className="flex gap-3">
//             {addingNew ? (
//               <>
//                 <button
//                   onClick={handleSave}
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
//             ) : editIdx !== null ? (
//               <>
//                 <button
//                   onClick={handleSave}
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
//             ) : (
//               <>
//                 {selectedTasks.length === 1 && (
//                   <button
//                     onClick={() => handleBulkEdit(selectedTasks[0])}
//                     className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//                     disabled={!canEdit}
//                   >
//                     EDIT
//                   </button>
//                 )}
//                 <button
//                   onClick={handleBulkMarkDone}
//                   className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//                   disabled={!canEdit || selectedTasks.length === 0}
//                 >
//                   MARK AS DONE
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   className="bg-white shadow-sm rounded px-4 py-1.5 text-gray-800 font-medium text-xs outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-200 transition"
//                   disabled={!canEdit || selectedTasks.length === 0}
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

//       <div className="flex-1 overflow-hidden">
//         <div className="overflow-x-auto w-full h-full">
//           <table className="min-w-[1400px] bg-white border whitespace-nowrap">
//             <thead>
//               <tr>
//                 <th className="sticky top-0 left-0 bg-white z-20 w-12 border px-4 py-2 text-left text-sm font-semibold">
//                   <input
//                     type="checkbox"
//                     checked={selectedAllTasks}
//                     onChange={handleSelectAllTasks}
//                     disabled={locked || !canEdit || editIdx !== null || addingNew}
//                   />
//                 </th>
//                 <th className="sticky top-0 left-12 bg-white z-20 w-12 border px-4 py-2 text-left text-sm font-semibold">ID</th>
//                 <th className="sticky top-0 left-24 bg-white z-20 border px-4 py-2 text-left text-sm font-semibold">Task Title</th>
//                 <th className="sticky top-0 bg-white z-10 border px-4 py-2 text-left text-sm font-semibold">Description</th>
//                 <th className="sticky top-0 bg-white z-10 border px-4 py-2 text-left text-sm font-semibold">Status</th>
//                 <th className="sticky top-0 bg-white z-10 border px-4 py-2 text-left text-sm font-semibold">Priority</th>
//                 <th className="sticky top-0 bg-white z-10 border px-4 py-2 text-left text-sm font-semibold">Assigned Members</th>
//                 <th className="sticky top-0 bg-white z-10 border px-4 py-2 text-left text-sm font-semibold">Timeline</th>
//                 <th className="sticky top-0 bg-white z-10 border px-4 py-2 text-left text-sm font-semibold">Due Status</th>
//                 <th className="sticky top-0 bg-white z-10 border px-4 py-2 text-left text-sm font-semibold">File Attachment</th>
//                 <th className="sticky top-0 bg-white z-10 border px-4 py-2 text-left text-sm font-semibold">File Submission</th>
//                 <th className="sticky top-0 bg-white z-10 border px-4 py-2 text-left text-sm font-semibold">Actions</th>
//               </tr>
//             </thead>
//             <tbody ref={tableBodyRef} className="divide-y divide-gray-200">
//               {tasks.map((task, idx) => (
//                 // <tr key={task.id || idx} className={selectedTasks.includes(idx) ? "bg-green-50" : ""}>
//                 <tr
//                   key={task.id || idx}
//                   className={
//                     selectedTasks.includes(idx)
//                       ? "bg-green-50"
//                       : locked
//                         ? "bg-gray-100"
//                         : ""
//                   }
//                 >  
//                   <td className={`sticky left-0 ${selectedTasks.includes(idx) ? "bg-green-50" : locked ? "bg-gray-100" : "bg-white"} z-10 w-12 border px-4 py-2 text-sm font-normal`}>
//                     <input
//                       type="checkbox"
//                       checked={selectedTasks.includes(idx)}
//                       onChange={() => handleSelectTask(idx)}
//                       disabled={locked || !canEdit || editIdx !== null || addingNew}
//                     />
//                   </td>
//                   <td className={`sticky left-12 ${selectedTasks.includes(idx) ? "bg-green-50" : locked ? "bg-gray-100" : "bg-white"} z-10 w-12 border px-4 py-2 text-sm font-normal`}>{idx + 1}</td>
//                   <td className={`sticky left-24 ${selectedTasks.includes(idx) ? "bg-green-50" : locked ? "bg-gray-100" : "bg-white"} z-10 border px-4 py-2 text-sm font-normal`}>
//                     <div className="flex items-center gap-2">
//                       <ClipboardDocumentIcon className="h-5 w-5 text-blue-500" />
//                       {(canEdit && editIdx === idx) ? (
//                         <input
//                           name="title"
//                           value={editTask.title}
//                           onChange={handleFormChange}
//                           className="border px-2 py-1 rounded w-full"
//                         />
//                       ) : task.title}
//                     </div>
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {(canEdit && editIdx === idx) ? (
//                       <input
//                         name="description"
//                         value={editTask.description}
//                         onChange={handleFormChange}
//                         className="border px-2 py-1 rounded w-full"
//                       />
//                     ) : (
//                       <Tippy content={
//                         <span style={{ wordBreak: "break-word", whiteSpace: "normal", display: "block", maxWidth: "300px" }}>
//                           {task.description}
//                         </span>} 
//                         theme="light" placement="top" maxWidth="300px" className="p-2">
//                         <span className="block max-w-xs truncate cursor-pointer">
//                           {task.description}
//                         </span>
//                       </Tippy>
//                     )}
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {(canEdit && editIdx === idx) ? (
//                       <select
//                         name="status"
//                         value={editTask.status}
//                         onChange={handleFormChange}
//                         className="border px-2 py-1 rounded w-full"
//                       >
//                         {statusOptions.map((s) => (
//                           <option key={s} value={s}>{s}</option>
//                         ))}
//                       </select>
//                     ) : (
//                       renderStatusBadge(task.status)
//                     )}
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {(canEdit && editIdx === idx) ? (
//                       <select
//                         name="priority"
//                         value={editTask.priority}
//                         onChange={handleFormChange}
//                         className="border px-2 py-1 rounded w-full"
//                       >
//                         {priorityOptions.map((p) => (
//                           <option key={p} value={p}>{p}</option>
//                         ))}
//                       </select>
//                     ) : (
//                       renderPriorityBadge(task.priority)
//                     )}
//                   </td>
//                   {/* <td className="border px-4 py-2 text-sm font-normal">
//                     {(canEdit && editIdx === idx) ? (
//                       <input
//                         name="members"
//                         value={editTask.members?.join(", ") || ""}
//                         onChange={handleEditMembers}
//                         className="border px-2 py-1 rounded w-full"
//                       />
//                     ) : (
//                       <ul className="list-disc pl-4">
//                         {(task.members || []).map((m) => (
//                           <li key={m}>{m}</li>
//                         ))}
//                       </ul>
//                     )}
//                   </td> */}
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {(canEdit && editIdx === idx) ? (
//                       <div className="flex flex-col gap-1">
//                         {projectMembers.map((m) => (
//                           <label key={m} className="flex items-center gap-2">
//                             <input
//                               type="checkbox"
//                               checked={editTask.members?.includes(m)}
//                               onChange={e => {
//                                 setEditTask(prev => ({
//                                   ...prev,
//                                   members: e.target.checked
//                                     ? [...(prev.members || []), m]
//                                     : (prev.members || []).filter(x => x !== m)
//                                 }));
//                               }}
//                             />
//                             <span>{m}</span>
//                           </label>
//                         ))}
//                       </div>
//                     ) : (
//                       <ul className="list-disc pl-4">
//                         {(task.members || []).map((m) => (
//                           <li key={m}>{m}</li>
//                         ))}
//                       </ul>
//                     )}
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {(canEdit && editIdx === idx) ? (
//                       <div className="flex gap-2">
//                         <input
//                           type="date"
//                           name="startDate"
//                           value={editTask.startDate?.substring(0, 10) || ""}
//                           onChange={handleFormChange}
//                           className="border px-2 py-1 rounded"
//                         />
//                         <span>-</span>
//                         <input
//                           type="date"
//                           name="dueDate"
//                           value={editTask.dueDate?.substring(0, 10) || ""}
//                           onChange={handleFormChange}
//                           className="border px-2 py-1 rounded"
//                         />
//                       </div>
//                     ) : (
//                       `${String(task.startDate).substring(0, 10)} - ${String(task.dueDate).substring(0, 10)}`
//                     )}
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {renderDueStatusBadge(task)}
//                   </td>
//                   {/* File Attachment (native file input like screenshot 4, and modal as fallback) */}
//                   <td className="border px-4 py-2 text-sm font-normal text-center">
//                     {(canEdit && editIdx === idx) ? (
//                       <div className="flex flex-col items-center">
//                         <input
//                           type="file"
//                           onChange={handleAttachmentFileChange}
//                           className="mb-1"
//                           accept="*"
//                         />
//                         {editTask.file && (
//                           <div className="text-xs text-gray-800 mb-1">
//                             Current file: <span className="font-semibold">{editTask.file}</span>
//                           </div>
//                         )}
//                         {attachmentFileObj && (
//                           <button
//                             className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
//                             onClick={handleAttachmentUpload}
//                             type="button"
//                           >
//                             Upload
//                           </button>
//                         )}
//                       </div>
//                     ) : task.file && task.fileUrl ? (
//                         <a
//                           href={`http://localhost:5047${task.fileUrl}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center gap-2"
//                         >
//                           <DocumentTextIcon className="h-5 w-5 text-blue-500 inline-block" />
//                           <span>{task.file}</span>
//                         </a>
//                       ) : (
//                         <span className="text-gray-400 italic">No Attachment</span>
//                       )}
//                   </td>
//                   {/* File Submission (View only) */}
//                   <td className="border px-4 py-2 text-sm font-normal text-center">
//                     {task.submissionFileName && task.submissionFileUrl ? (
//                       <a
//                         href={`http://localhost:5047${task.submissionFileUrl}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center gap-2"
//                       >
//                         <DocumentTextIcon className="h-5 w-5 text-black-500 inline-block" />
//                         <span>{task.submissionFileName}</span>
//                       </a>
//                     ) : (
//                       <span className="text-gray-400 italic">No Submission</span>
//                     )}
//                   </td>
//                   {/* Actions */}
//                   <td className="border px-4 py-2 text-xs font-medium">
//                     {canEdit ? (
//                       editIdx === idx ? (
//                         <div className="flex gap-2">
//                           <button
//                             className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
//                             onClick={() => handleSave(idx)}
//                           >SAVE</button>
//                           <button
//                             className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
//                             onClick={handleCancel}
//                           >CANCEL</button>
//                         </div>
//                       ) : (
//                         <div className="flex gap-2 text-xs font-medium">
//                           <button
//                             className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
//                             onClick={() => openCommentsPanel(idx)}
//                             // disabled={locked}
//                           >
//                             <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
//                           </button>
//                           {/* <button
//                             className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
//                             onClick={() => handleEdit(idx)}
//                             disabled={editIdx !== null || addingNew}
//                           >EDIT</button>
//                           <button
//                             className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
//                             onClick={() => handleBulkMarkDone(idx)}
//                           >MARK AS DONE</button>
//                           <button
//                             className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
//                             onClick={() => handleDelete(idx)}
//                           >DELETE</button>
//                           <button
//                             className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
//                             onClick={handleCancel}
//                           >CANCEL</button> */}
//                         </div>
//                       )
//                     ) : (
//                       // <span className="text-gray-500">View Only</span>
//                       // Contributor: Only show comment button
//                       <div className="flex gap-2 text-xs font-medium">
//                         <button
//                           className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
//                           onClick={() => openCommentsPanel(idx)}
//                         >
//                           <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//               {(canEdit && addingNew) && (
//                 <tr className="bg-yellow-50">
//                   <td className="bg-yellow-50 sticky left-0 bg-white z-10 w-12 border px-4 py-2 text-sm font-normal"></td>
//                   <td className="bg-yellow-50 sticky left-12 bg-white z-10 w-12 border px-4 py-2 text-sm font-normal">{tasks.length + 1}</td>
//                   <td className="bg-yellow-50 sticky left-24 bg-white z-10 border px-4 py-2 text-sm font-normal">
//                     <div className="flex items-center gap-2">
//                       <ClipboardDocumentIcon className="h-5 w-5 text-blue-500" />
//                       <input
//                         name="title"
//                         value={editTask.title}
//                         onChange={handleFormChange}
//                         className="border px-2 py-1 rounded w-full"
//                       />
//                     </div>
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     <input
//                       name="description"
//                       value={editTask.description}
//                       onChange={handleFormChange}
//                       className="border px-2 py-1 rounded w-full"
//                     />
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     <select
//                       name="status"
//                       value={editTask.status}
//                       onChange={handleFormChange}
//                       className="border px-2 py-1 rounded w-full"
//                     >
//                       {statusOptions.map((s) => (
//                         <option key={s} value={s}>{s}</option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     <select
//                       name="priority"
//                       value={editTask.priority}
//                       onChange={handleFormChange}
//                       className="border px-2 py-1 rounded w-full"
//                     >
//                       {priorityOptions.map((p) => (
//                         <option key={p} value={p}>{p}</option>
//                       ))}
//                     </select>
//                   </td>
//                   {/* <td className="border px-4 py-2 text-sm font-normal">
//                     <input
//                       name="members"
//                       value={editTask.members?.join(", ") || ""}
//                       onChange={handleEditMembers}
//                       className="border px-2 py-1 rounded w-full"
//                     />
//                   </td> */}
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     <div className="flex flex-col gap-1">
//                       {projectMembers.map((m) => (
//                         <label key={m} className="flex items-center gap-2">
//                           <input
//                             type="checkbox"
//                             checked={editTask.members?.includes(m)}
//                             onChange={e => {
//                               setEditTask(prev => ({
//                                 ...prev,
//                                 members: e.target.checked
//                                   ? [...(prev.members || []), m]
//                                   : (prev.members || []).filter(x => x !== m)
//                               }));
//                             }}
//                           />
//                           <span>{m}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     <div className="flex gap-2">
//                       <input
//                         type="date"
//                         name="startDate"
//                         value={editTask.startDate}
//                         onChange={handleFormChange}
//                         className="border px-2 py-1 rounded"
//                       />
//                       <span>-</span>
//                       <input
//                         type="date"
//                         name="dueDate"
//                         value={editTask.dueDate}
//                         onChange={handleFormChange}
//                         className="border px-2 py-1 rounded"
//                       />
//                     </div>
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">{renderDueStatusBadge(editTask)}</td>
//                   <td className="border px-4 py-2 text-sm font-normal text-center">
//                     <div className="flex flex-col items-center">
//                       <input
//                         type="file"
//                         onChange={handleAttachmentFileChange}
//                         className="mb-1"
//                       />
//                       {editTask.file && (
//                         <div className="text-xs text-gray-800 mb-1">
//                           Current file: <span className="font-semibold">{editTask.file}</span>
//                         </div>
//                       )}
//                       {attachmentFileObj && (
//                         <button
//                           className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
//                           onClick={handleAttachmentUpload}
//                           type="button"
//                         >
//                           Upload
//                         </button>
//                       )}

//                     </div>
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal text-center">
//                     <span className="text-gray-400">No Submission</span>
//                   </td>
//                   <td className="border px-4 py-2 text-xs font-medium">
//                     <div className="flex gap-2">
//                       <button
//                         className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
//                         onClick={() => handleSave(null)}
//                       >SAVE</button>
//                       <button
//                         className="bg-gray-100 border border-gray-300 text-black px-2 py-1 rounded"
//                         onClick={handleCancel}
//                       >CANCEL</button>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       {/* Side Comments Panel */}


//       {/* {showCommentsPanel && (
//         <>
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeCommentsPanel}></div>
//           <div className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-lg z-50 overflow-y-auto">
//             <div className="flex justify-between items-center border-b px-6 py-3">
//               <h2 className="text-lg font-extrabold">{tasks[currentCommentTaskIdx]?.title}</h2>
//               <button onClick={closeCommentsPanel} className="text-gray-600 text-2xl font-extrabold">×</button>
//             </div>
//             <div className="border-t p-6"> */}
//               {/* Add Comment Section */}
//               {/* <div className="mb-8 relative">
//                 <MentionsInput
//                   value={mentionInputs[tasks[currentCommentTaskIdx]?.id] || ""}
//                   onChange={(e) =>
//                     setMentionInputs((prev) => ({
//                       ...prev,
//                       [tasks[currentCommentTaskIdx]?.id]: e.target.value,
//                     }))
//                   }
//                   className="border rounded p-2 w-full min-h-[80px]"
//                   placeholder="Add Comment..."
//                   style={{
//                     control: { padding: "8px", fontSize: 14 },
//                     highlighter: { padding: "8px" },
//                     input: { padding: "8px" }
//                   }}
//                 >
//                   <Mention trigger="@" data={usersList} className="bg-blue-200" />
//                 </MentionsInput>
//                 <div className="flex items-center justify-between mt-2">
//                   <div className="flex gap-2"> */}
//                     {/* Emoji Picker */}
//                     {/* <button
//                       type="button"
//                       onClick={() =>
//                         setShowEmojiPickers((prev) => ({
//                           ...prev,
//                           [tasks[currentCommentTaskIdx]?.id]: !prev[tasks[currentCommentTaskIdx]?.id],
//                         }))
//                       }
//                       className="text-gray-600 hover:text-gray-800"
//                     >
//                       <FaceSmileIcon className="h-5 w-5" />
//                     </button> */}
//                     {/* @ Button */}
//                     {/* <button
//                       type="button"
//                       onClick={() =>
//                         setMentionInputs((prev) => ({
//                           ...prev,
//                           [tasks[currentCommentTaskIdx]?.id]:
//                             (prev[tasks[currentCommentTaskIdx]?.id] || "") + "@",
//                         }))
//                       }
//                       className="text-gray-600 hover:text-gray-800"
//                     >
//                       <AtSymbolIcon className="h-5 w-5" />
//                     </button> */}
//                     {/* File Attachment */}
//                     {/* <label className="cursor-pointer">
//                       <input
//                         type="file"
//                         className="hidden"
//                         onChange={(e) =>
//                           setCommentFiles((prev) => ({
//                             ...prev,
//                             [tasks[currentCommentTaskIdx]?.id]: e.target.files[0],
//                           }))
//                         }
//                       />
//                       <PaperClipIcon className="h-5 w-5 text-gray-600 hover:text-gray-800" />
//                     </label> */}
//                   {/* </div>
//                   <button
//                     className="bg-blue-700 text-white px-4 py-1 rounded text-sm"
//                     onClick={() => {
//                       handleAddComment(currentCommentTaskIdx);
//                       setShowEmojiPickers((prev) => ({
//                         ...prev,
//                         [tasks[currentCommentTaskIdx]?.id]: false
//                       }));
//                     }}
//                   >
//                     Send
//                   </button>
//                 </div> */}
//                 {/* Show emoji picker for this task */}
//                 {/* {showEmojiPickers[tasks[currentCommentTaskIdx]?.id] && (
//                   <div className="absolute z-50 mt-2">
//                     <Picker
//                       data={data}
//                       onEmojiSelect={(emoji) =>
//                         setMentionInputs((prev) => ({
//                           ...prev,
//                           [tasks[currentCommentTaskIdx]?.id]:
//                             (prev[tasks[currentCommentTaskIdx]?.id] || "") + emoji.native,
//                         }))
//                       }
//                       theme="light"
//                     />
//                   </div>
//                 )}
//               </div> */}
//               {/* Published comments */}
//               {/* {comments.map((comment, ci) => (
//                 <div key={ci} className="flex items-start gap-2 mb-4">
//                   <div className="flex-shrink-0">
//                     <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
//                       {comment.author[0].toUpperCase()}
//                     </div>
//                   </div>
//                   <div>
//                     <div className="text-xs text-gray-500 mb-1">
//                       {comment.author} • {new Date(comment.createdAt).toLocaleString()}
//                     </div>
//                     <div className="bg-gray-100 rounded px-3 py-2 text-sm">
//                       <p>{comment.text}</p>
//                       {comment.fileUrl && (
//                         <div className="mt-2">
//                           <a
//                             href={comment.fileUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 underline"
//                           >
//                             File Attachment
//                           </a>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </>
//       )} */}
      
//       {showCommentsPanel && (
//         <>
//           {/* Overlay */}
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 z-40"
//             onClick={closeCommentsPanel}
//           ></div>

//           {/* Panel */}
//           <div
//             className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-lg z-50 flex flex-col"
//             style={{ maxHeight: "100vh" }}
//           >
//             {/* Header */}
//             <div className="flex justify-between items-center border-b px-6 py-3 flex-shrink-0">
//               <h2 className="text-lg font-extrabold">
//                 {tasks[currentCommentTaskIdx]?.title}
//               </h2>
//               <button
//                 onClick={closeCommentsPanel}
//                 className="text-gray-600 text-2xl font-extrabold"
//               >
//                 ×
//               </button>
//             </div>

//             {/* Input Area */}
//             {!locked && (
//               <div className="border-t px-6 py-4 flex-shrink-0 bg-white">
//                 <div className="relative">
//                     <MentionsInput
//                       value={mentionInputs[tasks[currentCommentTaskIdx]?.id] || ""}
//                       onChange={(e) =>
//                         setMentionInputs((prev) => ({
//                           ...prev,
//                           [tasks[currentCommentTaskIdx]?.id]: e.target.value,
//                         }))
//                       }
//                       className="border rounded w-full min-h-[80px]"
//                       placeholder="Add Comment..."
//                       style={{
//                         control: { padding: "0px", fontSize: 14 },
//                         highlighter: { padding: "8px" },
//                         input: { padding: "8px" },
//                       }}
//                     >
//                     <Mention
//                       trigger="@"
//                       data={usersList}
//                       className="bg-blue-200"
//                       displayTransform={(id, display) => `@${display}`}
//                     />
//                   </MentionsInput>
//                   <div className="flex items-center justify-between mt-2">
//                     <div className="flex gap-2">
//                       {/* Emoji Picker Button */}
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setShowEmojiPickers((prev) => ({
//                             ...prev,
//                             [tasks[currentCommentTaskIdx]?.id]:
//                               !prev[tasks[currentCommentTaskIdx]?.id],
//                           }))
//                         }
//                         className="text-gray-600 hover:text-gray-800"
//                       >
//                         <FaceSmileIcon className="h-5 w-5" />
//                       </button>
//                       {/* @ Button */}
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setMentionInputs((prev) => ({
//                             ...prev,
//                             [tasks[currentCommentTaskIdx]?.id]:
//                               (prev[tasks[currentCommentTaskIdx]?.id] || "") + "@",
//                           }))
//                         }
//                         className="text-gray-600 hover:text-gray-800"
//                       >
//                         <AtSymbolIcon className="h-5 w-5" />
//                       </button>
//                       {/* File Attachment (if enabled)
//                       <label className="cursor-pointer">
//                         <input
//                           type="file"
//                           className="hidden"
//                           onChange={(e) =>
//                             setCommentFiles((prev) => ({
//                               ...prev,
//                               [tasks[currentCommentTaskIdx]?.id]: e.target.files[0],
//                             }))
//                           }
//                         />
//                         <PaperClipIcon className="h-5 w-5 text-gray-600 hover:text-gray-800" />
//                       </label>
//                       */}
//                     </div>
//                     <button
//                       className="bg-blue-700 text-white px-4 py-1 rounded text-sm"
//                       onClick={() => {
//                         handleAddComment(currentCommentTaskIdx);
//                         setShowEmojiPickers((prev) => ({
//                           ...prev,
//                           [tasks[currentCommentTaskIdx]?.id]: false,
//                         }));
//                       }}
//                     >
//                       Send
//                     </button>
//                   </div>
//                   {/* Show emoji picker for this task */}
//                   {showEmojiPickers[tasks[currentCommentTaskIdx]?.id] && (
//                     <div className="absolute z-50 mt-2">
//                       <Picker
//                         data={data}
//                         onEmojiSelect={(emoji) =>
//                           setMentionInputs((prev) => ({
//                             ...prev,
//                             [tasks[currentCommentTaskIdx]?.id]:
//                               (prev[tasks[currentCommentTaskIdx]?.id] || "") + emoji.native,
//                           }))
//                         }
//                         theme="light"
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* SCROLLABLE Comments Section */}
//             <div className="overflow-y-auto flex-1 px-6 py-4" style={{ minHeight: 0 }}>
//               {comments.map((comment, ci) => (
//                 <div key={ci} className="flex items-start gap-2 mb-4">
//                   <div className="flex-shrink-0">
//                     <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
//                       {comment.author[0].toUpperCase()}
//                     </div>
//                   </div>
//                   <div>
//                     <div className="text-xs text-gray-500 mb-1">
//                       {comment.author} • {new Date(comment.createdAt).toLocaleString()}
//                     </div>
//                     <div className="bg-gray-100 rounded px-3 py-2 text-sm">
//                       <p>{comment.text}</p>
//                       {comment.fileUrl && (
//                         <div className="mt-2">
//                           <a
//                             href={comment.fileUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 underline"
//                           >
//                             File Attachment
//                           </a>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               {/* Add the ref here! */}
//               <div ref={commentsEndRef} />
//             </div>

//           </div>
//         </>
//       )}
      
//     </div>  
//   );
// }
