import './App.css'
import { useState , useEffect } from 'react';
import { Features, HeroSection, Navbar, ResourcesForSection } from './components'
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }


  return (
   <>
   <div className='dark:bg-slate-800 min-w-screen min-h-screen'>
    <div className='max-w-[1480px] mx-auto'>
    <BrowserRouter>
    <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
    <HeroSection isDarkMode={darkMode} />
    <ResourcesForSection isDarkMode={darkMode}/>
    <Features isDarkMode={darkMode}/>
    </BrowserRouter>
    </div>
   </div>
   </>
  )
}

export default App
