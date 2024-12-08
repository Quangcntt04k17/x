import React, { useState } from "react";
import styles from './NhapTTBenhAn.module.css'

const NhapTTBenhAn = () => {

    const [benhAn, setBenhAn] = useState({
        symptoms: '',
        diagnosis: '',
        treatment: ''

    });
    const [hienThi, setHienThi] = useState(false);
    const [thongTinHienThi, setThongTinHienThi] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBenhAn({ ...benhAn, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setThongTinHienThi(benhAn);
        setHienThi(true);
    };

    const handleInput = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    const closeHienThi = () => {
        setHienThi(false);
    };

    return (
        <div style={{backgroundColor: "red", height: "100%"}}>
        <div className={styles.cont}>
            <h3 style={{ textAlign: 'center' }}>Nhập thông tin bệnh án</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Triệu Chứng:</label>
                    <textarea className={styles.inputText} name="symptoms" value={benhAn.symptoms} onChange={handleChange} onInput={handleInput} required></textarea>
                </div>
                <div>
                    <label>Chuẩn Đoán:</label>
                    <textarea className={styles.inputText} name="diagnosis" value={benhAn.diagnosis} onChange={handleChange} onInput={handleInput} required></textarea>
                </div>
                <div>
                    <label>Quá Trình Điều Trị:</label>
                    <textarea className={styles.inputText} name="treatment" value={benhAn.treatment} onChange={handleChange} onInput={handleInput} required></textarea>
                </div>
                <div className={styles.btn_con}><button type="submit" className={styles.btn}>Lưu</button></div>
            </form>
            {hienThi && (
                <div className={styles.hienThi_nhap}>
                    <div className={styles.hienThi_nhap_content} style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
                        <div className={styles.header_content}>
                            <h3 style={{ textAlign: "center" }}>Thông tin bệnh án</h3>
                            <p><strong>Triệu Chứng:</strong> {thongTinHienThi.symptoms}</p>
                            <p><strong>Chuẩn Đoán:</strong> {thongTinHienThi.diagnosis}</p>
                            <p><strong>Quá Trình Điều Trị:</strong> {thongTinHienThi.treatment}</p>
                        </div>
                        <div className={styles.btn_con}>
                            <button className={styles.btn} onClick={closeHienThi}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
};

export default NhapTTBenhAn;