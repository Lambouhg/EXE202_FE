import React, { useState, useEffect } from 'react';
import { Menu, Home, Users, Ticket, Settings, LogOut, Search, ChevronLeft, ChevronRight, Filter, FileText, RefreshCw, Calendar, Clock, MapPin, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const TicketsManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const ticketsPerPage = 6;

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    console.log('Token retrieved:', token);  // Kiểm tra token

    if (!token) {
      console.error('Token không tồn tại. Người dùng cần đăng nhập.');
      setError('Bạn cần đăng nhập để truy cập.');
      setLoading(false);
      return;
    }

    fetch('https://exe202-backend-2v40.onrender.com/api/admin/tickets', {
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
      console.log('API Response:', data);  // Kiểm tra dữ liệu trả về
      if (Array.isArray(data)) {
        setTickets(data);
        setFilteredTickets(data);
      } else {
        setError('Dữ liệu trả về không hợp lệ.');
      }
    })
    .catch(error => {
      console.error('Lỗi khi tải dữ liệu vé:', error);
      setError('Có lỗi xảy ra khi lấy dữ liệu vé. Vui lòng thử lại.');
    })
    .finally(() => {
      setLoading(false);  // Hoàn tất quá trình tải
    });
  }, []);

  // Filter tickets based on search term and status
  useEffect(() => {
    let results = tickets;
    
    // Filter by status
    if (statusFilter !== 'all') {
      results = results.filter(ticket => ticket.status.toLowerCase() === statusFilter.toLowerCase());
    }
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      results = results.filter(ticket => 
        (ticket._id && ticket._id.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ticket.user?.name && ticket.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ticket.route?.startPoint && ticket.route.startPoint.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ticket.route?.endPoint && ticket.route.endPoint.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredTickets(results);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, tickets]);

  const refreshData = () => {
    setLoading(true);
    const token = localStorage.getItem('userToken');
    
    fetch('https://exe202-backend-2v40.onrender.com/api/admin/tickets', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      if (!response.ok) throw new Error('Không thể làm mới dữ liệu');
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        setTickets(data);
        setFilteredTickets(data);
      }
    })
    .catch(error => {
      console.error('Lỗi khi làm mới dữ liệu:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Pagination logic
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'đã thanh toán':
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'đã hủy':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'đang xử lý':
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'chờ thanh toán':
      case 'pending':
        return 'bg-blue-100 text-blue-800';
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
            <li className="px-6 py-3">
              <Link to="/users" className="flex items-center text-white opacity-75 hover:opacity-100">
                <Users size={20} />
                {isSidebarOpen && <span className="ml-4">Người dùng</span>}
              </Link>
            </li>
            <li className="px-6 py-3 bg-indigo-800">
              <Link to="/tickets" className="flex items-center text-white">
                <Ticket size={20} />
                {isSidebarOpen && <span className="ml-4">Quản lý vé</span>}
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
            <h1 className="text-2xl font-bold text-gray-800">Quản lý Vé</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Tìm kiếm vé..." 
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              <button 
                onClick={refreshData}
                className="p-2 bg-indigo-50 rounded-lg text-indigo-600 hover:bg-indigo-100 transition-colors"
                title="Làm mới dữ liệu"
              >
                <RefreshCw size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">
          {/* Status filter */}
          <div className="mb-4 flex items-center space-x-2">
            <Filter size={18} className="text-gray-500" />
            <span className="text-gray-600">Lọc theo trạng thái:</span>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tất cả</option>
              <option value="đã thanh toán">Đã thanh toán</option>
              <option value="chờ thanh toán">Chờ thanh toán</option>
              <option value="đang xử lý">Đang xử lý</option>
              <option value="đã hủy">Đã hủy</option>
            </select>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="w-16 h-16 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tickets grid */}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentTickets.length > 0 ? (
                  currentTickets.map(ticket => (
                    <div key={ticket._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="border-b px-4 py-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <FileText size={18} className="text-indigo-500 mr-2" />
                          <h3 className="font-medium text-gray-800 truncate">Vé #{ticket._id.substring(0, 8)}...</h3>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </div>
                      <div className="p-4">
                        <div className="mb-3 flex items-start">
                          <User size={16} className="text-gray-500 mr-2 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Người đặt</p>
                            <p className="font-medium">{ticket.user?.name || 'Không có thông tin'}</p>
                          </div>
                        </div>
                        <div className="mb-3 flex items-start">
                          <MapPin size={16} className="text-gray-500 mr-2 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Tuyến đường</p>
                            <p className="font-medium">{ticket.route?.startPoint || 'N/A'} - {ticket.route?.endPoint || 'N/A'}</p>
                          </div>
                        </div>
                        <div className="mb-3 flex items-start">
                          <Calendar size={16} className="text-gray-500 mr-2 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Ngày</p>
                            <p className="font-medium">{ticket.date || 'Không có thông tin'}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Clock size={16} className="text-gray-500 mr-2 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Giờ</p>
                            <p className="font-medium">{ticket.time || 'Không có thông tin'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 text-right">
                        <Link 
                          to={`/tickets/${ticket._id}`} 
                          className="text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 bg-white rounded-lg shadow p-8 text-center">
                    <Ticket size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">
                      {searchTerm || statusFilter !== 'all' 
                        ? 'Không tìm thấy vé nào phù hợp với điều kiện lọc.' 
                        : 'Không có vé nào trong hệ thống.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {filteredTickets.length > 0 && (
                <div className="mt-6 flex justify-center">
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
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`relative inline-flex items-center px-4 py-2 border ${
                          currentPage === page
                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        } text-sm font-medium`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === totalPages || totalPages === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default TicketsManagement;