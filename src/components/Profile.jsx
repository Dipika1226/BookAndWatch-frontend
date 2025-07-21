import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import ProfileCard from './ProfileCard'; // Ensure this is default export

const BookingCard = ({ booking }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'cancelled':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'pending':
        return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      default:
        return 'text-gray-500 bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="bg-white/10 border border-gray-400 rounded-lg hover:border-amber-400/60 transition-colors duration-200">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0">
            <img
              src={booking.moviePoster}
              alt={booking.movieTitle}
              width={80}
              height={120}
              className="rounded-lg border border-gray-200"
            />
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-300 mb-1">
                {booking.movieTitle}
              </h3>
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin className="w-4 h-4" />
                <span>{booking.theater}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{booking.time}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Users className="w-4 h-4" />
                <span>{booking.seats} seats</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                  booking.status
                )}`}
              >
                {booking.status}
              </span>
              <span className="text-amber-500 font-semibold">
                ₹{booking.totalPrice}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingsSection = () => {
  const mockBookings = [
    {
      id: 1,
      movieTitle: 'Avengers: Endgame',
      moviePoster:
        'https://image.tmdb.org/t/p/w300/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
      theater: 'PVR Cinemas, Phoenix Mall',
      date: 'Dec 25, 2024',
      time: '7:30 PM',
      seats: 3,
      status: 'Confirmed',
      totalPrice: 750,
    },
    {
      id: 2,
      movieTitle: 'Spider-Man: No Way Home',
      moviePoster:
        'https://image.tmdb.org/t/p/w300/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
      theater: 'INOX Megaplex, Forum Mall',
      date: 'Dec 22, 2024',
      time: '4:00 PM',
      seats: 2,
      status: 'Cancelled',
      totalPrice: 500,
    },
    {
      id: 3,
      movieTitle: 'The Batman',
      moviePoster:
        'https://image.tmdb.org/t/p/w300/b0PlHu39a5JZyqHWKPf0k78c7qR.jpg',
      theater: 'Cinepolis, Central Mall',
      date: 'Dec 28, 2024',
      time: '9:15 PM',
      seats: 4,
      status: 'Pending',
      totalPrice: 1200,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-200">My Bookings</h2>
        <div className="h-1 flex-1 bg-gradient-to-r from-amber-400/30 to-transparent ml-6 rounded-full"></div>
      </div>

      {mockBookings.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="p-8 text-center">
            <p className="text-gray-500">No bookings found.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {mockBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#030303] to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          <ProfileCard />
          <BookingsSection />
        </div>
      </div>
    </div>
  );
}
