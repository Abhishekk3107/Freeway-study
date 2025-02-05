import React from 'react';

function Dashboard() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#5A2175] text-white py-10 px-4">

      <div className="w-full max-w-full flex flex-wrap gap-4 mt-6">
        {['Tarush', 'Shubham', 'Abhishek','Bhavik'].map((admin, index) => (
          <div
            key={index}
            className="bg-white text-black p-5 rounded-xl shadow-lg flex-1 flex-col items-center transition-all"
          >
            <div className="w-16 h-16 bg-gray-300 rounded-full mb-3 mx-auto">
              <img src="https://ik.imagekit.io/zt6midmnc/image_1_wuv5gBR77W.png" alt="" />
            </div>
            <h3 className="text-lg font-semibold">{admin}</h3>
          </div>
        ))}
      </div>

      <div className="w-full bg-[#5b2a70] p-5 mt-2 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold">Analytics</h2>
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
