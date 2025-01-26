import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useFeedback from '../../hooks/useFeedback';

const imageKitUrl = "https://upload.imagekit.io/api/v1/files/upload";
const authEndpoint = `${import.meta.env.VITE_API_BACKEND_URL}/image`;
const publicKey = "public_H+DpeRbktD9PNybblai4CYtHvGg=";

const CallToAction = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
    const {addFeedback} = useFeedback();
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

    const handleFeedbackSubmit = async () => {
        try {
            const uploadedUserImage = fileData ? await uploadToImageKit(fileData) : null;

            const feedbackFormData = {
                ...formData,
                photo: uploadedUserImage,
            };
            console.log(feedbackFormData);
            addFeedback(feedbackFormData);
            setShowFeedbackPopup(false);
            setFormData({ name: '', email: '', city: '', review: '' });
            setFileData(null);
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
            {showFeedbackPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg w-[90%] max-w-sm sm:max-w-md">
      <h3 className="text-lg sm:text-xl font-semibold dark:text-white text-black mb-4">
        Provide Your Feedback
      </h3>
      <form
  onSubmit={(e) => {
    e.preventDefault();
    if (formData.review.length < 50 || formData.review.length > 1000) {
      alert("Review must be between 50 and 1000 characters.");
      return;
    }
    handleFeedbackSubmit();
    alert(
      "Your review will be shown on the review section only if accepted as appropriate by our team after monitoring, we will notify you on your given email once your feedback is accepted"
    );
    setShowFeedbackPopup(false); // Close the feedback form after confirmation
  }}
  className="space-y-4"
>

        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-500 dark:text-white"
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
            className="form-input w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-500 dark:text-white"
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
            className="form-input w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-500 dark:text-white"
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
            onChange={(e) => {
              if (e.target.value.length <= 1000) {
                handleChange(e);
              }
            }}
            className="form-textarea w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:bg-gray-500 dark:text-white"
            rows="3"
            required
          ></textarea>
          <small className="block text-sm text-gray-600 dark:text-gray-400 mt-1">
            {formData.review.length}/1000 characters
          </small>
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">
            Upload Photo (Max 200KB)
          </label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="form-input w-full border border-gray-300 dark:text-white dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className=" py-1 px-4 text-sm rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition simple-button"
            onClick={() => setShowFeedbackPopup(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className=" py-1 px-4 text-sm rounded-lg transition simple-button"
          >
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
