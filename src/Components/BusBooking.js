import React, { useState } from 'react';

const BusBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [sortOption, setSortOption] = useState('default');

  const vouchers = [
    {
      id: 1,
      title: "THANH TOÁN",
      description: "Giảm 20%, tối đa 60k",
      details: "Đơn hàng không giới hạn số lượng",
      expiry: "HSD: T7, 15/03",
      image: "/api/placeholder/80/80"
    },
    {
      id: 2,
      title: "THANH TOÁN",
      description: "Giảm 20k",
      details: "Đơn hàng tối thiểu 200k",
      expiry: "HSD: T2, 30/06",
      image: "/api/placeholder/80/80"
    }
  ];

  const sortOptions = [
    { id: 'default', label: 'Mặc định' },
    { id: 'earliest', label: 'Giờ đi sớm nhất' },
    { id: 'latest', label: 'Giờ đi muộn nhất' },
    { id: 'rating', label: 'Đánh giá cao nhất' },
    { id: 'priceAsc', label: 'Giá tăng dần' },
    { id: 'priceDesc', label: 'Giá giảm dần' }
  ];

  const filterCategories = [
    { title: 'Giờ đi', expanded: false },
    { title: 'Nhà xe', expanded: false },
    { title: 'Giá vé', expanded: false },
    { title: 'Điểm đón', expanded: false },
    { title: 'Điểm trả', expanded: false },
    { title: 'Tiêu chí phổ biến', expanded: false }
  ];

  const seats = {
    driver: { row: 0, col: 0 },
    layout: [
      [null, { id: 'A1', status: 'available' }, { id: 'A2', status: 'available' }],
      [{ id: 'B1', status: 'taken' }, { id: 'B2', status: 'available' }, { id: 'B3', status: 'available' }],
      [{ id: 'C1', status: 'available' }, { id: 'C2', status: 'taken' }, { id: 'C3', status: 'available' }],
      [{ id: 'D1', status: 'available' }, { id: 'D2', status: 'available' }, { id: 'D3', status: 'taken' }]
    ]
  };

  const toggleSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Sidebar - Filters */}
        <div className="md:col-span-3 space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Sắp xếp</h2>
            <div className="space-y-2">
              {sortOptions.map(option => (
                <div key={option.id} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={option.id}
                    name="sort"
                    value={option.id}
                    checked={sortOption === option.id}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-4 h-4"
                  />
                  <label htmlFor={option.id} className="cursor-pointer text-sm">{option.label}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Lọc</h2>
            <div className="space-y-4">
              {filterCategories.map(category => (
                <div key={category.title} className="border-b pb-2">
                  <button className="flex justify-between items-center w-full text-sm">
                    <span>{category.title}</span>
                    <span>▼</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-9 space-y-4">
          {/* Vouchers */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Chỗ mong muốn</h3>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="bg-green-50 text-green-700 p-3 rounded-md mb-4">
              Vexere cam kết giữ đúng chỗ bạn đã chọn.
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {vouchers.map(voucher => (
                <div key={voucher.id} className="flex-none">
                  <div className="w-64 bg-white border rounded-lg p-4">
                    <div className="flex gap-3">
                      <img src={voucher.image} alt="voucher" className="w-16 h-16 rounded" />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-blue-600">{voucher.title}</span>
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="font-semibold text-sm">{voucher.description}</p>
                        <p className="text-xs text-gray-600">{voucher.details}</p>
                        <p className="text-xs text-gray-500">{voucher.expiry}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seat Selection */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Sơ đồ ghế</h3>
                <div className="grid grid-cols-3 gap-2">
                  {/* Driver seat */}
                  <div className="col-span-3 flex justify-start mb-4">
                    <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center">
                      <span className="text-xs">Tài</span>
                    </div>
                  </div>
                  
                  {/* Passenger seats */}
                  {seats.layout.map((row, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                      {row.map((seat, colIndex) => (
                        <div key={`${rowIndex}-${colIndex}`}>
                          {seat && (
                            <button
                              className={`w-8 h-8 rounded flex items-center justify-center ${
                                seat.status === 'taken' 
                                  ? 'bg-gray-300 cursor-not-allowed'
                                  : selectedSeats.includes(seat.id)
                                  ? 'bg-green-500 text-white'
                                  : 'bg-white border border-gray-300 hover:border-green-500'
                              }`}
                              onClick={() => seat.status !== 'taken' && toggleSeat(seat.id)}
                              disabled={seat.status === 'taken'}
                            >
                              <span className="text-xs">{seat.id}</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Chú thích</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-300 rounded" />
                    <span className="text-sm">Ghế không bán</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border border-green-500 rounded" />
                    <span className="text-sm">Đang chọn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white border border-gray-300 rounded" />
                    <span className="text-sm">Ghế trống</span>
                  </div>
                  <div className="mt-6">
                    <p className="font-semibold">Giá vé: 250,000đ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusBooking;