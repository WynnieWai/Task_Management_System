// import React, { useState, useEffect } from "react";
// import {
//   fetchUsers,
//   addUser,
//   editUser,
//   deleteUser,
//   lockUser,
//   unlockUser,
// } from "../API/UserAPI";

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
//       setError("Failed to fetch users: " + (err.response?.data || err.message));
//     }
//   };

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
//       const nextUserId = users.length > 0 ? Math.max(...users.map((u) => u.userId)) + 1 : 1;
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

//   const handleLock = async (userId) => {
//     try {
//       await lockUser(userId);
//       await loadUsers();
//     } catch (err) {
//       setError("Failed to lock user.");
//     }
//   };

//   const handleUnlock = async (userId) => {
//     try {
//       await unlockUser(userId);
//       await loadUsers();
//     } catch (err) {
//       setError("Failed to unlock user.");
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
//             <th className="border px-4 py-2">Status</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {[...users].sort((a, b) => a.userId - b.userId).map((user) => (
//             <tr key={user.userId} className={user.status === "Locked" ? "bg-gray-100" : ""}>
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
//                       <option key={role} value={role}>
//                         {role}
//                       </option>
//                     ))}
//                   </select>
//                 ) : (
//                   user.role
//                 )}
//               </td>
//               <td className="border px-4 py-2">{user.status}</td>
//               <td className="border px-4 py-2 flex flex-wrap gap-2">
//                 {editUserId === user.userId ? (
//                   <>
//                     <button
//                       className="bg-green-500 text-white px-2 py-1 rounded"
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
//                       className="bg-yellow-400 px-2 py-1 rounded"
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
//                     {user.status === "Active" ? (
//                       <button
//                         className="bg-red-600 text-white px-2 py-1 rounded"
//                         onClick={() => handleLock(user.userId)}
//                       >
//                         Lock
//                       </button>
//                     ) : (
//                       <button
//                         className="bg-green-600 text-white px-2 py-1 rounded"
//                         onClick={() => handleUnlock(user.userId)}
//                       >
//                         Unlock
//                       </button>
//                     )}
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//           {addMode && (
//             <tr>
//               <td className="border px-4 py-2">
//                 {users.length > 0 ? Math.max(...users.map((u) => u.userId)) + 1 : 1}
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
//                     <option key={role} value={role}>
//                       {role}
//                     </option>
//                   ))}
//                 </select>
//               </td>
//               <td className="border px-4 py-2">Active</td>
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


// import React, { useState } from "react";
// import { CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/solid';

// const initialUsers = [
//   { username: "admin", role: "Admin", locked: false },
//   { username: "manager", role: "Project Manager", locked: false },
//   { username: "student", role: "Contributor", locked: false },
// ];

// const roleOptions = ["Admin", "Project Manager", "Contributor"];

// export default function UserManagement() {
//   const [users, setUsers] = useState(initialUsers);
//   const [editIndex, setEditIndex] = useState(null);
//   const [editUser, setEditUser] = useState({ username: "", email: "", role: roleOptions[0] });
//   const [addMode, setAddMode] = useState(false);
//   const [newUser, setNewUser] = useState({ username: "", email: "", role: roleOptions[0] });
  
//   const [selected, setSelected] = useState([]);
//   const selectedAll = selected.length === users.length;

//   const handleSelect = (idx) => {
//     setSelected((prev) =>
//       prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedAll) setSelected([]);
//     else setSelected(users.map((_, i) => i));
//   };

//   const handleBulkDelete = () => {
//     const updated = users.filter((_, idx) => !selected.includes(idx));
//     setUsers(updated);
//     setSelected([]);
//   };

//   const handleBulkEdit = () => {
//     if (selected.length === 1) {
//       const idx = selected[0];
//       const selectedUser = users[idx];
//       if (selectedUser.locked) {
//         alert("This user is locked and cannot be edited.");
//         return;
//       }
//       setEditIndex(idx);
//       setEditUser({ ...selectedUser });
//     } else {
//       alert("Select only one user to edit.");
//     }
//   };

//   const handleBulkSave = () => {
//     console.log("Users saved:", users);
//     alert("Changes saved successfully.");
//     setSelected([]);
//     setEditIndex(null);         
//     setEditUser(null);     
//     setAddMode(false); 
//   };

//   const handleBulkLock = () => {
//     const updated = users.map((u, idx) =>
//       selected.includes(idx) ? { ...u, locked: true } : u
//     );
//     setUsers(updated);
//     setSelected([]);
//   };

//   const handleBulkUnlock = () => {
//     const updated = users.map((u, idx) =>
//       selected.includes(idx) ? { ...u, locked: false } : u
//     );
//     setUsers(updated);
//     setSelected([]);
//   };

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
//     if (!newUser.username) return;
//     setUsers([...users, newUser]);
//     setNewUser({ username: "", role: roleOptions[0] });
//     setAddMode(false);
//   };

//   const handleCancelAdd = () => {
//     setNewUser({ username: "", role: roleOptions[0] });
//     setAddMode(false);
//   };

//   const handleToggleLock = (idx) => {
//     setUsers(prev =>
//       prev.map((user, i) =>
//         i === idx ? { ...user, locked: !user.locked } : user
//       )
//     );
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">User Management</h1>
//       <button
//         className="mb-8 bg-mycustomblue text-white font-medium px-4 py-2 rounded"
//         onClick={() => setAddMode(true)}
//       >
//         Add New User
//       </button>

