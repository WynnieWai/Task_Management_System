// import React, { useEffect, useState, useRef } from "react";
// import { MentionsInput, Mention } from "react-mentions";
// import Picker from "@emoji-mart/react";
// import data from "@emoji-mart/data";
// import {
//   FaceSmileIcon,
//   AtSymbolIcon
// } from "@heroicons/react/24/solid";
// import { getCommentsByTaskId, addComment } from "../API/CommentsAPI";
// import { useNotifications } from "../notifications/NotificationsContext";

// export default function CommentsPanel({
//   open,
//   onClose,
//   task,
//   user,
//   usersList = [],
//   scrollToCommentId = null,
// }) {
//   const [comments, setComments] = useState([]);
//   const [mentionInput, setMentionInput] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);

//   const { addNotification } = useNotifications();
//   const commentRefs = useRef({});
//   const commentsEndRef = useRef(null)

//   useEffect(() => {
//     if (!open || !task?.id) return;
//     getCommentsByTaskId(task.id).then((res) => setComments(res.data || []));
//     setMentionInput("");
//     setShowEmojiPicker(false);
//   }, [open, task]);

//   useEffect(() => {
//     if (scrollToCommentId && comments.length > 0) {
//       const node = commentRefs.current[scrollToCommentId];
//       if (node) {
//         node.scrollIntoView({ behavior: "smooth", block: "center" });
//         node.classList.add("bg-yellow-100");
//         setTimeout(() => node.classList.remove("bg-yellow-100"), 2000);
//       }
//     }
//   }, [scrollToCommentId, comments]);

//     useEffect(() => {
//     if (commentsEndRef.current) {
//       commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//     }, [comments]);

//   const handleAddComment = async () => {
//     if (!mentionInput.trim()) return;
//     const res = await addComment({
//       taskId: task.id,
//       author: user.username,
//       text: mentionInput,
//       fileUrl: "",
//     });
//     setComments((prev) => [...prev, res.data]);

//     // Parse @mentions and send notifications
//     const mentionsRegex = /@\[[^\]]+\]\(([^)]+)\)/g;
//     let mentionedUsers = [];
//     let match;
//     while ((match = mentionsRegex.exec(mentionInput)) !== null) {
//       mentionedUsers.push(match[1]);
//     }
//     mentionedUsers.forEach((username) => {
//       addNotification({
//         user: username,
//         message: `You were mentioned in task "${task.title}": "${mentionInput}"`,
//         link: `/projects/${task.projectId}/tasks/${task.id}?commentId=${res.data.id}`,
//       });
//     });

//     setMentionInput("");
//     setShowEmojiPicker(false);
//   };

//   if (!open || !task) return null;

//   return (
//     <div
//       className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-lg z-50 flex flex-col"
//       style={{ maxHeight: "100vh" }}
//     >
//       {/* Header */}
//       <div className="flex justify-between items-center border-b px-6 py-3 flex-shrink-0">
//         <h2 className="text-lg font-extrabold">{task.title}</h2>
//         <button onClick={onClose} className="text-gray-600 text-2xl font-extrabold">×</button>
//       </div>

//       {/* Input Area */}
//       <div className="border-t px-6 py-4 flex-shrink-0 bg-white">
//         <div className="relative">
//           <MentionsInput
//             value={mentionInput}
//             onChange={e => setMentionInput(e.target.value)}
//             className="border rounded  w-full min-h-[80px]"
//             placeholder="Add Comment..."
//             style={{
//               control: { padding: "0px", fontSize: 14 },
//               highlighter: { padding: "8px" },
//               input: { padding: "8px" }
//             }}
//           >
//             <Mention trigger="@" data={usersList} className="bg-blue-200" 
//               displayTransform={(id, display) => `@${display}`} />
//           </MentionsInput>
//           <div className="flex items-center justify-between mt-2">
//             <div className="flex gap-2">
//               <button
//                 type="button"
//                 onClick={() => setShowEmojiPicker((prev) => !prev)}
//                 className="text-gray-600 hover:text-gray-800"
//               >
//                 <FaceSmileIcon className="h-5 w-5" />
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setMentionInput(mentionInput + "@")}
//                 className="text-gray-600 hover:text-gray-800"
//               >
//                 <AtSymbolIcon className="h-5 w-5" />
//               </button>
//             </div>
//             <button
//               className="bg-blue-700 text-white px-4 py-1 rounded text-sm"
//               onClick={handleAddComment}
//             >
//               Send
//             </button>
//           </div>
//           {showEmojiPicker && (
//             <div className="absolute z-50 mt-2">
//               <Picker
//                 data={data}
//                 onEmojiSelect={(emoji) =>
//                   setMentionInput((prev) => (prev || "") + emoji.native)
//                 }
//                 theme="light"
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Comments List - scrollable */}
//       <div className="overflow-y-auto flex-1 px-6 py-4" style={{ minHeight: 0 }}>
//         {comments.map((comment, ci) => (
//           <div
//             key={comment.id || ci}
//             ref={el => {
//               if (comment.id) commentRefs.current[comment.id] = el;
//             }}
//             className="flex items-start gap-2 mb-4"
//           >
//             <div className="flex-shrink-0">
//               <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
//                 {comment.author[0].toUpperCase()}
//               </div>
//             </div>
//             <div>
//               <div className="text-xs text-gray-500 mb-1">
//                 {comment.author} • {new Date(comment.createdAt).toLocaleString()}
//               </div>
//               <div className="bg-gray-100 rounded px-3 py-2 text-sm">
//                 <p>{comment.text}</p>
//                 {comment.fileUrl && (
//                   <div className="mt-2">
//                     <a
//                       href={comment.fileUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 underline"
//                     >
//                       File Attachment
//                     </a>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//          ))}
//         <div ref={commentsEndRef} />
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState, useRef } from "react";
import { MentionsInput, Mention } from "react-mentions";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import {
  FaceSmileIcon,
  AtSymbolIcon
} from "@heroicons/react/24/solid";
import { getCommentsByTaskId, addComment } from "../API/CommentsAPI";
import { useNotifications } from "../notifications/NotificationsContext";

