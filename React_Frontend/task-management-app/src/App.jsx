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
import TaskManagement from "./components/TaskManagement"; 
import FilesSubmissions from "./components/FilesSubmissions";
import CommentsDiscussion from "./components/CommentsDiscussion";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import { NotificationsProvider } from "./notifications/NotificationsContext";
import Header from "./components/Header";
import Profile from "./components/Profile";

function App() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <NotificationsProvider>
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
        {user && <Header user={user} />}
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
          <Route
            path="/tasks"
            element={
              <ProtectedRoute user={user} roles={["manager", "contributor"]}>
                <TaskBoard user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks/:projectId"
            element={
              <ProtectedRoute user={user} roles={["admin", "manager", "contributor"]}>
                <TaskManagement user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute user={user}>
                <Notifications user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teams"
            element={
              <ProtectedRoute user={user} roles={["admin", "manager", "contributor"]}>
                <TeamManagement user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <Profile user={user} />
              </ProtectedRoute>
            }
          />

          {/* ... other routes remain unchanged */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
    </NotificationsProvider>
  );
}

export default App;
