import React, { useState } from 'react';
import { MapPin, Mail, X, Bell, Share2, MessageSquare, Upload, Phone, Send } from 'lucide-react';

const notifications = [
  {
    id: 1,
    name: 'Tarush',
    location: 'Delhi',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
    content: 'Shared a new resource: Advanced JavaScript Course Materials',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    name: 'Shubham',
    location: 'Delhi',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    content: 'Added new notes for Database Management System',
    timestamp: '3 hours ago'
  },
  {
    id: 3,
    name: 'Bhavik',
    location: 'Delhi',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    content: 'Posted a question in Python Programming forum',
    timestamp: '5 hours ago'
  },
  {
    id: 4,
    name: 'Abhishek',
    location: 'Delhi',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
    content: 'Uploaded new study materials for Web Development',
    timestamp: '1 day ago'
  },
  {
    id: 5,
    name: 'Rahul',
    location: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    content: 'Scheduled a group study session for Data Structures',
    timestamp: '1 day ago'
  },
  {
    id: 6,
    name: 'Priya',
    location: 'Bangalore',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    content: 'Created a new playlist for Algorithm tutorials',
    timestamp: '2 days ago'
  },
  {
    id: 7,
    name: 'Amit',
    location: 'Pune',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    content: 'Shared exam preparation tips in the forum',
    timestamp: '2 days ago'
  },
  {
    id: 8,
    name: 'Neha',
    location: 'Chennai',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    content: 'Posted new resources for Computer Networks',
    timestamp: '3 days ago'
  }
];

function NotificationPopup({ notification, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#5A2175]"
        >
          <X size={20} />
        </button>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={notification.avatar}
              alt={notification.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-[#5A2175] font-bold text-xl">
              {notification.name}
            </h3>
            <div className="flex items-center gap-1 text-gray-600 font-semibold">
              <MapPin size={16} />
              <span>{notification.location}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <p className="text-gray-800 font-semibold">{notification.content}</p>
          <p className="text-gray-500 text-sm mt-2">{notification.timestamp}</p>
        </div>
        
        <button 
          className="w-full bg-[#5A2175] hover:bg-[#3A006B] text-white py-2 px-4 rounded-lg transition-all font-bold flex items-center justify-center gap-2"
        >
          <Mail size={20} />
          Send Message
        </button>
      </div>
    </div>
  );
}

function ShareResourcesPopup({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#5A2175]"
        >
          <X size={20} />
        </button>
        
        <h3 className="text-[#5A2175] font-bold text-xl mb-4 flex items-center gap-2">
          <Share2 size={24} />
          Share Your Resources
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Resource Title</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5A2175]"
              placeholder="Enter resource title"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5A2175] h-32"
              placeholder="Describe your resource"
            ></textarea>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload size={32} className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600">Drag and drop your files here or click to browse</p>
          </div>
          
          <button className="w-full bg-[#5A2175] hover:bg-[#3A006B] text-white py-2 px-4 rounded-lg transition-all font-bold flex items-center justify-center gap-2">
            <Send size={20} />
            Share Resource
          </button>
        </div>
      </div>
    </div>
  );
}

function ContactUsPopup({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#5A2175]"
        >
          <X size={20} />
        </button>
        
        <h3 className="text-[#5A2175] font-bold text-xl mb-4 flex items-center gap-2">
          <MessageSquare size={24} />
          Contact Us
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5A2175]"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4B0082]"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4B0082] h-32"
              placeholder="Type your message here"
            ></textarea>
          </div>
          
          <button className="w-full bg-[#4B0082] hover:bg-[#3A006B] text-white py-2 px-4 rounded-lg transition-all font-bold flex items-center justify-center gap-2">
            <Send size={20} />
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

function Notification() {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showShareResources, setShowShareResources] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);

  return (
    <div className="flex flex-col items-center bg-[#5A2175] text-white min-h-screen py-10 px-4">
      {/* Notification Header */}
      <div className="w-full max-w-4xl bg-[#5A2175] p-5 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold flex items-center space-x-2">
          <Bell className="mr-2" />
          <span>Notification</span>
        </h2>
      </div>
      
      {/* Action Buttons */}
      <div className="w-full max-w-4xl mt-4 flex gap-4">
        <button
          onClick={() => setShowShareResources(true)}
          className="flex-1 bg-white text-[#5A2175] py-2 px-4 rounded-lg transition-all font-bold flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          <Share2 size={20} />
          Share Resources
        </button>
        <button
          onClick={() => setShowContactUs(true)}
          className="flex-1 bg-white text-[#5A2175] py-2 px-4 rounded-lg transition-all font-bold flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          <Phone size={20} />
          Contact Us
        </button>
      </div>
      
      {/* Notification Content */}
      <div className="w-full max-w-4xl bg-white mt-6 p-6 rounded-xl shadow-lg">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className="bg-gray-100 rounded-lg p-4 flex items-center justify-between transition-all hover:shadow-lg cursor-pointer"
              onClick={() => setSelectedNotification(notification)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src={notification.avatar}
                    alt={notification.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-[#5A2175] font-bold text-lg">
                    {notification.name}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-600 font-semibold">
                    <MapPin size={16} />
                    <span>{notification.location}</span>
                  </div>
                </div>
              </div>
              
              <button 
                className="p-2.5 text-[#5A2175] hover:bg-[#4B0082] hover:text-white rounded-lg transition-all font-bold"
                aria-label="Send message"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNotification(notification);
                }}
              >
                <Mail size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Popups */}
      {selectedNotification && (
        <NotificationPopup 
          notification={selectedNotification} 
          onClose={() => setSelectedNotification(null)} 
        />
      )}
      
      {showShareResources && (
        <ShareResourcesPopup onClose={() => setShowShareResources(false)} />
      )}
      
      {showContactUs && (
        <ContactUsPopup onClose={() => setShowContactUs(false)} />
      )}
    </div>
  );
}

export default Notification;