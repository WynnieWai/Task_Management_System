import React from "react";

export default function CommentsDiscussion({ user }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Comments & Discussion</h1>
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Announcements</h2>
        <div className="mb-2">Project meeting at 3pm today.</div>
        <div className="mb-2">Submit your tasks by Friday.</div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Comments</h2>
        <div className="mb-2"><span className="font-bold">manager:</span> Please update your progress.</div>
        <div className="mb-2"><span className="font-bold">student:</span> I have completed my part.</div>
        <div className="mb-2"><span className="font-bold">admin:</span> Good job, team!</div>
      </div>
    </div>
  );
} 