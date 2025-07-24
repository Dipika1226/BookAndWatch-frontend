import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaStar,
  FaMapMarkerAlt,
  FaChair,
  FaParking,
  FaUtensils,
} from "react-icons/fa";
import { MdOutlineScreenShare } from "react-icons/md";

const getNextDate = (offset) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toDateString();
};

const dummyTheaters = [
  {
    id: 1,
    name: "AMC Empire 25",
    location: "Times Square, NY",
    distance: "0.3 miles",
    rating: 4.5,
    facilities: ["Reclining Seats", "Concessions"],
    showtimes: [
      {
        date: getNextDate(0),
        time: "10:00 AM",
        type: "Standard",
        price: 12.99,
        status: "Available",
        lang: "English",
        screen: "Standard",
      },
      {
        date: getNextDate(1),
        time: "1:30 PM",
        type: "IMAX",
        price: 15.99,
        status: "Available",
        lang: "English - Subtitled",
        screen: "IMAX",
      },
      {
        date: getNextDate(2),
        time: "4:00 PM",
        type: "3D",
        price: 13.99,
        status: "Filling Fast",
        lang: "English",
        screen: "3D",
      },
      {
        date: getNextDate(3),
        time: "7:30 PM",
        type: "Dolby",
        price: 16.99,
        status: "Almost Full",
        lang: "English",
        screen: "Dolby",
      },
    ],
  },
  {
    id: 2,
    name: "Regal Union Square",
    location: "Union Square, NY",
    distance: "0.8 miles",
    rating: 4.2,
    facilities: ["Reserved Seating", "Food Service"],
    showtimes: [
      {
        date: getNextDate(0),
        time: "9:45 AM",
        type: "Standard",
        price: 11.99,
        status: "Available",
        lang: "English",
        screen: "Standard",
      },
      {
        date: getNextDate(1),
        time: "12:15 PM",
        type: "IMAX",
        price: 14.99,
        status: "Available",
        lang: "English",
        screen: "IMAX",
      },
      {
        date: getNextDate(2),
        time: "3:45 PM",
        type: "Standard",
        price: 12.99,
        status: "Filling Fast",
        lang: "English",
        screen: "Standard",
      },
      {
        date: getNextDate(3),
        time: "6:30 PM",
        type: "Dolby",
        price: 15.99,
        status: "Almost Full",
        lang: "English",
        screen: "Dolby",
      },
    ],
  },
];

const dates = Array.from({ length: 7 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  return date.toDateString();
});

const screenTypes = ["All Screens", "Standard", "IMAX", "3D", "Dolby"];

const TheaterShowtimes = () => {
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedScreen, setSelectedScreen] = useState("All Screens");
  const navigate = useNavigate();

  const filteredTheaters = dummyTheaters
    .map((theater) => {
      const filteredShowtimes = theater.showtimes.filter(
        (show) =>
          show.date === selectedDate &&
          (selectedScreen === "All Screens" || show.screen === selectedScreen)
      );
      return { ...theater, filteredShowtimes };
    })
    .filter((theater) => theater.filteredShowtimes.length > 0);

  return (
    <div className=" text-white py-6 px-4 -mt-6">
      <h2 className="text-2xl font-bold mb-6 text-amber-400 p-2">
        Select Theater & Showtime
      </h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="bg-neutral-800 text-white px-2 py-2 rounded-3xl hover:bg-amber-400/40"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          {dates.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>

        <select
          className="bg-neutral-800 text-white px-4 py-2 rounded-3xl hover:bg-amber-400/40"
          value={selectedScreen}
          onChange={(e) => setSelectedScreen(e.target.value)}
        >
          {screenTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {filteredTheaters.length === 0 ? (
        <p className="text-center text-neutral-400">
          No showtimes available for the selected date and screen type.
        </p>
      ) : (
        <div className="grid gap-6">
          {filteredTheaters.map((theater) => (
            <div
              key={theater.id}
              className="bg-neutral-900 border border-neutral-700 rounded-md p-4 shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{theater.name}</h3>
                  <p className="text-sm text-neutral-400 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-amber-400" />{" "}
                    {theater.location} • {theater.distance}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-amber-400">
                  <FaStar /> {theater.rating}
                </div>
              </div>

              <div className="flex gap-4 text-sm text-neutral-300 mb-3 flex-wrap">
                {theater.facilities.includes("Reclining Seats") && (
                  <span className="flex items-center gap-1">
                    <FaChair /> Recliners
                  </span>
                )}
                {theater.facilities.includes("Parking") && (
                  <span className="flex items-center gap-1">
                    <FaParking /> Parking
                  </span>
                )}
                {theater.facilities.includes("Food Service") && (
                  <span className="flex items-center gap-1">
                    <FaUtensils /> Food
                  </span>
                )}
                {theater.facilities.includes("Concessions") && (
                  <span className="flex items-center gap-1">
                    <FaUtensils /> Concessions
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {theater.filteredShowtimes.map((show, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(`/book/${theater.id}`)}
                    className="bg-neutral-800 rounded p-3 flex flex-col gap-1 border border-neutral-700 hover:border-amber-400"
                  >
                    <div className="text-lg font-medium">{show.time}</div>
                    <div className="flex items-center gap-2 text-xs">
                      <MdOutlineScreenShare /> {show.type}
                    </div>
                    <div className="text-xs text-neutral-400">{show.lang}</div>
                    <div className="text-sm font-semibold">₹{show.price}</div>
                    <div
                      className={`text-xs font-medium px-2 py-1 rounded w-fit mt-1
                        ${
                          show.status === "Available"
                            ? "bg-green-700 text-white"
                            : show.status === "Filling Fast"
                            ? "bg-yellow-700 text-white"
                            : "bg-red-700 text-white"
                        }`}
                    >
                      {show.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default TheaterShowtimes;
