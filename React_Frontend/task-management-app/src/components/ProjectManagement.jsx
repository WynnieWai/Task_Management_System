import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllProjects,
  getAllUsers,
  addProject,
  updateProject,
  deleteProject
} from "../API/ProjectAPI";

const statusOptions = ["Active", "Archived"];
const dueStatusOptions = ["Overdue", "Done on time", "Done overdue"];

export default function ProjectManagement({ user }) {
  const [projects, setProjects] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editProject, setEditProject] = useState(null);
  const [addingNew, setAddingNew] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
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
  }, []);

  const isAdmin = user && user.role.toLowerCase() === "admin";
  const isManager = user && user.role.toLowerCase() === "manager";
  const isContributor = user && user.role.toLowerCase() === "contributor";

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditTasks = (e) => {
    setEditProject((prev) => ({
      ...prev,
      tasks: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
    }));
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
    const payload = {
      ...editProject,
      members: editProject.members,
      tasks: editProject.tasks,
      startDate: editProject.startDate ? new Date(editProject.startDate).toISOString() : "",
      dueDate: editProject.dueDate ? new Date(editProject.dueDate).toISOString() : "",
    };

    if (addingNew) {
      addProject(payload)
        .then((newProject) => setProjects([...projects, newProject]))
        .catch((err) => alert("Failed to add project: " + err));
      setAddingNew(false);
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
  };

  const handleCancel = () => {
    setEditIdx(null);
    setEditProject(null);
    setAddingNew(false);
  };

  const handleDelete = (idx) => {
    const projectId = projects[idx].id;
    deleteProject(projectId)
      .then(() => setProjects(projects.filter((_, i) => i !== idx)))
      .catch((err) => alert("Failed to delete project: " + err));
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

  const handleMemberCheckboxChange = (e, username) => {
    const { checked } = e.target;
    setEditProject((prev) => {
      const members = prev.members || [];
      return {
        ...prev,
        members: checked
          ? [...members, username]
          : members.filter((m) => m !== username),
      };
    });
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
          ? "Project Management"
          : isManager
          ? "My Projects"
          : isContributor
          ? "My Projects"
          : "Project Management"}
      </h1>

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
              <th className="border px-4 py-2">Assigned Manager</th>
              <th className="border px-4 py-2">Timeline</th>
              <th className="border px-4 py-2">Due Status</th>
              <th className="border px-4 py-2">Project Members</th>
              <th className="border px-4 py-2">List of Tasks</th>
              {(isAdmin || isManager) && <th className="border px-4 py-2">Actions</th>}
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
                {(isAdmin || isManager || isContributor) && (
                  <td className="border px-4 py-2">
                    {editIdx === idx ? (
                      isAdmin ? (
                        <select
                          className="border px-2 py-1 rounded w-full"
                          name="manager"
                          value={editProject?.manager ?? ""}
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
                          value={editProject?.manager ?? ""}
                          disabled
                        />
                      )
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
                        value={editProject?.startDate?.substring(0, 10) ?? ""}
                        onChange={handleFormChange}
                      />
                      <span>-</span>
                      <input
                        type="date"
                        className="border px-2 py-1 rounded w-full"
                        name="dueDate"
                        value={editProject?.dueDate?.substring(0, 10) ?? ""}
                        onChange={handleFormChange}
                      />
                    </div>
                  ) : (
                    `${String(project.startDate).substring(0,10)} to ${String(project.dueDate).substring(0,10)}`
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
                    isAdmin || (isManager && editProject.manager === user.username) ? (
                      <div className="max-h-40 overflow-y-auto">
                        {allUsers.map((u) => (
                          <div key={u.userId} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`member-${idx}-${u.userId}`}
                              checked={editProject?.members?.includes(u.username) || false}
                              onChange={(e) => handleMemberCheckboxChange(e, u.username)}
                              className="mr-2"
                            />
                            <label htmlFor={`member-${idx}-${u.userId}`}>
                              {u.username} ({u.role})
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-500 italic">Editing not allowed</div>
                    )
                  ) : (
                    <div className="max-h-30 overflow-y-auto">
                      <ul className="list-disc pl-4">
                        {ensureArray(project.members).map((m) => (
                          <li key={m}>{m}</li>
                        ))}
                      </ul>
                    </div>
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
                {(isAdmin || isManager) && (
                  <td className="border px-4 py-2">
                    {(isAdmin || (isManager && project.manager === user.username)) ? (
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
                      <div className="text-gray-500 italic">No action is allowed</div>
                    )}
                  </td>
                )}
              
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
                {(isAdmin || isManager) && (
                  <td className="border px-4 py-2">
                    {isAdmin ? (
                      <select
                        className="border px-2 py-1 rounded w-full"
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
                        <label htmlFor={`new-member-${u.userId}`}>
                          {u.username} ({u.role})
                        </label>
                      </div>
                    ))}
                  </div>
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
