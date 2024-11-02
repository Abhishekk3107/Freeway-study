import { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '../assets/storytelling.png'

function NavLink({ to, children, mobile = false }) {
  const baseClasses = "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-sm font-medium"
  const desktopClasses = "px-3 py-2"
  const mobileClasses = "block px-3 py-2 text-base"

  return (
    <Link to={to} className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses}`}>
      {children}
    </Link>
  )
}

export default function Navbar({darkMode , toggleDarkMode}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFixed, setIsFixed] = useState(false)



  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 100) // Fix navbar after scrolling 100px
      setIsMenuOpen(false);
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <nav className={`bg-white dark:bg-gray-800 shadow-md absolute top-0 left-0
            w-full z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/">
                <span className="text-2xl font-bold text-blue-800 dark:text-blue-400 flex gap-2 justify-center">
                  <img src={logo} alt="Freeway Logo" className='w-8' />
                  Freeway
                </span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4 poppins-regular">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/resources">Resources</NavLink>
                <NavLink to="/about">About Us</NavLink>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={toggleDarkMode}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <div className="ml-4 mt-1.5 md:hidden">
                <button
                  onClick={toggleMenu}
                  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden flex justify-center">
            <div className="flex flex-row px-2 pt-2 pb-3 space-x-4 sm:px-3">
              <NavLink to="/" mobile>Home</NavLink>
              <NavLink to="/resources" mobile>Resources</NavLink>
              <NavLink to="/about" mobile>About Us</NavLink>
            </div>
          </div>
        )}
      </nav>
      <nav className={`bg-white dark:bg-gray-800 shadow-md transition-all duration-500 ease-in-out 
            ${isFixed ? 'fixed top-0 left-0 translate-y-0' : 'absolute -translate-y-full'} 
            w-full z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/">
                <span className="text-2xl font-bold text-blue-800 dark:text-blue-400 flex gap-2 justify-center">
                  <img src={logo} alt="Freeway Logo" className='w-8' />
                  Freeway
                </span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                <NavLink to="/">Home</NavLink>
                {/* <NavLink to="/courses">Courses</NavLink> */}
                <NavLink to="/resources">Resources</NavLink>
                <NavLink to="/about">About Us</NavLink>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={toggleDarkMode}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <div className="ml-4 mt-1.5 md:hidden">
                <button
                  onClick={toggleMenu}
                  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden flex justify-center">
            <div className="flex flex-row px-2 pt-2 pb-3 space-x-4 sm:px-3">
              <NavLink to="/" mobile>Home</NavLink>
              {/* <NavLink to="/courses" mobile>Courses</NavLink> */}
              <NavLink to="/resources" mobile>Resources</NavLink>
              <NavLink to="/about" mobile>About Us</NavLink>
            </div>
          </div>
        )}
      </nav>

    </>
  )
}
