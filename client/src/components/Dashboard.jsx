import { useEffect, useState } from "react";
import api from "../api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const loadTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    await api.post("/tasks", { description: text });
    setText("");
    loadTasks();
  };

  const toggle = async (t) => {
    await api.patch(`/tasks/${t._id}`, { completed: !t.completed });
    loadTasks();
  };

  const remove = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Your Tasks</h2>

      {/* Add Task */}
      <form onSubmit={createTask} className="flex gap-3">
        <input
          className="flex-1 border rounded-xl px-4 py-2 focus:ring-2 focus:ring-black"
          placeholder="New task…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-800">
          Add
        </button>
      </form>

      {/* Task List */}
      <div className="mt-6 space-y-4">
        {tasks.map((t) => (
          <div
            key={t._id}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow border"
          >
            <span
              className={`text-lg ${
                t.completed ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {t.description}
            </span>

            <div className="flex gap-3">
              <button
                onClick={() => toggle(t)}
                className="text-sm px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                {t.completed ? "Undo" : "Done"}
              </button>

              <button
                onClick={() => remove(t._id)}
                className="text-sm px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {tasks.length === 0 && (
          <p className="text-gray-500 text-center">No tasks yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
