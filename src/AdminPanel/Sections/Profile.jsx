import React, { useEffect, useState } from "react";
import { Camera, User } from "lucide-react";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    fullName: "Shubham",
    email: "Shubham12@gmail.com",
    phone: "8750432487",
    password: "Shubh@1234",
    id: "23123",
    profileImage: localStorage.getItem("profileImage") || "",
  });

  const [editedFullName, setEditedFullName] = useState(profileData.fullName);
  const [editedPhone, setEditedPhone] = useState(profileData.phone);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    console.log("Profile Component Loaded");
  }, []);

  const handleNameChange = (e) => {
    setEditedFullName(e.target.value);
    setHasChanges(e.target.value !== profileData.fullName);
  };

  const handlePhoneChange = (e) => {
    setEditedPhone(e.target.value);
    setHasChanges(e.target.value !== profileData.phone);
  };

  const handleSave = () => {
    setProfileData((prev) => ({
      ...prev,
      fullName: editedFullName,
      phone: editedPhone,
    }));
    setIsEditing(false);
    setHasChanges(false);
  };

  const handleProfilePicClick = () => {
    setShowOptions(!showOptions);
  };

  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      const video = document.createElement("video");
      video.srcObject = stream;
      video.autoplay = true;
      video.style.position = "fixed";
      video.style.top = "50%";
      video.style.left = "50%";
      video.style.transform = "translate(-50%, -50%)";
      video.style.width = "100%";
      video.style.maxWidth = "400px";
      video.style.borderRadius = "10px";
      video.style.zIndex = "1000";
      video.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
  
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      overlay.style.zIndex = "999";
      
      const captureButton = document.createElement("button");
      captureButton.innerText = "Capture";
      captureButton.style.position = "fixed";
      captureButton.style.bottom = "20px";
      captureButton.style.left = "50%";
      captureButton.style.transform = "translateX(-50%)";
      captureButton.style.background = "#4B0082";
      captureButton.style.color = "white";
      captureButton.style.padding = "10px 20px";
      captureButton.style.border = "none";
      captureButton.style.borderRadius = "5px";
      captureButton.style.cursor = "pointer";
      captureButton.style.zIndex = "1001";
  
      document.body.appendChild(overlay);
      document.body.appendChild(video);
      document.body.appendChild(captureButton);
  
      captureButton.onclick = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageDataUrl = canvas.toDataURL("image/png");
        setProfileData((prev) => ({ ...prev, profileImage: imageDataUrl }));
        localStorage.setItem("profileImage", imageDataUrl);
  
        stream.getTracks().forEach(track => track.stop());
        video.remove();
        captureButton.remove();
        overlay.remove();
      };
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
    
  const handleSelectFromGallery = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setProfileData((prev) => ({ ...prev, profileImage: reader.result }));
          localStorage.setItem("profileImage", reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="flex flex-col items-center bg-[#4B0082] text-white min-h-screen py-10">
      {/* Profile Header */}
      <div className="w-full max-w-4xl bg-[#4B0082] p-5 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold flex items-center space-x-2">
          <User className="w-6 h-6" />
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
                className="border p-1 rounded text-[#4B0082] font-bold inline-block w-auto"
              />
            ) : (
              <span className="font-semibold">{profileData.fullName}</span>
            )}
          </div>

          <div className="mb-2">
            <strong className="font-semibold">Email:</strong>{" "}
            <span className="font-semibold">{profileData.email}</span>
          </div>

          <div className="mb-2">
            <strong className="font-semibold">Phone:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={editedPhone}
                onChange={handlePhoneChange}
                className="border p-1 rounded text-[#4B0082] font-bold inline-block w-auto"
              />
            ) : (
              <span className="font-semibold">{profileData.phone}</span>
            )}
          </div>

          <div className="mb-4">
            <strong className="font-semibold">Password:</strong>{" "}
            <span className="font-semibold">********</span>
          </div>

          {/* Save & Edit Buttons */}
          <div className="flex gap-4">
            {hasChanges ? (
              <button
                onClick={handleSave}
                className="bg-[#4B0082] hover:bg-[#3A006B] text-white px-4 py-2 rounded transition-all font-bold"
              >
                Save
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
        <div className="flex flex-col items-center bg-gray-100 p-5 rounded-lg relative">
          <div className="w-28 h-28 border-4 border-gray-300 rounded-full flex items-center justify-center bg-white relative">
            {profileData.profileImage ? (
              <img
                src={profileData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <User className="w-16 h-16 text-gray-500" />
            )}
            {/* Camera Icon */}
            <button
              onClick={handleProfilePicClick}
              className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md"
            >
              <Camera className="w-4 h-4 text-[#4B0082]" />
            </button>
          </div>
          <p className="mt-3 font-bold">{profileData.fullName}</p>
          <p className="text-sm font-bold text-[#4B0082]">ID No. {profileData.id}</p>

          {/* Profile Picture Options */}
          {showOptions && (
            <div className="absolute top-32 bg-white shadow-md rounded-lg p-2 flex flex-col gap-2">
              <button onClick={handleOpenCamera} className="text-black hover:bg-gray-200 px-4 py-1 rounded">
                Open Camera
              </button>
              <button onClick={handleSelectFromGallery} className="text-black hover:bg-gray-200 px-4 py-1 rounded">
                Select from Gallery
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Uploaded Resources */}
      <div className="w-full max-w-4xl bg-white text-black mt-6 p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-bold mb-4">Resources Uploaded</h3>
        <div className="space-y-2">
          {["PYQ's", "Playlist", "Notes"].map((resource, index) => (
            <div key={index} className="bg-gray-200 p-3 rounded flex justify-between font-bold">
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