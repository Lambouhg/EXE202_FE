import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Ticket,
  Calendar,
  MapPin,
  User,
  CreditCard,
  Clock,
  ArrowLeft,
  Building,
  Phone,
  Mail,
  Bus,
  Armchair,
  TicketCheck,
  Loader,
  AlertCircle,
  CalendarClock,
  QrCode,
  Download
} from "lucide-react";

const TicketDetail = () => {
  const { ticketId } = useParams(); // Lấy ID vé từ URL
  const [ticket, setTicket] = useState(null); // Lưu thông tin vé cụ thể
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicketDetail = async () => {
      setLoading(true);
      const storedUser = localStorage.getItem("userInfo");
      if (!storedUser) {
        setError("Bạn chưa đăng nhập.");
        setLoading(false);
        return;
      }
      try {
        const { id: userId } = JSON.parse(storedUser);
        // Gọi API để lấy danh sách vé của người dùng
        const { data } = await axios.get(`https://exe202-backend-2v40.onrender.com/api/ticket/user/${userId}`);
        // Tìm vé cụ thể dựa trên `ticketId`
        const ticketFound = data.data.find(t => t.ticketId === ticketId);
        if (!ticketFound) {
          setError("Không tìm thấy thông tin vé.");
        } else {
          setTicket(ticketFound); // Lưu thông tin vé vào state
        }
      } catch (err) {
        setError(err.response?.data?.message || "Lỗi khi tải thông tin vé.");
      } finally {
        setLoading(false);
      }
    };
    fetchTicketDetail();
  }, [ticketId]);

  const getStatusColor = (status) => {
    return status === "confirmed"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-amber-100 text-amber-800 border-amber-200";
  };

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-blue-600 mr-2" size={24} />
        <p className="text-gray-600 font-medium">Đang tải thông tin vé...</p>
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

  if (!ticket) {
    return (
      <div className="flex flex-col justify-center items-center h-64 bg-gray-50 rounded-xl p-8">
        <TicketCheck className="text-gray-400 mb-4" size={48} />
        <p className="text-gray-500 font-medium text-lg">Không tìm thấy thông tin vé.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Quay lại danh sách vé
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <div className="flex items-center">
          <Ticket className="text-blue-600 mr-3" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Chi Tiết Vé</h2>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition"
        >
          <ArrowLeft size={18} />
          <span>Quay lại</span>
        </button>
      </div>

      {/* Thông tin lộ trình */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl shadow-sm border border-blue-100 mb-6 relative">
        {/* Trạng thái vé */}
        <div className="absolute right-4 top-4">
          <div className={`${getStatusColor(ticket.status)} px-3 py-1 rounded-full border text-sm font-medium`}>
            {ticket.status === "confirmed" ? "Đã xác nhận" : "Chờ xác nhận"}
          </div>
        </div>

        {/* Thông tin lộ trình */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="text-blue-600" size={20} />
            <h3 className="text-xl font-bold">
              {ticket.route.startPoint}
              <span className="inline-block mx-2">→</span>
              {ticket.route.endPoint}
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-8">
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar size={16} />
              <span>{formatDate(ticket.route.departureTime)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock size={16} />
              <span>{formatTime(ticket.route.departureTime)}</span>
            </div>
          </div>
        </div>

        {/* Chi tiết vé */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm mb-1">Số ghế</div>
            <div className="flex items-center gap-2">
              <Armchair className="text-blue-600" size={18} />
              <span className="text-lg font-bold">{ticket.seatNumber}</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm mb-1">Loại xe</div>
            <div className="flex items-center gap-2">
              <Bus className="text-blue-600" size={18} />
              <span className="text-lg font-bold">{ticket.route.vehicleType || "Xe khách"}</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm mb-1">Giá vé</div>
            <div className="flex items-center gap-2">
              <CreditCard className="text-blue-600" size={18} />
              <span className="text-lg font-bold">{ticket.price.toLocaleString()} VND</span>
            </div>
          </div>
        </div>

        {/* Mã QR */}
        <div className="flex justify-center mb-2">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 inline-block">
            <QrCode size={120} className="text-blue-600" />
            <div className="text-center mt-2 text-sm text-gray-500">Mã vé: {ticket.ticketId}</div>
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
                <div className="font-medium">{ticket.company.name}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 flex justify-center">
                <Mail size={16} className="text-gray-500" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-medium">{ticket.company.email}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 flex justify-center">
                <Phone size={16} className="text-gray-500" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Số điện thoại</div>
                <div className="font-medium">{ticket.company.phone}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin hành khách */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <User size={18} className="text-blue-600" />
            Thông tin hành khách
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 flex justify-center">
                <User size={16} className="text-gray-500" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Tên hành khách</div>
                <div className="font-medium">{ticket.owner.name}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 flex justify-center">
                <Mail size={16} className="text-gray-500" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-medium">{ticket.owner.email}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 flex justify-center">
                <Phone size={16} className="text-gray-500" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Số điện thoại</div>
                <div className="font-medium">{ticket.owner.phone}</div>
              </div>
            </div>
          </div>
        </div>
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
            <div className="font-medium">{formatDate(ticket.createdAt)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">ID vé</div>
            <div className="font-medium text-gray-700 break-all">{ticket.ticketId}</div>
          </div>
          {ticket.route.availableSeats !== undefined && (
            <div>
              <div className="text-sm text-gray-500">Số chỗ còn trống</div>
              <div className="font-medium">{ticket.route.availableSeats}</div>
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
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default TicketDetail;