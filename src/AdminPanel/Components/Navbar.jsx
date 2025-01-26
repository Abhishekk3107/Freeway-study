import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../../context/AdminAuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { handleLogout } = useContext(AdminAuthContext);

    const [dropdownOpen, setDropdownOpen] = useState(false); // State to control dropdown visibility

    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    const onLogout = () => {
        handleLogout();
        navigate("/admin/login");
    };

    const goToProfile = () => {
        navigate("/admin/profile");
    };

    return (
        <div className="bg-white w-[90%] lg:w-[80%] h-16 flex fixed top-0 right-0 shadow-[4px_4px_6px_-1px_rgba(0,0,0,0.1)] z-10">
            <div className="flex-1 flex justify-center items-center">
                <h1 className="font-bold text-xl md:text-2xl">
                    <span className="text-[#4B0082]">ADMIN</span>
                    <span className="hidden sm:inline"> DASHBOARD</span>
                </h1>
            </div>

            <div className="flex items-center mr-6 relative">
                {/* Profile Icon (FontAwesome) */}
                <i
                    className="fas fa-user-circle text-[#4B0082] text-2xl cursor-pointer"
                    onClick={toggleDropdown}
                    title="Profile"
                />

                {/* Dropdown Menu */}
                {dropdownOpen && (
                    <div className="absolute right-0 mt-28 w-40 bg-white border border-[#ddd] rounded-lg shadow-lg">
                        <ul>
                            <li
                                onClick={goToProfile}
                                className="text-sm text-[#4B0082] px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-t-lg"
                            >
                                Profile
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
        </div>
    );
};

export default Navbar;
