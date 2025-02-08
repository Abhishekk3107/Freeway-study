import React, { useState, useEffect } from "react";
import useSubject from "../../../hooks/useSubject";
import useCourse from "../../../hooks/useCourse";
import { uploadToImageKit } from "../../../utils/uploadToImageKit";

function UpdateSubject({ setActiveComponent, subjectData }) {
  const { updateSubject, loading } = useSubject();
  const { courses } = useCourse(100);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [filteredSemesters, setFilteredSemesters] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [formData, setFormData] = useState(subjectData);

  useEffect(() => {
    if (subjectData) {
      setSelectedCourse(subjectData.semester.course);

      const course = courses.find((c) => c._id === subjectData.semester.course);
      if (course) {
        setFilteredSemesters(course.semesters);
        const semester = course.semesters.find((s) => s._id === subjectData.semester._id);
        setFilteredSubjects(semester ? semester.subjectsname : []);
      }


      setFormData({
        ...subjectData,
        semester: subjectData.semester._id,
      });
    }
  }, [subjectData, courses]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e, field) => {
    const files = e.target.files;
    if (files.length) {
      const uploadedUrls = await Promise.all(
        [...files].map((file) => uploadToImageKit(file))
      );
      setFormData({ ...formData, [field]: field === "extranotes" ? uploadedUrls : uploadedUrls[0] });
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
      const filteredUnits = formData.unitsname.filter(unit => unit.trim() !== "");
      const filteredVideo = formData.video.filter(vdo => vdo.trim() !== "");
      if (filteredSubjects.length === 0) {
        alert("Please enter at least one valid subject name.");
        return;
      }

      const formattedData = {
        name: formData.name,
        unitsname: filteredUnits,
        subjectnotes: formData.subjectnotes,
        extranotes: formData.extranotes,
        booknotes: formData.booknotes,
        pyq: formData.pyq,
        pyqsolution: formData.pyqsolution,
        video: filteredVideo,
        semester: formData.semester,
      };

      await updateSubject(formData._id, formattedData);
      alert("Subject updated successfully!");
      setActiveComponent("Subject");
    } catch (err) {
      console.error("Error updating subject:", err);
      alert("Failed to update subject. Please try again.");
    }
  };


  return (
    <div className="p-6 shadow-lg rounded-lg max-w-full mx-auto">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Update Subject</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Selected Course</label>
          <select
            value={selectedCourse}
            disabled
            onChange={(e) => setSelectedCourse(e.target.value)}
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
          <label className="block text-gray-700">Selected Semester</label>
          <select
            name="semesterId"
            value={formData.semester}
            onChange={handleChange}
            disabled={selectedCourse}
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
          <label className="block text-gray-700">Selected Subject</label>
          <select
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={formData.semesterId}
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

        {/* Units */}
        <div>
          <label className="block text-gray-700">Units</label>
          {formData.unitsname.map((unit, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                value={unit}
                onChange={(e) => handleUnitChange(index, e.target.value)}
                className="w-full px-4 py-2 rounded-md border"
              />
              <button type="button" onClick={() => removeUnitField(index)} className="text-red-500">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addUnitField} className="text-indigo-500 mt-2">
            + Add Unit
          </button>
        </div>

        {/* Subject Notes */}
        <div>
          <label className="block text-gray-700">Subject Notes (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileChange(e, "subjectnotes")}
            className="w-full p-2 border rounded"
          />
        </div>
        {
          formData.subjectnotes && (
            <div className="mt-2">
              <a href={formData.subjectnotes} target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline cursor-pointer">
                View old pdf
              </a>
            </div>
          )
        }

        {/* Extra Notes */}
        <div>
          <label className="block text-gray-700">Extra Notes (Multiple PDFs)</label>
          <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={(e) => handleFileChange(e, "extranotes")}
            className="w-full p-2 border rounded"
          />
        </div>
        {
          formData.extranotes.length > 0 && (
            formData.extranotes.map((notes , index) => (
              <div className="mt-2 inline-block mx-2" key={index}>
                <a href={notes} target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline cursor-pointer inline-block">
                  View old pdf
                </a>
              </div>
            ))

          )
        }

        {/* Book Notes */}
        <div>
          <label className="block text-gray-700">Book Notes (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileChange(e, "booknotes")}
            className="w-full p-2 border rounded"
          />
        </div>
        {
          formData.booknotes && (
            <div className="mt-2">
              <a href={formData.booknotes} target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline cursor-pointer">
                View old pdf
              </a>
            </div>
          )
        }

        {/* PYQ & Solutions */}
        <div>
          <label className="block text-gray-700">Previous Year Question Papers (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileChange(e, "pyq")}
            className="w-full p-2 border rounded"
          />
        </div>
        {
          formData.pyq && (
            <div className="mt-2">
              <a href={formData.pyq} target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline cursor-pointer">
                View old pyq
              </a>
            </div>
          )
        }
        <div>
          <label className="block text-gray-700">PYQ Solutions (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileChange(e, "pyqsolution")}
            className="w-full p-2 border rounded"
          />
        </div>
        {
          formData.pyqsolution && (
            <div className="mt-2">
              <a href={formData.pyqsolution} target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline cursor-pointer">
                View old pyq
              </a>
            </div>
          )
        }

        {/* Video Links */}
        <div>
          <label className="block text-gray-700">Video Links</label>
          {formData.video.map((video, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                value={video}
                onChange={(e) => handleVideoChange(index, e.target.value)}
                className="w-full px-4 py-2 rounded-md border"
              />
              <button type="button" onClick={() => removeVideoField(index)} className="text-red-500">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addVideoField} className="text-indigo-500 mt-2">
            + Add Video
          </button>
        </div>

        <div className="flex gap-2">
          <button type="submit" className="bg-[#4B0082] text-white px-4 py-2 rounded-md hover:opacity-80" disabled={loading}>{loading ? "Updating..." : "Update"}</button>
          <button type="button" onClick={() => setActiveComponent("Semester")} className="text-[#4B0082] bg-white px-4 py-2 border border-[#4B0082] rounded-md hover:opacity-75">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateSubject;
