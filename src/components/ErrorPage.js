import React from "react";

const ErrorPage = ({ message, goLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-[#f5f0e6] to-[#e6d3b3] p-6">

      <div className="bg-[#ede4d3] p-8 rounded-2xl shadow-2xl text-center 
        border border-[#c8a27c] max-w-md w-full">

        {/* ERROR TITLE */}
        <h1 className="text-2xl font-bold text-[#4b2e2b] mb-3">
          ⚠️ Action Not Allowed
        </h1>

        {/* MESSAGE */}
        <p className="text-[#6b4f3f] mb-6">
          {message}
        </p>

        {/* BUTTON */}
        <button
          onClick={goLogin}
          className="bg-[#6b3e26] hover:bg-[#d97706] text-white px-6 py-2 rounded-lg 
          transition-all duration-200 hover:scale-105 shadow-md"
        >
          Go to Login
        </button>

      </div>
    </div>
  );
};

export default ErrorPage;