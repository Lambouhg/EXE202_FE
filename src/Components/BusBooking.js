import React, { useState } from 'react';
import { Menu, Search, MapPin, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom'; // Sử dụng Link từ react-router-dom

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Thay logo bằng Link để chuyển hướng */}
            <Link to="/dashboard" className="flex items-center">
             
              <span className="text-2xl font-bold text-white ml-2">GoTic </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-white hover:text-yellow-300 transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Tuyến đường
            </a>
            <a href="#" className="text-white hover:text-yellow-300 transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Lịch trình
            </a>
            <a href="#" className="text-white hover:text-yellow-300 transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2">
              <Search className="w-4 h-4" />
              Tra cứu vé
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

const BusBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [filters, setFilters] = useState({
    time: '',
    company: '',
    price: '',
    pickupPoint: '',
    dropoffPoint: ''
  });
  const [selectedBus, setSelectedBus] = useState(null);

  const busesData = [
    { id: 1, company: 'Nhà xe A', time: 'Sáng', price: 200000, pickupPoint: 'Hà Nội', dropoffPoint: 'Đà Nẵng', rating: 4.5, departureTime: '07:00', arrivalTime: '19:00', available: 32 },
    { id: 2, company: 'Nhà xe B', time: 'Chiều', price: 250000, pickupPoint: 'Hà Nội', dropoffPoint: 'Hồ Chí Minh', rating: 4.8, departureTime: '13:00', arrivalTime: '04:00', available: 28 },
    { id: 3, company: 'Nhà xe C', time: 'Tối', price: 300000, pickupPoint: 'Đà Nẵng', dropoffPoint: 'Hồ Chí Minh', rating: 4.2, departureTime: '19:00', arrivalTime: '08:00', available: 45 },
  ];

  const filteredBuses = busesData.filter(bus => {
    return (
      (!filters.time || bus.time === filters.time) &&
      (!filters.company || bus.company === filters.company) &&
      (!filters.price || bus.price === parseInt(filters.price)) &&
      (!filters.pickupPoint || bus.pickupPoint === filters.pickupPoint) &&
      (!filters.dropoffPoint || bus.dropoffPoint === filters.dropoffPoint)
    );
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleBusSelection = (bus) => {
    setSelectedBus(bus);
    setSelectedSeats([]); // Reset seat selection on new bus selection
  };

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleBooking = () => {
    if (selectedBus && selectedSeats.length > 0) {
      alert(`Đặt vé thành công!\nChuyến xe: ${selectedBus.company}\nTuyến: ${selectedBus.pickupPoint} - ${selectedBus.dropoffPoint}\nGhế: ${selectedSeats.join(', ')}`);
      // Reset selection after booking
      setSelectedBus(null);
      setSelectedSeats([]);
    } else {
      alert('Vui lòng chọn chuyến xe và ghế.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Đặt vé xe khách</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Filters Panel */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Bộ lọc tìm kiếm
                </h2>

                {/* Filter Controls */}
                <div className="space-y-4">
                  {[{ label: 'Thời gian', key: 'time', options: ['Sáng', 'Chiều', 'Tối'] },
                    { label: 'Nhà xe', key: 'company', options: ['Nhà xe A', 'Nhà xe B', 'Nhà xe C'] },
                    { label: 'Điểm đón', key: 'pickupPoint', options: ['Hà Nội', 'Đà Nẵng', 'Hồ Chí Minh'] },
                    { label: 'Điểm trả', key: 'dropoffPoint', options: ['Hà Nội', 'Đà Nẵng', 'Hồ Chí Minh'] }]
                    .map(filter => (
                      <div key={filter.key} className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">{filter.label}</label>
                        <select
                          value={filters[filter.key]}
                          onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value="">Tất cả</option>
                          {filter.options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-6">
              {/* Bus List */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Danh sách chuyến xe</h2>
                <div className="space-y-4">
                  {filteredBuses.map(bus => (
                    <div key={bus.id} 
                      className={`rounded-xl border ${selectedBus?.id === bus.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} p-6 hover:border-blue-500 transition-colors`}
                    >
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-gray-800">{bus.company}</h3>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                              {bus.rating} ⭐
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {bus.departureTime} - {bus.arrivalTime}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {bus.available} ghế còn trống
                            </div>
                          </div>
                          <div className="text-lg font-semibold text-gray-800">{bus.price} VND</div>
                        </div>
                        <div className="flex flex-col items-end">
                          <button 
                            onClick={() => handleBusSelection(bus)}
                            className={`mt-4 py-2 px-6 rounded-lg ${selectedBus?.id === bus.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 transition-colors`}
                          >
                            {selectedBus?.id === bus.id ? 'Đã chọn' : 'Chọn chuyến xe'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seat Selection */}
              {selectedBus && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Chọn ghế</h2>
                  <div className="grid grid-cols-4 gap-4">
                    {Array.from({ length: selectedBus.available }).map((_, index) => {
                      const seatId = index + 1;
                      return (
                        <button
                          key={seatId}
                          onClick={() => toggleSeat(seatId)}
                          className={`w-12 h-12 rounded-lg border ${selectedSeats.includes(seatId) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 transition-colors`}
                        >
                          {seatId}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Booking Confirmation */}
              <div className="text-center">
                <button 
                  onClick={handleBooking}
                  className="mt-8 py-2 px-6 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                >
                  Đặt vé
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BusBooking;
