import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup(form.name, form.email, form.password, form.age);
      navigate("/tasks");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-80 space-y-5"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Create Account
        </h2>

        <input
          name="name"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="age"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
          placeholder="Age"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
