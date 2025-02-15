import React, { useState, useEffect, useCallback } from 'react';
import { Menu, Home, Bus, Settings, Users, LogOut } from 'lucide-react';

const BusCompany = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [busCompanies, setBusCompanies] = useState([]);
  const [status, setStatus] = useState({ error: null, success: null });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false); // State for form visibility

  const token = localStorage.getItem('userToken');

  const apiCall = useCallback(async (url, method = 'GET', body = null) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : null,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Có lỗi xảy ra');
      }

      return data;
    } catch (error) {
      throw new Error(error.message || 'Không thể kết nối với máy chủ');
    }
  }, [token]);

  const fetchBusCompanies = useCallback(async () => {
    if (!token) {
      setStatus({ error: 'Bạn cần đăng nhập để xem danh sách nhà xe.', success: null });
      return;
    }

    try {
      const data = await apiCall('http://localhost:5000/api/admin/bus-companies');
      setBusCompanies(data);
      setStatus({ error: null, success: null });
    } catch (error) {
      setStatus({ error: error.message, success: null });
    }
  }, [apiCall, token]);

  useEffect(() => {
    fetchBusCompanies();
  }, [fetchBusCompanies]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ error: null, success: null });

    if (!token) {
      setStatus({ error: 'Bạn cần đăng nhập để thêm nhà xe.', success: null });
      return;
    }

    try {
      await apiCall('http://localhost:5000/api/admin/bus-companies', 'POST', { name, contact, address });
      setStatus({ error: null, success: 'Nhà xe đã được thêm thành công!' });
      setName('');
      setContact('');
      setAddress('');
      fetchBusCompanies();
      setIsFormVisible(false); // Hide the form after submission
    } catch (error) {
      setStatus({ error: error.message, success: null });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 m-0 p-0">

      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          <h1 className={`font-bold ${isSidebarOpen ? 'block' : 'hidden'}`}>Admin Panel</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-700 rounded">
            <Menu size={24} />
          </button>
        </div>
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <button className="flex items-center space-x-3 w-full p-3 rounded hover:bg-gray-700">
              <Home size={20} />
              {isSidebarOpen && <span>Trang chủ</span>}
            </button>
            <button className="flex items-center space-x-3 w-full p-3 rounded bg-blue-600">
              <Bus size={20} />
              {isSidebarOpen && <span>Quản lý nhà xe</span>}
            </button>
            <button className="flex items-center space-x-3 w-full p-3 rounded hover:bg-gray-700">
              <Users size={20} />
              {isSidebarOpen && <span>Quản lý người dùng</span>}
            </button>
            <button className="flex items-center space-x-3 w-full p-3 rounded hover:bg-gray-700">
              <Settings size={20} />
              {isSidebarOpen && <span>Cài đặt</span>}
            </button>
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
              <h2 className="text-2xl font-bold text-gray-800">Quản Lý Nhà Xe</h2>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => setIsFormVisible(!isFormVisible)} // Toggle the form visibility
              >
                + Thêm nhà xe mới
              </button>
            </div>

            {/* Status Messages */}
            {status.error && (
              <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                {status.error}
              </div>
            )}
            {status.success && (
              <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
                {status.success}
              </div>
            )}

            {/* Bus Companies Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow mb-8">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Liên Hệ</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Địa Chỉ</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {busCompanies.length > 0 ? (
                    busCompanies.map((company) => (
                      <tr key={company._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">{company.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{company.contact}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{company.address}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-blue-600 hover:text-blue-900 mr-4">Sửa</button>
                          <button className="text-red-600 hover:text-red-900">Xóa</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">Không có nhà xe nào</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Add Bus Company Form */}
            {isFormVisible && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
                  <h3 className="text-xl font-bold mb-4">Thêm Nhà Xe Mới</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tên Nhà Xe</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Số Điện Thoại</label>
                      <input
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Địa Chỉ</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Thêm Nhà Xe
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusCompany;
