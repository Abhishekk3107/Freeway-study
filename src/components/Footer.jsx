import { Link } from 'react-router-dom'
import { Instagram, Linkedin } from 'lucide-react'
import logo from '../assets/storytelling.png'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-100 dark:bg-gray-800 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className=" text-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14 md:gap-8 md:pl-12">
                    <div className=" col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center mb-4 space-x-2">
                            <img src={logo} alt="Freeway Logo" className='w-8' />
                            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">Freeway <span className='font-normal'>study</span></span>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Empowering students with free educational resources to excel in their academic journey.
                        </p>
                        <div className='text-start'>
                            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 '>CONTACT US</h3>
                            <p className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'>Phone: +91 9311525316</p>
                            <p className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'>tarushruhela1234@gmail.com</p>
                            <p className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'>Loni, ghaziabad, UP</p>
                        </div>
                    </div>

                    <div className='grid md:col-span-2 space-y-4 md:space-y-0 md:grid-cols-2'>
                        <div className='md:col-span-1'>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">About Us</Link></li>
                                <li><Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Home</Link></li>
                                <li><Link to="/resources" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Resources</Link></li>
                                <li><Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Contact Us</Link></li>
                            </ul>
                        </div>

                        <div className='md:col-span-1'>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
                            <ul className="space-y-2">
                                <li><Link to="/policy" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</Link></li>
                                <li><Link to="/policy" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</Link></li>
                                <li><Link to="/policy" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Cookie Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='text-sm font-medium dark:text-gray-400 text-gray-600 md:mx-11 mt-4 text-start'>
                    <span className='font-bold dark:text-gray-200 text-slate-700'>Disclaimer : </span>
                    All the books and study resources hosted on fresources are provided for informational and educational purposes only. We do not claim ownership of any of the resources available on the website.
                    Read our policy <a href="/policy" className='underline hover:text-blue-600 dark:hover:text-blue-400'>here.</a>
                </div>
                {/* Social Media and Copyright */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 ml-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex space-x-6 mb-4 md:mb-0">

                            <a href="https://instagram.com/t_rush0r" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                <span className="sr-only">Instagram</span>
                                <Instagram size={24} />
                            </a>
                            <a href="https://linkedin.com/in/tarushruhela" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin size={24} />
                            </a>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            © {currentYear} <span className=' font-bold text-blue-600 dark:text-blue-400'>Freeway Study</span>. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}