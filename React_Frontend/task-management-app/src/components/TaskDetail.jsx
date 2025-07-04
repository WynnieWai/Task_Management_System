
// import React, { useState } from "react";

// export default function TaskDetail({ user, task, onClose, onUpdate,currentMembers  }) {
//   const [submitFile, setSubmitFile] = useState(null);
//   const [submitFileName, setSubmitFileName] = useState("");
//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState(task.comments || []);
//   const [status, setStatus] = useState(task.status ?? "To-Do");
//   const [dueStatus, setDueStatus] = useState(task.dueStatus ?? "Done on time"); 
// const parseMembers = (val) =>
//   Array.isArray(val)
//     ? val
//     : typeof val === "string" && val.trim() !== ""
//     ? val.split(",").map((m) => m.trim()).filter(Boolean)
//     : [];

//     const [members, setMembers] = useState(parseMembers(task.members));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let fileUrl = task.submissionFileUrl || "";
//     let fileName = submitFileName || task.submissionFileName || "";

//     // 1. If file is selected, upload to backend
//     if (submitFile) {
//       const formData = new FormData();
//       formData.append("file", submitFile);
//       try {
//         const res = await fetch("http://localhost:5047/api/tasks/upload", {
//           method: "POST",
//           body: formData,
//         });
//         const data = await res.json();
//         fileUrl = data.url;
//         fileName = data.originalName;
//       } catch {
//         alert("Failed to upload file.");
//         return;
//       }
//     }
// //const membersToSend = Array.isArray(task.members) ? task.members : [];
//     try {
//       const res = await fetch(`http://localhost:5047/api/tasks/${task.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           id: task.id,
//           projectId: task.projectId,
//           title: task.title,
//           description: task.description,
//           members: Array.isArray(members) ? members : [],
//           startDate: task.startDate,
//           dueDate: task.dueDate,
//           dueStatus,
//           priority: task.priority,
//           status,
//           file: task.file,
//           fileUrl: task.fileUrl,
//           submissionFileName: fileName,
//           submissionFileUrl: fileUrl,
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to update task");
//       // ✅ Get the updated task from backend
//       const updatedTask = await res.json();

//       // 🚩 Use the returned task to update parent state
//       onUpdate(updatedTask);

//       onClose();
//     } catch (err) {
//       alert("Failed to update task.");
//     }
//   };

//   const handleDownload = () => {
//     if (task.fileUrl) {
//       window.open(`http://localhost:5047${task.fileUrl}`, "_blank");
//     }
//   };

//   const handleDownloadSubmission = () => {
//     if (task.submissionFileUrl) {
//       window.open(`http://localhost:5047${task.submissionFileUrl}`, "_blank");
//     }
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setSubmitFile(e.target.files[0]);
//       setSubmitFileName(e.target.files[0].name);
//     }
//   };

//   const handleAddComment = () => {
//     if (comment.trim()) {
//       setComments([...comments, { user: user.username, text: comment }]);
//       setComment("");
//     }
//   };