//       {/* Bulk action bar */}
//       {selected.length > 0 && (
//         <div className="bg-white border rounded mb-2 px-4 py-2 flex items-center justify-between shadow-sm">
//           <span className="text-xs text-gray-800">SELECTED: {selected.length}</span>
//           <div className="flex gap-2">
//             <button onClick={handleBulkEdit} className="bg-white hover:bg-gray-200 px-3 py-1 rounded text-xs">EDIT</button>
//             <button onClick={handleBulkDelete} className="bg-white hover:bg-gray-200 px-3 py-1 rounded text-xs">DELETE</button>
//             <button onClick={handleBulkLock} className="bg-white hover:bg-gray-200 px-3 py-1 rounded text-xs">LOCK</button>
//             <button onClick={handleBulkUnlock} className="bg-white hover:bg-gray-200 px-3 py-1 rounded text-xs">UNLOCK</button>
//             <button onClick={handleBulkSave} className="bg-white hover:bg-green-200 px-3 py-1 rounded text-xs">SAVE</button>
//           </div>
//         </div>
//       )}

//       <table className="min-w-full bg-white border">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2 text-left text-sm font-semibold">
//               <input 
//                 type="checkbox" 
//                 checked={selectedAll} 
//                 onChange={handleSelectAll} 
//               />
//             </th>
//             <th className="border px-4 py-2 text-left text-sm font-semibold">ID</th>
//             <th className="border px-4 py-2 text-left text-sm font-semibold">Username</th>
//             <th className="border px-4 py-2 text-left text-sm font-semibold">Role</th>
//             <th className="border px-4 py-2 text-left text-sm font-semibold">Status</th>
//             <th className="border px-4 py-2 text-left text-sm font-semibold">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, idx) => (
//             <tr key={idx} className={selected.includes(idx) ? "bg-green-50" : ""}>
//               <td className="border px-4 py-2 text-sm font-normal">
//                 <input
//                   type="checkbox"
//                   checked={selected.includes(idx)}
//                   onChange={() => handleSelect(idx)}
//                 />
//               </td>
//               <td className="border px-4 py-2 text-sm font-normal">{idx + 1}</td>
//               <td className="border px-4 py-2 text-sm font-normal">
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
//               <td className="border px-4 py-2 text-sm font-normal">
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
//               <td className="border px-4 py-2 text-sm font-normal">
//                 {user.locked ? (
//                   <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
//                     <LockClosedIcon className="h-4 w-4" />
//                     Locked
//                   </span>
//                 ) : (
//                   <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                     <CheckCircleIcon className="h-4 w-4" />
//                     Active
//                   </span>
//                 )}
//               </td>
//               <td className="border px-4 py-2 text-xs font-medium">
//                 {editIndex === idx ? (
//                   <>
//                     <button
//                       className="bg-green-500 text-white px-2 py-1 rounded mr-2"
//                       onClick={() => handleSave(idx)}
//                     >
//                       SAVE
//                     </button>
//                     <button
//                       className="bg-gray-400 text-white px-2 py-1 rounded"
//                       onClick={() => setEditIndex(null)}
//                     >
//                       CANCEL
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       className="bg-yellow-400 px-2 py-1 rounded mr-2"
//                       onClick={() => handleEdit(idx)}
//                       disabled={user.locked}
//                     >
//                       EDIT
//                     </button>
//                     <button
//                       className="bg-red-500 text-white px-2 py-1 rounded mr-2"
//                       onClick={() => handleDelete(idx)}
//                     >
//                       DELETE
//                     </button>
//                     <button
//                       className={`px-2 py-1 rounded text-white ${user.locked ? "bg-green-500" : "bg-gray-500"}`}
//                       onClick={() => handleToggleLock(idx)}
//                     >
//                       {user.locked ? "UNLOCK" : "LOCK"}
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}

//           {addMode && (
//             <tr className="bg-yellow-50">
//               <td className="border px-4 py-2 text-sm font-normal"></td> 
//               <td className="border px-4 py-2 text-sm font-normal">{users.length + 1}</td> 
//               <td className="border px-4 py-2 text-sm font-normal">
//                 <input
//                   className="border px-2 py-1 rounded w-full"
//                   name="username"
//                   value={newUser.username}
//                   onChange={handleAddChange}
//                 />
//               </td>
//               <td className="border px-4 py-2 text-sm font-normal">
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
//               <td className="border px-4 py-2 text-sm font-normal">
//                 <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                   <CheckCircleIcon className="h-4 w-4" />
//                   Active
//                 </span>
//               </td>
//               <td className="border px-4 py-2 text-xs font-medium">
//                 <button
//                   className="bg-green-500 text-white px-2 py-1 rounded mr-2"
//                   onClick={handleAddUser}
//                 >
//                   ADD
//                 </button>
//                 <button
//                   className="bg-gray-400 text-white px-2 py-1 rounded"
//                   onClick={handleCancelAdd}
//                 >
//                   CANCEL
//                 </button>
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }


// Integrate back end
// import React, { useState, useEffect } from "react";
// import { CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/solid';
// import {
//   fetchUsers,
//   addUser,
//   editUser,
//   deleteUser,
//   lockUser,
//   unlockUser,
// } from "../API/UserAPI";

// const roleOptions = ["Admin", "Project Manager", "Contributor"];

// export default function UserManagement() {
//   const [users, setUsers] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);
//   const [editUser, setEditUser] = useState({ username: "", role: roleOptions[0] });
//   const [addMode, setAddMode] = useState(false);
//   const [newUser, setNewUser] = useState({ 
//     username: "", 
//     password: "", 
//     role: roleOptions[0] 
//   });
//   const [error, setError] = useState("");
//   const [selected, setSelected] = useState([]);
//   const selectedAll = selected.length === users.length;

//   // Load users from API
//   useEffect(() => {
//     loadUsers();
//   }, []);

