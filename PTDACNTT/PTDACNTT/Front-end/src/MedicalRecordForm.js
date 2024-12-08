import React, { useState } from 'react';

const MedicalRecordForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        phone: '',
        address: '',
        cccd: '',
        symptoms: '',
        diagnosis: '',
        treatment: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Thông tin bệnh án:', formData);
        // Thực hiện hành động lưu thông tin (gửi lên server, v.v.)
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <h2>Nhập Thông Tin Bệnh Án</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tên:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Tuổi:</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                </div>
                <div>
                    <label>Giới Tính:</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Chọn giới tính</option>
                        <option value="nam">Nam</option>
                        <option value="nữ">Nữ</option>
                        <option value="khác">Khác</option>
                    </select>
                </div>
                <div>
                    <label>Số Điện Thoại:</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div>
                    <label>Địa Chỉ:</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div>
                    <label>Số Căn Cước Công Dân:</label>
                    <input type="text" name="cccd" value={formData.cccd} onChange={handleChange} required />
                </div>
                <div>
                    <label>Triệu Chứng:</label>
                    <textarea name="symptoms" value={formData.symptoms} onChange={handleChange} required></textarea>
                </div>
                <div>
                    <label>Chuẩn Đoán:</label>
                    <textarea name="diagnosis" value={formData.diagnosis} onChange={handleChange} required></textarea>
                </div>
                <div>
                    <label>Quá Trình Điều Trị:</label>
                    <textarea name="treatment" value={formData.treatment} onChange={handleChange} required></textarea>
                </div>
                <button type="submit">Lưu Thông Tin</button>
            </form>
        </div>
    );
};

export default MedicalRecordForm;