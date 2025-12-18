import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchStudents = () => {
    axios.get(`${API_URL}/api/students`)
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const resetForm = () => {
    setName('');
    setEmail('');
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { name, email };
    if (editingId) {
      axios.put(`${API_URL}/api/students/${editingId}`, payload)
        .then(() => { fetchStudents(); resetForm(); })
        .catch(err => console.log(err));
    } else {
      axios.post(`${API_URL}/api/students`, payload)
        .then(() => { fetchStudents(); resetForm(); })
        .catch(err => console.log(err));
    }
  };

  const handleEdit = (s) => {
    setEditingId(s.id);
    setName(s.name || '');
    setEmail(s.email || '');
  };

  const handleDelete = (id) => {
    if (!window.confirm('Xác nhận xóa?')) return;
    axios.delete(`${API_URL}/api/students/${id}`)
      .then(() => fetchStudents())
      .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1> Nguyen Xuan Long Nhat - DH52201154</h1>
      <h2>Danh sách sinh viên</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input placeholder="Tên" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ marginLeft: '8px' }} />
        <button type="submit" style={{ marginLeft: '8px' }}>{editingId ? 'Cập nhật' : 'Thêm'}</button>
        {editingId && <button type="button" onClick={resetForm} style={{ marginLeft: '8px' }}>Hủy</button>}
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Sửa</button>
                <button onClick={() => handleDelete(s.id)} style={{ marginLeft: '8px' }}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;