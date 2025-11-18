import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-semibold text-blue-600">
        Task Manager
      </Link>

      <div>
        {user ? (
          <>
            <span className="mr-4 text-gray-700">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="mr-4 text-blue-600" to="/login">Login</Link>
            <Link className="text-blue-600" to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
