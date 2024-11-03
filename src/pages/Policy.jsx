import React, { useState, useEffect } from 'react';
import { Footer, Navbar } from '../components';

function Policy() {
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
    <div className={`min-w-screen min-h-screen ${darkMode ? 'dark:bg-slate-800' : 'bg-gray-100'}`}>
      <div className='max-w-[1480px] mx-auto poppins-regular'>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className={`w-full pt-24 px-8 md:px-24 pb-6 space-y-8 text-start ${darkMode ? 'dark:bg-slate-900 text-gray-300' : 'bg-white text-gray-800'}`}>
          <h2 className={`text-3xl font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Disclaimer:</h2>
          <p>All the books and study resources hosted on Freeway are provided for informational and educational purposes only. We do not claim ownership of any of the resources available on the website.</p>
          <p>The books and study materials present on Freeway have been compiled from various sources and are made available on our website as a service to our users. We do not endorse any of the resources or their contents and make no representation or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.</p>
          <p>Users of Freeway should use their own discretion when accessing or utilizing any of the resources available on the website. We shall not be liable for any damages, losses, or expenses arising from the use of the resources on Freeway or from any action taken by the users of the website.</p>
          <p>By accessing and using Freeway, you acknowledge and agree to this disclaimer and our terms of service. If you do not agree with these terms, please do not access or use our website.</p>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Policy;
