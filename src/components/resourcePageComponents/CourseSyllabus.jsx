import React, { useState, useEffect } from 'react'
import { MdDownloadForOffline } from "react-icons/md";

function CourseSyllabus({course , index}) {
     const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);

     const handleExplore = (index) => {
        if (selectedCourseIndex === index) {
          setSelectedCourseIndex(null); // Toggle off if clicked again
        } else {
          setSelectedCourseIndex(index);
        }
      };
      
    return (
        <div
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all"
        >
            <h3 className="text-base font-medium dark:text-gray-200 text-gray-800">
                {course.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Explore CCSU / {course.name} syllabus and study material.
            </p>
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => handleExplore(index)}
                    className="simple-button px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                    Explore
                </button>
                <div className=" flex justify-center mt-2">
                    <a
                        href={course.syllabus}
                        download
                        className="px-1 py-1 text-3xl font-bold text-white bg-green-500 rounded-lg hover:bg-green-600"
                    >
                        <MdDownloadForOffline />
                    </a>
                </div>
            </div>
            {selectedCourseIndex === index && (
                <div className="mt-4">
                    <iframe
                        src={`https://docs.google.com/viewer?url=${course.syllabus}&embedded=true`}
                        title="Syllabus Preview"
                        className="w-full h-[90vh] border rounded-md"
                    ></iframe>
                </div>
            )}
        </div>
    )
}

export default CourseSyllabus