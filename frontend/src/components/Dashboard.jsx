import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-80">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <p>Welcome to your dashboard!</p>
        <div className="mt-4">
          <h2 className="text-lg font-bold">Performance:</h2>
          {/* Placeholder for graphs */}
          <div className="bg-gray-200 h-40 mt-2 rounded-lg">Graph 1</div>
          <div className="bg-gray-200 h-40 mt-2 rounded-lg">Graph 2</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
