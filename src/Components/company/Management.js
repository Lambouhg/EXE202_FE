import React, { useState } from 'react';
import { 
  Building2, Menu, Search, Bell, ChevronDown, Bus, Calendar, Users, 
  Ticket, Settings, LogOut, Map, BarChart
} from 'lucide-react';

const BusManagementSystem = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch(currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'companies':
        return <CompaniesView />;
      case 'routes':
        return <RoutesView />;
      case 'tickets':
        return <TicketsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-200 ease-in-out`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Bus className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold">BusManager</span>
          </div>
          
          <nav className="space-y-1">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className={`flex items-center w-full px-4 py-3 ${
                currentView === 'dashboard' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
              } rounded-lg`}
            >
              <BarChart className="w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </button>

            <button 
              onClick={() => setCurrentView('companies')}
              className={`flex items-center w-full px-4 py-3 ${
                currentView === 'companies' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
              } rounded-lg`}
            >
              <Building2 className="w-5 h-5 mr-3" />
              <span>Công ty</span>
            </button>

            <button 
              onClick={() => setCurrentView('routes')}
              className={`flex items-center w-full px-4 py-3 ${
                currentView === 'routes' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
              } rounded-lg`}
            >
              <Map className="w-5 h-5 mr-3" />
              <span>Tuyến đường</span>
            </button>

            <button 
              onClick={() => setCurrentView('tickets')}
              className={`flex items-center w-full px-4 py-3 ${
                currentView === 'tickets' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
              } rounded-lg`}
            >
              <Ticket className="w-5 h-5 mr-3" />
              <span>Vé xe</span>
            </button>

            <button 
              onClick={() => setCurrentView('schedule')}
              className={`flex items-center w-full px-4 py-3 ${
                currentView === 'schedule' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
              } rounded-lg`}
            >
              <Calendar className="w-5 h-5 mr-3" />
              <span>Lịch trình</span>
            </button>

            <button 
              onClick={() => setCurrentView('settings')}
              className={`flex items-center w-full px-4 py-3 ${
                currentView === 'settings' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
              } rounded-lg`}
            >
              <Settings className="w-5 h-5 mr-3" />
              <span>Cài đặt</span>
            </button>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg">
            <LogOut className="w-5 h-5 mr-3" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-2">
                <img 
                  src="/api/placeholder/32/32"
                  alt="User avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">Admin</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const DashboardView = () => (
  <div>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-gray-600">Xem tổng quan về hoạt động của công ty</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="text-gray-600 mb-2">Tổng số công ty</div>
        <div className="text-3xl font-bold">12</div>
        <div className="text-green-600 text-sm">+2 trong tháng này</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="text-gray-600 mb-2">Tổng tuyến đường</div>
        <div className="text-3xl font-bold">48</div>
        <div className="text-green-600 text-sm">+5 trong tháng này</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="text-gray-600 mb-2">Tổng xe buýt</div>
        <div className="text-3xl font-bold">156</div>
        <div className="text-green-600 text-sm">+12 trong tháng này</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="text-gray-600 mb-2">Vé đã bán</div>
        <div className="text-3xl font-bold">2,845</div>
        <div className="text-green-600 text-sm">+234 trong tháng này</div>
      </div>
    </div>
  </div>
);

const CompaniesView = () => (
  <div>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900">Quản lý Công ty</h1>
      <p className="text-gray-600">Quản lý thông tin các công ty xe buýt</p>
    </div>

    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-4">Tên công ty</th>
              <th className="pb-4">Địa chỉ</th>
              <th className="pb-4">Số điện thoại</th>
              <th className="pb-4">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-4">Công ty Xe buýt Hà Nội</td>
              <td>123 Đường Láng, Hà Nội</td>
              <td>0123456789</td>
              <td><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">Hoạt động</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const RoutesView = () => (
  <div>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900">Quản lý Tuyến Đường</h1>
      <p className="text-gray-600">Quản lý các tuyến đường xe buýt</p>
    </div>

    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-4">Tên tuyến</th>
              <th className="pb-4">Điểm đi</th>
              <th className="pb-4">Điểm đến</th>
              <th className="pb-4">Giá vé</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-4">Tuyến 01</td>
              <td>Bến xe A</td>
              <td>Bến xe B</td>
              <td>15,000đ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);


const TicketsView = () => (
  <div>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900">Quản lý Vé</h1>
      <p className="text-gray-600">Quản lý vé xe buýt</p>
    </div>

    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-4">Mã vé</th>
              <th className="pb-4">Tuyến</th>
              <th className="pb-4">Giờ khởi hành</th>
              <th className="pb-4">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-4">TICKET001</td>
              <td>Tuyến 01</td>
              <td>07:00</td>
              <td><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">Đã bán</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default BusManagementSystem;