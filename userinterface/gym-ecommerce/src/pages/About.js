import React from "react";

const About = () => {
  return (
    <div className="bg-black text-yellow-400 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 border-b-4 border-yellow-400 pb-2">
          About <span className="text-yellow-500">Fitness Freak</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
          Welcome to <span className="text-yellow-500 font-semibold">Fitness Freak</span> – your ultimate destination for fitness, strength, and endurance! Our gym is designed to help you achieve your goals, whether you're a beginner or a pro.
        </p>

        <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
          <div className="bg-gray-900 p-4 sm:p-6 rounded-lg shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">🏋️‍♂️ Expert Training</h2>
            <p className="text-gray-300 text-sm sm:text-base">Our certified trainers provide personalized guidance to help you train efficiently and safely.</p>
          </div>

          <div className="bg-gray-900 p-4 sm:p-6 rounded-lg shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">🔥 High-Quality Equipment</h2>
            <p className="text-gray-300 text-sm sm:text-base">We offer top-notch gym equipment and machines for all types of workouts, from strength training to cardio.</p>
          </div>

          <div className="bg-gray-900 p-4 sm:p-6 rounded-lg shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">⏰ Flexible Timings</h2>
            <p className="text-gray-300 text-sm sm:text-base">Open from <span className="text-yellow-400 font-semibold">Monday to Saturday</span>, we ensure you never miss a workout.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;