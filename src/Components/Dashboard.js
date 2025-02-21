import React, { useState } from "react";
import axios from "axios";
import {
  Calendar, Bell, Home, Bus, CreditCard, Menu, X, Search,
  MapPin, Clock, Users, Banknote, ArrowRight, ChevronDown, ChevronUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [expandedRoute, setExpandedRoute] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleBookTicket = (route) => {
    navigate(`/booking/${route._id}`, { state: { route } });
  };

  const handleSearch = async () => {
    try {
      setError("");
      const response = await axios.get("https://exe202-backend-2v40.onrender.com/api/route/search", {
        params: { departure, destination, departureDate },
      });

      if (response.data.routes.length === 0) {
        setError("Không tìm thấy tuyến đường phù hợp.");
      } else {
        setSearchResults(response.data.routes);
        setExpandedRoute(null);
      }
    } catch (error) {
      console.error("Lỗi tìm kiếm tuyến:", error);
      setError("Đã xảy ra lỗi khi tìm kiếm, vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header with gradient background */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-800 shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-full">
                <Bus className="h-6 w-6 text-blue-600" />
              </div>
              <span className="ml-2 text-xl font-bold text-white">GoTic</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="flex items-center space-x-2 px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-700 rounded-md transition-all duration-200">
                <Home className="w-4 h-4" />
                <span>Trang chủ</span>
              </Link>
              <Link to="/" className="flex items-center space-x-2 px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-700 rounded-md transition-all duration-200">
                <Calendar className="w-4 h-4" />
                <span>Lịch trình</span>
              </Link>
              <Link to="/" className="flex items-center space-x-2 px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-700 rounded-md transition-all duration-200">
                <CreditCard className="w-4 h-4" />
                <span>Vé của tôi</span>
              </Link>
              <Link to="/exchange" className="flex items-center space-x-2 px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-700 rounded-md transition-all duration-200">
                <Bell className="w-4 h-4" />
                <span>Trao đổi vé</span>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-white hover:bg-blue-700 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-16 inset-x-0 z-50 bg-white shadow-lg rounded-b-lg animate-fade-in-down">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors">
              <Home className="w-5 h-5" />
              <span className="font-medium">Trang chủ</span>
            </Link>
            <Link to="/" className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Lịch trình</span>
            </Link>
            <Link to="/myticket" className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors">
              <CreditCard className="w-5 h-5" />
              <span className="font-medium">Vé của tôi</span>
            </Link>
            <Link to="/exchange" className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors">
              <Bell className="w-5 h-5" />
              <span className="font-medium">Trao đổi vé</span>
            </Link>
          </div>
        </div>
      )}

      {/* Hero Banner with Modern Background */}
      <div className="relative">
        {/* Background Image without blur */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://res.klook.com/image/upload/u_activities:wmgruyosrneelbdbgsmh,w_1.0,ar_3:2,c_scale/c_fill,w_750,h_563/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/wmgruyosrneelbdbgsmh.jpg')",
            filter: "brightness(0.7)" // Giảm độ sáng thay vì làm mờ
          }}
        ></div>

        {/* Lighter Overlay with reduced opacity */}
        <div className="absolute inset-0 z-0 opacity-30 bg-blue-800"
          style={{
            backgroundImage: "radial-gradient(circle at 25% 60%, rgba(208, 221, 236, 0.6) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(37, 99, 235, 0.4) 0%, transparent 50%)"
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 pt-28 pb-16 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl md:text-5xl drop-shadow-lg">
              Tìm chuyến xe phù hợp
            </h1>
            <p className="mt-3 max-w-md mx-auto text-white sm:text-lg md:mt-5 md:max-w-2xl drop-shadow-md">
              Đặt vé xe nhanh chóng, thuận tiện và an toàn với GoTic
            </p>
            <div className="mt-8">
              <button className="px-6 py-3 bg-white text-blue-700 font-medium rounded-lg shadow-md hover:bg-blue-50 transition duration-300">
                Đặt vé ngay
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-10 -mt-20 relative z-10 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Search className="w-5 h-5 mr-2 text-blue-600" />
            Tìm chuyến xe
          </h2>

          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
            <div className="md:col-span-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Điểm đi"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                className="pl-10 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-lg p-3 bg-gray-50 transition-all"
              />
            </div>
            <div className="md:col-span-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Điểm đến"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-10 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-lg p-3 bg-gray-50 transition-all"
              />
            </div>
            <div className="md:col-span-3 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="pl-10 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-lg p-3 bg-gray-50 transition-all"
              />
            </div>
            <div className="md:col-span-1">
              <button
                onClick={handleSearch}
                className="w-full h-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium flex items-center justify-center"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Bus className="w-6 h-6 mr-2 text-blue-600" />
              Kết quả tìm kiếm ({searchResults.length})
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {searchResults.map((route) => (
                <div
                  key={route._id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
                >
                  {/* Card Header */}
                  <div className="relative">
                    {route.image ? (
                      <img
                        src={route.image}
                        alt="Hình ảnh tuyến đường"
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                        <Bus className="h-20 w-20 text-white opacity-30" />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-xl font-bold text-white flex items-center">
                        {route.startPoint} <ArrowRight className="mx-2 w-4 h-4" /> {route.endPoint}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center text-gray-700">
                        <Users className="w-4 h-4 mr-1 text-blue-500" />
                        <span className="text-sm">{route.availableSeats} ghế trống</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Banknote className="w-4 h-4 mr-1 text-green-500" />
                        <span className="text-sm font-medium">{route.price.toLocaleString()} VND</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Clock className="w-4 h-4 mr-1 text-orange-500" />
                        <span className="text-sm">
                          {new Date(route.departureTimes[0]).toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center mb-4 bg-blue-50 p-3 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Bus className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Công ty vận chuyển</p>
                        <p className="font-medium text-gray-900">{route.company.name}</p>
                      </div>
                    </div>

                    {/* Toggle Details Button */}
                    <button
                      onClick={() => setExpandedRoute(expandedRoute === route._id ? null : route._id)}
                      className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 font-medium transition-colors"
                    >
                      <span>Chi tiết chuyến xe</span>
                      {expandedRoute === route._id ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>

                    {/* Expanded Details */}
                    {expandedRoute === route._id && (
                      <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500">Địa chỉ công ty:</p>
                          <p className="font-medium flex items-start">
                            <MapPin className="w-4 h-4 text-gray-400 mr-1 mt-1 flex-shrink-0" />
                            <span>{route.company.address}</span>
                          </p>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm text-gray-500">Liên hệ:</p>
                          <p className="font-medium flex items-center">
                            <span className="bg-blue-100 text-blue-600 p-1 rounded mr-2">📞</span>
                            {route.company.contact.phone}
                          </p>
                          <p className="font-medium flex items-center">
                            <span className="bg-blue-100 text-blue-600 p-1 rounded mr-2">✉️</span>
                            {route.company.contact.email}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm text-gray-500">Thời gian khởi hành:</p>
                          <p className="font-medium flex items-center">
                            <Clock className="w-4 h-4 text-gray-400 mr-2" />
                            {new Date(route.departureTimes[0]).toLocaleString("vi-VN")}
                          </p>
                        </div>

                        <button
                          onClick={() => handleBookTicket(route)}
                          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                        >
                          <CreditCard className="w-5 h-5 mr-2" />
                          Đặt vé ngay
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nếu chưa có kết quả tìm kiếm, hiển thị mục gợi ý */}
        {searchResults.length === 0 && !error && (
          <div className="mt-12 text-center p-8 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Bus className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Bắt đầu tìm kiếm chuyến xe</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Điền thông tin điểm đi, điểm đến và ngày khởi hành để tìm các chuyến xe phù hợp với lịch trình của bạn.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Bus className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">GoTic</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-blue-300 transition-colors">Về chúng tôi</a>
              <a href="#" className="hover:text-blue-300 transition-colors">Điều khoản</a>
              <a href="#" className="hover:text-blue-300 transition-colors">Trợ giúp</a>
              <a href="#" className="hover:text-blue-300 transition-colors">Liên hệ</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} GoTic. Bản quyền thuộc về công ty TNHH Dịch vụ vận tải GoTic.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;