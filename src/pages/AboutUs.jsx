import React from "react";
import { Footer, Navbar } from "../components";
import { useState, useEffect } from "react";
import aboutus from "../assets/aboutus.svg";
import ourvision from "../assets/ourvision.svg";
import profile1 from "../assets/profile1.jpg";
import profile2 from "../assets/profile2.jpg";
import profile3 from "../assets/profile3.jpg";
import profile4 from "../assets/profile4.jpg";

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

  const teamMembers = [
    {
      name: "Database Manager",
      description: "Bhavik Sharma",
      image: profile1,
      linkedin: "https://www.linkedin.com/in/team-member-1",
    },
    {
      name: "UI/UX Designer",
      description: "Shubham Sharma",
      image: profile2,
      linkedin: "https://www.linkedin.com/in/team-member-2",
    },
    {
      name: "Frontend Developer",
      description: "Abhishek Kumar",
      image: profile3,
      linkedin: "https://www.linkedin.com/in/abhishekkumar3107/",
    },
    {
      name: "Backend Developer",
      description: "Tarush Ruhela",
      image: profile4,
      linkedin: "https://www.linkedin.com/in/tarushruhela/",
    },
  ];

  return (
    <div className="dark:bg-slate-800 min-w-screen min-h-screen">
      <div className="max-w-[1480px] mx-auto poppins-regular">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="w-full min-h-screen p-8">
          {/* Journey Section */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-[50%] w-full order-2 md:order-1">
              <h1 className="text-gradient font-bold text-3xl md:text-4xl my-2 mt-12">
                Our Journey
              </h1>
              <p className="mb-4 dark:text-gray-300 text-lg poppins-regular opacity-95">
                We are a group of four passionate BCA students from the bustling city
                of Ghaziabad, Uttar Pradesh. Our journey began with a simple, yet
                powerful idea: creating a unified platform where students from our
                IAMR College, and eventually the entire CCS University, can access
                all their study resources in one place.
              </p>
              <p className="mb-4 dark:text-gray-300 text-lg poppins-regular opacity-95">
                The inspiration for this platform came from our own experiences. We
                often found ourselves hopping from one website to another in search
                of previous years' question papers, syllabi, playlists, and notes.
                This not only wasted our time but also added to our frustration. We
                realized that if we faced these issues, many other students probably
                did too.
              </p>
              <p className="mb-4 dark:text-gray-300 text-lg poppins-regular opacity-95">
                Determined to make a difference, we decided to create a website that
                offers all the necessary academic content without any annoying ads
                or charges. Our goal is to provide a seamless and distraction-free
                learning experience for students. We've poured our hearts and minds
                into this project, and we believe it will significantly benefit our
                peers.
              </p>
            </div>
            <div className="md:w-[50%] w-full order-1 md:order-2">
              <img
                src={aboutus}
                alt="About us Illustration"
                className="w-full mx-auto mb-4 md:mb-0 pt-16 md:pt-0"
              />
            </div>
          </div>

          {/* Profile Cards Section */}
          <h1 className="text-gradient font-bold text-3xl md:text-4xl my-2 mt-12">
            Our Team
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`flex flex-col items-center rounded-lg p-6 transform transition-transform duration-300 hover:scale-105 ${
                  darkMode
                    ? "bg-white text-black"
                    : "bg-blue-950 text-white"
                }`}
              >
                <img
                  src={member.image}
                  alt={`${member.name}`}
                  className="w-40 h-40 rounded-full mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-sm mb-2">{member.description}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  LinkedIn
                </a>
              </div>
            ))}
          </div>

          {/* Vision Section */}
          <div className="flex flex-col md:flex-row items-center mt-12">
            <div className="md:w-[50%] w-full order-1">
              <img
                src={ourvision}
                alt="Our Vision Illustration"
                className="w-full mx-auto mb-4 md:mb-0 hidden md:block"
              />
            </div>
            <div className="md:w-[50%] w-full order-2">
              <h1 className="text-gradient font-bold text-3xl md:text-4xl my-2 mt-12 md:order-1">
                Our Vision
              </h1>
              <p className="mb-4 dark:text-gray-300 text-lg poppins-regular opacity-95">
                As we continue to grow and expand, we aim to include more features
                and resources, making our platform the go-to destination for all
                CCS University students. Our journey is just beginning, and we're
                excited to see where it takes us. Join us as we revolutionize the
                way students access academic content.
              </p>
              <p className="mb-4 dark:text-gray-300 text-lg poppins-regular opacity-95">
                Looking ahead, we envision a future where our platform becomes an
                indispensable tool for students across the entire CCS University
                and beyond. We are dedicated to expanding our reach and offering
                innovative solutions that address the diverse needs of the student
                community. With your support and participation, we can make this
                vision a reality.
              </p>
              <p className="mb-4 dark:text-gray-300 text-lg poppins-regular opacity-95">
                Thank you for being a part of our journey. We invite you to explore
                our platform, share your feedback, and join us in our mission to
                create a brighter future for students everywhere.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AboutUs;
