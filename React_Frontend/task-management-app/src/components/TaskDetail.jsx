import React, { useState } from "react";

export default function TaskDetail({ user, task, onClose, onUpdate }) {
  const [submission, setSubmission] = useState(task.submission || "");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(task.comments || []);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...task, submission, status, comments });
    onClose();
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComments = [...comments, { user: user.username, text: comment }];
      setComments(newComments);
      setComment("");
    }
  };

  const canChangeStatus = ["manager", "contributor"].includes(user.role);

  return (
    <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
    <div className="relative bg-white rounded-lg shadow-lg p-0 w-[700px] h-[600px] mx-auto border border-gray-400 flex flex-col">
      {/* Header */}
      <button className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 z-10" onClick={onClose}>✕</button>
      <div className="border-b border-gray-300 flex justify-between items-center p-4 pr-12">
        <span className="text-lg font-semibold">Task Title</span>
        <span className="text-sm text-gray-700">[{status}]</span>
      </div>
  
      {/* Description */}
      <div className="border-b border-gray-300 p-4 pb-2">
        <div className="font-semibold mb-1">Description</div>
        <div className="text-gray-800">{task.description}</div>
      </div>
  
      {/* Timeline and Priority */}
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
  
      {/* Submission Section */}
      <div className="border-b border-gray-300 p-4 flex flex-col gap-3">
        <span className="font-semibold mb-1">Submission</span>
        <input
          type="text"
          className="border border-blue-400 rounded px-2 py-1 w-full"
          placeholder="Upload file or enter link..."
          value={submission}
          onChange={e => setSubmission(e.target.value)}
        />
        <textarea
          rows={2}
          className="border border-blue-400 rounded px-2 py-1 w-full"
          placeholder="Text Area: Your Answer/Notes"
          value={submission}
          onChange={e => setSubmission(e.target.value)}
        />
        <div className="flex items-center gap-2 justify-between">
          <select
            className="border border-blue-400 rounded px-2 py-1 w-48"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option>To-Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
            type="button"
          >
            Submit
          </button>
        </div>
      </div>
  
      {/* Comments Section */}
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
