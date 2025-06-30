// import React, { useState, useEffect } from "react";
// import { fetchUsers, addUser, editUser, deleteUser } from "../API/UserAPI";

// const roleOptions = ["Admin", "ProjectManager", "Contributor"];

// export default function UserManagement() {
//   const [users, setUsers] = useState([]);
//   const [editUserId, setEditUserId] = useState(null);
//   const [editUserForm, setEditUserForm] = useState({ username: "", role: roleOptions[0] });
//   const [addMode, setAddMode] = useState(false);
//   const [newUser, setNewUser] = useState({ username: "", password: "", role: roleOptions[0] });
//   const [error, setError] = useState("");

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   const loadUsers = async () => {
//     try {
//       const data = await fetchUsers();
//       setUsers(data);
//     } catch (err) {
//       setError("Failed to fetch users." + (err.response?.data || err.message));
//     }
//   };

//   // Add User Handlers
//   const handleAddChange = (e) => {
//     const { name, value } = e.target;
//     setNewUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddUser = async () => {
//     setError("");
//     if (!newUser.username || !newUser.password) {
//       setError("Username and password are required.");
//       return;
//     }
//     try {
//       // Auto-increment userId (find max and add 1, or 1 if none)
//       const nextUserId = users.length > 0 ? Math.max(...users.map(u => u.userId)) + 1 : 1;
//       await addUser({
//         userId: nextUserId,
//         username: newUser.username,
//         password: newUser.password,
//         role: newUser.role,
//       });
//       setNewUser({ username: "", password: "", role: roleOptions[0] });
//       setAddMode(false);
//       await loadUsers();
//     } catch (err) {
//       setError("Failed to add user.");
//     }
//   };

//   // Edit User Handlers
//   const handleEditClick = (user) => {
//     setEditUserId(user.userId);
//     setEditUserForm({ username: user.username, role: user.role });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditUserForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditSave = async (userId) => {
//     setError("");
//     try {
//       await editUser(userId, {
//         username: editUserForm.username,
//         role: editUserForm.role,
//       });
//       setEditUserId(null);
//       setEditUserForm({ username: "", role: roleOptions[0] });
//       await loadUsers();
//     } catch (err) {
//       setError("Failed to update user: " + (err.response?.data || err.message));
//     }
//   };

//   const handleDelete = async (userId) => {
//     setError("");
//     try {
//       await deleteUser(userId);
//       setUsers(users.filter((u) => u.userId !== userId));
//     } catch (err) {
//       setError("Failed to delete user.");
//     }
//   };

//   const handleCancelAdd = () => {
//     setNewUser({ username: "", password: "", role: roleOptions[0] });
//     setAddMode(false);
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">User Management</h1>
//       {error && <div className="text-red-500 mb-2">{error}</div>}
//       <button
//         className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
//         onClick={() => setAddMode(true)}
//         disabled={addMode}
//       >
//         Add New User
//       </button>
//       <table className="min-w-full bg-white border">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">User ID</th>
//             <th className="border px-4 py-2">Username</th>
//             <th className="border px-4 py-2">Role</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {[...users].sort((a, b) => a.userId - b.userId).map((user) => (
//             <tr key={user.userId}>
//               <td className="border px-4 py-2">{user.userId}</td>
//               <td className="border px-4 py-2">
//                 {editUserId === user.userId ? (
//                   <input
//                     className="border px-2 py-1 rounded w-full"
//                     name="username"
//                     value={editUserForm.username}
//                     onChange={handleEditChange}
//                   />
//                 ) : (
//                   user.username
//                 )}
//               </td>
//               <td className="border px-4 py-2">
//                 {editUserId === user.userId ? (
//                   <select
//                     className="border px-2 py-1 rounded w-full"
//                     name="role"
//                     value={editUserForm.role}
//                     onChange={handleEditChange}
//                   >
//                     {roleOptions.map((role) => (
//                       <option key={role} value={role}>{role}</option>
//                     ))}
//                   </select>
//                 ) : (
//                   user.role
//                 )}
//               </td>
//               <td className="border px-4 py-2">
//                 {editUserId === user.userId ? (
//                   <>
//                     <button
//                       className="bg-green-500 text-white px-2 py-1 rounded mr-2"
//                       onClick={() => handleEditSave(Number(user.userId))}
//                     >
//                       Save
//                     </button>
//                     <button
//                       className="bg-gray-400 text-white px-2 py-1 rounded"
//                       onClick={() => setEditUserId(null)}
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       className="bg-yellow-400 px-2 py-1 rounded mr-2"
//                       onClick={() => handleEditClick(user)}
//                       disabled={addMode}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="bg-red-500 text-white px-2 py-1 rounded"
//                       onClick={() => handleDelete(user.userId)}
//                       disabled={addMode}
//                     >
//                       Delete
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//           {addMode && (
//             <tr>
//               <td className="border px-4 py-2">
//                 {users.length > 0 ? Math.max(...users.map(u => u.userId)) + 1 : 1}
//               </td>
//               <td className="border px-4 py-2">
//                 <input
//                   className="border px-2 py-1 rounded w-full"
//                   name="username"
//                   value={newUser.username}
//                   onChange={handleAddChange}
//                   placeholder="Username"
//                 />
//               </td>
//               <td className="border px-4 py-2">
//                 <select
//                   className="border px-2 py-1 rounded w-full"
//                   name="role"
//                   value={newUser.role}
//                   onChange={handleAddChange}
//                 >
//                   {roleOptions.map((role) => (
//                     <option key={role} value={role}>{role}</option>
//                   ))}
//                 </select>
//               </td>
//               <td className="border px-4 py-2 flex gap-2">
//                 <input
//                   className="border px-2 py-1 rounded w-full"
//                   name="password"
//                   type="password"
//                   value={newUser.password}
//                   onChange={handleAddChange}
//                   placeholder="Password"
//                 />
//                 <button
//                   className="bg-green-500 text-white px-2 py-1 rounded"
//                   onClick={handleAddUser}
//                 >
//                   Add
//                 </button>
//                 <button
//                   className="bg-gray-400 text-white px-2 py-1 rounded"
//                   onClick={handleCancelAdd}
//                 >
//                   Cancel
//                 </button>
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  fetchUsers,
  addUser,
  editUser,
  deleteUser,
  lockUser,
  unlockUser,
} from "../API/UserAPI";

