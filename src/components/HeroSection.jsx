import React from 'react';
import darkBg from '../assets/hero-bg-3-dark.png';
import lightBg from '../assets/hero-bg-light.jpg';
import Learning from '../assets/Learning.svg';
import { Link } from 'react-router-dom';

function HeroSection({ isDarkMode }) {
  return (
    <div
      className="w-full h-screen bg-no-repeat bg-contain md:bg-cover bg-center transition-all duration-500 flex items-center justify-center"
      style={{
        backgroundImage: `url(${isDarkMode ? darkBg : lightBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={`${isDarkMode ? 'text-white' : 'text-black'} text-center pt-20 w-full max-w-5xl`}>
        <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full">
          <div className="w-full text-start md:w-[50%] px-4 md:px-10">
            <div className="text-blue-800 font-normal text-3xl md:text-5xl">Welcome to</div>
            <div className="text-gradient font-bold text-4xl md:text-5xl my-2">
              FREEWAY STUDY
            </div>
            <p className={`${isDarkMode ? 'text-slate-300' : 'text-black'} text-lg poppins-regular opacity-95`}>
              One stop for all your academic solutions. Be it books, notes, question papers, exam solutions, we got you covered!
            </p>
            <div className="mt-6">
              <Link to='/resources' className="gradient-button px-8 py-3 rounded-lg font-bold transition-transform transform hover:scale-105">
                Let's Study {'->'}
              </Link>
            </div>
          </div>
          <div className='md:w-[50%] w-full'>
          <img src={Learning} alt="Learning Illustration" className=" md:w-full mx-auto mb-4 md:mb-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
