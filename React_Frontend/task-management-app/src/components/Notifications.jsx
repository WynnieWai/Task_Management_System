// import React from "react";
// import { useNotifications } from "../notifications/NotificationsContext";

// export default function Notifications({ user }) {
//   const { notifications } = useNotifications();

//   const userNotifications = notifications.filter(n => n.user === user.username);

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Notifications</h1>
//       <ul className="bg-white rounded shadow divide-y">
//         {userNotifications.length === 0 ? (
//           <li className="p-4 text-gray-500">No notifications.</li>
//         ) : (
//           userNotifications.map((n) => (
//             <li key={n.id} className="p-4">
//               <div className="font-medium">{n.message}</div>
//               <div className="text-sm text-gray-500">{n.time}</div>
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { useNotifications } from "../notifications/NotificationsContext";
// import axios from "axios";
// import CommentsPanel from "./CommentsPanel";

// export default function Notifications({ user }) {
//   const { notifications, markAsRead, deleteNotification } = useNotifications();

//   // State for comments panel
//   const [commentsPanelOpen, setCommentsPanelOpen] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [usersList, setUsersList] = useState([]);
//   const [scrollToCommentId, setScrollToCommentId] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:5047/api/User")
//       .then(res => {
//         setUsersList(
//           res.data.map(u => ({
//             id: u.username,
//             display: u.username
//           }))
//         );
//       });
//   }, []);


//   // Helper to extract projectId, taskId, commentId from notification link
//   function parseTaskFromLink(link) {
//     // Example: "/projects/2/tasks/9?commentId=12"
//     const match = link?.match(/\/projects\/(\d+)\/tasks\/(\d+)\??(?:commentId=(\d+))?/);
//     if (!match) return null;
//     return { projectId: match[1], taskId: match[2], commentId: match[3] || null };
//   }

//   // Open the comment panel for the related task, scroll to commentId if present
//   const handleOpenComments = async (notification) => {
//     if (!notification.link) return;
//     const parsed = parseTaskFromLink(notification.link);
//     if (!parsed) return alert("Could not find related task.");

//     // Fetch the task data
//     try {
//       const taskRes = await axios.get(`http://localhost:5047/api/tasks/${parsed.taskId}`);
//       setSelectedTask(taskRes.data);
//       setCommentsPanelOpen(true);
//       setScrollToCommentId(parsed.commentId || null); // Pass commentId to CommentsPanel
//       markAsRead(notification.id);
//     } catch (err) {
//       alert("Failed to load task: " + (err?.response?.data || err));
//     }
//   };

//   const userNotifications = notifications.filter(
//     n => n.user?.toLowerCase() === user.username?.toLowerCase()
//   );

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Notifications</h1>
//       <ul className="bg-white rounded shadow divide-y">
//         {userNotifications.length === 0 ? (
//           <li className="p-4 text-gray-500">No notifications.</li>
//         ) : (
//           userNotifications.map((n) => (
//             <li
//               key={n.id}
//               className={`p-4 flex justify-between items-center ${n.read ? 'bg-white' : 'bg-blue-50'}`}
//             >
//               <div>
//                 {n.link ? (
//                   <span
//                     className="text-blue-600 underline cursor-pointer"
//                     onClick={() => handleOpenComments(n)}
//                   >
//                     {n.message}
//                   </span>
//                 ) : (
//                   <span>{n.message}</span>
//                 )}
//                 <div className="text-sm text-gray-500">
//                   {new Date(n.time).toLocaleString()}
//                 </div>
//                 {!n.read && (
//                   <button
//                     className="mt-2 text-xs text-blue-500 underline"
//                     onClick={() => markAsRead(n.id)}
//                   >
//                     Mark as read
//                   </button>
//                 )}
//               </div>
//               <button
//                 className="text-red-500 text-xs"
//                 onClick={() => deleteNotification(n.id)}
//                 title="Delete notification"
//               >
//                 ✕
//               </button>
//             </li>
//           ))
//         )}
//       </ul>
//       {/* Comments Panel for notification */}
//       <CommentsPanel
//         open={commentsPanelOpen}
//         onClose={() => {
//           setCommentsPanelOpen(false);
//           setSelectedTask(null);
//           setScrollToCommentId(null);
//         }}
//         task={selectedTask}
//         user={user}
//         usersList={usersList}
//         scrollToCommentId={scrollToCommentId}
//       />
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { useNotifications } from "../notifications/NotificationsContext";
import axios from "axios";
import CommentsPanel from "./CommentsPanel";
import { FaRegClock } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";


