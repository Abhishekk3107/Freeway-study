import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import { Share2, Phone, FileText, X, Upload, Send } from "lucide-react"; // Import necessary icons
import CourseSubjectPopup from "@/components/resourcePageComponents/course-subject-popup";
import { Navbar } from "../components";

const studyMaterials = ["NOTES", "PYQ", "Books", "Playlist"];
const dummyPdfUrl = "https://www.orimi.com/pdf-test.pdf";

function ShareResourcesPopup({ onClose, darkMode }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`rounded-xl shadow-lg max-w-md w-full p-6 relative ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#5A2175]"
        >
          <X size={20} />
        </button>
        
        <h3 className={`font-bold text-xl mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
          <Share2 size={24} />
          Share Your Resources
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className={`block font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Resource Title</label>
            <input
              type="text"
              className={`w-full p-2 border rounded-lg focus:outline-none focus:border-[#5A2175] ${darkMode ? "bg-gray-700 text-gray-300 border-gray-600" : "border-gray-300"}`}
              placeholder="Enter resource title"
            />
          </div>
          
          <div>
            <label className={`block font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Description</label>
            <textarea
              className={`w-full p-2 border rounded-lg focus:outline-none focus:border-[#5A2175] h-32 ${darkMode ? "bg-gray-700 text-gray-300 border-gray-600" : "border-gray-300"}`}
              placeholder="Describe your resource"
            ></textarea>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload size={32} className="mx-auto text-gray-400 mb-2" />
            <p className={`text-gray-600 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Drag and drop your files here or click to browse</p>
          </div>
          
          <button className="w-full simple-button bg-[#5A2175] hover:bg-[#3A006B] text-white py-2 px-4 rounded-lg transition-all font-bold flex items-center justify-center gap-2">
            <Send size={20} />
            Share Resource
          </button>
        </div>
      </div>
    </div>
  );
}

function QueryPopup({ onClose, darkMode }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`rounded-xl shadow-lg max-w-md w-full p-6 relative ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#5A2175]"
        >
          <X size={20} />
        </button>
        
        <h3 className={`font-bold text-xl mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
          <Phone size={24} />
          Contact Us
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className={`block font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Your Name</label>
            <input
              type="text"
              className={`w-full p-2 border rounded-lg focus:outline-none focus:border-[#5A2175] ${darkMode ? "bg-gray-700 text-gray-300 border-gray-600" : "border-gray-300"}`}
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label className={`block font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Email Address</label>
            <input
              type="email"
              className={`w-full p-2 border rounded-lg focus:outline-none focus:border-[#5A2175] ${darkMode ? "bg-gray-700 text-gray-300 border-gray-600" : "border-gray-300"}`}
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className={`block font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Message</label>
            <textarea
              className={`w-full p-2 border rounded-lg focus:outline-none focus:border-[#5A2175] h-32 ${darkMode ? "bg-gray-700 text-gray-300 border-gray-600" : "border-gray-300"}`}
              placeholder="Type your message here"
            ></textarea>
          </div>
          
          <button className="w-full simple-button bg-[#5A2175] hover:bg-[#3A006B] text-white py-2 px-4 rounded-lg transition-all font-bold flex items-center justify-center gap-2">
            <Send size={20} />
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

function PDFViewer() {
  const { course, semester, subject } = useParams();
  const [darkMode, setDarkMode] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTab, setSelectedTab] = useState("NOTES");
  const [selectedUnit, setSelectedUnit] = useState("");
  
  const [showResourcePopup, setShowResourcePopup] = useState(false);
  const [showQueryPopup, setShowQueryPopup] = useState(false);

  // Initialize selectedSubject with the value from URL params
  useEffect(() => {
    if (subject) {
      setSelectedSubject(subject);
    }
  }, [subject]);

  const handleSubjectSelect = (flow) => {
    setSelectedSubject(flow);
    setIsPopupOpen(false);
  };

  // Check for saved theme or user preference
  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || (!savedTheme && prefersDarkMode)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode and save preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <>
      {/* Navbar */}
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

      <section className={`w-full pt-24 px-8 md:px-24 pb-6 min-h-screen ${darkMode ? "dark:bg-slate-900 text-gray-300" : "bg-white text-gray-800"}`}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 text-center">
            <h1 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              {selectedSubject}
            </h1>
            <button
              onClick={() => setIsPopupOpen(true)}
              className={`px-6 py-2 rounded-lg transition-colors ${darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-900 hover:bg-gray-300"}`}
            >
              {selectedSubject ? "Change Selection" : "Select Course/Subject"}
            </button>
          </div>

          {/* Syllabus Button */}
          <div className="text-center mb-6">
            <button
              onClick={() => window.open(dummyPdfUrl, '_blank')}
              className={`inline-flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${darkMode ? "bg-blue-950 text-white hover:bg-blue-950" : "bg-blue-950 text-white hover:bg-blue-950"}`}
            >
              <FileText className="h-5 w-5" />
              View Semester Syllabus
            </button>
          </div>

          {/* Unit Navigation */}
          <div className="flex justify-center gap-3 mb-8">
            {["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6"].map((unit) => (
              <button
                key={unit}
                onClick={() => setSelectedUnit(unit)}
                className={`px-4 py-1 rounded-full transition-colors ${
                  selectedUnit === unit
                    ? darkMode
                      ? "bg-blue-950 text-white"
                      : "bg-blue-950 text-white"
                    : darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
              >
                {unit}
              </button>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-8 mb-8">
            {studyMaterials.map((material) => (
              <button
                key={material}
                onClick={() => setSelectedTab(material)}
                className={`px-4 py-2 font-semibold transition-colors ${
                  selectedTab === material
                    ? darkMode
                      ? "text-blue-800 border-b-2 border-blue-800"
                      : "text-blue-950 border-b-2 border-blue-950"
                    : darkMode
                      ? "text-gray-400 hover:text-gray-200"
                      : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {material}
              </button>
            ))}
          </div>

          {/* Content Viewer */}
          <div className={`rounded-lg p-6 relative mb-8 ${darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-900"}`}>
            {selectedTab === "NOTES" ? (
              <iframe
                src={dummyPdfUrl}
                className="w-full h-[500px] rounded-lg"
                title="PDF Viewer"
              />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                alt="Learn with ease"
                className="w-full h-[400px] object-cover rounded-lg"
              />
            )}
            <button
              className="absolute top-8 right-8 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              onClick={() => window.open(dummyPdfUrl, '_blank')}
            >
              <FaDownload className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => setShowResourcePopup(true)}
              className={`gradient-button flex-1 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors ${
                darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-white text-purple-600 hover:bg-gray-100"
              }`}
            >
              <Share2 className="h-5 w-5" />
              Resources
            </button>
            <button
              onClick={() => setShowQueryPopup(true)}
              className={`gradient-button flex-1 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors ${
                darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-white text-purple-600 hover:bg-gray-100"
              }`}
            >
              <Phone className="h-5 w-5" />
              Query
            </button>
          </div>

          {/* Render Popups */}
          {showResourcePopup && <ShareResourcesPopup onClose={() => setShowResourcePopup(false)} darkMode={darkMode} />}
          {showQueryPopup && <QueryPopup onClose={() => setShowQueryPopup(false)} darkMode={darkMode} />}

          <CourseSubjectPopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onSubjectSelect={handleSubjectSelect}
          />
        </div>
      </section>
    </>
  );
}

export default PDFViewer;