//   const loadUsers = async () => {
//     try {
//       const data = await fetchUsers();
//       // Sort users by UserId in ascending order
//       const sortedUsers = data.sort((a, b) => a.userId - b.userId);
//       setUsers(sortedUsers);
//     } catch (err) {
//       setError("Failed to fetch users: " + (err.response?.data || err.message));
//     }
//   };

//   const handleSelect = (idx) => {
//     setSelected((prev) =>
//       prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedAll) setSelected([]);
//     else setSelected(users.map((_, i) => i));
//   };

//   const handleBulkDelete = async () => {
//     try {
//       await Promise.all(
//         selected.map(idx => deleteUser(users[idx].userId))
//       );
//       await loadUsers();
//       setSelected([]);
//     } catch (err) {
//       setError("Failed to delete users: " + (err.response?.data || err.message));
//     }
//   };

//   const handleBulkEdit = () => {
//     if (selected.length === 1) {
//       const idx = selected[0];
//       const selectedUser = users[idx];
//       if (selectedUser.status === "Locked") {
//         alert("This user is locked and cannot be edited.");
//         return;
//       }
//       setEditIndex(idx);
//       setEditUser({ ...selectedUser });
//     } else {
//       alert("Select only one user to edit.");
//     }
//   };

//   const handleBulkLock = async () => {
//     try {
//       await Promise.all(
//         selected.map(idx => lockUser(users[idx].userId))
//       );
//       await loadUsers();
//       setSelected([]);
//     } catch (err) {
//       setError("Failed to lock users: " + (err.response?.data || err.message));
//     }
//   };

//   const handleBulkUnlock = async () => {
//     try {
//       await Promise.all(
//         selected.map(idx => unlockUser(users[idx].userId))
//       );
//       await loadUsers();
//       setSelected([]);
//     } catch (err) {
//       setError("Failed to unlock users: " + (err.response?.data || err.message));
//     }
//   };

//   const handleEdit = (idx) => {
//     setEditIndex(idx);
//     setEditUser(users[idx]);
//   };

//   const handleDelete = async (idx) => {
//     try {
//       await deleteUser(users[idx].userId);
//       await loadUsers();
//       if (editIndex === idx) setEditIndex(null);
//     } catch (err) {
//       setError("Failed to delete user: " + (err.response?.data || err.message));
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async (idx) => {
//     try {
//       await editUser(users[idx].userId, {
//         username: editUser.username,
//         role: editUser.role
//       });
//       await loadUsers();
//       setEditIndex(null);
//     } catch (err) {
//       setError("Failed to update user: " + (err.response?.data || err.message));
//     }
//   };

//   const handleAddChange = (e) => {
//     const { name, value } = e.target;
//     setNewUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddUser = async () => {
//     if (!newUser.username || !newUser.password) {
//       setError("Username and password are required");
//       return;
//     }
    
//     try {
//       await addUser({
//         username: newUser.username,
//         password: newUser.password,
//         role: newUser.role
//       });
//       setNewUser({ username: "", password: "", role: roleOptions[0] });
//       setAddMode(false);
//       await loadUsers();
//     } catch (err) {
//       setError("Failed to add user: " + (err.response?.data || err.message));
//     }
//   };

//   const handleCancelAdd = () => {
//     setNewUser({ username: "", password: "", role: roleOptions[0] });
//     setAddMode(false);
//   };

//   const handleToggleLock = async (idx) => {
//     const user = users[idx];
//     try {
//       if (user.status === "Active") {
//         await lockUser(user.userId);
//       } else {
//         await unlockUser(user.userId);
//       }
//       await loadUsers();
//     } catch (err) {
//       setError("Failed to toggle lock: " + (err.response?.data || err.message));
//     }
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">User Management</h1>
//       {error && <div className="text-red-500 mb-4">{error}</div>}
      
//       <button
//         className="mb-8 bg-mycustomblue text-white font-medium px-4 py-2 rounded"
//         onClick={() => setAddMode(true)}
//       >
//         Add New User
//       </button>

//       {/* Bulk action bar */}
//       {selected.length > 0 && (
//         <div className="bg-white border rounded mb-2 px-4 py-2 flex items-center justify-between shadow-sm">
//           <span className="text-xs text-gray-800">SELECTED: {selected.length}</span>
//           <div className="flex gap-2">
//             <button onClick={handleBulkEdit} className="bg-white hover:bg-gray-200 px-3 py-1 rounded text-xs">EDIT</button>
//             <button onClick={handleBulkDelete} className="bg-white hover:bg-gray-200 px-3 py-1 rounded text-xs">DELETE</button>
//             <button onClick={handleBulkLock} className="bg-white hover:bg-gray-200 px-3 py-1 rounded text-xs">LOCK</button>
//             <button onClick={handleBulkUnlock} className="bg-white hover:bg-gray-200 px-3 py-1 rounded text-xs">UNLOCK</button>
//           </div>
//         </div>
//       )}

//       <table className="min-w-full bg-white border">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2 text-left text-sm font-semibold">
//               <input 
//                 type="checkbox" 
//                 checked={selectedAll} 
//                 onChange={handleSelectAll} 
//               />
//             </th>
//             <th className="border px-4 py-2 text-left text-sm font-semibold">ID</th>
//             <th className="border px-4 py-2 text-left text-sm font-semibold">Username</th>
//             <th className="border px-4 py-2 text-left text-sm font-semibold">Role</th>
//             <th className="border px-4 py-2 text-left text-sm font-semibold">Status</th>
//             <th className="border px-4 py-2 text-left text-sm font-semibold">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, idx) => (
//             <tr key={idx} className={selected.includes(idx) ? "bg-green-50" : ""}>
//               <td className="border px-4 py-2 text-sm font-normal">
//                 <input
//                   type="checkbox"
//                   checked={selected.includes(idx)}
//                   onChange={() => handleSelect(idx)}
//                 />
//               </td>
//               <td className="border px-4 py-2 text-sm font-normal">{idx + 1}</td>
//               <td className="border px-4 py-2 text-sm font-normal">
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
//               <td className="border px-4 py-2 text-sm font-normal">
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
//               <td className="border px-4 py-2 text-sm font-normal">
//                 {user.status === "Locked" ? (
//                   <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
//                     <LockClosedIcon className="h-4 w-4" />
//                     Locked
//                   </span>
//                 ) : (
//                   <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                     <CheckCircleIcon className="h-4 w-4" />
//                     Active
//                   </span>
//                 )}
//               </td>
//               <td className="border px-4 py-2 text-xs font-medium">
//                 {editIndex === idx ? (
//                   <>
//                     <button
//                       className="bg-green-500 text-white px-2 py-1 rounded mr-2"
//                       onClick={() => handleSave(idx)}
//                     >
//                       SAVE
//                     </button>
//                     <button
//                       className="bg-gray-400 text-white px-2 py-1 rounded"
//                       onClick={() => setEditIndex(null)}
//                     >
//                       CANCEL
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       className="bg-yellow-400 px-2 py-1 rounded mr-2"
//                       onClick={() => handleEdit(idx)}
//                       disabled={user.status === "Locked"}
//                     >
//                       EDIT
//                     </button>
//                     <button
//                       className="bg-red-500 text-white px-2 py-1 rounded mr-2"
//                       onClick={() => handleDelete(idx)}
//                     >
//                       DELETE
//                     </button>
//                     <button
//                       className={`px-2 py-1 rounded text-white ${
//                         user.status === "Locked" ? "bg-green-500" : "bg-gray-500"
//                       }`}
//                       onClick={() => handleToggleLock(idx)}
//                     >
//                       {user.status === "Locked" ? "UNLOCK" : "LOCK"}
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}

