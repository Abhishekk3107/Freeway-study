import React, { useState, useEffect } from "react";
import useUnit from "../../../hooks/useUnit";
import useCourse from "../../../hooks/useCourse";
import { uploadToImageKit } from "../../../utils/uploadToImageKit";

function UpdateUnit({ setActiveComponent, unitData }) {
  const { updateUnit, loading } = useUnit();
  const { courses } = useCourse(100);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [FilterUnits, setFilterUnits] = useState([]);
  const [formData, setFormData] = useState(unitData);

  useEffect(() => {
    if (unitData) {
      setSelectedCourse(unitData?.subject?.semester?.course?.name);
      setSelectedSemester(unitData?.subject?.semester?.name);
      setSelectedSubject(unitData?.subject?.name);
      const course = courses.find((c) => c._id === unitData?.subject.semester?.course?._id);
      if (course) {
        const semester = course.semesters.find((s) => s._id === unitData?.subject.semester?._id);
        if (semester) {
          const subject = semester.subjects.find((s) => s._id === unitData?.subject
            ._id);
          if (subject) {
            setFilterUnits(subject.unitsname);
          }
        }
      }
    }
  }, [unitData, courses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e, field) => {
    const files = e.target.files;
    if (files.length) {
      const uploadedUrls = await Promise.all([...files].map((file) => uploadToImageKit(file)));
      setFormData({ ...formData, [field]: field === "extraNotes" ? uploadedUrls : uploadedUrls[0] });
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
      const filteredVideo = formData.video.filter(vdo => vdo.trim() !== "");
      const formattedData = {
        ...formData,
        video: filteredVideo,
      };
      await updateUnit(formData._id, formattedData);
      alert("Unit updated successfully!");
      setActiveComponent("Unit");
    } catch (err) {
      console.error("Error updating unit:", err);
      alert("Failed to update unit. Please try again.");
    }
  };

  return (
    <div className="p-6 shadow-lg rounded-lg max-w-full mx-auto">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Update Unit</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">selected course</label>
          <input type="text" value={selectedCourse} disabled className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">selected semester</label>
          <input type="text" value={selectedSemester} disabled className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">selected subject</label>
          <input type="text" value={selectedSubject} disabled className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Selected unit</label>
          <select
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!selectedSemester}
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select a Subject</option>
            {FilterUnits.map((unit, index) => (
              <option key={index} value={unit}>
                {unit}
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
        {
          formData.notes && (
            <div className="mt-2">
              <a href={formData.notes} target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline cursor-pointer">
                View old pdf
              </a>
            </div>
          )
        }

        <div>
          <label className="block text-gray-700">Extra Notes (Multiple PDFs)</label>
          <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={(e) => handleFileChange(e, "extraNotes")}
            className="w-full p-2 border rounded"
          />
        </div>
        {
          formData.extraNotes?.length > 0 && (
            formData.extraNotes.map((notes, index) => (
              <div className="mt-2 inline-block mx-2" key={index}>
                <a href={notes} target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline cursor-pointer inline-block">
                  View old pdf
                </a>
              </div>
            ))

          )
        }

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
          <button
            type="submit"
            className="bg-[#4B0082] text-white px-4 py-2 rounded-md hover:opacity-80 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            onClick={() => setActiveComponent("Unit")}
            className="text-[#4B0082] bg-white px-4 py-2 border border-[#4B0082] rounded-md hover:opacity-75 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUnit;