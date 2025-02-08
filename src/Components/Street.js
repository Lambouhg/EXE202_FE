import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRouteForm = () => {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    companyId: "",
    startPoint: "",
    endPoint: "",
    availableSeats: "",
  });

  // Lấy danh sách công ty xe buýt
  useEffect(() => {
    axios
      .get("https://exe202-backend-l4pe.onrender.com/api/busCompany/get-companies")
      .then((response) => setCompanies(response.data))
      .catch((error) => console.error("Lỗi tải công ty:", error));
  }, []);

  // Xử lý thay đổi dữ liệu input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gửi dữ liệu lên server
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        availableSeats: Number(formData.availableSeats),
      };

      const response = await axios.post(
        "https://exe202-backend-l4pe.onrender.com/api/route/createRoute",
        formattedData
      );
      toast.success(response.data.message);
      setFormData({
        companyId: "",
        startPoint: "",
        endPoint: "",
        availableSeats: "",
      });
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error("Thêm tuyến đường thất bại!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Đặt Tuyến Xe
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Chọn Công Ty:
          </label>
          <select
            name="companyId"
            value={formData.companyId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chọn công ty</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Điểm Xuất Phát:
          </label>
          <input
            type="text"
            name="startPoint"
            value={formData.startPoint}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Điểm Kết Thúc:
          </label>
          <input
            type="text"
            name="endPoint"
            value={formData.endPoint}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Số Ghế :
          </label>
          <input
            type="number"
            name="availableSeats"
            value={formData.availableSeats}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Đặt Tuyến
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default AddRouteForm;
