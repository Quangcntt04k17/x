import React, { useState } from 'react';
import "./DatLichKham.css";

const DatLichKham = () => {
  // Định nghĩa các state cho các trường trong form
  const [patient, setPatient] = useState('');
  const [soDienThoai, setSoDienThoai] = useState('');
  const [email, setEmail] = useState('');
  const [appointment_date, setAppointment_date] = useState('');
  const [appointment_time, setAppointment_time] = useState('');

  // State để kiểm tra khi hiển thị Modal xác nhận
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra thời gian có nằm trong khoảng từ 7:00 AM đến 4:00 PM không
    const time = new Date(`1970-01-01T${appointment_time}:00`);
    const startTime = new Date('1970-01-01T07:00:00');
    const endTime = new Date('1970-01-01T16:00:00');

    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 2);  // Thêm 2 ngày vào ngày hôm nay
    const phoneRegex = /^0\d{9}$/;

    const selectedDate = new Date(appointment_date);
    if (!phoneRegex.test(soDienThoai)) {
      alert("Số điện thoại không hợp lệ! (Yêu cầu đúng 10 ký tự số, bắt đầu bằng 0)");
      return
    } else if (selectedDate < minDate) {
      alert("Ngày đặt hẹn phải muộn hơn ngày hôm nay ít nhất 2 ngày!");
      return;
    } else if (time < startTime || time > endTime) {
      alert("Vui lòng chọn thời gian trong khoảng từ 7:00 AM đến 4:00 PM!");
      return;
    }
    const appointmentData = { patient, soDienThoai, email, appointment_date, appointment_time };

  // Log dữ liệu gửi đi
  console.log("Appointment Data:", appointmentData);

    setIsSubmitted(true);  // Hiển thị Modal xác nhận
  };

  // Xử lý khi người dùng xác nhận đặt lịch
  const handleConfirm = async () => {
    const appointmentData = { patient, soDienThoai, email, appointment_date, appointment_time };

    try {
      const response = await fetch('http://127.0.0.1:8888/api/create_appointments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        // Nếu thành công, set trạng thái thành công
        setIsSuccess(true);
        setIsSubmitted(false);  // Đóng Modal
        alert("Đặt lịch thành công")
      } else {
        setIsSuccess(false);
        alert('Có lỗi xảy ra khi lưu thông tin!');
      }
    } catch (error) {
      setIsSuccess(false);
      alert('Không thể kết nối đến server. Vui lòng thử lại!');
    }
  };

  // Xử lý khi người dùng muốn chỉnh sửa thông tin
  const handleEdit = () => {
    setIsSubmitted(false);  // Đóng Modal và quay lại form
  };

  return (
    <div className="tong">
      <div className="content">
        <h1>Đặt Lịch Khám</h1>
        <p>_________________________</p>
        <div className="container">
          {/* Phần thông báo lưu ý */}
          <div className="note">
            <h2>LƯU Ý:</h2>
            <ul>
              <li>Lịch hẹn chỉ có hiệu lực khi Quý khách được xác nhận chính thức từ Bệnh viện.</li>
              <li>Vui lòng đặt hẹn ít nhất 48h trước khi đến khám.</li>
              <li>Cung cấp thông tin chính xác để được hỗ trợ nhanh nhất.</li>
              <li>Liên hệ số hotline nếu cần hỗ trợ khẩn cấp:</li>
            </ul>
            <div className="hotline">
              <p>Hotline: <strong>1900 555 553</strong></p>
            </div>
          </div>

          {/* Form đặt lịch khám */}
          {!isSubmitted ? (
            <div className="form-container">
              <h2>ĐẶT LỊCH KHÁM MẮT</h2>
              <form id="appointmentForm" onSubmit={handleSubmit}>
                <label htmlFor="patient">Họ và tên:</label>
                <input
                  type="text"
                  id="patient"
                  placeholder="Nhập họ và tên"
                  value={patient}
                  onChange={(e) => setPatient(e.target.value)}
                  required
                />

                <label htmlFor="soDienThoai">Số điện thoại:</label>
                <input
                  type="tel"
                  id="soDienThoai"
                  placeholder="Nhập số điện thoại"
                  value={soDienThoai}
                  onChange={(e) => setSoDienThoai(e.target.value)}
                  required
                />

                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="appointment_date">Ngày đặt hẹn:</label>
                <input
                  type="date"
                  id="appointment_date"
                  value={appointment_date}
                  onChange={(e) => setAppointment_date(e.target.value)}
                  required
                />

                <label htmlFor="appointment_time">Thời gian:</label>
                <input
                  type="time"
                  id="appointment_time"
                  value={appointment_time}
                  onChange={(e) => setAppointment_time(e.target.value)}
                  required
                  min="07:00"
                  max="16:00"
                />
                <button type="submit" className='btn'>Đặt Lịch Hẹn</button>
              </form>
            </div>
          ) : (
            <div className="modal">
              <div className="modal-content">
                <h2>Xác Nhận Thông Tin</h2>

                {/* Hiển thị thông tin trong bảng */}
                <table className="confirmation-table">
                  <tbody>
                    <tr>
                      <td><strong>Họ và tên:</strong></td>
                      <td>{patient}</td>
                    </tr>
                    <tr>
                      <td><strong>Số điện thoại:</strong></td>
                      <td>{soDienThoai}</td>
                    </tr>
                    <tr>
                      <td><strong>Email:</strong></td>
                      <td>{email}</td>
                    </tr>
                    <tr>
                      <td><strong>Ngày đặt hẹn:</strong></td>
                      <td>{appointment_date}</td>
                    </tr>
                    <tr>
                      <td><strong>Thời gian:</strong></td>
                      <td>{appointment_time}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="modal-buttons">
                  <button onClick={handleConfirm} className="btn">Xác nhận</button>
                  <button onClick={handleEdit} className="btn">Hủy</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatLichKham;
