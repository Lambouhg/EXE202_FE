import React from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Quản Lý Hệ Thống</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/admin" className="hover:text-gray-200">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/routes" className="hover:text-gray-200">Quản Lý Tuyến Đường</Link>
            </li>
            <li>
              <Link to="/admin/users" className="hover:text-gray-200">Quản Lý Người Dùng</Link>
            </li>
            <li>
              <Link to="/admin/tickets" className="hover:text-gray-200">Quản Lý Vé</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
