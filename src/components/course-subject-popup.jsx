import React, { useState } from 'react'

const CustomDialog = ({ open, onClose, children }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-blue-800 rounded-lg shadow-lg p-6 max-w-md w-full relative">
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:text-gray-200 dark:hover:text-white"
        >
          &#x2715; {/* Close Icon */}
        </button>
      </div>
    </div>
  )
}

const CustomButton = ({ onClick, variant = 'outline', className, children }) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-all duration-200'
  const variants = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

const courses = [
  { id: 1, name: 'Computer Science' },
  { id: 2, name: 'Electrical Engineering' },
  { id: 3, name: 'Mechanical Engineering' },
]

const subjects = {
  1: ['Data Structures', 'Algorithms', 'Database Management'],
  2: ['Circuit Theory', 'Digital Electronics', 'Power Systems'],
  3: ['Thermodynamics', 'Fluid Mechanics', 'Machine Design'],
}

export default function CourseSubjectPopup({ isOpen, onClose, onSubjectSelect }) {
  const [selectedCourse, setSelectedCourse] = useState(null)

  return (
    <CustomDialog open={isOpen} onClose={onClose}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-bold dark:text-blue-200">Courses</h3>
          {courses.map((course) => (
            <CustomButton
              key={course.id}
              onClick={() => setSelectedCourse(course.id)}
              variant={selectedCourse === course.id ? 'default' : 'outline'}
              className="w-full dark:bg-blue-700 dark:text-blue-200 dark:hover:bg-blue-600"
            >
              {course.name}
            </CustomButton>
          ))}
        </div>
        <div className="space-y-2">
          <h3 className="font-bold dark:text-blue-200">Subjects</h3>
          {selectedCourse &&
            subjects[selectedCourse].map((subject) => (
              <CustomButton
                key={subject}
                onClick={() => onSubjectSelect(subject)}
                variant="outline"
                className="w-full dark:bg-blue-700 dark:text-blue-200 dark:hover:bg-blue-600"
              >
                {subject}
              </CustomButton>
            ))}
        </div>
      </div>
      <div className="mt-4 text-right">
        <CustomButton
          onClick={onClose}
          variant="outline"
          className="dark:bg-blue-700 dark:text-blue-200"
        >
          Close
        </CustomButton>
      </div>
    </CustomDialog>
  )
}