//           {addMode && (
//             <tr className="bg-yellow-50">
//               <td className="border px-4 py-2 text-sm font-normal"></td>
//               <td className="border px-4 py-2 text-sm font-normal">{users.length + 1}</td>
//               <td className="border px-4 py-2 text-sm font-normal">
//                 <input
//                   className="border px-2 py-1 rounded w-full"
//                   name="username"
//                   value={newUser.username}
//                   onChange={handleAddChange}
//                   placeholder="Username"
//                 />
//               </td>
//               <td className="border px-4 py-2 text-sm font-normal">
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
//               <td className="border px-4 py-2 text-sm font-normal">
//                 <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                   <CheckCircleIcon className="h-4 w-4" />
//                   Active
//                 </span>
//               </td>
//               <td className="border px-4 py-2 text-xs font-medium">
//                 <input
//                   className="border px-2 py-1 rounded mr-2"
//                   name="password"
//                   type="password"
//                   value={newUser.password}
//                   onChange={handleAddChange}
//                   placeholder="Password"
//                 />
//                 <button
//                   className="bg-green-500 text-white px-2 py-1 rounded mr-2"
//                   onClick={handleAddUser}
//                 >
//                   ADD
//                 </button>
//                 <button
//                   className="bg-gray-400 text-white px-2 py-1 rounded"
//                   onClick={handleCancelAdd}
//                 >
//                   CANCEL
//                 </button>
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }


// Debugging
// import React, { useState, useEffect, useRef } from "react";
// import { CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/solid';
// import {
//   fetchUsers,
//   addUser,
//   editUser,
//   deleteUser,
//   lockUser,
//   unlockUser,
// } from "../API/UserAPI";

// const roleOptions = ["Contributor", "Manager", "Admin"];

// export default function UserManagement() {
//   const [users, setUsers] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);
//   const [editUserForm, setEditUserForm] = useState({ username: "", role: roleOptions[0] });
//   const [addMode, setAddMode] = useState(false);
//   const [newUser, setNewUser] = useState({ 
//     username: "", 
//     password: "", 
//     role: roleOptions[0] 
//   });
//   const [error, setError] = useState("");
//   const [selected, setSelected] = useState([]);
//   const selectedAll = selected.length === users.length;

//   const tableContainerRef = useRef(null);
//   const addRowRef = useRef(null);

//   // Load users from API
//   useEffect(() => {
//     loadUsers();
//   }, []);

//   useEffect(() => {
//     if (addMode && addRowRef.current) {
//       // Add a small timeout to ensure the row is rendered
//       setTimeout(() => {
//         addRowRef.current.scrollIntoView({
//           behavior: 'smooth',
//           block: 'nearest'
//         });
//       }, 50);
//     }
//   }, [addMode]);

//   const loadUsers = async () => {
//     try {
//       const data = await fetchUsers();
//       // Sort users by UserId in ascending order
//       const sortedUsers = data.sort((a, b) => a.userId - b.userId);
//       setUsers(sortedUsers);
//     } catch (err) {
//       setError("Failed to fetch users: " + (err.response?.data || err.message));
//     }
//   };

//   const handleSelect = (idx) => {
//     setSelected((prev) =>
//       prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedAll) setSelected([]);
//     else setSelected(users.map((_, i) => i));
//   };

//   const handleBulkDelete = async () => {
//     try {
//       await Promise.all(
//         selected.map(idx => deleteUser(users[idx].userId))
//       );
//       await loadUsers();
//       setSelected([]);
//     } catch (err) {
//       setError("Failed to delete users: " + (err.response?.data || err.message));
//     }
//   };

