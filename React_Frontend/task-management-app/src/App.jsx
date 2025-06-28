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

  return (
    <Router>
      {user && <Sidebar user={user} setUser={setUser} />}
      <div className={user ? "ml-64" : ""}>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
          <Route path="/dashboard" element={<ProtectedRoute user={user}><Dashboard user={user} /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute user={user} role="admin"><UserManagement /></ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute user={user} roles={["admin", "manager"]}><ProjectManagement user={user} /></ProtectedRoute>} />
          <Route path="/teams" element={<ProtectedRoute user={user} roles={["admin", "manager"]}><TeamManagement /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute user={user} role="admin"><ReportsAnalytics /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute user={user} role="admin"><Settings /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute user={user}><Notifications user={user} /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute user={user} roles={["manager", "contributor"]}><TaskBoard user={user} /></ProtectedRoute>} />
          <Route path="/files" element={<ProtectedRoute user={user} role="contributor"><FilesSubmissions /></ProtectedRoute>} />
          <Route path="/comments" element={<ProtectedRoute user={user}><CommentsDiscussion user={user} /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;