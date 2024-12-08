import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DangNhap.css"


const DangNhap = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem('access_token');
        if (token) {
            navigate('/');
        }
    }, [navigate])

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://127.0.0.1:8888/api/manager/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Đăng nhập thất bại");
            }
            const data = await response.json();
            localStorage.setItem("access_token", data.access_token); // Lưu token
            localStorage.setItem("refresh_token", data.refresh_token);
            navigate('/'); // điều hướng user sang trang home.
            window.location.reload();
        } catch (err) {
            setError(err.message || "Đã xảy ra lỗi không xác định");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-body">
            <header className="login-header">
                <div className="tenHT">
                    <h1>Bệnh viện mắt VQQSPD</h1>
                </div>
            </header>
            <div className="login-container">
                <div className="gioiThieu">
                    <h1>-Hệ Thống Quản Lý Cho Nhân Viên- <br /> <br /> <i>BỆNH VIỆN MẮT VQQSPD</i></h1>
                    <p className=".para">Chào mừng quý khách đến với Bệnh viện Mắt VQQSPD – địa chỉ uy tín chăm sóc sức khỏe đôi mắt của bạn! Với đội ngũ y bác sĩ chuyên môn cao, trang thiết bị hiện đại và dịch vụ tận tâm, chúng tôi cam kết mang đến sự an tâm và chất lượng tốt nhất cho mọi bệnh nhân. Hân hạnh được phục vụ!</p>
                </div>
                <div className="login-box">
                    <img src="/asset/a1_log_in.png" alt="anh1" />
                    <h2>BỆNH VIỆN MẮT VQQSPD</h2>
                    <h3>ĐĂNG NHẬP</h3>
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="input-group">
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="login-input"
                                placeholder="Nhập tài khoản"
                                required
                            />
                            <span class="icon">&#9993;</span>

                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="login-input"
                                placeholder="Nhập mật khẩu"
                                required
                            />
                            <span class="icon">&#128274;</span>
                        </div>
                        <button type="submit" className="btn" disabled={loading}>
                            {loading ? "Đang xử lý..." : "Đăng nhập"}
                        </button>
                        {error && <p className="login-error">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DangNhap;
