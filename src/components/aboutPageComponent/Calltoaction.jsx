import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const imageKitUrl = "https://upload.imagekit.io/api/v1/files/upload";
const authEndpoint = `${import.meta.env.VITE_API_BACKEND_URL}/image`;
const publicKey = "public_H+DpeRbktD9PNybblai4CYtHvGg=";

const CallToAction = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        city: '',
        review: '',
    });
    const [fileData, setFileData] = useState(null);

    const uploadToImageKit = async (file) => {
        try {
            const { data } = await axios.get(authEndpoint);
            if (!data?.token || !data?.signature || !data?.expire) {
                throw new Error("Invalid authentication data from server.");
            }

            const formData = new FormData();
            formData.append("file", file);
            formData.append("fileName", file.name);
            formData.append("token", data.token);
            formData.append("expire", data.expire);
            formData.append("signature", data.signature);
            formData.append("publicKey", publicKey);

            const response = await axios.post(imageKitUrl, formData);
            console.log(response.data.url);

            return response.data.url;
        } catch (error) {
            console.error("Image upload failed:", error);
            throw new Error("Failed to upload image. Please try again.");
        }
    };

    const handleExploreResources = () => {
        navigate('/resources');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file?.size > 200000) {
            alert('File size must be under 200KB');
            e.target.value = '';
        } else {
            setFileData(file);
        }
    };

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        try {
            const uploadedUserImage = fileData ? await uploadToImageKit(fileData) : null;

            const feedbackFormData = {
                ...formData,
                photo: uploadedUserImage,
            };
            console.log(feedbackFormData)
            const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/api/feedback`, feedbackFormData);

            if (response.status === 201) {
                console.log('Feedback submitted successfully');
                setShowFeedbackPopup(false);
                setFormData({ name: '', email: '', city: '', review: '' });
                setFileData(null);
            } else {
                console.error('Failed to submit feedback');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };


    return (
        <>
            {/* Call to Action Section */}
            <section className="text-center bg-[#F5F2EB] dark:bg-gray-900 py-16 px-4 rounded-xl mb-8">
                <h2 className="text-3xl font-semibold dark:text-white text-black mb-4">
                    Join Our Learning Community
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                    Ready to embark on your learning journey? Explore our resources, engage with fellow learners,
                    and help us improve by providing your valuable feedback.
                </p>
                <div className="space-x-4">
                    <button
                        className="simple-button hover:scale-105 transition-transform"
                        size="lg"
                        onClick={handleExploreResources}
                    >
                        Explore Resources
                    </button>
                    <button
                        className="simple-button hover:scale-105 transition-transform"
                        size="lg"
                        variant="outline"
                        onClick={() => setShowFeedbackPopup(true)}
                    >
                        Provide Feedback
                    </button>
                </div>
            </section>

            {/* Feedback Popup */}
            {showFeedbackPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-xl font-semibold dark:text-white text-black mb-4">
                            Provide Your Feedback
                        </h3>
                        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-input w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-input w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="form-input w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                                    Review
                                </label>
                                <textarea
                                    name="review"
                                    value={formData.review}
                                    onChange={handleChange}
                                    className="form-textarea w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                                    Upload Photo (Max 200KB)
                                </label>
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    className="form-input w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    className="simple-button"
                                    onClick={() => setShowFeedbackPopup(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="simple-button">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default CallToAction;
