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


import React, { useState } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { useNotifications } from "../notifications/NotificationsContext";
import { CheckCircleIcon, ExclamationCircleIcon, MinusCircleIcon, InformationCircleIcon, DocumentTextIcon } from '@heroicons/react/24/solid';
import { ClipboardDocumentIcon } from '@heroicons/react/24/solid';
import { ClockIcon, EllipsisHorizontalCircleIcon } from '@heroicons/react/24/solid';
import { FaceSmileIcon, AtSymbolIcon } from '@heroicons/react/24/solid';
import { PaperClipIcon } from '@heroicons/react/24/solid';
import { ChatBubbleLeftEllipsisIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 
import 'tippy.js/themes/light.css'; 
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

import { useEffect } from "react";

const initialTasks = [
  {
    title: "Design Login UI",
    description: "Create login page wireframe and UI components Create login page wireframe and UI components Create login page wireframe and UI components.",
    members: ["Alice", "Bob"],
    startDate: "2025-06-12",
    dueDate: "2025-06-27",
    dueStatus: "Overdue",
    priority: "High",
    status: "In Progress",
    fileAttachment: "designSpec.pdf",
    fileSubmission: "loginUI.png",
  },
  {
    title: "Setup Auth Backend",
    description: "Implement JWT auth and DB connection.",
    members: ["Charlie"],
    startDate: "2025-06-28",
    dueDate: "2025-07-12",
    dueStatus: "On Track",
    priority: "Medium",
    status: "To-Do",
    fileAttachment: "",
    fileSubmission: "",
  },
];

const priorityOptions = ["High", "Medium", "Low"];
const statusOptions = ["To-Do", "In Progress", "Done"];
const dueStatusOptions = ["On track", "Overdue", "Done on time", "Done overdue"];

const usersList = [
  { id: "admin", display: "admin" },
  { id: "manager", display: "manager" },
  { id: "student", display: "student" },
];

export default function TaskManagement() {
  const [tasks, setTasks] = useState(initialTasks);
  const [editIdx, setEditIdx] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [addingNew, setAddingNew] = useState(false);

  const [comments, setComments] = useState({});
  const [mentionInput, setMentionInput] = useState("");
  const { addNotification } = useNotifications();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [commentFile, setCommentFile] = useState(null);

  // Side panel states
  const [showCommentsPanel, setShowCommentsPanel] = useState(false);
  const [currentCommentTaskIdx, setCurrentCommentTaskIdx] = useState(null);

  const [selectedTasks, setSelectedTasks] = useState([]);
  const selectedAllTasks = selectedTasks.length === tasks.length;

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

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditTask({ ...tasks[idx] });
    setAddingNew(false);
  };

  const handleSave = (idx) => {
    if (addingNew) {
      setTasks([
        ...tasks,
        { ...editTask, dueStatus: calculateDueStatus(editTask) }
      ]);
      setAddingNew(false);
    } else {
      const updated = tasks.map((t, i) =>
        i === idx
          ? { ...editTask, dueStatus: calculateDueStatus(editTask) }
          : t
      );
      setTasks(updated);
    }
    setEditIdx(null);
    setEditTask(null);
  };

  const handleCancel = () => {
    setEditIdx(null);
    setEditTask(null);
    setAddingNew(false);
  };

  const handleDelete = (idx) => {
    setTasks(tasks.filter((_, i) => i !== idx));
  };

  const handleAddNew = () => {
    setAddingNew(true);
    setEditTask({
      title: "",
      description: "",
      members: [],
      startDate: "",
      dueDate: "",
      dueStatus: dueStatusOptions[0],
      priority: priorityOptions[0],
      status: statusOptions[0],
      file: "",
    });
  };

  const handleFileAttachmentChange = (e) => {
    setEditTask((prev) => ({
      ...prev,
      fileAttachment: e.target.files[0]?.name || "",
    }));
  };

  const handleFileSubmissionChange = (e) => {
    setEditTask((prev) => ({
      ...prev,
      fileSubmission: e.target.files[0]?.name || "",
    }));
  };

  const handleAddComment = (taskIdx) => {
    if (!mentionInput && !commentFile) return;

    const mentionsRegex = /@(\w+)/g;
    const mentionedUsers = [];
    let match;
    while ((match = mentionsRegex.exec(mentionInput)) !== null) {
      const userId = match[1];
      mentionedUsers.push(userId);
    }

    setComments((prev) => ({
      ...prev,
      [taskIdx]: [
        ...(prev[taskIdx] || []),
        {
          text: mentionInput,
          file: commentFile
        }
      ],
    }));

    mentionedUsers.forEach(user => {
      addNotification({
        id: Date.now() + Math.random(),
        user,
        message: `You were mentioned in task ${tasks[taskIdx].title}: "${mentionInput}"`,
        time: new Date().toLocaleString(),
      });
    });

    setMentionInput("");
    setCommentFile(null);
  };

  const openCommentsPanel = (idx) => {
    setCurrentCommentTaskIdx(idx);
    setShowCommentsPanel(true);
  };

  const closeCommentsPanel = () => {
    setShowCommentsPanel(false);
    setCurrentCommentTaskIdx(null);
  };

  const handleSelectTask = (idx) => {
    setSelectedTasks((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleSelectAllTasks = () => {
    if (selectedAllTasks) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map((_, i) => i));
    }
  };

  const handleBulkDeleteTasks = () => {
    const updated = tasks.filter((_, idx) => !selectedTasks.includes(idx));
    setTasks(updated);
    setSelectedTasks([]);
  };

  const handleBulkEditTasks = () => {
    if (selectedTasks.length === 1) {
      const idx = selectedTasks[0];
      setEditIdx(idx);
      setEditTask({ ...tasks[idx] });
      setAddingNew(false);
    } else {
      alert("Please select only one task to edit at a time.");
    }
  };

  const handleBulkMarkAsDone = () => {
    const today = new Date().toISOString().split("T")[0];
    setTasks(prevTasks =>
      prevTasks.map((task, i) =>
        selectedTasks.includes(i)
          ? {
              ...task,
              status: "Done",
              completedDate: today,
              dueStatus: calculateDueStatus({ ...task, status: "Done", completedDate: today })
            }
          : task
      )
    );
    setSelectedTasks([]); // clear selection after marking as done
  };

  const handleBulkSaveTasks = () => {
    console.log("Tasks saved:", tasks);
    alert("Changes have been saved successfully!");
    setSelectedTasks([]);
    setEditIdx(null);
    setEditTask(null);
    setAddingNew(false);
  };

  const calculateDueStatus = (task) => {
    const today = new Date().toISOString().split("T")[0];
    if (task.status !== "Done") {
      // If not done yet, check if overdue
      return today > task.dueDate ? "Overdue" : "On track";
    } else {
      // If done, check if done on time
      return task.completedDate && task.completedDate <= task.dueDate
        ? "Done on time"
        : "Done overdue";
    }
  };

  useEffect(() => {
    setTasks(prevTasks =>
      prevTasks.map(task => ({
        ...task,
        dueStatus: calculateDueStatus(task)
      }))
    );
  }, []);

  const renderDueStatusBadge = (task) => {
    const today = new Date().toISOString().split("T")[0];
    let content, color, Icon;

    if (task.status !== "Done") {
      if (today <= task.dueDate) {
        content = "On track";
        color = "bg-blue-100 text-blue-800";
        Icon = InformationCircleIcon;
      } else {
        content = "Overdue";
        color = "bg-red-100 text-red-800";
        Icon = ExclamationCircleIcon;
      }
    } else {
      if (task.completedDate <= task.dueDate) {
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

  const handleMarkAsDone = (idx) => {
    const today = new Date().toISOString().split("T")[0];
    setTasks(prevTasks =>
      prevTasks.map((task, i) =>
        i === idx
          ? {
              ...task,
              status: "Done",
              completedDate: today,
              dueStatus: calculateDueStatus({ ...task, status: "Done", completedDate: today })
            }
          : task
      )
    );
  };

  const renderPriorityBadge = (priority) => {
    let colorClasses = "";

    switch(priority) {
      case "High":
        colorClasses = "bg-red-700 text-white";
        break;
      case "Medium":
        colorClasses = "bg-orange-500 text-white";
        break;
      case "Low":
        colorClasses = "bg-blue-400 text-white";
        break;
      default:
        colorClasses = "bg-gray-200 text-gray-800";
    }

    return (
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-normal ${colorClasses}`}>
        {priority}
      </span>
    );
  };

  const renderStatusBadge = (status) => {
    let bgColor, textColor, Icon;

    if (status === "To-Do") {
      bgColor = "bg-gray-200";
      textColor = "text-gray-800";
      Icon = EllipsisHorizontalCircleIcon;
    } else if (status === "In Progress") {
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
      Icon = ClockIcon;
    } else { // Done
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      Icon = CheckCircleIcon;
    }

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        <Icon className="h-4 w-4" />
        {status}
      </span>
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Task Management</h1>
      <button
        className="mb-8 bg-mycustomblue text-white font-medium px-4 py-2 rounded"
        onClick={handleAddNew}
      >
        Create New Task
      </button>

      {selectedTasks.length > 0 && (
        <div className="bg-white border rounded mb-2 px-4 py-2 flex items-center justify-between shadow-sm">
          <span className="text-xs text-gray-800">SELECTED: {selectedTasks.length}</span>
          <div className="flex gap-2">
            <button
              onClick={handleBulkEditTasks}
              className="bg-white hover:bg-gray-200 px-3 py-1 rounded shadow-sm hover:shadow text-gray-800 text-xs"
            >
              EDIT
            </button>
            <button
              onClick={handleBulkMarkAsDone}
              className="bg-white hover:bg-gray-200 px-3 py-1 rounded shadow-sm hover:shadow text-gray-800 text-xs"
            >
              MARK AS DONE
            </button>
            <button
              onClick={handleBulkDeleteTasks}
              className="bg-white hover:bg-gray-200 px-3 py-1 rounded shadow-sm hover:shadow text-gray-800 text-xs"
            >
              DELETE
            </button>
            <button
              onClick={handleBulkSaveTasks}
              className="bg-white hover:bg-green-200 text-gray-800 px-3 py-1 rounded shadow-sm hover:shadow text-xs"
            >
              SAVE
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto w-full">
        <table className="min-w-[1600px] bg-white border whitespace-nowrap">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={selectedAllTasks}
                  onChange={handleSelectAllTasks}
                />
              </th>
              <th className="border px-4 py-2 text-left text-sm font-semibold">ID</th>
              <th className="border px-4 py-2 text-left text-sm font-semibold">Task Title</th>
              <th className="border px-4 py-2 text-left text-sm font-semibold">Description</th>
              <th className="border px-4 py-2 text-left text-sm font-semibold">Status</th>
              <th className="border px-4 py-2 text-left text-sm font-semibold">Priority</th>
              <th className="border px-4 py-2 text-left text-sm font-semibold">Assigned Members</th>
              <th className="border px-4 py-2 text-left text-sm font-semibold">Timeline</th>
              <th className="border px-4 py-2 text-left text-sm font-semibold">Due Status</th>
              <th className="border px-4 py-2 text-left text-sm font-semibold">File Attachment</th>
              <th className="border px-4 py-2 text-left text-sm font-semibold">File Submission</th>
              <th className="border px-4 py-2 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task, idx) => (
              <tr key={idx} className={selectedTasks.includes(idx) ? "bg-green-50" : ""}>
                <td className="border px-4 py-2 text-sm font-normal">
                  <input
                    type="checkbox"
                    checked={selectedTasks.includes(idx)}
                    onChange={() => handleSelectTask(idx)}
                  />
                </td>
                {/* ID cell */}
                <td className="border px-4 py-2 text-sm font-normal">{idx + 1}</td>
                {/* Task Title */}
                <td className="border px-4 py-2 text-sm font-normal">
                  <div className="flex items-center gap-2">
                    <ClipboardDocumentIcon className="h-5 w-5 text-blue-500" />
                    {editIdx === idx ? (
                      <input
                        name="title"
                        value={editTask.title}
                        onChange={handleFormChange}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      task.title
                    )}
                  </div>
                </td>
                {/* Description */}
                <td className="border px-4 py-2 text-sm font-normal">
                  {editIdx === idx ? (
                    <input
                      name="description"
                      value={editTask.description}
                      onChange={handleFormChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    <Tippy content={<span>{task.description}</span>} theme="light" placement="top" maxWidth="300px" className="p-2">
                      <span className="block max-w-xs truncate cursor-pointer">
                        {task.description}
                      </span>
                    </Tippy>
                  )}
                </td>
                {/* Status */}
                <td className="border px-4 py-2 text-sm font-normal">
                  {editIdx === idx ? (
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
                {/* Priority */}
                <td className="border px-4 py-2 text-sm font-normal">
                  {editIdx === idx ? (
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
                {/* Assigned Members */}
                <td className="border px-4 py-2 text-sm font-normal">
                  {editIdx === idx ? (
                    <input
                      name="members"
                      value={editTask.members.join(", ")}
                      onChange={handleEditMembers}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    <ul className="list-disc pl-4">
                      {task.members.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  )}
                </td>
                {/* Timeline */}
                <td className="border px-4 py-2 text-sm font-normal">
                  {editIdx === idx ? (
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
                  ) : (
                    `${task.startDate} - ${task.dueDate}`
                  )}
                </td>
                {/* Due Status */}
                <td className="border px-4 py-2 text-sm font-normal">
                  {renderDueStatusBadge(task)}
                </td>       
                {/* File Attachment */}
                <td className="border px-4 py-2 text-sm font-normal text-center">
                  {editIdx === idx ? (
                    <input type="file" onChange={handleFileAttachmentChange} />
                  ) : (
                    task.fileAttachment && (
                      <a
                        href={`/uploads/attachments/${task.fileAttachment}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <DocumentTextIcon Icon className="h-5 w-5 text-blue-500 inline-block" />
                      </a>
                    )
                  )}
                </td>
                {/* File Submission */}
                <td className="border px-4 py-2 text-sm font-normal text-center">
                  {editIdx === idx ? (
                    <input type="file" onChange={handleFileSubmissionChange} />
                  ) : (
                    task.fileSubmission && (
                      <a
                        href={`/uploads/submissions/${task.fileSubmission}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <DocumentTextIcon Icon className="h-5 w-5 text-black-500 inline-block" />
                      </a>
                    )
                  )}
                </td>
                {/* Actions */}
                <td className="border px-4 py-2 text-xs font-medium">
                  {editIdx === idx ? (
                    <div className="flex gap-2">
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => handleSave(idx)}
                      >
                        SAVE
                      </button>
                      <button
                        className="bg-gray-400 text-white px-2 py-1 rounded"
                        onClick={handleCancel}
                      >
                        CANCEL
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2 text-xs font-medium">
                      <button
                        className="bg-gray-200 text-gray-800 px-2 py-1 rounded"
                        onClick={() => openCommentsPanel(idx)}
                      >
                        <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
                      </button>
                      <button
                        className="bg-yellow-400 px-2 py-1 rounded"
                        onClick={() => handleEdit(idx)}
                      >
                        EDIT
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDelete(idx)}
                      >
                        DELETE
                      </button>
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => handleMarkAsDone(idx)}
                      >
                        MARK AS DONE
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {addingNew && (
              <tr className="bg-yellow-50">
                <td className="border px-4 py-2 text-sm font-normal"></td>
                <td className="border px-4 py-2 text-sm font-normal">{tasks.length + 1}</td>
                <td className="border px-4 py-2 text-sm font-normal">
                  <input
                    name="title"
                    value={editTask.title}
                    onChange={handleFormChange}
                    className="border px-2 py-1 rounded w-full"
                  />
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
                <td className="border px-4 py-2 text-sm font-normal">
                  <input
                    name="members"
                    value={editTask.members.join(", ")}
                    onChange={handleEditMembers}
                    className="border px-2 py-1 rounded w-full"
                  />
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
                <td className="border px-4 py-2 text-sm font-normal">
                  {/* Due status can be calculated after saving */}
                </td>
                <td className="border px-4 py-2 text-sm font-normal text-center">
                  <input type="file" onChange={handleFileAttachmentChange} />
                </td>
                <td className="border px-4 py-2 text-sm font-normal text-center">
                  <input type="file" onChange={handleFileSubmissionChange} />
                </td>
                <td className="border px-4 py-2 text-xs font-medium">
                  <div className="flex gap-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleSave(null)} // null indicates new task
                    >
                      SAVE
                    </button>
                    <button
                      className="bg-gray-400 text-white px-2 py-1 rounded"
                      onClick={handleCancel}
                    >
                      CANCEL
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Side Comments Panel */}
      {showCommentsPanel && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeCommentsPanel}
          ></div>

          <div className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-lg z-50 overflow-y-auto">
            <div className="flex justify-between items-center border-b px-6 py-3">
              {/* Task Title */}
              <h2 className="text-lg font-extrabold">
                {tasks[currentCommentTaskIdx]?.title}
              </h2>
              <button onClick={closeCommentsPanel} className="text-gray-600 text-2xl font-extrabold">×</button>
            </div>

            <div className="border-t p-6">
              {/* Add Comment Section */}
              <div className="mb-8 relative">
                <MentionsInput
                  value={mentionInput}
                  onChange={(e) => setMentionInput(e.target.value)}
                  className="border rounded p-2 w-full min-h-[80px]"
                  placeholder="Add Comment..."
                  style={{
                    control: {
                      padding: "8px", // apply to the input control
                      fontSize: 14
                    },
                    highlighter: {
                      padding: "8px" // also pad highlighted text area
                    },
                    input: {
                      padding: "8px" // ensure input text has padding
                    }
                  }}
                >
                  <Mention trigger="@" data={usersList} className="bg-blue-200" />
                </MentionsInput>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <FaceSmileIcon className="h-5 w-5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setMentionInput(prev => prev + '@')}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <AtSymbolIcon className="h-5 w-5" />
                    </button>

                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setCommentFile(e.target.files[0])}
                      />
                      <PaperClipIcon className="h-5 w-5 text-gray-600 hover:text-gray-800" />
                    </label>
                  </div>

                  <button
                    className="bg-mycustomblue text-white px-4 py-1 rounded text-sm"
                    onClick={() => {
                      handleAddComment(currentCommentTaskIdx);
                      setShowEmojiPicker(false);
                    }}
                  >
                    Send
                  </button>
                </div>

                {showEmojiPicker && (
                  <div className="absolute z-50 mt-2">
                    <Picker
                      data={data}
                      onEmojiSelect={(emoji) => setMentionInput(prev => prev + emoji.native)}
                      theme="light"
                    />
                  </div>
                )}
              </div>

              {/* Published comments */}
              {(comments[currentCommentTaskIdx] || []).map((comment, ci) => (
                <div key={ci} className="flex items-start gap-2 mb-4">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
                      U
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Username • 3 minutes ago</div>
                    <div className="bg-gray-100 rounded px-3 py-2 text-sm">
                      <p>{comment.text}</p>
                      {comment.file && (
                        <div className="mt-2">
                          <a
                            href={URL.createObjectURL(comment.file)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            {comment.file.name}
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
      )}
    </div>
  );
}
