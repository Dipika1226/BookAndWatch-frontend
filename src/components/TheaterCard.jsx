import React from "react";
import ShowtimeCard from "./ShowtimeCard";

const TheaterCard = ({ id, name, location, distance, rating, showGroups }) => {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-md p-4 shadow-sm text-white mb-6">
      {/* Theater Info */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-neutral-400">
            {location} • {distance}
          </p>
        </div>
        <div className="text-sm text-amber-400 font-semibold">⭐ {rating}</div>
      </div>

      {/* Each ShowGroup */}
      {showGroups.map((group, i) => (
        <div key={i} className="mb-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="bg-amber-500 text-black text-xs font-semibold px-3 py-1 rounded-full">
              {group.type}
            </span>
            {group.description && (
              <span className="text-neutral-400 text-xs">
                {group.description}
              </span>
            )}
          </div>

          {/* Showtime Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {group.showtimes.map((show, idx) => (
              <ShowtimeCard
                key={idx}
                time={show.time}
                price={show.price}
                highlighted={show.highlight}
                badge={show.badge}
                theaterId={id}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TheaterCard;
