import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./NhapTTBacSi.module.css";




const NhapTTBacSi = () => {
    const [bacSi, setBacSi] = useState({
        hoTenBacSi: "",
        tuoi: "",
        gioiTinh: "",
        soDienThoai: "",
        diaChi: "",
        soCCCD: "",
    });


    const [bacSiList, setBacSiList] = useState([]);
    const [filteredBacSiList, setFilteredBacSiList] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const accessToken = localStorage.getItem("access_token");
    const [currentPage, setCurrentPage] = useState(1); // Quản lý trang hiện tại
    const itemsPerPage = 10; // Số lượng bệnh nhân trên mỗi trang

    useEffect(() => {
        fetchBacSiList();
    }, []);


    const fetchBacSiList = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8888/api/viewsAPIBacSi/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setBacSiList(response.data);    
            setFilteredBacSiList(response.data);
        } catch (error) {
            console.error("Error fetching bác sĩ list:", error);
            alert("Lỗi khi lấy dữ liệu danh sách bác sĩ.");
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setBacSi({ ...bacSi, [name]: value });
    };


    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSearch = () => {
        const filtered = bacSiList.filter(
            (bn) =>
                bn.soDienThoai.includes(searchKeyword) || bn.soCCCD.includes(searchKeyword)
        );
        setFilteredBacSiList(filtered);
        setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const phoneRegex = /^0\d{9,14}$/;
        const cCCCDRegex = /^\d{12}$/;


        if (!phoneRegex.test(bacSi.soDienThoai)) {
            alert("Số điện thoại không hợp lệ! (Yêu cầu từ 10 đến 15 ký tự số, bắt đầu bằng 0)");
            return;
        } else if (!cCCCDRegex.test(bacSi.soCCCD)) {
            alert("Số CCCD không hợp lệ! (Yêu cầu đúng 12 ký tự số)");
            return;
        }


        setIsPopupVisible(true);
    };


    const handleConfirm = async () => {
        setLoading(true);
        try {
            if (isEdit) {
                await axios.put(`http://127.0.0.1:8888/api/viewsAPIBacSi/${bacSi.id}/`, bacSi, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                alert("Cập nhật thông tin bác sĩ thành công.");
            } else {
                await axios.post("http://127.0.0.1:8888/api/viewsAPIBacSi/", bacSi, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                alert("Thêm mới bác sĩ thành công.");
            }
            fetchBacSiList();
            handleCancel();
        } catch (error) {
            console.error("Error saving bác sĩ:", error);
            alert(`Đã có lỗi xảy ra: ${error.response?.data?.detail || "Không xác định"}`);
        } finally {
            setLoading(false);
        }
    };


    const handleCancel = () => {
        setIsPopupVisible(false);
        setBacSi({
            hoTenBacSi: "",
            tuoi: "",
            gioiTinh: "",
            soDienThoai: "",
            diaChi: "",
            soCCCD: "",
        });
        setIsFormVisible(false);
        setIsEdit(false);
    };


    const handleEdit = (bacSiToEdit) => {
        setBacSi(bacSiToEdit);
        setIsEdit(true);
        setIsFormVisible(true);
    };


    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa bác sĩ này?")) {
            console.log("Attempting to delete id:", id);
            setLoading(true);
            try {
                const response = await axios.delete(`http://127.0.0.1:8888/api/viewsAPIBacSi/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                alert("Xóa bác sĩ thành công.");
                fetchBacSiList();
            } catch (error) {
                console.error("Error deleting bác sĩ:", error.response?.data || error.message);
                alert(`Không thể xóa bác sĩ: ${error.response?.data?.detail || "Không xác định"}`);
            } finally {
                setLoading(false);
            }
        }
    };



    // Tính toán danh sách bệnh nhân cần hiển thị cho trang hiện tại
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBenhNhanList = filteredBacSiList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredBacSiList.length / itemsPerPage);

    const handleChangePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };


    return (
        <div className={styles.cont}>
            {/* Nút thêm bác sĩ chỉ hiển thị khi không có từ khóa tìm kiếm */}
            {searchKeyword === "" && (
                <button onClick={() => setIsFormVisible(true)} className={styles.btn}>
                    Thêm bác sĩ
                </button>
                
            )}
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


            {/* Form thêm bác sĩ chỉ hiển thị khi không có từ khóa tìm kiếm */}
            {isFormVisible && searchKeyword === "" && (
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit}>
                        <table>
                            <tbody>
                                <tr>
                                    <td><label>Họ và tên:</label></td>
                                    <td>
                                        <input
                                            type="text"
                                            name="hoTenBacSi"
                                            value={bacSi.hoTenBacSi}
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
                                            value={bacSi.tuoi}
                                            onChange={handleChange}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Giới tính:</label></td>
                                    <td>
                                        <select name="gioiTinh" value={bacSi.gioiTinh} onChange={handleChange} required>
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
                                            value={bacSi.soDienThoai}
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
                                            value={bacSi.diaChi}
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
                                            value={bacSi.soCCCD}
                                            onChange={handleChange}
                                            required
                                            maxLength={12}
                                        />
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


            <h1 style={{ textAlign: "center" }}>Danh sách bác sĩ</h1>
            <table className={styles.table_div}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>ID</th>
                        <th>Họ và tên</th>
                        <th>Tuổi</th>
                        <th>Giới tính</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Số CCCD</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                {paginatedBenhNhanList.map((bac, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{bac.id}</td>
                            <td>{bac.hoTenBacSi}</td>
                            <td>{bac.tuoi}</td>
                            <td>{bac.gioiTinh === "M" ? "Nam" : "Nữ"}</td>
                            <td>{bac.soDienThoai}</td>
                            <td>{bac.diaChi}</td>
                            <td>{bac.soCCCD}</td>
                            <td>
                                <button onClick={() => handleEdit(bac)} className={styles.editBtn}>
                                    Sửa
                                </button>
                                <button onClick={() => handleDelete(bac.id)} className={styles.deleteBtn}>
                                    Xóa
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




export default NhapTTBacSi;



