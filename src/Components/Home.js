import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Clock, Calendar, ChevronRight } from 'lucide-react';
import '../index.css';
import Header from '../Components/Header';
function Home() {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const popularRoutes = [
    { 
      id: 1, 
      from: 'Hà Nội', 
      to: 'Hồ Chí Minh', 
      price: '500.000', 
      duration: '30h',
      image: '/images/1.jpg',  
      departureTime: '7:00',
      type: 'Giường nằm'
    },
    { 
      id: 2, 
      from: 'Hà Nội', 
      to: 'Đà Nẵng', 
      price: '400.000', 
      duration: '20h',
      image: '/images/2.jpg', 
      departureTime: '8:30',
      type: 'Giường nằm'
    },
    { 
      id: 3, 
      from: 'Hồ Chí Minh', 
      to: 'Đà Nẵng', 
      price: '450.000', 
      duration: '25h',
      image: '/images/2.jpg',  
      departureTime: '6:00',
      type: 'Giường nằm'
    },
  ];

  const handleSearch = () => {
    console.log(`Tìm kiếm tuyến đường từ ${departure} đến ${destination} vào ngày ${date}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
     <Header></Header>

      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="absolute inset-0">
          <img
            className="w-full h-[600px] object-cover"
            src="/api/placeholder/1920/600"
            alt="Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-75"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
            Hành trình của bạn
            <br />
            <span className="text-yellow-400">Niềm vui của chúng tôi</span>
          </h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl">
            Đặt vé xe trực tuyến dễ dàng với hơn 500+ tuyến đường trên toàn quốc. 
            Thanh toán an toàn, đặt vé nhanh chóng.
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 -mt-20">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline-block mr-1" />
                  Điểm đi
                </label>
                <select
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                >
                  <option value="">Chọn điểm đi</option>
                  <option>Hà Nội</option>
                  <option>Hồ Chí Minh</option>
                  <option>Đà Nẵng</option>
                </select>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline-block mr-1" />
                  Điểm đến
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                >
                  <option value="">Chọn điểm đến</option>
                  <option>Hồ Chí Minh</option>
                  <option>Hà Nội</option>
                  <option>Đà Nẵng</option>
                </select>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline-block mr-1" />
                  Ngày đi
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="block w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  className="w-full bg-blue-600 py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  <Search className="w-5 h-5 inline-block mr-2" />
                  Tìm Chuyến Xe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Tại sao chọn chúng tôi?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Chúng tôi cam kết mang đến trải nghiệm đặt vé tốt nhất cho bạn
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Đặt vé nhanh chóng</h3>
              <p className="mt-2 text-gray-500">Chỉ mất 5 phút để hoàn thành đặt vé</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Nhiều lựa chọn</h3>
              <p className="mt-2 text-gray-500">500+ tuyến đường trên toàn quốc</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Đặt vé linh hoạt</h3>
              <p className="mt-2 text-gray-500">Dễ dàng đổi/hủy vé trước 24h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Routes */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Tuyến đường phổ biến
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Lựa chọn hàng đầu của hành khách
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {popularRoutes.map((route) => (
              <div key={route.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <img
                  className="h-48 w-full object-cover"
                  src={route.image}
                  alt={`${route.from} to ${route.to}`}
                />
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {route.from} → {route.to}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">{route.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">{route.price}đ</p>
                      <p className="text-sm text-gray-500">Khởi hành: {route.departureTime}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{route.duration}</span>
                    </div>
                    <Link
                      to={`/routes/${route.id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700"
                    >
                      Xem chi tiết
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Dịch vụ của chúng tôi
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Chúng tôi cam kết mang đến trải nghiệm tốt nhất cho hành khách
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 text-blue-600">
                    🚌
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Xe chất lượng cao</h3>
                  <p className="mt-2 text-gray-500">
                    Đội xe hiện đại, được bảo dưỡng định kỳ, đảm bảo an toàn cho hành khách
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 text-blue-600">
                    👨‍✈️
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Tài xế chuyên nghiệp</h3>
                  <p className="mt-2 text-gray-500">
                    Đội ngũ tài xế giàu kinh nghiệm, được đào tạo chuyên nghiệp
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 text-blue-600">
                    🎫
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Đặt vé dễ dàng</h3>
                  <p className="mt-2 text-gray-500">
                    Đặt vé nhanh chóng, thanh toán an toàn, nhận vé điện tử tiện lợi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Sẵn sàng để bắt đầu?</span>
            <span className="block text-blue-200">Đặt vé ngay hôm nay.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Đăng ký ngay
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Về chúng tôi</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-300 hover:text-white">Giới thiệu</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white">Liên hệ</Link></li>
                <li><Link to="/careers" className="text-gray-300 hover:text-white">Tuyển dụng</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-lg font-bold mb-4">Dịch vụ</h3>
              <ul className="space-y-2">
                <li><Link to="/routes" className="text-gray-300 hover:text-white">Tuyến đường</Link></li>
                <li><Link to="/promotions" className="text-gray-300 hover:text-white">Khuyến mãi</Link></li>
                <li><Link to="/package" className="text-gray-300 hover:text-white">Vận chuyển hàng</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-lg font-bold mb-4">Hỗ trợ</h3>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-gray-300 hover:text-white">FAQ</Link></li>
                <li><Link to="/terms" className="text-gray-300 hover:text-white">Điều khoản</Link></li>
                <li><Link to="/policy" className="text-gray-300 hover:text-white">Chính sách</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-lg font-bold mb-4">Kết nối</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  📱
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  📸
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  🐦
                </a>
              </div>
              <div className="mt-4">
                <p className="text-gray-300">Hotline: 1900 xxxx</p>
                <p className="text-gray-300">Email: support@GoTic.vn</p>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-300">&copy; 2025 Go Tic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;