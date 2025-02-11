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
      const response = await fetch('https://exe202-backend-mxr2.onrender.com/api/route');
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
      <div className="max-w-7xl mx-auto px-6 py-8">
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
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
