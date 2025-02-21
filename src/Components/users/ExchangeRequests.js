import { useEffect, useState } from "react";
import axios from "axios";
import { 
  RefreshCw, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Clock,
  MapPin, 
  Bus, 
  CreditCard,
  MessageSquare, 
  CheckCircle,
  XCircle,
  AlertCircle,
  Ticket,
  Loader,
  ArrowRightLeft,
  Tags
} from "lucide-react";

const ExchangeRequests = () => {
  const [exchangeRequests, setExchangeRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRequests = async () => {
      try {
        const response = await axios.get("https://exe202-backend-2v40.onrender.com/api/exchange/exchange-requests");
        setExchangeRequests(response.data);
      } catch (err) {
        setError("Không thể tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };
    fetchExchangeRequests();
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      open: {
        className: "bg-blue-100 text-blue-800 border-blue-200",
        icon: <AlertCircle className="w-4 h-4 mr-1" />,
        label: "Đang mở"
      },
      completed: {
        className: "bg-green-100 text-green-800 border-green-200",
        icon: <CheckCircle className="w-4 h-4 mr-1" />,
        label: "Hoàn thành"
      },
      cancelled: {
        className: "bg-gray-100 text-gray-800 border-gray-200",
        icon: <XCircle className="w-4 h-4 mr-1" />,
        label: "Đã hủy"
      },
      accepted: {
        className: "bg-green-100 text-green-800 border-green-200",
        icon: <CheckCircle className="w-4 h-4 mr-1" />,
        label: "Chấp nhận"
      },
      rejected: {
        className: "bg-red-100 text-red-800 border-red-200",
        icon: <XCircle className="w-4 h-4 mr-1" />,
        label: "Từ chối"
      },
      pending: {
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: <AlertCircle className="w-4 h-4 mr-1" />,
        label: "Chờ xác nhận"
      }
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.className}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "Không rõ";
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader className="w-8 h-8 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <AlertCircle className="w-12 h-12 mb-4" />
        <p className="font-medium text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center mb-6">
        <ArrowRightLeft className="w-6 h-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Danh sách yêu cầu đổi vé</h2>
      </div>

      {exchangeRequests.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-12 border border-gray-200">
          <Ticket className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-gray-600 font-medium text-lg mb-2">Không có yêu cầu đổi vé nào.</p>
          <p className="text-gray-500 text-sm max-w-md text-center">
            Khi người dùng tạo yêu cầu đổi vé, chúng sẽ xuất hiện ở đây để bạn có thể quản lý.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {exchangeRequests.map((request) => {
            const departureTime = formatDateTime(request.requestedTicket.departureTime);
            
            return (
              <div key={request._id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition duration-300">
                {/* Header */}
                <div className="bg-blue-50 border-b border-blue-100 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center">
                    <RefreshCw className="w-5 h-5 text-blue-600 mr-3" />
                    <h3 className="text-lg font-bold text-gray-800">Yêu cầu đổi vé #{request._id.slice(-6)}</h3>
                  </div>
                  {getStatusBadge(request.status)}
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Thông tin người yêu cầu */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <User className="w-4 h-4 text-gray-700 mr-2" />
                        Thông tin người yêu cầu
                      </h4>
                      
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <Tags className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                          <p className="text-sm">
                            <span className="font-semibold text-gray-900">{request.requester.name}</span>
                          </p>
                        </div>
                        
                        <div className="flex items-start">
                          <Mail className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                          <p className="text-sm text-gray-700">{request.requester.email}</p>
                        </div>
                        
                        <div className="flex items-start">
                          <Phone className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                          <p className="text-sm text-gray-700">{request.requester.phone}</p>
                        </div>
                      </div>

                      {/* Lời nhắn của người yêu cầu */}
                      {request.message && (
                        <div className="mt-4 bg-white rounded-lg p-3 border border-gray-200">
                          <div className="flex items-start">
                            <MessageSquare className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700 italic">"{request.message}"</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Thông tin vé yêu cầu */}
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <Ticket className="w-4 h-4 text-blue-700 mr-2" />
                        Thông tin vé yêu cầu đổi
                      </h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <MapPin className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">
                            <span className="font-semibold text-gray-900">{request.requestedTicket.route}</span>
                          </p>
                        </div>
                        
                        <div className="flex items-start">
                          <Bus className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">
                            {request.requestedTicket.company?.name || "Không rõ"}
                          </p>
                        </div>
                        
                        <div className="flex items-start">
                          <Calendar className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-700">{departureTime.date}</p>
                            <div className="flex items-center mt-1">
                              <Clock className="w-3 h-3 text-gray-500 mr-1" />
                              <p className="text-xs text-gray-600">{departureTime.time}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <CreditCard className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">
                            Ghế số: <span className="font-medium">{request.requestedTicket.seatNumber}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hiển thị danh sách phản hồi */}
                  {request.responses.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center border-b pb-2">
                        <MessageSquare className="w-5 h-5 text-blue-600 mr-2" />
                        Phản hồi ({request.responses.length})
                      </h4>
                      
                      <div className="space-y-4">
                        {request.responses.map((response) => {
                          const offerDepartureTime = formatDateTime(response.offeredTicket?.departureTime);
                          
                          return (
                            <div key={response._id} className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition">
                              {/* Response Header */}
                              <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
                                <div className="flex items-center">
                                  <User className="w-4 h-4 text-gray-600 mr-2" />
                                  <span className="font-medium text-gray-800">
                                    {response.responder?.name || "Ẩn danh"}
                                  </span>
                                </div>
                                {getStatusBadge(response.status)}
                              </div>
                              
                              <div className="p-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                  {/* Thông tin người phản hồi */}
                                  <div className="space-y-2">
                                    <div className="flex items-start">
                                      <Mail className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                                      <p className="text-sm text-gray-700">
                                        {response.responder?.email || "Không rõ"}
                                      </p>
                                    </div>
                                    
                                    <div className="flex items-start">
                                      <Phone className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                                      <p className="text-sm text-gray-700">
                                        {response.responder?.phone || "Không rõ"}
                                      </p>
                                    </div>
                                    
                                    {/* Lời nhắn của người phản hồi */}
                                    {response.message && (
                                      <div className="mt-2 bg-blue-50 rounded-lg p-3 border border-blue-100">
                                        <div className="flex items-start">
                                          <MessageSquare className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                          <p className="text-sm text-gray-700 italic">"{response.message}"</p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Thông tin vé đề nghị */}
                                  <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                                    <h5 className="font-medium text-gray-800 mb-2 flex items-center">
                                      <Ticket className="w-4 h-4 text-green-600 mr-1" />
                                      Vé đề nghị
                                    </h5>
                                    
                                    <div className="space-y-2">
                                      <div className="flex items-start">
                                        <MapPin className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm text-gray-700">
                                          {response.offeredTicket?.route || "Không rõ"}
                                        </p>
                                      </div>
                                      
                                      <div className="flex items-start">
                                        <Bus className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm text-gray-700">
                                          {response.offeredTicket?.company?.name || "Không rõ"}
                                        </p>
                                      </div>
                                      
                                      <div className="flex items-start">
                                        <Calendar className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                                        <div>
                                          <p className="text-sm text-gray-700">{offerDepartureTime.date}</p>
                                          <div className="flex items-center mt-1">
                                            <Clock className="w-3 h-3 text-gray-500 mr-1" />
                                            <p className="text-xs text-gray-600">{offerDepartureTime.time}</p>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div className="flex items-start">
                                        <CreditCard className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm text-gray-700">
                                          Ghế số: <span className="font-medium">{response.offeredTicket?.seatNumber || "Không rõ"}</span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExchangeRequests;