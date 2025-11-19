import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Circle, Trash2 } from "lucide-react";
import api from "../api";
import { toast } from "sonner";

export default function TaskCard({ task, refresh }) {
  const toggle = async () => {
    await api.patch(`/tasks/${task._id}`, { completed: !task.completed });
    toast.info("Task updated");
    refresh();
  };

  const del = async () => {
    await api.delete(`/tasks/${task._id}`);
    toast.error("Task deleted");
    refresh();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      className="
        p-5 rounded-xl 
        bg-[--color-bg-card] 
        backdrop-blur-lg 
        border border-[--color-border]
        hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]
        hover:border-[--color-primary]
        transition
      "
    >
      <div className="flex justify-between items-start">
        <span
          className={`text-base ${
            task.completed ? "line-through text-gray-500" : "text-gray-200"
          }`}
        >
          {task.description}
        </span>

        <button onClick={toggle} className="text-indigo-400">
          {task.completed ? <CheckCircle size={22} /> : <Circle size={22} />}
        </button>
      </div>

      <button
        onClick={del}
        className="mt-4 flex items-center gap-2 text-red-400 hover:text-red-300"
      >
        <Trash2 size={18} /> Delete
      </button>
    </motion.div>
  );
}
