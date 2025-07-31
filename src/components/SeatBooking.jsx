import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const seatLayout = {
  A: [1, 2, 3, 4, 5, 6, 7, 8],
  B: [1, 2, 3, 4, 5, 6, 7, 8],
  C: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  D: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  E: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  F: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  G: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  H: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  I: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  J: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};

const occupiedSeats = ["C5", "C6", "D5", "E9", "F8", "G4", "H7"];

const getSeatCategory = (seatId) => {
  const row = seatId.charAt(0);
  if (["A", "B", "C"].includes(row)) return { type: "Premium", price: 250 };
  if (["D", "E", "F"].includes(row)) return { type: "Regular", price: 180 };
  return { type: "Economy", price: 120 };
};

const SeatBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { theaterId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const time = query.get("time");
  const priceFromURL = query.get("price");

  const toggleSeat = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const totalAmount = selectedSeats.reduce((sum, seatId) => {
    const { price } = getSeatCategory(seatId);
    return sum + price;
  }, 0);

  const handleProceed = () => {
    if (selectedSeats.length === 0) return;
    navigate("/payment", {
      state: {
        movie: "Desert Legends",
        time,
        seats: selectedSeats,
        total: totalAmount,
      },
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Movie & Showtime Info */}
      <div className="bg-neutral-800 p-4 rounded-md mb-6 border border-neutral-600">
        <h2 className="text-2xl font-semibold mb-2">Booking for {theaterId}</h2>
        <p className="text-sm text-gray-300">
          📅 Today &nbsp; | &nbsp; ⏰ {time} &nbsp; | &nbsp; 🎟️ ₹{priceFromURL}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Seat Layout */}
        <div className="bg-neutral-800 p-6 rounded-lg w-full md:w-3/4 border border-neutral-700">
          <h3 className="text-white text-lg mb-4 text-center">SCREEN</h3>
          <div className="bg-gradient-to-r from-amber-600 to-yellow-100 h-1 mb-4 rounded" />
          <div className="flex flex-col gap-4 items-center text-sm font-medium mt-10">
            {Object.entries(seatLayout).map(([rowLabel, rowSeats]) => {
              const isGroupGap = rowLabel === "C" || rowLabel === "G";
              return (
                <div
                  key={rowLabel}
                  className={`flex items-center gap-2 ${
                    isGroupGap ? "mt-3" : ""
                  }`}
                >
                  <span className="w-5 text-white">{rowLabel}</span>
                  <div className="flex gap-3">
                    {rowSeats.map((seatNum) => {
                      const seatId = `${rowLabel}${seatNum}`;
                      const isSelected = selectedSeats.includes(seatId);
                      const isOccupied = occupiedSeats.includes(seatId);

                      const seatColor = isOccupied
                        ? "bg-red-500 border-none"
                        : isSelected
                        ? "bg-amber-500 border-amber-300"
                        : "text-black bg-blue-600 border-none";

                      return (
                        <div
                          key={seatId}
                          onClick={() => toggleSeat(seatId)}
                          className={`w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer shadow-sm shadow-amber-300 border ${seatColor} shadow-lg hover:shadow-amber-300/50 transition-all hover:scale-105`}
                        >
                          {seatNum}
                        </div>
                      );
                    })}
                  </div>
                  <span className="w-5 text-white">{rowLabel}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-1/4 flex flex-col gap-4">
          {/* Legend */}
          <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
            <h4 className="text-lg font-semibold mb-2">Legend</h4>
            <div className="flex flex-col gap-2 text-sm text-white">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-amber-500"></div>{" "}
                Selected
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>{" "}
                Available
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div> Occupied
              </div>
            </div>
          </div>

          {/* Seat Categories */}
          <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
            <h4 className="text-lg font-semibold mb-2">Seat Categories</h4>
            <ul className="text-sm text-gray-300">
              <li>👑 Premium (A–C) — ₹250</li>
              <li>⭐ Regular (D–F) — ₹180</li>
              <li>💺 Economy (G–J) — ₹120</li>
            </ul>
          </div>

          {/* Selected Seats */}
          <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
            <h4 className="text-lg font-semibold mb-2">Selected Seats</h4>
            {selectedSeats.length === 0 ? (
              <p className="text-sm text-gray-400">No seats selected</p>
            ) : (
              <>
                <p className="text-sm text-gray-200 mb-1">
                  {selectedSeats.join(", ")}
                </p>
                <p className="text-sm text-gray-300">
                  Total Seats:{" "}
                  <span className="text-white font-semibold">
                    {selectedSeats.length}
                  </span>
                </p>
                <p className="text-sm text-gray-300">
                  Total Amount:{" "}
                  <span className="text-white font-semibold">
                    ₹{totalAmount}
                  </span>
                </p>
              </>
            )}
          </div>

          {/* Buttons */}
          <button
            onClick={handleProceed}
            className="bg-amber-500 hover:bg-amber-600 text-black py-2 rounded-md font-semibold mt-2 disabled:opacity-50"
            disabled={selectedSeats.length === 0}
          >
            Proceed to Payment
          </button>

          <button
            onClick={() => navigate(-1)}
            className="bg-neutral-700 hover:bg-neutral-600 text-white py-2 rounded-md mt-2"
          >
            ← Back to Showtimes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatBooking;
