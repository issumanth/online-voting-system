import React from "react";

const VoteCard = ({ name, party, image, vote, disabled }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 text-center">

      <img
        src={image}
        alt={name}
        className="w-24 h-24 mx-auto rounded-full"
      />

      <h2 className="text-lg font-bold mt-3">
        {name}
      </h2>

      <p>{party}</p>

      <button
        onClick={vote}
        disabled={disabled}
        className={`mt-4 w-full py-2 rounded text-white ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#6b3e26]"
        }`}
      >
        {disabled ? "Already Voted" : "Vote Now"}
      </button>

    </div>
  );
};

export default VoteCard;