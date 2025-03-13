import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', role: 'user', isActive: true });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

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
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(err => setError('Không thể tải dữ liệu.'))
    .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('userToken');

    fetch(`https://exe202-backend-2v40.onrender.com/api/admin/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      setMessage('Cập nhật thành công!');
      setTimeout(() => navigate('/users'), 1500);
    })
    .catch(err => setError('Cập nhật thất bại.'));
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold">Chỉnh Sửa Người Dùng</h2>
      {message && <p className="text-green-500">{message}</p>}

      <form onSubmit={handleUpdate}>
        <label className="block mt-2">Tên:</label>
        <input type="text" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} className="border p-2 w-full"/>

        <label className="block mt-2">Email:</label>
        <input type="email" value={user.email} readOnly className="border p-2 w-full bg-gray-100"/>

        <label className="block mt-2">Vai Trò:</label>
        <select value={user.role} onChange={(e) => setUser({...user, role: e.target.value})} className="border p-2 w-full">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <label className="block mt-2">Trạng Thái:</label>
        <select value={user.isActive} onChange={(e) => setUser({...user, isActive: e.target.value === 'true'})} className="border p-2 w-full">
          <option value="true">Hoạt động</option>
          <option value="false">Bị khoá</option>
        </select>

        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Cập nhật</button>
      </form>
    </div>
  );
};

export default EditUser;
