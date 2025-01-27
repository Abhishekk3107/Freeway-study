import React, { useState } from "react";
import useFeedback from "../hooks/useFeedback";

const UserReviewsSection = () => {
  const { loading, approvedFeedback } = useFeedback();
  const [selectedFeedback, setSelectedFeedback] = useState(null); 

  const handleShowMore = (review) => {
    setSelectedFeedback(review);
  };

  const handleClosePopup = () => {
    setSelectedFeedback(null); 
  };

  return (
    <section className="mb-16 px-4 bg-[#F5F2EB] dark:bg-gray-900 p-10">
      <h2 className="text-3xl dark:text-white text-black font-semibold mb-8">
        What People Are Saying
      </h2>
      <p className="text-lg text-gray-800 dark:text-gray-400 mb-8">
        Here's what our users have to say about their experiences with us. Their voices inspire us to do better every day.
      </p>
      <div
        className={`grid ${
          approvedFeedback.length > 0
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-1"
        } gap-8 mt-12 grid-cols-1`}
      >
        {!loading ? (
          approvedFeedback.length > 0 ? (
            approvedFeedback.map((review, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center"
              >
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold dark:text-white text-gray-900">
                  {review.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {review.city}
                </p>
                <p className="mt-4 text-gray-800 dark:text-gray-300">
                  "{review.review.length > 80
                    ? review.review.substring(0, 80) + "..."
                    : review.review}"
                </p>
                {review.review.length > 100 && (
                  <button
                    className="text-blue-500 dark:text-blue-400 hover:underline mt-2"
                    onClick={() => handleShowMore(review)}
                  >
                    Show More
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="w-full text-center text-lg text-gray-400">
              <p>No feedback available at the moment.</p>
              <p>Be the first to leave feedback or check back later!</p>
            </div>
          )
        ) : (
          <div className="w-full flex justify-center items-center text-gray-400">
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-gray-600 w-12 h-12"></div>
          </div>
        )}
      </div>

      {/* Popup Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-11/12 max-w-5xl h-[80%] relative overflow-y-scroll scrollbar-hidden">
            <button
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              onClick={handleClosePopup}
            >
              ✕
            </button>
            <img
              src={selectedFeedback.image}
              alt={selectedFeedback.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold dark:text-white text-gray-900 text-center">
              {selectedFeedback.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
              {selectedFeedback.city}
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-300">
              "{selectedFeedback.review}"
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserReviewsSection;
