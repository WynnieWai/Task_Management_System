import React from "react";

export default function Profile({ user }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="bg-white shadow rounded p-6 space-y-4 max-w-md">
        <div>
          <span className="font-semibold">Username: </span>
          {user.username}
        </div>
        <div>
          <span className="font-semibold">Role: </span>
          {user.role}
        </div>
        <div>
          <span className="font-semibold">Email: </span>
          user@example.com {/* Update with your real user object if email is stored */}
        </div>
      </div>
    </div>
  );
}
