import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams(); // Lấy userId từ URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      setError('Bạn cần đăng nhập.');
      setLoading(false);
      return;
    }

    fetch(`https://exe202-backend-2v40.onrender.com/api/admin/users/${id}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      if (!res.ok) throw new Error('Không thể lấy dữ liệu.');
      return res.json();
    })
    .then(data => setUser(data))
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Không tìm thấy người dùng.</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold">Chi Tiết Người Dùng</h2>
      <p><strong>Tên:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Vai Trò:</strong> {user.role}</p>
      <p><strong>Trạng Thái:</strong> {user.isActive ? 'Hoạt động' : 'Bị khoá'}</p>
      <p><strong>Ngày Tạo:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      
      <div className="mt-4">
        <Link to="/users" className="text-blue-500 hover:underline">Quay lại danh sách</Link>
      </div>
    </div>
  );
};

export default UserDetail;
