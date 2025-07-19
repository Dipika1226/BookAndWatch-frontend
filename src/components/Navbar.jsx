import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="navbar bg-base-300 shadow-sm relative px-4 ">
      {/* Brand - Left */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-amber-400">
          Book&Watch
        </Link>
      </div>

      {/* Search Bar - Centered */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-[500px] max-w-full ">
        <input
            type="text"
            placeholder="Search"
            className="input input-bordered input-sm w-full text-sm py-1 rounded-xl hover:border-amber-300 hover:placeholder:text-amber-300 bg-gradient-to-br from-black to-gray-900" 
        />

      </div>

      {/* User Icon - Right */}
      <div className="flex-none">
        <div className="dropdown dropdown-end">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-40 p-2 shadow "
          >
            <li className='text-muted-foreground hover:text-amber-300 hover:bg-amber-300/15'>
              <a>
                Profile
              </a>
            </li>
            <li className='text-muted-foreground hover:text-amber-300 hover:bg-amber-300/15'><a>Settings</a></li>
            <li className='text-muted-foreground hover:text-amber-300 hover:bg-amber-300/15'><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
