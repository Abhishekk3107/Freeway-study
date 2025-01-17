import React, { useState, useEffect } from 'react';
import aboutHero1 from "../../assets/aboutHero1.jpeg";
import aboutHero2 from "../../assets/aboutHero2.jpeg";
import aboutHero3 from "../../assets/aboutHero3.jpeg";
import { Navigate } from 'react-router-dom';

const aboutImages = [
  aboutHero1,
  aboutHero2,
  aboutHero3 // Add paths to multiple images
];

function AboutHeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % aboutImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? aboutImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % aboutImages.length);
  };

  return (

    <>
      <section className="mb-16 relative">
        <div className="absolute inset-0 z-0 bg-cover">
          <img
            src={aboutImages[currentIndex]}
            alt="Students studying"
            className="bg-contain h-full w-full"
          />
          <div className="absolute inset-0 bg-black opacity-50 "></div>
        </div>
        <div className="relative z-10 text-white py-20 px-8 w-full h-[80vh] flex flex-col justify-end">
          <button className="simple-button opacity-100 hover:opacity-100 px-8 py-3 rounded-lg font-bold transition-transform transform hover:scale-105 self-center">
            Explore More →
          </button>
        </div>
      </section>
      <section className="mb-16 ">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Why use Freeway Study??</h2>
        <p className="text-lg  text-gray-600 dark:text-gray-300 mt-2">
          At Freeway Study, our mission is to provide students with free and accessible educational resources.
          We believe that quality education should be available to everyone, regardless of their background or circumstances.
          Our platform is designed to simplify learning for students of all ages, making education an enjoyable journey rather than a daunting task.
        </p>
      </section>
    </>
  );
}

export default AboutHeroSection;
