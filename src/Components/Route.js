import { useState, useEffect } from "react";
import { MapPin, Clock, CalendarDays, Search, Plus, ArrowRight } from "lucide-react";
import Header from "../Components/Header";

export default function RouteManagement() {
  const [search, setSearch] = useState("");
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://exe202-backend-mxr2.onrender.com/api/route");
        const data = await response.json();
        setRoutes(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu tuyến đường:", error);
      }
    };
    fetchData();
  }, []);

  const filteredRoutes = routes.filter((route) =>
    route.startPoint.toLowerCase().includes(search.toLowerCase()) ||
    route.endPoint.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="relative pt-16">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Thanh tìm kiếm và nút thêm */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo điểm đi, điểm đến..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md">
            <Plus className="w-5 h-5 mr-2" />
            Thêm tuyến đường
          </button>
        </div>

        {/* Danh sách tuyến đường */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutes.map((route) => (
            <div
              key={route._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                  Hoạt động
                </span>
              </div>

              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                {route.startPoint}
                <ArrowRight className="mx-2 w-5 h-5 text-gray-400" />
                {route.endPoint}
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
                  {route.price.toLocaleString()} VNĐ
                </div>
              </div>

              <div className="mt-5 flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all">
                  Xem chi tiết
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-all">
                  Chỉnh sửa
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Không tìm thấy tuyến đường */}
        {filteredRoutes.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Không tìm thấy kết quả</h3>
            <p className="text-gray-500">Vui lòng thử tìm kiếm với từ khóa khác</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
