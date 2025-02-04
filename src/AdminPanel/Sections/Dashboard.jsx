import React from 'react';

function Dashboard() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#4B0082] text-white py-10">
      {/* Header */}
      <div className="w-full max-w-4xl bg-[#4B0082] p-5 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold">Analytics</h2>
      </div>

      {/* Admin Cards */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {['Admin 1', 'Admin 2', 'Admin 3'].map((admin, index) => (
          <div
            key={index}
            className="bg-white text-black p-5 rounded-xl shadow-lg flex flex-col items-center transition-all"
          >
            <div className="w-16 h-16 bg-gray-300 rounded-full mb-3"></div>
            <h3 className="text-lg font-semibold">{admin}</h3>
          </div>
        ))}
      </div>

      {/* Dashboard Analytics */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {/* Provided Resources */}
        <div className="bg-white text-black p-5 rounded-xl shadow-lg">
          <h3 className="font-semibold text-lg mb-4">Provided Resources</h3>
          <img src="https://via.placeholder.com/400x200" alt="Graph" className="w-full rounded-lg" />
        </div>

        {/* Downloaded Resources */}
        <div className="bg-white text-black p-5 rounded-xl shadow-lg">
          <h3 className="font-semibold text-lg mb-4">Downloaded Resources</h3>
          <img src="https://via.placeholder.com/400x200" alt="Graph" className="w-full rounded-lg" />
        </div>
      </div>

      {/* Website Traffic */}
      <div className="w-full max-w-4xl mt-6 bg-white text-black p-5 rounded-xl shadow-lg">
        <h3 className="font-semibold text-lg mb-4">Website Traffic</h3>
        <img src="https://via.placeholder.com/800x300" alt="Graph" className="w-full rounded-lg" />
      </div>
    </div>
  );
}

export default Dashboard;
