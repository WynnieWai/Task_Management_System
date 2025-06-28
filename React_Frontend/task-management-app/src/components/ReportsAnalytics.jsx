import React from "react";

export default function ReportsAnalytics() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>
      <button className="mb-4 bg-green-600 text-white px-4 py-2 rounded">Export Report</button>
      <div className="bg-gray-100 p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Usage Charts (Dummy)</h2>
        <div className="h-32 bg-white border rounded flex items-center justify-center">[Charts Placeholder]</div>
      </div>
    </div>
  );
} 