//   const handleBulkEdit = () => {
//     if (selected.length === 1) {
//       const idx = selected[0];
//       const selectedUser = users[idx];
//       if (selectedUser.status === "Locked") {
//         alert("This user is locked and cannot be edited.");
//         return;
//       }
//       setEditIndex(idx);
//       setEditUserForm({ ...selectedUser });
//     } else {
//       alert("Select only one user to edit.");
//     }
//   };

//   // const handleBulkLock = async () => {
//   //   try {
//   //     await Promise.all(
//   //       selected.map(idx => lockUser(users[idx].userId))
//   //     );
//   //     await loadUsers();
//   //     setSelected([]);
//   //   } catch (err) {
//   //     setError("Failed to lock users: " + (err.response?.data || err.message));
//   //   }
//   // };

//   // const handleBulkUnlock = async () => {
//   //   try {
//   //     await Promise.all(
//   //       selected.map(idx => unlockUser(users[idx].userId))
//   //     );
//   //     await loadUsers();
//   //     setSelected([]);
//   //   } catch (err) {
//   //     setError("Failed to unlock users: " + (err.response?.data || err.message));
//   //   }
//   // };

//   const handleBulkLock = async () => {
//     try {
//       await Promise.all(
//         selected.map(idx => lockUser(users[idx].userId))
//       );
//       await loadUsers();
//       // Add this line to trigger project reload in ProjectManagement
//       window.dispatchEvent(new Event('userStatusChanged'));
//       setSelected([]);
//     } catch (err) {
//       setError("Failed to lock users: " + (err.response?.data || err.message));
//     }
//   };

//   const handleBulkUnlock = async () => {
//     try {
//       await Promise.all(
//         selected.map(idx => unlockUser(users[idx].userId))
//       );
//       await loadUsers();
//       // Add this line to trigger project reload in ProjectManagement
//       window.dispatchEvent(new Event('userStatusChanged'));
//       setSelected([]);
//     } catch (err) {
//       setError("Failed to unlock users: " + (err.response?.data || err.message));
//     }
//   };

//   const handleEdit = (idx) => {
//     setEditIndex(idx);
//     setEditUserForm(users[idx]);
//   };

