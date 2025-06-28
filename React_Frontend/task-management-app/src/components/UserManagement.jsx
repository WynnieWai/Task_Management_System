import React, { useState } from "react";

const initialUsers = [
  { username: "admin", email: "admin@email.com", role: "Admin" },
  { username: "manager", email: "manager@email.com", role: "Project Manager" },
  { username: "student", email: "student@email.com", role: "Contributor" },
];

const roleOptions = ["Admin", "Project Manager", "Contributor"];

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [editIndex, setEditIndex] = useState(null);
  const [editUser, setEditUser] = useState({ username: "", email: "", role: roleOptions[0] });
  const [addMode, setAddMode] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", email: "", role: roleOptions[0] });

  const handleEdit = (idx) => {
    setEditIndex(idx);
    setEditUser(users[idx]);
  };

  const handleDelete = (idx) => {
    setUsers(users.filter((_, i) => i !== idx));
    if (editIndex === idx) setEditIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (idx) => {
    const updated = users.map((user, i) => (i === idx ? editUser : user));
    setUsers(updated);
    setEditIndex(null);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = () => {
    if (!newUser.username || !newUser.email) return;
    setUsers([...users, newUser]);
    setNewUser({ username: "", email: "", role: roleOptions[0] });
    setAddMode(false);
  };

  const handleCancelAdd = () => {
    setNewUser({ username: "", email: "", role: roleOptions[0] });
    setAddMode(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setAddMode(true)}
      >
        Add New User
      </button>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx}>
              <td className="border px-4 py-2">
                {editIndex === idx ? (
                  <input
                    className="border px-2 py-1 rounded w-full"
                    name="username"
                    value={editUser.username}
                    onChange={handleChange}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td className="border px-4 py-2">
                {editIndex === idx ? (
                  <input
                    className="border px-2 py-1 rounded w-full"
                    name="email"
                    value={editUser.email}
                    onChange={handleChange}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="border px-4 py-2">
                {editIndex === idx ? (
                  <select
                    className="border px-2 py-1 rounded w-full"
                    name="role"
                    value={editUser.role}
                    onChange={handleChange}
                  >
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td className="border px-4 py-2">
                {editIndex === idx ? (
                  <>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleSave(idx)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-400 text-white px-2 py-1 rounded"
                      onClick={() => setEditIndex(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-yellow-400 px-2 py-1 rounded mr-2"
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
              </td>
            </tr>
          ))}

          {addMode && (
            <tr>
              <td className="border px-4 py-2">
                <input
                  className="border px-2 py-1 rounded w-full"
                  name="username"
                  value={newUser.username}
                  onChange={handleAddChange}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  className="border px-2 py-1 rounded w-full"
                  name="email"
                  value={newUser.email}
                  onChange={handleAddChange}
                />
              </td>
              <td className="border px-4 py-2">
                <select
                  className="border px-2 py-1 rounded w-full"
                  name="role"
                  value={newUser.role}
                  onChange={handleAddChange}
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  onClick={handleAddUser}
                >
                  Add
                </button>
                <button
                  className="bg-gray-400 text-white px-2 py-1 rounded"
                  onClick={handleCancelAdd}
                >
                  Cancel
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
