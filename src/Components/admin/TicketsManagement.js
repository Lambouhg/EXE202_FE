import React, { useState, useEffect } from 'react';

const TicketsManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    console.log('Token retrieved:', token);  // Kiểm tra token

    if (!token) {
      console.error('Token không tồn tại. Người dùng cần đăng nhập.');
      setError('Bạn cần đăng nhập để truy cập.');
      setLoading(false);
      return;
    }

    fetch('http://localhost:5000/api/admin/tickets', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Gửi token trong header
      }
    })
    .then(response => {
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          setError('Bạn không có quyền truy cập. Vui lòng kiểm tra quyền của bạn.');
        } else {
          setError('Không thể lấy dữ liệu từ API. Vui lòng thử lại.');
        }
        throw new Error('Không thể lấy dữ liệu từ API');
      }
      return response.json();
    })
    .then(data => {
      console.log('API Response:', data);  // Kiểm tra dữ liệu trả về
      if (Array.isArray(data)) {
        setTickets(data);
      } else {
        setError('Dữ liệu trả về không hợp lệ.');
      }
    })
    .catch(error => {
      console.error('Lỗi khi tải dữ liệu vé:', error);
      setError('Có lỗi xảy ra khi lấy dữ liệu vé. Vui lòng thử lại.');
    })
    .finally(() => {
      setLoading(false);  // Hoàn tất quá trình tải
    });
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Danh sách Vé</h3>
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Mã Vé</th>
            <th className="px-4 py-2 border-b text-left">Tên Người Dùng</th>
            <th className="px-4 py-2 border-b text-left">Tuyến Đường</th>
            <th className="px-4 py-2 border-b text-left">Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map(ticket => (
              <tr key={ticket._id}>
                <td className="px-4 py-2 border-b">{ticket._id}</td>
                <td className="px-4 py-2 border-b">{ticket.user?.name || 'N/A'}</td>
                <td className="px-4 py-2 border-b">
                  {ticket.route?.startPoint || 'N/A'} - {ticket.route?.endPoint || 'N/A'}
                </td>
                <td className="px-4 py-2 border-b">{ticket.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-2 border-b text-center">Không có vé nào</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TicketsManagement;
