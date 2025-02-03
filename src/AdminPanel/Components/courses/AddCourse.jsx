import React, { useState } from "react";
import useCourse from "../../../hooks/useCourse";
import { uploadToImageKit } from "../../../utils/uploadToImageKit";

function AddCourse({ setActiveComponent }) {
  const { addCourse, loading, error } = useCourse(8);
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
  });
  const [fileData, setFileData] = useState(null); // Store the selected file
  const [pdfPreview, setPdfPreview] = useState(""); // PDF preview URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file?.size > 10000000) {
      alert("File size must be under 10MB");
      e.target.value = "";
    } else if (file?.type === "application/pdf") {
      setFileData(file);

      // Create a temporary preview URL for the PDF
      const previewUrl = URL.createObjectURL(file);
      setPdfPreview(previewUrl);
    } else {
      alert("Only PDF files are allowed");
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fileData) {
      alert("Please upload a syllabus PDF before submitting.");
      return;
    }

    try {
      // Upload the file to ImageKit (or your chosen service)
      const syllabusUrl = await uploadToImageKit(fileData);

      // Combine form data with the uploaded file URL
      const courseData = {
        ...formData,
        syllabus: syllabusUrl, // Save the file URL to the database
      };

      console.log("Submitting course data:", courseData);

      // Call the addCourse hook or API
      await addCourse(courseData);

      alert("Course added successfully!");
      setActiveComponent("Course");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to add course. Please try again.");
    }
  };

  return (
    <div className="rounded-xl p-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-[#4B0082]">
        Add New Course
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course Name */}
        <div>
          <label className="block text-gray-600">Course Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Title"
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-gray-600">Duration (in weeks)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter Duration"
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Syllabus PDF */}
        <div>
          <label className="block text-gray-600">Syllabus PDF</label>
          <input
            type="file"
            name="syllabus"
            onChange={handleFileChange}
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* PDF Preview */}
        {pdfPreview && (
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-700">PDF Preview:</h3>
            <iframe
              src={pdfPreview}
              title="Syllabus Preview"
              className="w-full h-96 border rounded-md mt-2"
            ></iframe>
          </div>
        )}

        {/* Submit and Cancel Buttons */}
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
            onClick={() => setActiveComponent("Course")}
            className="text-[#4B0082] bg-white px-4 py-2 border border-[#4B0082] rounded-md hover:opacity-75 focus:outline-none"
          >
            Cancel
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default AddCourse;
