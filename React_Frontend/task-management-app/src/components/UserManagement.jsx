// import React, { useState } from "react";

// const initialUsers = [
//   { username: "admin", email: "admin@email.com", role: "Admin" },
//   { username: "manager", email: "manager@email.com", role: "Project Manager" },
//   { username: "student", email: "student@email.com", role: "Contributor" },
// ];

// const roleOptions = ["Admin", "Project Manager", "Contributor"];

// export default function UserManagement() {
//   const [users, setUsers] = useState(initialUsers);
//   const [editIndex, setEditIndex] = useState(null);
//   const [editUser, setEditUser] = useState({ username: "", email: "", role: roleOptions[0] });
//   const [addMode, setAddMode] = useState(false);
//   const [newUser, setNewUser] = useState({ username: "", email: "", role: roleOptions[0] });

//   const handleEdit = (idx) => {
//     setEditIndex(idx);
//     setEditUser(users[idx]);
//   };

//   const handleDelete = (idx) => {
//     setUsers(users.filter((_, i) => i !== idx));
//     if (editIndex === idx) setEditIndex(null);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = (idx) => {
//     const updated = users.map((user, i) => (i === idx ? editUser : user));
//     setUsers(updated);
//     setEditIndex(null);
//   };

//   const handleAddChange = (e) => {
//     const { name, value } = e.target;
//     setNewUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddUser = () => {
//     if (!newUser.username || !newUser.email) return;
//     setUsers([...users, newUser]);
//     setNewUser({ username: "", email: "", role: roleOptions[0] });
//     setAddMode(false);
//   };

//   const handleCancelAdd = () => {
//     setNewUser({ username: "", email: "", role: roleOptions[0] });
//     setAddMode(false);
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">User Management</h1>
//       <button
//         className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
//         onClick={() => setAddMode(true)}
//       >
//         Add New User
//       </button>

//       <table className="min-w-full bg-white border">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Username</th>
//             <th className="border px-4 py-2">Email</th>
//             <th className="border px-4 py-2">Role</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, idx) => (
//             <tr key={idx}>
//               <td className="border px-4 py-2">
//                 {editIndex === idx ? (
//                   <input
//                     className="border px-2 py-1 rounded w-full"
//                     name="username"
//                     value={editUser.username}
//                     onChange={handleChange}
//                   />
//                 ) : (
//                   user.username
//                 )}
//               </td>
//               <td className="border px-4 py-2">
//                 {editIndex === idx ? (
//                   <input
//                     className="border px-2 py-1 rounded w-full"
//                     name="email"
//                     value={editUser.email}
//                     onChange={handleChange}
//                   />
//                 ) : (
//                   user.email
//                 )}
//               </td>
//               <td className="border px-4 py-2">
//                 {editIndex === idx ? (
//                   <select
//                     className="border px-2 py-1 rounded w-full"
//                     name="role"
//                     value={editUser.role}
//                     onChange={handleChange}
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
//                 {editIndex === idx ? (
//                   <>
//                     <button
//                       className="bg-green-500 text-white px-2 py-1 rounded mr-2"
//                       onClick={() => handleSave(idx)}
//                     >
//                       Save
//                     </button>
//                     <button
//                       className="bg-gray-400 text-white px-2 py-1 rounded"
//                       onClick={() => setEditIndex(null)}
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       className="bg-yellow-400 px-2 py-1 rounded mr-2"
//                       onClick={() => handleEdit(idx)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="bg-red-500 text-white px-2 py-1 rounded"
//                       onClick={() => handleDelete(idx)}
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
//                 <input
//                   className="border px-2 py-1 rounded w-full"
//                   name="username"
//                   value={newUser.username}
//                   onChange={handleAddChange}
//                 />
//               </td>
//               <td className="border px-4 py-2">
//                 <input
//                   className="border px-2 py-1 rounded w-full"
//                   name="email"
//                   value={newUser.email}
//                   onChange={handleAddChange}
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
//               <td className="border px-4 py-2">
//                 <button
//                   className="bg-green-500 text-white px-2 py-1 rounded mr-2"
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

// import React, { useState, useEffect } from "react";
// import { fetchUsers, addUser, editUser, deleteUser } from "../API/UserAPI";

// const roleOptions = ["Admin", "ProjectManager", "Contributor"];

// export default function UserManagement() {
//   const [users, setUsers] = useState([]);
//   const [addForm, setAddForm] = useState({ username: "", password: "", role: roleOptions[0] });
//   const [editForm, setEditForm] = useState({ username: "", role: roleOptions[0] });
//   const [editingUserId, setEditingUserId] = useState(null);
//   const [error, setError] = useState("");
//   const [addMode, setAddMode] = useState(false);

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   const loadUsers = async () => {
//     try {
//       const data = await fetchUsers();
//       setUsers(data);
//     } catch (err) {
//       setError("Failed to fetch users.");
//     }
//   };

//   // Add User Handlers
//   const handleAddChange = (e) => {
//     const { name, value } = e.target;
//     setAddForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddUser = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (!addForm.username || !addForm.password) {
//       setError("Username and password are required.");
//       return;
//     }
//     try {
//       await addUser({
//         username: addForm.username,
//         password: addForm.password,
//         role: addForm.role,
//       });
//       setAddForm({ username: "", password: "", role: roleOptions[0] });
//       setAddMode(false);
//       loadUsers();
//     } catch (err) {
//       setError("Failed to add user.");
//     }
//   };

//   // Edit User Handlers
//   const handleEditClick = (user) => {
//     setEditingUserId(user.userId);
//     setEditForm({ username: user.username, role: user.role });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditSave = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await editUser(editingUserId, {
//         username: editForm.username,
//         role: editForm.role,
//       });
//       setEditingUserId(null);
//       setEditForm({ username: "", role: roleOptions[0] });
//       loadUsers();
//     } catch (err) {
//       setError("Failed to update user.");
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

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">User Management</h1>
//       {error && <div className="text-red-500 mb-2">{error}</div>}

//       {/* Add User Form */}
//       {addMode ? (
//         <form onSubmit={handleAddUser} className="mb-4 flex gap-2">
//           <input
//             className="border px-2 py-1"
//             name="username"
//             placeholder="Username"
//             value={addForm.username}
//             onChange={handleAddChange}
//             required
//           />
//           <input
//             className="border px-2 py-1"
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={addForm.password}
//             onChange={handleAddChange}
//             required
//           />
//           <select
//             className="border px-2 py-1"
//             name="role"
//             value={addForm.role}
//             onChange={handleAddChange}
//           >
//             {roleOptions.map((role) => (
//               <option key={role} value={role}>{role}</option>
//             ))}
//           </select>
//           <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
//             Add
//           </button>
//           <button
//             type="button"
//             className="bg-gray-400 text-white px-4 py-2 rounded"
//             onClick={() => {
//               setAddMode(false);
//               setAddForm({ username: "", password: "", role: roleOptions[0] });
//             }}
//           >
//             Cancel
//           </button>
//         </form>
//       ) : (
//         <button
//           className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
//           onClick={() => setAddMode(true)}
//         >
//           Add New User
//         </button>
//       )}

//       {/* Edit User Form */}
//       {editingUserId && (
//         <form onSubmit={handleEditSave} className="mb-4 flex gap-2 bg-gray-100 p-2 rounded">
//           <input
//             className="border px-2 py-1"
//             name="username"
//             placeholder="Username"
//             value={editForm.username}
//             onChange={handleEditChange}
//             required
//           />
//           <select
//             className="border px-2 py-1"
//             name="role"
//             value={editForm.role}
//             onChange={handleEditChange}
//           >
//             {roleOptions.map((role) => (
//               <option key={role} value={role}>{role}</option>
//             ))}
//           </select>
//           <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded">
//             Save
//           </button>
//           <button
//             type="button"
//             className="bg-gray-400 text-white px-4 py-2 rounded"
//             onClick={() => {
//               setEditingUserId(null);
//               setEditForm({ username: "", role: roleOptions[0] });
//             }}
//           >
//             Cancel
//           </button>
//         </form>
//       )}

//       <table className="min-w-full bg-white border">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Username</th>
//             <th className="border px-4 py-2">Role</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.userId}>
//               <td className="border px-4 py-2">{user.username}</td>
//               <td className="border px-4 py-2">{user.role}</td>
//               <td className="border px-4 py-2">
//                 <button
//                   className="bg-yellow-400 px-2 py-1 rounded mr-2"
//                   onClick={() => handleEditClick(user)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                   onClick={() => handleDelete(user.userId)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { fetchUsers, addUser, editUser, deleteUser } from "../API/UserAPI";

// const roleOptions = ["Admin", "ProjectManager", "Contributor"];

// export default function UserManagement() {
//   const [users, setUsers] = useState([]);
//   const [addForm, setAddForm] = useState({
//     userId: "",
//     username: "",
//     password: "",
//     role: roleOptions[0],
//   });
//   const [editForm, setEditForm] = useState({
//     userId: "",
//     username: "",
//     role: roleOptions[0],
//   });
//   const [editingUserId, setEditingUserId] = useState(null);
//   const [error, setError] = useState("");
//   const [addMode, setAddMode] = useState(false);

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   const loadUsers = async () => {
//     try {
//       const data = await fetchUsers();
//       setUsers(data);
//     } catch (err) {
//       setError("Failed to fetch users.");
//     }
//   };

//   // Add User Handlers
//   const handleAddChange = (e) => {
//     const { name, value } = e.target;
//     setAddForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddUser = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (!addForm.username || !addForm.password || !addForm.userId) {
//       setError("UserId, Username and Password are required.");
//       return;
//     }
//     try {
//       await addUser({
//         userId: parseInt(addForm.userId, 10),
//         username: addForm.username,
//         password: addForm.password,
//         role: addForm.role,
//       });
//       setAddForm({ userId: "", username: "", password: "", role: roleOptions[0] });
//       setAddMode(false);
//       await loadUsers();
//     } catch (err) {
//       setError("Failed to add user.");
//     }
//   };

//   // Edit User Handlers
//   const handleEditClick = (user) => {
//     setEditingUserId(user.userId);
//     setEditForm({
//       userId: user.userId,
//       username: user.username,
//       role: user.role,
//     });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditSave = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await editUser(editForm.userId, {
//         username: editForm.username,
//         role: editForm.role,
//       });
//       setEditingUserId(null);
//       setEditForm({ userId: "", username: "", role: roleOptions[0] });
//       await loadUsers();
//     } catch (err) {
//       setError("Failed to update user.");
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

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">User Management</h1>
//       {error && <div className="text-red-500 mb-2">{error}</div>}

//       {/* Add User Form */}
//       {addMode ? (
//         <form onSubmit={handleAddUser} className="mb-4 flex gap-2">
//           <input
//             className="border px-2 py-1"
//             name="userId"
//             type="number"
//             placeholder="User ID"
//             value={addForm.userId}
//             onChange={handleAddChange}
//             required
//           />
//           <input
//             className="border px-2 py-1"
//             name="username"
//             placeholder="Username"
//             value={addForm.username}
//             onChange={handleAddChange}
//             required
//           />
//           <input
//             className="border px-2 py-1"
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={addForm.password}
//             onChange={handleAddChange}
//             required
//           />
//           <select
//             className="border px-2 py-1"
//             name="role"
//             value={addForm.role}
//             onChange={handleAddChange}
//           >
//             {roleOptions.map((role) => (
//               <option key={role} value={role}>{role}</option>
//             ))}
//           </select>
//           <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
//             Add
//           </button>
//           <button
//             type="button"
//             className="bg-gray-400 text-white px-4 py-2 rounded"
//             onClick={() => {
//               setAddMode(false);
//               setAddForm({ userId: "", username: "", password: "", role: roleOptions[0] });
//             }}
//           >
//             Cancel
//           </button>
//         </form>
//       ) : (
//         <button
//           className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
//           onClick={() => setAddMode(true)}
//         >
//           Add New User
//         </button>
//       )}

//       {/* Edit User Form */}
//       {editingUserId !== null && (
//         <form onSubmit={handleEditSave} className="mb-4 flex gap-2 bg-gray-100 p-2 rounded">
//           <input
//             className="border px-2 py-1"
//             name="userId"
//             type="number"
//             value={editForm.userId}
//             disabled
//             style={{ background: "#e5e7eb" }}
//           />
//           <input
//             className="border px-2 py-1"
//             name="username"
//             placeholder="Username"
//             value={editForm.username}
//             onChange={handleEditChange}
//             required
//           />
//           <select
//             className="border px-2 py-1"
//             name="role"
//             value={editForm.role}
//             onChange={handleEditChange}
//           >
//             {roleOptions.map((role) => (
//               <option key={role} value={role}>{role}</option>
//             ))}
//           </select>
//           <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded">
//             Save
//           </button>
//           <button
//             type="button"
//             className="bg-gray-400 text-white px-4 py-2 rounded"
//             onClick={() => {
//               setEditingUserId(null);
//               setEditForm({ userId: "", username: "", role: roleOptions[0] });
//             }}
//           >
//             Cancel
//           </button>
//         </form>
//       )}

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
//           {users.map((user) => (
//             <tr key={user.userId}>
//               <td className="border px-4 py-2">{user.userId}</td>
//               <td className="border px-4 py-2">{user.username}</td>
//               <td className="border px-4 py-2">{user.role}</td>
//               <td className="border px-4 py-2">
//                 <button
//                   className="bg-yellow-400 px-2 py-1 rounded mr-2"
//                   onClick={() => handleEditClick(user)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                   onClick={() => handleDelete(user.userId)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

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
//       setError("Failed to fetch users.");
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
//                     value={editUser.username}
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
//                     value={editUser.role}
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
import { fetchUsers, addUser, editUser, deleteUser } from "../API/UserAPI";

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
      setError("Failed to fetch users.");
    }
  };

  // Add User Handlers
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
      // Auto-increment userId (find max and add 1, or 1 if none)
      const nextUserId = users.length > 0 ? Math.max(...users.map(u => u.userId)) + 1 : 1;
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

  // Edit User Handlers
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
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...users].sort((a, b) => a.userId - b.userId).map((user) => (
            <tr key={user.userId}>
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
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td className="border px-4 py-2">
                {editUserId === user.userId ? (
                  <>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
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
                      className="bg-yellow-400 px-2 py-1 rounded mr-2"
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
                  </>
                )}
              </td>
            </tr>
          ))}
          {addMode && (
            <tr>
              <td className="border px-4 py-2">
                {users.length > 0 ? Math.max(...users.map(u => u.userId)) + 1 : 1}
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
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </td>
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