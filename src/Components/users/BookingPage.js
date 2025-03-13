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

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const route = location.state?.route;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?.id;

  const [seatNumber, setSeatNumber] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [availableSeats, setAvailableSeats] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [bookedSeats, setBookedSeats] = useState([]); // Mảng ghế đã đặt (từ API)
  const [loading, setLoading] = useState(true); // Trạng thái tải

  useEffect(() => {
    if (route?.availableSeats) {
      // Tạo danh sách số ghế từ 1 đến route.availableSeats
      setAvailableSeats(
        [...Array(route.availableSeats).keys()].map((i) => (i + 1).toString())
      );

      // Gọi API để lấy danh sách ghế đã đặt
      const fetchBookedSeats = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://exe202-backend-2v40.onrender.com/api/route/routes/${route._id}/booked-seats`
          );
          setBookedSeats(response.data.bookedSeats);
        } catch (err) {
          console.error("Error fetching booked seats:", err);
          setError("Không thể tải danh sách ghế đã đặt.");
        } finally {
          setLoading(false);
        }
      };

      fetchBookedSeats();
    }

    // Nếu chỉ có 1 giờ khởi hành, chọn mặc định
    if (route?.departureTimes?.length === 1) {
      setDepartureTime(route.departureTimes[0]);
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
    if (!departureTime || !seatNumber) {
      setError("Vui lòng chọn thời gian khởi hành và số ghế.");
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
          seatNumber,
          departureTime,
        }
      );
      // Hiển thị thành công
      navigate("/myticket", {
        state: {
          ticketData: response.data,
          routeInfo: route,
        },
      });
    } catch (error) {
      console.error("Lỗi đặt vé:", error);
      setError(error.response?.data?.message || "Đặt vé thất bại, vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  // Kiểm tra ghế đã đặt
  const isSeatBooked = (seat) => {
    return bookedSeats.includes(seat);
  };

  // Render một ghế
  const renderSeat = (seat) => {
    const isBooked = isSeatBooked(seat);
    const isSelected = seat === seatNumber;
    return (
      <button
        key={seat}
        type="button"
        disabled={isBooked}
        onClick={() => !isBooked && setSeatNumber(seat)}
        className={`relative flex flex-col items-center justify-center ${
          isBooked
            ? "cursor-not-allowed opacity-60 bg-gray-200"
            : isSelected
            ? "bg-blue-100 border-blue-500 text-blue-700"
            : "border-gray-300 hover:border-blue-400 text-gray-700 hover:bg-blue-50"
        } transition-all w-12 h-14 border rounded-t-lg mx-1 mb-2`}
      >
        {/* Icon ghế */}
        <svg
          viewBox="0 0 24 24"
          className={`w-8 h-8 mb-1 ${
            isBooked ? "text-gray-400" : isSelected ? "text-blue-600" : "text-gray-600"
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
        {/* Số ghế */}
        <span className="text-xs font-medium">{seat}</span>
        {/* Dấu check khi ghế được chọn */}
        {isSelected && (
          <CheckCircle className="absolute -top-2 -right-2 h-5 w-5 text-blue-600 bg-white rounded-full" />
        )}
      </button>
    );
  };

  // Hiển thị trạng thái tải
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-blue-600 font-medium">Đang tải thông tin ghế...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6">
      {/* Back button */}
      <div className="max-w-4xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span>Quay lại tìm kiếm</span>
        </button>
      </div>
      <div className="max-w-4xl mx-auto">
        {/* Header with route info */}
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
        {/* Main content */}
        <div className="bg-white rounded-b-xl shadow-lg p-6 md:p-8">
          {/* Error message */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <div className="flex">
                <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column - Trip information */}
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
            {/* Right column - Booking form */}
            <div className="border-t pt-6 md:pt-0 md:border-t-0 md:border-l md:pl-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Thông tin đặt vé
              </h2>
              <div className="space-y-6">
                {/* Departure time selection */}
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
                {/* Seat selection - BUS LAYOUT */}
                <div>
                  <label className="block font-medium text-gray-700 mb-3 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-600" />
                    Chọn ghế
                  </label>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-2">
                    {/* Màu chú thích */}
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
                    {/* Mui xe */}
                    <div className="relative mb-6 mt-3">
                      <div className="h-8 bg-blue-500 rounded-t-3xl w-20 mx-auto"></div>
                      <div className="text-center text-sm font-medium text-blue-600 mt-1">
                        Phía trước
                      </div>
                    </div>
                    {/* Sơ đồ ghế */}
                    <div className="flex flex-col items-center mb-6">
                      {/* Hàng ghế tài xế */}
                      <div className="flex justify-end w-full mb-8">
                        <div className="bg-gray-800 text-white w-12 h-14 rounded-t-lg mr-6 flex items-center justify-center">
                          <span className="text-xs">Tài xế</span>
                        </div>
                      </div>
                      {/* Hàng ghế 1-4 */}
                      <div className="grid grid-cols-4 gap-1 mb-6">
                        {renderSeat("1")}
                        {renderSeat("2")}
                        <div className="w-12"></div> {/* Khoảng trống lối đi */}
                        {renderSeat("3")}
                      </div>
                      {/* Hàng ghế 5-8 */}
                      <div className="grid grid-cols-4 gap-1 mb-6">
                        {renderSeat("4")}
                        {renderSeat("5")}
                        <div className="w-12"></div> {/* Khoảng trống lối đi */}
                        {renderSeat("6")}
                      </div>
                      {/* Hàng ghế 9-12 */}
                      <div className="grid grid-cols-4 gap-1 mb-6">
                        {renderSeat("7")}
                        {renderSeat("8")}
                        <div className="w-12"></div> {/* Khoảng trống lối đi */}
                        {renderSeat("9")}
                      </div>
                      {/* Hàng ghế 13-16 */}
                      <div className="grid grid-cols-4 gap-1 mb-6">
                        {renderSeat("10")}
                        {renderSeat("11")}
                        <div className="w-12"></div> {/* Khoảng trống lối đi */}
                        {renderSeat("12")}
                      </div>
                      {/* Hàng ghế 17-20 */}
                      <div className="grid grid-cols-4 gap-1 mb-6">
                        {renderSeat("13")}
                        {renderSeat("14")}
                        <div className="w-12"></div> {/* Khoảng trống lối đi */}
                        {renderSeat("15")}
                      </div>
                      {/* Hàng ghế 21-24 */}
                      <div className="grid grid-cols-4 gap-1 mb-6">
                        {renderSeat("16")}
                        {renderSeat("17")}
                        <div className="w-12"></div> {/* Khoảng trống lối đi */}
                        {renderSeat("18")}
                      </div>
                      {/* Hàng ghế cuối - 5 ghế */}
                      <div className="grid grid-cols-5 gap-1">
                        {renderSeat("19")}
                        {renderSeat("20")}
                        {renderSeat("21")}
                        {renderSeat("22")}
                        {renderSeat("23")}
                      </div>
                    </div>
                    <div className="text-center text-sm font-medium text-blue-600 mt-3 mb-1">
                      Phía sau
                    </div>
                  </div>
                  {/* Ghế đã chọn */}
                  <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p className="text-blue-800 font-medium">
                      {seatNumber
                        ? `Bạn đã chọn ghế số ${seatNumber}`
                        : "Vui lòng chọn ghế ngồi"}
                    </p>
                  </div>
                </div>
                {/* Price summary */}
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tổng tiền</span>
                    <span className="text-xl font-bold text-blue-700">
                      {route.price.toLocaleString()} VND
                    </span>
                  </div>
                </div>
                {/* Confirm button */}
                <button
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting || !departureTime || !seatNumber}
                  className={`mt-6 w-full py-4 px-6 rounded-lg font-medium text-white flex items-center justify-center transition-all ${
                    isSubmitting || !departureTime || !seatNumber
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
  );
};

export default BookingPage;