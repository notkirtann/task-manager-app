import { useState, useEffect } from "react";
import api from "../api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [desc, setDesc] = useState("");

  const load = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => { load(); }, []);

  const createTask = async (e) => {
    e.preventDefault();
    await api.post("/tasks", { description: desc });
    setDesc("");
    load();
  };

  const toggle = async (t) => {
    await api.patch(`/tasks/${t._id}`, { completed: !t.completed });
    load();
  };

  const remove = async (id) => {
    await api.delete(`/tasks/${id}`);
    load();
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>

      <form onSubmit={createTask} className="flex gap-2 mb-6">
        <input
          className="flex-1 border px-3 py-2 rounded"
          placeholder="New task..."
          value={desc}
          onChange={(e)=>setDesc(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>

      <div className="bg-white rounded shadow divide-y">
        {tasks.map((t) => (
          <div key={t._id} className="flex items-center justify-between p-4">
            <span
              className={t.completed ? "line-through text-gray-500" : ""}
            >
              {t.description}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => toggle(t)}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                {t.completed ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => remove(t._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <p className="text-center text-gray-600 mt-4">No tasks yet.</p>
      )}
    </div>
  );
}
