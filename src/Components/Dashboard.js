import React, { useState } from "react";
import axios from "axios";
import {
  MapPin,
  Calendar,
  Bell,
  Home,
  Clock,
  Users,
  Bus,
  CreditCard,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
const UserDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/route/search",
        {
          params: { departure, destination, departureDate },
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching trips:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Bus className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                BusGo
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Trang chủ</span>
              </Link>
              <Link
                to="/"
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Lịch trình</span>
              </Link>
              <Link
                to="/"
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                <span>Vé của tôi</span>
              </Link>
              <Link
                to="/exchange"
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span>Trao đổi vé</span>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 text-gray-600 hover:bg-gray-50"
              >
                Trang chủ
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-600 hover:bg-gray-50"
              >
                Lịch trình
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-600 hover:bg-gray-50"
              >
                Vé của tôi
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-600 hover:bg-gray-50"
              >
                Thông báo
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-8">
        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Tìm chuyến xe của bạn
          </h1>

          {/* Search Form */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Điểm đi"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Điểm đến"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="mt-6 w-full md:w-auto px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md transition-colors duration-200"
          >
            Tìm chuyến xe
          </button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-bold text-gray-800">
              Kết quả tìm kiếm
            </h2>
            {searchResults.map((route) => (
              <div
                key={route._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => setSelectedRoute(route)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Bus className="h-8 w-8 text-orange-500" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {route.startPoint} - {route.endPoint}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Nhà xe {route.busOperator || "Phương Trang"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-orange-500">
                        {route.price?.toLocaleString() || "0"} VND
                      </p>
                      <p className="text-sm text-gray-500">
                        {route.availableSeats || 0} ghế trống
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{route.duration || "4 giờ"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{route.busType || "Giường nằm"}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Selected Route Details */}
        {selectedRoute && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Chi tiết chuyến xe
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-4">
                  Thông tin chuyến đi
                </h3>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                    <span>
                      <strong>Điểm đi:</strong> {selectedRoute.startPoint}
                    </span>
                  </p>
                  <p className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                    <span>
                      <strong>Điểm đến:</strong> {selectedRoute.endPoint}
                    </span>
                  </p>
                  <p className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2 text-orange-500" />
                    <span>
                      <strong>Thời gian:</strong>{" "}
                      {selectedRoute.duration || "4 giờ"}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-4">
                  Chi tiết giá vé
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Giá vé</span>
                    <span className="font-semibold">
                      {selectedRoute.price?.toLocaleString() || "0"} VND
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Phí dịch vụ</span>
                    <span className="font-semibold">20,000 VND</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Tổng cộng</span>
                      <span className="font-bold text-orange-500">
                        {((selectedRoute.price || 0) + 20000).toLocaleString()}{" "}
                        VND
                      </span>
                    </div>
                  </div>
                </div>
                <Link to="/booking">
                  <button className="mt-4 w-full py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600">
                    Đặt vé ngay
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
