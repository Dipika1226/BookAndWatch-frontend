import React from "react";
import { useNavigate } from "react-router-dom";

const ShowtimeCard = ({ time, price, highlighted, badge, theaterId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${theaterId}?time=${time}&price=${price}`);
  };

  return (
    <div className="relative group">
      <div
        onClick={handleClick}
        className={`rounded-md border px-4 py-3 text-center cursor-pointer transition-transform duration-200 
        ${
          highlighted
            ? "border-amber-400 text-amber-400"
            : "border-neutral-600 text-white"
        } 
        group-hover:scale-105 hover:shadow-md`}
      >
        <div className="text-lg font-semibold">{time}</div>
        <div className="text-sm mt-1">₹{price}</div>
      </div>
      {badge && (
        <div className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs px-2 py-[1px] rounded-full">
          {badge}
        </div>
      )}
    </div>
  );
};

export default ShowtimeCard;
