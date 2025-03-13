import React, { useState, useEffect, useCallback } from 'react';
import { Menu, Home, Bus, Settings, Users, LogOut, Pencil, Trash, Search, ChevronLeft, ChevronRight, Mail, Phone, MapPin, AlertCircle, CheckCircle, DownloadCloud } from 'lucide-react';
import { Link } from 'react-router-dom';

const BusCompany = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState({ phone: '', email: '' });
  const [address, setAddress] = useState('');
  const [busCompanies, setBusCompanies] = useState([]);
  const [status, setStatus] = useState({ error: null, success: null });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem('userToken');
  const API_URL = 'https://exe202-backend-2v40.onrender.com/api/admin/bus-companies';

  const fetchBusCompanies = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Lỗi kết nối server');
      const data = await response.json();
      setBusCompanies(data);
      setStatus({ error: null, success: null });
    } catch (error) {
      setStatus({ error: 'Lỗi khi tải danh sách nhà xe', success: null });
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBusCompanies();
  }, [fetchBusCompanies]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${API_URL}/${editId}` : API_URL;
    
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ 
          name, 
          contact: typeof contact === 'string' 
            ? { phone: contact, email: '' } 
            : contact, 
          address 
        }),
      });
      
      if (!response.ok) throw new Error('Lỗi khi lưu dữ liệu');
      
      await fetchBusCompanies();
      setIsFormVisible(false);
      setEditId(null);
      setName('');
      setContact({ phone: '', email: '' });
      setAddress('');
      setStatus({ 
        error: null, 
        success: `Đã ${editId ? 'cập nhật' : 'thêm'} nhà xe thành công!` 
      });
      
      setTimeout(() => {
        setStatus({ error: null, success: null });
      }, 3000);
    } catch (error) {
      setStatus({ error: 'Lỗi khi lưu thông tin nhà xe', success: null });
    }
  };

  const handleEdit = (company) => {
    setEditId(company._id);
    setName(company.name);
    setContact(company.contact || { phone: '', email: '' });
    setAddress(company.address);
    setIsFormVisible(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const response = await fetch(`${API_URL}/${deleteId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      if (!response.ok) throw new Error("Lỗi xóa nhà xe");
      
      await fetchBusCompanies();
      setDeleteId(null);
      setStatus({ error: null, success: 'Đã xóa nhà xe thành công!' });
      
      setTimeout(() => {
        setStatus({ error: null, success: null });
      }, 3000);
    } catch (error) {
      setStatus({ error: 'Lỗi khi xóa nhà xe', success: null });
    }
  };

  const filteredCompanies = busCompanies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (company.contact?.phone && company.contact.phone.includes(searchTerm)) ||
    (company.contact?.email && company.contact.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (company.address && company.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-indigo-900 text-white transition-all duration-300 ease-in-out flex flex-col h-full shadow-lg`}>
        <div className="p-5 flex items-center justify-between border-b border-indigo-800">
          <h1 className={`font-bold text-xl ${isSidebarOpen ? 'block' : 'hidden'}`}>GoTic</h1>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 hover:bg-indigo-800 rounded-full transition-colors"
          >
            <Menu size={22} />
          </button>
        </div>

        <nav className="mt-6 flex-1">
          <div className="px-4 space-y-2">
            <Link to="/admin" className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-indigo-800 transition-colors">
              <Home size={20} />
              {isSidebarOpen && <span>Trang chủ</span>}
            </Link>
            <Link to="/users" className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-indigo-800 transition-colors">
              <Users size={20} />
              {isSidebarOpen && <span>Quản lý người dùng</span>}
            </Link>
            <Link to="/bus-companies" className="flex items-center space-x-3 w-full p-3 rounded-lg bg-indigo-800 text-white transition-colors">
              <Bus size={20} />
              {isSidebarOpen && <span>Quản lý nhà xe</span>}
            </Link>
            <Link to="/settings" className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-indigo-800 transition-colors">
              <Settings size={20} />
              {isSidebarOpen && <span>Cài đặt</span>}
            </Link>
          </div>
        </nav>
        
        <div className="mt-auto px-4 pb-6">
          <button 
            className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-red-700 text-white transition-colors"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Đăng xuất</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Quản lý nhà xe</h2>
            <p className="text-gray-500 text-sm mt-1">Quản lý thông tin các nhà xe đối tác</p>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => {
                setEditId(null);
                setName('');
                setContact({ phone: '', email: '' });
                setAddress('');
                setIsFormVisible(true);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <span>+ Thêm nhà xe</span>
            </button>
          </div>
        </header>

        <div className="p-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              {/* Search and Filter */}
              <div className="flex justify-between items-center mb-6">
                <div className="relative w-64">
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm nhà xe..." 
                    className="w-full p-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center space-x-1">
                    <DownloadCloud size={18} />
                    <span>Xuất Excel</span>
                  </button>
                </div>
              </div>

              {/* Status Messages */}
              {status.error && (
                <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center space-x-2">
                  <AlertCircle size={20} />
                  <span>{status.error}</span>
                </div>
              )}
              {status.success && (
                <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 flex items-center space-x-2">
                  <CheckCircle size={20} />
                  <span>{status.success}</span>
                </div>
              )}

              {/* Table */}
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên nhà xe</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số điện thoại</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Địa chỉ</th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredCompanies.length > 0 ? (
                          filteredCompanies.map((company) => (
                            <tr key={company._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-medium text-gray-900">{company.name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center text-gray-600">
                                  <Phone size={16} className="mr-2 text-gray-400" />
                                  {company.contact?.phone || "Chưa cập nhật"}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center text-gray-600">
                                  <Mail size={16} className="mr-2 text-gray-400" />
                                  {company.contact?.email || "Chưa cập nhật"}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center text-gray-600">
                                  <MapPin size={16} className="mr-2 text-gray-400 flex-shrink-0" />
                                  <span className="truncate max-w-xs">{company.address || "Chưa cập nhật"}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                <button 
                                  onClick={() => handleEdit(company)}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-2"
                                >
                                  <Pencil size={18} />
                                </button>
                                <button 
                                  onClick={() => setDeleteId(company._id)}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash size={18} />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="px-6 py-16 text-center text-gray-500">
                              {searchTerm ? 'Không tìm thấy nhà xe phù hợp' : 'Chưa có nhà xe nào trong hệ thống'}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4">
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">{filteredCompanies.length}</span> trong tổng số <span className="font-medium">{filteredCompanies.length}</span> nhà xe
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <ChevronLeft size={18} />
                          </button>
                          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600 hover:bg-indigo-50">
                            1
                          </button>
                          <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <ChevronRight size={18} />
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
            <div className="bg-indigo-600 px-6 py-4 text-white">
              <h3 className="text-lg font-semibold">{editId ? 'Chỉnh sửa nhà xe' : 'Thêm nhà xe mới'}</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Tên nhà xe</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Nhập tên nhà xe" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Số điện thoại</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Nhập số điện thoại" 
                  value={typeof contact === 'string' ? contact : contact.phone} 
                  onChange={(e) => {
                    if (typeof contact === 'string') {
                      setContact({ phone: e.target.value, email: '' });
                    } else {
                      setContact({...contact, phone: e.target.value});
                    }
                  }} 
                  required 
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Nhập email" 
                  value={typeof contact === 'string' ? '' : contact.email} 
                  onChange={(e) => {
                    if (typeof contact === 'string') {
                      setContact({ phone: contact, email: e.target.value });
                    } else {
                      setContact({...contact, email: e.target.value});
                    }
                  }}
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Địa chỉ</label>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Nhập địa chỉ"
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  required
                  rows="3"
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  type="button" 
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsFormVisible(false)}
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {editId ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
            <div className="bg-red-600 px-6 py-4 text-white">
              <h3 className="text-lg font-semibold">Xác nhận xóa</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">Bạn có chắc chắn muốn xóa nhà xe này? Hành động này không thể hoàn tác.</p>
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setDeleteId(null)}
                >
                  Hủy
                </button>
                <button 
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  onClick={handleDelete}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusCompany;