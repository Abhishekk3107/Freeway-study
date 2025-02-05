import React, { useState } from 'react';
import useFeedback from '../../hooks/useFeedback';

function Feedbacks() {
  const { allFeedback, loading, updateApprovalStatus } = useFeedback();
  const [hoveredFeedback, setHoveredFeedback] = useState(null);

  const handleApproval = (feedbackId, status) => {
    updateApprovalStatus(feedbackId, status);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#5A2175] text-white py-10">
      <div className="w-full max-w-4xl bg-[#5A2175] p-5 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold flex items-center space-x-2">
          <i className="fa-regular fa-message"></i>
          <span>Feedbacks: What users are saying.</span>
        </h1>
      </div>

      <div className="w-full max-w-4xl mt-6 space-y-6">
        {!loading ? (
          allFeedback.length > 0 ? (
            allFeedback.map((feedback) => (
              <div
                key={feedback._id}
                className="bg-white text-black rounded-xl shadow-lg p-6 transition-all"
                onMouseEnter={() => setHoveredFeedback(feedback._id)}
                onMouseLeave={() => setHoveredFeedback(null)}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between">
                  <div className="flex flex-col items-center">
                    <img
                      className="w-16 h-16 rounded-full border-2 border-gray-300"
                      src={feedback.image}
                      alt="User"
                    />
                    <p className="text-lg font-bold mt-2">{feedback.name}</p>
                  </div>

                  <p className="text-sm sm:text-base max-w-full sm:max-w-[70%]">
                    {feedback.review}
                  </p>

                  <div className="flex space-x-4 items-center text-2xl sm:text-3xl">
                    {feedback.isApproved === 'Pending' ? (
                      <>
                        <button
                          className="text-green-700 cursor-pointer"
                          onClick={() => handleApproval(feedback._id, 'Approved')}
                        >
                          <i className="fa-solid fa-circle-check" />
                        </button>
                        <button
                          className="text-red-700 cursor-pointer"
                          onClick={() => handleApproval(feedback._id, 'Rejected')}
                        >
                          <i className="fa-solid fa-circle-xmark" />
                        </button>
                      </>
                    ) : (
                      <p className={`text-${feedback.isApproved === 'Approved' ? 'green' : 'red'}-700 text-lg`}>
                        {feedback.isApproved}
                      </p>
                    )}
                  </div>
                </div>

                {hoveredFeedback === feedback._id && (
                  <div className="mt-4 p-4 bg-gray-200 rounded-md text-black">
                    <p><strong>City:</strong> {feedback.city}</p>
                    <p><strong>Email:</strong> {feedback.email}</p>
                    <p><strong>Created At:</strong> {new Date(feedback.createdAt).toLocaleString()}</p>
                    <p><strong>Updated At:</strong> {new Date(feedback.updatedAt).toLocaleString()}</p>
                    <p><strong>Status:</strong> {feedback.isApproved}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="w-full text-center text-lg text-gray-300">
              <p>No feedback available at the moment.</p>
              <p>Be the first to leave feedback or check back later!</p>
            </div>
          )
        ) : (
          <div className="w-full flex justify-center items-center">
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-white w-12 h-12"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Feedbacks;
