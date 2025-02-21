import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Home, Users, Settings, LogOut } from 'lucide-react';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);  // Trạng thái khi đang tải dữ liệu
  const [error, setError] = useState(null);      // Lưu lỗi nếu có
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    // Kiểm tra token
    if (!token) {
      console.error('Token không tồn tại. Người dùng cần đăng nhập.');
      setError('Bạn cần đăng nhập để truy cập.');
      setLoading(false);
      return;
    }

    fetch('https://exe202-backend-2v40.onrender.com/api/admin/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Gửi token trong header
      }
    })
    .then(response => {
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          setError('Bạn không có quyền truy cập. Vui lòng kiểm tra quyền của bạn.');
        } else {
          setError('Không thể lấy dữ liệu từ API. Vui lòng thử lại.');
        }
        throw new Error('Không thể lấy dữ liệu từ API');
      }
      return response.json();
    })
    .then(data => {
      console.log('API Response:', data);  // Kiểm tra cấu trúc dữ liệu
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setError('Dữ liệu trả về không phải là mảng.');
      }
    })
    .catch(error => {
      console.error('Lỗi khi tải dữ liệu người dùng:', error);
      setError('Có lỗi xảy ra khi lấy dữ liệu người dùng. Vui lòng thử lại.');
    })
    .finally(() => {
      setLoading(false);  // Hoàn tất quá trình tải
    });
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 m-0 p-0">

      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          <h1 className={`font-bold ${isSidebarOpen ? 'block' : 'hidden'}`}>Admin Dashboard</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-700 rounded">
            <Menu size={24} />
          </button>
        </div>
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <Link to="/" className="flex items-center space-x-3 w-full p-3 rounded hover:bg-gray-700">
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
            <button className="flex items-center space-x-3 w-full p-3 rounded hover:bg-red-600 mt-8">
              <LogOut size={20} />
              {isSidebarOpen && <span>Đăng xuất</span>}
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Danh sách Người Dùng</h2>
            </div>

            {/* Thông báo lỗi hoặc đang tải */}
            {loading && <div className="text-center">Đang tải dữ liệu...</div>}
            {error && <div className="text-red-500 text-center">{error}</div>}

            {/* Bảng Người Dùng */}
            {!loading && !error && (
              <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b text-left">Tên</th>
                    <th className="px-4 py-2 border-b text-left">Email</th>
                    <th className="px-4 py-2 border-b text-left">Vai Trò</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(users) && users.length > 0 ? (
                    users.map(user => (
                      <tr key={user._id}>
                        <td className="px-4 py-2 border-b">{user.name}</td>
                        <td className="px-4 py-2 border-b">{user.email}</td>
                        <td className="px-4 py-2 border-b">{user.role}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-4 py-2 border-b text-center">Không có dữ liệu người dùng.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
