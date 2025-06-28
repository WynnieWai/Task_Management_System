import React, { useState } from "react";

const statusOptions = ["Active", "Archived"];
const sampleManagers = ["manager", "admin"];
const dueStatusOptions = ["Overdue", "Done on time", "Done overdue"];

const initialProjects = [
  {
    title: "Project Alpha",
    goals: "Launch MVP",
    status: "Active",
    manager: "manager",
    startDate: "2025-06-01",
    dueDate: "2025-07-01",
    dueStatus: "Done on time",
    members: ["manager", "student"],
    tasks: ["Design UI", "Setup Backend"],
  },
  {
    title: "Project Beta",
    goals: "Expand features",
    status: "Archived",
    manager: "admin",
    startDate: "2025-05-01",
    dueDate: "2025-06-15",
    dueStatus: "Done overdue",
    members: ["manager", "contributor"],
    tasks: ["Write Docs", "Testing"],
  },
];

export default function ProjectManagement({ user }) {
  const [projects, setProjects] = useState(initialProjects);
  const [editIdx, setEditIdx] = useState(null);
  const [editProject, setEditProject] = useState(null);
  const [addingNew, setAddingNew] = useState(false);

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

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditProject({ ...projects[idx] });
    setAddingNew(false);
  };

  const handleSave = (idx) => {
    if (addingNew) {
      setProjects([...projects, editProject]);
      setAddingNew(false);
    } else {
      const updated = projects.map((p, i) => (i === idx ? editProject : p));
      setProjects(updated);
    }
    setEditIdx(null);
    setEditProject(null);
  };

  const handleCancel = () => {
    setEditIdx(null);
    setEditProject(null);
    setAddingNew(false);
  };

  const handleDelete = (idx) => {
    setProjects(projects.filter((_, i) => i !== idx));
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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Project Management</h1>

      {!isContributor && (
        <button
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleAddNew}
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
              <th className="border px-4 py-2">Due Date</th>
              <th className="border px-4 py-2">Project Members</th>
              <th className="border px-4 py-2">List of Tasks</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project, idx) => (
              <tr key={idx}>
                {editIdx === idx ? (
                  <>
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
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-4 py-2">{project.title}</td>
                    <td className="border px-4 py-2">{project.goals}</td>
                    <td className="border px-4 py-2">{project.status}</td>
                    {isAdmin && <td className="border px-4 py-2">{project.manager}</td>}
                    <td className="border px-4 py-2">
                      {project.startDate} - {project.dueDate}
                    </td>
                    <td className="border px-4 py-2">{project.dueStatus}</td>
                    <td className="border px-4 py-2">
                      <ul className="list-disc pl-4">
                        {project.members.map((m) => (
                          <li key={m}>{m}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="border px-4 py-2">
                      <ul className="list-disc pl-4">
                        {project.tasks.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="border px-4 py-2">
                      {(isAdmin || isManager) ? (
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
                      ) : (
                        <span className="text-gray-500">No actions</span>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}

            {addingNew && (
              <tr>
                <>
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
                </>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
