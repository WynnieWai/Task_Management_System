import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const statusOptions = ["Active", "Archived"];
const sampleManagers = ["manager", "admin"];
const dueStatusOptions = ["Overdue", "Done on time", "Done overdue"];

export default function ProjectManagement({ user }) {
  const [projects, setProjects] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editProject, setEditProject] = useState(null);
  const [addingNew, setAddingNew] = useState(false);

  // ---- Load projects from backend on mount ----
  useEffect(() => {
    axios
      .get("http://localhost:5047/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => alert("Failed to load projects: " + err));
  }, []);

  const isAdmin = user && user.role.toLowerCase() === "admin";
  const isManager = user && user.role.toLowerCase() === "manager";
  const isContributor = user && user.role.toLowerCase() === "contributor";

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditMembers = (e) => {
    setEditProject((prev) => ({
      ...prev,
      members: e.target.value.split(",").map((m) => m.trim()).filter(Boolean),
    }));
  };

  const handleEditTasks = (e) => {
    setEditProject((prev) => ({
      ...prev,
      tasks: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
    }));
  };

  // ---- Edit Project ----
  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditProject({ ...projects[idx] });
    setAddingNew(false);
  };

  // ---- Add/Edit Save ----
  const handleSave = (idx) => {
    if (addingNew) {
      // Add new project
      axios
        .post("http://localhost:5047/api/projects", editProject)
        .then((res) => setProjects([...projects, res.data]))
        .catch((err) => alert("Failed to add project: " + err));
      setAddingNew(false);
    } else {
      // Update project
      const projectId = projects[editIdx].id;
      axios
        .put(`http://localhost:5047/api/projects/${projectId}`, editProject)
        .then(() => {
          // Update local state
          const updated = projects.map((p, i) =>
            i === editIdx ? { ...editProject, id: projectId } : p
          );
          setProjects(updated);
        })
        .catch((err) => alert("Failed to update project: " + err));
    }
    setEditIdx(null);
    setEditProject(null);
  };

  const handleCancel = () => {
    setEditIdx(null);
    setEditProject(null);
    setAddingNew(false);
  };

  // ---- Delete ----
  const handleDelete = (idx) => {
    const projectId = projects[idx].id;
    axios
      .delete(`http://localhost:5047/api/projects/${projectId}`)
      .then(() => setProjects(projects.filter((_, i) => i !== idx)))
      .catch((err) => alert("Failed to delete project: " + err));
  };

  const handleAddNew = () => {
    setAddingNew(true);
    setEditProject({
      title: "",
      goals: "",
      status: statusOptions[0],
      manager: sampleManagers[0],
      startDate: "",
      dueDate: "",
      dueStatus: dueStatusOptions[0],
      members: [],
      tasks: [],
    });
  };

  // Utility: Convert to array if not already (for backend responses)
  const ensureArray = (val) =>
    Array.isArray(val)
      ? val
      : typeof val === "string"
      ? val.split(",").map((v) => v.trim()).filter(Boolean)
      : [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Project Management</h1>

      {!isContributor && (
        <button
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleAddNew}
          disabled={addingNew}
        >
          Create New Project
        </button>
      )}

      <div className="overflow-x-auto w-full">
        <table className="min-w-[1600px] bg-white border whitespace-nowrap">
          <thead>
            <tr>
              <th className="border px-4 py-2">Project Title</th>
              <th className="border px-4 py-2">Goals</th>
              <th className="border px-4 py-2">Status</th>
              {isAdmin && <th className="border px-4 py-2">Assigned Manager</th>}
              <th className="border px-4 py-2">Timeline</th>
              <th className="border px-4 py-2">Due Status</th>
              <th className="border px-4 py-2">Project Members</th>
              <th className="border px-4 py-2">List of Tasks</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, idx) => (
              <tr key={project.id || idx}>
                <td className="border px-4 py-2">
                  {editIdx === idx ? (
                    <input
                      className="border px-2 py-1 rounded w-full"
                      name="title"
                      value={editProject?.title ?? ""}
                      onChange={handleFormChange}
                    />
                  ) : (
                    <Link
                      to={`/tasks/${project.id || idx}`}
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {project.title}
                    </Link>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editIdx === idx ? (
                    <input
                      className="border px-2 py-1 rounded w-full"
                      name="goals"
                      value={editProject?.goals ?? ""}
                      onChange={handleFormChange}
                    />
                  ) : (
                    project.goals
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editIdx === idx ? (
                    <select
                      className="border px-2 py-1 rounded w-full"
                      name="status"
                      value={editProject?.status ?? statusOptions[0]}
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
                  <td className="border px-4 py-2">
                    {editIdx === idx ? (
                      <select
                        className="border px-2 py-1 rounded w-full"
                        name="manager"
                        value={editProject?.manager ?? sampleManagers[0]}
                        onChange={handleFormChange}
                      >
                        {sampleManagers.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    ) : (
                      project.manager
                    )}
                  </td>
                )}
                <td className="border px-4 py-2">
                  {editIdx === idx ? (
                    <div className="flex gap-2">
                      <input
                        type="date"
                        className="border px-2 py-1 rounded w-full"
                        name="startDate"
                        value={editProject?.startDate ?? ""}
                        onChange={handleFormChange}
                      />
                      <span>-</span>
                      <input
                        type="date"
                        className="border px-2 py-1 rounded w-full"
                        name="dueDate"
                        value={editProject?.dueDate ?? ""}
                        onChange={handleFormChange}
                      />
                    </div>
                  ) : (
                    `${project.startDate} - ${project.dueDate}`
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editIdx === idx ? (
                    <select
                      className="border px-2 py-1 rounded w-full"
                      name="dueStatus"
                      value={editProject?.dueStatus ?? dueStatusOptions[0]}
                      onChange={handleFormChange}
                    >
                      {dueStatusOptions.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  ) : (
                    project.dueStatus
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editIdx === idx ? (
                    <input
                      className="border px-2 py-1 rounded w-full"
                      name="members"
                      value={editProject?.members?.join(", ") ?? ""}
                      onChange={handleEditMembers}
                    />
                  ) : (
                    <ul className="list-disc pl-4">
                      {ensureArray(project.members).map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editIdx === idx ? (
                    <input
                      className="border px-2 py-1 rounded w-full"
                      name="tasks"
                      value={editProject?.tasks?.join(", ") ?? ""}
                      onChange={handleEditTasks}
                    />
                  ) : (
                    <ul className="list-disc pl-4">
                      {ensureArray(project.tasks).map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {(isAdmin || isManager) ? (
                    <div className="flex gap-2">
                      {editIdx === idx ? (
                        <>
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
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-500">No actions</span>
                  )}
                </td>
              </tr>
            ))}

            {addingNew && (
              <tr>
                <td className="border px-4 py-2">
                  <input
                    className="border px-2 py-1 rounded w-full"
                    name="title"
                    value={editProject.title}
                    onChange={handleFormChange}
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="border px-2 py-1 rounded w-full"
                    name="goals"
                    value={editProject.goals}
                    onChange={handleFormChange}
                  />
                </td>
                <td className="border px-4 py-2">
                  <select
                    className="border px-2 py-1 rounded w-full"
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
                  <td className="border px-4 py-2">
                    <select
                      className="border px-2 py-1 rounded w-full"
                      name="manager"
                      value={editProject.manager}
                      onChange={handleFormChange}
                    >
                      {sampleManagers.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </td>
                )}
                <td className="border px-4 py-2">
                  <div className="flex gap-2">
                    <input
                      type="date"
                      className="border px-2 py-1 rounded w-full"
                      name="startDate"
                      value={editProject.startDate}
                      onChange={handleFormChange}
                    />
                    <span>-</span>
                    <input
                      type="date"
                      className="border px-2 py-1 rounded w-full"
                      name="dueDate"
                      value={editProject.dueDate}
                      onChange={handleFormChange}
                    />
                  </div>
                </td>
                <td className="border px-4 py-2">
                  <select
                    className="border px-2 py-1 rounded w-full"
                    name="dueStatus"
                    value={editProject.dueStatus}
                    onChange={handleFormChange}
                  >
                    {dueStatusOptions.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="border px-2 py-1 rounded w-full"
                    name="members"
                    value={editProject.members.join(", ")}
                    onChange={handleEditMembers}
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="border px-2 py-1 rounded w-full"
                    name="tasks"
                    value={editProject.tasks.join(", ")}
                    onChange={handleEditTasks}
                  />
                </td>
                <td className="border px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleSave(projects.length)}
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
