
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomDialog = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full relative">
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:text-gray-200 dark:hover:text-white"
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
};


const CustomButton = ({ onClick, variant = 'outline', className, children }) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-all duration-200';
  const variants = {
    default: 'bg-gray-500 text-white hover:bg-gray-600',
    outline: 'border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const courses = [
  { id: 1, name: 'BCA', semesters: 6 },
  { id: 2, name: 'BBA', semesters: 6 },
  { id: 3, name: 'MCA', semesters: 4 },
  { id: 4, name: 'MBA', semesters: 4 },
];

const subjects = {
  1: {
    'Semester 1': [
      'Mathematics-I',
      'Programming Principle & Algorithm',
      'Computer Fundamental and Office Automation',
      'Principle of Management',
      'Business Communication',
      'Environmental Studies',
    ],
    'Semester 2': [
      'Mathematics-II',
      'C Programming',
      'Organization Behavior',
      'Digital Electronics and Computer Organization',
      'Financial Accounting and Management',
    ],
    'Semester 3': [
      'Object Oriented Programming Using C++',
      'Data Structure Using C & C++',
      'Computer Architecture & Assembly Language',
      'Business Economics',
      'Elements of Statistics',
    ],
    'Semester 4': [
      'Computer Graphics & Multimedia Application',
      'Operating System',
      'Software Engineering',
      'Optimization Techniques',
      'Mathematics-III',
    ],
    'Semester 5': [
      'Introduction to DBMS',
      'Java Programming and Dynamic Webpage Design',
      'Computer Network',
      'Numerical Methods',
      'Minor Project',
    ],
    'Semester 6': [
      'Computer Network Security',
      'Information System: Analysis Design & Implementation',
      'E-Commerce',
      'Knowledge Management',
      'Major Project',
    ],
  },
  2: {
    'Semester 1': [
      'Fundamentals of Management',
      'Organizational Behavior',
      'Managerial Economics',
      'Accounting and Financial Analysis',
      'Business Law',
      'Business Organization and Ethics',
      'Environmental Studies',
    ],
    'Semester 2': [
      'Quantitative Techniques for Business',
      'Business Communication',
      'Human Resource Management',
      'Marketing Management',
      'Business Environment',
      'Fundamentals of Computer',
      'Assessment on Soft Skills',
    ],
    'Semester 3': [
      'Advertising Management',
      'Team Building & Leadership',
      'Indian Economy',
      'Customer Relationship Management',
      'Management Information System',
      'Income Tax Law & Practice',
    ],
    'Semester 4': [
      'Consumer Behavior',
      'Financial Management',
      'Production & Operation Management',
      'Sales & Distribution Management',
      'Research Methodology',
      'Entrepreneurship & Small Business Management',
    ],
    'Semester 5': [
      'Arithmetic Aptitude',
      'Aptitude Reasoning',
      'General Business Awareness',
      'General English',
      'Elective Paper M-1/F-1',
      'Elective Paper M-2/F-2',
      'Summer Training Project Report',
    ],
    'Semester 6': [
      'Strategic Management & Business Policy',
      'Operation Research',
      'Fundamentals of E-Commerce',
      'Economic and Industrial Law',
      'Elective Paper M-3/F-3',
      'Elective Paper M-4/F-4',
      'Comprehensive Viva-Voce',
    ],
  },
  3: {
    'Semester 1': [
      'Mathematical Foundations of Computer Science',
      'Object-Oriented Programming in C++',
      'Operating Systems',
      'Computer Organization and Architecture',
      'Discrete Mathematics',
      'Software Engineering',
    ],
    'Semester 2': [
      'Data Structures',
      'Database Management Systems',
      'Theory of Computation',
      'Java Programming',
      'Artificial Intelligence',
      'Compiler Design',
    ],
    'Semester 3': [
      'Artificial Intelligence',
      'Software Engineering',
      'Computer Networks',
      'Cloud Computing',
      'Big Data',
      'Mini Project',
    ],
    'Semester 4': [
      'Elective-3 (e.g., Privacy & Security in Online Social Media)',
      'Elective-4 (e.g., Blockchain Architecture)',
      'Elective-5 (e.g., Mobile Computing)',
      'Major Project',
    ],
  },
  4: {
    'Semester 1': [
      'Principles & Practice of Management',
      'Managerial Economics',
      'Accounting for Managers',
      'Quantitative Techniques',
      'Computer Applications in Business',
      'Business Laws',
      'Business Communication',
    ],
    'Semester 2': [
      'Organizational Behavior',
      'Human Resource Management',
      'Production & Operations Management',
      'Financial Management',
      'Marketing Management',
      'Research Methodology',
    ],
    'Semester 3': [
      'Business Policy & Strategic Analysis',
      'Entrepreneurship and Small Business Management',
      'Elective I (Specialization Group I)',
      'Elective II (Specialization Group I)',
      'Elective I (Specialization Group II)',
      'Elective II (Specialization Group II)',
    ],
    'Semester 4': [
      'Business Environment',
      'Operation Research',
      'Elective III (Specialization Group I)',
      'Elective IV (Specialization Group I)',
      'Elective III (Specialization Group II)',
      'Elective IV (Specialization Group II)',
      'Research Project Report',
    ],
  },
};

export default function CourseSubjectPopup({ isOpen, onClose, onSubjectSelect }) {
  const [step, setStep] = useState(1); // Step: 1 = Course, 2 = Semester, 3 = Subject
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const navigate = useNavigate();

  const handleCourseSelect = (courseId) => {
    setSelectedCourse(courseId);
    setStep(2); // Move to semester selection
  };

  const handleSemesterSelect = (semester) => {
    setSelectedSemester(semester);
    setStep(3); // Move to subject selection
  };

  const handleSubjectSelect = (subject) => {
    const courseName = courses.find((course) => course.id === selectedCourse)?.name;
    const flow = `${courseName} / ${selectedSemester} / ${subject}`;
    navigate(`/resources/${courseName}/${selectedSemester}/${subject}`); 
    onSubjectSelect(flow); // Pass the full flow to the parent
    setStep(1); // Reset after selection
    setSelectedCourse(null);
    setSelectedSemester(null);
  };

  return (
    <CustomDialog open={isOpen} onClose={onClose}>
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-bold dark:text-gray-200">Select Course</h3>
          {courses.map((course) => (
            <CustomButton
              key={course.id}
              onClick={() => handleCourseSelect(course.id)}
              variant="outline"
              className="w-full dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              {course.name}
            </CustomButton>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-bold dark:text-gray-200">Select Semester</h3>
          {Object.keys(subjects[selectedCourse]).map((semester) => (
            <CustomButton
              key={semester}
              onClick={() => handleSemesterSelect(semester)}
              variant="outline"
              className="w-full dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              {semester}
            </CustomButton>
          ))}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="font-bold dark:text-gray-200">Select Subject</h3>
          {subjects[selectedCourse][selectedSemester].map((subject) => (
            <CustomButton
              key={subject}
              onClick={() => handleSubjectSelect(subject)}
              variant="outline"
              className="w-full dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              {subject}
            </CustomButton>
          ))}
        </div>
      )}

      <div className="mt-4 text-right">
        <CustomButton
          onClick={onClose}
          variant="outline"
          className="dark:bg-gray-700 dark:text-gray-200"
        >
          Close
        </CustomButton>
      </div>
    </CustomDialog>
  );
}