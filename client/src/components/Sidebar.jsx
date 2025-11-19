import React from "react";
import { LayoutList, PlusCircle, Check, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <aside
      className="
        w-64 h-full
        bg-[--color-bg-glass] backdrop-blur-xl
        border-r border-[--color-border]
        flex flex-col p-6
      "
    >
      <h1 className="text-2xl font-semibold mb-10 bg-gradient-to-r from-[--color-primary] to-[--color-secondary] text-transparent bg-clip-text">
        TaskFlow
      </h1>

      <nav className="flex flex-col gap-3 text-gray-300">
        <button
          onClick={() => navigate("/tasks")}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition"
        >
          <LayoutList size={20} /> All Tasks
        </button>

        <button
          onClick={() => navigate("/tasks?filter=new")}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition"
        >
          <PlusCircle size={20} /> New Task
        </button>

        <button
          onClick={() => navigate("/tasks?completed=true")}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition"
        >
          <Check size={20} /> Completed
        </button>
      </nav>

      <div className="mt-auto">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 mt-6 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
}
