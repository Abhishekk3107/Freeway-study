import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../../context/AdminAuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { handleLogout } = useContext(AdminAuthContext);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || null);
    const [imageModalOpen, setImageModalOpen] = useState(false);

    useEffect(() => {
        // Load the stored profile image from localStorage
        const storedImage = localStorage.getItem("profileImage");
        if (storedImage) {
            setProfileImage(storedImage);
        }
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    const onLogout = () => {
        handleLogout();
        navigate("/admin/login");
    };

    const handleProfileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                localStorage.setItem("profileImage", reader.result); // Save to localStorage
                setProfileImage(reader.result);
                setDropdownOpen(false); // Close dropdown after changing profile
            };
            reader.readAsDataURL(file);
        }
    };

    const openImageModal = (event) => {
        event.stopPropagation(); // Prevent dropdown from closing
        setImageModalOpen(true);
        setDropdownOpen(false); // Close dropdown when opening the modal
    };

    const closeImageModal = () => {
        setImageModalOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".dropdown-menu")) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-white w-[90%] lg:w-[80%] h-16 flex fixed top-0 right-0 shadow-[4px_4px_6px_-1px_rgba(0,0,0,0.1)] z-10">
            <div className="flex-1 flex justify-center items-center">
                <h1 className="font-bold text-xl md:text-2xl">
                    <span className="text-[#4B0082]">ADMIN</span>
                    <span className="hidden sm:inline"> DASHBOARD</span>
                </h1>
            </div>

            <div className="flex items-center mr-6 relative dropdown-menu">
                {/* Profile Icon */}
                {profileImage ? (
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="w-8 h-8 rounded-full cursor-pointer"
                        onClick={toggleDropdown}
                    />
                ) : (
                    <i
                        className="fas fa-user-circle text-[#4B0082] text-2xl cursor-pointer"
                        onClick={toggleDropdown}
                        title="Profile"
                    />
                )}

                {/* Dropdown Menu */}
                {dropdownOpen && (
                    <div className="absolute right-0 mt-28 w-48 bg-white border border-[#ddd] rounded-lg shadow-lg">
                        <ul>
                            {profileImage && (
                                <li
                                    onClick={openImageModal}
                                    className="text-sm text-[#4B0082] px-4 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                    View Profile Image
                                </li>
                            )}
                            <li className="text-sm text-[#4B0082] px-4 py-2 cursor-pointer hover:bg-gray-100">
                                <label htmlFor="profile-upload" className="cursor-pointer">
                                    Change Profile Picture
                                </label>
                                <input
                                    type="file"
                                    id="profile-upload"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleProfileChange}
                                />
                            </li>
                            <li
                                onClick={onLogout}
                                className="text-sm text-[#4B0082] px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-b-lg"
                            >
                                Log Out
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Profile Image Modal */}
            {imageModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20"
                    onClick={closeImageModal} // Close modal when clicking outside
                >
                    <div
                        className="bg-white p-4 rounded-lg shadow-lg relative modal-content"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-600 text-xl"
                            onClick={closeImageModal}
                        >
                            &times;
                        </button>
                        <img src={profileImage} alt="Profile" className="w-64 h-64 object-cover rounded-lg" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
