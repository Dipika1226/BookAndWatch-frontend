// SuccessModal.js
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SuccessModal = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/confirmation", { state });
    }, 2000); // 2-second delay

    return () => clearTimeout(timer);
  }, [navigate, state]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F1115] text-white">
      <div className="bg-[#1A1C22] p-8 rounded-lg text-center shadow-lg">
        <div className="flex items-center justify-center mb-4">
          <div className="text-green-400 text-4xl">✔️</div>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Payment Successful!</h2>
        <p className="text-gray-400 mb-4">Processing your booking...</p>
        <div className="w-full h-2 bg-gray-700 rounded">
          <div className="h-2 bg-yellow-500 rounded animate-pulse w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
