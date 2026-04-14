import React from "react";
import VoteCard from "./VoteCard";

const VotingPage = ({
  candidates = [],
  handleVote,
  votedUsers = {},
  currentUser,
  selectedElection,
  goBack,
  logout
}) => {

  const alreadyVoted =
    votedUsers?.[selectedElection]?.[currentUser?.id];

  return (
    <div className="min-h-screen bg-[#f5f0e6] p-6">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <button onClick={goBack} className="bg-[#6b3e26] text-white px-3 py-1 rounded">
          ← Back
        </button>

        <h1 className="text-xl font-bold">
          Voter Dashboard
        </h1>

        <button onClick={logout} className="bg-[#6b3e26] text-white px-3 py-1 rounded">
          Logout
        </button>
      </div>

      {/* ALREADY VOTED */}
      {alreadyVoted && (
        <div className="bg-[#ede4d3] p-4 rounded text-center mb-6">
          ✅ You already voted for <b>{alreadyVoted.name}</b>
        </div>
      )}

      {/* CANDIDATES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {candidates.map((c) => (
          <VoteCard
            key={c.id}
            name={c.name}
            party={c.party}
            image={c.image}
            vote={() => handleVote(c)}
            disabled={alreadyVoted}
          />
        ))}

      </div>

    </div>
  );
};

export default VotingPage;