//   return (
//     <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
//       <div className="relative bg-white rounded-lg shadow-lg w-[700px] h-[650px] mx-auto border border-gray-400 flex flex-col p-0">
//         <button className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 z-10" onClick={onClose}>✕</button>
//         <div className="border-b border-gray-300 flex justify-between items-center p-4 pr-12">
//           <span className="text-lg font-semibold">{task.title || "Task Title"}</span>
//           <span className="text-sm text-gray-700">[{status}]</span>
//         </div>
//         <div className="border-b border-gray-300 p-4 pb-2">
//           <div className="font-semibold mb-1">Description</div>
//           <div className="text-gray-800">{task.description}</div>
//         </div>
//         <div className="border-b border-gray-300 p-4 pb-2">
//           <div className="font-semibold mb-1">Assigned Members</div>
//           {Array.isArray(members) && members.length > 0 ? (
//             <ul className="list-disc pl-6">
//               {members.map((m, i) => (
//                 <li key={i} className="text-gray-800">{m}</li>
//               ))}
//             </ul>
//           ) : (
//             <span className="text-gray-500">No assigned members</span>
//           )}
//         </div>
//         <div className="border-b border-gray-300 p-4 flex flex-wrap items-center gap-x-8 gap-y-2">
//           <div>
//             <span className="font-semibold">Timeline:</span>
//             <span className="ml-2">Start: {task.startDate || "[date]"}</span>
//             <span className="ml-2">Due: {task.dueDate || "[date]"}</span>
//           </div>
//           <div>
//             <span className="font-semibold">Priority:</span>
//             <span className="ml-2 text-blue-600 font-medium">{task.priority || "[High]"}</span>
//           </div>
//         </div>
//         {/* File download section */}
//         {task.file && task.fileUrl && (
//           <div className="border-b border-gray-300 p-4 flex flex-col gap-2">
//             <span className="font-semibold mb-1">Download Attachment</span>
//             <div className="flex items-center gap-3">
//               <span className="text-gray-800">{task.file}</span>
//               <button
//                 className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
//                 onClick={handleDownload}
//               >
//                 Download
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Submission area */}
//         <div className="border-b border-gray-300 p-4 flex flex-col gap-3">
//           <span className="font-semibold mb-1">Submission</span>
//           <div className="flex items-center gap-2">
//             <label className="font-semibold">Upload file:</label>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="border border-blue-400 rounded px-2 py-1 w-full"
//               style={{ flex: 1 }}
//             />
//             {submitFileName && (
//               <span className="ml-2 text-sm text-gray-600">{submitFileName}</span>
//             )}
//           </div>
//           {task.submissionFileUrl && (
//             <div className="flex items-center gap-3 mt-2">
//               <span className="text-sm text-gray-700">Previous submission: {task.submissionFileName}</span>
//               <button className="px-2 py-1 bg-green-600 text-white rounded text-xs"
//                 onClick={handleDownloadSubmission}>
//                 Download Submission
//               </button>
//             </div>
//           )}
//           <div className="flex items-center gap-2 justify-between mt-2">
//             <select
//               className="border border-blue-400 rounded px-2 py-1 w-48"
//               value={status}
//               onChange={e => setStatus(e.target.value)}
//             >
//               <option>To-Do</option>
//               <option>In Progress</option>
//               <option>Done</option>
//             </select>
//             <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit} type="button">
//               Submit
//             </button>
//           </div>
//         </div>
//         {/* Comments */}
//         <div className="p-4 flex-1 flex flex-col">
//           <div className="font-semibold mb-2">Comments</div>
//           <textarea
//             className="mb-2 border border-blue-400 rounded px-2 py-1 w-full min-h-[48px]"
//             placeholder="Comments will appear here..."
//             value={comments.map(c => `${c.user}: ${c.text}`).join('\n')}
//             readOnly
//           />
//           <div className="flex gap-2">
//             <input
//               className="flex-1 border border-blue-400 p-1 rounded"
//               placeholder="Add comment input"
//               value={comment}
//               onChange={e => setComment(e.target.value)}
//               onKeyDown={e => e.key === "Enter" && handleAddComment()}
//             />
//             <button
//               className="bg-blue-600 text-white px-3 py-1 rounded"
//               onClick={handleAddComment}
//               type="button"
//             >
//               Add Comments
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect,useRef } from "react";
import {
  CalendarIcon,
  FlagIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  Bars3Icon,
  ClipboardIcon,
  PaperClipIcon,
  ArrowDownTrayIcon,
  AtSymbolIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/solid";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import { MentionsInput, Mention } from "react-mentions";
import axios from "axios";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { useNotifications } from "../notifications/NotificationsContext";

// API for comments
const COMMENTS_BASE_URL = "http://localhost:5047/api/comments";

// Utility: format ISO date string to yyyy-MM-dd
function formatDateOnly(dateStr) {
  if (!dateStr) return "";
  return dateStr.split("T")[0];
}

// Sample usersList for mention (could be replaced by API)
const usersList = [
  { id: "admin", display: "admin" },
  { id: "manager", display: "manager" },
  { id: "student", display: "student" },
];

export default function TaskDetail({ user, task, onClose, onUpdate }) {
  const [submitFile, setSubmitFile] = useState(null);
  const [submitFileName, setSubmitFileName] = useState("");
  const [status, setStatus] = useState(task.status ?? "To-Do");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const commentsEndRef = useRef(null);
  const { addNotification } = useNotifications();

  // Fetch comments for this task from backend
  useEffect(() => {
    setLoadingComments(true);
    axios.get(`${COMMENTS_BASE_URL}?taskId=${task.id}`)
      .then(res => setComments(res.data))
      .catch(() => setComments([]))
      .finally(() => setLoadingComments(false));
  }, [task.id]);

    useEffect(() => {
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  const statusOptions = [
    { label: 'To-Do', color: 'bg-gray-400' },
    { label: 'In Progress', color: 'bg-yellow-500' },
    { label: 'Done', color: 'bg-green-500' },
  ];

  // Submit task changes (including file upload if any)
  const handleSubmit = async (e) => {
    e.preventDefault();
    let submissionFileUrl = task.submissionFileUrl || "";
    let submissionFileNameToSend = submitFileName || task.submissionFileName || "";

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
        submissionFileUrl = data.url;
        submissionFileNameToSend = data.originalName;
      } catch {
        alert("Failed to upload file.");
        return;
      }
    }

    // 2. Update the task in backend
    try {
      // Only send expected fields for TaskDto
      const payload = {
        id: task.id,
        projectId: task.projectId,
        title: task.title,
        description: task.description,
        members: Array.isArray(task.members) ? task.members : [],
        startDate: task.startDate,
        dueDate: task.dueDate,
        dueStatus: task.dueStatus ?? "",
        priority: task.priority,
        status,
        file: task.file ?? "",
        fileUrl: task.fileUrl ?? "",
        submissionFileName: submissionFileNameToSend ?? "",
        submissionFileUrl: submissionFileUrl ?? ""
      };

      const res = await fetch(`http://localhost:5047/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const updatedTask = await res.json();
      onUpdate(updatedTask); // update parent
      onClose();
    } catch (err) {
      alert("Failed to update task.");
    }
  };

  // Download attachment file
  const handleDownloadAttachment = () => {
    if (task.fileUrl) {
      window.open(`http://localhost:5047${task.fileUrl}`, "_blank");
    }
  };
  // Download submission file
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

  // // Add a comment (and save to backend)
  // const handleAddComment = async () => {
  //   if (!comment.trim()) return;
  //   try {
  //     const payload = {
  //       taskId: task.id,
  //       author: user.username ?? "",
  //       text: comment,
  //       fileUrl: "" // always a string
  //     };
  //     const res = await axios.post(COMMENTS_BASE_URL, payload);
  //     setComments((prev) => [...prev, res.data]);
  //     setComment("");
  //   } catch (e) {
  //     alert("Failed to add comment.");
  //     console.error(e);
  //   }
  // };
  const handleAddComment = async () => {
    if (!comment.trim()) return;
    try {
      const payload = {
        taskId: task.id,
        author: user.username ?? "",
        text: comment,
        fileUrl: "" // always a string
      };
      const res = await axios.post(COMMENTS_BASE_URL, payload);
      setComments((prev) => [...prev, res.data]);

      // --- MENTION LOGIC (same as CommentsPanel) ---
      const mentionsRegex = /@\[[^\]]+\]\(([^)]+)\)/g;
      let mentionedUsers = [];
      let match;
      while ((match = mentionsRegex.exec(comment)) !== null) {
        mentionedUsers.push(match[1]);
      }
      // Send notification (adjust as needed)
      mentionedUsers.forEach((username) => {
        // If using context:
        if (typeof addNotification === "function") {
          addNotification({
            user: username,
            message: `You were mentioned in task "${task.title}": "${comment}"`,
            link: `/projects/${task.projectId}/tasks/${task.id}?commentId=${res.data.id}`,
          });
        } else {
          // Or use API, or log for demo:
          // await axios.post("/api/notifications", {...})
          console.log(
            `Notify ${username}: "You were mentioned in task '${task.title}': ${comment}"`
          );
        }
      });

      setComment("");
    } catch (e) {
      alert("Failed to add comment.");
      console.error(e);
    }
  };
  
  const addEmoji = (emoji) => {
  setComment(comment + emoji.native);
  setShowEmoji(false); // Close after picking
  };

  // --- UI ---
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg border border-gray-400 flex flex-col w-[900px] h-[520px] max-w-full max-h-full">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-300 flex justify-between items-center p-4 rounded-t-lg">
          <span className="text-lg font-semibold">{task.title || "Task Title"}</span>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>✕</button>
        </div>

        {/* Content with left-right layout */}
        <div className="flex flex-1 min-h-0" style={{ height: "100%" }}>
          {/* Left: Details */}
          <div className="w-1/2 p-4 space-y-4 border-r border-gray-300 overflow-y-auto min-h-0">
            {/* Description */}
            <div className="flex items-center">
              <span className="flex items-center gap-2 w-40 font-semibold text-sm">
                <ClipboardIcon className="w-4 h-4" /> Description
              </span>
              <div className="bg-gray-100 px-4 py-2 rounded w-full font-medium text-sm">
                {task.description}
              </div>
            </div>

            {/* Due Date */}
            <div className="flex items-center">
              <span className="flex items-center gap-2 w-40 font-semibold text-sm">
                <CalendarIcon className="w-4 h-4" /> Due Date
              </span>
              <div className="bg-gray-100 px-4 py-2 rounded w-full font-medium text-sm">
                {formatDateOnly(task.dueDate)}
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center">
              <span className="flex items-center gap-2 w-40 font-semibold text-sm">
                <Bars3Icon className="w-4 h-4" /> Status
              </span>
              <Tippy
                content={
                  <div className="flex flex-col gap-1 p-1">
                    {statusOptions.map((opt) => (
                      <div
                        key={opt.label}
                        className={`${opt.color} text-white px-4 py-2 rounded mb-1 text-center cursor-pointer hover:opacity-80`}
                        onClick={() => setStatus(opt.label)}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>
                }
                interactive={true}
                trigger="click"
                placement="bottom"
                theme="light"
              >
                <div
                  className={`px-4 py-2 rounded w-full text-center text-white font-medium text-sm cursor-pointer ${status === 'Done' ? 'bg-green-500' : status === 'In Progress' ? 'bg-yellow-500' : 'bg-gray-400'}`}
                >
                  {status}
                </div>
              </Tippy>
            </div>

            {/* Priority */}
            <div className="flex items-center">
              <span className="flex items-center gap-2 w-40 font-semibold text-sm">
                <FlagIcon className="w-4 h-4" /> Priority
              </span>
              <div className={`px-4 py-2 rounded w-full text-center text-white font-medium text-sm ${task.priority === 'High' ? 'bg-red-800' : task.priority === 'Medium' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                {task.priority}
              </div>
            </div>

            {/* Download Attachment */}
            <div className="flex items-center">
              <span className="flex items-center gap-2 w-40 font-semibold text-sm">
                <PaperClipIcon className="w-4 h-4" /> Attachment
              </span>
              {task.file && task.fileUrl ? (
                <button
                  onClick={handleDownloadAttachment}
                  className="bg-gray-100 px-4 py-2 rounded w-full font-medium text-sm hover:bg-gray-200 flex items-center gap-2 justify-center"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  {task.file}
                </button>
              ) : (
                <div className="bg-gray-200 px-4 py-2 rounded w-full text-center text-gray-600 font-medium text-sm">
                  No attachment
                </div>
              )}
            </div>

            {/* Submission area */}
            <div className="flex flex-col gap-4 mt-4">
              <span className="font-bold text-sm">Submission</span>
              <input
                type="file"
                onChange={handleFileChange}
                className="text-sm"
              />
              {submitFileName && (
                <span className="text-sm text-gray-600">{submitFileName}</span>
              )}
              {/* Previous submission download */}
              {task.submissionFileUrl && (
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-sm text-gray-700">Previous submission: {task.submissionFileName}</span>
                  <button className="px-2 py-1 bg-green-600 text-white rounded text-xs"
                    onClick={handleDownloadSubmission}>
                    Download Submission
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 justify-end mt-2">
              <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm" onClick={handleSubmit}>
                Done
              </button>
            </div>
          </div>

          {/* Right: Comments */}
          <div className="w-1/2 p-4">
            <div className="flex items-center gap-2 font-bold text-sm mb-2">
              <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" /> Comments
            </div>
            <div className="relative">
              <MentionsInput
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="border rounded  w-full min-h-[80px]"
                placeholder="Add Comment..."
                style={{
                  control: { padding: "0px", fontSize: 14 },
                  highlighter: { padding: "8px" },
                  input: { padding: "8px" }
                }}
              >
                <Mention trigger="@" data={usersList} className="bg-blue-200"
              displayTransform={(id, display) => `@${display}`} />
              </MentionsInput>
              <div className="flex items-center gap-2 mt-2">
                {/* Emoji & Mention Buttons */}
                <button
                  type="button"
                  onClick={() => setShowEmoji(show => !show)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <FaceSmileIcon className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => setComment(prev => prev + "@")}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <AtSymbolIcon className="h-6 w-6" />
                </button>
                {/* Emoji Picker */}
                {showEmoji && (
                  <div className="absolute z-50 mt-8">
                    <Picker
                      data={data}
                      onEmojiSelect={emoji => {
                        setComment(prev => prev + emoji.native);
                        setShowEmoji(false);
                      }}
                      theme="light"
                    />
                  </div>
                )}
                <button
                  className="bg-blue-600 text-white px-4 py-1 rounded text-sm ml-auto"
                  onClick={handleAddComment}
                >
                  Send
                </button>
              </div>
            </div>
            {/* Published comments */}
            <div className="overflow-y-auto max-h-[250px]">
              {loadingComments ? (
                <div className="text-gray-500 text-center py-8">Loading comments...</div>
              ) : comments.length === 0 ? (
                <div className="text-gray-400 text-center py-8">No comments yet.</div>
              ) : (
                comments.map((c, ci) => (
                  <div key={ci} className="flex items-start gap-2 mb-4">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
                        {c.author && c.author[0] && c.author[0].toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">
                        {c.author} • {c.createdAt ? formatDateOnly(c.createdAt) : 'just now'}
                      </div>
                      <div className="bg-gray-100 rounded px-3 py-2 text-sm">
                        <p>{c.text}</p>
                        {c.fileUrl && (
                          <div className="mt-2">
                            <a
                              href={`http://localhost:5047${c.fileUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              Attachment
                            </a>
                          </div>
                        )}
                        <div ref={commentsEndRef} />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
