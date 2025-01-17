import React, { useState, useEffect } from 'react';
import admin from "../assets/admin_login.png";
import logo from '../assets/storytelling.png';

function Admin() {

  return (
    <div className={`min-w-screen bg-gradient-to-b from-black via-blue-950 to-blue-900 min-h-screen $`}>
      <div className="max-w-[1480px] mx-auto poppins-regular">

        <div className="flex flex-col md:flex-row  items-center  justify-between min-h-[calc(100vh-200px)] px-2 sm:px-8 lg:pr-0 lg:pl-24 pt-32 pb-16 ">
          <h2 className='text-white pt-8 text-left absolute top-12 left-12'>
            <span className="text-3xl font-semibold text-white flex gap-2 justify-center items-end">
              <img src={logo} alt="Freeway Logo" className='w-10' />
              freeway
            </span>
          </h2>
          <div
            className={`mt-16 md:mt-0 bg-[#131b29]/40 backdrop-blur-lg  rounded-lg shadow-lg p-4 md:p-8 w-full md:w-2/3 lg:w-1/2 
              }`}
          >
            <h2 className={`text-2xl text-white font-medium mb-6`}>Admin Login</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-left text-white">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded outline-none border bg-slate-800 border-gray-600 text-white"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm mb-2 text-start text-white">
                  Secret PIN
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 rounded outline-none border bg-slate-800 border-gray-600 text-white"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded bg-blue-600 font-bold text-white hover:bg-blue-700 transition"
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

          <div className="w-full lg:w-1/2 flex items-center justify-center mt-10 ">
            <div className=" sm:block relative ">
              <img
                src={admin}
                alt="Login Illustration"
                className="h-96 w-auto object-cover self-end"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
