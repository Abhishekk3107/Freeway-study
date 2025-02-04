import React, { useState, useEffect } from 'react';
import useSemester from '../../../hooks/useSemester';
import useCourse from '../../../hooks/useCourse';
import { uploadToImageKit } from '../../../utils/uploadToImageKit';

function AddSemester({ setActiveComponent }) {
    const { addSemester, error, loading } = useSemester();
    const { courses } = useCourse(100);
    const [formData, setFormData] = useState({
        name: "",
        course: "",
        subjectsname: [""],
    });
    const [maxSemesters, setMaxSemesters] = useState(0);

    const [fileData, setFileData] = useState(null);
    const [pdfPreview, setPdfPreview] = useState("");

    useEffect(() => {
        if (formData.course) {
            const selectedCourse = courses.find(course => course._id === formData.course);
            setMaxSemesters(selectedCourse ? selectedCourse.duration : 0);
        }
    }, [formData.course, courses]);

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

    const handleSubjectChange = (index, value) => {
        const updatedSubjects = [...formData.subjectsname];
        updatedSubjects[index] = value;
        setFormData({ ...formData, subjectsname: updatedSubjects });
    };

    const addSubjectField = (e) => {
        setFormData({ ...formData, subjectsname: [ "" , ...formData.subjectsname] });
    };

    const removeSubjectField = (index) => {
        const updatedSubjects = formData.subjectsname.filter((_, i) => i !== index);
        setFormData({ ...formData, subjectsname: updatedSubjects });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fileData) {
            alert("Please upload a syllabus PDF before submitting.");
            return;
        }

        const filteredSubjects = formData.subjectsname.filter(subject => subject.trim() !== "");
    
        if (filteredSubjects.length === 0) {
            alert("Please enter at least one valid subject name.");
            return;
        }

        try {

            const syllabusUrl = await uploadToImageKit(fileData);

            const SemesterData = {
                ...formData,
                subjectsname: filteredSubjects,
                syllabus: syllabusUrl,
            };

            console.log("Submitting semester data:", SemesterData);

            await addSemester(SemesterData);

            alert("semester added successfully!");
            setActiveComponent("Semester");
        } catch (err) {
            console.error("Error submitting form:", err);
            alert("Failed to add course. Please try again.");
        }
    };

    return (
        <div className="rounded-xl p-4 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-semibold mb-4 text-[#4B0082]">Add New Semester</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Select Course */}
                <div>
                    <label className="block text-gray-600">Select Course</label>
                    <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Select a course</option>
                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>{course.name}</option>
                        ))}
                    </select>
                </div>

                {/* Select Semester */}
                <div>
                    <label className="block text-gray-600">Select Semester</label>
                    <select
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        disabled={!maxSemesters}
                    >
                        <option value="">Select a semester</option>
                        {Array.from({ length: maxSemesters }, (_, i) => i + 1).map((sem) => (
                            <option key={sem} value={sem}>Semester {sem}</option>
                        ))}
                    </select>
                </div>

                {/* Subjects Name */}
                <div>
                    <label className="block text-gray-600">Subjects Name</label>
                    {formData.subjectsname.map((subject, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => handleSubjectChange(index, e.target.value)}
                                className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            
                            />
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeSubjectField(index)}
                                    className="text-red-500 px-3 py-2 border border-red-500 rounded-md hover:bg-red-100"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addSubjectField}
                        className="text-green-500 mt-2 px-3 py-2 border border-green-500 rounded-md hover:bg-green-100"
                    >
                        Add Subject
                    </button>
                </div>

                {/* Syllabus */}
                <div>
                    <label className="block text-gray-600">semester Syllabus</label>
                    <input
                        type="file"
                        name="syllabus"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
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

export default AddSemester;