import React from "react";
import './menu.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import NhapTTBenhNhan from "./components/NhapTTBenhNhan/NhapTTBenhNhan";
import NhapTTBenhAn from "./components/NhapTTBenhAn/NhapTTBenhAn";
import NhapTTBacSi from "./components/NhapTTBacSi/NhapTTBacSi";
import MainGUI from './components/GUI/MainGUI';
import DangNhap from './components/DangNhap/DangNhap';
import DangXuat from "./components/DangXuat/DangXuat";
import ProtectedRoute from './sevices/ProtectedRoute';
import XemTTBenhAn from "./components/XemTTBenhAn/XemTTBenhAn";
import DatLichKham from "./components/DatLichKham/DatLichKham";
import XemLichKham from "./components/XemLichKham/XemLichKham";

function App() {
  const token = localStorage.getItem('access_token');

  return (
    <Router>
      <nav>
        <div className="logo">
          <img src="/asset/anh3.png" alt="logo" />
        </div>
        <div className={`menu ${token ? 'logged-in' : 'logged-out'}`}>
          <ul>
            <li><Link to='/'>Trang chủ</Link></li>
            {token && (
              <>
                <li><Link to="/nhapTTBacSi">Bác sĩ</Link></li>
                <li><Link to="/nhapTTBenhNhan">Bệnh nhân</Link></li>
                <li><Link to="/xemLichKham">Xem lịch khám</Link></li>
              </>
            )}
            {!token && (
              <li><Link to="/datLichKham">Đặt lịch khám</Link></li>
            )}
          </ul>
        </div>
        <div className="menu">
          <ul>
            {token ? (
              <li><Link to='/dangXuat'>Đăng Xuất</Link></li>
            ) : (
              <li><Link to='/dangNhap'>Đăng Nhập</Link></li>
            )}
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<MainGUI />} />
        <Route path="/dangNhap" element={<DangNhap />} />
        <Route path="/datLichKham" element={<DatLichKham />} />
        <Route
          path="/nhapTTBenhNhan"
          element={<ProtectedRoute element={<NhapTTBenhNhan />} />}
        />
        <Route
          path="/nhapTTBenhAn"
          element={<ProtectedRoute element={<NhapTTBenhAn />} />}
        />
        <Route
          path="/nhapTTBacSi"
          element={<ProtectedRoute element={<NhapTTBacSi />} />}
        />
        <Route
          path="/dangXuat"
          element={<ProtectedRoute element={<DangXuat />} />}
        />
        <Route path="/benh-an/:benhNhanId" element={<XemTTBenhAn />} />
        <Route
          path="/xemLichKham"
          element={<ProtectedRoute element={<XemLichKham />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
