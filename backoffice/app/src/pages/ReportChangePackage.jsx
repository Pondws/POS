import React, { useEffect, useState } from 'react'
import Templete from './Templete'
import Swal from 'sweetalert2'
import axios from 'axios'
import config from '../config'
import * as dayjs from "dayjs"
import Modal from "../components/Modal"

const ReportChangePackage = () => {
    const [members, setMembers] = useState([])
    const [hours, setHours] = useState(() => {
        let arr = []

        for (let i = 0; i <= 23; i++) {
            arr.push(i)
        }
        return arr
    })

    const [minutes, setMinutes] = useState(() => {
        let arr = []

        for (let i = 0; i <= 59; i++) {
            arr.push(i)
        }
        return arr
    })

    const [remark, setRemark] = useState("")
    const [payDate, setPayDate] = useState(() => {
        const myDate = new Date()
        return (
            myDate.getFullYear() +
            "-" +
            (myDate.getMonth() + 1) +
            "-" +
            myDate.getDate()
        )
    })

    const [payHour, setPayHour] = useState(() => {
        const d = new Date()
        return d.getHours()
    })
    const [payMinute, setPayMinute] = useState(() => {
        const d = new Date()
        return d.getMinutes()
    })

    const [changePackage, setChangePackage] = useState({})

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            await axios.get(config.api_path + "/changePackage/list", config.headers()).then(res => {
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

    const handleSave = async () => {
        let payload = {
            payDate: payDate,
            payHour: payHour,
            payMinute: payMinute,
            remark: remark,
            id: changePackage.id
        }
        try {
            await axios.post(config.api_path + "/changePackage/saveChange", payload, config.headers()).then(res => {
                if (res.data.message === "success") {
                    Swal.fire({
                        title: "บันทึก",
                        text: "บันทึกข้อมูลแล้ว",
                        icon: "success"
                    })
                    fetchData()

                    let btns = document.getElementsByClassName("btnClose")
                    for (let i = 0; i < btns.length; i++) btns[i].click()
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
                            <strong>รายงานคนที่ขอเปลี่ยนแพ็กเกจ</strong>
                        </div>
                    </div>
                    <div className='card-body'>
                        <table className='table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>ชื่อ</th>
                                    <th>เบอร์โทรศัพท์</th>
                                    <th>วันที่ขอเปลี่ยน</th>
                                    <th>แพ็กเกจที่ต้องการ</th>
                                    <th>ค่าบริการต่อเดือน</th>
                                    <th width={150}></th>
                                </tr>
                            </thead>

                            <tbody>
                                {members.length > 0 ? members.map(item =>
                                    <tr>
                                        <td class="align-middle">{item.member.name}</td>
                                        <td class="align-middle">{item.member.phone}</td>
                                        <td class="align-middle">{dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                                        <td class="align-middle">{item.package.name}</td>
                                        <td class="align-middle">{parseInt(item.package.price).toLocaleString("th-TH")}</td>
                                        <td className='text-center'>
                                            <button onClick={(e) => setChangePackage(item)}
                                                data-bs-toggle="modal"
                                                data-bs-target="#modalPay"
                                                className='btn btn-success rounded-0'>
                                                <i className='fa fa-check me-2'></i>
                                                ได้รับเงินแล้ว
                                            </button>
                                        </td>
                                    </tr>
                                ) : ""}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Templete>

            <Modal id="modalPay" title="บันทึกข้อมูลเมื่อได้รับชำระเงิน">
                <div>
                    <label>วันที่ชำระ</label>
                    <input value={payDate}
                        onChange={(e) => setPayDate(e.target.value)}
                        className='form-control rounded-0'
                        type='date' />
                </div>
                <div className='mt-3'>
                    <label>เวลา</label>
                    <div className='row'>
                        <div className='col-6'>
                            <div className='input-group'>
                                <div className='input-group-text rounded-0'>ชั่วโมง</div>
                                <select value={payHour}
                                    onChange={(e) => setPayHour(e.target.value)}
                                    className='form-control rounded-0'>
                                    {hours.length > 0 ? hours.map(item =>
                                        <option value={item}>{item}</option>
                                    ) : ""}
                                </select>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='input-group'>
                                <div className='input-group-text rounded-0'>นาที</div>
                                <select value={payMinute}
                                    onChange={(e) => setPayMinute(e.target.value)}
                                    className='form-control rounded-0'>
                                    {minutes.length > 0 ? minutes.map(item =>
                                        <option value={item}>{item}</option>
                                    ) : ""}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label>หมายเหตุ</label>
                        <input onChange={(e) => setRemark(e.target.value)}
                            className='form-control rounded-0' />
                    </div>
                    <div className='mt-3'>
                        <button onClick={handleSave}
                            className='btn btn-primary rounded-0'>
                            <i className='fa fa-check me-2'></i>
                            บันทึก
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ReportChangePackage