import React, { useEffect, useState } from "react";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    fullName: "Shubham",
    email: "Shubham12@gmail.com",
    phone: "8750432487",
    password: "Shubh@1234",
    id: "23123",
    profileImage: localStorage.getItem("profileImage") || "", // Fetch from Local Storage
  });

  const [editedFullName, setEditedFullName] = useState(profileData.fullName);
  const [editedPhone, setEditedPhone] = useState(profileData.phone); // New state for editable phone number
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    console.log("Profile Component Loaded");
  }, []);

  // Handle Full Name Change
  const handleNameChange = (e) => {
    setEditedFullName(e.target.value);
    setHasChanges(e.target.value !== profileData.fullName); // Enable save button only if name changes
  };

  // Handle Phone Number Change
  const handlePhoneChange = (e) => {
    setEditedPhone(e.target.value);
    setHasChanges(e.target.value !== profileData.phone); // Enable save button only if phone number changes
  };

  // Save Changes
  const handleSave = () => {
    setProfileData((prev) => ({ ...prev, fullName: editedFullName, phone: editedPhone }));
    setIsEditing(false);
    setHasChanges(false);
  };

  return (
    <div className="flex flex-col items-center bg-[#4B0082] text-white min-h-screen py-10 px-4">
      {/* Profile Header */}
      <div className="w-full max-w-4xl bg-[#4B0082] p-5 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold flex items-center space-x-2">
          <i className="fas fa-user-circle"></i>
          <span>Profile</span>
        </h2>
      </div>

      {/* Profile Content */}
      <div className="w-full max-w-4xl bg-white text-black mt-6 p-6 rounded-xl shadow-lg grid md:grid-cols-3 gap-6">
        {/* Personal Info */}
        <div className="col-span-2 bg-gray-100 p-5 rounded-lg">
          <h3 className="text-lg font-bold mb-4">Personal Information</h3>

          <div className="mb-2">
            <strong className="font-semibold">Full Name:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={editedFullName}
                onChange={handleNameChange}
                className="border p-1 rounded w-full text-[#4B0082] font-bold"
              />
            ) : (
              <span className="font-semibold">{profileData.fullName}</span>
            )}
          </div>

          <p className="mb-2">
            <strong className="font-semibold">Email:</strong>{" "}
            <span className="font-semibold">{profileData.email}</span>
          </p>
          <p className="mb-2">
            <strong className="font-semibold">Phone:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={editedPhone}
                onChange={handlePhoneChange}
                className="border p-1 rounded w-full text-[#4B0082] font-bold"
              />
            ) : (
              <span className="font-semibold">{profileData.phone}</span>
            )}
          </p>
          <p className="mb-4">
            <strong className="font-semibold">Password:</strong>{" "}
            <span className="font-semibold">{profileData.password}</span>
          </p>

          {/* Save & Edit Buttons */}
          <div className="flex gap-4">
            {hasChanges ? (
              <button
                onClick={handleSave}
                className="bg-[#4B0082] hover:bg-[#3A006B] text-white px-4 py-2 rounded transition-all font-bold"
              >
                <i className="fas fa-save mr-2"></i> Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-[#4B0082] hover:bg-[#3A006B] text-white px-4 py-2 rounded transition-all font-bold"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            )}
          </div>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center bg-gray-100 p-5 rounded-lg">
          <div className="w-28 h-28 border-4 border-gray-300 rounded-full flex items-center justify-center bg-white">
            {profileData.profileImage ? (
              <img
                src={profileData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <i className="fas fa-user text-6xl text-gray-500"></i>
            )}
          </div>
          <p className="mt-3 font-bold">{profileData.fullName}</p>
          <p className="text-sm font-bold text-[#4B0082]">ID No. {profileData.id}</p>
        </div>
      </div>

      {/* Uploaded Resources */}
      <div className="w-full max-w-4xl bg-white text-black mt-6 p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-bold mb-4">Resources Uploaded</h3>
        <div className="space-y-2">
          {["PYQ's", "Playlist", "Notes"].map((resource, index) => (
            <div
              key={index}
              className="bg-gray-200 p-3 rounded flex justify-between font-bold"
            >
              <span>{resource}</span>
              <span className="text-[#4B0082]">BCA</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;