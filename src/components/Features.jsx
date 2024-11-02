import document from '../assets/document.gif';
import graduate from '../assets/graduate.gif';
import light from '../assets/light.gif';
import video from '../assets/video.gif';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const featureRefs = useRef([]);

  const features = [
    {
      icon: graduate,
      title: 'Handwritten & Book Notes',
      description: 'Access comprehensive notes for all units, meticulously prepared to enhance your understanding.',
    },
    {
      icon: document,
      title: 'PYQs & Solutions',
      description: 'Practice with past year questions and get detailed solutions to boost your exam preparation.',
    },
    {
      icon: video,
      title: 'Video Playlists',
      description: 'Watch curated video playlists that explain complex topics in a simple, easy-to-understand manner.',
    },
    {
      icon: light,
      title: 'Enhanced Learning',
      description: 'Take your learning to the next level with our additional resources and study materials.',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const description = descriptionRef.current;

    // Animate heading and description
    gsap.fromTo(
      [heading, description],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: { trigger: section, start: "top 80%" },
      }
    );

    // Animate each feature card with stagger
    gsap.fromTo(
      featureRefs.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section className="py-16 bg-[#F5F2EB] dark:bg-gray-900" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
            ref={headingRef}
          >
            Empowering Your Education Journey
          </h2>
          <p
            className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            ref={descriptionRef}
          >
            We provide you with handwritten notes, book notes for all units, PYQs, PYQ solutions, and video playlists - all for free! Enhance your learning with our comprehensive resources and take your education to the next level.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              ref={(el) => (featureRefs.current[index] = el)}
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            >
              <div className="text-blue-500 dark:text-blue-400 mx-auto mb-4">
                <img
                  className="w-20 rounded-full mx-auto"
                  src={feature.icon}
                  alt={feature.title}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
