import React, { useEffect, useState } from 'react'
import Templete from './Templete'
import axios from 'axios'
import Swal from 'sweetalert2'
import config from '../config'
import Modal from "../components/Modal"
import * as dayjs from "dayjs"

const ReportSumSalePerDay = () => {
    const [years, setYears] = useState(() => {
        let arr = []
        let d = new Date()
        let currentYear = d.getFullYear()
        let lastYear = currentYear - 5

        for (let i = lastYear; i <= currentYear; i++) {
            arr.push(i)
        }
        return arr
    })

    const [selectedYear, setSelectedYear] = useState(() => {
        return new Date().getFullYear()
    })

    const [arrMonth, setArrMonth] = useState(() => {
        const arr = [
            "มกราคม",
            "กุมภาพันธ์",
            "มีนาคม",
            "เมษายน",
            "พฤษภาคม",
            "มิถุนายน",
            "กรกฎาคม",
            "สิงหาคม",
            "กันยายน",
            "ตุลาคม",
            "พฤศจิกายน",
            "ธันวาคม"
        ];
        return arr
    })

    const [selectedMonth, setSelectedMonth] = useState(() => {
        return new Date().getMonth() + 1
    })

    const [results, setResults] = useState([])

    useEffect(() => {
        handleShowReport()
    }, [])

    const handleShowReport = async () => {
        try {
            const payload = {
                month: selectedMonth,
                year: selectedYear
            }

            await axios.post(config.api_path + "/changePackage/reportSumSalePerDay", payload, config.headers()).then(res => {
                if (res.data.message === "success") {
                    setResults(res.data.results)
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

    const [selectedDay, setSelectedDay] = useState({})

    return (
        <div>
            <Templete>
                <div className='card rounded-0'>
                    <div className='card-header'>
                        <div className='card-title mb-0 h4 py-2'>
                            <strong>รายงานยอดขายรายวัน</strong>
                        </div>
                    </div>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-2'>
                                <div className='input-group'>
                                    <span className='input-group-text rounded-0'>ปี</span>
                                    <select value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                        className='form-control rounded-0'>
                                        {years.map(item =>
                                            <option value={item}>
                                                {item}
                                            </option>
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className='col-2'>
                                <div className='input-group'>
                                    <span className='input-group-text rounded-0'>เดือน</span>
                                    <select value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(e.target.value)}
                                        className='form-control rounded-0'>
                                        {arrMonth.map((item, index) =>
                                            <option value={index + 1}>
                                                {item}
                                            </option>
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className='col-8'>
                                <button onClick={handleShowReport}
                                    className='btn btn-primary rounded-0'>
                                    <i className='fa fa-check me-2'></i>
                                    แสดงรายการ
                                </button>
                            </div>
                        </div>

                        <table className='table table-bordered mt-3 table-striped'>
                            <thead>
                                <tr>
                                    <th width={100}>วันที่</th>
                                    <th className='text-end'>ยอดรวมรายได้</th>
                                    <th width={200}></th>
                                </tr>
                            </thead>

                            <tbody>
                                {results.length > 0 ? results.map(item =>
                                    <tr>
                                        <td className='align-middle'>{item.day}</td>
                                        <td className='text-end align-middle'>{parseInt(item.sum).toLocaleString("th-TH")}</td>
                                        <td className='text-center'>
                                            <button onClick={(e) => setSelectedDay(item)}
                                                data-bs-toggle="modal"
                                                data-bs-target="#modalInfo"
                                                className='btn btn-success rounded-0'>
                                                <i className='fa fa-file-alt me-2'></i>
                                                แสดงรายการ
                                            </button>
                                        </td>
                                    </tr>
                                ) : ""}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Templete>

            <Modal id="modalInfo" title="รายการ" modalSize="modal-lg">
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>วันที่สมัคร</th>
                            <th>วันที่ชำระเงิน</th>
                            <th>ผู้สมัคร</th>
                            <th>Package</th>
                            <th>ค่าบริการรายเดือน</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedDay.results != undefined ? selectedDay.results.map(item =>
                            <tr>
                                <td>{dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                                <td>{dayjs(item.payDate).format("DD/MM/YYYY")} {item.payHour}:{item.payMinute}</td>
                                <td>{item.member.name}</td>
                                <td>{item.package.name}</td>
                                <td>{parseInt(item.package.price).toLocaleString("th-TH")}</td>
                            </tr>
                        ) : ""}
                    </tbody>
                </table>
            </Modal>
        </div>
    )
}

export default ReportSumSalePerDay