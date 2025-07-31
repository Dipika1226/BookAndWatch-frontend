import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./src/components/Navbar";
import Auth from "./src/components/Auth";
import Profile from "./src/components/Profile";
import Home from "./src/components/Home";
import AdminDashboard from "./src/components/AdminDashboard";
import MovieDetails from "./src/components/MovieDetails";
import SeatBooking from "./src/components/SeatBooking";
import PaymentPage from "./src/components/PaymentPage";
import SuccessModal from "./src/components/SuccessModal";
import ConfirmationPage from "./src/components/ConfirmationPage";

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
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/book/:theaterId" element={<SeatBooking />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/success" element={<SuccessModal />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
