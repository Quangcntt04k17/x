import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./NhapTTBenhNhan.module.css";

const NhapTTBenhNhan = () => {
    const [benhNhan, setBenhNhan] = useState({
        hoTenBenhNhan: "",
        tuoi: "",
        gioiTinh: "",
        soDienThoai: "",
        diaChi: "",
        soCCCD: "",
        maBaoHiemYTe: "",
    });
    const [benhNhanList, setBenhNhanList] = useState([]);
    const [filteredBenhNhanList, setFilteredBenhNhanList] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const accessToken = localStorage.getItem("access_token");
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1); // Quản lý trang hiện tại
    const itemsPerPage = 10; // Số lượng bệnh nhân trên mỗi trang
    const handleViewBenhAn = (idBenhNhan) => {
        navigate(`/benh-an/${idBenhNhan}`);
    };
    useEffect(() => {
        fetchBenhNhanList();
    }, []);

    const fetchBenhNhanList = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8888/api/viewsAPIBenhNhan/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setBenhNhanList(response.data);
            setFilteredBenhNhanList(response.data);
        } catch (error) {
            console.error("Error fetching bệnh nhân list:", error);
            alert("Lỗi khi lấy dữ liệu danh sách bệnh nhân.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBenhNhan({ ...benhNhan, [name]: value });
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSearch = () => {
        const filtered = benhNhanList.filter(
            (bn) =>
                bn.soDienThoai.includes(searchKeyword) || bn.soCCCD.includes(searchKeyword)
        );
        setFilteredBenhNhanList(filtered);
        setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const phoneRegex = /^0\d{9}$/;
        const cCCCDRegex = /^\d{12}$/;

        if (!phoneRegex.test(benhNhan.soDienThoai)) {
            alert("Số điện thoại không hợp lệ! (Yêu cầu đúng 10 ký tự số, bắt đầu bằng 0)");
            return;
        } else if (!cCCCDRegex.test(benhNhan.soCCCD)) {
            alert("Số CCCD không hợp lệ! (Yêu cầu đúng 12 ký tự số)");
            return;
        }
        if (!isChecked) {
            setBenhNhan({
                ...benhNhan,
                maBaoHiemYTe: null, // Gán maBaoHiemYTe là null nếu checkbox không được chọn
            });
        }
        setIsPopupVisible(true);
    };

    const handleConfirm = async () => {
        setLoading(true);
        try {
            if (isEdit) {
                await axios.put(`http://127.0.0.1:8888/api/viewsAPIBenhNhan/${benhNhan.id}/`, benhNhan, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                alert("Cập nhật thông tin bệnh nhân thành công.");
            } else {
                await axios.post("http://127.0.0.1:8888/api/viewsAPIBenhNhan/", benhNhan, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                alert("Thêm mới bệnh nhân thành công.");
            }
            fetchBenhNhanList();
            handleCancel();
        } catch (error) {
            console.error("Error saving bệnh nhân:", error);
            alert(`Đã có lỗi xảy ra: ${error.response?.data?.detail || "Không xác định"}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsPopupVisible(false);
        setBenhNhan({
            hoTenBenhNhan: "",
            tuoi: "",
            gioiTinh: "",
            soDienThoai: "",
            diaChi: "",
            soCCCD: "",
            maBaoHiemYTe: "",
        });
        setIsFormVisible(false);
        setIsEdit(false);
    };

    const handleEdit = (benhNhanToEdit) => {
        setBenhNhan(benhNhanToEdit);
        setIsEdit(true);
        setIsFormVisible(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa bệnh nhân này?")) {
            setLoading(true);
            try {
                await axios.delete(`http://127.0.0.1:8888/api/viewsAPIBenhNhan/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                alert("Xóa bệnh nhân thành công.");
                fetchBenhNhanList();
            } catch (error) {
                console.error("Error deleting bệnh nhân:", error);
                alert(`Không thể xóa bệnh nhân: ${error.response?.data?.detail || "Không xác định"}`);
            } finally {
                setLoading(false);
            }
        }
    };



    // Tính toán danh sách bệnh nhân cần hiển thị cho trang hiện tại
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBenhNhanList = filteredBenhNhanList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredBenhNhanList.length / itemsPerPage);

    const handleChangePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
    const handleChangeCheckBox = () => {
        setIsChecked(!isChecked);
    };
    

    return (
        <div className={styles.cont}>
            <button onClick={() => setIsFormVisible(true)} className={styles.btn}>
                Thêm bệnh nhân
            </button>
            <input 
                    type="text"
                    placeholder="Tìm kiếm theo số điện thoại hoặc CCCD"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
            <button onClick={handleSearch} className={styles.searchBtn}>
                    Tìm kiếm
            </button>
            {/* <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Tìm kiếm theo số điện thoại hoặc CCCD"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
            </div> */}

            {isFormVisible && (
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit}>
                        <table>
                            <tbody>
                                <tr>
                                    <td><label>Họ và tên:</label></td>
                                    <td>
                                        <input
                                            type="text"
                                            name="hoTenBenhNhan"
                                            value={benhNhan.hoTenBenhNhan}
                                            onChange={handleChange}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Tuổi:</label></td>
                                    <td>
                                        <input
                                            type="number"
                                            name="tuoi"
                                            value={benhNhan.tuoi}
                                            onChange={handleChange}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Giới tính:</label></td>
                                    <td>
                                        <select name="gioiTinh" value={benhNhan.gioiTinh} onChange={handleChange} required>
                                            <option value="">Chọn giới tính</option>
                                            <option value="M">Nam</option>
                                            <option value="F">Nữ</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Số điện thoại:</label></td>
                                    <td>
                                        <input
                                            type="tel"
                                            name="soDienThoai"
                                            value={benhNhan.soDienThoai}
                                            onChange={handleChange}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Địa chỉ:</label></td>
                                    <td>
                                        <input
                                            type="text"
                                            name="diaChi"
                                            value={benhNhan.diaChi}
                                            onChange={handleChange}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Số CCCD:</label></td>
                                    <td>
                                        <input
                                            type="text"
                                            name="soCCCD"
                                            value={benhNhan.soCCCD}
                                            onChange={handleChange}
                                            required
                                            maxLength={12}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{display:"flex", height:"57px"}}>
                                        <label style={{display:"inlineblock", top:"20px"}}>Mã số bảo hiểm y tế:</label>
                                        <input type="checkbox" checked={isChecked} onChange={handleChangeCheckBox} style={{width: "8%", marginLeft:"20%"}}/>
                                        {/* <label>Mã số bảo hiểm y tế:</label> */}
                                    </td>
                                    <td>
                                        {isChecked && (
                                            <input className={styles.in} type="text" name="maBaoHiemYTe" value={benhNhan.maBaoHiemYTe} onChange={handleChange} required maxLength={15} />
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={styles.btn_con}>
                            <button type="submit" disabled={loading}>
                                {loading ? "Đang xử lý..." : "Lưu"}
                            </button>
                            <button type="button" onClick={handleCancel}>
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <h1 style={{ textAlign: "center" }}>Danh sách bệnh nhân</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Họ và tên</th>
                        <th>Tuổi</th>
                        <th>Giới tính</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Số CCCD</th>
                        <th>Mã BHYT</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {paginatedBenhNhanList.map((bn, index) => (
                        <tr key={index}>
                            <td>{bn.id}</td>
                            <td>{bn.hoTenBenhNhan}</td>
                            <td>{bn.tuoi}</td>
                            <td>{bn.gioiTinh === "M" ? "Nam" : "Nữ"}</td>
                            <td>{bn.soDienThoai}</td>
                            <td>{bn.diaChi}</td>
                            <td>{bn.soCCCD}</td>
                            <td>{bn.maBaoHiemYTe}</td>
                            <td>
                                <button onClick={() => handleEdit(bn)} className={styles.editBtn}>
                                    Sửa
                                </button>
                                <button onClick={() => handleDelete(bn.id)} className={styles.deleteBtn}>
                                    Xóa
                                </button>
                                <button onClick={() => handleViewBenhAn(bn.id)} className={styles.deleteBtn}>
                                    Xem bệnh án
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isPopupVisible && (
                <div className={styles.popup}>
                    <h2>Xác nhận</h2>
                    <p>Bạn có chắc muốn lưu thông tin này không?</p>
                    <div className={styles.btn_con}>
                        <button onClick={handleConfirm} className={styles.btn} disabled={loading}>
                            {loading ? "Đang lưu..." : "Xác nhận"}
                        </button>
                        <button onClick={handleCancel} className={styles.btn}>
                            Hủy
                        </button>
                    </div>
                </div>
            )}
            {/* Phân trang */}
            <div className={styles.pagination}>
                <button
                    onClick={() => handleChangePage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={styles.pageBtn}
                >
                    Trang trước
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handleChangePage(page)}
                        className={`${styles.pageBtn} ${page === currentPage ? styles.activePage : ""}`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => handleChangePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={styles.pageBtn}
                >
                    Trang sau
                </button>
            </div>
        </div>
    );
};

export default NhapTTBenhNhan;
