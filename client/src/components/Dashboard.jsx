import React from "react";
import { useEffect, useState } from "react";
import api from "../api";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [desc, setDesc] = useState("");

  const load = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (e) => {
    e.preventDefault();
    if (!desc.trim()) return;
    await api.post("/tasks", { description: desc });
    setDesc("");
    load();
  };

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h3 className="text-3xl font-semibold text-white">Your Tasks</h3>

        <form onSubmit={create}>
          <div className="flex gap-3">
            <input
              className="bg-[--color-bg-card] border border-[--color-border] px-3 py-2 rounded-lg text-gray-200"
              placeholder="New task..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button className="px-4 py-2 bg-[--color-primary] text-white rounded-lg hover:bg-indigo-500">
              <Plus size={18} />
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((t) => (
          <TaskCard key={t._id} task={t} refresh={load} />
        ))}
      </div>

      {tasks.length === 0 && (
        <p className="text-gray-500 mt-10 text-center">No tasks yet.</p>
      )}
    </div>
  );
}
