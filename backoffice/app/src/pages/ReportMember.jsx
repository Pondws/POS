import React, { useEffect, useState } from 'react'
import Templete from './Templete'
import Swal from 'sweetalert2'
import axios from 'axios'
import config from '../config'
import * as dayjs from "dayjs"

const ReportMember = () => {
    const [members, setMembers] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            await axios.get(config.api_path + "/member/list", config.headers()).then(res => {
                if (res.data.message === "success") {
                    setMembers(res.data.results)
                }
            }).catch(err => {
                throw err.response.data
            })
        } catch (e) {
            Swal.fire({
                title: "error",
                text: e.message,
                icon: "error"
            })
        }
    }
    return (
        <div>
            <Templete>
                <div className='card rounded-0'>
                    <div className='card-header'>
                        <div className='card-title mb-0 h4 py-2'>
                            <strong>รายงานคนที่สมัครใช้บริการ</strong>
                        </div>
                    </div>
                    <div className='card-body'>
                        <table className='table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>ชื่อ</th>
                                    <th>เบอร์โทรศัพท์</th>
                                    <th>วันที่สมัคร</th>
                                    <th>แพ็กเกจ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.length > 0 ? members.map(item =>
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.phone}</td>
                                        <td>{dayjs(item.createdAt).format("DD/MM/YYYY")}</td>
                                        <td>{item.package.name}</td>
                                    </tr>
                                ) : ""}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Templete>
        </div>
    )
}

export default ReportMember