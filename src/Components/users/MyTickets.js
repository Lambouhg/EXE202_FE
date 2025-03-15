import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Ticket,
  Calendar,
  User,
  CreditCard,
  Clock,
  Info,
  Repeat,
  Loader,
  AlertCircle,
  MapPin,
  X,
  Bus,
  Tag,
  CheckCircle,
  ArrowLeft,
  Building,
  Phone,
  Mail,
  Armchair,
  QrCode,
  CalendarClock,
  Download,
  TicketCheck
} from "lucide-react";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exchange, setExchange] = useState({ ticketId: null, message: "", loading: false });
  const [selectedTicket, setSelectedTicket] = useState(null); // Lưu thông tin vé được chọn
  const navigate = useNavigate();

  const getStatusDisplay = (status) => {
    const statusMap = {
      'confirmed': { text: 'Đã xác nhận', color: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-4 h-4" /> },
      'pending': { text: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-800', icon: <AlertCircle className="w-4 h-4" /> },
      'available': { text: 'Còn trống', color: 'bg-blue-100 text-blue-800', icon: <CheckCircle className="w-4 h-4" /> },
      'in_exchange': { text: 'Đang trao đổi', color: 'bg-purple-100 text-purple-800', icon: <AlertCircle className="w-4 h-4" /> }
    };

    return statusMap[status] || { text: status, color: 'bg-gray-100 text-gray-800', icon: <AlertCircle className="w-4 h-4" /> };
  };

  // Hàm định dạng thời gian
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusColor = (status) => {
    return status === "confirmed"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-amber-100 text-amber-800 border-amber-200";
  };

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
        <TicketCheck className="text-gray-400 mb-4" size={48} />
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
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="border border-gray-200 p-5 rounded-xl shadow-sm bg-white hover:shadow-md transition duration-300"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              {/* Left Column - Ticket Info */}
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                  <h3 className="text-lg font-bold text-blue-600">
                    {ticket.route.startPoint}
                    <span className="inline-block mx-2">→</span>
                    {ticket.route.endPoint}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="text-gray-500 mr-2" size={16} />
                    <p className="text-sm">
                      {ticket.route.departureTimes?.length > 0
                        ? new Date(ticket.route.departureTimes[0])
                          .toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
                        : "Chưa có thông tin"}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <Clock className="text-gray-500 mr-2" size={16} />
                    <p className="text-sm">
                      {ticket.route.departureTimes?.length > 0
                        ? new Date(ticket.route.departureTimes[0])
                          .toLocaleTimeString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh", hour: "2-digit", minute: "2-digit" })
                        : "Chưa có giờ"}
                    </p>
                  </div>




                  <div className="flex items-center">
                    <User className="text-gray-500 mr-2" size={16} />
                    <p className="text-sm">Ghế: {ticket.seatNumber}</p>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="text-gray-500 mr-2" size={16} />
                    <p className="text-sm font-medium">{ticket.price.toLocaleString()} VND</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center">
                  <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <p className="text-xs text-gray-700">{ticket.company.name}</p>
                  </div>
                  <div className={`ml-3 flex items-center ${getStatusColor(ticket.status)} px-3 py-1 rounded-full border`}>
                    <p className="text-xs font-medium">
                      {ticket.status === "confirmed" ? "Đã xác nhận" : "Chờ xác nhận"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Actions */}
              <div className="md:w-36 flex md:flex-col gap-2">
                <button
                  onClick={() => setSelectedTicket(ticket)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-1"
                >
                  <Info size={16} />
                  <span>Chi Tiết</span>
                </button>

                <button
                  onClick={() => setExchange({ ticketId: ticket._id, message: "", loading: false })}
                  className="flex-1 px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition flex items-center justify-center gap-1"
                >
                  <Repeat size={16} />
                  <span>Đổi Vé</span>
                </button>
              </div>
            </div>

            {exchange.ticketId === ticket._id && (
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

      {/* Modal for Ticket Details - Áp dụng giao diện từ TicketDetail */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-full overflow-y-auto">
            <div className="p-4 sm:p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <div className="flex items-center">
                  <Ticket className="text-blue-600 mr-3" size={24} />
                  <h2 className="text-2xl font-bold text-gray-800">Chi Tiết Vé</h2>
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition"
                >
                  <X size={18} />
                  <span>Đóng</span>
                </button>
              </div>

              {/* Thông tin lộ trình */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl shadow-sm border border-blue-100 mb-6 relative">
                {/* Trạng thái vé */}
                <div className="absolute right-4 top-4">
                  <div className={`${getStatusColor(selectedTicket.status)} px-3 py-1 rounded-full border text-sm font-medium`}>
                    {selectedTicket.status === "confirmed" ? "Đã xác nhận" : "Chờ xác nhận"}
                  </div>
                </div>

                {/* Thông tin lộ trình */}
                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-blue-600" size={20} />
                    <h3 className="text-xl font-bold">
                      {selectedTicket.route.startPoint}
                      <span className="inline-block mx-2">→</span>
                      {selectedTicket.route.endPoint}
                    </h3>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-8">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar size={16} />
                      <span>
                        {new Date(selectedTicket.departureTimes).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock size={16} />
                      <span>
                        {new Date(selectedTicket.departureTimes)
                          .toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", hour12: false })
                          .replace(":", "h")}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Chi tiết vé */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-sm mb-1">Số ghế</div>
                    <div className="flex items-center gap-2">
                      <Armchair className="text-blue-600" size={18} />
                      <span className="text-lg font-bold">{selectedTicket.seatNumber}</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-sm mb-1">Loại xe</div>
                    <div className="flex items-center gap-2">
                      <Bus className="text-blue-600" size={18} />
                      <span className="text-lg font-bold">{selectedTicket.route.vehicleType || "Xe khách"}</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-sm mb-1">Giá vé</div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="text-blue-600" size={18} />
                      <span className="text-lg font-bold">{selectedTicket.price.toLocaleString()} VND</span>
                    </div>
                  </div>
                </div>

                {/* Mã QR */}
                <div className="flex justify-center mb-2">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 inline-block">
                    <QrCode size={120} className="text-blue-600" />
                    <div className="text-center mt-2 text-sm text-gray-500">Mã vé: {selectedTicket._id}</div>
                  </div>
                </div>
              </div>

              {/* Thông tin nhà xe và hành khách */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Thông tin nhà xe */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Building size={18} className="text-blue-600" />
                    Thông tin nhà xe
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 flex justify-center">
                        <Building size={16} className="text-gray-500" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Tên công ty</div>
                        <div className="font-medium">{selectedTicket.company.name}</div>
                      </div>
                    </div>
                    {selectedTicket.company.email && (
                      <div className="flex items-start gap-3">
                        <div className="w-6 flex justify-center">
                          <Mail size={16} className="text-gray-500" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Email</div>
                          <div className="font-medium">{selectedTicket.company.email}</div>
                        </div>
                      </div>
                    )}
                    {selectedTicket.company.phone && (
                      <div className="flex items-start gap-3">
                        <div className="w-6 flex justify-center">
                          <Phone size={16} className="text-gray-500" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Số điện thoại</div>
                          <div className="font-medium">{selectedTicket.company.phone}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Thông tin hành khách */}
                {selectedTicket.owner && (
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <User size={18} className="text-blue-600" />
                      Thông tin hành khách
                    </h3>
                    <div className="space-y-3">
                      {selectedTicket.owner.name && (
                        <div className="flex items-start gap-3">
                          <div className="w-6 flex justify-center">
                            <User size={16} className="text-gray-500" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Tên hành khách</div>
                            <div className="font-medium">{selectedTicket.owner.name}</div>
                          </div>
                        </div>
                      )}
                      {selectedTicket.owner.email && (
                        <div className="flex items-start gap-3">
                          <div className="w-6 flex justify-center">
                            <Mail size={16} className="text-gray-500" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Email</div>
                            <div className="font-medium">{selectedTicket.owner.email}</div>
                          </div>
                        </div>
                      )}
                      {selectedTicket.owner.phone && (
                        <div className="flex items-start gap-3">
                          <div className="w-6 flex justify-center">
                            <Phone size={16} className="text-gray-500" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Số điện thoại</div>
                            <div className="font-medium">{selectedTicket.owner.phone}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Thông tin thêm */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <CalendarClock size={18} className="text-blue-600" />
                  Thông tin thêm
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Ngày đặt vé</div>
                    <div className="font-medium">
                      {selectedTicket?.createdAt
                        ? new Date(selectedTicket.createdAt).toLocaleString()
                        : "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">ID vé</div>
                    <div className="font-medium text-gray-700 break-all">{selectedTicket.ticketId}</div>
                  </div>
                  {selectedTicket.route.availableSeats !== undefined && (
                    <div>
                      <div className="text-sm text-gray-500">Số chỗ còn trống</div>
                      <div className="font-medium">{selectedTicket.route.availableSeats}</div>
                    </div>
                  )}
                </div>
              </div>


              {/* Nút hành động */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <Download size={18} />
                  <span>Tải vé</span>
                </button>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTickets;