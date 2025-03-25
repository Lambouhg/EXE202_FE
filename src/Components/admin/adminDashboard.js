import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Home, Users, Settings, LogOut, CreditCard, Map, ChevronRight, Activity, DollarSign, User, Bus, Bell, Search, BarChart3 } from 'lucide-react';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [greeting, setGreeting] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Chào buổi sáng');
    else if (hour < 18) setGreeting('Chào buổi chiều');
    else setGreeting('Chào buổi tối');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    alert('Bạn đã đăng xuất!');
    navigate('/');
  };

  // Dữ liệu biểu đồ hoạt động gần đây
  const recentActivities = [
    { user: 'Nguyễn Thanh Ngân', action: 'Đặt vé', time: '10:00 AM', route: 'Đà Lạt - Quy Nhơn' },
    { user: 'Lý Thanh Tuấn', action: 'Đặt vé', time: '14:00 PM', route: 'Đà Lạt - Quy Nhơn' },
    { user: 'Nguyễn Lương Như Hảo', action: 'Đặt vé', time: '14:00 PM', route: 'Đà Lạt - Quy Nhơn' },
    { user: 'Huỳnh Thị Lợi', action: 'Đặt vé', time: '14:00 PM', route: 'Đà Lạt - Quy Nhơn' },
    { user: 'Diễm Thi', action: 'Đặt vé', time: '14:00 PM', route: 'Đà Lạt - Quy Nhơn' },
    { user: 'Nguyễn Trần Minh Nhật', action: 'Đặt vé', time: '14:00 PM', route: 'Đà Lạt - Quy Nhơn' },
    { user: 'Nguyễn Thiên Thanh', action: 'Đặt vé', time: '14:00 PM', route: 'Đà Lạt - Quy Nhơn' },
    { user: 'Trần Thị Thùy Linh', action: 'Đặt Vé', time: '14:00 PM', route: 'Đà Lạt - Quy Nhơn' },
    { user: 'Thu Ngan', action: 'đặt vé', time: '20:00 PM', route: 'Sài Gòn - Quy Nhơn' },
    { user: 'Nguyễn Lương Như Hảo', action: 'đặt vé', time: '19:30 PM', route: 'Quy Nhơn - Đà Lạt' },
  ];

  // Thống kê tổng quan
  const stats = [
    { title: 'Tổng số người dùng', value: '75', icon: <User size={20} className="text-blue-500" />, color: 'bg-blue-100 text-blue-800' },
    { title: 'Vé đã bán trong tháng', value: '20', icon: <CreditCard size={20} className="text-green-500" />, color: 'bg-green-100 text-green-800' },
    { title: 'Tổng doanh thu', value: '7.460.000 VNĐ', icon: <DollarSign size={20} className="text-purple-500" />, color: 'bg-purple-100 text-purple-800' },
    { title: 'Tuyến đường hoạt động', value: '4', icon: <Map size={20} className="text-orange-500" />, color: 'bg-orange-100 text-orange-800' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 m-0 p-0 overflow-hidden">
      {/* Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-indigo-900 text-white transition-all duration-300 ease-in-out flex flex-col h-full shadow-lg`}
      >
        <div className="p-5 flex items-center justify-between border-b border-indigo-800">
          <h1 className={`font-bold text-xl ${isSidebarOpen ? 'block' : 'hidden'}`}>BusBooking</h1>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 hover:bg-indigo-800 rounded-full transition-colors"
          >
            <Menu size={22} />
          </button>
        </div>

        <nav className="mt-6 flex-1">
          <div className="px-4 space-y-2">
            <Link to="/admin" className="flex items-center space-x-3 w-full p-3 rounded-lg bg-indigo-800 text-white transition-colors">
              <Home size={20} />
              {isSidebarOpen && <span>Trang chủ</span>}
            </Link>
            <Link to="/users" className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-indigo-800 transition-colors">
              <Users size={20} />
              {isSidebarOpen && <span>Quản lý người dùng</span>}
            </Link>
            <Link to="/tickets" className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-indigo-800 transition-colors">
              <CreditCard size={20} />
              {isSidebarOpen && <span>Quản lý vé</span>}
            </Link>
            <Link to="/routes" className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-indigo-800 transition-colors">
              <Map size={20} />
              {isSidebarOpen && <span>Quản lý tuyến đường</span>}
            </Link>
            <Link to="/bus-companies" className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-indigo-800 transition-colors">
              <Bus size={20} />
              {isSidebarOpen && <span>Quản lý nhà xe</span>}
            </Link>
            <Link to="/analytics" className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-indigo-800 transition-colors">
              <BarChart3 size={20} />
              {isSidebarOpen && <span>Thống kê & Báo cáo</span>}
            </Link>
            <Link to="/settings" className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-indigo-800 transition-colors">
              <Settings size={20} />
              {isSidebarOpen && <span>Cài đặt</span>}
            </Link>
          </div>
        </nav>
        
        <div className="mt-auto px-4 pb-6">
          <button 
            onClick={handleLogout} 
            className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-red-700 text-white transition-colors"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Đăng xuất</span>}
          </button>
        </div>
      </div>

      {/* Phần nội dung chính */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Tổng quan hệ thống</h2>
            <p className="text-gray-500 text-sm mt-1">{greeting}, Admin!</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <button className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors">
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-200 text-indigo-700 rounded-full flex items-center justify-center font-semibold">
                A
              </div>
              {isSidebarOpen && <span className="text-gray-700 font-medium">Admin</span>}
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Thống kê tổng quan */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color.split(' ')[0]}`}>
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm">{stat.title}</h3>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hoạt động gần đây */}
            <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Hoạt động gần đây</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người dùng</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tuyến đường</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivities.map((activity, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-800">{activity.user}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            activity.action === 'Đặt vé' 
                              ? 'bg-green-100 text-green-800' 
                              : activity.action === 'Hủy vé' 
                                ? 'bg-red-100 text-red-800'
                                : activity.action === 'Thanh toán vé'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800'
                          }`}>
                            {activity.action}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{activity.time}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{activity.route || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-right">
                <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                  Xem tất cả hoạt động
                </button>
              </div>
            </div>

            {/* Truy cập nhanh */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Truy cập nhanh</h3>
              <div className="space-y-3">
                <Link 
                  to="/users" 
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Users size={18} className="text-indigo-600" />
                    </div>
                    <span className="font-medium">Quản lý người dùng</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>
                <Link 
                  to="/routes" 
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Map size={18} className="text-indigo-600" />
                    </div>
                    <span className="font-medium">Quản lý tuyến đường</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>
                <Link 
                  to="/bus-companies" 
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Bus size={18} className="text-indigo-600" />
                    </div>
                    <span className="font-medium">Quản lý nhà xe</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>
                <Link 
                  to="/settings" 
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Settings size={18} className="text-indigo-600" />
                    </div>
                    <span className="font-medium">Cài đặt hệ thống</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;