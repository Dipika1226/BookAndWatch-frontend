import React from "react";
import TheaterCard from "./TheaterCard";

const TheaterSection = () => {
  const theaters = [
    {
      id: "theater1",
      name: "INOX - R City Mall",
      location: "Ghatkopar, Mumbai",
      distance: "8.2 km",
      rating: 4.3,
      showGroups: [
        {
          type: "IMAX",
          description: "Premium Experience",
          showtimes: [
            { time: "09:45", price: 280 },
            { time: "13:00", price: 350 },
            { time: "17:45", price: 350 },
            { time: "21:00", price: 420, highlighted: true, badge: "12 left" },
          ],
        },
        {
          type: "Standard",
          showtimes: [
            { time: "08:15", price: 144 },
            { time: "12:30", price: 180 },
            { time: "16:00", price: 180 },
            { time: "20:45", price: 216 },
          ],
        },
      ],
    },
    {
      id: "theater2",
      name: "PVR Phoenix Marketcity",
      location: "Kurla, Mumbai",
      distance: "6.5 km",
      rating: 4.6,
      showGroups: [
        {
          type: "4DX",
          description: "Motion Seats & Effects",
          showtimes: [
            { time: "10:00", price: 400 },
            { time: "14:00", price: 420 },
            { time: "18:30", price: 440 },
            { time: "22:15", price: 460, highlighted: true, badge: "Few left" },
          ],
        },
        {
          type: "Standard",
          showtimes: [
            { time: "09:00", price: 200 },
            { time: "13:30", price: 230 },
            { time: "17:00", price: 250 },
            { time: "21:45", price: 270 },
          ],
        },
      ],
    },
  ];

  return (
    <div className="px-4 sm:px-8 py-6">
      <h2 className="text-white text-2xl font-bold mb-6">
        Select Theater & Showtime
      </h2>
      {theaters.map((theater, i) => (
        <TheaterCard key={i} {...theater} />
      ))}
    </div>
  );
};

export default TheaterSection;
