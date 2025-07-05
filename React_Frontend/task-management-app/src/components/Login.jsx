// import React, { useState } from "react";
// import { users } from "../dummyUser";

// export default function Login({ setUser }) {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = e => {
//     e.preventDefault();
//     const found = users.find(u => u.username === form.username && u.password === form.password);
//     if (found) {
//       setUser(found);
//     } else {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         {error && <div className="text-red-500 mb-4">{error}</div>}
//         <input name="username" placeholder="Username" value={form.username} onChange={handleChange} className="w-full mb-4 p-2 border rounded" />
//         <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full mb-4 p-2 border rounded" />
//         <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
//         <div className="mt-4 text-sm text-gray-500">
//           <div>Admin: admin/admin123</div>
//           <div>Manager: manager/manager123</div>
//           <div>Student: student/student123</div>
//         </div>
//       </form>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import axios from "axios";

// export default function Login({ setUser }) {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   // const handleSubmit = async e => {
//   //   e.preventDefault();
//   //   try {
//   //     // Fetch all users from backend
//   //     const res = await axios.get("http://localhost:5047/api/User/login");
//   //     // Find user with matching username
//   //     const found = res.data.find(
//   //       u => u.username === form.username && u.role // role check is optional
//   //     );
//   //     if (!found) {
//   //       setError("Invalid credentials");
//   //       return;
//   //     }
//   //     // For demo: compare password directly (insecure, for demo only)
//   //     // In production, use a login endpoint that checks password hash
//   //     if (form.password === found.passwordHash) {
//   //       setUser(found);
//   //     } else {
//   //       setError("Invalid credentials for pass");
//   //     }
//   //   } catch (err) {
//   //     setError("Login failed. Please try again.");
//   //   }
//   // };

//   // const handleSubmit = async e => {
//   //   e.preventDefault();
//   //   try {
//   //     const res = await axios.post("http://localhost:5047/api/User/login", {
//   //       username: form.username,
//   //       password: form.password,
//   //     });
//   //     // Normalize role for frontend
//   //     let user = res.data;
//   //     let role = user.role.toLowerCase();
//   //     if (role === "projectmanager") role = "manager";
//   //     if (role === "contributor") role = "contributor";
//   //     if (role === "admin") role = "admin";
//   //     setUser({ ...user, role });
//   //   } catch (err) {
//   //     setError("Invalid credentials");
//   //   }
//   // };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5047/api/User/login", {
//         username: form.username,
//         password: form.password,
//       });

//       let user = res.data;
//       let role = user.role.toLowerCase();
//       if (role === "projectmanager") role = "manager";
//       if (role === "contributor") role = "contributor";
//       if (role === "admin") role = "admin";
//       setUser({ ...user, role });

//     } catch (err) {
//       const message = err.response?.data?.message;
//       if (message === "Your account has been locked.") {
//         setError("Your account has been locked.");
//       } else {
//         setError("Invalid credentials");
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         {error && <div className="text-red-500 mb-4">{error}</div>}
//         <input name="username" placeholder="Username" value={form.username} onChange={handleChange} className="w-full mb-4 p-2 border rounded" />
//         <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full mb-4 p-2 border rounded" />
//         <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
//         <div className="mt-4 text-sm text-gray-500">
//           <div>Admin: admin/admin123</div>
//           <div>Project Manager: manager/manager123</div>
//           <div>Contributor: student/student123</div>
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";

export default function Login({ setUser }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5047/api/User/login", {
        username: form.username,
        password: form.password,
      });
      let user = res.data;
      let role = user.role.toLowerCase();
      if (role === "projectmanager") role = "manager";
      if (role === "contributor") role = "contributor";
      if (role === "admin") role = "admin";
      setUser({ ...user, role });
    } catch (err) {
      const message = err.response?.data?.message;
      if (message === "Your account has been locked.") {
        setError("Your account has been locked.");
      } else {
        setError("Invalid credentials");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-center text-blue-700">Tuesday</h1>
        <p className="text-center text-gray-500 mb-6">Your Project & Task Management</p>

        {error && <div className="text-red-500 mb-4 text-center text-sm">{error}</div>}

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          className="w-full bg-mycustomblue text-white text-base font-medium py-3 rounded hover:bg-grey-700 transition"
          type="submit"
        >
          Login
        </button>
        <div className="mt-6 text-xs text-gray-500 text-center">
          <div>Admin: admin / admin123</div>
          <div>Project Manager: manager / manager123</div>
          <div>Contributor: student / student123</div>
        </div>
      </form>
    </div>
  );
}
