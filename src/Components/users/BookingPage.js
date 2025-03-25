import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MapPin,
  CreditCard,
  Calendar,
  Users,
  Building,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  Bus,
  Briefcase,
} from "lucide-react";
import Headeruser from "./Header";
const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const route = location.state?.route;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?.id;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [departureTime, setDepartureTime] = useState("");
  const [availableSeats, setAvailableSeats] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [bookedSeats, setBookedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (route) {
      // Tạo danh sách ghế khả dụng dựa trên số ghế của xe (route.availableSeats)
      setAvailableSeats(
        [...Array(route.availableSeats).keys()].map((i) => (i + 1).toString())
      );

      // Lấy danh sách ghế đã đặt
      const fetchBookedSeats = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://exe202-backend-2v40.onrender.com/api/route/routes/${route._id}/booked-seats`
          );
          setBookedSeats(response.data.bookedSeats || []);
        } catch (err) {
          console.error("Error fetching booked seats:", err);
          setError("Không thể tải danh sách ghế đã đặt.");
        } finally {
          setLoading(false);
        }
      };

      fetchBookedSeats();

      // Chọn mặc định nếu chỉ có 1 giờ khởi hành
      if (route.departureTimes?.length === 1) {
        setDepartureTime(route.departureTimes[0]);
      }
    }
  }, [route]);

  if (!route) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Không tìm thấy tuyến đường
          </h2>
          <p className="text-gray-600 mb-6">
            Không có dữ liệu tuyến đường được cung cấp.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-5 py-3 w-full transition-colors duration-200 flex items-center justify-center"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Yêu cầu đăng nhập
          </h2>
          <p className="text-gray-600 mb-6">
            Vui lòng đăng nhập trước khi đặt vé.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-5 py-3 w-full transition-colors duration-200"
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>
    );
  }

  const handleConfirmBooking = async () => {
    if (!departureTime || selectedSeats.length === 0) {
      setError("Vui lòng chọn thời gian khởi hành và ít nhất một ghế.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "https://exe202-backend-2v40.onrender.com/api/ticket/tickets",
        {
          route: route._id,
          owner: userId,
          seatNumbers: selectedSeats, // Đổi từ seatNumber thành seatNumbers để khớp với backend
          departureTime,
        }
      );
      navigate("/myticket", {
        state: {
          ticketData: response.data.ticket,
          routeInfo: route,
        },
      });
    } catch (error) {
      console.error("Lỗi đặt vé:", error);
      setError(
        error.response?.data?.message || "Đặt vé thất bại, vui lòng thử lại."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa chọn thời gian";
    const date = new Date(dateString);
    if (isNaN(date)) return "Ngày không hợp lệ";
    const [datePart, timePart] = date.toISOString().split("T");
    return `${datePart} ${timePart.substring(0, 5)}`;
  };

  const isSeatBooked = (seat) => bookedSeats.includes(seat);

  const toggleSeatSelection = (seat) => {
    if (isSeatBooked(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const renderSeat = (seat) => {
    const isBooked = isSeatBooked(seat);
    const isSelected = selectedSeats.includes(seat);
    return (
      <button
        key={seat}
        type="button"
        disabled={isBooked}
        onClick={() => toggleSeatSelection(seat)}
        className={`relative flex flex-col items-center justify-center ${isBooked
            ? "cursor-not-allowed opacity-60 bg-gray-200"
            : isSelected
              ? "bg-blue-100 border-blue-500 text-blue-700"
              : "border-gray-300 hover:border-blue-400 text-gray-700 hover:bg-blue-50"
          } transition-all w-12 h-14 border rounded-t-lg mx-1 mb-2`}
      >
        <svg
          viewBox="0 0 24 24"
          className={`w-8 h-8 mb-1 ${isBooked
              ? "text-gray-400"
              : isSelected
                ? "text-blue-600"
                : "text-gray-600"
            }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 11a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" />
          <path d="M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
        </svg>
        <span className="text-xs font-medium">{seat}</span>
        {isSelected && (
          <CheckCircle className="absolute -top-2 -right-2 h-5 w-5 text-blue-600 bg-white rounded-full" />
        )}
      </button>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-blue-600 font-medium">
          Đang tải thông tin ghế...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Headeruser />
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6">

        <div className="max-w-4xl mx-auto mb-6">

        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-xl p-6 text-white">
            <div className="flex items-center mb-1">
              <Bus className="h-6 w-6 mr-2" />
              <h1 className="text-2xl font-bold">Đặt vé xe khách</h1>
            </div>
            <div className="flex items-center mt-4 text-xl font-medium">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-1" />
                <span>{route.startPoint}</span>
              </div>
              <ArrowRight className="mx-3 h-5 w-5" />
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-1" />
                <span>{route.endPoint}</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-b-xl shadow-lg p-6 md:p-8">
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <div className="flex">
                  <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
                  <span className="text-red-700">{error}</span>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Thông tin chuyến đi
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <Building className="h-5 w-5 text-blue-600 mt-1 mr-3" />
                    <div>
                      <span className="block text-sm text-gray-500">
                        Công ty vận tải
                      </span>
                      <span className="font-medium text-gray-900">
                        {route.company.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <CreditCard className="h-5 w-5 text-green-600 mt-1 mr-3" />
                    <div>
                      <span className="block text-sm text-gray-500">Giá vé</span>
                      <span className="font-medium text-gray-900 text-lg">
                        {route.price.toLocaleString()} VND
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600 mt-1 mr-3" />
                    <div>
                      <span className="block text-sm text-gray-500">
                        Số ghế còn trống
                      </span>
                      <span className="font-medium text-gray-900">
                        {route.availableSeats} ghế
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                      <Briefcase className="h-5 w-5 mr-2" />
                      Chính sách vé
                    </h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Vé đã đặt có thể hủy trước 24 giờ khởi hành</li>
                      <li>• Xuất trình CCCD/CMND khi lên xe</li>
                      <li>• Có mặt tại bến trước giờ khởi hành 30 phút</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="border-t pt-6 md:pt-0 md:border-t-0 md:border-l md:pl-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Thông tin đặt vé
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block font-medium text-gray-700 mb-2 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                      Thời gian khởi hành
                    </label>
                    <div className="relative">
                      <select
                        value={departureTime}
                        onChange={(e) => setDepartureTime(e.target.value)}
                        className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <option value="">Chọn thời gian</option>
                        {route.departureTimes?.map((time) => (
                          <option key={time} value={time}>
                            {formatDate(time)}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                        <ChevronLeft className="h-5 w-5 transform rotate-270" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-3 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-blue-600" />
                      Chọn ghế
                    </label>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-2">
                      {/* Chú thích */}
                      <div className="flex items-center justify-between mb-3 text-sm">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded bg-blue-100 border border-blue-500 mr-2"></div>
                          <span>Ghế đã chọn</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded bg-gray-200 border border-gray-300 mr-2"></div>
                          <span>Ghế đã đặt</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded bg-white border border-gray-300 mr-2"></div>
                          <span>Ghế trống</span>
                        </div>
                      </div>


                      {/* Sơ đồ song song */}
                      <div className="flex flex-row justify-center gap-8 mb-6">
                        {/* Tầng 1 */}
                        <div className="w-1/2">
                          <div className="text-center text-lg font-bold text-gray-800 mb-2">
                            Tầng 1
                          </div>
                          {/* Vị trí tài xế */}
                          <div className="flex justify-start w-full mb-8">
                            <div className="bg-gray-800 text-white w-12 h-14 rounded-t-lg ml-6 flex items-center justify-center">
                              <span className="text-xs">Tài xế</span>
                            </div>
                          </div>
                          {/* Ghế tầng 1 */}
                          <div className="grid grid-cols-2 gap-1 mb-6">
                            {renderSeat("1")}
                            {renderSeat("2")}
                          </div>
                          <div className="grid grid-cols-2 gap-1 mb-6">
                            {renderSeat("3")}
                            {renderSeat("4")}
                          </div>
                          <div className="grid grid-cols-2 gap-1 mb-6">
                            {renderSeat("5")}
                            {renderSeat("6")}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-1 mb-6">
                            {renderSeat("7")}
                            {renderSeat("8")}
                          </div>
                          <div className="grid grid-cols-2 gap-1 mb-6">
                            {renderSeat("9")}
                            {renderSeat("10")}
                          </div>
                          <div className="grid grid-cols-2 gap-1 mb-6">
                            {renderSeat("11")}
                            {renderSeat("12")}
                          </div>
                        </div>

                        {/* Tầng 2 */}
                        <div className="w-1/2">
                          <div className="text-center text-lg font-bold text-gray-800 mb-2">
                            Tầng 2
                          </div>
                          {/* Ghế tầng 2 */}
                          <div className="grid grid-cols-2 gap-1 mb-6">
                            {renderSeat("13")}
                            {renderSeat("14")}
                          </div>
                          <div className="grid grid-cols-2 gap-1 mb-6">
                            {renderSeat("15")}
                            {renderSeat("16")}
                          </div>
                          <div className="grid grid-cols-2 gap-1 mb-6">
                            {renderSeat("17")}
                            {renderSeat("18")}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-1 mb-6">
                            {renderSeat("19")}
                            {renderSeat("20")}
                          </div>
                          <div className="grid grid-cols-2 gap-1 mb-6">
                            {renderSeat("21")}
                            {renderSeat("22")}
                          </div>
                          <div className="grid grid-cols-2 gap-1 mb-6">
                            {renderSeat("23")}
                            {renderSeat("24")}
                          </div>
                        </div>
                      </div>
                    </div>



                    <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <p className="text-blue-800 font-medium">
                        {selectedSeats.length > 0
                          ? `Bạn đã chọn ${selectedSeats.length} ghế: ${selectedSeats.join(
                            ", "
                          )}`
                          : "Vui lòng chọn ghế ngồi"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tổng tiền</span>
                      <span className="text-xl font-bold text-blue-700">
                        {(route.price * selectedSeats.length).toLocaleString()} VND
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleConfirmBooking}
                    disabled={
                      isSubmitting ||
                      !departureTime ||
                      selectedSeats.length === 0
                    }
                    className={`mt-6 w-full py-4 px-6 rounded-lg font-medium text-white flex items-center justify-center transition-all ${isSubmitting ||
                        !departureTime ||
                        selectedSeats.length === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Xác nhận đặt vé
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;