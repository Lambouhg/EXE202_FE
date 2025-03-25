import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bus,
  Home,
  Calendar,
  CreditCard,
  Bell,
  Menu,
  X,
} from "lucide-react";

const Headeruser = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    console.log("Đã đăng xuất");
    window.location.href = "/";
  };

  return (
    <>
      {/* Header with gradient background */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-800 shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo và tên */}
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-full">
                <Bus className="h-6 w-6 text-blue-600" />
              </div>
              <span className="ml-2 text-xl font-bold text-white">GoTic</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-700 rounded-md transition-all duration-200"
              >
                <Home className="w-4 h-4" />
                <span>Trang chủ</span>
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-700 rounded-md transition-all duration-200"
              >
                <Calendar className="w-4 h-4" />
                <span>Lịch trình</span>
              </Link>
              <Link
                to="/myticket"
                className="flex items-center space-x-2 px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-700 rounded-md transition-all duration-200"
              >
                <CreditCard className="w-4 h-4" />
                <span>Vé của tôi</span>
              </Link>
              <Link
                to="/requests"
                className="flex items-center space-x-2 px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-700 rounded-md transition-all duration-200"
              >
                <Bell className="w-4 h-4" />
                <span>Trao đổi vé</span>
              </Link>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-700 rounded-md transition-all duration-200"
                >
                  <span>Tài khoản</span>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Hồ sơ
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Cài đặt
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
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
            <Link
              to="/"
              className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Trang chủ</span>
            </Link>
            <Link
              to="/"
              className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Lịch trình</span>
            </Link>
            <Link
              to="/myticket"
              className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
            >
              <CreditCard className="w-5 h-5" />
              <span className="font-medium">Vé của tôi</span>
            </Link>
            <Link
              to="/exchange"
              className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="font-medium">Trao đổi vé</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Headeruser;