import React, { useState } from "react";
import CourseSubjectPopup from "./course-subject-popup";
import useCourse from "../../hooks/useCourse";
import CourseSyllabus from "./CourseSyllabus";

const studyMaterials = [
  { type: "PYQ", pdf: "#" },
  { type: "Notes", pdf: "#" },
  { type: "Books", pdf: "#" },
  { type: "Videos", pdf: "#" },
];

export default function Resources() {
  const limit = 100;
  const { courses = [], loading } = useCourse(limit); 
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");

  const handleSubjectSelect = (flow) => {
    setSelectedSubject(flow);
    setIsPopupOpen(false);
  };

  const handleReselect = () => {
    setSelectedSubject("");
    setIsPopupOpen(true);
  };

  return (
    <section className="p-6 min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-gray-100">
      <div className="max-w-4xl mx-auto mt-16">
        <div className="mb-6 text-center">
          <button
            onClick={() => setIsPopupOpen(true)}
            className="px-4 py-2 text-lg font-medium rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-sm transition-all w-full sm:w-auto"
          >
            {selectedSubject
              ? "Change Course, Semester, and Subject"
              : "Select Course, Semester, and Subject"}
          </button>
        </div>

        {!selectedSubject && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center dark:text-gray-200 text-gray-800">
              Available Courses
            </h2>
            <div className="space-y-4">
              {loading ? (
                <div className="w-full flex justify-center items-center text-gray-400">
                  <div className="animate-spin rounded-full border-t-4 border-b-4 border-gray-600 w-12 h-12"></div>
                </div>
              ) : (
                courses.length > 0 ? (
                  courses.map((course, index) => (
                    <CourseSyllabus key={index} index={index} course={course} />
                  ))
                ) : (
                  <p className="text-center text-gray-400">No courses available.</p>
                )
              )}
            </div>
          </div>
        )}

        {selectedSubject && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-gray-200 text-gray-800">
              Study Materials for {selectedSubject}
            </h3>
            <div className="space-y-4">
              {studyMaterials.map((material, index) => (
                <a
                  key={index}
                  href={material.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800 hover:shadow-md transition-all"
                >
                  <h4 className="text-base font-medium text-gray-800 dark:text-gray-200">
                    {material.type}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click to explore
                  </p>
                </a>
              ))}
            </div>
            <button
              onClick={handleReselect}
              className="mt-4 text-blue-500 dark:text-blue-400 hover:underline"
            >
              Reselect Subject
            </button>
          </div>
        )}

        <CourseSubjectPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSubjectSelect={handleSubjectSelect}
        />
      </div>
    </section>
  );
}
