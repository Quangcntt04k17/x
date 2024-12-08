import React, { useState, useEffect } from 'react';
import './XemLichKham.css';

const XemLichKham = () => {
  const [statusAppointments, setStatusAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(10); // Thay đổi từ 5 thành 10
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [newAppointmentData, setNewAppointmentData] = useState({
    patient: '',
    soDienThoai: '',
    email: '',
    appointment_date: '',
    appointment_time: '',
    status: ''
  });
  const [searchDate, setSearchDate] = useState('');
  const accessToken = localStorage.getItem("access_token");

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8888/api/appointments/');
        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu từ server');
        }
        const data = await response.json();
        setStatusAppointments(data);
        setFilteredAppointments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const updateAppointmentStatus = async (appointmentId, appointment, newStatus) => {
    const newData = {
      patient: appointment.patient,
      soDienThoai: appointment.soDienThoai,
      email: appointment.email,
      appointment_date: appointment.appointment_date,
      appointment_time: appointment.appointment_time,
      status: newStatus,
    };
    try {
      const response = await fetch(`http://127.0.0.1:8888/api/appointments/${appointmentId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error('Không thể cập nhật trạng thái');
      }

      setStatusAppointments(prevAppointments =>
        prevAppointments.map(appointment =>
          appointment.id === appointmentId ? { ...appointment, status: newStatus } : appointment
        )
      );

      if (newStatus === 'Cancelled') {
        alert('Hủy lịch thành công');
      } else if (newStatus === 'Confirmed') {
        alert('Xác nhận đặt lịch thành công');
      } else if (newStatus === 'Confirmed') {
        alert('Xác nhận đã khám thành công');
      }
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  const updateAppointmentData = async (appointmentId) => {
    const updatedData = {
      patient: newAppointmentData.patient,
      soDienThoai: newAppointmentData.soDienThoai,
      email: newAppointmentData.email,
      appointment_date: newAppointmentData.appointment_date,
      appointment_time: newAppointmentData.appointment_time,
      status: newAppointmentData.status
    };

    try {
      const response = await fetch(`http://127.0.0.1:8888/api/appointments/${appointmentId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Không thể cập nhật thông tin lịch hẹn');
      }

      alert('Cập nhật thông tin lịch hẹn thành công!');
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>Đã xảy ra lỗi: {error}</div>;
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredAppointments.length / appointmentsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleChange = (status) => {
    const filtered = statusAppointments.filter(appointment => appointment.status === status);
    setFilteredAppointments(filtered);
  };

  const handleEditClick = (appointment) => {
    setEditingAppointment(appointment);
    setNewAppointmentData({
      patient: appointment.patient,
      soDienThoai: appointment.soDienThoai,
      email: appointment.email,
      appointment_date: appointment.appointment_date,
      appointment_time: appointment.appointment_time,
      status: appointment.status
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearchDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  const filterAppointmentsByDate = () => {
    if (!searchDate) {
      setFilteredAppointments(statusAppointments);
    } else {
      const filtered = statusAppointments.filter(appointment =>
        (appointment.status === 'Confirmed' || appointment.status === 'Pending') &&
        appointment.appointment_date === searchDate
      );
      setFilteredAppointments(filtered);
    }
  };

  const handleViewAll = () => {
    setFilteredAppointments(statusAppointments);
    setSearchDate('');
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'Đã xác nhận';
      case 'Cancelled':
        return 'Đã hủy';
      case 'Pending':
        return 'Đang chờ';
      case 'Completed':
        return 'Đã khám';
      default:
        return status;
    }
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9' }}>
      <div className="navbar-divider"></div>
      <div className="filter-search-container" style={{ backgroundColor: '#f9f9f9' }}>
        <div className="filter-buttons">
          <button onClick={handleViewAll}>Xem tất cả</button>
          <button onClick={() => handleChange('Pending')}>Đang chờ</button>
          <button onClick={() => handleChange('Confirmed')}>Đã xác nhận</button>
          <button onClick={() => handleChange('Cancelled')}>Đã hủy</button>
          <button onClick={() => handleChange('Completed')}>Đã khám</button>
        </div>

        <div className="search-container">
          <input
            type="date"
            value={searchDate}
            onChange={handleSearchDateChange}
          />
          <button onClick={filterAppointmentsByDate}>Tìm kiếm</button>
        </div>
      </div>

      <div className="danh-sach-lich-hen">
        <h1>Danh Sách Lịch Hẹn</h1>

        {filteredAppointments.length === 0 ? (
          <div>Không có lịch hẹn nào trong trạng thái này.</div>
        ) : (
          <table className="lich-hen-table">
            <thead>
              <tr style={{ color: 'green' }}>
                <th>ID</th>
                <th>Tên Bệnh Nhân</th>
                <th>Số Điện Thoại</th>
                <th>Email</th>
                <th>Ngày</th>
                <th>Thời Gian</th>
                <th>Trạng Thái</th>
                {filteredAppointments.some(appointment => appointment.status !== 'Completed' && appointment.status !== 'Cancelled') && (
                  <th>Thao Tác</th>
                )}
              </tr>
            </thead>
            <tbody>
              {currentAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.patient}</td>
                  <td>{appointment.soDienThoai}</td>
                  <td>{appointment.email}</td>
                  <td> {new Date(appointment.appointment_date).toLocaleDateString("vi-VN")}</td>
                  <td>
                    {appointment.appointment_time ?
                      appointment.appointment_time.split(':').slice(0, 2).join(':') :
                      "N/A"
                    }
                  </td>

                  <td>{getStatusText(appointment.status)}</td>

                  {appointment.status !== 'Completed' && appointment.status !== 'Cancelled' && (
                    <td>
                      {appointment.status === 'Confirmed' ? (
                        <>
                          <button className="btn-edit" onClick={() => handleEditClick(appointment)}>Sửa</button>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, appointment, 'Completed')}
                            className="btn-completed"
                          >
                            Đã khám
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, appointment, 'Cancelled')}
                            className="btn-cancel"
                          >
                            Hủy
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, appointment, 'Confirmed')}
                            className="btn-confirm"
                          >
                            Xác Nhận
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, appointment, 'Cancelled')}
                            className="btn-cancel"
                          >
                            Hủy
                          </button>
                        </>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="pagination">
          {pageNumbers.map(number => (
            <button key={number} onClick={() => paginate(number)} className="page-button">
              {number}
            </button>
          ))}
        </div>
      </div>

      {editingAppointment && (
        <div className="modal-overlay">
          <div className="edit-appointment-modal">
            <h2>Sửa Thông Tin Lịch Hẹn</h2>
            <form onSubmit={(e) => { e.preventDefault(); updateAppointmentData(editingAppointment.id); }}>
              <div>
                <label>Tên Bệnh Nhân</label>
                <input
                  type="text"
                  name="patient"
                  value={newAppointmentData.patient}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Số Điện Thoại</label>
                <input
                  type="text"
                  name="soDienThoai"
                  value={newAppointmentData.soDienThoai}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={newAppointmentData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Ngày</label>
                <input
                  type="date"
                  name="appointment_date"
                  value={newAppointmentData.appointment_date}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Thời Gian</label>
                <input
                  type="time"
                  name="appointment_time"
                  value={newAppointmentData.appointment_time}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit">Lưu</button>
              <button type="button" onClick={() => setEditingAppointment(null)}>Đóng</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XemLichKham;
