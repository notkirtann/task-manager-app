import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });

  const [err, setErr] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      await signup(form.name, form.email, form.password, form.age);
      navigate("/tasks");
    } catch (error) {
      setErr("Signup failed — check details");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[--color-bg]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          w-full max-w-sm
          bg-[--color-bg-glass]
          backdrop-blur-xl
          border border-[--color-border]
          p-8 rounded-2xl
          shadow-xl
          text-gray-200
        "
      >
        <h2 className="text-3xl font-semibold mb-8 text-center bg-gradient-to-r from-[--color-primary] to-[--color-secondary] bg-clip-text text-transparent">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-400">Full Name</label>
            <input
              name="name"
              className="
                w-full px-4 py-2 mt-1 rounded-lg
                bg-[#1a1a1d] text-gray-200 border border-[--color-border]
                focus:outline-none focus:border-[--color-primary]
              "
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              name="email"
              type="email"
              className="
                w-full px-4 py-2 mt-1 rounded-lg
                bg-[#1a1a1d] text-gray-200 border border-[--color-border]
                focus:outline-none focus:border-[--color-primary]
              "
              onChange={handleChange}
            />
          </div>

          {/* Age */}
          <div>
            <label className="text-sm text-gray-400">Age</label>
            <input
              name="age"
              type="number"
              className="
                w-full px-4 py-2 mt-1 rounded-lg
                bg-[#1a1a1d] text-gray-200 border border-[--color-border]
                focus:outline-none focus:border-[--color-primary]
              "
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input
              name="password"
              type="password"
              className="
                w-full px-4 py-2 mt-1 rounded-lg
                bg-[#1a1a1d] text-gray-200 border border-[--color-border]
                focus:outline-none focus:border-[--color-primary]
              "
              onChange={handleChange}
            />
          </div>

          {err && <p className="text-red-400 text-sm">{err}</p>}

          <button
            type="submit"
            className="
              w-full py-3 rounded-lg
              bg-[--color-primary] text-white
              hover:bg-indigo-500
              transition
              font-medium
            "
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[--color-secondary] cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}
