// client/src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav style={{ background: '#333', padding: '15px', color: 'white' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '20px', fontWeight: 'bold' }}>
        Task Manager
      </Link>
      {user ? (
        <span style={{ float: 'right' }}>
          Welcome, {user.name}! 
          <button onClick={handleLogout} style={{ marginLeft: '10px', padding: '5px 10px' }}>
            Logout
          </button>
        </span>
      ) : (
        <span style={{ float: 'right' }}>
          <Link to="/login" style={{ color: 'white', marginRight: '10px' }}>Login</Link>
          <Link to="/signup" style={{ color: 'white' }}>Signup</Link>
        </span>
      )}
    </nav>
  );
};

export default Navbar;