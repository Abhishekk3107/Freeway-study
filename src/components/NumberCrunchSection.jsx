import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function NumberCrunchSection() {
  const crunch = [
    ['9000', 'Students'],
    ['40000', 'Monthly Views'],
    ['2500', 'Resources'],
  ];

  const numberRefs = useRef([]);

  useEffect(() => {
    numberRefs.current.forEach((numberRef, index) => {
      const targetValue = parseInt(crunch[index][0], 10);
      const startValue = targetValue - 2000;  // Start 2,000 below the target

      gsap.fromTo(
        numberRef,
        { innerText: startValue },
        {
          innerText: targetValue,
          duration: 2,
          scrollTrigger: {
            trigger: numberRef,
            start: 'top 80%',
          },
          snap: { innerText: 1 },
          stagger: 0.2,
          ease: 'power3.out',
          onUpdate: function () {
            numberRef.innerText = Math.ceil(numberRef.innerText) + '+';
          },
        }
      );
    });
  }, []);

  return (
    <div className="w-full min-h-[50%] flex flex-col mb-24 space-y-16">
      <h2 className="sm:text-5xl text-4xl font-bold dark:text-white text-slate-900">
        Number Crunch
      </h2>
      <div className="flex justify-around flex-col md:flex-row space-y-10 md:space-y-0">
        {crunch.map((crun, index) => (
          <div key={index} className="space-y-6">
            <p
              ref={(el) => (numberRefs.current[index] = el)}
              className="md:text-7xl sm:text-8xl text-6xl font-semibold text-gradient"
            >
              {parseInt(crun[0], 10) - 2000}+
            </p>
            <p className="dark:text-gray-300 font-normal text-4xl md:text-3xl">
              {crun[1]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NumberCrunchSection;
