import React, { useState } from "react";

const AdminDashboard = ({
  logout,
  elections,
  setElections,
  votes,
  parties,
  setParties
}) => {

  const electionTypes = ["central", "state", "panchayat"];

  const [activeForm, setActiveForm] = useState(null);

  const [forms, setForms] = useState({
    central: { name: "", party: "", preview: "" },
    state: { name: "", party: "", preview: "" },
    panchayat: { name: "", party: "", preview: "" }
  });

  /* START / END */
  const startElection = (type) => {
    setElections(prev => ({ ...prev, [type]: "active" }));
  };

  const endElection = (type) => {
    setElections(prev => ({ ...prev, [type]: "ended" }));
  };

  /* 📂 FILE SELECT */
  const handleFileChange = (type, file) => {
    if (!file) return;

    const preview = URL.createObjectURL(file);

    setForms(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        preview
      }
    }));
  };

  /* ADD CANDIDATE */
  const addCandidate = (type) => {

    const form = forms[type];

    if (!form.name || !form.party) {
      alert("Fill all details");
      return;
    }

    const newCandidate = {
      id: Date.now(),
      name: form.name,
      party: form.party,
      image: form.preview || "https://via.placeholder.com/100"
    };

    setParties(prev => ({
      ...prev,
      [type]: [...(prev[type] || []), newCandidate]
    }));

    setForms(prev => ({
      ...prev,
      [type]: { name: "", party: "", preview: "" }
    }));

    setActiveForm(null);
  };

  /* WINNER */
  const getWinner = (type) => {
    const electionVotes = votes[type] || {};
    const candidates = parties[type] || [];

    let maxVotes = 0;
    let winnerName = null;

    for (let name in electionVotes) {
      if (electionVotes[name] > maxVotes) {
        maxVotes = electionVotes[name];
        winnerName = name;
      }
    }

    return candidates.find(c => c.name === winnerName);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] p-6">

      {/* HEADER */}
      <div className="flex justify-between max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-[#3a2b22]">
          Admin Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-[#e8dccb] text-[#3a2b22] px-5 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>

      {/* CARDS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {electionTypes.map((type) => {

          const status = elections[type];
          const winner = getWinner(type);
          const form = forms[type];

          return (
            <div
              key={type}
              className="
                bg-[#f3e9dc]/60 backdrop-blur-xl
                border border-[#e2d3c0]/60
                p-6 rounded-2xl shadow-md
                hover:bg-[#d2b48c]/50 transition
              "
            >

              <h2 className="text-lg font-bold text-center">
                {type.toUpperCase()}
              </h2>

              {/* STATUS */}
              <div className="text-center mt-2">
                <span className="px-3 py-1 rounded-full text-xs bg-gray-400 text-white">
                  {status}
                </span>
              </div>

              {/* BUTTON */}
              {activeForm !== type && (
                <button
                  onClick={() => setActiveForm(type)}
                  className="w-full mt-4 bg-[#e8dccb] py-2 rounded-lg"
                >
                  + Register Party
                </button>
              )}

              {/* FORM */}
              {activeForm === type && (
                <div className="mt-4 space-y-3">

                  <input
                    placeholder="Candidate Name"
                    value={form.name}
                    onChange={(e) =>
                      setForms(prev => ({
                        ...prev,
                        [type]: { ...form, name: e.target.value }
                      }))
                    }
                    className="w-full p-2 rounded bg-white"
                  />

                  <input
                    placeholder="Party Name"
                    value={form.party}
                    onChange={(e) =>
                      setForms(prev => ({
                        ...prev,
                        [type]: { ...form, party: e.target.value }
                      }))
                    }
                    className="w-full p-2 rounded bg-white"
                  />

                  {/* 🔥 PREMIUM FILE BOX */}
                  <label
                    className="
                      block w-full p-4 text-center cursor-pointer
                      border-2 border-dashed border-[#c8a27c]
                      rounded-xl bg-[#fffaf3]
                      hover:bg-[#f5e6d3]
                      transition
                    "
                  >

                    {form.preview ? (
                      <img
                        src={form.preview}
                        alt="preview"
                        className="w-16 h-16 mx-auto rounded-full"
                      />
                    ) : (
                      <p className="text-sm text-[#7b6351]">
                        Click to upload image
                      </p>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(type, e.target.files[0])}
                      className="hidden"
                    />

                  </label>

                  <div className="flex gap-2">

                    <button
                      onClick={() => addCandidate(type)}
                      className="w-full bg-green-500 text-white py-1 rounded"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setActiveForm(null)}
                      className="w-full bg-gray-400 text-white py-1 rounded"
                    >
                      Cancel
                    </button>

                  </div>

                </div>
              )}

              {/* START / END */}
              <div className="flex justify-center gap-3 mt-5">

                <button
                  onClick={() => startElection(type)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Start
                </button>

                <button
                  onClick={() => endElection(type)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  End
                </button>

              </div>

              {/* RESULT */}
              <div className="mt-5 text-center">

                {status === "ended" ? (
                  winner ? (
                    <>
                      <img
                        src={winner.image}
                        alt={winner.name}
                        className="w-14 h-14 mx-auto rounded-full"
                      />
                      <p className="font-bold">{winner.name}</p>
                    </>
                  ) : (
                    <p>No votes</p>
                  )
                ) : (
                  <p className="text-sm">Result after end</p>
                )}

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default AdminDashboard;