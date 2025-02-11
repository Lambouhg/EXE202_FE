// src/components/TicketList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const hardcodedTickets = [
    {
      _id: '1',
      from: 'Hà Nội',
      to: 'Hồ Chí Minh',
      date: '15/02/2025',
      time: '10:00 AM',
      seatType: 'Giường nằm',
      price: 500000,
      desiredRoute: 'Muốn trao đổi với khách trên tuyến Hà Nội - Hồ Chí Minh'
    },
    {
      _id: '2',
      from: 'Đà Nẵng',
      to: 'Nha Trang',
      date: '18/02/2025',
      time: '08:30 PM',
      seatType: 'Ghế ngồi',
      price: 300000,
      desiredRoute: 'Cần đổi chỗ ngồi gần cửa sổ'
    },
    {
      _id: '3',
      from: 'Hải Phòng',
      to: 'Quảng Ninh',
      date: '20/02/2025',
      time: '06:00 AM',
      seatType: 'Ghế thường',
      price: 150000,
      desiredRoute: 'Muốn trao đổi ghế ở tầng trên'
    }
  ];

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = hardcodedTickets;
        if (data) {
          setTickets(data);
        } else {
          alert('Lỗi tải vé');
        }
      } catch (error) {
        console.error('Lỗi kết nối:', error);
        alert('Lỗi kết nối');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return <div className="text-center py-6">Đang tải...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header with Navigation Links */}
      <header className="bg-blue-600 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-wide">Ứng Dụng Vé Xe</h1>
          <nav>
            <ul className="flex space-x-8 text-lg">
              <li>
                <Link to="/" className="hover:text-gray-300">Trang Chủ</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-300">Giới Thiệu</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-300">Liên Hệ</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Ticket List Section */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-4xl font-semibold mb-8 text-center text-blue-700">Danh Sách Vé Xe</h2>
        {tickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map(ticket => (
              <div key={ticket._id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
                <div className="text-center">
                  <h3 className="font-semibold text-xl text-blue-600">{ticket.from} - {ticket.to}</h3>
                  <p className="text-gray-500">{ticket.date} | {ticket.time}</p>
                </div>
                <div className="mt-4">
                  <p className="text-gray-700">Loại ghế: <span className="font-semibold">{ticket.seatType}</span></p>
                  <p className="text-gray-700">Giá vé: <span className="font-bold text-lg text-green-500">{ticket.price.toLocaleString()} đ</span></p>
                  <p className="mt-2 text-gray-600">Mong muốn trao đổi: <span className="italic text-gray-800">{ticket.desiredRoute}</span></p>
                </div>
                <div className="mt-6 flex justify-center">
                  <Link to="/chat" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    Liên hệ
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Không có vé nào để hiển thị.</p>
        )}
      </div>
    </div>
  );
};

export default TicketList;
