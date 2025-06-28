import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import UserManagement from "./components/UserManagement";
import ProjectManagement from "./components/ProjectManagement";
import TeamManagement from "./components/TeamManagement";
import ReportsAnalytics from "./components/ReportsAnalytics";
import Settings from "./components/Settings";
import Notifications from "./components/Notifications";
import TaskBoard from "./components/TaskBoard";
import FilesSubmissions from "./components/FilesSubmissions";
import CommentsDiscussion from "./components/CommentsDiscussion";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      {user && (
        <Sidebar
          user={user}
          setUser={setUser}
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />
      )}
      <div
        className={`transition-all duration-300 ${
          user ? (sidebarOpen ? "ml-64" : "ml-16") : ""
        }`}
      >
        <Routes>
          <Route
            path="/"
            element={
              user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute user={user} role="admin">
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute user={user} roles={["admin", "manager", "contributor"]}>
                <ProjectManagement user={user} sidebarOpen={sidebarOpen} />
              </ProtectedRoute>
            }
          />
          {/* ... other routes remain unchanged */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
