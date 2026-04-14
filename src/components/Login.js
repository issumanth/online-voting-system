import React, { useState } from "react";

const Login = ({ loginUser, setPage }) => {

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f0e6] to-[#c8a27c]">

      <div className="bg-[#ede4d3] p-8 rounded-2xl shadow-2xl w-96 border border-[#c8a27c]">

        <h1 className="text-2xl font-bold text-center text-[#8b5e3c]">
          Election Portal
        </h1>

        <input
          placeholder="User ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full p-3 border border-[#c8a27c] rounded-lg mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-[#c8a27c] rounded-lg mb-4"
        />

        <button
          onClick={() => loginUser(id, password)}
          className="w-full bg-[#6b3e26] hover:bg-[#d97706] text-white py-3 rounded-lg"
        >
          Login
        </button>

        {/* REGISTER LINK */}
        <p className="text-center mt-3 text-sm">
          New user?{" "}
          <span
            onClick={() => setPage("register")}
            className="text-[#6b3e26] cursor-pointer underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;