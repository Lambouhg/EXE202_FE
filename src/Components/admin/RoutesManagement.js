import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader'; // Import AdminHeader

const AdminRoutesManagement = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    // Fetch routes data from the API
    fetch('https://exe202-backend-2v40.onrender.com/api/admin/routes')
      .then(response => response.json())
      .then(data => setRoutes(data));
  }, []);

  return (
    <div>
      <AdminHeader /> {/* Thêm AdminHeader vào đầu trang */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Danh sách Tuyến Đường</h3>
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Tuyến Đường</th>
              <th className="px-4 py-2 border-b text-left">Giá</th>
              <th className="px-4 py-2 border-b text-left">Thời Gian</th>
              <th className="px-4 py-2 border-b text-left">Số Ghế Còn Lại</th>
            </tr>
          </thead>
          <tbody>
            {routes.map(route => (
              <tr key={route._id}>
                <td className="px-4 py-2 border-b">{route.startPoint} - {route.endPoint}</td>
                <td className="px-4 py-2 border-b">{route.price}</td>
                <td className="px-4 py-2 border-b">{route.duration}</td>
                <td className="px-4 py-2 border-b">{route.availableSeats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRoutesManagement;
