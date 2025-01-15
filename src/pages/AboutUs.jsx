import React from "react";
import { Footer, Navbar } from "../components";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import aboutus from "../assets/aboutus.svg";
import ourvision from "../assets/ourvision.svg";

function AboutUs() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || (!savedTheme && prefersDarkMode)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className="dark:bg-slate-800 min-w-screen min-h-screen">
      {" "}
      <div className="max-w-[1480px] mx-auto poppins-regular">
        {" "}
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />{" "}
        <div className="w-full min-h-screen p-8">
          {" "}
          <div className="flex flex-col md:flex-row items-center">
            {" "}
            <div className="md:w-[50%] w-full">
              {" "}
              <h1 className="text-gradient font-bold text-3xl md:text-4xl my-2 mt-12">
                Our Journey
              </h1>{" "}
              <p className="mb-4 dark:text-gray-300 text-lg poppins-regular opacity-95">
                We are a group of four passionate BCA students from the bustling
                city of Ghaziabad, Uttar Pradesh. Our journey began with a
                simple, yet powerful idea: creating a unified platform where
                students from our IAMR College, and eventually the entire CCS
                University, can access all their study resources in one place.
              </p>{" "}
              <p className="mb-4 dark:text-gray-300 text-lg poppins-regular opacity-95">
                The inspiration for this platform came from our own experiences.
                We often found ourselves hopping from one website to another in
                search of previous years' question papers, syllabi, playlists,
                and notes. This not only wasted our time but also added to our
                frustration. We realized that if we faced these issues, many
                other students probably did too.
              </p>{" "}
              <p className="mb-4 dark:text-gray-300 text-lg poppins-regular opacity-95">
                Determined to make a difference, we decided to create a website
                that offers all the necessary academic content without any
                annoying ads or charges. Our goal is to provide a seamless and
                distraction-free learning experience for students. We've poured
                our hearts and minds into this project, and we believe it will
                significantly benefit our peers.
              </p>{" "}
            </div>{" "}
            <div className="md:w-[50%] w-full">
              {" "}
              <img
                src={aboutus}
                alt="Learning Illustration"
                className="md:w-full mx-auto mb-4 md:mb-0"
              />{" "}
            </div>{" "}
          </div>{" "}
          <div className="flex flex-col md:flex-row items-center">
            {" "}
            <div className="md:w-[50%] w-full">
              {" "}
              <img
                src={ourvision}
                alt="Our Vision Illustration"
                className="md:w-full mx-auto mb-4 md:mb-0"
              />{" "}
            </div>{" "}
            <div className="md:w-[50%] w-full">
              {" "}
              
              <h1 className="text-gradient font-bold text-3xl md:text-4xl my-2 mt-12">
                Our Vision
              </h1>{" "}
              <p className="mb-4 dark:text-gray-300 text-lg poppins-regular opacity-95">
                As we continue to grow and expand, we aim to include more
                features and resources, making our platform the go-to
                destination for all CCS University students. Our journey is just
                beginning, and we're excited to see where it takes us. Join us
                as we revolutionize the way students access academic content.
              </p>{" "}
              <p className="mb-4 dark:text-gray-300 text-lg poppins-regular opacity-95">
                Looking ahead, we envision a future where our platform becomes
                an indispensable tool for students across the entire CCS
                University and beyond. We are dedicated to expanding our reach
                and offering innovative solutions that address the diverse needs
                of the student community. With your support and participation,
                we can make this vision a reality.
              </p>{" "}
              <p className="mb-4 dark:text-gray-300 text-lg poppins-regular opacity-95">
                Thank you for being a part of our journey. We invite you to
                explore our platform, share your feedback, and join us in our
                mission to create a brighter future for students everywhere.
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <Footer />{" "}
      </div>{" "}
    </div>
  );
}

export default AboutUs;
