import React from "react";
import { useAuth } from "../context/AuthContext";
import { UserCircle } from "lucide-react";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header
      className="
        h-16 w-full flex items-center justify-between px-6
        bg-[--color-bg-glass] backdrop-blur-xl
        border-b border-[--color-border]
      "
    >
      <h2 className="text-lg font-medium text-gray-200">Dashboard</h2>

      <div className="flex items-center gap-3">
        <UserCircle size={28} className="text-gray-300" />
        <span className="text-gray-300">{user?.name}</span>
      </div>
    </header>
  );
}
