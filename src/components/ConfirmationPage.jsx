import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Check,
  Ticket,
  MapPin,
  Clock,
  Armchair,
  FileText,
  Download,
  Share2,
  Home,
} from "lucide-react";

const ConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const ticket = state?.ticket || {
    bookingId: "BKV8YIZGNL5",
    movieTitle: "Shadow Protocol",
    rating: "8.2/10",
    screenType: "IMAX",
    theater: "INOX - R City Mall",
    time: "09:00",
    date: "Today",
    seats: ["D19", "D18"],
    tickets: 2,
    paymentId: "TXN738H054UJ",
    ticketPrice: 710,
    convenienceFee: 71,
    gst: 141,
    total: 922,
  };

  return (
    <div className="bg-[#0F1115] text-white min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Top Confirmation */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-white" strokeWidth={3} />
          </div>
          <h1 className="text-3xl font-bold text-white">Booking Confirmed!</h1>
          <p className="text-gray-400 mt-1">
            Your movie tickets have been successfully booked
          </p>
        </div>

        {/* Ticket Info Card */}
        <div className="bg-[#1A1C22] border border-[#2c2f36] rounded-md p-6 text-white mb-6">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Ticket className="w-5 h-5 text-purple-400" />
              <span>Digital Ticket</span>
            </div>
            <div className="text-yellow-400 font-semibold text-sm">
              #{ticket.bookingId}
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-4">Show this at the theater</p>
          <hr className="border-gray-700 my-2" />
          <div className="flex gap-4">
            <img
              src="/poster-placeholder.png"
              alt={ticket.movieTitle}
              className="w-16 h-20 object-cover rounded"
            />
            <div className="flex-1 text-sm space-y-1">
              <h3 className="text-white font-semibold text-base">
                {ticket.movieTitle}
              </h3>
              <div className="flex items-center gap-2 text-yellow-400 text-sm mb-3">
                <span>⭐ {ticket.rating}</span>
                <span className="bg-[#333] text-xs px-2 p-[1px] rounded text-white">
                  {ticket.screenType}
                </span>
              </div>
              <div className="flex gap-16">
                <div className="flex flex-col gap-2">
                  <div className="text-gray-300 text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {ticket.theater}
                  </div>
                  <div className="text-gray-300 text-sm flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-gray-400" />
                    {ticket.tickets} tickets
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-gray-300 text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {ticket.time} • {ticket.date}
                  </div>
                  <div className="text-gray-300 text-sm flex items-center gap-2">
                    <Armchair className="w-4 h-4 text-gray-400" />
                    Seats: {ticket.seats.join(", ")}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="border-gray-700 my-2" />
          <div className="flex justify-center mt-6">
            <div className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded text-center text-sm">
              QR CODE
            </div>
          </div>
          <p className="text-center text-gray-400 text-xs mt-2">
            Show this QR code at the theater entrance
          </p>
        </div>

        {/* Payment Details */}
        <div className="bg-[#1A1C22] rounded-md p-6 mb-6 border border-gray-700">
          <h2 className="text-lg font-semibold mb-4">💳 Payment Details</h2>
          <div className="text-sm space-y-2">
            <div className="flex justify-between text-gray-300">
              <span>Payment ID</span>
              <span className="text-white">{ticket.paymentId}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Ticket Price ({ticket.tickets} seats)</span>
              <span>₹{ticket.ticketPrice}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Convenience Fee</span>
              <span>₹{ticket.convenienceFee}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>GST (18%)</span>
              <span>₹{ticket.gst}</span>
            </div>
            <hr className="border-gray-700 my-2" />
            <div className="flex justify-between font-semibold text-yellow-400 text-base">
              <span>Total Paid</span>
              <span>₹{ticket.total}</span>
            </div>
            <div className="flex items-center text-green-400 text-sm gap-2 mt-2">
              <Check className="w-4 h-4" />
              <span>Successful</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-[#2A2D34] border border-yellow-500 rounded-md p-4 mb-6 text-sm">
          <div className="flex items-center gap-2 text-yellow-400 font-semibold mb-2">
            <FileText className="w-5 h-5" />
            <span>Important Instructions</span>
          </div>
          <ul className="list-disc ml-6 text-gray-300 space-y-1">
            <li>Please arrive at the theater 30 minutes before showtime</li>
            <li>Carry a valid photo ID along with this ticket</li>
            <li>Outside food and beverages are not allowed</li>
            <li>Entry will be denied after the movie has started</li>
            <li>No refunds or exchanges are allowed</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
          <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded font-medium flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Ticket
          </button>
          <button className="bg-[#1A1C22] border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-6 py-2 rounded font-medium flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share Ticket
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded font-medium flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
        </div>

        {/* Support */}
        <div className="text-center text-sm text-gray-500">
          Need help? Contact us at{" "}
          <a
            href="mailto:support@cinebook.com"
            className="text-yellow-400 underline"
          >
            support@cinebook.com
          </a>{" "}
          or call{" "}
          <span className="text-yellow-400 font-semibold">
            +91 1800-123-4567
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
