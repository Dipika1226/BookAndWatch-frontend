import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/authSlice';
import { useSelector } from "react-redux"

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  axios.defaults.withCredentials = true;

   const handleLogout = async () => {
    try {
      await axios.post('http://localhost:7777/auth/logout');
      dispatch(logout());
      navigate('/auth');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const handleProfileClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      alert.error("Please log in to view your profile");
      navigate("/"); // or redirect to login
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm relative px-4">
      {/* Brand - Left */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-amber-400">
          Book&Watch
        </Link>
      </div>

      {/* Search Bar - Centered (Only for logged-in users) */}
      {user && (
        <div className="absolute left-1/2 transform -translate-x-1/2 w-[500px] max-w-full">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered input-sm w-full text-sm py-1 rounded-xl hover:border-amber-300 bg-gradient-to-br from-black to-gray-900"
          />
        </div>
      )}

      {/* User Icon - Right */}
      <div className="flex-none">
        <div className="dropdown dropdown-end" onClick={handleProfileClick}>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar p-2 hover:border-amber-400"
          >
            <div>
              <FaUser className="text-white text-xl hover:text-amber-300" />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-10 mt-5 w-52 p-2 shadow bg-amber-400/5 backdrop-blur-md border border-white/10"

          >
            {user ? (
              <>
                <li className="text-sm px-2 py-1 font-bold text-amber-400/80">{user.name}</li>
                <li className="text-muted-foreground hover:text-amber-300 hover:bg-amber-300/15">
                  <button onClick={() => navigate("/profile")}>Profile</button>
                </li>
                <li className="text-muted-foreground hover:text-amber-300 hover:bg-amber-300/15">
                  <button onClick={() => navigate("/settings")}>Bookings</button>
                </li>
                <li
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-amber-300 hover:bg-amber-300/15"
                >
                  <button>Logout</button>
                </li>
              </>
            ) : (
              <li className="text-sm text-gray-500 px-2 p-1">
                🔒 Login first to access profile & bookings
                <button
                  className="btn btn-sm bg-amber-400/65 mt-2 w-full"
                  onClick={() => navigate("/auth")}
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
