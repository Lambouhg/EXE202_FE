import React from 'react';

const RouteFilters = ({ filters, setFilters }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-gray-800">Lọc</h3>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-600">Giờ đi</label>
        <select
          value={filters.time}
          onChange={(e) => setFilters({ ...filters, time: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="default">Mặc định</option>
          <option value="early">Giờ đi sớm nhất</option>
          <option value="late">Giờ đi muộn nhất</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-600">Giá vé</label>
        <select
          value={filters.price}
          onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="default">Mặc định</option>
          <option value="asc">Giá tăng dần</option>
          <option value="desc">Giá giảm dần</option>
        </select>
      </div>
    </div>
  );
};

export default RouteFilters;
