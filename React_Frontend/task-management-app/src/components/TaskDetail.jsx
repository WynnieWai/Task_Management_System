
import React, { useState } from "react";

export default function TaskDetail({ user, task, onClose, onUpdate,currentMembers  }) {
  const [submitFile, setSubmitFile] = useState(null);
  const [submitFileName, setSubmitFileName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(task.comments || []);
  const [status, setStatus] = useState(task.status ?? "To-Do");
  const [dueStatus, setDueStatus] = useState(task.dueStatus ?? "Done on time"); 
const parseMembers = (val) =>
  Array.isArray(val)
    ? val
    : typeof val === "string" && val.trim() !== ""
    ? val.split(",").map((m) => m.trim()).filter(Boolean)
    : [];

    const [members, setMembers] = useState(parseMembers(task.members));

  const handleSubmit = async (e) => {
    e.preventDefault();
    let fileUrl = task.submissionFileUrl || "";
    let fileName = submitFileName || task.submissionFileName || "";

    // 1. If file is selected, upload to backend
    if (submitFile) {
      const formData = new FormData();
      formData.append("file", submitFile);
      try {
        const res = await fetch("http://localhost:5047/api/tasks/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        fileUrl = data.url;
        fileName = data.originalName;
      } catch {
        alert("Failed to upload file.");
        return;
      }
    }
//const membersToSend = Array.isArray(task.members) ? task.members : [];
    try {
      const res = await fetch(`http://localhost:5047/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: task.id,
          projectId: task.projectId,
          title: task.title,
          description: task.description,
          members: Array.isArray(members) ? members : [],
          startDate: task.startDate,
          dueDate: task.dueDate,
          dueStatus,
          priority: task.priority,
          status,
          file: task.file,
          fileUrl: task.fileUrl,
          submissionFileName: fileName,
          submissionFileUrl: fileUrl,
        }),
      });

      if (!res.ok) throw new Error("Failed to update task");
      // ✅ Get the updated task from backend
      const updatedTask = await res.json();

      // 🚩 Use the returned task to update parent state
      onUpdate(updatedTask);

      onClose();
    } catch (err) {
      alert("Failed to update task.");
    }
  };

  const handleDownload = () => {
    if (task.fileUrl) {
      window.open(`http://localhost:5047${task.fileUrl}`, "_blank");
    }
  };

  const handleDownloadSubmission = () => {
    if (task.submissionFileUrl) {
      window.open(`http://localhost:5047${task.submissionFileUrl}`, "_blank");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSubmitFile(e.target.files[0]);
      setSubmitFileName(e.target.files[0].name);
    }
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([...comments, { user: user.username, text: comment }]);
      setComment("");
    }
  };

  return (
    <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[700px] h-[650px] mx-auto border border-gray-400 flex flex-col p-0">
        <button className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 z-10" onClick={onClose}>✕</button>
        <div className="border-b border-gray-300 flex justify-between items-center p-4 pr-12">
          <span className="text-lg font-semibold">{task.title || "Task Title"}</span>
          <span className="text-sm text-gray-700">[{status}]</span>
        </div>
        <div className="border-b border-gray-300 p-4 pb-2">
          <div className="font-semibold mb-1">Description</div>
          <div className="text-gray-800">{task.description}</div>
        </div>
        <div className="border-b border-gray-300 p-4 pb-2">
          <div className="font-semibold mb-1">Assigned Members</div>
          {Array.isArray(members) && members.length > 0 ? (
            <ul className="list-disc pl-6">
              {members.map((m, i) => (
                <li key={i} className="text-gray-800">{m}</li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-500">No assigned members</span>
          )}
        </div>
        <div className="border-b border-gray-300 p-4 flex flex-wrap items-center gap-x-8 gap-y-2">
          <div>
            <span className="font-semibold">Timeline:</span>
            <span className="ml-2">Start: {task.startDate || "[date]"}</span>
            <span className="ml-2">Due: {task.dueDate || "[date]"}</span>
          </div>
          <div>
            <span className="font-semibold">Priority:</span>
            <span className="ml-2 text-blue-600 font-medium">{task.priority || "[High]"}</span>
          </div>
        </div>
        {/* File download section */}
        {task.file && task.fileUrl && (
          <div className="border-b border-gray-300 p-4 flex flex-col gap-2">
            <span className="font-semibold mb-1">Download Attachment</span>
            <div className="flex items-center gap-3">
              <span className="text-gray-800">{task.file}</span>
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                onClick={handleDownload}
              >
                Download
              </button>
            </div>
          </div>
        )}

        {/* Submission area */}
        <div className="border-b border-gray-300 p-4 flex flex-col gap-3">
          <span className="font-semibold mb-1">Submission</span>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Upload file:</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="border border-blue-400 rounded px-2 py-1 w-full"
              style={{ flex: 1 }}
            />
            {submitFileName && (
              <span className="ml-2 text-sm text-gray-600">{submitFileName}</span>
            )}
          </div>
          {task.submissionFileUrl && (
            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm text-gray-700">Previous submission: {task.submissionFileName}</span>
              <button className="px-2 py-1 bg-green-600 text-white rounded text-xs"
                onClick={handleDownloadSubmission}>
                Download Submission
              </button>
            </div>
          )}
          <div className="flex items-center gap-2 justify-between mt-2">
            <select
              className="border border-blue-400 rounded px-2 py-1 w-48"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option>To-Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit} type="button">
              Submit
            </button>
          </div>
        </div>
        {/* Comments */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="font-semibold mb-2">Comments</div>
          <textarea
            className="mb-2 border border-blue-400 rounded px-2 py-1 w-full min-h-[48px]"
            placeholder="Comments will appear here..."
            value={comments.map(c => `${c.user}: ${c.text}`).join('\n')}
            readOnly
          />
          <div className="flex gap-2">
            <input
              className="flex-1 border border-blue-400 p-1 rounded"
              placeholder="Add comment input"
              value={comment}
              onChange={e => setComment(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAddComment()}
            />
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded"
              onClick={handleAddComment}
              type="button"
            >
              Add Comments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
