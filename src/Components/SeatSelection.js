import React from 'react';

const SeatSelection = ({ seats, onSelectSeat }) => {
  return (
    <div className="mt-6 grid grid-cols-4 gap-4">
      {Array.isArray(seats) && seats.map((seat, index) => (
        <button
          key={index}
          className={`p-4 text-center rounded-lg ${seat.status === 'available' ? 'bg-green-500' : seat.status === 'selected' ? 'bg-blue-500' : 'bg-gray-500'} text-white`}
          onClick={() => onSelectSeat(index)}
        >
          {seat.status === 'available' ? 'Ghế trống' : seat.status === 'selected' ? 'Đã chọn' : 'Không bán'}
        </button>
      ))}
    </div>
  );
};

export default SeatSelection;
