"use client";

import React, { useState } from 'react';
import { Home, Film, MapPin, Calendar, DollarSign, Search, Plus, Edit3, Trash2, Eye,TrendingUp, Menu, X } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [showTheaterModal, setShowTheaterModal] = useState(false);
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [revenueStartDate, setRevenueStartDate] = useState('2024-01-01');
  const [revenueEndDate, setRevenueEndDate] = useState('2024-12-31');

  // Mock data
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Avatar: The Way of Water",
      genre: "Action, Adventure",
      releaseDate: "2022-12-16",
      description: "Jake Sully and Neytiri have formed a family and are doing everything to stay together.",
      rating: "PG-13",
      poster: "/api/placeholder/300/450"
    },
    {
      id: 2,
      title: "Top Gun: Maverick",
      genre: "Action, Drama",
      releaseDate: "2022-05-27",
      description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator.",
      rating: "PG-13",
      poster: "/api/placeholder/300/450"
    },
    {
      id: 3,
      title: "Black Panther: Wakanda Forever",
      genre: "Action, Adventure",
      releaseDate: "2022-11-11",
      description: "The people of Wakanda fight to protect their home from intervening world powers.",
      rating: "PG-13",
      poster: "/api/placeholder/300/450"
    }
  ]);

  const [theaters, setTheaters] = useState([
    {
      id: 1,
      name: "CinePlex Downtown",
      area: "Mumbai Central",
      screens: 8,
      seatCapacity: 1200,
      status: "Active"
    },
    {
      id: 2,
      name: "Premium Cinemas",
      area: "Bandra",
      screens: 6,
      seatCapacity: 900,
      status: "Active"
    },
    {
      id: 3,
      name: "Star Theater",
      area: "Andheri",
      screens: 4,
      seatCapacity: 600,
      status: "Maintenance"
    }
  ]);

  const [areas, setAreas] = useState([
    { id: 1, name: "Mumbai Central", city: "Mumbai" },
    { id: 2, name: "Bandra", city: "Mumbai" },
    { id: 3, name: "Andheri", city: "Mumbai" },
    { id: 4, name: "Powai", city: "Mumbai" },
    { id: 5, name: "Connaught Place", city: "Delhi" },
    { id: 6, name: "Koramangala", city: "Bangalore" }
  ]);

  const [bookings] = useState([
    {
      id: 1,
      user: "John Doe",
      movie: "Avatar: The Way of Water",
      theater: "CinePlex Downtown",
      seats: "A1, A2",
      status: "Confirmed",
      totalPrice: 500,
      date: "2024-01-15",
      showtime: "7:30 PM"
    },
    {
      id: 2,
      user: "Jane Smith",
      movie: "Top Gun: Maverick",
      theater: "Premium Cinemas",
      seats: "B5, B6, B7",
      status: "Pending",
      totalPrice: 750,
      date: "2024-01-16",
      showtime: "4:00 PM"
    },
    {
      id: 3,
      user: "Mike Johnson",
      movie: "Black Panther: Wakanda Forever",
      theater: "Star Theater",
      seats: "C10",
      status: "Cancelled",
      totalPrice: 250,
      date: "2024-01-14",
      showtime: "1:30 PM"
    },
    {
      id: 4,
      user: "Sarah Wilson",
      movie: "Avatar: The Way of Water",
      theater: "CinePlex Downtown",
      seats: "D1, D2, D3, D4",
      status: "Confirmed",
      totalPrice: 1000,
      date: "2024-01-17",
      showtime: "10:00 AM"
    }
  ]);

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'theaters', label: 'Theaters', icon: Film },
    { id: 'areas', label: 'Areas', icon: MapPin },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'revenue', label: 'Revenue', icon: DollarSign }
  ];

  const handleAddMovie = (movieData) => {
    const newMovie = {
      id: Date.now(),
      ...movieData
    };
    setMovies([...movies, newMovie]);
    setShowMovieModal(false);
    setEditingItem(null);
  };

  const handleEditMovie = (id, movieData) => {
    setMovies(movies.map(movie => movie.id === id ? { ...movie, ...movieData } : movie));
    setShowMovieModal(false);
    setEditingItem(null);
  };

  const handleDeleteMovie = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  const handleAddTheater = (theaterData) => {
    const newTheater = {
      id: Date.now(),
      ...theaterData
    };
    setTheaters([...theaters, newTheater]);
    setShowTheaterModal(false);
    setEditingItem(null);
  };

  const handleEditTheater = (id, theaterData) => {
    setTheaters(theaters.map(theater => theater.id === id ? { ...theater, ...theaterData } : theater));
    setShowTheaterModal(false);
    setEditingItem(null);
  };

  const handleDeleteTheater = (id) => {
    setTheaters(theaters.filter(theater => theater.id !== id));
  };

  const handleAddArea = (areaData) => {
    const newArea = {
      id: Date.now(),
      ...areaData
    };
    setAreas([...areas, newArea]);
    setShowAreaModal(false);
    setEditingItem(null);
  };

  const handleEditArea = (id, areaData) => {
    setAreas(areas.map(area => area.id === id ? { ...area, ...areaData } : area));
    setShowAreaModal(false);
    setEditingItem(null);
  };

  const handleDeleteArea = (id) => {
    setAreas(areas.filter(area => area.id !== id));
  };

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTheaters = theaters.filter(theater =>
    theater.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    theater.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAreas = areas.filter(area =>
    area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBookings = bookings.filter(booking =>
    booking.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.movie.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTotalRevenue = () => {
    return bookings
      .filter(booking => booking.status === 'Confirmed')
      .reduce((total, booking) => total + booking.totalPrice, 0);
  };

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/10 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between h-16 px-6 bg-base-300">
        <h1 className="text-lg font-bold ">Admin Dashboard</h1>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="mt-8">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
                activeTab === item.id
                  ? 'bg-amber-400/70 text-primary-content'
                  : 'hover:bg-base-300'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );

  const MovieModal = () => {
    const [formData, setFormData] = useState(editingItem || {
      title: '',
      genre: '',
      releaseDate: '',
      description: '',
      rating: 'PG',
      poster: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (editingItem) {
        handleEditMovie(editingItem.id, formData);
      } else {
        handleAddMovie(formData);
      }
    };

    return (
      <div className={`modal ${showMovieModal ? 'modal-open' : ''}`}>
        <div className="modal-box w-11/12 max-w-2xl">
          <h3 className="font-bold text-lg mb-4">
            {editingItem ? 'Edit Movie' : 'Add New Movie'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Genre</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.genre}
                onChange={(e) => setFormData({...formData, genre: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Release Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={formData.releaseDate}
                onChange={(e) => setFormData({...formData, releaseDate: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              ></textarea>
            </div>
            <div>
              <label className="label">
                <span className="label-text">Rating</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: e.target.value})}
              >
                <option value="G">G</option>
                <option value="PG">PG</option>
                <option value="PG-13">PG-13</option>
                <option value="R">R</option>
                <option value="NC-17">NC-17</option>
              </select>
            </div>
            <div>
              <label className="label">
                <span className="label-text">Poster Upload</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                accept="image/*"
              />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn bg-amber-400/70">
                {editingItem ? 'Update' : 'Add'} Movie
              </button>
              <button 
                type="button" 
                className="btn"
                onClick={() => {
                  setShowMovieModal(false);
                  setEditingItem(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const TheaterModal = () => {
    const [formData, setFormData] = useState(editingItem || {
      name: '',
      area: '',
      screens: 1,
      seatCapacity: 100,
      status: 'Active'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (editingItem) {
        handleEditTheater(editingItem.id, formData);
      } else {
        handleAddTheater(formData);
      }
    };

    return (
      <div className={`modal ${showTheaterModal ? 'modal-open' : ''}`}>
        <div className="modal-box w-11/12 max-w-lg">
          <h3 className="font-bold text-lg mb-4">
            {editingItem ? 'Edit Theater' : 'Add New Theater'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Theater Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Area</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value})}
                required
              >
                <option value="">Select Area</option>
                {areas.map(area => (
                  <option key={area.id} value={area.name}>
                    {area.name} - {area.city}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">
                <span className="label-text">Number of Screens</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                min="1"
                value={formData.screens}
                onChange={(e) => setFormData({...formData, screens: parseInt(e.target.value)})}
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Total Seat Capacity</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                min="1"
                value={formData.seatCapacity}
                onChange={(e) => setFormData({...formData, seatCapacity: parseInt(e.target.value)})}
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="Active">Active</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className="modal-action">
              <button type="submit" className="btn bg-amber-400/70">
                {editingItem ? 'Update' : 'Add'} Theater
              </button>
              <button 
                type="button" 
                className="btn"
                onClick={() => {
                  setShowTheaterModal(false);
                  setEditingItem(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const AreaModal = () => {
    const [formData, setFormData] = useState(editingItem || {
      name: '',
      city: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (editingItem) {
        handleEditArea(editingItem.id, formData);
      } else {
        handleAddArea(formData);
      }
    };

    return (
      <div className={`modal ${showAreaModal ? 'modal-open' : ''}`}>
        <div className="modal-box w-11/12 max-w-md">
          <h3 className="font-bold text-lg mb-4">
            {editingItem ? 'Edit Area' : 'Add New Area'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Area Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">City</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                required
              />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn bg-amber-400/70">
                {editingItem ? 'Update' : 'Add'} Area
              </button>
              <button 
                type="button" 
                className="btn"
                onClick={() => {
                  setShowAreaModal(false);
                  setEditingItem(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Dashboard Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
              <div className="card bg-white/10 shadow-xl ">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-base-content/60">Total Movies</p>
                      <p className="text-2xl font-bold">{movies.length}</p>
                    </div>
                    <div className="p-3 bg-amber-400/70 rounded-full">
                      <Film className="h-6 w-6 text-primary-content" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-white/10 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-base-content/60">Total Theaters</p>
                      <p className="text-2xl font-bold">{theaters.length}</p>
                    </div>
                    <div className="p-3 bg-secondary rounded-full">
                      <Film className="h-6 w-6 text-secondary-content" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-white/10 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-base-content/60">Total Bookings</p>
                      <p className="text-2xl font-bold">{bookings.length}</p>
                    </div>
                    <div className="p-3 bg-accent rounded-full">
                      <Calendar className="h-6 w-6 text-accent-content" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-white/10 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-base-content/60">Total Revenue</p>
                      <p className="text-2xl font-bold">₹{getTotalRevenue().toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-success rounded-full">
                      <DollarSign className="h-6 w-6 text-success-content" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-white/10 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Recent Bookings</h3>
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Movie</th>
                        <th>Theater</th>
                        <th>Seats</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 5).map((booking) => (
                        <tr key={booking.id}>
                          <td>{booking.user}</td>
                          <td>{booking.movie}</td>
                          <td>{booking.theater}</td>
                          <td>{booking.seats}</td>
                          <td>
                            <div className={`badge ${
                              booking.status === 'Confirmed' ? 'badge-success' :
                              booking.status === 'Pending' ? 'badge-warning' :
                              'badge-error'
                            }`}>
                              {booking.status}
                            </div>
                          </td>
                          <td>₹{booking.totalPrice}</td>
                          <td>{booking.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="card bg-white/10 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Revenue Chart</h3>
                <div className="h-64 flex items-center justify-center bg-base-200 rounded-lg">
                  <p className="text-lg text-base-content/60">Chart Placeholder - Integrate with Chart.js or similar</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'movies':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Movies Management</h2>
              <button 
                className="btn bg-amber-400/70"
                onClick={() => setShowMovieModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Movie
              </button>
            </div>

            <div className="card bg-white/10 shadow-xl">
              <div className="card-body">
                <div className="flex gap-4 mb-6">
                  <div className="form-control flex-1">
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Search movies..."
                        className="input input-bordered flex-1"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <span className="btn btn-square">
                        <Search className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Release Date</th>
                        <th>Rating</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMovies.map((movie) => (
                        <tr key={movie.id}>
                          <td>{movie.title}</td>
                          <td>{movie.genre}</td>
                          <td>{movie.releaseDate}</td>
                          <td>
                            <div className="badge badge-outline">{movie.rating}</div>
                          </td>
                          <td>
                            <div className="flex gap-2">
                              <button 
                                className="btn btn-sm btn-ghost"
                                onClick={() => {
                                  setEditingItem(movie);
                                  setShowMovieModal(true);
                                }}
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button 
                                className="btn btn-sm btn-ghost text-error"
                                onClick={() => handleDeleteMovie(movie.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case 'theaters':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Theaters Management</h2>
              <button 
                className="btn bg-amber-400/70"
                onClick={() => setShowTheaterModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Theater
              </button>
            </div>

            <div className="card bg-white/10 shadow-xl">
              <div className="card-body">
                <div className="flex gap-4 mb-6">
                  <div className="form-control flex-1">
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Search theaters..."
                        className="input input-bordered flex-1"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <span className="btn btn-square">
                        <Search className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    <thead>
                      <tr>
                        <th>Theater Name</th>
                        <th>Area</th>
                        <th>Screens</th>
                        <th>Capacity</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTheaters.map((theater) => (
                        <tr key={theater.id}>
                          <td>{theater.name}</td>
                          <td>{theater.area}</td>
                          <td>{theater.screens}</td>
                          <td>{theater.seatCapacity}</td>
                          <td>
                            <div className={`badge ${
                              theater.status === 'Active' ? 'badge-success' :
                              theater.status === 'Maintenance' ? 'badge-warning' :
                              'badge-error'
                            }`}>
                              {theater.status}
                            </div>
                          </td>
                          <td>
                            <div className="flex gap-2">
                              <button 
                                className="btn btn-sm btn-ghost"
                                onClick={() => {
                                  setEditingItem(theater);
                                  setShowTheaterModal(true);
                                }}
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button 
                                className="btn btn-sm btn-ghost text-error"
                                onClick={() => handleDeleteTheater(theater.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case 'areas':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Areas Management</h2>
              <button 
                className="btn bg-amber-400/70"
                onClick={() => setShowAreaModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Area
              </button>
            </div>

            <div className="card bg-white/10 shadow-xl">
              <div className="card-body">
                <div className="flex gap-4 mb-6">
                  <div className="form-control flex-1">
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Search areas..."
                        className="input input-bordered flex-1"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <span className="btn btn-square">
                        <Search className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto ">
                  <table className="table table-zebra">
                    <thead>
                      <tr>
                        <th>Area Name</th>
                        <th>City</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAreas.map((area) => (
                        <tr key={area.id}>
                          <td>{area.name}</td>
                          <td>{area.city}</td>
                          <td>
                            <div className="flex gap-2">
                              <button 
                                className="btn btn-sm btn-ghost"
                                onClick={() => {
                                  setEditingItem(area);
                                  setShowAreaModal(true);
                                }}
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button 
                                className="btn btn-sm btn-ghost text-error"
                                onClick={() => handleDeleteArea(area.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case 'bookings':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Bookings Management</h2>

            <div className="card bg-white/10 shadow-xl">
              <div className="card-body">
                <div className="flex gap-4 mb-6 ">
                  <div className="form-control flex-1 ">
                    <div className="input-group ">
                      <input
                        type="text"
                        placeholder="Search bookings..."
                        className="input input-bordered flex-1 "
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <span className="btn bg-transparent">
                        <Search className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                  <select className="select select-bordered">
                    <option value="">All Status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>User</th>
                        <th>Movie</th>
                        <th>Theater</th>
                        <th>Seats</th>
                        <th>Showtime</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id}>
                          <td>#{booking.id}</td>
                          <td>{booking.user}</td>
                          <td>{booking.movie}</td>
                          <td>{booking.theater}</td>
                          <td>{booking.seats}</td>
                          <td>{booking.showtime}</td>
                          <td>
                            <div className={`badge ${
                              booking.status === 'Confirmed' ? 'badge-success' :
                              booking.status === 'Pending' ? 'badge-warning' :
                              'badge-error'
                            }`}>
                              {booking.status}
                            </div>
                          </td>
                          <td>₹{booking.totalPrice}</td>
                          <td>{booking.date}</td>
                          <td>
                            <button className="btn btn-sm btn-ghost">
                              <Eye className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case 'revenue':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Revenue Analytics</h2>

            <div className="card bg-white/10 shadow-xl">
              <div className="card-body">
                <h3 className="card-title mb-4">Date Range</h3>
                <div className="flex gap-4 mb-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Start Date</span>
                    </label>
                    <input
                      type="date"
                      className="input input-bordered"
                      value={revenueStartDate}
                      onChange={(e) => setRevenueStartDate(e.target.value)}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">End Date</span>
                    </label>
                    <input
                      type="date"
                      className="input input-bordered"
                      value={revenueEndDate}
                      onChange={(e) => setRevenueEndDate(e.target.value)}
                    />
                  </div>
                  <div className="form-control mt-5">
                    <label className="label">
                      <span className="label-text">&nbsp;</span>
                    </label>
                    <button className="btn bg-amber-400/70">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Generate Report
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card bg-white/10 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-base-content/60">Total Revenue</p>
                      <p className="text-3xl font-bold text-success">₹{getTotalRevenue().toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-success rounded-full">
                      <DollarSign className="h-8 w-8 text-success-content" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-white/10 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-base-content/60">Avg. Booking Value</p>
                      <p className="text-3xl font-bold text-info">₹{Math.round(getTotalRevenue() / bookings.filter(b => b.status === 'Confirmed').length).toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-info rounded-full">
                      <TrendingUp className="h-8 w-8 text-info-content" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card bg-white/10 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-base-content/60">Confirmed Bookings</p>
                      <p className="text-3xl font-bold text-primary">{bookings.filter(b => b.status === 'Confirmed').length}</p>
                    </div>
                    <div className="p-3 bg-primary rounded-full">
                      <Calendar className="h-8 w-8 text-primary-content" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Revenue - Revenu Chart */}
            <div className="card bg-white/10 shadow-xl">
              <div className="card-body ">
                <h3 className="card-title">Revenue Chart</h3>
                <div className="h-80 flex items-center justify-center bg-white/10 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="h-16 w-16 mx-auto text-base-content/60 mb-4" />
                    <p className="text-lg text-base-content/60">Revenue Chart Placeholder</p>
                    <p className="text-sm text-base-content/40">Integrate with Chart.js, Recharts, or similar charting library</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden bg-base-300 p-4 flex justify-between items-center">
        <button
          onClick={() => setSidebarOpen(true)}
          className="btn btn-square btn-ghost"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="w-10"></div>
      </div>

      <div className="flex ">
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 lg:ml-0 ">
          <main className="p-6 lg:p-8">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Modals */}
      <MovieModal />
      <TheaterModal />
      <AreaModal />

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;