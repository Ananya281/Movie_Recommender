import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 border">
      <h1 className="text-3xl font-bold mb-6">🎬 Welcome to your Dashboard</h1>

      <p className="text-lg">
        Your favorite movies will appear here soon based on your selected genres and actors.
      </p>

      <p className="mt-4 text-sm text-gray-400">
        (You can now implement content-based movie recommendations!)
      </p>
    </div>
  );
};

export default Dashboard;
