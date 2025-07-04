// // import React, { createContext, useState, useContext } from "react";

// // const NotificationsContext = createContext();

// // export const useNotifications = () => useContext(NotificationsContext);

// // export const NotificationsProvider = ({ children }) => {
// //   const [notifications, setNotifications] = useState([]);

// //   const addNotification = (notif) => {
// //     setNotifications((prev) => [notif, ...prev]);
// //   };

// //   return (
// //     <NotificationsContext.Provider value={{ notifications, addNotification }}>
// //       {children}
// //     </NotificationsContext.Provider>
// //   );
// // };

// import React, { createContext, useState, useContext, useEffect } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// const NotificationsContext = createContext();
// export const useNotifications = () => useContext(NotificationsContext);

// // Set your API base (adjust port as needed)
// const API_BASE = "http://localhost:5047/api/Notification";
// // If using proxy, can keep as "/api/Notification"

// export const NotificationsProvider = ({ user, children }) => {
//   const [notifications, setNotifications] = useState([]);
//    const location = useLocation();

//   useEffect(() => {
//     if (!user?.username) return;
//     axios.get(`${API_BASE}?user=${user.username}`)
//       .then(res => setNotifications(res.data))
//       .catch(err => setNotifications([]));
//   }, [user?.username]);

//     // const addNotification = async (notif) => {
//     //   await axios.post("/api/Notification", notif);
//     //   // Only push to state if it is for this user
//     //   if (notif.user === user.username) {
//     //     setNotifications(prev => [notif, ...prev]);
//     //   }
//     // };
// // const addNotification = async (notif) => {
// //   try {
// //     const res = await axios.post(API_BASE, notif);
// //     console.log("[addNotification] Notification POST response:", res.data);
// //     if (notif.user === user.username) {
// //       setNotifications(prev => [notif, ...prev]);
// //     }
// //   } catch (e) {
// //     console.error("[addNotification] Failed to send notification:", e);
// //     alert("Notification failed: " + (e.response?.data || e.message));
// //   }
// // };
//   // const addNotification = async (notif) => {
//   //   try {
//   //     const res = await axios.post(API_BASE, notif);
//   //     console.log("[addNotification] Notification POST response:", res.data);
//   //     if (user && user.username && notif.user === user.username) {
//   //       setNotifications(prev => [res.data, ...prev]);
//   //     }
//   //   } catch (e) {
//   //     console.error("[addNotification] Failed to send notification:", e);
//   //     alert("Notification failed: " + (e.response?.data || e.message));
//   //   }
//   // };

  
//   const fetchNotifications = async () => {
//     if (!user?.username) return;
//     const res = await axios.get(`${API_BASE}?user=${user.username}`);
//     setNotifications(res.data);
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, [user?.username, location.pathname]);

//   const addNotification = async (notif) => {
//     await axios.post(API_BASE, notif);
//     fetchNotifications(); // refresh list
//   };

//   const markAsRead = async (notifId) => {
//     await axios.patch(`${API_BASE}/${notifId}/read`);
//     setNotifications(prev =>
//       prev.map(n => n.id === notifId ? { ...n, read: true } : n)
//     );
//   };

//   const deleteNotification = async (notifId) => {
//     await axios.delete(`${API_BASE}/${notifId}`);
//     setNotifications(prev => prev.filter(n => n.id !== notifId));
//   };

//   return (
//     <NotificationsContext.Provider
//       value={{
//         notifications,
//         addNotification,
//         markAsRead,
//         deleteNotification,
//       }}
//     >
//       {children}
//     </NotificationsContext.Provider>
//   );
// };


import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
const NotificationsContext = createContext();
export const useNotifications = () => useContext(NotificationsContext);

// Set your API base (adjust port as needed)
const API_BASE = "http://localhost:5047/api/Notification";
// If using proxy, can keep as "/api/Notification"

export const NotificationsProvider = ({ user, children }) => {
  const [notifications, setNotifications] = useState([]);
   const location = useLocation();

  useEffect(() => {
    if (!user?.username) return;
    axios.get(`${API_BASE}?user=${user.username}`)
      .then(res => setNotifications(res.data))
      .catch(err => setNotifications([]));
  }, [user?.username]);

    // const addNotification = async (notif) => {
    //   await axios.post("/api/Notification", notif);
    //   // Only push to state if it is for this user
    //   if (notif.user === user.username) {
    //     setNotifications(prev => [notif, ...prev]);
    //   }
    // };
// const addNotification = async (notif) => {
//   try {
//     const res = await axios.post(API_BASE, notif);
//     console.log("[addNotification] Notification POST response:", res.data);
//     if (notif.user === user.username) {
//       setNotifications(prev => [notif, ...prev]);
//     }
//   } catch (e) {
//     console.error("[addNotification] Failed to send notification:", e);
//     alert("Notification failed: " + (e.response?.data || e.message));
//   }
// };
  // const addNotification = async (notif) => {
  //   try {
  //     const res = await axios.post(API_BASE, notif);
  //     console.log("[addNotification] Notification POST response:", res.data);
  //     if (user && user.username && notif.user === user.username) {
  //       setNotifications(prev => [res.data, ...prev]);
  //     }
  //   } catch (e) {
  //     console.error("[addNotification] Failed to send notification:", e);
  //     alert("Notification failed: " + (e.response?.data || e.message));
  //   }
  // };

  
  const fetchNotifications = async () => {
    if (!user?.username) return;
    const res = await axios.get(`${API_BASE}?user=${user.username}`);
    setNotifications(res.data);
  };

  useEffect(() => {
    fetchNotifications();
  }, [user?.username, location.pathname]);

  const addNotification = async (notif) => {
    await axios.post(API_BASE, notif);
    fetchNotifications(); // refresh list
  };

  const markAsRead = async (notifId) => {
    await axios.patch(`${API_BASE}/${notifId}/read`);
    setNotifications(prev =>
      prev.map(n => n.id === notifId ? { ...n, read: true } : n)
    );
  };

  const deleteNotification = async (notifId) => {
    await axios.delete(`${API_BASE}/${notifId}`);
    setNotifications(prev => prev.filter(n => n.id !== notifId));
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
