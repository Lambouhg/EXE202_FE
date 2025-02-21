import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  Ticket, 
  Calendar, 
  MapPin, 
  User, 
  CreditCard, 
  Clock, 
  Info, 
  Repeat, 
  Loader, 
  AlertCircle 
} from "lucide-react";

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
      const { data } = await axios.get(`https://exe202-backend-2v40.onrender.com/api/ticket/user/${userId}`);
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
      await axios.post("https://exe202-backend-2v40.onrender.com/api/exchange/exchange-requests", {
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

  const getStatusColor = (status) => {
    return status === "confirmed" 
      ? "bg-green-100 text-green-800 border-green-200" 
      : "bg-amber-100 text-amber-800 border-amber-200";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-blue-600 mr-2" size={24} />
        <p className="text-gray-600 font-medium">Đang tải vé...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <AlertCircle className="text-red-500 mr-2" size={24} />
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  if (!tickets.length) {
    return (
      <div className="flex flex-col justify-center items-center h-64 bg-gray-50 rounded-xl p-8">
        <Ticket className="text-gray-400 mb-4" size={48} />
        <p className="text-gray-500 font-medium text-lg">Không tìm thấy vé nào.</p>
        <button
          onClick={() => navigate('/routes')}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <MapPin size={16} />
          Tìm chuyến xe
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center mb-6 border-b pb-4">
        <Ticket className="text-blue-600 mr-3" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Vé Của Tôi</h2>
      </div>

      <div className="space-y-6">
        {tickets.map(({ _id, route, departureTime, seatNumber, company, price, status }) => (
          <div 
            key={_id} 
            className="border border-gray-200 p-5 rounded-xl shadow-sm bg-white hover:shadow-md transition duration-300"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              {/* Left Column - Ticket Info */}
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                  <h3 className="text-lg font-bold text-blue-600">
                    {route.startPoint} 
                    <span className="inline-block mx-2">→</span> 
                    {route.endPoint}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="text-gray-500 mr-2" size={16} />
                    <p className="text-sm">
                      {new Date(departureTime).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="text-gray-500 mr-2" size={16} />
                    <p className="text-sm">
                      {new Date(departureTime).toLocaleTimeString("vi-VN", {
                        hour: '2-digit', 
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <User className="text-gray-500 mr-2" size={16} />
                    <p className="text-sm">Ghế: {seatNumber}</p>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="text-gray-500 mr-2" size={16} />
                    <p className="text-sm font-medium">{price.toLocaleString()} VND</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center">
                  <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <p className="text-xs text-gray-700">{company.name}</p>
                  </div>
                  <div className={`ml-3 flex items-center ${getStatusColor(status)} px-3 py-1 rounded-full border`}>
                    <p className="text-xs font-medium">
                      {status === "confirmed" ? "Đã xác nhận" : "Chờ xác nhận"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Actions */}
              <div className="md:w-36 flex md:flex-col gap-2">
                <button
                  onClick={() => navigate(`/ticket/${_id}`)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-1"
                >
                  <Info size={16} />
                  <span>Chi Tiết</span>
                </button>

                <button
                  onClick={() => setExchange({ ticketId: _id, message: "", loading: false })}
                  className="flex-1 px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition flex items-center justify-center gap-1"
                >
                  <Repeat size={16} />
                  <span>Đổi Vé</span>
                </button>
              </div>
            </div>

            {exchange.ticketId === _id && (
              <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lời nhắn cho yêu cầu đổi vé
                </label>
                <textarea
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  rows="3"
                  placeholder="Nhập lý do đổi vé hoặc yêu cầu cụ thể..."
                  value={exchange.message}
                  onChange={(e) => setExchange((prev) => ({ ...prev, message: e.target.value }))}
                ></textarea>
                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => setExchange({ ticketId: null, message: "", loading: false })}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition mr-2"
                  >
                    Huỷ
                  </button>
                  <button
                    onClick={handleExchangeRequest}
                    disabled={exchange.loading}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 flex items-center gap-2"
                  >
                    {exchange.loading ? (
                      <>
                        <Loader className="animate-spin" size={16} />
                        <span>Đang gửi...</span>
                      </>
                    ) : (
                      <span>Gửi Yêu Cầu</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;