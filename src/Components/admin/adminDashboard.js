import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Home, Users, Settings, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Xóa token
    localStorage.removeItem('userInfo');  // Xóa thông tin người dùng

    alert('Bạn đã đăng xuất!');
   // Chuyển hướng về trang đăng nhập
   navigate('/');
};


  return (
    <div className="flex h-screen bg-gray-100 m-0 p-0">
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          <h1 className={`font-bold ${isSidebarOpen ? 'block' : 'hidden'}`}>Admin Dashboard</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-700 rounded">
            <Menu size={24} />
          </button>
        </div>
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <Link to="/admin" className="flex items-center space-x-3 w-full p-3 rounded hover:bg-gray-700">
              <Home size={20} />
              {isSidebarOpen && <span>Trang chủ</span>}
            </Link>
            <Link to="/users" className="flex items-center space-x-3 w-full p-3 rounded hover:bg-gray-700">
              <Users size={20} />
              {isSidebarOpen && <span>Quản lý Người dùng</span>}
            </Link>
            <Link to="/settings" className="flex items-center space-x-3 w-full p-3 rounded hover:bg-gray-700">
              <Settings size={20} />
              {isSidebarOpen && <span>Cài đặt</span>}
            </Link>
            <button onClick={handleLogout} className="flex items-center space-x-3 w-full p-3 rounded hover:bg-red-600 mt-8">
              <LogOut size={20} />
              {isSidebarOpen && <span>Đăng xuất</span>}
            </button>
          </div>
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Chào mừng bạn đến với Admin Dashboard!</h2>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">Tổng Người Dùng</h3>
                <p className="text-3xl">1,245</p>
              </div>
              <div className="bg-green-600 text-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">Tổng Vé Đã Bán</h3>
                <p className="text-3xl">3,234</p>
              </div>
              <div className="bg-yellow-600 text-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">Tổng Thu Nhập</h3>
                <p className="text-3xl">$45,678</p>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold">Quản Lý</h3>
              <ul className="space-y-4 mt-4">
                <li>
                  <Link to="/users" className="text-blue-500 hover:text-blue-700">Quản lý Người dùng</Link>
                </li>
                <li>
                  <Link to="/tickets" className="text-blue-500 hover:text-blue-700">Quản lý Vé</Link>
                </li>
                <li>
                  <Link to="/routes" className="text-blue-500 hover:text-blue-700">Quản lý Tuyến Đường</Link>
                </li>
                <li>
                  <Link to="/settings" className="text-blue-500 hover:text-blue-700">Cài đặt</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
