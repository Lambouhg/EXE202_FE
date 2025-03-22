import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import UserDashboard from './Components/Dashboard';
import RouteManagement from './Components/Route';
import Street from './Components/Street';
//import RouteFilters from './Components/RouteFilters';
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
import BookingPage from './Components/users/BookingPage';
import MyTickets from './Components/users/MyTickets';
  import ExchangeRequests from './Components/users/ExchangeRequests';
  import BusManagementSystem from './Components/company/Management';
  import UserDetail from './Components/admin/UserDetail';
  import EditUser from './Components/admin/EditUser';
  import TicketDetail from './Components/users/TicketDetail';
// App.js 
function App() {
 
  

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

          
          {/* Trang đặt vé */}
          <Route path="/booking" element={<BusBooking />} />

          {/* Trang trao đổi vé */}
          <Route path="/exchange" element={<TicketExchange />} />

          {/* Trang đăng vé */}
          <Route path="/post" element={<TicketPost />} /> {/* Đây là trang đăng vé */}
          <Route path="/list" element={<TicketList />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/users" element={<UsersManagement />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/users/edit/:id" element={<EditUser />} />

          <Route path="/routes" element={<AdminRoutesManagement />} />
          <Route path="/tickets" element={<TicketsManagement />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/bus-companies" element={<BusCompany />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/myticket" element={<MyTickets/>} />
          <Route path="/requests" element={<ExchangeRequests/>} />
          <Route path="/management" element={<BusManagementSystem />} />
          <Route path="/TicketDetail" element={<TicketDetail />} />
        </Routes>


      </div>
    </Router>
  );
}

export default App;
