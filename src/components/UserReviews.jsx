import React from "react";

const UserReviewsSection = ({ reviews }) => {
  return (
    <section className="mb-16 px-4 bg-[#F5F2EB] dark:bg-gray-900 p-10">
      <h2 className="text-3xl dark:text-white text-black font-semibold mb-8">
        What People Are Saying
      </h2>
      <p className="text-lg text-gray-800 dark:text-gray-400 mb-8">
        Here's what our users have to say about their experiences with us. Their voices inspire us to do better every day.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {reviews.map((review, index) => (
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
              "{review.review}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserReviewsSection;
