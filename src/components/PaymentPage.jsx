import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CardPaymentForm from "../components/CardPaymentForm";
import UpiPaymentForm from "../components/UpiPaymentForm";
import WalletPaymentForm from "../components/WalletPaymentForm";
import BookingSummary from "../components/BookingSummary";

const PaymentPage = () => {
  const [method, setMethod] = useState("card");
  const navigate = useNavigate();
  const { state } = useLocation(); // receiving passed seat/ticket data

  const handlePayment = () => {
    // simulate successful payment
    setTimeout(() => {
      navigate("/success", { state }); // redirect with state
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0F1115] text-white px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-gray-400 hover:underline"
      >
        ← Back to Seat Selection
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3 bg-[#1A1C22] p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-6">🔒 Secure Payment</h2>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <input
              type="email"
              placeholder="Email Address"
              className="p-2 bg-[#0F1115] border border-gray-600 rounded"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="p-2 bg-[#0F1115] border border-gray-600 rounded"
            />
          </div>

          {/* Payment Method Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMethod("card")}
              className={`flex-1 py-2 rounded ${
                method === "card" ? "bg-yellow-500 text-black" : "bg-[#2A2D34]"
              }`}
            >
              💳 Credit/Debit Card
            </button>
            <button
              onClick={() => setMethod("upi")}
              className={`flex-1 py-2 rounded ${
                method === "upi" ? "bg-yellow-500 text-black" : "bg-[#2A2D34]"
              }`}
            >
              🔗 UPI
            </button>
            <button
              onClick={() => setMethod("wallet")}
              className={`flex-1 py-2 rounded ${
                method === "wallet"
                  ? "bg-yellow-500 text-black"
                  : "bg-[#2A2D34]"
              }`}
            >
              🪙 Digital Wallet
            </button>
          </div>

          {/* Payment Form */}
          {method === "card" && <CardPaymentForm />}
          {method === "upi" && <UpiPaymentForm />}
          {method === "wallet" && <WalletPaymentForm />}
        </div>

        {/* Booking Summary */}
        <BookingSummary data={state} onPay={handlePayment} />
      </div>
    </div>
  );
};

export default PaymentPage;
