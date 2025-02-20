import { useEffect, useState } from "react";
import axios from "axios";

const ExchangeRequests = () => {
  const [exchangeRequests, setExchangeRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/exchange/exchange-requests");
        setExchangeRequests(response.data);
      } catch (err) {
        setError("Không thể tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };
    fetchExchangeRequests();
  }, []);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Danh sách yêu cầu đổi vé</h2>
      {exchangeRequests.length === 0 ? (
        <p>Không có yêu cầu đổi vé nào.</p>
      ) : (
        <div className="grid gap-4">
          {exchangeRequests.map((request) => (
            <div key={request._id} className="p-4 border rounded-lg shadow-md bg-white">
              {/* Thông tin người yêu cầu */}
              <h3 className="text-lg font-bold">{request.requester.name}</h3>
              <p><strong>Email:</strong> {request.requester.email}</p>
              <p><strong>Điện thoại:</strong> {request.requester.phone}</p>

              {/* Thông tin vé yêu cầu */}
              <div className="mt-3">
                <h4 className="font-semibold">Thông tin vé yêu cầu:</h4>
                <p><strong>Chuyến xe:</strong> {request.requestedTicket.route}</p>
                <p><strong>Nhà xe:</strong> {request.requestedTicket.company?.name || "Không rõ"}</p>
                <p><strong>Thời gian khởi hành:</strong> {new Date(request.requestedTicket.departureTime).toLocaleString()}</p>
                <p><strong>Số ghế:</strong> {request.requestedTicket.seatNumber}</p>
              </div>

              {/* Trạng thái của yêu cầu */}
              <p className="mt-2">
                <strong>Trạng thái:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-white ${request.status === 'open' ? 'bg-blue-500' : request.status === 'completed' ? 'bg-green-500' : 'bg-gray-500'}`}>
                  {request.status}
                </span>
              </p>

              {/* Lời nhắn của người yêu cầu */}
              {request.message && (
                <p className="italic text-gray-600 mt-2">💬 "{request.message}"</p>
              )}

              {/* Hiển thị danh sách phản hồi */}
              {request.responses.length > 0 && (
                <div className="mt-4 p-3 border-t">
                  <h4 className="font-semibold">Phản hồi:</h4>
                  {request.responses.map((response) => (
                    <div key={response._id} className="mt-2 p-2 bg-gray-100 rounded-md">
                      {/* Thông tin người phản hồi */}
                      <p><strong>Người phản hồi:</strong> {response.responder?.name || "Ẩn danh"}</p>
                      <p><strong>Email:</strong> {response.responder?.email || "Không rõ"}</p>
                      <p><strong>Điện thoại:</strong> {response.responder?.phone || "Không rõ"}</p>

                      {/* Thông tin vé đề nghị */}
                      <div className="mt-2">
                        <h4 className="font-semibold">Vé đề nghị:</h4>
                        <p><strong>Chuyến xe:</strong> {response.offeredTicket?.route || "Không rõ"}</p>
                        <p><strong>Nhà xe:</strong> {response.offeredTicket?.company?.name || "Không rõ"}</p>
                        <p><strong>Thời gian:</strong> {response.offeredTicket?.departureTime ? new Date(response.offeredTicket.departureTime).toLocaleString() : "Không rõ"}</p>
                        <p><strong>Số ghế:</strong> {response.offeredTicket?.seatNumber || "Không rõ"}</p>
                      </div>

                      {/* Trạng thái phản hồi */}
                      <p className="mt-2">
                        <strong>Trạng thái:</strong> 
                        <span className={`ml-1 px-2 py-1 rounded text-white ${response.status === 'accepted' ? 'bg-green-500' : response.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                          {response.status}
                        </span>
                      </p>

                      {/* Lời nhắn của người phản hồi */}
                      {response.message && (
                        <p className="italic text-gray-600">💬 "{response.message}"</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExchangeRequests;
