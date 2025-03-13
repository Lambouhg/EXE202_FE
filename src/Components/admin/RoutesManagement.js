import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import { FaSort, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminRoutesManagement = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRoute, setNewRoute] = useState({
    companyId: '',
    startPoint: '',
    endPoint: '',
    stops: '',
    price: '',
    distance: '',
    duration: '',
    vehicleType: '',
    departureTimes: '',
    image: ''
  });

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = () => {
    setLoading(true);
    const token = localStorage.getItem("userToken");
  
    if (!token) {
      setError("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      setLoading(false);
      return;
    }
  
    fetch("https://exe202-backend-2v40.onrender.com/api/admin/routes", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Không có quyền truy cập. Vui lòng đăng nhập lại.");
        } else if (response.status === 403) {
          throw new Error("Truy cập bị từ chối. Chỉ dành cho Admin.");
        } else {
          throw new Error(`Lỗi server: ${response.status}`);
        }
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        setRoutes(data);
      } else {
        console.error("Dữ liệu API không hợp lệ!", data);
        setRoutes([]);
      }
    })
    .catch(error => {
      console.error("Lỗi khi lấy danh sách tuyến:", error);
      setError(error.message);
    })
    .finally(() => setLoading(false));
  };

  const handleAddRoute = () => {
    fetch("https://exe202-backend-2v40.onrender.com/api/admin/routes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`
      },
      body: JSON.stringify({
        ...newRoute,
        stops: newRoute.stops.split(','), // Chuyển stops thành mảng
        departureTimes: newRoute.departureTimes.split(',') // Chuyển departureTimes thành mảng
      }),
    })
    .then(() => {
      fetchRoutes();
      setShowAddModal(false);
      setNewRoute({
        companyId: '',
        startPoint: '',
        endPoint: '',
        stops: '',
        price: '',
        distance: '',
        duration: '',
        vehicleType: '',
        departureTimes: '',
        image: ''
      });
    })
    .catch(error => console.error("Lỗi thêm tuyến:", error));
  };

  // Hàm lọc tuyến đường theo tìm kiếm
  const filteredRoutes = routes.filter(route => 
    `${route.startPoint} ${route.endPoint}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hàm xóa tuyến đường
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tuyến đường này?")) {
      fetch(`https://exe202-backend-2v40.onrender.com/api/admin/routes/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("userToken")}`
        }
      })
      .then(() => fetchRoutes())
      .catch(error => console.error("Lỗi xóa tuyến:", error));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">Quản lý Tuyến Đường</h3>
              <button 
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <FaPlus className="mr-2" /> Thêm tuyến mới
              </button>
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm tuyến đường..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
            {/* 📌 Modal Thêm Tuyến Đường */}
            {showAddModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-4">Thêm Tuyến Đường Mới</h2>

                <input type="text" placeholder="ID Công ty" className="w-full p-2 mb-2 border rounded"
                  value={newRoute.companyId} onChange={(e) => setNewRoute({ ...newRoute, companyId: e.target.value })} />
                
                <input type="text" placeholder="Điểm đi" className="w-full p-2 mb-2 border rounded"
                  value={newRoute.startPoint} onChange={(e) => setNewRoute({ ...newRoute, startPoint: e.target.value })} />

                <input type="text" placeholder="Điểm đến" className="w-full p-2 mb-2 border rounded"
                  value={newRoute.endPoint} onChange={(e) => setNewRoute({ ...newRoute, endPoint: e.target.value })} />

                <input type="text" placeholder="Các điểm dừng (cách nhau bằng dấu phẩy)" className="w-full p-2 mb-2 border rounded"
                  value={newRoute.stops} onChange={(e) => setNewRoute({ ...newRoute, stops: e.target.value })} />

                <input type="number" placeholder="Giá vé" className="w-full p-2 mb-2 border rounded"
                  value={newRoute.price} onChange={(e) => setNewRoute({ ...newRoute, price: e.target.value })} />

                <input type="number" placeholder="Khoảng cách (km)" className="w-full p-2 mb-2 border rounded"
                  value={newRoute.distance} onChange={(e) => setNewRoute({ ...newRoute, distance: e.target.value })} />

                <input type="text" placeholder="Thời gian di chuyển (phút)" className="w-full p-2 mb-2 border rounded"
                  value={newRoute.duration} onChange={(e) => setNewRoute({ ...newRoute, duration: e.target.value })} />

                <select className="w-full p-2 mb-2 border rounded"
                  value={newRoute.vehicleType} onChange={(e) => setNewRoute({ ...newRoute, vehicleType: e.target.value })}>
                  <option value="">Chọn loại xe</option>
                  <option value="Limousine">Limousine</option>
                  <option value="Ghế ngồi">Ghế ngồi</option>
                  <option value="Giường nằm">Giường nằm</option>
                </select>

                <input type="text" placeholder="Thời gian khởi hành (dạng YYYY-MM-DD HH:mm, cách nhau bằng dấu phẩy)" className="w-full p-2 mb-2 border rounded"
                  value={newRoute.departureTimes} onChange={(e) => setNewRoute({ ...newRoute, departureTimes: e.target.value })} />

                <input type="text" placeholder="URL Ảnh" className="w-full p-2 mb-2 border rounded"
                  value={newRoute.image} onChange={(e) => setNewRoute({ ...newRoute, image: e.target.value })} />

                <div className="flex justify-end">
                  <button onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded mr-2">Hủy</button>
                  <button onClick={handleAddRoute} className="px-4 py-2 bg-blue-600 text-white rounded">Thêm</button>
                </div>
              </div>
            </div>
          )}
          {loading ? (
            <p className="text-center py-4">Đang tải dữ liệu...</p>
          ) : error ? (
            <p className="text-red-500 text-center py-4">{error}</p>
          ) : (
            <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b text-left">Tuyến Đường</th>
                  <th className="px-4 py-2 border-b text-left">Giá</th>
                  <th className="px-4 py-2 border-b text-left">Thời Gian</th>
                  <th className="px-4 py-2 border-b text-left">Số Ghế</th>
                  <th className="px-4 py-2 border-b text-left">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoutes.map(route => (
                  <tr key={route._id}>
                    <td className="px-4 py-2 border-b">{route.startPoint} - {route.endPoint}</td>
                    <td className="px-4 py-2 border-b">{route.price} VND</td>
                    <td className="px-4 py-2 border-b">{route.duration} phút</td>
                    <td className="px-4 py-2 border-b">{route.availableSeats}</td>
                    <td className="px-4 py-2 border-b">
                      <button className="text-blue-500 mr-2"><FaEdit /></button>
                      <button onClick={() => handleDelete(route._id)} className="text-red-500"><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRoutesManagement;
