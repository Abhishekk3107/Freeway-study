import React from 'react';
import { Resources as StudyMaterialsSection, Navbar } from '../components';

function Resources() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [resources, setResources] = React.useState([]); // Default empty array

  React.useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  React.useEffect(() => {
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
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="w-full min-h-screen">
        <StudyMaterialsSection resources={resources} /> {/* Ensure it always receives an array */}
      </div>
    </>
  );
}

export default Resources;
