import React, { useState } from 'react';

const TicketExchange = () => {
  const [activeTab, setActiveTab] = useState('find');
  const [showPostForm, setShowPostForm] = useState(false);

  const tickets = [
    {
      id: 1,
      from: "Hà Nội",
      to: "Sài Gòn",
      date: "2024-02-10",
      time: "20:00",
      price: 1200000,
      userAvatar: "/api/placeholder/40/40",
      username: "Nguyễn Văn A",
      phone: "0987654321",
      desiredRoute: "Sài Gòn - Đà Lạt",
      desiredDate: "2024-02-15",
      type: "Giường nằm",
      status: "Còn mới"
    },
    {
      id: 2,
      from: "Đà Nẵng",
      to: "Sài Gòn",
      date: "2024-02-12",
      time: "19:00",
      price: 800000,
      userAvatar: "/api/placeholder/40/40",
      username: "Trần Thị B",
      phone: "0987654322",
      desiredRoute: "Sài Gòn - Nha Trang",
      desiredDate: "2024-02-16",
      type: "Ghế ngồi",
      status: "Đã đặt cọc"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Trao đổi vé xe</h1>
            <button 
              onClick={() => setShowPostForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Đăng tin
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-4 mt-6">
            <button 
              className={`px-4 py-2 font-medium rounded-t-lg ${
                activeTab === 'find' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('find')}
            >
              Tìm vé
            </button>
            <button 
              className={`px-4 py-2 font-medium rounded-t-lg ${
                activeTab === 'posted' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('posted')}
            >
              Vé đã đăng
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Điểm đi</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Chọn điểm đi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Điểm đến</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Chọn điểm đến"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày đi</label>
              <input 
                type="date" 
                className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-end">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>

        {/* Ticket List */}
        <div className="space-y-4">
          {tickets.map(ticket => (
            <div key={ticket.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Ticket Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{ticket.from} - {ticket.to}</h3>
                    <span className="text-green-600 font-medium">{ticket.price.toLocaleString()}đ</span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Ngày đi: {ticket.date}</p>
                    <p>Giờ đi: {ticket.time}</p>
                    <p>Loại ghế: {ticket.type}</p>
                    <p>Tình trạng: {ticket.status}</p>
                  </div>
                </div>

                {/* Desired Exchange */}
                <div className="space-y-3">
                  <h4 className="font-medium">Mong muốn trao đổi</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Tuyến đường: {ticket.desiredRoute}</p>
                    <p>Ngày đi: {ticket.desiredDate}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <img src={ticket.userAvatar} alt={ticket.username} className="w-10 h-10 rounded-full"/>
                    <div>
                      <p className="font-medium">{ticket.username}</p>
                      <p className="text-sm text-gray-600">{ticket.phone}</p>
                    </div>
                  </div>
                  <div className="space-x-2 mt-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                      Liên hệ
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm">
                      Lưu tin
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post Form Modal */}
      {showPostForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Đăng tin trao đổi vé</h2>
              <button 
                onClick={() => setShowPostForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Điểm đi</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-lg"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Điểm đến</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-lg"/>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày đi</label>
                  <input type="date" className="w-full px-3 py-2 border rounded-lg"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giờ đi</label>
                  <input type="time" className="w-full px-3 py-2 border rounded-lg"/>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Giá vé</label>
                <input type="number" className="w-full px-3 py-2 border rounded-lg"/>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mong muốn trao đổi</label>
                <textarea className="w-full px-3 py-2 border rounded-lg" rows="3"></textarea>
              </div>

              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => setShowPostForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Hủy
                </button>
                <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  Đăng tin
                  
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketExchange;