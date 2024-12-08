import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Lấy ID từ URL
import styles from "./XemTTBenhAn.module.css";

const XemTTBenhAn = () => {
    const { benhNhanId } = useParams(); // Lấy ID bệnh nhân từ URL
    const [benhAnList, setBenhAnList] = useState([]); // Danh sách bệnh án
    const [benhNhanList, setBenhNhanList] = useState([]); // Thông tin bệnh nhân
    const [selectedBenhAn, setSelectedBenhAn] = useState(null); // Bệnh án được chọn để sửa
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
    const [isAddFormVisible, setIsAddFormVisible] = useState(false); // Trạng thái hiển thị form thêm bệnh án
    const [newBenhAn, setNewBenhAn] = useState({ chuanDoan: "", trieuChung: "", dieuTri: "" }); // Dữ liệu bệnh án mới
    const accessToken = localStorage.getItem("access_token"); // Token từ localStorage

    // Fetch dữ liệu từ API
    useEffect(() => {
        const fetchBenhAn = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8888/api/viewsAPIHoSo/",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                const filteredBenhAn = response.data
                    .filter((benhAn) => benhAn.benhNhan === parseInt(benhNhanId))
                    .sort(
                        (a, b) =>
                            new Date(b.thoiGianKham).getTime() - new Date(a.thoiGianKham).getTime()
                    ); // Sắp xếp từ mới nhất đến cũ nhất
                setBenhAnList(filteredBenhAn);
            } catch (error) {
                console.error("Error fetching medical records:", error);
            }
        };
    
        const fetchBenhNhan = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8888/api/viewsAPIBenhNhan/",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                const filteredBenhNhan = response.data.filter(
                    (benhNhan) => benhNhan.id === parseInt(benhNhanId)
                );
                setBenhNhanList(filteredBenhNhan);
            } catch (error) {
                console.error("Error fetching patient data:", error);
            }
        };
    
        setLoading(true);
        Promise.all([fetchBenhAn(), fetchBenhNhan()]).then(() => {
            setLoading(false);
        });
    }, [accessToken, benhNhanId]);

    // Xử lý sửa thông tin bệnh án
    const handleEdit = (benhAn) => {
        setSelectedBenhAn(benhAn);
    };

    const handleSaveEdit = async () => {
        try {
            await axios.put(
                `http://127.0.0.1:8888/api/viewsAPIHoSo/${selectedBenhAn.id}/`,
                selectedBenhAn,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            alert("Sửa thông tin thành công.");
            setSelectedBenhAn(null);
            setBenhAnList((prevList) =>
                prevList.map((benhAn) =>
                    benhAn.id === selectedBenhAn.id ? selectedBenhAn : benhAn
                )
            );
        } catch (error) {
            console.error("Error saving edit:", error);
            alert("Có lỗi xảy ra khi lưu chỉnh sửa.");
        }
    };

    // Xử lý xóa bệnh án
    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa bệnh án này?")) {
            try {
                await axios.delete(
                    `http://127.0.0.1:8888/api/viewsAPIHoSo/${id}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                alert("Xóa thành công.");
                setBenhAnList((prevList) =>
                    prevList.filter((benhAn) => benhAn.id !== id)
                );
            } catch (error) {
                console.error("Error deleting medical record:", error);
                alert("Có lỗi xảy ra khi xóa.");
            }
        }
    };

    // Xử lý thêm bệnh án
    const handleAddBenhAn = async () => {
        try {
            const newBenhAnData = {
                ...newBenhAn,
                benhNhan: parseInt(benhNhanId), // Set patient ID
                thoiGianKham: new Date().toISOString(), // Use current date for examination time
            };
            const response = await axios.post(
                "http://127.0.0.1:8888/api/viewsAPIHoSo/",
                newBenhAnData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            alert("Thêm bệnh án thành công.");
            setBenhAnList((prevList) => [...prevList, response.data]);
            setIsAddFormVisible(false);
            setNewBenhAn({ chuanDoan: "", trieuChung: "", dieuTri: "" });
        } catch (error) {
            console.error("Error adding medical record:", error);
            alert("Có lỗi xảy ra khi thêm bệnh án.");
        }
    };

    if (loading) {
        return <div>Đang tải thông tin bệnh án và bệnh nhân...</div>;
    }

    return (
        <div className={styles.container}>
            {/* Hiển thị thông tin bệnh nhân */}
            <div className={styles.ttBenhNhan}>
                <h2>Thông tin bệnh nhân</h2>
                {benhNhanList.length > 0 ? (
                    benhNhanList.map((benhNhan) => (
                        <div key={benhNhan.id}>
                            <p><strong>Họ và tên:</strong> {benhNhan.hoTenBenhNhan}</p>
                            <p><strong>Tuổi:</strong> {benhNhan.tuoi}</p>
                            <p><strong>Giới tính:</strong> {benhNhan.gioiTinh === "M" ? "Nam" : "Nữ"}</p>
                            <p><strong>Số điện thoại:</strong> {benhNhan.soDienThoai}</p>
                            <p><strong>Địa chỉ:</strong> {benhNhan.diaChi}</p>
                            <p><strong>Số CCCD:</strong> {benhNhan.soCCCD}</p>
                            <p><strong>Mã BHYT:</strong> {benhNhan.maBaoHiemYTe}</p>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>Không có thông tin bệnh nhân.</p>
                )}
            </div>

            {/* Hiển thị thông tin bệnh án */}
            <div className={styles.benhAnContent}>
                <h2>Thông tin bệnh án</h2>
                {/* Thêm bệnh án */}
                <button
                    onClick={() => setIsAddFormVisible(true)}
                    className={styles.addBtn}
                >
                    Thêm bệnh án
                </button>
                {benhAnList.length > 0 ? (
                    benhAnList.map((benhAn) => (
                        <div key={benhAn.id}>
                            <p><strong>Ngày khám:</strong> {benhAn.thoiGianKham}</p>
                            <p><strong>Chẩn đoán:</strong> {benhAn.chuanDoan}</p>
                            <p><strong>Triệu chứng:</strong> {benhAn.trieuChung}</p>
                            <p><strong>Điều trị:</strong> {benhAn.dieuTri}</p>
                            <div className={styles.btnGroup}>
                                <button
                                    onClick={() => handleEdit(benhAn)}
                                    className={styles.editBtn}
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(benhAn.id)}
                                    className={styles.deleteBtn}
                                >
                                    Xóa
                                </button>
                            </div>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>Không có thông tin bệnh án.</p>
                )}

                {/* Form thêm bệnh án */}
                {isAddFormVisible && (
                    <div className={styles.addForm}>
                        <h3>Thêm bệnh án</h3>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label>Chẩn đoán:</label>
                            <input
                                type="text"
                                value={newBenhAn.chuanDoan}
                                onChange={(e) =>
                                    setNewBenhAn({
                                        ...newBenhAn,
                                        chuanDoan: e.target.value,
                                    })
                                }
                            />
                            <label>Triệu chứng:</label>
                            <input
                                type="text"
                                value={newBenhAn.trieuChung}
                                onChange={(e) =>
                                    setNewBenhAn({
                                        ...newBenhAn,
                                        trieuChung: e.target.value,
                                    })
                                }
                            />
                            <label>Điều trị:</label>
                            <input
                                type="text"
                                value={newBenhAn.dieuTri}
                                onChange={(e) =>
                                    setNewBenhAn({
                                        ...newBenhAn,
                                        dieuTri: e.target.value,
                                    })
                                }
                            />
                            <div className={styles.btnGroup}>
                                <button
                                    onClick={handleAddBenhAn}
                                    className={styles.saveBtn}
                                >
                                    Lưu
                                </button>
                                <button
                                    onClick={() => setIsAddFormVisible(false)}
                                    className={styles.cancelBtn}
                                >
                                    Hủy
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            {/* Form chỉnh sửa bệnh án */}
            {selectedBenhAn && (
                <div className={styles.editForm}>
                    <h3>Chỉnh sửa bệnh án</h3>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <label>Chẩn đoán:</label>
                        <input
                            type="text"
                            value={selectedBenhAn.chuanDoan}
                            onChange={(e) =>
                                setSelectedBenhAn({
                                    ...selectedBenhAn,
                                    chuanDoan: e.target.value,
                                })
                            }
                        />
                        <label>Triệu chứng:</label>
                        <input
                            type="text"
                            value={selectedBenhAn.trieuChung}
                            onChange={(e) =>
                                setSelectedBenhAn({
                                    ...selectedBenhAn,
                                    trieuChung: e.target.value,
                                })
                            }
                        />
                        <label>Điều trị:</label>
                        <input
                            type="text"
                            value={selectedBenhAn.dieuTri}
                            onChange={(e) =>
                                setSelectedBenhAn({
                                    ...selectedBenhAn,
                                    dieuTri: e.target.value,
                                })
                            }
                        />
                        <div className={styles.btnGroup}>
                            <button
                                onClick={handleSaveEdit}
                                className={styles.saveBtn}
                            >
                                Lưu
                            </button>
                            <button
                                onClick={() => setSelectedBenhAn(null)}
                                className={styles.cancelBtn}
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default XemTTBenhAn;
