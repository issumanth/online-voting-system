import React, { useState } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import VotingPage from "./components/VotingPage";
import ConfirmVote from "./components/ConfirmVote";
import AdminDashboard from "./components/AdminDashboard";
import ErrorPage from "./components/ErrorPage";

import { parties } from "./data/parties";
import { voters as initialVoters, admins } from "./data/database";

const electionTypes = ["central", "state", "panchayat"];

function App() {

  const [page, setPage] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // ✅ VERY IMPORTANT (prevents white screen)
  const [selectedElection, setSelectedElection] = useState("central");

  const [voters, setVoters] = useState([]);

  /* ✅ STORE VOTES */
  const [votes, setVotes] = useState({
    central: {},
    state: {},
    panchayat: {}
  });

  /* ✅ TRACK WHO VOTED */
  const [votedUsers, setVotedUsers] = useState({
    central: {},
    state: {},
    panchayat: {}
  });

  /* ✅ ELECTION STATUS */
  const [elections, setElections] = useState({
    central: "not_started",
    state: "not_started",
    panchayat: "not_started"
  });

  /* ================= LOGIN ================= */

  const loginUser = (id, password) => {

    // ADMIN LOGIN
    const admin = admins.find(a => a.id === id && a.password === password);
    if (admin) {
      setPage("admin");
      return;
    }

    // USER LOGIN
    const user =
      voters.find(u => u.id === id && u.password === password) ||
      initialVoters.find(u => u.id === id && u.password === password);

    if (!user) {
      setPage("error");
      return;
    }

    setCurrentUser(user);
    setPage("chooseElection");
  };

  /* ================= SELECT ELECTION ================= */

  const handleElectionSelect = (type) => {
    if (!type) return;

    setSelectedElection(type);
    setPage("vote");
  };

  /* ================= VOTE ================= */

  const confirmVote = (candidate) => {

    const alreadyVoted =
      votedUsers[selectedElection]?.[currentUser?.id];

    if (alreadyVoted) {
      alert("You have already voted in this election");
      return;
    }

    setSelectedCandidate(candidate);
    setPage("confirm");
  };

  const finalVote = () => {

    // 🔒 DOUBLE CHECK
    if (votedUsers[selectedElection]?.[currentUser?.id]) {
      alert("Vote already submitted");
      return;
    }

    // ✅ STORE VOTES COUNT
    setVotes(prev => ({
      ...prev,
      [selectedElection]: {
        ...prev[selectedElection],
        [selectedCandidate.name]:
          (prev[selectedElection][selectedCandidate.name] || 0) + 1
      }
    }));

    // ✅ STORE USER VOTE
    setVotedUsers(prev => ({
      ...prev,
      [selectedElection]: {
        ...prev[selectedElection],
        [currentUser.id]: selectedCandidate
      }
    }));

    setPage("vote");
  };

  /* ================= LOGOUT ================= */

  const logout = () => {
    setCurrentUser(null);
    setSelectedCandidate(null);
    setPage("login");
  };

  /* ================= ROUTES ================= */

  if (page === "login") {
    return <Login loginUser={loginUser} setPage={setPage} />;
  }

  if (page === "register") {
    return (
      <Register
        goLogin={() => setPage("login")}
        voters={voters}
        setVoters={setVoters}
      />
    );
  }

  if (page === "chooseElection") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f0e6]">
        <div className="bg-[#ede4d3] p-8 rounded-xl text-center shadow">

          <h1 className="text-xl font-bold mb-4">
            Select Election
          </h1>

          {electionTypes.map(type => (
            <button
              key={type}
              onClick={() => handleElectionSelect(type)}
              className="block w-full mb-2 bg-[#6b3e26] hover:bg-[#d97706] text-white py-2 rounded"
            >
              {type.toUpperCase()}
            </button>
          ))}

          <button
            onClick={logout}
            className="mt-4 underline text-sm"
          >
            Back to Login
          </button>

        </div>
      </div>
    );
  }

  if (page === "vote") {
    return (
      <VotingPage
        candidates={parties[selectedElection] || []}
        handleVote={confirmVote}
        votedUsers={votedUsers}
        currentUser={currentUser}
        selectedElection={selectedElection}
        electionStatus={elections[selectedElection] || "not_started"}
        goBack={() => setPage("chooseElection")}
        logout={logout}
      />
    );
  }

  if (page === "confirm") {
    return (
      <ConfirmVote
        candidate={selectedCandidate}
        confirm={finalVote}
        cancel={() => setPage("vote")}
      />
    );
  }

  if (page === "admin") {
    return (
      <AdminDashboard
        logout={logout}
        elections={elections}
        setElections={setElections}
        votes={votes}
        parties={parties}
        selectedElection={selectedElection}
        setSelectedElection={setSelectedElection}
      />
    );
  }

  if (page === "error") {
    return (
      <ErrorPage
        message="Invalid Credentials"
        goLogin={() => setPage("login")}
      />
    );
  }

  return null;
}

export default App;