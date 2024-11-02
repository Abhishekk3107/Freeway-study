import React from 'react'
import itsLogo from '../assets/image.png'

function ResourcesForSection({isDarkMode}) {
  return (
    <div className={`w-full min-h-32 py-8 my-40 ${isDarkMode ? 'bg-[#131b29]':'bg-[#F5F2EB]'}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-4">
              Resources for All <span className={`${isDarkMode ? 'text-blue-400':'text-blue-950'}`}>CCSU Affiliated</span> Colleges
            </h2>
            <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
              We're here to support your academic journey, no matter which CCSU college you're part of!
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[
                {name:"CCSU Meerut",logo:'https://ccsuniversity.blr1.cdn.digitaloceanspaces.com/public/ico/2024/06/favIcon.ico'},
                {name:"IAMR Group of Institute",logo:'https://www.iamr.ac.in/themes/auth/images/favicon.png'},
                {name:"ITS The Education Group",logo:`${itsLogo}`},
                {name:"IMS Ghaziabad",logo:'https://cdn.npfs.co/uploads/template/602/2217/publish/images/logo.jpg?1729229521'},
            
                // {name:"Modern College of Professional Studies",logo:'https://www.iamr.ac.in/themes/auth/images/favicon.png'},
                // {name:"Mewar Institute of Management",logo:'https://www.iamr.ac.in/themes/auth/images/favicon.png'},
              ].map((college, index) => (
                <div key={index} className="flex flex-col items-center space-y-4">
                  <div className="w-24 h-24 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-md">
                    <img
                      src={`${college.logo}`}
                      width={80}
                      height={80}
                      alt={`${college} logo`}
                      className="rounded-full"
                    />
                  </div>
                  <h3 className="text-center text-sm font-medium text-gray-900 dark:text-white">{college.name}</h3>
                </div>
              ))}
            </div>
          </div>
    </div>
  )
}

export default ResourcesForSection