const roleOptions = ["Admin", "ProjectManager", "Contributor"];

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editUserForm, setEditUserForm] = useState({ username: "", role: roleOptions[0] });
  const [addMode, setAddMode] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", password: "", role: roleOptions[0] });
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError("Failed to fetch users: " + (err.response?.data || err.message));
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    setError("");
    if (!newUser.username || !newUser.password) {
      setError("Username and password are required.");
      return;
    }
    try {
      const nextUserId = users.length > 0 ? Math.max(...users.map((u) => u.userId)) + 1 : 1;
      await addUser({
        userId: nextUserId,
        username: newUser.username,
        password: newUser.password,
        role: newUser.role,
      });
      setNewUser({ username: "", password: "", role: roleOptions[0] });
      setAddMode(false);
      await loadUsers();
    } catch (err) {
      setError("Failed to add user.");
    }
  };

  const handleEditClick = (user) => {
    setEditUserId(user.userId);
    setEditUserForm({ username: user.username, role: user.role });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (userId) => {
    setError("");
    try {
      await editUser(userId, {
        username: editUserForm.username,
        role: editUserForm.role,
      });
      setEditUserId(null);
      setEditUserForm({ username: "", role: roleOptions[0] });
      await loadUsers();
    } catch (err) {
      setError("Failed to update user: " + (err.response?.data || err.message));
    }
  };

  const handleDelete = async (userId) => {
    setError("");
    try {
      await deleteUser(userId);
      setUsers(users.filter((u) => u.userId !== userId));
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  const handleLock = async (userId) => {
    try {
      await lockUser(userId);
      await loadUsers();
    } catch (err) {
      setError("Failed to lock user.");
    }
  };

  const handleUnlock = async (userId) => {
    try {
      await unlockUser(userId);
      await loadUsers();
    } catch (err) {
      setError("Failed to unlock user.");
    }
  };

  const handleCancelAdd = () => {
    setNewUser({ username: "", password: "", role: roleOptions[0] });
    setAddMode(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setAddMode(true)}
        disabled={addMode}
      >
        Add New User
      </button>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">User ID</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...users].sort((a, b) => a.userId - b.userId).map((user) => (
            <tr key={user.userId} className={user.status === "Locked" ? "bg-gray-100" : ""}>
              <td className="border px-4 py-2">{user.userId}</td>
              <td className="border px-4 py-2">
                {editUserId === user.userId ? (
                  <input
                    className="border px-2 py-1 rounded w-full"
                    name="username"
                    value={editUserForm.username}
                    onChange={handleEditChange}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td className="border px-4 py-2">
                {editUserId === user.userId ? (
                  <select
                    className="border px-2 py-1 rounded w-full"
                    name="role"
                    value={editUserForm.role}
                    onChange={handleEditChange}
                  >
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td className="border px-4 py-2">{user.status}</td>
              <td className="border px-4 py-2 flex flex-wrap gap-2">
                {editUserId === user.userId ? (
                  <>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleEditSave(Number(user.userId))}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-400 text-white px-2 py-1 rounded"
                      onClick={() => setEditUserId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-yellow-400 px-2 py-1 rounded"
                      onClick={() => handleEditClick(user)}
                      disabled={addMode}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(user.userId)}
                      disabled={addMode}
                    >
                      Delete
                    </button>
                    {user.status === "Active" ? (
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded"
                        onClick={() => handleLock(user.userId)}
                      >
                        Lock
                      </button>
                    ) : (
                      <button
                        className="bg-green-600 text-white px-2 py-1 rounded"
                        onClick={() => handleUnlock(user.userId)}
                      >
                        Unlock
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
          {addMode && (
            <tr>
              <td className="border px-4 py-2">
                {users.length > 0 ? Math.max(...users.map((u) => u.userId)) + 1 : 1}
              </td>
              <td className="border px-4 py-2">
                <input
                  className="border px-2 py-1 rounded w-full"
                  name="username"
                  value={newUser.username}
                  onChange={handleAddChange}
                  placeholder="Username"
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
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border px-4 py-2">Active</td>
              <td className="border px-4 py-2 flex gap-2">
                <input
                  className="border px-2 py-1 rounded w-full"
                  name="password"
                  type="password"
                  value={newUser.password}
                  onChange={handleAddChange}
                  placeholder="Password"
                />
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
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
