import React, { useState, useEffect } from "react";
import useSubject from "../../../hooks/useSubject";
import useCourse from "../../../hooks/useCourse";
import { uploadToImageKit } from "../../../utils/uploadToImageKit";

function AddSubject({ setActiveComponent }) {
  const { addSubject, loading, error } = useSubject();
  const { courses } = useCourse(100);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [filteredSemesters, setFilteredSemesters] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    semesterId: "",
    unitsname: [""],
    subjectnotes: "",
    extranotes: [],
    booknotes: "",
    pyq: "",
    pyqsolution: "",
    video: [""],
  });

  const handleCourseChange = (e) => {
    const selectedCourseId = e.target.value;
    setSelectedCourse(selectedCourseId);

    
    // Find the selected course and get its semesters
    const course = courses.find((c) => c._id === selectedCourseId);
    if(course){
      setFilteredSemesters(course ? course.semesters : []);

      const semester = course?.semesters.find((s) => s._id === formData.semesterId);
      setFilteredSubjects(semester ? semester?.subjectsname : []);
    }else{
      setFilteredSemesters([]);
      setFilteredSubjects([]);
    }
  };

  const handleSemesterChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const semester = filteredSemesters.find((s) => s._id === value);
    setFilteredSubjects(semester ? semester?.subjectsname : []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e, field) => {
    if (field === "extranotes") {
      const files = e.target.files;
      if (files.length) {
        const uploadedUrls = await Promise.all(
          [...files].map((file) => uploadToImageKit(file))
        );
        setFormData({ ...formData, [field]: uploadedUrls });
      }
    }else{
      const files = e.target.files;
      if (files.length) {
        const uploadedUrls = await Promise.all(
          [...files].map((file) => uploadToImageKit(file))
        );
        setFormData({ ...formData, [field]: uploadedUrls[0] });
      }
    }
    
  };

  const handleUnitChange = (index, value) => {
    const updatedUnits = [...formData.unitsname];
    updatedUnits[index] = value;
    setFormData({ ...formData, unitsname: updatedUnits });
  };

  const handleVideoChange = (index, value) => {
    const updatedVideos = [...formData.video];
    updatedVideos[index] = value;
    setFormData({ ...formData, video: updatedVideos });
  };

  const addUnitField = () => {
    setFormData({ ...formData, unitsname: ["", ...formData.unitsname] });
  };

  const removeUnitField = (index) => {
    setFormData({
      ...formData,
      unitsname: formData.unitsname.filter((_, i) => i !== index),
    });
  };

  const addVideoField = () => {
    setFormData({ ...formData, video: ["", ...formData.video] });
  };

  const removeVideoField = (index) => {
    setFormData({
      ...formData,
      video: formData.video.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filterunits = formData.unitsname.filter((unit)=> unit.trim() !== "");
      const filtervideo = formData.video.filter((video)=> video.trim() !== "");

      if(filterunits.length == 0 || filtervideo.length == 0){
        alert("Please enter at least one valid unit Name or video link.");
          return;
      }

      const subjectData = {
        ...formData,
        unitsname: filterunits,
        video: filtervideo,
    };
      await addSubject(subjectData);
      // console.log(subjectData);
      alert("Subject added successfully!");
      setActiveComponent("Subject");
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Failed to add subject. Please try again.");
    }
  };

  return (
    <div className="p-6 shadow-lg rounded-lg max-w-full mx-auto">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Add New Subject</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Select Course</label>
          <select
            value={selectedCourse}
            onChange={handleCourseChange}
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>{course.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Select Semester</label>
          <select
            name="semesterId"
            value={formData.semesterId}
            onChange={handleSemesterChange}
            disabled={!selectedCourse}
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select a semester</option>
            {filteredSemesters.map((sem) => (
              <option key={sem._id} value={sem._id}>
                {sem.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Select Subject</label>
          <select
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!formData.semesterId}
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select a Subject</option>
            {filteredSubjects.map((sem, index) => (
              <option key={index} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Unit Names</label>
          {formData.unitsname.map((unit, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={unit}
                onChange={(e) => handleUnitChange(index, e.target.value)}
                className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {
                index == 0 && (
                  <button
                    type="button"
                    onClick={addUnitField}
                    className="text-green-500 px-3 py-2 border border-green-500 rounded-md hover:bg-green-100"
                  >
                    Add
                  </button>
                )
              }
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeUnitField(index)}
                  className="text-red-500 px-3 py-2 border border-red-500 rounded-md hover:bg-red-100"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        {[
          { label: "Subject Notes (PDF)", field: "subjectnotes" },
          { label: "Extra Notes (Multiple PDFs)", field: "extranotes" },
          { label: "Book Notes (PDF)", field: "booknotes" },
          { label: "PYQ (PDF)", field: "pyq" },
          { label: "PYQ Solution (PDF)", field: "pyqsolution" },
          // { label: "Video Lectures", field: "video", accept: "video/*" },
        ].map(({ label, field, accept = "application/pdf" }) => (
          <div key={field}>
            <label className="block text-gray-700">{label}</label>
            <input
              type="file"
              multiple={field === "extranotes" || field === "video"}
              accept={accept}
              onChange={(e) => handleFileChange(e, field)}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}

        <div>
          <label className="block text-gray-700">Video URL</label>
          {formData.video.map((video, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={video}
                onChange={(e) => handleVideoChange(index, e.target.value)}
                className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {
                index == 0 && (
                  <button
                    type="button"
                    onClick={addVideoField}
                    className="text-green-500 px-3 py-2 border border-green-500 rounded-md hover:bg-green-100"
                  >
                    Add
                  </button>
                )
              }
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeVideoField(index)}
                  className="text-red-500 px-3 py-2 border border-red-500 rounded-md hover:bg-red-100"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-[#4B0082] text-white px-4 py-2 rounded-md hover:opacity-80 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={() => setActiveComponent("Subject")}
            className="text-[#4B0082] bg-white px-4 py-2 border border-[#4B0082] rounded-md hover:opacity-75 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default AddSubject;
