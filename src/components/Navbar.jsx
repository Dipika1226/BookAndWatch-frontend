import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../utils/authSlice';
import LocationDropdown from './LocationDropdown'

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

  return (
    <div className="navbar bg-[#1C1D1D]/70 sticky top-0 z-50 shadow-sm px-4">
      {/* Brand - Left */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-amber-400 opacity-90">
          Book&Watch
        </Link>
      </div>

      {/* Search Bar - Center (Only for logged-in users) */}
      {user && (
        <div className="absolute left-1/2 transform -translate-x-1/2 w-[500px] max-w-full">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered input-sm w-full text-sm py-1 rounded-xl border-white/30 hover:border-amber-500 hover:shadow-[0_0_15px_rgba(255,191,0,0.5)] transition-all duration-500 bg-gradient-to-br from-black to-gray-900"
          />
        </div>
      )}

      {/* Location Dropdown */}
      <div className="hidden md:flex items-center space-x-2">
        <LocationDropdown />
      </div>


      {/* User Icon - Right */}
<div className="flex-none">
  <div className="dropdown dropdown-end">
    <div
      tabIndex={0}
      role="button"
      className="btn btn-ghost btn-circle avatar p-2 hover:border-amber-400"
    >
      <FaUser className="text-white text-xl hover:text-amber-300" />
    </div>

    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content rounded-box z-10 mt-7 w-52 p-2  divide-y divide-gray-900 border-white/10 bg-neutral-900/50 shadow-lg ring-1 ring-black/5 focus:outline-none"
    >
      {user ? (
        <>
          <li className="text-sm px-2 py-1 font-bold text-amber-400/80">{user.name}</li>
          <li className="text-muted-foreground hover:text-amber-300 hover:bg-amber-300/15">
            <button onClick={() => navigate("/profile")}>Profile</button>
          </li>
          <li className="text-muted-foreground hover:text-amber-300 hover:bg-amber-300/15">
            <button onClick={() => navigate("/bookings")}>Bookings</button>
          </li>
          <li
            onClick={handleLogout}
            className="text-muted-foreground hover:text-amber-300 hover:bg-amber-300/15"
          >
            <button>Logout</button>
          </li>
        </>
      ) : (
        <li className="text-sm text-gray-300 px-2 p-1">
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
