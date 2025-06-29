import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTasksByProject,
  addTask,
  updateTask,
  deleteTask,
  uploadTaskFile
} from "../API/TaskAPI";

function FilePickerModal({
  open,
  onClose,
  file,
  saveAs,
  onFileChange,
  onSaveAsChange,
  onUpload,
  onRemoveFile // <-- Add this prop
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <div className="bg-white rounded-lg shadow-xl min-w-[420px] max-w-full relative px-8 py-8">
        <h2 className="text-xl font-semibold mb-4">File picker</h2>
        <div>
          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="fileInput">
              Attachment
            </label>
            <input
              id="fileInput"
              type="file"
              className="mb-1"
              onChange={onFileChange}
              style={{ display: 'inline-block' }}
            />
            <div className="text-gray-800 text-sm mb-1 flex items-center gap-3">
              {file ? (
                <>
                  <span>
                    Current file: <span className="font-semibold">{file}</span>
                  </span>
                  <button
                    type="button"
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-xs"
                    onClick={onRemoveFile}
                  >
                    Remove
                  </button>
                </>
              ) : (
                <>No file chosen</>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="saveAsInput">
              Save as
            </label>
            <input
              id="saveAsInput"
              type="text"
              value={saveAs}
              onChange={onSaveAsChange}
              className="border border-black rounded px-2 py-1 w-full"
              placeholder="Rename the file (optional)"
              style={{ fontSize: "1rem" }}
            />
          </div>
          <div className="flex justify-end gap-3 mt-8">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded font-semibold"
              onClick={onUpload}
            >
              Upload this file
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded font-semibold"
              onClick={onClose}
              type="button"
            >
              Close
            </button>
          </div>
        </div>
        <button
          className="absolute top-2 right-3 text-gray-400 text-2xl hover:text-gray-800"
          onClick={onClose}
        >x</button>
      </div>
    </div>
  );
}

const priorityOptions = ["High", "Medium", "Low"];
const statusOptions = ["To-Do", "In Progress", "Done"];
const dueStatusOptions = ["Done on time", "Overdue", "Done overdue"];


export default function TaskManagement({ user }) {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [addingNew, setAddingNew] = useState(false);

  // File modal state
  const [showFileModal, setShowFileModal] = useState(false);
  const [fileModalIdx, setFileModalIdx] = useState(null);
  const [modalFile, setModalFile] = useState("");
  const [modalSaveAs, setModalSaveAs] = useState("");
  const [modalFileObj, setModalFileObj] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!projectId) return;
    getTasksByProject(projectId)
      .then((res) => setTasks(res.data))
      .catch((err) => alert("Failed to load tasks: " + err));
  }, [projectId]);

  // --- File modal handlers ---
  const openFileModal = (idx) => {
    setFileModalIdx(idx);
    setShowFileModal(true);
    const task = idx === "addingNew" ? editTask : tasks[idx];
    setModalFile(task?.file || "");
    setModalSaveAs(task?.file || "");
    setModalFileObj(null);
  };
  const closeFileModal = () => {
    setShowFileModal(false);
    setFileModalIdx(null);
    setModalFile("");
    setModalSaveAs("");
    setModalFileObj(null);
  };

  const handleModalFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setModalFile(e.target.files[0].name);
      setModalSaveAs(e.target.files[0].name);
      setModalFileObj(e.target.files[0]);
    }
  };
  const handleModalSaveAsChange = (e) => setModalSaveAs(e.target.value);

  const handleModalUpload = async () => {
    let fileName = modalSaveAs || modalFile;
    let fileUrl = "";

    if (modalFileObj) {
      try {
        const res = await uploadTaskFile(modalFileObj);
        fileUrl = res.data.url;
        fileName = modalSaveAs || res.data.originalName;
      } catch (err) {
        alert("File upload failed: " + err);
        return;
      }
    } else {
      if (fileModalIdx === "addingNew") {
        fileUrl = editTask?.fileUrl || "";
      } else {
        fileUrl = tasks[fileModalIdx]?.fileUrl || "";
      }
    }

    if (fileModalIdx === "addingNew") {
      setEditTask((prev) => ({
        ...prev,
        file: fileName,
        fileUrl: fileUrl,
      }));
    } else {
      setTasks((prev) =>
        prev.map((task, i) =>
          i === fileModalIdx
            ? { ...task, file: fileName, fileUrl: fileUrl }
            : task
        )
      );
      // Also update editTask if in edit mode
      if (editIdx === fileModalIdx) {
        setEditTask((prev) => ({
          ...prev,
          file: fileName,
          fileUrl: fileUrl,
        }));
      }
    }
    closeFileModal();
  };

  const handleFileDownload = async (task) => {
    if (!task.fileUrl) return;
    try {
      const fileName = task.fileUrl.split('/').pop();
      const response = await fetch(`http://localhost:5047/api/tasks/files/${fileName}`);
      if (!response.ok) throw new Error('File not found');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = task.file || fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      alert('Failed to download file. Please try again.');
    }
  };
  // Members handling (multiline)
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prev) => ({ ...prev, [name]: value }));
  };
  const handleEditMembers = (e) => {
    setEditTask((prev) => ({
      ...prev,
      members: e.target.value.split("\n"),
    }));
  };
  const membersText = editTask?.members?.join("\n") || "";
  const renderMembers = (members) => {
    if (!members) return null;
    const arr = Array.isArray(members) ? members : members.split("\n");
    return (
      <div>
        {arr.map((m, i) => (
          <span key={i} style={{ display: "block", whiteSpace: "pre-wrap" }}>{m}</span>
        ))}
      </div>
    );
  };

  const handleSave = (idx) => {
    if (addingNew) {
      const payload = { ...editTask, projectId: parseInt(projectId) };
      addTask(payload)
        .then((res) => setTasks([...tasks, res.data]))
        .catch((err) => alert("Failed to add task: " + err));
      setAddingNew(false);
    } else {
      const taskId = tasks[editIdx].id;
      updateTask(taskId, { ...editTask, projectId: parseInt(projectId) })
        .then(() => {
          const updated = tasks.map((t, i) =>
            i === editIdx ? { ...editTask, id: taskId, projectId: parseInt(projectId) } : t
          );
          setTasks(updated);
        })
        .catch((err) => alert("Failed to update task: " + err));
    }
    setEditIdx(null);
    setEditTask(null);
  };
  const handleCancel = () => {
    setEditIdx(null);
    setEditTask(null);
    setAddingNew(false);
    closeFileModal();
  };
  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditTask({ ...tasks[idx] });
    setAddingNew(false);
  };
  const handleDelete = (idx) => {
    const taskId = tasks[idx].id;
    deleteTask(taskId)
      .then(() => setTasks(tasks.filter((_, i) => i !== idx)))
      .catch((err) => alert("Failed to delete task: " + err));
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
      fileUrl: "",
    });
  };

  const handleModalRemoveFile = () => {
    setModalFile("");
    setModalSaveAs("");
    setModalFileObj(null);

    if (fileModalIdx === "addingNew") {
      setEditTask((prev) => ({
        ...prev,
        file: "",
        fileUrl: "",
      }));
    } else if (fileModalIdx !== null) {
      setTasks((prev) =>
        prev.map((task, i) =>
          i === fileModalIdx
            ? { ...task, file: "", fileUrl: "" }
            : task
        )
      );
      if (editIdx === fileModalIdx) {
        setEditTask((prev) => ({
          ...prev,
          file: "",
          fileUrl: "",
        }));
      }
    }
  };

  return (
    <div className="p-8">
      <button
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded"
        onClick={() => navigate("/projects")}
      >
        ← Back to Projects
      </button>
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleAddNew}
      >
        Create New Task
      </button>
      <div className="overflow-x-auto w-full">
        <table className="min-w-[1600px] bg-white border whitespace-nowrap">
          <thead>
            <tr>
              <th className="border px-4 py-2">Task Title</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Assigned Members</th>
              <th className="border px-4 py-2">Timeline</th>
              <th className="border px-4 py-2">Due Date Status</th>
              <th className="border px-4 py-2">Priority</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">File Attachments</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, idx) => (
              <tr key={task.id || idx}>
                <td className="border px-4 py-2">{editIdx === idx ? (
                  <textarea name="title" value={editTask.title}
                    onChange={handleFormChange}
                    className="border border-black rounded px-2 py-1 w-full resize-none"
                    rows={2} style={{fontSize:'1rem'}}
                  />
                ) : (task.title)}</td>
                <td className="border px-4 py-2">{editIdx === idx ? (
                  <textarea name="description" value={editTask.description}
                    onChange={handleFormChange}
                    className="border border-black rounded px-2 py-1 w-full resize-none"
                    rows={2} style={{fontSize:'1rem'}}
                  />
                ) : (task.description)}</td>
                <td className="border px-4 py-2" style={{verticalAlign: "top"}}>
                  {editIdx === idx ? (
                    <textarea
                      name="members"
                      value={membersText}
                      onChange={handleEditMembers}
                      className="border border-black rounded px-2 py-1 w-full resize-none"
                      rows={2}
                      placeholder="Enter one member per line"
                      style={{fontSize:'1rem'}}
                    />
                  ) : renderMembers(task.members)}
                </td>
                <td className="border px-4 py-2">{editIdx === idx ? (
                  <div className="flex gap-2">
                    <input type="date" name="startDate" value={editTask.startDate?.substring(0,10) || ""} onChange={handleFormChange} className="border border-black rounded px-2 py-1" />
                    <span>-</span>
                    <input type="date" name="dueDate" value={editTask.dueDate?.substring(0,10) || ""} onChange={handleFormChange} className="border border-black rounded px-2 py-1" />
                  </div>
                ) : (
                  `${String(task.startDate).substring(0,10)} to ${String(task.dueDate).substring(0,10)}`
                )}</td>
                <td className="border px-4 py-2">{editIdx === idx ? (
                  <select name="dueStatus" value={editTask.dueStatus} onChange={handleFormChange} className="border border-black rounded px-2 py-1 w-full" style={{fontSize:'1rem'}}>
                    {dueStatusOptions.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                ) : (task.dueStatus)}</td>
                <td className="border px-4 py-2">{editIdx === idx ? (
                  <select name="priority" value={editTask.priority} onChange={handleFormChange} className="border border-black rounded px-2 py-1 w-full" style={{fontSize:'1rem'}}>
                    {priorityOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                ) : (task.priority)}</td>
                <td className="border px-4 py-2">{editIdx === idx ? (
                  <select name="status" value={editTask.status} onChange={handleFormChange} className="border border-black rounded px-2 py-1 w-full" style={{fontSize:'1rem'}}>
                    {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                ) : (task.status)}</td>
                {/* File Attachments */}
                <td className="border px-4 py-2">
                  {editIdx === idx ? (
                    <button
                      type="button"
                      className="text-blue-700 underline hover:text-blue-900 font-semibold"
                      onClick={() => openFileModal(idx)}
                    >
                      {editTask.file || "Upload/View File"}
                    </button>
                  ) : (
                    task.file && task.fileUrl ? (
                      <div className="flex flex-col gap-1">
                        <a
                          href={`http://localhost:5047${task.fileUrl}`}
                          className="text-blue-700 underline hover:text-blue-900 font-semibold text-sm"
                          download={task.file}
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            console.log('Attempting to download:', `http://localhost:5047${task.fileUrl}`);
                          }}
                        >
                          {task.file}
                        </a>
                        <button
                          onClick={() => handleFileDownload(task)}
                          
                        >
                          
                        </button>
                      </div>
                    ) : (<span className="text-gray-400">No file</span>)
                  )}
                </td>
                {/* Actions */}
                <td className="border px-4 py-2">
                  {editIdx === idx ? (
                    <div className="flex gap-2">
                      <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleSave(idx)}>Save</button>
                      <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={handleCancel}>Cancel</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button className="bg-yellow-400 px-2 py-1 rounded" onClick={() => handleEdit(idx)}>Edit</button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(idx)}>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {addingNew && (
              <tr>
                <td className="border px-4 py-2"><textarea name="title" value={editTask.title}
                  onChange={handleFormChange}
                  className="border border-black rounded px-2 py-1 w-full resize-none"
                  rows={2} style={{fontSize:'1rem'}}
                /></td>
                <td className="border px-4 py-2"><textarea name="description" value={editTask.description}
                  onChange={handleFormChange}
                  className="border border-black rounded px-2 py-1 w-full resize-none"
                  rows={2} style={{fontSize:'1rem'}}
                /></td>
                <td className="border px-4 py-2">
                  <textarea
                    name="members"
                    value={editTask.members?.join("\n") || ""}
                    onChange={handleEditMembers}
                    className="border border-black rounded px-2 py-1 w-full resize-none"
                    rows={2}
                    placeholder="Enter one member per line"
                    style={{fontSize:'1rem'}}
                  />
                </td>
                <td className="border px-4 py-2">
                  <div className="flex gap-2">
                    <input type="date" name="startDate" value={editTask.startDate} onChange={handleFormChange} className="border border-black rounded px-2 py-1" />
                    <span>-</span>
                    <input type="date" name="dueDate" value={editTask.dueDate} onChange={handleFormChange} className="border border-black rounded px-2 py-1" />
                  </div>
                </td>
                <td className="border px-4 py-2">
                  <select name="dueStatus" value={editTask.dueStatus} onChange={handleFormChange} className="border border-black rounded px-2 py-1 w-full" style={{fontSize:'1rem'}}>
                    {dueStatusOptions.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <select name="priority" value={editTask.priority} onChange={handleFormChange} className="border border-black rounded px-2 py-1 w-full" style={{fontSize:'1rem'}}>
                    {priorityOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <select name="status" value={editTask.status} onChange={handleFormChange} className="border border-black rounded px-2 py-1 w-full" style={{fontSize:'1rem'}}>
                    {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <button
                    type="button"
                    className="text-blue-700 underline hover:text-blue-900 font-semibold"
                    onClick={() => openFileModal("addingNew")}
                  >
                    {editTask.file || "Upload/View File"}
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex gap-2">
                    <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleSave(tasks.length)}>Add</button>
                    <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={handleCancel}>Cancel</button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <FilePickerModal
          open={showFileModal}
          onClose={closeFileModal}
          file={modalFile}
          saveAs={modalSaveAs}
          onFileChange={handleModalFileChange}
          onSaveAsChange={handleModalSaveAsChange}
          onUpload={handleModalUpload}
          onRemoveFile={handleModalRemoveFile}
        />
      </div>
    </div>
  );
}
