import React, { useState, useEffect } from 'react';
import { Footer, Navbar } from '../components';
import admin from "../assets/admin_login.png";

function Admin() {
  const [darkMode, setDarkMode] = useState(false);

  // Check for saved theme or user preference
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode and save preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-w-screen min-h-screen ${darkMode ? 'dark:bg-slate-800' : 'bg-gray-200'}`}>
      <div className="max-w-[1480px] mx-auto poppins-regular">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-200px)] px-8 md:px-24 pt-16 pb-16">
          {/* Left Login Panel */}
          <div
            className={`mt-16 lg:mt-0 rounded-lg shadow-lg p-8 w-full lg:w-1/3 ${
              darkMode ? 'bg-slate-900 text-gray-300' : 'bg-white text-gray-800'
            }`}
          >
            <h2 className={`text-3xl font-medium mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Admin Login</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded border dark:bg-slate-800 dark:border-gray-600 dark:text-white"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 rounded border dark:bg-slate-800 dark:border-gray-600 dark:text-white"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
            <div className="text-sm mt-4 text-center">
              <a
                href="#"
                className="text-blue-500 hover:underline dark:text-blue-400"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="w-full lg:w-2/3 flex items-center justify-center mt-10 ">
            <div className="hidden lg:block relative w-full">
              <img
                src={admin}
                alt="Login Illustration"
                className="h-800 w-auto object-cover "
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Admin;
