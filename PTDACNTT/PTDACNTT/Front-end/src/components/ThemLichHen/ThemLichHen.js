import React, {useState} from "react";
import styles from './ThemLichHen.module.css'

const ThemLichHen = () =>{
    return(
        <div>
            <h3>Nhập thông tin lịch hẹn</h3>
            <form>
                <div>
                    <table>
                        <tr>
                            <td>Nhập mã căn cước công dân bệnh nhân:</td>
                            <td> <input type="text" name="bn_cIN"/></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td>Nhập căn cước công dân bác sĩ:</td>
                        </tr>
                    </table>
                </div>
            </form>
        </div>
    )
}

export default ThemLichHen;