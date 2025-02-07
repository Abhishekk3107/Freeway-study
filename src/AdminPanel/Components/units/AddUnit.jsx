import React, { useState } from "react";
import useUnit from "../../../hooks/useUnit";
import useCourse from "../../../hooks/useCourse";
import { uploadToImageKit } from "../../../utils/uploadToImageKit";

function AddUnit({ setActiveComponent }) {
  const { addUnit, loading, error } = useUnit();
  const { courses } = useCourse(100);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setselectedSemester] = useState("");
  const [filteredSemesters, setFilteredSemesters] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [filteredUnit, setFilteredUnit] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    subjectId: "",
    notes: "",
    extranotes: [],
    video: [""],
  });

  const handleCourseChange = (e) => {
    const selectedCourseId = e.target.value;
    setSelectedCourse(selectedCourseId);

    // Find the selected course
    const course = courses.find((c) => c._id === selectedCourseId);

    if (course) {
      setFilteredSemesters(course.semesters || []);
      setFilteredSubjects([]);
      setFilteredUnit([]);
    } else {
      setFilteredSemesters([]);
      setFilteredSubjects([]);
    }
  };

  const handleSemesterChange = (e) => {
    const semesterId = e.target.value;
    setselectedSemester(semesterId);

    const semester = filteredSemesters.find((s) => s._id === semesterId);
    setFilteredSubjects(semester ? semester.subjects : []);
  };

  const handleSubjectChange = (e) => {
    setFormData({ ...formData, subjectId: e.target.value });

    const subject = filteredSubjects.find((s) => s._id === e.target.value);
    setFilteredUnit(subject.unitsname)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e, field) => {
    const files = e.target.files;
    if (files.length) {
      if (field === "extranotes") {
        const uploadedUrls = await Promise.all([...files].map((file) => uploadToImageKit(file)));
        setFormData((prev) => ({ ...prev, extranotes: uploadedUrls }));
      } else {
        const uploadedUrl = await uploadToImageKit(files[0]);
        setFormData((prev) => ({ ...prev, [field]: uploadedUrl }));
      }
    }
  };
  const handleVideoChange = (index, value) => {
    const updatedVideos = [...formData.video];
    updatedVideos[index] = value;
    setFormData({ ...formData, video: updatedVideos });
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

      const filtervideo = formData.video.filter((video) => video.trim() !== "");

      if (!formData.name || !formData.subjectId) {
        alert("Unit name and subject are required.");
        return;
      }
      const unitData = {
        ...formData,
        video: filtervideo,
      };
      console.log(unitData);
      await addUnit(unitData);
      alert("Unit added successfully!");
      setActiveComponent("Unit");
    } catch (err) {
      console.error("Error adding unit:", err);
      alert("Failed to add unit. Please try again.");
    }
  };

  return (
    <div className="p-6 shadow-lg rounded-lg max-w-full mx-auto">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Add New Unit</h2>
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
            value={selectedSemester}
            onChange={handleSemesterChange}
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            disabled={!selectedCourse}
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
            name="subjectId"
            value={formData.subjectId}
            onChange={handleSubjectChange}
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            disabled={!selectedSemester}
          >
            <option value="">Select a subject</option>
            {filteredSubjects.map((subject) => (
              <option key={subject._id} value={subject._id}>{subject.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Unit Name</label>
          <select
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!formData.subjectId}
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select a Unit</option>
            {filteredUnit.map((sem, index) => (
              <option key={index} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Notes (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileChange(e, "notes")}
            className="w-full p-2 border rounded"
          />
        </div>

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

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}

export default AddUnit;
