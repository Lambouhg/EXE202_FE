import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import UserDashboard from './Components/Dashboard';
import RouteManagement from './Components/Route';
import Street from './Components/Street';
import RouteFilters from './Components/RouteFilters';
import RouteList from './Components/RouteList';
import SeatSelection from './Components/SeatSelection';
import BusBooking from './Components/BusBooking';
import TicketExchange from './Components/TicketExchange';
import TicketPost from './Components/PostTicket'; // Đăng vé
import TicketList from './Components/TicketList';
import Chat from './Components/ChatPage';
import AdminDashboard from './Components/admin/adminDashboard';
import UsersManagement from './Components/admin/UsersManagement';
import TicketsManagement from './Components/admin/TicketsManagement';
import AdminRoutesManagement from './Components/admin/RoutesManagement';
import Settings from './Components/admin/Settings'; 
import BusCompany from './Components/admin/company';
// App.js
function App() {
  const [routes, setRoutes] = useState([]);
  const [filters, setFilters] = useState({
    time: 'default',
    price: 'default'
  });
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const response = await fetch('http://localhost:5000/api/route');
      const data = await response.json();
      setRoutes(data);
    };
    fetchRoutes();
  }, []);

  const filteredRoutes = routes.filter((route) => {
    const timeMatch =
      filters.time === 'default' ||
      (filters.time === 'early' && route.departureTime < '12:00') ||
      (filters.time === 'late' && route.departureTime >= '12:00');
    const priceMatch =
      filters.price === 'default' ||
      (filters.price === 'asc' && route.price < 300000) ||
      (filters.price === 'desc' && route.price > 300000);
    return timeMatch && priceMatch;
  });

  const handleSelectRoute = (route) => {
    setSelectedRoute(route);
    setSeats(route.seats);
  };

  const handleSelectSeat = (index) => {
    const newSeats = [...seats];
    newSeats[index].status = newSeats[index].status === 'available' ? 'selected' : 'available';
    setSeats(newSeats);
  };

  return (
    <Router>
   <div className="container mx-auto w-full min-h-screen m-0 p-0">



        <Routes>
          {/* Trang chủ */}
          <Route path="/" element={<Home />} />
          
          {/* Các trang đăng nhập và đăng ký */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Dashboard người dùng */}
          <Route path="/dashboard" element={<UserDashboard />} />

          {/* Quản lý tuyến đường */}
          <Route path="/Route" element={<RouteManagement />} />
          <Route path="/add-routes" element={<Street />} />

          {/* Tìm kiếm tuyến đường */}
          <Route path="/routes-list" element={
            <>
              <RouteFilters filters={filters} setFilters={setFilters} />
              {selectedRoute ? (
                <div>
                  <h2 className="text-xl font-semibold">Chuyến {selectedRoute.startPoint} → {selectedRoute.endPoint}</h2>
                  <SeatSelection seats={seats} onSelectSeat={handleSelectSeat} />
                </div>
              ) : (
                <RouteList routes={filteredRoutes} onSelectRoute={handleSelectRoute} />
              )}
            </>
          } />

          {/* Trang đặt vé */}
          <Route path="/booking" element={<BusBooking />} />

          {/* Trang trao đổi vé */}
          <Route path="/exchange" element={<TicketExchange />} />
          
          {/* Trang đăng vé */}
          <Route path="/post" element={<TicketPost />} /> {/* Đây là trang đăng vé */}
          <Route path="/list" element={<TicketList />} />
          <Route path="/chat" element={<Chat  /> } />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/users" element={<UsersManagement />} />
          <Route path="/routes" element={<AdminRoutesManagement />} />
          <Route path="/tickets" element={<TicketsManagement />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/company" element={<BusCompany />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
