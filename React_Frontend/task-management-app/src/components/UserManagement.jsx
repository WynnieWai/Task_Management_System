import { useState, useEffect } from "react";
import { fetchUsers, addUser, editUser, deleteUser } from "../API/UserAPI";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: "", password: "", role: "Admin" });
  const [editingUserId, setEditingUserId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      setError("Error fetching users");
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Add user
  const handleAdd = async e => {
    e.preventDefault();
    setError("");
    if (!form.password) {
      setError("Password is required");
      return;
    }
    try {
      await addUser({
        username: form.username,
        password: form.password,
        role: form.role
      });
      setForm({ username: "", password: "", role: "Admin" });
      await loadUsers();
    } catch (error) {
      setError("Error saving user");
      console.error("Error saving user:", error);
    }
  };

  // Edit user
  const handleEditSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      await editUser(editingUserId, {
        username: form.username,
        role: form.role
      });
      setEditingUserId(null);
      setForm({ username: "", password: "", role: "Admin" });
      await loadUsers();
    } catch (error) {
      setError("Error updating user");
      console.error("Error updating user:", error);
    }
  };

  const handleEdit = user => {
    setEditingUserId(user.userId); // Use userId from backend
    setForm({ username: user.username, password: "", role: user.role });
  };

  const handleDelete = async userId => {
    setError("");
    try {
      await deleteUser(userId);
      setUsers(users.filter(u => u.userId !== userId));
    } catch (error) {
      setError("Error deleting user");
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={editingUserId ? handleEditSubmit : handleAdd} className="mb-4 flex gap-2">
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="border px-2 py-1"
        />
        {!editingUserId && (
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="border px-2 py-1"
          />
        )}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border px-2 py-1"
        >
          <option>Admin</option>
          <option>ProjectManager</option>
          <option>Contributor</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingUserId ? "Update" : "Add"}
        </button>
        {editingUserId && (
          <button
            type="button"
            onClick={() => {
              setEditingUserId(null);
              setForm({ username: "", password: "", role: "Admin" });
            }}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.userId}>
              <td className="border px-4 py-2">{u.username}</td>
              <td className="border px-4 py-2">{u.role}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-400 px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(u)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(u.userId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;