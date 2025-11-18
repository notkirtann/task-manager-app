import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await signup(form.name, form.email, form.password, form.age);
      navigate("/tasks");
    } catch (e) {
      setError("Signup failed. Check data.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4 font-semibold text-center">Create Account</h2>

      <form onSubmit={submit} className="space-y-4">
        <input className="w-full px-3 py-2 border rounded" placeholder="Name"
          value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />

        <input className="w-full px-3 py-2 border rounded" placeholder="Age" type="number"
          value={form.age} onChange={(e)=>setForm({...form,age:e.target.value})} />

        <input className="w-full px-3 py-2 border rounded" placeholder="Email" type="email"
          value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />

        <input className="w-full px-3 py-2 border rounded" placeholder="Password" type="password"
          value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
