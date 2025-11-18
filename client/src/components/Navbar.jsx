import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="w-full border-b bg-white/70 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center py-4 px-5">
        <Link to="/tasks" className="text-xl font-semibold text-gray-800">
          Task Manager
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Hello, {user.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-black transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
