// components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              BusTicket
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
          <Link to="/routes-list" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Đặt vé 
            </Link>
            <Link to="/route" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Tuyến Đường
            </Link>
            <Link to="/promotions" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Khuyến Mãi
            </Link>
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Đăng Nhập
            </Link>
            <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium border border-blue-600 hover:bg-blue-50">
              Đăng Ký
            </Link>
            
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/routes" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Tuyến Đường
            </Link>
            <Link to="/promotions" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Khuyến Mãi
            </Link>
            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Đăng Nhập
            </Link>
            <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Đăng Ký
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
