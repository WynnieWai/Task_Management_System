import React, { useState } from "react";

const initialTasks = [
  {
    title: "Design Login UI",
    description: "Create login page wireframe and UI components.",
    members: ["Alice", "Bob"],
    startDate: "2025-06-28",
    dueDate: "2025-07-02",
    dueStatus: "Done on time",
    priority: "High",
    status: "In Progress",
    file: "loginUI.png",
  },
  {
    title: "Setup Auth Backend",
    description: "Implement JWT auth and DB connection.",
    members: ["Charlie"],
    startDate: "2025-06-28",
    dueDate: "2025-07-02",
    dueStatus: "Overdue",
    priority: "Medium",
    status: "To-Do",
    file: "authAPI.js",
  },
];

const priorityOptions = ["High", "Medium", "Low"];
const statusOptions = ["To-Do", "In Progress", "Done"];
const dueStatusOptions = ["Done on time", "Overdue", "Done overdue"];

export default function TaskManagement() {
  const [tasks, setTasks] = useState(initialTasks);
  const [editIdx, setEditIdx] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [addingNew, setAddingNew] = useState(false);

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
      setTasks([...tasks, editTask]);
      setAddingNew(false);
    } else {
      const updated = tasks.map((t, i) => (i === idx ? editTask : t));
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

  const handleFileChange = (e) => {
    setEditTask((prev) => ({
      ...prev,
      file: e.target.files[0]?.name || "",
    }));
  };

  return (
    <div className="p-8">
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
              <tr key={idx}>
                <td className="border px-4 py-2">
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
                </td>
                <td className="border px-4 py-2">
                  {editIdx === idx ? (
                    <input
                      name="description"
                      value={editTask.description}
                      onChange={handleFormChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    task.description
                  )}
                </td>
                <td className="border px-4 py-2">
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
                <td className="border px-4 py-2">
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
                    `${task.startDate} to ${task.dueDate}`
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editIdx === idx ? (
                    <select
                      name="dueStatus"
                      value={editTask.dueStatus}
                      onChange={handleFormChange}
                      className="border px-2 py-1 rounded w-full"
                    >
                      {dueStatusOptions.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  ) : (
                    task.dueStatus
                  )}
                </td>
                <td className="border px-4 py-2">
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
                    task.priority
                  )}
                </td>
                <td className="border px-4 py-2">
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
                    task.status
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editIdx === idx ? (
                    <input type="file" onChange={handleFileChange} />
                  ) : (
                    task.file
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editIdx === idx ? (
                    <div className="flex gap-2">
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => handleSave(idx)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-400 text-white px-2 py-1 rounded"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        className="bg-yellow-400 px-2 py-1 rounded"
                        onClick={() => handleEdit(idx)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDelete(idx)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {addingNew && (
              <tr>
                <td className="border px-4 py-2">
                  <input
                    name="title"
                    value={editTask.title}
                    onChange={handleFormChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    name="description"
                    value={editTask.description}
                    onChange={handleFormChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    name="members"
                    value={editTask.members.join(", ")}
                    onChange={handleEditMembers}
                    className="border px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="border px-4 py-2">
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
                <td className="border px-4 py-2">
                  <select
                    name="dueStatus"
                    value={editTask.dueStatus}
                    onChange={handleFormChange}
                    className="border px-2 py-1 rounded w-full"
                  >
                    {dueStatusOptions.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </td>
                <td className="border px-4 py-2">
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
                <td className="border px-4 py-2">
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
                <td className="border px-4 py-2">
                  <input type="file" onChange={handleFileChange} />
                </td>
                <td className="border px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleSave(tasks.length)}
                    >
                      Add
                    </button>
                    <button
                      className="bg-gray-400 text-white px-2 py-1 rounded"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
