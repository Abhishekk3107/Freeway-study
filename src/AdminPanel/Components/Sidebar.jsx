import React, { useState } from "react";
import logo from '../../assets/storytelling.png';

const sidebar = [
  { icon: "fa-solid fa-chart-column", heading: "Dashboard" },
  { icon: "fa-file-invoice", heading: "Resources" },
  { icon: "fa-regular fa-message", heading: "Feedbacks" },
  { icon: "fa-regular fa-newspaper", heading: "Latest News" },
  { icon: "fa-solid fa-comment-dots", heading: "Notification" },
  { icon: "fas fa-user-circle", heading: "Profile" },


];

const Sidebar = ({ sidebarRef, handleScroll, activeComponent, setActiveComponent }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`bg-white w-full h-screen overflow-y-auto ${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
      {/* Sidebar Header */}
      <div className="bg-white w-full h-16 flex justify-between items-center fixed top-0 border-b z-10 left-0 px-4">
        <div className="flex items-center">
          <img src={logo} className="w-8" alt="Logo" />
          <span className="text-[#5A2175] text-2xl font-bold hidden lg:inline ml-2">Freeway study</span>
        </div>

        {/* Hamburger Icon (Visible on mobile) */}
        <button
          className="lg:hidden p-2 rounded-md focus:outline-none"
          onClick={toggleSidebar}
        >
          <i className="fa-solid fa-bars text-[#5A2175]" />
        </button>
      </div>

      {/* Sidebar Items */}
      <div className="pt-20 px-2 lg:px-4" ref={sidebarRef} onScroll={handleScroll}>
        <ul className="flex flex-col gap-1 lg:gap-2">
          {sidebar.map((item, index) => {
            return (
              <li
                key={index}
                className={`flex justify-between items-center p-2 lg:p-3 rounded-lg cursor-pointer transition-colors ${activeComponent === item.heading
                    ? "bg-[#5A2175] text-white"
                    : "hover:bg-gray-100"
                  }`}
                onClick={() => setActiveComponent(item.heading)}
              >
                <div className="flex items-center justify-center">
                  <i
                    className={`fa-solid ${item.icon} w-5 h-5 mt-2 lg:w-6 lg:h-6 ${activeComponent === item.heading ? "text-white" : "text-slate-900"}`}
                    title={item.heading}
                  />
                  {/* Text (Visible on large screens) */}
                  <span
                    className={`ml-3 text-sm lg:text-base font-medium hidden lg:inline ${activeComponent === item.heading
                        ? "text-white"
                        : "text-slate-900"}`}
                  >
                    {item.heading}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
