import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Home, Users, Settings, LogOut, Search, ChevronLeft, ChevronRight, Edit, Info, Trash2 } from 'lucide-react';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const usersPerPage = 5;

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      setError('Bạn cần đăng nhập để truy cập.');
      setLoading(false);
      return;
    }

    fetch('https://exe202-backend-2v40.onrender.com/api/admin/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
      if (Array.isArray(data)) {
        setUsers(data);
        setFilteredUsers(data);
      } else {
        setError('Dữ liệu trả về không phải là mảng.');
      }
    })
    .catch(error => {
      console.error('Lỗi khi tải dữ liệu người dùng:', error);
      setError('Có lỗi xảy ra khi lấy dữ liệu người dùng. Vui lòng thử lại.');
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  // Handle search filter
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, users]);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getRoleColor = (role) => {
    switch(role.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'moderator':
        return 'bg-blue-100 text-blue-800';
      case 'user':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`bg-indigo-700 ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
        <div className="p-6 flex justify-between items-center">
          {isSidebarOpen && <h2 className="text-xl font-bold text-white">GoTic</h2>}
          <button onClick={toggleSidebar} className="text-white">
            <Menu size={24} />
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="px-6 py-3">
              <Link to="/dashboard" className="flex items-center text-white opacity-75 hover:opacity-100">
                <Home size={20} />
                {isSidebarOpen && <span className="ml-4">Dashboard</span>}
              </Link>
            </li>
            <li className="px-6 py-3 bg-indigo-800">
              <Link to="/users" className="flex items-center text-white">
                <Users size={20} />
                {isSidebarOpen && <span className="ml-4">Người dùng</span>}
              </Link>
            </li>
            <li className="px-6 py-3">
              <Link to="/settings" className="flex items-center text-white opacity-75 hover:opacity-100">
                <Settings size={20} />
                {isSidebarOpen && <span className="ml-4">Cài đặt</span>}
              </Link>
            </li>
            <li className="px-6 py-3 mt-auto">
              <button className="flex items-center text-white opacity-75 hover:opacity-100">
                <LogOut size={20} />
                {isSidebarOpen && <span className="ml-4">Đăng xuất</span>}
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-bold text-gray-800">Quản lý Người Dùng</h1>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Tìm kiếm người dùng..." 
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="w-16 h-16 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vai Trò</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentUsers.length > 0 ? (
                      currentUsers.map(user => (
                        <tr key={user._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{user.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-500">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="flex justify-center space-x-2">
                              <Link 
                                to={`/users/${user._id}`} 
                                className="p-1.5 bg-blue-50 rounded-md text-blue-600 hover:bg-blue-100 transition-colors"
                                title="Chi tiết"
                              >
                                <Info size={18} />
                              </Link>
                              <Link 
                                to={`/users/edit/${user._id}`} 
                                className="p-1.5 bg-green-50 rounded-md text-green-600 hover:bg-green-100 transition-colors"
                                title="Chỉnh sửa"
                              >
                                <Edit size={18} />
                              </Link>
                              <button 
                                className="p-1.5 bg-red-50 rounded-md text-red-600 hover:bg-red-100 transition-colors"
                                title="Xóa"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                          {searchTerm ? 'Không tìm thấy người dùng phù hợp.' : 'Không có dữ liệu người dùng.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredUsers.length > 0 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Hiển thị <span className="font-medium">{indexOfFirstUser + 1}</span> đến <span className="font-medium">
                          {Math.min(indexOfLastUser, filteredUsers.length)}
                        </span> trong tổng số <span className="font-medium">{filteredUsers.length}</span> người dùng
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          <ChevronLeft size={18} />
                        </button>
                        
                        {[...Array(totalPages)].map((_, index) => (
                          <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`relative inline-flex items-center px-4 py-2 border ${
                              currentPage === index + 1
                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            } text-sm font-medium`}
                          >
                            {index + 1}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          <ChevronRight size={18} />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UsersManagement;