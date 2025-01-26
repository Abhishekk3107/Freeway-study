import React, { useState } from 'react'
import useFeedback from '../../hooks/useFeedback'

function Feedbacks() {
  const { allFeedback, loading, updateApprovalStatus } = useFeedback();
  const [hoveredFeedback, setHoveredFeedback] = useState(null);

  const handleApproval = (feedbackId, status) => {
    updateApprovalStatus(feedbackId, status); // Call to update feedback status
  };

  return (
    <>
      <div className='w-full h-auto min-h-screen flex items-start pt-16 flex-col space-y-8'>
        <h1 className='font-bold text-2xl text-slate-900 pl-8'>
          <i className="fa-regular fa-message mr-2 md:mr-4"></i>
          Feedbacks: What users are saying.
        </h1>
        {!loading ? allFeedback.length > 0 ? <>
          {allFeedback.map((feedback) => (
            <div
              key={feedback._id}
              className='w-full rounded-md bg-slate-900 text-gray-400 flex flex-col justify-between'
              onMouseEnter={() => setHoveredFeedback(feedback._id)}
              onMouseLeave={() => setHoveredFeedback(null)}
            >
              <div className='w-full rounded-md bg-slate-900 text-gray-400 flex flex-col sm:flex-row md:flex-nowrap justify-between p-4 sm:space-x-6 space-y-4 sm:space-y-0'>
                <div className='flex flex-col items-center justify-center'>
                  <img className='w-16 h-16 sm:w-12 sm:h-12 rounded-full' src={feedback.image} alt="User" />
                  <p className='text-xl font-medium mt-2'>{feedback.name}</p>
                </div>
                <p className='text-start text-sm sm:text-base max-w-full sm:max-w-[70%]'>
                  {feedback.review}
                </p>

                {/* Approval/Reject buttons */}
                <div className='flex space-x-4 items-center text-2xl sm:text-3xl justify-center'>
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

              {/* Show user details below feedback when hovered */}
              {hoveredFeedback === feedback._id && (
                <div className='w-full mt-4 p-4 bg-slate-800 rounded-md text-gray-300 text-start transform ease-linear transition-transform duration-300'>
                  <p><strong>City:</strong> {feedback.city}</p>
                  <p><strong>Email:</strong> {feedback.email}</p>
                  <p><strong>Created At:</strong> {new Date(feedback.createdAt).toLocaleString()}</p>
                  <p><strong>Updated At:</strong> {new Date(feedback.updatedAt).toLocaleString()}</p>
                  <p><strong>Status:</strong> {feedback.isApproved}</p>
                </div>
              )}
            </div>
          ))}
        </> : (
          <div className="w-full text-center text-lg text-gray-400">
            <p>No feedback available at the moment.</p>
            <p>Be the first to leave feedback or check back later!</p>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center text-gray-400">
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-gray-600 w-12 h-12"></div>
          </div>)}
      </div>
    </>
  )
}

export default Feedbacks
