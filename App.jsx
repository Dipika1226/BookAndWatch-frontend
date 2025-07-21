import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./src/components/Navbar";
import Auth from "./src/components/Auth";
import Profile from "./src/components/Profile";
import Home from "./src/components/Home";
import AdminDashboard from "./src/components/AdminDashboard";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <div className="bg-gradient-to-br from-black via-[#030303] to-gray-900 min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/" replace />}
          />
          <Route
            path="/admin"
            element={
              user && user.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
