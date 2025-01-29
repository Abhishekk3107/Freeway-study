import React, { useState } from "react";
import useCourse from "../../../hooks/useCourse";
import { uploadToImageKit } from "../../../utils/uploadToImageKit";

function UpdateCourse({ courseData, setActiveComponent }) {
    const { updateCourse , error } = useCourse();
    const [formData, setFormData] = useState({
        name: courseData?.name || "",
        duration: courseData?.duration || "",
        syllabus: courseData?.syllabus || "", // Default to existing syllabus
    });
    const [newSyllabusFile, setNewSyllabusFile] = useState(null);
    const [pdfPreview, setPdfPreview] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file?.size > 10000000) {
            alert("File size must be under 10MB");
            e.target.value = "";
        } else if (file?.type === "application/pdf") {
            setNewSyllabusFile(file);

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

        // If a new file is uploaded, upload it and update the syllabus field
        if (newSyllabusFile) {
            try {
                const uploadedFile = await uploadToImageKit(newSyllabusFile);
                formData.syllabus = uploadedFile; // Update syllabus with uploaded file URL
            } catch (error) {
                console.error("Error uploading file:", error);
                return; // Exit if file upload fails
            }
        }

        // Update the course with the updated formData
        updateCourse(courseData._id, formData);
        setActiveComponent("Course"); // Navigate back to the main component
    };

    return (
        <div className="p-6 bg-white rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Update Course</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-medium text-gray-600 mb-1">
                        Course Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="border rounded-md p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="duration" className="text-sm font-medium text-gray-600 mb-1">
                        Duration
                    </label>
                    <input
                        type="number"
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="border rounded-md p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="syllabus" className="text-sm font-medium text-gray-600 mb-1">
                        Syllabus (Upload New File)
                    </label>
                    <input
                        type="file"
                        id="syllabus"
                        name="syllabus"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="border rounded-md p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    {formData.syllabus && (
                        <p className="text-sm text-gray-500 mt-1">
                            Current Syllabus:{" "}
                            <a href={formData.syllabus} target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
                                View Syllabus
                            </a>
                        </p>
                    )}
                </div>

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


                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="bg-[#4B0082] text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveComponent("Course")}
                        className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
}

export default UpdateCourse;