export default function CommentsPanel({
  open,
  onClose,
  task,
  user,
  usersList = [],
  scrollToCommentId = null,
}) {
  const [comments, setComments] = useState([]);
  const [mentionInput, setMentionInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { addNotification } = useNotifications();
  const commentRefs = useRef({});
  const commentsEndRef = useRef(null)

  useEffect(() => {
    if (!open || !task?.id) return;
    getCommentsByTaskId(task.id).then((res) => setComments(res.data || []));
    setMentionInput("");
    setShowEmojiPicker(false);
  }, [open, task]);

  useEffect(() => {
    if (scrollToCommentId && comments.length > 0) {
      const node = commentRefs.current[scrollToCommentId];
      if (node) {
        node.scrollIntoView({ behavior: "smooth", block: "center" });
        node.classList.add("bg-yellow-100");
        setTimeout(() => node.classList.remove("bg-yellow-100"), 2000);
      }
    }
  }, [scrollToCommentId, comments]);

    useEffect(() => {
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    }, [comments]);

  const handleAddComment = async () => {
    if (!mentionInput.trim()) return;
    const res = await addComment({
      taskId: task.id,
      author: user.username,
      text: mentionInput,
      fileUrl: "",
    });
    setComments((prev) => [...prev, res.data]);

    // Parse @mentions and send notifications
    const mentionsRegex = /@\[[^\]]+\]\(([^)]+)\)|@([a-zA-Z0-9_]+)/g;
    let mentionedUsers = [];
    let match;
    while ((match = mentionsRegex.exec(mentionInput)) !== null) {
    if (match[1]) mentionedUsers.push(match[1]); // @[name](name)
    if (match[2]) mentionedUsers.push(match[2]); // @name
    }
    mentionedUsers.forEach((username) => {
      addNotification({
        user: username,
        message: `You were mentioned in task "${task.title}": "${mentionInput}"`,
        link: `/projects/${task.projectId}/tasks/${task.id}?commentId=${res.data.id}`,
      });
    });

    setMentionInput("");
    setShowEmojiPicker(false);
  };

  if (!open || !task) return null;

  return (
    <div
      className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-lg z-50 flex flex-col"
      style={{ maxHeight: "100vh" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b px-6 py-3 flex-shrink-0">
        <h2 className="text-lg font-extrabold">{task.title}</h2>
        <button onClick={onClose} className="text-gray-600 text-2xl font-extrabold">×</button>
      </div>

      {/* Input Area */}
      <div className="border-t px-6 py-4 flex-shrink-0 bg-white">
        <div className="relative">
          <MentionsInput
            value={mentionInput}
            onChange={e => setMentionInput(e.target.value)}
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
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaceSmileIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setMentionInput(mentionInput + "@")}
                className="text-gray-600 hover:text-gray-800"
              >
                <AtSymbolIcon className="h-5 w-5" />
              </button>
            </div>
            <button
              className="bg-blue-700 text-white px-4 py-1 rounded text-sm"
              onClick={handleAddComment}
            >
              Send
            </button>
          </div>
          {showEmojiPicker && (
            <div className="absolute z-50 mt-2">
              <Picker
                data={data}
                onEmojiSelect={(emoji) =>
                  setMentionInput((prev) => (prev || "") + emoji.native)
                }
                theme="light"
              />
            </div>
          )}
        </div>
      </div>

      {/* Comments List - scrollable */}
      <div className="overflow-y-auto flex-1 px-6 py-4" style={{ minHeight: 0 }}>
        {comments.map((comment, ci) => (
          <div
            key={comment.id || ci}
            ref={el => {
              if (comment.id) commentRefs.current[comment.id] = el;
            }}
            className="flex items-start gap-2 mb-4"
          >
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
                {comment.author[0].toUpperCase()}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">
                {comment.author} • {new Date(comment.createdAt).toLocaleString()}
              </div>
              <div className="bg-gray-100 rounded px-3 py-2 text-sm">
                <p>{comment.text}</p>
                {comment.fileUrl && (
                  <div className="mt-2">
                    <a
                      href={comment.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      File Attachment
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
         ))}
        <div ref={commentsEndRef} />
      </div>
    </div>
  );
}
