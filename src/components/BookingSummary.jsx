const BookingSummary = ({ data, onPay }) => {
  const {
    movie = "Desert Legends",
    time = "16:30 - Today",
    seats = ["C7", "C6", "C5"],
    total = 3699,
  } = data || {};

  return (
    <div className="md:w-1/3 bg-[#1A1C22] p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
      <div className="text-sm space-y-2">
        <p className="font-semibold">
          🎬 {movie} <span className="text-yellow-400">⭐ 7.9</span>
        </p>
        <p>📍 PVR Cinemas - Phoenix Mall</p>
        <p>🕒 {time}</p>
        <p>🎟️ Seats: {seats.join(", ")}</p>
      </div>

      <hr className="my-4 border-gray-600" />

      <div className="text-sm space-y-2">
        <div className="flex justify-between">
          <span>Ticket Price</span>
          <span>₹2850</span>
        </div>
        <div className="flex justify-between">
          <span>Convenience Fee</span>
          <span>₹285</span>
        </div>
        <div className="flex justify-between">
          <span>GST (18%)</span>
          <span>₹564</span>
        </div>
      </div>

      <hr className="my-4 border-gray-600" />

      <div className="flex justify-between font-semibold text-yellow-400 text-lg mb-4">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <button
        onClick={onPay}
        className="w-full bg-yellow-500 text-black py-2 rounded font-semibold"
      >
        🔒 Pay ₹{total}
      </button>
    </div>
  );
};

export default BookingSummary;
