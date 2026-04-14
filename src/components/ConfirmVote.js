import React from "react";

const ConfirmVote = ({ candidate, confirm, cancel }) => {
  if (!candidate) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f0e6] to-[#e6d3b3] flex items-center justify-center p-6">

      <div className="bg-[#ede4d3] w-full max-w-md rounded-2xl shadow-2xl p-6 text-center border border-[#c8a27c]">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-[#4b2e2b]">
          Confirm Your Vote
        </h1>

        <p className="text-[#6b4f3f] mb-6">
          Please review your selection carefully
        </p>

        {/* CANDIDATE CARD */}
        <div className="bg-[#f5f0e6] rounded-xl p-5 shadow-inner border border-[#c8a27c]">

          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src={candidate.image}
              alt={candidate.party}
              className="w-20 h-20 rounded-full border-4 border-[#c8a27c] object-cover"
            />
          </div>

          {/* PARTY */}
          <h2 className="text-lg font-bold text-[#6b3e26] mt-3">
            {candidate.party}
          </h2>

          {/* NAME */}
          <p className="text-xl font-semibold text-[#3f2a14] mt-1">
            {candidate.name}
          </p>

          {/* CONFIRM BOX */}
          <div className="mt-4 bg-[#ede4d3] border border-[#c8a27c] rounded-lg p-3">
            <p className="text-sm text-[#6b4f3f]">You are voting for</p>
            <p className="font-bold text-[#4b2e2b]">
              {candidate.name} ({candidate.party})
            </p>
          </div>

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 mt-6">

          <button
            onClick={cancel}
            className="w-1/2 bg-[#4b2e2b] hover:bg-[#6b3e26] text-white py-2 rounded-xl 
            transition-all duration-200 hover:scale-105"
          >
            Cancel
          </button>

          <button
            onClick={confirm}
            className="w-1/2 bg-[#6b3e26] hover:bg-[#d97706] text-white py-2 rounded-xl 
            transition-all duration-200 hover:scale-105 shadow-md"
          >
            Confirm Vote
          </button>

        </div>

        {/* FOOTER */}
        <p className="text-xs text-[#6b4f3f] mt-4">
          Secure Election Confirmation System
        </p>

      </div>
    </div>
  );
};

export default ConfirmVote;