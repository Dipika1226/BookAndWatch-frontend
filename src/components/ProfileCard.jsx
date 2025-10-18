import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../utils/authSlice";

export default function ProfileCard() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const handleLogout = async () => {
    try {
      await axios.post(`${API}/auth/logout`);
      dispatch(logout());
      navigate("/auth");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/10 border border-amber-500/20 rounded-lg shadow-md">
      <div className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAk1BMVEX///8jHyAAAAAkICH8/PwgHB0iHyAiHB4lHyH+/f7Avr8aGBn5+fkdGRogHh/59/h0cnMRCwzp5+jKyMm6uLnx7/ATDQ8ZFBVeXF1IRkd7eXrU0tM3NTYvLS5samtDQkKDgYLd3N2KiYqsrKyXlpfq6upSUVHRz9Cenp5ubG0qKCm1srM9OzxiYWKgnJ1RTE0SExMzxofiAAAIs0lEQVR4nO2dCV/qOhOHm7UFuhhKG2Qvuwhev/+ne5MU1HPfA9IW2vT+5jkHRdnyZ8Ikk0xGxwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4D8Fpecrne/fXa7Sf9+5jVwEdqIoyeLuoBuP+1GkJVJzW+tF0lxCNlgODwKf6b2+rHa+udlvu0JKfccfr/8JRSoDRBDi6sJYkOLecRQnTvttqNo/eJNYMs60PqTlqYv5LvB27zfdwEroDhq9T5U8dIUA43XfWPFyaRnU2W1T0y+vQVA6XUW5N2qhQGczwsFV+50lMhdvx2r0aKM+Gk+Vc2EE3bKhuplLsY+abmwp1j3lPG+oy/2O/s/wSXucNplRDXLJC2bkV4EXxHGsPoz0xwTIcpTAE75TXE46GV8e2g6SrbjbfgYiubZiewSeBPNMw+9V6PJgumuRxDfVRd1CvdR1iZwmDu20QiFdYnS/k/lGblsxaCgbdNNfhvlr4EUrfCntH1hx+xkIHjTd+jugnTeZN7e4QsYOm6bbfwddXLKPIh1rLJpu/m3UrIQmR1bGfDkeEd2mRdxEu4kPwUh5I6LgH7tHROr46e1g4ibaQ+GuY++wr024x6R8L9WxlDxFNk9OabJljJQdLLQROfocWyxQO9Ky4r4QL02LuMnss7LCUE9Pm9Zxlf60V11havPEZoB5dYViYa0NqbMUYXWFvaO9y8T+JPAqK+QuzpoWcpWN9KorDBF+b1rIVWJMHmBDYvH0e4/RI2yYzpoWcpWlKLg683eFcmutq3lJUXVfijz32G9ayTVmKas+HiLXndjqTOlQouoKuesdbFXoK4XVeylxPT5uWsoVHqTQc4mtCqPhZ+nI8JsQudb2UuVpqgtEIXOn1iociUfYkARHa1dN1xhVWGY7w4kcWjvir3BY3YicpW/WBojjR8y8EcLrpoVcJWEPiA8Jw/aue9NhUH3mzRBOmhZynQ9RXSEK7A0tVAgsq/dSJtY/c22tQjnAuVlNrORQec/eRW/VrmWlNW+iUzM/X5vWcR3q0KxX7YPIEcGrpnXcwHeiUfp7LtstKxJmb4Cf767tyiWafAlEeGmtnzlzSpFbtqe6LkPC+izFcYU+6pmhwm59jg4wSu+QqrBiG1kv0InmvbLLUTzEu6ab/zvU6eKyizVcuRmaP4nFKIe6xyFnpKC7IcxDn0O7teUohf4IE1R4B4NwNMnaoZDS5FUQr5gNGQsIboVA3Uaf9rei6E4iYcTmXKEfUJNy3z+mxWxoIvv8sa2AOpsh5pzdNbvRy3PkU2d5N93sAihTJCO98HZPV1X9k+DXcSvSg7/Qhw6dvZB3ZSmGnONZ0ip9jgkVfWe8FffMboiYrjqt8DE/oebkRLLEvye1SzzMTMDUNitqlMN5kcJMxBn3XM9zifnc5V/U71ko8TZum/m+MGak2QsXQb6d4eolKhUf6wRUk2fLhNx2I/WRbalG01P12LifY/wZqvidmVPAxo4o7AkcLmPH9oj+Ft9n7aPs43RMRdrrBapzBm4gRDrdLvVRbt9p+aF803Jzlqkfvy9P84MrXe+4HX3EWWTMZ8zcRh8DAAAAAADQbuhfrl2jo///URSrDYGwbuNlg0xfOn4Ubcbx+2q9Xi5GOYvler16j7NNFPkds+bRCmkXqHMpjUD78WA92k7CSwEsceHyi/A4XHwMxiZ/ppOrtF9oHilE/fF+9nr4VKIkYyb+JYSfN4fNJjEx8SKTSm5vuh29Z5u8wFk7yD7eJspiknGe173SYji7LNl8fzcVsdSdUoHT1+XA8u3fc9OSeBFgLIvmKzAUqL67XWWOY2dfzSNdp5OtX6UITU22QgLzzhv28GQWR85596NhTX9iovROPMO69FW+y13MhudaboRJfFxtzquRNqGX8bvzNGWceGbFiRQ1ovY8hLkeChmeLjcWdtR4iKX2Ja7nlsk2MYvj5rEhIwGe7H2LJOr+lJ2wLC7rOiGedu2p4UZptCKFnecvCg9MvtmSSOs7/aFO9SpfZ+AvEMaImAwc34b14k58kHqV/pECtTv23F66TGxQuDelAxl/xMG8L5TL8TzO8EvDPdU3Va8KlNYrhnrfxLTZcYPSzlI8RZyBE3ZIXxs9A9VxFrhaUvdNlPMKUDppMqO2s8YFS+sVg+uZTjpvUOKqQrbsHTBTVJmIUzPuRs2N4+rFaO6AIHxqaHrTnwc1CDS1o1ZNDIvUOT3RjX5DdNKibCCbgTrvtQhEetAgcp7UXhSzk0yD540TP9BhIyJiXb/CkXjIacr78JiuWVNv3D9mxbOAKygk6ZtPawuKTRLosIcKZgFXUohMQcW6ziVqgWMcElZnLyW9Y31TcP1pGAnOHlCL5l5cJRHHtUlUL5MVzHF+BHJYW5VhaooJ1Y/Y1WZEP5pUL61XQuGoHnn6fRykDyiWVJg6iwyPGlEY1lfHLXno4u/dEOVravocdp+5dHEDJurqpotHlKEpQ13HvKNtE55UU1d52uzQhJ/RhWt68xq6qf4LVU0M98jsMKbx0/NS8jlp+YrdVWCEpR/PFPel8CibcTTKhrKOY7TUx4w9oHhgCYWMBPLp+pTCDJNKlfPLw9gB959sRN1JB5hwxBVmO41zswfP8hZ85QKdr/3fL/7V4j9/Mj/yr2vM/KBfSWcVcR5yrv/Ex5O7qamcH/ZkmienmSS1VMrAwPS/S0P18abLzvdftxbV25QrzHNTSC6Nofx5DNK8jjjnxKWyF+L9k4+f6GylTZbt4rg7GLyv9vv1crkYvcxmw+H2dX6cTA/EqMcl0QeHyGE6Oc5ft8PhbPYyWiyX6/1q9T7oduN4l2Ub57lBIjV/k/JPOgoa/SBJkn6/nynG4/FOvRuK7pmB5vKDuWW3U/fSd1aPUY/8ehY/iqh+6n+9mv/0JcW/Pn/nx9fHcPUZfTgkBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABW8z+zvoWQPNh6VAAAAABJRU5ErkJggg=="
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-amber-500/30"
            />
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-xl font-semibold text-gray-300">
              {user?.name || "Guest User"}
            </h2>
            <p className="text-gray-500">
              {user?.email || "no-email@example.com"}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
