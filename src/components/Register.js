import React, { useState, useEffect } from "react";

const Register = ({ goLogin, voters, setVoters }) => {

  const [form, setForm] = useState({
    name: "",
    age: "",
    aadhaar: "",
    phone: "",
    voterId: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [count, setCount] = useState(3);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {

    if (!form.voterId || !form.password) {
      setMessage("Voter ID & Password required");
      return;
    }

    const exists = voters.find(v => v.id === form.voterId);

    if (exists) {
      setMessage("User already exists");
      return;
    }

    setVoters([
      ...voters,
      {
        id: form.voterId,
        password: form.password
      }
    ]);

    setMessage("Registration Successful ✅");
    setSuccess(true);
  };

  // 🔥 AUTO REDIRECT
  useEffect(() => {
    if (success && count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (success && count === 0) {
      goLogin();
    }
  }, [success, count, goLogin]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f0e6] to-[#e6d3b3]">

      <div className="bg-[#ede4d3] p-8 rounded-2xl shadow-xl w-96">

        <h1 className="text-xl font-bold text-center mb-4 text-[#4b2e2b]">
          Register Voter
        </h1>

        {/* FORM */}
        <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-2 mb-2 border rounded"/>
        <input name="age" placeholder="Age" onChange={handleChange} className="w-full p-2 mb-2 border rounded"/>
        <input name="aadhaar" placeholder="Aadhaar" onChange={handleChange} className="w-full p-2 mb-2 border rounded"/>
        <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full p-2 mb-2 border rounded"/>

        <input name="voterId" placeholder="Voter ID" onChange={handleChange} className="w-full p-2 mb-2 border rounded"/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 mb-4 border rounded"/>

        <button
          onClick={handleRegister}
          className="w-full bg-[#6b3e26] hover:bg-[#d97706] text-white py-2 rounded"
        >
          Register
        </button>

        <button
          onClick={goLogin}
          className="w-full mt-2 text-sm underline text-[#6b3e26]"
        >
          Back to Login
        </button>

        {/* 🔥 MESSAGE BOX */}
        {message && (
          <div className={`mt-4 p-3 rounded-lg text-center
            ${success ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>

            <p className="font-semibold">{message}</p>

            {success && (
              <p className="text-sm mt-1">
                Redirecting in {count}...
              </p>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default Register;