export default function Notifications({ user }) {
  const { notifications, markAsRead, deleteNotification } = useNotifications();

  // State for comments panel
  const [commentsPanelOpen, setCommentsPanelOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [scrollToCommentId, setScrollToCommentId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5047/api/User")
      .then(res => {
        setUsersList(
          res.data.map(u => ({
            id: u.username,
            display: u.username
          }))
        );
      });
  }, []);


  // Helper to extract projectId, taskId, commentId from notification link
  function parseTaskFromLink(link) {
    // Example: "/projects/2/tasks/9?commentId=12"
    const match = link?.match(/\/projects\/(\d+)\/tasks\/(\d+)\??(?:commentId=(\d+))?/);
    if (!match) return null;
    return { projectId: match[1], taskId: match[2], commentId: match[3] || null };
  }

  // Open the comment panel for the related task, scroll to commentId if present
  const handleOpenComments = async (notification) => {
    if (!notification.link) return;
    const parsed = parseTaskFromLink(notification.link);
    if (!parsed) return alert("Could not find related task.");

    // Fetch the task data
    try {
      const taskRes = await axios.get(`http://localhost:5047/api/tasks/${parsed.taskId}`);
      setSelectedTask(taskRes.data);
      setCommentsPanelOpen(true);
      setScrollToCommentId(parsed.commentId || null); // Pass commentId to CommentsPanel
      markAsRead(notification.id);
    } catch (err) {
      alert("Failed to load task: " + (err?.response?.data || err));
    }
  };

  const userNotifications = notifications.filter(
    n => n.user?.toLowerCase() === user.username?.toLowerCase()
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <ul className="bg-white rounded shadow divide-y">
        {userNotifications.length === 0 ? (
          <li className="p-4 text-gray-500">No notifications.</li>
        ) : (
          userNotifications.map((n) => (
            <li
              key={n.id}
              className={`p-4 flex justify-between items-center ${n.read ? 'bg-white' : 'bg-blue-50'}`}
            >
              <div>
                {n.link ? (
                  <span
                    className="text-gray-600 cursor-pointer"
                    onClick={() => handleOpenComments(n)}
                  >
                    {n.message}
                  </span>
                ) : (
                  <span>{n.message}</span>
                )}
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                <FaRegClock className="w-3 h-3" />
                <span>{new Date(n.time).toLocaleString()}</span>
              </div>
                {!n.read && (
                  <button
                    className="mt-4 px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={() => markAsRead(n.id)}
                  >
                    Mark as read
                  </button>
                )}
              </div>
              <button
                className="text-gray-400 hover:text-red-600 transition"
                onClick={() => deleteNotification(n.id)}
                title="Delete notification"
              >
                <FaTimes className="w-4 h-4 font-bold" />
              </button>
            </li>
          ))
        )}
      </ul>
      {/* Comments Panel for notification */}
      <CommentsPanel
        open={commentsPanelOpen}
        onClose={() => {
          setCommentsPanelOpen(false);
          setSelectedTask(null);
          setScrollToCommentId(null);
        }}
        task={selectedTask}
        user={user}
        usersList={usersList}
        scrollToCommentId={scrollToCommentId}
      />
    </div>
  );
}

