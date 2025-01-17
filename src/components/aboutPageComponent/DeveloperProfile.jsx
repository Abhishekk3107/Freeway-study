import React from 'react'

function DeveloperProfile({ name, role, image,linkedin }) {
  return (
    <div
      className={`flex flex-col items-center rounded-lg p-6 transform transition-transform duration-300 hover:scale-105 
           border-gray-500 border dark:text-white
           text-black
        `}
    >
      <img
        src={image}
        alt={`${name}`}
        className="w-40 h-40 rounded-full mb-4 object-cover"
      />
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-sm mb-2">{role}</p>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 simple-button"
      >
        LinkedIn
      </a>
    </div>
  )
}

export default DeveloperProfile