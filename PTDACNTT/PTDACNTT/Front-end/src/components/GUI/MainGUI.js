import React from "react";
import "./MainGUI.css";


const MainGUI = () => {
    return (
        <div>
            <header>
                <div className="tenHT">
                    <h1>Bệnh viện mắt VQQSPD</h1>
                </div>
                {/* <div className="logo">
                        <img src="/asset/anh3.png" alt="logo" />
                    </div> */}
            </header>

            <div className="tong">
                {/* <nav>
                    <div className="logo">
                        <img src="/asset/anh3.png" alt="logo" />
                    </div>
                    <div className="menu">
                        <ul>
                            <li id="trangchu"><a href="TrangChu.html">Trang chủ</a></li>
                            <li className="cha"><a href="#">Đặt lịch khám</a></li>
                            <li><a href="#">Liên hệ và hỗ trợ</a></li>
                        </ul>
                        <div className='link_con'>
                            <Link className='link_btn' to="/NhapTTBacSi">Nhập Thông tin bác sĩ</Link>
                            <Link className='link_btn' to="/NhapTTBenhNhan">Nhập Thông tin bác sĩ</Link>
                        </div>
                    </div>
                    <div className="timKiem">
                        <input type="search" id="timKiemInput" placeholder="Nhập mã bệnh án để tra cứu..." />
                        <button type="button" id="timKiemButton">Tìm Kiếm</button>
                    </div>
                </nav> */}
                <div className="banner-container">
                    <div className="banner banner-1" onclick="chuyen()"></div>
                    <div className="banner banner-2"></div>
                    <div className="banner banner-3"></div>
                </div>
                <div className="chaomung">
                    <h1>CHÀO MỪNG ĐẾN VỚI HỆ THỐNG BỆNH VIỆN MẮT</h1>
                    <p id="gachchan">_________________________</p>
                    <div className="gioithieu">
                        <div className="gt">
                            <img src="/asset/a.jpg" alt="logo" />
                            <h2>BÁC SĨ KINH NGHIỆM</h2>
                            <p>Đội ngũ bác sĩ là các chuyên gia nhãn khoa với nền tảng chuyên môn vững chắc, giàu kinh nghiệm và y đức.</p>
                        </div>
                        <div className="gt">
                            <img src="/asset/b.jpg" alt="b" />
                            <h2>CÔNG NGHỆ HIỆN ĐẠI</h2>
                            <p>Hệ thống trang thiết bị y tế hiện đại bấc nhất được nhập khẩu từ các nước Anh, Mỹ, Đức</p>
                        </div>
                        <div className="gt">
                            <img src="/asset/c.jpg" alt="c" />
                            <h2>CHI PHÍ HỢP LÝ</h2>
                            <p>Chi phí khám và điều trị, phẫu thuật minh bạch, rõ ràng cùng nhiều ưu đãi hỗ trợ hấp dẫn.</p>
                        </div>
                        <div className="gt">
                            <img src="/asset/d.jpg" alt="d" />
                            <h2>HỆ THỐNG RỘNG KHẮP</h2>
                            <p>17 Bệnh viện và Phòng khám phủ sóng từ Bắc vào Nam, thuận tiện người dân trên khắp cả nước.</p>
                        </div>
                    </div>
                </div>
                <div className="quangba">
                    <h1 id="tieuchi">GIỚI THIỆU</h1>
                    <p id="gachchan">_________________________</p>
                    <br />
                    <p id="van">Bệnh viện Mắt Ánh Dương là một trong những cơ sở y tế hàng đầu tại Việt Nam, chuyên cung cấp dịch vụ chăm sóc và điều trị các bệnh lý liên quan đến mắt. Với sứ mệnh mang lại cho bệnh nhân sự phục hồi thị lực và bảo vệ sức khỏe mắt, bệnh viện đã và đang không ngừng nỗ lực trong việc nâng cao chất lượng dịch vụ, đầu tư cơ sở vật chất và đào tạo đội ngũ y bác sĩ có chuyên môn cao.

                        Được thành lập từ năm 2004, Bệnh viện Mắt Ánh Dương đã xây dựng nên một nền tảng vững chắc với hệ thống trang thiết bị hiện đại và phương pháp điều trị tiên tiến nhất. Từ các dịch vụ khám chữa bệnh thông thường đến các ca phẫu thuật phức tạp, bệnh viện luôn đảm bảo chất lượng dịch vụ đạt tiêu chuẩn quốc tế, giúp bệnh nhân yên tâm và tin tưởng vào quá trình điều trị.

                        Đội ngũ y bác sĩ tại Bệnh viện Mắt Ánh Dương đều là những chuyên gia hàng đầu trong lĩnh vực nhãn khoa, với nhiều năm kinh nghiệm làm việc tại các cơ sở y tế trong và ngoài nước. Bên cạnh đó, họ còn không ngừng cập nhật kiến thức mới nhất thông qua các chương trình đào tạo chuyên sâu và hợp tác quốc tế, nhằm áp dụng những tiến bộ khoa học kỹ thuật vào việc điều trị cho bệnh nhân.

                        Không chỉ chú trọng vào việc điều trị, Bệnh viện Mắt Ánh Dương còn đặc biệt quan tâm đến công tác phòng ngừa và nâng cao nhận thức cộng đồng về các bệnh lý mắt. Bệnh viện thường xuyên tổ chức các buổi tư vấn, khám sàng lọc miễn phí và chương trình giáo dục sức khỏe mắt cho học sinh, sinh viên và người dân tại các vùng sâu, vùng xa. Qua đó, Bệnh viện Mắt Ánh Dương hy vọng sẽ góp phần cải thiện chất lượng cuộc sống và giúp mọi người bảo vệ đôi mắt – cửa sổ tâm hồn của mình.

                        Với phương châm “Thị lực của bạn, sứ mệnh của chúng tôi,” Bệnh viện Mắt Ánh Dương luôn cam kết mang đến những dịch vụ chăm sóc sức khỏe tốt nhất cho cộng đồng. Chúng tôi tin rằng, với sự tận tâm, nhiệt huyết và chuyên môn cao của mình, bệnh viện sẽ là địa chỉ tin cậy cho tất cả mọi người khi cần khám và điều trị các vấn đề về mắt.</p>
                </div>
                <h1 id="tieuchi">THÔNG TIN PHÒNG KHÁM</h1>
                <p id="gachchan1">_________________________</p>
                <div className="thongtin">
                    <div className="tt">
                        <img src="/asset/aa.png" alt="" />
                        <h1>17</h1>
                        <h3>Bệnh viện và Phòng khám</h3>
                    </div>
                    <div className="tt">
                        <img src="/asset/a2.png" alt="" />
                        <h1>76</h1>
                        <h3>Bác sĩ</h3>
                    </div>
                    <div className="tt">
                        <img src="/asset/a3.png" alt="" />
                        <h1>20</h1>
                        <h3>Năm kinh nghiệm</h3>
                    </div>
                    <div className="tt">
                        <img src="/asset/a4.png" alt="" />
                        <h1>4.5 Triệu</h1>
                        <h3>Khách hàng</h3>
                    </div>
                    <div className="tt">
                        <img src="/asset/a5.png" alt="" />
                        <h1>705.000</h1>
                        <h3>Ca phẫu thuật thành công</h3>
                    </div>
                </div>
                <footer>
                    <div className="mot">
                        <h3>Bệnh viện Mắt VQQSPD - MST : 0302745714 - Cấp ngày 18/10/2002 bởi Sở Kế Hoạch và Đầu Tư TP.HCM Bệnh viện Mắt Sài Gòn - Giấy phép hoạt động số 73/BYT/GPHD 0302745714 - Cấp ngày 25/12/2013 bởi Bộ Y Tế</h3>
                    </div>
                    <div className="hai">
                        <h1>Dịch vụ</h1>
                        <ul>
                            <li>Khám mắt</li>
                            <li>Phẫu thuật khúc xạ</li>
                            <li>Điều trị tật khúc xạ</li>
                            <li>Nhãn nhí & Điều trị lác</li>
                            <li>Tạo hình thẩm mỹ</li>
                        </ul>
                    </div>
                    <div className="ba">
                        <h1>Về chúng tôi</h1>
                        <ul>
                            <li>Hệ thống</li>
                            <li>Tin tức</li>
                            <li>Khuyến mại</li>
                            <li>Trang thiết bị</li>
                        </ul>
                    </div>
                    <div className="bon">
                        <h1>Liên hệ</h1>
                        <ul>
                            <li>SĐT: 0362628093</li>
                            <li>Email: bachdung003@gmail.com</li>
                            <li>Địa chỉ: Nhổn, Bắc Từ Liêm, Hà Nội</li>
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default MainGUI;