//   const handleDelete = async (idx) => {
//     try {
//       await deleteUser(users[idx].userId);
//       await loadUsers();
//       if (editIndex === idx) setEditIndex(null);
//     } catch (err) {
//       setError("Failed to delete user: " + (err.response?.data || err.message));
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditUserForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async (idx) => {
//     try {
//       await editUser(users[idx].userId, {
//         username: editUserForm.username,
//         role: editUserForm.role
//       });
//       await loadUsers();
//       setEditIndex(null);
//     } catch (err) {
//       setError("Failed to update user: " + (err.response?.data || err.message));
//     }
//   };

//   const handleAddChange = (e) => {
//     const { name, value } = e.target;
//     setNewUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddUser = async () => {
//     if (!newUser.username || !newUser.password) {
//       setError("Username and password are required");
//       return;
//     }
    
//     try {
//       await addUser({
//         username: newUser.username,
//         password: newUser.password,
//         role: newUser.role
//       });
//       setNewUser({ username: "", password: "", role: roleOptions[0] });
//       setAddMode(false);
//       await loadUsers();
//     } catch (err) {
//       setError("Failed to add user: " + (err.response?.data || err.message));
//     }
//   };

//   const handleCancelAdd = () => {
//     setNewUser({ username: "", password: "", role: roleOptions[0] });
//     setAddMode(false);
//   };

//   const handleToggleLock = async (idx) => {
//     const user = users[idx];
//     try {
//       if (user.status === "Active") {
//         await lockUser(user.userId);
//       } else {
//         await unlockUser(user.userId);
//       }
//       await loadUsers();
//     } catch (err) {
//       setError("Failed to toggle lock: " + (err.response?.data || err.message));
//     }
//   };

//   return (
//     <div className="p-8 flex flex-col h-[calc(100vh-4rem)]">
//       <div>
//         <h1 className="text-3xl font-bold mb-6">User Management</h1>
//         {error && <div className="text-red-500 mb-4">{error}</div>}
        
//         <button
//           className="mb-8 bg-mycustomblue text-white font-medium px-4 py-2 rounded"
//           onClick={() => setAddMode(true)}
//         >
//           Add New User
//         </button>
//       </div>
//       {/* Bulk action bar */}
//       {selected.length > 0 && (
//         <div className="bg-white border rounded mb-2 px-4 py-2 flex items-center justify-between shadow-sm">
//           <span className="text-xs text-gray-800">SELECTED: {selected.length}</span>
//           <div className="flex gap-2">
//             <button onClick={handleBulkEdit} className="bg-white hover:bg-gray-200 px-3 py-1 rounded text-xs">EDIT</button>
//             <button onClick={handleBulkDelete} className="bg-white hover:bg-gray-200 px-3 py-1 rounded text-xs">DELETE</button>
//             <button onClick={handleBulkLock} className="bg-white hover:bg-gray-200 px-3 py-1 rounded text-xs">LOCK</button>
//             <button onClick={handleBulkUnlock} className="bg-white hover:bg-gray-200 px-3 py-1 rounded text-xs">UNLOCK</button>
//           </div>
//         </div>
//       )}

//       <div className="flex-1 overflow-hidden"> {/* This creates the scrollable container */}
//         <div className="overflow-y-auto h-full">
//           <table className="w-full bg-white border whitespace-nowrap">
//             <thead className="sticky top-0 bg-white z-10">
//               <tr>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold w-12">
//                   <input 
//                     type="checkbox" 
//                     checked={selectedAll} 
//                     onChange={handleSelectAll} 
//                   />
//                 </th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold w-16">ID</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold min-w-[150px] max-w-[200px]">Username</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold min-w-[150px]">Role</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold w-32">Status</th>
//                 <th className="border px-4 py-2 text-left text-sm font-semibold min-w-[250px]">Actions</th>
//               </tr>
//             </thead>
//             <tbody> 
//               {users.map((user, idx) => (
//                 <tr key={idx} className={selected.includes(idx) ? "bg-green-50" : ""}>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     <input
//                       type="checkbox"
//                       checked={selected.includes(idx)}
//                       onChange={() => handleSelect(idx)}
//                     />
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">{idx + 1}</td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {editIndex === idx ? (
//                       <input
//                         className="border px-2 py-1 rounded w-full"
//                         name="username"
//                         value={editUserForm.username}
//                         onChange={handleChange}
//                       />
//                     ) : (
//                       user.username
//                     )}
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {editIndex === idx ? (
//                       <select
//                         className="border px-2 py-1 rounded w-full"
//                         name="role"
//                         value={editUserForm.role}
//                         onChange={handleChange}
//                       >
//                         {roleOptions.map((role) => (
//                           <option key={role} value={role}>{role}</option>
//                         ))}
//                       </select>
//                     ) : (
//                       user.role
//                     )}
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     {user.status === "Locked" ? (
//                       <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
//                         <LockClosedIcon className="h-4 w-4" />
//                         Locked
//                       </span>
//                     ) : (
//                       <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                         <CheckCircleIcon className="h-4 w-4" />
//                         Active
//                       </span>
//                     )}
//                   </td>
//                   <td className="border px-4 py-2 text-xs font-medium">
//                     {editIndex === idx ? (
//                       <>
//                         <button
//                           className="bg-green-500 text-white px-2 py-1 rounded mr-2"
//                           onClick={() => handleSave(idx)}
//                         >
//                           SAVE
//                         </button>
//                         <button
//                           className="bg-gray-400 text-white px-2 py-1 rounded"
//                           onClick={() => setEditIndex(null)}
//                         >
//                           CANCEL
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button
//                           className="bg-yellow-400 px-2 py-1 rounded mr-2"
//                           onClick={() => handleEdit(idx)}
//                           disabled={user.status === "Locked"}
//                         >
//                           EDIT
//                         </button>
//                         <button
//                           className="bg-red-500 text-white px-2 py-1 rounded mr-2"
//                           onClick={() => handleDelete(idx)}
//                         >
//                           DELETE
//                         </button>
//                         <button
//                           className={`px-2 py-1 rounded text-white ${
//                             user.status === "Locked" ? "bg-green-500" : "bg-gray-500"
//                           }`}
//                           onClick={() => handleToggleLock(idx)}
//                         >
//                           {user.status === "Locked" ? "UNLOCK" : "LOCK"}
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))}

//               {addMode && (
//                 <tr ref={addRowRef} className="bg-yellow-50">
//                   <td className="border px-4 py-2 text-sm font-normal"></td>
//                   <td className="border px-4 py-2 text-sm font-normal">{users.length + 1}</td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     <input
//                       className="border px-2 py-1 rounded w-full"
//                       name="username"
//                       value={newUser.username}
//                       onChange={handleAddChange}
//                       placeholder="Username"
//                     />
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     <select
//                       className="border px-2 py-1 rounded w-full"
//                       name="role"
//                       value={newUser.role}
//                       onChange={handleAddChange}
//                     >
//                       {roleOptions.map((role) => (
//                         <option key={role} value={role}>{role}</option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="border px-4 py-2 text-sm font-normal">
//                     <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                       <CheckCircleIcon className="h-4 w-4" />
//                       Active
//                     </span>
//                   </td>
//                   <td className="border px-4 py-2 text-xs font-medium">
//                     <input
//                       className="border px-2 py-1 rounded mr-2"
//                       name="password"
//                       type="password"
//                       value={newUser.password}
//                       onChange={handleAddChange}
//                       placeholder="Password"
//                     />
//                     <button
//                       className="bg-green-500 text-white px-2 py-1 rounded mr-2"
//                       onClick={handleAddUser}
//                     >
//                       ADD
//                     </button>
//                     <button
//                       className="bg-gray-400 text-white px-2 py-1 rounded"
//                       onClick={handleCancelAdd}
//                     >
//                       CANCEL
//                     </button>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//           </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import {
  fetchUsers,
  addUser,
  editUser,
  deleteUser,
  lockUser,
  unlockUser,
} from "../API/UserAPI";

const roleOptions = ["Contributor", "Manager", "Admin"];

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editUserForm, setEditUserForm] = useState({ username: "", role: roleOptions[0] });
  const [addMode, setAddMode] = useState(false);
  const [newUser, setNewUser] = useState({ 
    username: "", 
    password: "", 
    role: roleOptions[0] 
  });
  const [error, setError] = useState("");
  const [selected, setSelected] = useState([]);
  const selectedAll = selected.length === users.length;

  const tableContainerRef = useRef(null);
  const addRowRef = useRef(null);

  // Check if we should disable other actions (when in edit mode or add mode)
  const disableActions = editIndex !== null || addMode;
  const disableAddButton = editIndex !== null || selected.length > 0;

  // Load users from API
  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (addMode && addRowRef.current) {
      setTimeout(() => {
        addRowRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }, 50);
    }
  }, [addMode]);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      const sortedUsers = data.sort((a, b) => a.userId - b.userId);
      setUsers(sortedUsers);
    } catch (err) {
      setError("Failed to fetch users: " + (err.response?.data || err.message));
    }
  };

  // const handleSelect = (idx) => {
  //   setSelected((prev) =>
  //     prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
  //   );
  // };

  // const handleSelectAll = () => {
  //   if (selectedAll) setSelected([]);
  //   else setSelected(users.map((_, i) => i));
  // };

  // const handleSelect = (idx) => {
  //   if (editIndex !== null && editIndex === idx) return; // Disable selection for edited user
  //   setSelected((prev) =>
  //     prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
  //   );
  // };

  // const handleSelectAll = () => {
  //   if (editIndex !== null) return; // Disable select all during edit mode
  //   if (selectedAll) setSelected([]);
  //   else setSelected(users.map((_, i) => i));
  // };

  const handleSelect = (idx) => {
    if (disableActions) return; // Disable selection when in edit/add mode
    setSelected((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleSelectAll = () => {
    if (disableActions) return; // Disable select all when in edit/add mode
    if (selectedAll) setSelected([]);
    else setSelected(users.map((_, i) => i));
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selected.map(idx => deleteUser(users[idx].userId))
      );
      await loadUsers();
      setSelected([]);
    } catch (err) {
      setError("Failed to delete users: " + (err.response?.data || err.message));
    }
  };

  const handleBulkEdit = () => {
    if (selected.length === 1) {
      const idx = selected[0];
      const selectedUser = users[idx];
      if (selectedUser.status === "Locked") {
        alert("This user is locked and cannot be edited.");
        return;
      }
      setEditIndex(idx);
      setEditUserForm({ ...selectedUser });
    }
  };

  const handleBulkSave = async () => {
    try {
      await editUser(users[editIndex].userId, {
        username: editUserForm.username,
        role: editUserForm.role
      });
      await loadUsers();
      setEditIndex(null);
      setSelected([]);
    } catch (err) {
      setError("Failed to update user: " + (err.response?.data || err.message));
    }
  };

  const handleBulkCancel = () => {
    setEditIndex(null);
  };

  const handleBulkLock = async () => {
    try {
      await Promise.all(
        selected.map(idx => lockUser(users[idx].userId))
      );
      await loadUsers();
      window.dispatchEvent(new Event('userStatusChanged'));
      setSelected([]);
    } catch (err) {
      setError("Failed to lock users: " + (err.response?.data || err.message));
    }
  };

  const handleBulkUnlock = async () => {
    try {
      await Promise.all(
        selected.map(idx => unlockUser(users[idx].userId))
      );
      await loadUsers();
      window.dispatchEvent(new Event('userStatusChanged'));
      setSelected([]);
    } catch (err) {
      setError("Failed to unlock users: " + (err.response?.data || err.message));
    }
  };

  const handleEdit = (idx) => {
    setEditIndex(idx);
    setEditUserForm(users[idx]);
  };

  const handleDelete = async (idx) => {
    try {
      await deleteUser(users[idx].userId);
      await loadUsers();
      if (editIndex === idx) setEditIndex(null);
    } catch (err) {
      setError("Failed to delete user: " + (err.response?.data || err.message));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (idx) => {
    try {
      await editUser(users[idx].userId, {
        username: editUserForm.username,
        role: editUserForm.role
      });
      await loadUsers();
      setEditIndex(null);
      setSelected([]);
    } catch (err) {
      setError("Failed to update user: " + (err.response?.data || err.message));
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    if (!newUser.username || !newUser.password) {
      setError("Username and password are required");
      return;
    }
    
    try {
      await addUser({
        username: newUser.username,
        password: newUser.password,
        role: newUser.role
      });
      setNewUser({ username: "", password: "", role: roleOptions[0] });
      setAddMode(false);
      await loadUsers();
    } catch (err) {
      setError("Failed to add user: " + (err.response?.data || err.message));
    }
  };

  const handleCancelAdd = () => {
    setNewUser({ username: "", password: "", role: roleOptions[0] });
    setAddMode(false);
  };

  const handleToggleLock = async (idx) => {
    const user = users[idx];
    try {
      if (user.status === "Active") {
        await lockUser(user.userId);
      } else {
        await unlockUser(user.userId);
      }
      await loadUsers();
    } catch (err) {
      setError("Failed to toggle lock: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="p-8 flex flex-col h-[calc(100vh-4rem)]">
      <div>
        <h1 className="text-3xl font-bold mb-6">User Management</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        
        <button
          // className="mb-8 bg-mycustomblue text-white font-medium px-4 py-2 rounded"
          // onClick={() => setAddMode(true)}
          className={`mb-8 bg-mycustomblue text-white font-medium px-4 py-2 rounded ${
            disableAddButton ? 'cursor-not-allowed' : ''
          }`}
          onClick={() => !disableAddButton && setAddMode(true)}
          disabled={disableAddButton}
        >
          Add New User
        </button>
      </div>
      {/* Bulk action bar */}
      {selected.length > 0 && (
        <div className="bg-white border rounded mb-2 px-4 py-2 flex items-center justify-between shadow-sm">
          <span className="text-xs text-gray-800">SELECTED: {selected.length}</span>
          <div className="flex gap-2">
            {editIndex === null ? (
              <>
                {selected.length === 1 && (
                  <button onClick={handleBulkEdit} className="bg-white hover:bg-gray-200 px-3 py-1 rounded text-xs" disabled={disableActions}>EDIT</button>
                )}
                <button onClick={handleBulkDelete} className="bg-white hover:bg-gray-200 px-3 py-1 rounded text-xs" disabled={disableActions}>DELETE</button>
                <button onClick={handleBulkLock} className="bg-white hover:bg-gray-200 px-3 py-1 rounded text-xs" disabled={disableActions}>LOCK</button>
                <button onClick={handleBulkUnlock} className="bg-white hover:bg-gray-200 px-3 py-1 rounded text-xs" disabled={disableActions}>UNLOCK</button>
                <button onClick={() => setSelected([])} className="bg-white hover:bg-gray-200 px-3 py-1 rounded text-xs" disabled={disableActions}>CANCEL</button>
              </>
            ) : (
              <>
                <button onClick={handleBulkSave} className="bg-white hover:bg-gray-200 px-3 py-1 rounded text-xs">SAVE</button>
                <button onClick={handleBulkCancel} className="bg-white hover:bg-gray-200 px-3 py-1 rounded text-xs">CANCEL</button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        <div className="overflow-y-auto h-full">
          <table className="w-full bg-white border whitespace-nowrap">
            <thead className="sticky top-0 bg-white z-10">
              <tr>
                <th className="border px-4 py-2 text-left text-sm font-semibold w-12">
                  <input 
                    type="checkbox" 
                    checked={selectedAll} 
                    onChange={handleSelectAll} 
                    disabled={disableActions}
                  />
                </th>
                <th className="border px-4 py-2 text-left text-sm font-semibold w-16">ID</th>
                <th className="border px-4 py-2 text-left text-sm font-semibold min-w-[150px] max-w-[200px]">Username</th>
                <th className="border px-4 py-2 text-left text-sm font-semibold min-w-[150px]">Role</th>
                <th className="border px-4 py-2 text-left text-sm font-semibold w-32">Status</th>
                <th className="border px-4 py-2 text-left text-sm font-semibold min-w-[250px]">Actions</th>
              </tr>
            </thead>
            <tbody> 
              {users.map((user, idx) => (
                <tr key={idx} className={selected.includes(idx) ? "bg-green-50" : ""}>
                  <td className="border px-4 py-2 text-sm font-normal">
                    <input
                      type="checkbox"
                      checked={selected.includes(idx)}
                      onChange={() => handleSelect(idx)}
                      // disabled={editIndex !== null && editIndex !== idx}
                      disabled={disableActions}
                    />
                  </td>
                  <td className="border px-4 py-2 text-sm font-normal">{idx + 1}</td>
                  <td className="border px-4 py-2 text-sm font-normal">
                    {editIndex === idx ? (
                      <input
                        className="border px-2 py-1 rounded w-full"
                        name="username"
                        value={editUserForm.username}
                        onChange={handleChange}
                      />
                    ) : (
                      user.username
                    )}
                  </td>
                  <td className="border px-4 py-2 text-sm font-normal">
                    {editIndex === idx ? (
                      <select
                        className="border px-2 py-1 rounded w-full"
                        name="role"
                        value={editUserForm.role}
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
                  <td className="border px-4 py-2 text-sm font-normal">
                    {user.status === "Locked" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                        <LockClosedIcon className="h-4 w-4" />
                        Locked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircleIcon className="h-4 w-4" />
                        Active
                      </span>
                    )}
                  </td>
                  <td className="border px-4 py-2 text-xs font-medium">
                    {editIndex === idx ? (
                      <>
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded mr-2"
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
                      </>
                    ) : (
                      <>
                        <button
                          // className="bg-yellow-400 px-2 py-1 rounded mr-2"
                          // onClick={() => handleEdit(idx)}
                          // disabled={user.status === "Locked"}
                          className={`bg-yellow-400 px-2 py-1 rounded mr-2 ${
                            disableActions ? 'cursor-not-allowed' : ''
                          }`}
                          onClick={() => !disableActions && handleEdit(idx)}
                          disabled={disableActions || user.status === "Locked"}
                        >
                          EDIT
                        </button>
                        <button
                          // className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                          // onClick={() => handleDelete(idx)}
                          className={`bg-red-500 text-white px-2 py-1 rounded mr-2 ${
                            disableActions ? 'cursor-not-allowed' : ''
                          }`}
                          onClick={() => !disableActions && handleDelete(idx)}
                          disabled={disableActions}
                        >
                          DELETE
                        </button>
                        <button
                          // className={`px-2 py-1 rounded text-white ${
                          //   user.status === "Locked" ? "bg-green-500" : "bg-gray-500"
                          // }`}
                          // onClick={() => handleToggleLock(idx)}
                          className={`px-2 py-1 rounded text-white ${
                            user.status === "Locked" ? "bg-green-500" : "bg-gray-500"
                          } ${
                            disableActions ? 'cursor-not-allowed' : ''
                          }`}
                          onClick={() => !disableActions && handleToggleLock(idx)}
                          disabled={disableActions}
                        >
                          {user.status === "Locked" ? "UNLOCK" : "LOCK"}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}

              {addMode && (
                <tr ref={addRowRef} className="bg-yellow-50">
                  <td className="border px-4 py-2 text-sm font-normal"></td>
                  <td className="border px-4 py-2 text-sm font-normal">{users.length + 1}</td>
                  <td className="border px-4 py-2 text-sm font-normal">
                    <input
                      className="border px-2 py-1 rounded w-full"
                      name="username"
                      value={newUser.username}
                      onChange={handleAddChange}
                      placeholder="Username"
                    />
                  </td>
                  <td className="border px-4 py-2 text-sm font-normal">
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
                  <td className="border px-4 py-2 text-sm font-normal">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircleIcon className="h-4 w-4" />
                      Active
                    </span>
                  </td>
                  <td className="border px-4 py-2 text-xs font-medium">
                    <input
                      className="border px-2 py-1 rounded mr-2"
                      name="password"
                      type="password"
                      value={newUser.password}
                      onChange={handleAddChange}
                      placeholder="Password"
                    />
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      onClick={handleAddUser}
                    >
                      ADD
                    </button>
                    <button
                      className="bg-gray-400 text-white px-2 py-1 rounded"
                      onClick={handleCancelAdd}
                    >
                      CANCEL
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
      </div>
    </div>
  );
}