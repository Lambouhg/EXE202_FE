import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exchange, setExchange] = useState({ ticketId: null, message: "", loading: false });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (!storedUser) {
      setError("Bạn chưa đăng nhập.");
      setLoading(false);
      return;
    }

    try {
      const { id: userId } = JSON.parse(storedUser);
      fetchTickets(userId);
    } catch {
      setError("Dữ liệu người dùng không hợp lệ.");
      setLoading(false);
    }
  }, []);

  const fetchTickets = async (userId) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:5000/api/ticket/user/${userId}`);
      setTickets(data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Lỗi khi tải danh sách vé.");
    } finally {
      setLoading(false);
    }
  };

  const handleExchangeRequest = async () => {
    const storedUser = localStorage.getItem("userInfo");
    if (!storedUser) return setError("Bạn chưa đăng nhập.");

    const { id: userId } = JSON.parse(storedUser);
    setExchange((prev) => ({ ...prev, loading: true }));

    try {
      await axios.post("http://localhost:5000/api/exchange/exchange-requests", {
        requesterId: userId,
        requestedTicketId: exchange.ticketId,
        message: exchange.message,
      });

      alert("Yêu cầu đổi vé đã được gửi!");
      setExchange({ ticketId: null, message: "", loading: false });
    } catch (err) {
      setError(err.response?.data?.error || "Gửi yêu cầu thất bại.");
      setExchange((prev) => ({ ...prev, loading: false }));
    }
  };

  if (loading) return <p className="text-center text-gray-500">Đang tải vé...</p>;

  if (error) return <p className="text-center text-red-500 font-semibold">{error}</p>;

  if (!tickets.length) return <p className="text-center text-gray-500">Không tìm thấy vé nào.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Vé Của Tôi</h2>

      <div className="space-y-4">
        {tickets.map(({ _id, route, departureTime, seatNumber, company, price, status }) => (
          <div key={_id} className="border p-4 rounded-lg shadow-sm bg-gray-100">
            <h3 className="text-lg font-semibold text-blue-600">
              {route.startPoint} → {route.endPoint}
            </h3>
            <p className="text-sm text-gray-600">
              Khởi hành: {new Date(departureTime).toLocaleString("vi-VN")}
            </p>
            <p className="text-sm text-gray-600">Ghế: {seatNumber}</p>
            <p className="text-sm text-gray-600">Nhà xe: {company.name}</p>
            <p className="text-sm text-gray-600">Giá: {price.toLocaleString()} VND</p>
            <p className={`text-sm font-semibold ${status === "confirmed" ? "text-green-600" : "text-yellow-600"}`}>
              Trạng thái: {status}
            </p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => navigate(`/ticket/${_id}`)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Xem Chi Tiết
              </button>

              <button
                onClick={() => setExchange({ ticketId: _id, message: "", loading: false })}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
              >
                Yêu Cầu Đổi Vé
              </button>
            </div>

            {exchange.ticketId === _id && (
              <div className="mt-4 p-4 bg-white border rounded-lg">
                <textarea
                  className="w-full border p-2 rounded-md"
                  rows="3"
                  placeholder="Nhập lời nhắn..."
                  value={exchange.message}
                  onChange={(e) => setExchange((prev) => ({ ...prev, message: e.target.value }))}
                ></textarea>
                <button
                  onClick={handleExchangeRequest}
                  disabled={exchange.loading}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
                >
                  {exchange.loading ? "Đang gửi..." : "Gửi Yêu Cầu"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;
