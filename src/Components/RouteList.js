import React from 'react';
import { ArrowRight, MapPin, Clock, CalendarDays } from 'lucide-react';

const RouteList = ({ routes, onSelectRoute }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {routes.map((route) => (
        <div key={route._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all cursor-pointer" onClick={() => onSelectRoute(route)}>
          <div className="flex justify-between items-center mb-3">
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Hoạt động</span>
          </div>

          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            {route.startPoint} <ArrowRight className="mx-2 w-5 h-5 text-gray-400" /> {route.endPoint}
          </h2>

          <div className="mt-3 space-y-2 text-gray-600 text-sm">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-blue-500 mr-2" />
              {route.distance} km
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-yellow-500 mr-2" />
              {route.duration}
            </div>
            <div className="flex items-center">
              <CalendarDays className="w-5 h-5 text-red-500 mr-2" />
              {Number(route.price).toLocaleString()} VNĐ
            </div>
          </div>

          <div className="mt-5 flex space-x-3">
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all">
              Chọn chuyến
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RouteList;
