import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      navigate("/tasks");
    } catch (error) {
      setErr("Invalid login credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[--color-bg]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="
          w-full max-w-md
          bg-[--color-bg-glass]
          backdrop-blur-2xl
          border border-[--color-border]
          shadow-[0_0_25px_rgba(99,102,241,0.25)]
          rounded-2xl p-10
        "
      >
        {/* HEADER */}
        <h1 className="
          text-center text-4xl font-bold mb-2 
          bg-gradient-to-r from-[--color-primary] to-[--color-secondary]
          text-transparent bg-clip-text
        ">
          Login
        </h1>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Welcome back — let’s continue your progress.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* EMAIL */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              className="
                w-full px-4 py-3 rounded-lg
                bg-[#141417]
                text-gray-200 
                border border-[--color-border]
                focus:border-[--color-primary]
                focus:ring-1 focus:ring-[--color-primary]
                outline-none transition
              "
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              className="
                w-full px-4 py-3 rounded-lg
                bg-[#141417]
                text-gray-200 
                border border-[--color-border]
                focus:border-[--color-primary]
                focus:ring-1 focus:ring-[--color-primary]
                outline-none transition
              "
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {err && <p className="text-red-400 text-sm">{err}</p>}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="
              w-full py-3 mt-4
              bg-[--color-primary]
              hover:bg-indigo-500
              text-white rounded-lg
              text-lg font-medium
              shadow-[0_0_15px_rgba(99,102,241,0.4)]
              transition
            "
          >
            Login
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[--color-secondary] cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </motion.div>
    </div>
  );
}
